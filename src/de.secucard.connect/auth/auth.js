
import _ from 'lodash';
import {POST} from '../net/message';
import {Token} from './token';

export class Auth {
	
	baseCredentialNames = ['client_id', 'client_secret'];
	baseHeaders = {'Content-Type': 'application/x-www-form-urlencoded'};
	
	constructor() {
		
	}
	
	configureWithContext(context) {
		
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
			// TODO throw custom error
			let error = new Error('Authorization error');
			error.data = err.response.body;
			throw error;
		};
		
		if(token != null && token.getRefreshToken() != null) {
			
			return this._tokenRefreshRequest(cr, token.getRefreshToken(), ch)
				.then(tokenSuccess)
				.catch(tokenError);
			
		}
		
		return this._tokenClientCredentialsRequest(cr, ch)
			.then(tokenSuccess)
			.catch(tokenError);
		
	}
	
	removeToken() {
		
		let cr = this.getCredentials();
		cr.token = null;
		
	}
	
	storeToken(token) {
		
		let cr = this.getCredentials();
		cr.token = token;
		
	}
	
	getStoredToken() {
		let cr = this.getCredentials();
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
