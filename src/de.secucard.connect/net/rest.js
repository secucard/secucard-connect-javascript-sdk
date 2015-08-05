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
		this.methodFuns[DELETE] = Request.delete;
		
		this.methodFuns[Channel.METHOD.GET] = Request.get;
		
		this.methodFuns[Channel.METHOD.CREATE] = Request.post;
		this.methodFuns[Channel.METHOD.EXECUTE] = Request.post;
		
		this.methodFuns[Channel.METHOD.UPDATE] = Request.put;
		this.methodFuns[Channel.METHOD.DELETE] = Request.delete;
		
	}
	
	configureWithContext(context) {
		
		this.restUrl = () => {
			
			return context.getConfig().getRestUrl();
			
		};
		
		this.getToken = () => {
			
			return context.getAuth().getToken();
			
		};
		
		this.isRequestWithToken = context.isRequestWithToken.bind(context);
		
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
			
			let url = message.baseUrl? message.baseUrl + message.url : message.url;
			let request = this.r(url, message.method);
			
			if(message.headers) {
				request.set(message.headers);
			}
			
			if(message.query){
				request.query(message.query);
			}
			
			if(message.body){
				request.send(message.body);
			}
			
			if(message.accept){
				request.accept(message.accept);
			}
			
			request.end((err, res) => {
				if (err) {
					reject(err, res);
				} else {
					resolve(res);
				}
			});
			
		});
		
	}
	
	getAuthHeader(token) {
		
		return { 'Authorization': ('Bearer ' + token.access_token) };
		
	}
	
	sendWithToken(message) {
		
		return this.getToken().then((token => {
			
			let headers = Object.assign({}, message.headers, this.getAuthHeader(token));
			message.setHeaders(headers);
			return this.send(message);
			
		}));
		
		
	}
	
	request(method, params) {
		
		let requestSuccess = (res) => {
			return res.body;
		};
		
		
		let requestError = (err) => {
			
			// if got auth error, redispatch it
			let error = err;
			let request = JSON.stringify({method: method, params: params});
			
			if(error instanceof AuthenticationFailedException) {
				
			} else {
				error = SecucardConnectException.create(err.response.body);
			}
			
			error.request = request;
			
			throw error;
			
		};
		
		let message = this.createMessageForRequest(method, params);
		
		let pr = (!this.isRequestWithToken || this.isRequestWithToken(params.options))? this.sendWithToken(message) : this.send(message);
		
		return pr.then(requestSuccess).catch(requestError);
		
	}
	
	createMessageForRequest(method, params) {
		
		let message = this.createMessage();
		message.setHeaders({'Content-Type' : 'application/json'});
		message.setMethod(method);
		
		let endPointSpec = [];
		
		if(params.appId){
			endPointSpec = ['General', 'Apps', params.appId, 'callBackend'];
		} else if(params.endpoint) {
			endPointSpec = params.endpoint;
		} else {
			throw new Error('Missing endpoint spec or app id.');
		}
		
		if (params.objectId != null) {
			endPointSpec.push(params.objectId);
		}
		
		if(params.action){
			endPointSpec.push(params.action);
		}
		
		if(params.actionArg){
			endPointSpec.push(params.actionArg);
		}
		
		message.setUrl(this.buildEndpoint(endPointSpec));
		
		if(params.queryParams){
			message.setQuery(params.queryParams);
		}
		
		if(params.data) {
			message.setBody(params.data);
		}
		
		minilog('secucard.rest').debug('message', message);
		
		return message;
		
	}
	
	buildEndpoint(endpoint) {
		
		if(!endpoint || endpoint.length < 2){
			throw new Error('Invalid endpoint specification.');
		}
		
		return endpoint.join('/');
		
	}
	
}

