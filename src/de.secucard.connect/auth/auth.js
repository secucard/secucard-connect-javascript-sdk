import _ from 'lodash';
import {POST} from '../net/message';
import {Token} from './token';
import {AuthenticationFailedException} from './exception';
export class Auth {
	
	baseCredentialNames = ['client_id', 'client_secret'];
	baseHeaders = {'Content-Type': 'application/x-www-form-urlencoded'};
	
	constructor() {
		
	}
	
	configureWithContext(context) {
		
		this.emit = context.emit.bind(context);
		
		this.getChannel = context.getRestChannel.bind(context);
		this.getCredentials = context.getCredentials.bind(context);
		
		this.oAuthUrl = () => {
			
			return context.getConfig().getOAuthUrl();
			
		};
		
	}
	
	getToken(extend){
		
		//TODO implement auth for device
		
		let token = this.getStoredToken();
		
		if(token != null && !token.isExpired()){
			if(extend){
				// extend expire time on every token access, assuming the token is used, if not this could cause auth failure
				token.setExpireTime();
        		this.storeToken(token);
			}
			
			return Promise.resolve(token);
			
		}
		
		let cr = this.getCredentials();
		let ch = this.getChannel();
		
		let tokenSuccess = (res) => {
			
			let _token = token? token.update(res.body) : Token.create(res.body);
			_token.setExpireTime();
			this.storeToken(_token);
			return _token;
			
		};
		
		let tokenError = (err) => {
			// refreshing failed, clear the token
			this.removeToken();
			let error = Object.assign(new AuthenticationFailedException(), err.response.body);
			//error.data = err.response.body;
			throw error;
		};
		
		let req;
		
		if(token != null && token.getRefreshToken() != null) {
			
			req = this._tokenRefreshRequest(cr, token.getRefreshToken(), ch);
			
		} else {
			
			req = this.isDeviceAuth(cr)? this.getDeviceToken(cr, ch) : this._tokenClientCredentialsRequest(cr, ch);
			
		}
		
		return req.then(tokenSuccess).catch(tokenError);
		
	}
	
	isDeviceAuth(credentials) {
		return credentials.uuid != undefined && credentials.uuid != null;
	}
	
	getDeviceToken(credentials, channel) {
		
		return this._tokenDeviceCodeRequest(credentials, channel).then((res) => {
			
			this.emit('deviceCode', res);
			
			/*
			{ device_code: '4b3e0c6733bf616f438ac2992be2a610',
			  user_code: 'vfazyp5f',
			  verification_url: 'http://www.secuoffice.com',
			  expires_in: 1200,
			  interval: 5 }
			 */
			
			let pollIntervalSec = res.interval > 0? res.interval : 5;
			
			return new Promise((resolve, reject) => {
				
				resolve();
				
			});
			
		});
		
	}
	
	removeToken() {
		
		let cr = this.getCredentials();
		if(!cr) {
			let err = new AuthenticationFailedException('Credentials error');
			throw err;
		}
		cr.token = null;
		
	}
	
	storeToken(token) {
		
		let cr = this.getCredentials();
		if(!cr) {
			let err = new AuthenticationFailedException('Credentials error');
			throw err;
		}
		cr.token = token;
		
	}
	
	getStoredToken() {
		let cr = this.getCredentials();
		if(!cr) {
			let err = new AuthenticationFailedException('Credentials error');
			throw err;
		}
		return cr.token;
	}
	
	_tokenRequest(credentials, channel) {
		let m = channel.createMessage()
			.setBaseUrl(this.oAuthUrl())
			.setUrl('token')
			.setHeaders(this.baseHeaders)
			.setMethod(POST)
			.setBody(credentials);
		console.log('token request', m);
		return channel.send(m);
	}
	
	_tokenClientCredentialsRequest(credentials, channel) {
		let cr = _.pick(credentials, this.baseCredentialNames);
		cr = _.assign({}, cr, {grant_type: 'client_credentials'});
		return this._tokenRequest(cr, channel);
	}
	
	_tokenRefreshRequest(credentials, refresh_token, channel) {
		let cr = _.pick(credentials, this.baseCredentialNames);
		cr = _.assign({}, cr, {grant_type: 'refresh_token', refresh_token: refresh_token});
		return this._tokenRequest(cr, channel);
	}
	
	_tokenDeviceCodeRequest(credentials, channel) {
		let cr = _.pick(credentials, this.baseCredentialNames.concat(['uuid']));
		cr = _.assign({}, cr, {grant_type: 'device'});
		return this._tokenRequest(cr, channel);
	}
	
	_tokenDeviceRequest(credentials, channel) {
		let cr = _.pick(credentials, this.baseCredentialNames.concat(['code']));
		cr = _.assign({}, cr, {grant_type: 'device'});
		return this._tokenRequest(cr, channel);
	}
	
	_tokenAppUserRequest(credentials, channel) {
		let cr = _.pick(credentials, this.baseCredentialNames.concat(['username', 'password', 'device', 'deviceinfo']));
		cr = _.assign({}, cr, {grant_type: 'appuser'});
		return this._tokenRequest(cr, channel);
	}
	
}
