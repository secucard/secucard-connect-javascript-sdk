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
import UUID from 'uuid';
import EE from 'eventemitter3';
import minilog from 'minilog';

import {Channel} from './channel';
import {Stomp as StompImpl} from './stomp-impl/stomp';
import {SecucardConnectException} from './exception';
import {AuthenticationFailedException} from '../auth/exception';

let utils = {};
utils.really_defined = (var_to_test) => {
    return !(var_to_test == null || var_to_test == undefined);
};

utils.sizeOfUTF8 = (str) => {
    let size = 0;
    if (str) {
        // TODO tricky thing
        size = encodeURI(str).match(/%..|./g).length;
    }
    return size;
};

export class Stomp {

    constructor(SocketImpl) {

        Object.assign(this, EE.prototype);

        this.connection = null;
        this.messages = {};

        // is used when refreshening session
        this.skipSessionRefresh = false;
        this.sessionTimer = null;

        // is used to check if token changed
        this.connectAccessToken = null;

        this.stompCommands = {};
        this.stompCommands[Channel.METHOD.GET] = 'get';
        this.stompCommands[Channel.METHOD.CREATE] = 'add';
        this.stompCommands[Channel.METHOD.EXECUTE] = 'exec';
        this.stompCommands[Channel.METHOD.UPDATE] = 'update';
        this.stompCommands[Channel.METHOD.DELETE] = 'delete';

        this.connection = new StompImpl(SocketImpl);
        this.connection.on('message', this._handleStompMessage.bind(this));
    }

    configureWithContext(context) {

        this.emitServiceEvent = context.emitServiceEvent.bind(context);

        this.getToken = (extend) => {
            return context.getAuth().getToken(extend);
        };

        this.getStompHost = () => {
            return context.getConfig().getStompHost();
        };

        this.getStompPort = () => {
            return context.getConfig().getStompPort();
        };

        this.getStompSslEnabled = () => {
            return context.getConfig().getStompSslEnabled();
        };

        this.getStompVHost = () => {
            return context.getConfig().getStompVHost();
        };

        this.getStompQueue = () => {
            return context.getConfig().getStompQueue();
        };

        this.getStompDestination = () => {
            return context.getConfig().getStompDestination();
        };

        this.getStompEndpoint = () => {
            return context.getConfig().getStompEndpoint();
        };

        this.getStompHeartbeatMs = () => {
            return context.getConfig().getStompHeartbeatMs();
        }

    }

    getStompConfig() {

        return {

            host: this.getStompHost(),
            port: this.getStompPort(),
            ssl: this.getStompSslEnabled(),
            vhost: this.getStompVHost(),
            heartbeatMs: this.getStompHeartbeatMs(),
            endpoint: this.getStompEndpoint(),
            login: '',
            passcode: ''
        }

    }

    open() {

        return this._startSessionRefresh();

    }

    connect() {

        minilog('secucard.stomp').debug('stomp start connection');

        return this.getToken().then((token) => {

            minilog('secucard.stomp').debug('Got token', token);
            return this._connect(token.access_token);


        });
    }

    close() {

        if (this.sessionTimer) {
            clearInterval(this.sessionTimer);
        }

        return this._disconnect();

    }

    _disconnect() {

        return new Promise((resolve, reject) => {

            let ignoreSession = true;
            if (!this.connection.isConnected(ignoreSession)) {
                resolve();
                return;
            }

            if (this.connection && this.connection.disconnect) {

                this.connection.disconnect();

                this._stompOnDisconnected = () => {
                    minilog('secucard.stomp').debug('stomp disconnected');
                    this.connection.removeListener('disconnected', this._stompOnDisconnected);
                    delete this._stompOnDisconnected;
                    resolve();
                };

                //TODO do we need to reject here?
                this.connection.on('disconnected', this._stompOnDisconnected);

            } else {

                resolve();

            }

        });

    }

    request(method, params) {

        let destination = this.buildDestination(method, params);
        let message = this.createMessage(params);
        return this._sendMessage(destination, message).catch((err) => {
            err.request = JSON.stringify({method: method, params: params});
            throw err;
        });

    }

    buildDestination(method, params) {

        let destination = {};

        if (params.endpoint != null) {
            destination.endpoint = params.endpoint;
        } else if (params.appId != null) {
            destination.appId = params.appId;
        } else {
            throw new Error('Missing object spec or app id');
        }

        destination.command = this.stompCommands[method];

        if (!destination.command) {
            throw new Error('Invalid method arg');
        }

        destination.action = params.action;

        return destination;
    }

    createMessage(params) {

        let message = {};

        if (utils.really_defined(params.objectId)) {
            message.pid = params.objectId;
        }

        if (utils.really_defined(params.actionArg)) {
            message.sid = params.actionArg;
        }

        if (utils.really_defined(params.queryParams)) {
            message.query = params.queryParams;
        }

        if (utils.really_defined(params.data)) {
            message.data = params.data;
        }

        return message;

    }

    _connect(accessToken) {

        if (!accessToken) {

            return this.close().then(() => {
                // don't login with empty token
                //throw new AuthenticationFailedException('Access token is not valid');
                return Promise.reject(new AuthenticationFailedException('Access token is not valid'));

            });

        }

        this.connectAccessToken = accessToken;

        let stompCredentials = {
            login: accessToken,
            passcode: accessToken
        };

        this.connection.configure(this.getStompConfig());
        this.connection.connect(stompCredentials);

        return new Promise((resolve, reject) => {

            this._stompOnConnected = () => {
                minilog('secucard.stomp').debug('stomp connected');
                this._stompClearListeners ? this._stompClearListeners() : null;
                resolve(true);
            };

            this._stompOnError = (message) => {
                minilog('secucard.stomp').error('stomp error', message);
                this._stompClearListeners ? this._stompClearListeners() : null;
                this.close().then(() => {
                    if (message.headers && message.headers.message == 'Bad CONNECT') {
                        reject(new AuthenticationFailedException(message.body[0]));
                    } else {
                        reject(message);
                    }
                });
            };

            this._stompClearListeners = () => {
                this.connection.removeListener('connected', this._stompOnConnected);
                this.connection.removeListener('error', this._stompOnError);
                delete this._stompOnConnected;
                delete this._stompOnError;
                delete this._stompClearListeners;
            };

            this.connection.on('connected', this._stompOnConnected);
            this.connection.on('error', this._stompOnError);


        });


    }

    _sendMessage(destinationObj, message) {

        minilog('secucard.stomp').debug('message', destinationObj, message);

        return this.getToken(true).then((token) => {

            let accessToken = token.access_token;
            let correlationId = this.createCorrelationId();

            let headers = {};
            headers['reply-to'] = this.getStompQueue();
            headers['content-type'] = 'application/json';
            headers['user-id'] = accessToken;
            headers['correlation-id'] = correlationId;

            if (destinationObj.appId) {
                headers['app-id'] = destinationObj.appId;
            }

            let body = JSON.stringify(message);
            headers['content-length'] = utils.sizeOfUTF8(body);

            let destination = this.getStompDestination();
            if (destinationObj.appId) {

                destination += 'app:' + destinationObj.action;

            } else {

                destination += 'api:' + destinationObj.command + ':';

                let endpoint = [];
                if (destinationObj.endpoint) {
                    endpoint = endpoint.concat(destinationObj.endpoint);
                }
                if (destinationObj.action) {
                    endpoint.push(destinationObj.action);
                }

                destination += endpoint.join('.');

            }


            let sendWithStomp = () => {

                return new Promise((resolve, reject) => {

                    this.messages[correlationId] = {resolve: resolve, reject: reject};
                    this.connection.send(destination, headers, body);

                });

            };

            if (!this.connection.isConnected() || (accessToken != this.connectAccessToken)) {

                if (this.connection.isConnected()) {
                    minilog('secucard.stomp').warn('Reconnect due token change.');
                }

                return this._disconnect().then(() => {

                    // when reconnecting start with session refresh and then send the request
                    return this._runSessionRefresh().then(sendWithStomp);

                });

            }

            return sendWithStomp();

        });


    }

    _startSessionRefresh() {

        minilog('secucard.stomp').debug('Stomp session refresh loop started');

        let initial = true;

        // always refresh session with interval less than stomp heart-beat if defined
        let sessionInterval = this.getStompHeartbeatMs() > 0 ? this.getStompHeartbeatMs() - 500 : 25 * 1000;

        this.sessionTimer = setInterval(() => {

            if (this.skipSessionRefresh) {
                this.skipSessionRefresh = false;
            } else {
                this._runSessionRefresh(false);
            }

        }, sessionInterval);

        return this._runSessionRefresh(initial);

    }

    _runSessionRefresh(initial) {

        let createRefreshRequest = () => {

            return this.request(Channel.METHOD.EXECUTE, {
                endpoint: ['auth', 'sessions'],
                objectId: 'me',
                action: 'refresh'
            }).then((res) => {

                this.emit('sessionRefresh');
                minilog('secucard.stomp').debug('Session refresh sent');
                this.skipSessionRefresh = false;
                return res;

            }).catch((err) => {

                this.emit('sessionRefreshError');
                minilog('secucard.stomp').error('Session refresh failed');
                if (initial) {
                    throw err;
                }

            });

        };

        if (!this.connection.isConnected()) {

            return this.connect().then(createRefreshRequest);

        } else {

            return createRefreshRequest();

        }

    }

    _handleStompMessage(frame) {

        // skip next session refresh 
        this.skipSessionRefresh = true;

        minilog('secucard.stomp').debug('_handleStompMessage', frame);

        let body;
        // execute correlation-id callback
        if (frame && frame.headers && frame.headers['correlation-id']) {

            var correlationId = frame.headers['correlation-id'];
            body = JSON.parse(frame.body[0]);

            if (body.status == 'ok') {
                this.messages[correlationId].resolve(body.data);
            } else {
                let error = SecucardConnectException.create(body);
                this.messages[correlationId].reject(error);
            }

            delete this.messages[correlationId];

        } else if (frame) {

            body = JSON.parse(frame.body[0]);
            this.emitServiceEvent(null, body.target, body.type, body.data);

        }

    }

    createCorrelationId() {
        return UUID.v1();
    }

} 