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
import _ from 'lodash';
import {Token} from './token';
import mixins from '../util/mixins';
import Request from 'superagent';
import minilog from 'minilog';

export class TokenStorageInMem {
    
    constructor() {
        
    }

    setCredentials(credentials) {

        // use credentials as additional data and primary source when storing token
        this.credentials = credentials;

        let token = null;

        if (credentials.token) {
            token = Token.create(credentials.token);
            delete credentials.token;
        }

        return this.storeToken(token).then();

    }
    
    removeToken() {
        this.token = null;
        return Promise.resolve(this.token);
    }

    storeToken(token) {

        this.token = token ? token : null;
        return Promise.resolve(this.token);

    }

    getStoredToken() {

        return Promise.resolve(this.token);

    }

    /**
     * called when token is not defined or expired
     */
    retrieveNewToken() {
        
        let retrieveToken = this.getRetrieveToken();
        
        if(_.isString(retrieveToken)) {
            
            if(this.retrievingToken) {
                return this.retrievingToken;
            }
            
            this.retrievingToken = (new Promise((resolve, reject) => {

                let url = retrieveToken;
                let request = Request.get(url);

                request.end((err, res) => {
                    if (err) {
                        reject(err, res);
                    } else {
                        resolve(res);
                    }
                });

            })).then((response) => {
                
                delete this.retrievingToken;
                
                minilog('secucard.TokenStorageInMem').debug(response.text);
                
                if(!Token.isValid(response.body)) {
                    let err = `Retrieved token from ${retrieveToken} is not valid: ${response.text}`;
                    minilog('secucard.TokenStorageInMem').error(`${err}. Please check if 'Content-type' header set to 'application/json'`);
                    throw new Error(err);
                }
                
                return this.storeToken(response.body);
                
            }).catch((err) => {
                delete this.retrievingToken;
                throw err;
            });
            
            return this.retrievingToken;
            
        } else if(_.isFunction(retrieveToken)) {
            
            if(this.retrievingToken) {
                return this.retrievingToken;
            }
            
            this.retrievingToken = retrieveToken().then((token) => {
                delete this.retrievingToken;
                
                if(!Token.isValid(token)) {
                    let err = `Retrieved token from ${JSON.stringify(token)} is not valid`;
                    minilog('secucard.TokenStorageInMem').error(`${err}`);
                    throw new Error(err);
                }
                
                return this.storeToken(token);
            }).catch((err) => {
                console.log(err);
                delete this.retrievingToken;
                throw err;
            });
            
            return this.retrievingToken;
            
        } else {
            return Promise.reject();
        }
        
    }

}

TokenStorageInMem.createWithMixin = (TokenStorageMixin) => {

    let Mixed = mixins(TokenStorageInMem, TokenStorageMixin);
    return new Mixed();

};