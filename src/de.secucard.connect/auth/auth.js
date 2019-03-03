/*
 Copyright 2015 hp.weber GmbH & Co secucard KG (www.secucard.com)
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */
import {POST} from '../net/message';
import {Token} from './token';
import {AuthenticationFailedException, AuthenticationTimeoutException} from './exception';
import minilog from 'minilog';
import _ from 'lodash';

export class Auth {

    baseCredentialNames = ['client_id', 'client_secret'];
    baseHeaders = {'Content-Type': 'application/x-www-form-urlencoded'};

    constructor() {

    }

    configureWithContext(context) {

        this.emit = context.emit.bind(context);

        this.getChannel = context.getRestChannel.bind(context);
        this.getCredentials = context.getCredentials.bind(context);
        this.getTokenStorage = context.getTokenStorage.bind(context);

        this.oAuthUrl = () => {

            return context.getConfig().getOAuthUrl();

        };

        this.getDeviceUUID = () => {
            return context.getConfig().getDeviceUUID();
        };

    }

    pick(object, keys) {

        return keys.reduce((obj, key) => {
            if (object[key]) {
                obj[key] = object[key];
            }
            return obj;
        }, {});
    }

    getToken(extend) {

        return this.getStoredToken().then((token) => {

            if (token != null && !token.isExpired()) {
                if (extend) {
                    // extend expire time on every token access, assuming the token is used, if not this could cause auth failure
                    token.setExpireTime();
                    this.storeToken(token);
                }

                return Promise.resolve(token);

            }

            let cr = this.getCredentials();
            let ch = this.getChannel();

            if (!cr.isValid()) {

                if (token != null && token.isExpired()) {
                    
                    return this.retrieveNewToken().catch(() => {
                       
                        minilog('secucard.auth').error('Token is expired');
                        throw new AuthenticationFailedException('Token is expired');
                        
                    });
                    
                } else {
                    
                    return this.retrieveNewToken().catch(() => {
                       
                        minilog('secucard.auth').error('Credentials error');
                        throw new AuthenticationFailedException('Credentials error');
                        
                    });
                    
                }

            }

            let tokenSuccess = (res) => {

                let _token = token ? token.update(res.body) : Token.create(res.body);
                _token.setExpireTime();
                this.storeToken(_token);
                return _token;

            };

            let tokenError = (err) => {

                // failed, clear the token
                this.removeToken();

                let error;
                if (err instanceof AuthenticationTimeoutException) {
                    error = err;
                } else {
                    error = Object.assign(new AuthenticationFailedException(), err.response.body);
                }

                throw error;
            };

            let req;

            if (token != null && token.getRefreshToken() != null) {

                req = this._tokenRefreshRequest(cr, token.getRefreshToken(), ch);

            } else {

                req = this.isDeviceAuth() ? this.getDeviceToken(Object.assign({}, cr, {uuid: this.getDeviceUUID()}), ch) : this._tokenClientCredentialsRequest(cr, ch);

            }

            return req.then(tokenSuccess).catch(tokenError);

        });

    }

    isDeviceAuth() {
        return Boolean(this.getDeviceUUID());
    }

    getDeviceToken(credentials, channel) {

        return this._tokenDeviceCodeRequest(credentials, channel).then((res) => {

            let data = res.body;
            this.emit('deviceCode', data);

            /*
             { device_code: '4b3e0c6733bf616f438ac2992be2a610',
             user_code: 'vfazyp5f',
             verification_url: 'http://www.secuoffice.com',
             expires_in: 1200,
             interval: 5 }
             */

            let pollIntervalSec = data.interval > 0 ? data.interval : 5;
            let pollExpireTime = parseInt(data.expires_in) * 1000 + (new Date()).getTime();
            let codeCredentials = Object.assign({}, credentials, {code: data.device_code});

            return new Promise((resolve, reject) => {

                this.pollTimer = setInterval(() => {

                    if ((new Date()).getTime() < pollExpireTime) {

                        this._tokenDeviceRequest(codeCredentials, channel)
                            .then((res) => {
                                // got token
                                clearInterval(this.pollTimer);
                                resolve(res);
                            })
                            .catch((err) => {

                                if (err.status == 401) {
                                    // authorization pending, do nothing, wait for next poll
                                } else {
                                    clearInterval(this.pollTimer);
                                    reject(err);
                                }

                            });

                    } else {
                        // device_code expired, stop polling, throw error
                        clearInterval(this.pollTimer);
                        reject(new AuthenticationTimeoutException());
                    }

                }, pollIntervalSec * 1000);

            });

        });

    }

    removeToken() {

        let storage = this.getTokenStorage();
        if (!storage) {
            let err = new AuthenticationFailedException('Credentials error');
            return Promise.reject(err);
        }
        storage.removeToken();
    }

    storeToken(token) {

        let storage = this.getTokenStorage();
        if (!storage) {
            let err = new AuthenticationFailedException('Credentials error');
            return Promise.reject(err);
        }
        storage.storeToken(token);

    }

    getStoredToken() {
        let storage = this.getTokenStorage();
        if (!storage) {
            let err = new AuthenticationFailedException('Credentials error');
            return Promise.reject(err);
        }
        return storage.getStoredToken().then((token) => {

            if (token && !(token instanceof Token)) {
                return Token.create(token);
            }

            return token;

        });
    }
    
    retrieveNewToken() {
        
        let storage = this.getTokenStorage();
        if (!storage) {
            let err = new AuthenticationFailedException('Credentials error');
            return Promise.reject(err);
        }
        
        return storage.retrieveNewToken();
        
    }

    _tokenRequest(credentials, channel) {
        let m = channel.createMessage()
            .setBaseUrl(this.oAuthUrl())
            .setUrl('token')
            .setHeaders(this.baseHeaders)
            .setMethod(POST)
            .setBody(credentials);
        minilog('secucard.auth').debug('token request', m);
        return channel.send(m);
    }

    _tokenClientCredentialsRequest(credentials, channel) {
        let tmpcr = this.pick(credentials, this.baseCredentialNames);
        let cr = Object.assign({}, tmpcr, {grant_type: 'client_credentials'});
        return this._tokenRequest(cr, channel);
    }

    _tokenRefreshRequest(credentials, refresh_token, channel) {
        let tmpcr = this.pick(credentials, this.baseCredentialNames);
        let cr = Object.assign({}, tmpcr, {grant_type: 'refresh_token', refresh_token: refresh_token});
        return this._tokenRequest(cr, channel);
    }

    _tokenDeviceCodeRequest(credentials, channel) {
        let tmpcr = this.pick(credentials, this.baseCredentialNames.concat(['uuid']));
        let cr = Object.assign({}, tmpcr, {grant_type: 'device'});
        return this._tokenRequest(cr, channel);
    }

    _tokenDeviceRequest(credentials, channel) {
        let tmpcr = this.pick(credentials, this.baseCredentialNames.concat(['code']));
        let cr = Object.assign({}, tmpcr, {grant_type: 'device'});
        return this._tokenRequest(cr, channel);
    }

    _tokenAppUserRequest(credentials, channel) {
        let tmpcr = this.pick(credentials, this.baseCredentialNames.concat(['username', 'password', 'device', 'deviceinfo']));
        let cr = Object.assign({}, tmpcr, {grant_type: 'appuser'});
        return this._tokenRequest(cr, channel);
    }

}
