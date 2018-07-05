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
import Request from 'superagent';
import {GET, POST, PUT, HEAD, DELETE} from './message';
import {Message} from './message';
import {Channel} from './channel';
import {AuthenticationFailedException} from '../auth/exception';
import {SecucardConnectException} from './exception';
import minilog from 'minilog';

export class Rest {

    constructor() {
        this.methodFuns = {};

        this.methodFuns[GET] = Request.get;
        this.methodFuns[POST] = Request.post;

        this.methodFuns[PUT] = Request.put;
        this.methodFuns[HEAD] = Request.head;
        this.methodFuns[DELETE] = Request.del;

        this.methodFuns[Channel.METHOD.GET] = Request.get;

        this.methodFuns[Channel.METHOD.CREATE] = Request.post;
        this.methodFuns[Channel.METHOD.EXECUTE] = Request.post;

        this.methodFuns[Channel.METHOD.UPDATE] = Request.put;
        this.methodFuns[Channel.METHOD.DELETE] = Request.del;
    }

    configureWithContext(context) {
        this.restUrl = () => {
            return context.getConfig().getRestUrl();
        };

        this.getToken = (extend) => {
            return context.getAuth().getToken(extend);
        };
        
        this.withCredentials = () => {
            return context.getConfig().getWithCredentials();
        };

        this.isRequestWithToken = context.isRequestWithToken.bind(context);

        this.getLanguage = () => {
            return context.getConfig().getLanguage();
        }
    }

    open() {
        return Promise.resolve(true);
    }

    /**
     *
     * @returns {Message}
     */
    createMessage() {
        let message = new Message();
        return message.setBaseUrl(this.restUrl());
    }

    /**
     *
     * @param url
     * @param method
     * @returns {Request}
     */
    r(url, method) {
        return this.methodFuns[method](url);
    }

    /**
     *
     * @param message
     * @returns {Promise}
     */
    send(message) {
        return new Promise((resolve, reject) => {
            this.createRequestFromMessage(message).end((err, res) => {
                if (err) {
                    //minilog('secucard.rest').debug(err);
                    reject(err, res);
                } else {
                    resolve(res);
                }
            });
        });
    }

    createRequestFromMessage(message) {
        let url = message.baseUrl ? message.baseUrl + message.url : message.url;
        let request = this.r(url, message.method);

        if (this.withCredentials()) {
            request.withCredentials();
        }

        if (message.headers) {
            request.set(message.headers);
        }

        if (message.query) {
            //console.log(QS.stringify(message.query), message.query);
            //request.query(QS.stringify(message.query))
            request.query(message.query);
        }

        if (message.body) {
            request.send(message.body);
        }

        if (message.accept) {
            request.accept(message.accept);
        }

        if (message.multipart && message.multipart.files) {
            message.multipart.files.forEach((item) => {
                request.attach(item.field, item.path, item.filename);
            });
        }

        if (message.multipart && message.multipart.fields) {
            message.multipart.fields.forEach((item) => {
                request.field(item.name, item.value);
            });
        }

        return request;
    }

    /**
     * Builds the authorization header
     * @param token
     * @returns {{Authorization: string}}
     */
    getAuthHeader(token) {
        return {'Authorization': ('Bearer ' + token.access_token)};
    }

    /**
     * Inform about the preferred language
     * @returns {{"Accept-Language": string}}
     */
    getLanguageHeader() {
        return {'Accept-Language': (this.getLanguage())};
    }

    sendWithToken(message) {
        return this.getToken(true).then((token => {
            let headers = Object.assign({}, message.headers, this.getAuthHeader(token), this.getLanguageHeader());
            message.setHeaders(headers);
            return this.send(message);
        }));
    }

    request(method, params) {
        let requestSuccess = (res) => {
            minilog('secucard.rest').debug('requestSuccess', res.req.path);
            return res.body;
        };

        let requestError = (err) => {
            // if got auth error, redispatch it
            let error = err;
            let request = JSON.stringify({method: method, params: params});

            if (err.response){
                error = SecucardConnectException.create(err.response.body);
            }

            error.request = request;

            throw error;
        };

        let message = this.createMessageForRequest(method, params);

        let pr = (!this.isRequestWithToken || this.isRequestWithToken(params.options)) ? this.sendWithToken(message) : this.send(message);

        return pr.then(requestSuccess).catch(requestError);
    }

    generateUrl(method, params) {
        
        let message = this.createMessageForRequest(method, params);
        let req = this.createRequestFromMessage(message);
        
        var query = req._query? req._query.join('&') : '';
        
        let url = req.url;
        
        if (query) {
            url += (url.indexOf('?') >= 0 ? '&' : '?') + query;
        }
        
        return url;
        
    }

    createMessageForRequest(method, params) {
        let message = this.createMessage();
        let headers = Object.assign({}, {'Content-Type': 'application/json'}, this.getLanguageHeader());

        if(params.headers) {
            Object.assign(headers, params.headers);
        }

        if (!params.multipart) {
            message.setHeaders(headers);
        }

        message.setMethod(method);

        let endPointSpec = [];

        if (params.appId) {
            endPointSpec = ['General', 'Apps', params.appId, 'callBackend'];
        } else if (params.endpoint) {
            endPointSpec = params.endpoint;
        } else {
            throw new Error('Missing endpoint spec or app id.');
        }

        if (params.objectId != null) {
            endPointSpec.push(params.objectId);
        }

        if (params.action) {
            endPointSpec.push(params.action);
        }

        if (params.actionArg) {
            endPointSpec.push(params.actionArg);
        }

        message.setUrl(this.buildEndpoint(endPointSpec));

        if (params.queryParams) {
            message.setQuery(params.queryParams);
        }

        if (params.data) {
            message.setBody(params.data);
        }

        if(params.multipart) {
            message.setMultipart(params.multipart);
        }

        minilog('secucard.rest').debug('message', message);

        return message;
    }

    buildEndpoint(endpoint) {
        if (!endpoint || endpoint.length < 2) {
            throw new Error('Invalid endpoint specification.');
        }

        return endpoint.join('/');
    }
}

