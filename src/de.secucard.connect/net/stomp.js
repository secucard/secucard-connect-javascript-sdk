import UUID from 'uuid';
import QS from 'qs';
import {Channel} from './channel';

let utils = {};
utils.really_defined = (var_to_test) => {
    return !(var_to_test == null || var_to_test == undefined);
};

utils.queryToString = (queryObject) => {
	return QS.stringify(queryObject);
};

utils.sizeOfUTF8 = (str) => {
	let size = 0;
	if(str) {
		// TODO tricky thing
		size = encodeURI(str).match(/%..|./g).length;
	}
	return size;
};

export class Stomp {
	
	constructor (StompImpl) {
		
		this.connection = null;
		this.messages = {};
		
		// is used when refreshening session
		this.isConfirmed = false;
		this.sessionTimer = null;
		
		// is used to check if token changed
		this.connectAccessToken = null;
		
		this.stompCommands = {};
		this.stompCommands[Channel.METHOD.GET] = 'get';
		this.stompCommands[Channel.METHOD.CREATE] = 'add';
		this.stompCommands[Channel.METHOD.EXECUTE] = 'exec';
		this.stompCommands[Channel.METHOD.UPDATE] = 'update';
		this.stompCommands[Channel.METHOD.DELETE] = 'delete';
		
		this.connection = new StompImpl();
		this.connection.on('message', this._handleStompFrame);
	}
	
	configureWithContext(context) {
		
		this.getToken = () => {
			
			return context.getAuth().getToken();
			
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
		
		this.connection.configure(this.getStompConfig());
		
	}
	
	getStompConfig() {
		
		return {
			
			host: this.getStompHost(),
			port: this.getStompPort(),
			ssl: this.getStompSslEnabled(),
			vhost: this.getStompVHost(),
			
			login: '',
			passcode: ''
		}
		
	}
	
	open() {
		
		return this._startSessionRefresh();
		
	}
	
	connect () {
		
		console.log('stomp start connection');
		
		return this.getToken().then((token) => {
			
			console.log('Got token', token);
			return this._connect(token.access_token);
			
			
		});
	}
	
	close () {
		
		return this._disconnect();
		
	}
	
	_disconnect() {
		
		return new Promise((resolve, reject) => {
			
			if(!this.connection.isConnected()) {
				resolve();
				return;
			}
			
			if (this.connection && this.connection.disconnect) {
				this.connection.disconnect();
			}
			
			this._stompOnDisconnected = () => {
				console.log('stomp disconnected');
				this.connection.removeListener('connected', this._stompOnDisconnected);
				delete this._stompOnDisconnected;
				resolve();
			};
			
			//TODO do we need to reject here?
			this.connection.on('disconnected', this._stompOnDisconnected);
			
		});
		
	}
	
	addMessage (correlationId, callback) {
		this.messages[correlationId] = callback;
	}
	
	request(method, params) {
		
		let destination = this.buildDestination(method, params);
		let message = this.createMessage(params);
		return _sendMessage(destination, message);
		
	}
	
	buildDestination(method, params) {
		
		let destination = {};
		
		if(params.endpoint != null) {
			destination.endpoint = params.endpoint;
		} else if(params.appId != null){
			destination.appId = params.appId;
		} else {
			throw new Error('Missing object spec or app id');
		}
		
		destination.command = this.stompCommands[method];
		
		if(!destination.command) {
			throw new Error('Invalid method arg');
		}
		
		destination.action = params.action;
		
		return destination;
	}
	
	createMessage(params) {
		
		let message = {};
		
		if(utils.really_defined(params.objectId)){
			message.pid = params.objectId;
		}
		
		if(utils.really_defined(params.actionArg)){
			message.sid = params.actionArg;
		}
		
		if(utils.really_defined(params.queryParams)){
			message.query = utils.queryToString(params.queryParams);
		}
		
		if(utils.really_defined(params.data)){
			message.data = params.data;
		}
		
		return message;
		
	}
	
	_connect(accessToken) {
		
		this.connectAccessToken = accessToken;
		
		let stompCredentials = {
			login: accessToken,
			passcode: accessToken
		};

		/*
		 this.connection.should_run_message_callback = function (frame) {

		 frame.body = JSON.parse(frame.body[0]);

		 // execute correlation-id callback
		 if (frame && frame.headers && frame.headers['correlation-id']) {
		 var correlationId = frame.headers['correlation-id'];
		 _this.messages[correlationId](null, frame.headers, frame.body);
		 }

		 //_this.emit("onMessage", frame.body);
		 };
		 */
		
		this.connection.connect(stompCredentials);
		
		return new Promise((resolve, reject) => {
			
			this._stompOnConnected = () => {
				console.log('stomp connected');
				this._stompClearListeners();
				resolve();
			};
			
			this._stompOnError = (body) => {
				console.log('stomp error', body);
				this._stompClearListeners();
				reject(body);
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
		
		
		return this.getToken().then((token) => {
			
			let accessToken = token.access_token;
			let correlationId = this.createCorrelationId();
			
			let headers = {};
			headers['reply-to'] = this.getStompQueue();
			headers['content-type'] = 'application/json';
			headers['user-id'] = accessToken;
			headers['correlation-id'] = correlationId;
			
			if(destinationObj.appId) {
				headers['app-id'] = destinationObj.appId;
			}
			
			let body = JSON.stringify(message);
			headers['content-length'] = utils.sizeOfUTF8(body);
			
			let destination = this.getStompDestination();
			if(destinationObj.appId) {
				
				destination += 'app:' + destinationObj.action;
				
			} else {
				
				destination += 'api:' + destinationObj.command + ':';
				
				let endpoint = [];
				if(destinationObj.endpoint){
					endpoint = endpoint.concat(destinationObj.endpoint);
				}
				if(destinationObj.action) {
					endpoint = endpoint.push(destinationObj.action);
				}
				
				destination += endpoint.join('.');
				
			}
			
			
			let sendWithStomp = () => {
				
				return new Promise((resolve, reject) => {
					
					this.messages[correlationId] = {resolve: resolve, reject: reject};
					this.connection.send(destination, headers, body);
					
				});
				
			};
			
			if(!this.connection.isConnected() || (token && token.access_token != this.connectAccessToken)) {

				if (this.connection.isConnected()) {
					console.log("Reconnect due token change.");
				}
				
				return this._disconnect().then(() => {
					
					return this._connect(accessToken).then(sendWithStomp);
					
				});
				
			}
			
			return sendWithStomp();
			
		});
		
		
	}
	
	_startSessionRefresh() {
		
		console.log('Stomp session refresh loop started');
		let initial = true;
		
		let _runSessionRefresh = () => {
			
			return this._request(Channel.METHOD.EXECUTE, {
				endpoint: ['auth', 'sessions'],
				objectId: 'me',
				action: 'refresh'
			}).then((res) => {
				
				console.log('Session refresh sent');
				this.isConfirmed = false;
				initial = false;
				
			}).catch((err) => {
				
				console.log('Session refresh failed');
				if(initial){
					throw err;
				}
				
			});
			
		};
		
		
		return _runSessionRefresh();
		
	}
	
	_handleStompFrame(frame) {

		//frame.body = JSON.parse(frame.body[0]);
		
		// execute correlation-id callback
		if (frame && frame.headers && frame.headers['correlation-id']) {
			var correlationId = frame.headers['correlation-id'];
			this.messages[correlationId].resolve(frame);
			delete this.messages[correlationId];
		}
		
	}
	
	createCorrelationId() {
		return UUID.v1();
	}
	
} 