
import _ from 'lodash';
import {POST} from '../net/message'



export class Auth {
	
	baseCredentialNames = ['client_id', 'client_secret'];
	baseHeaders = {'Content-Type': 'application/x-www-form-urlencoded'};
	
	constructor() {
		
	}
	
	getToken(){
		
		let token = this.getStoredToken();
		let cr = this.getCredentials();
		let ch = this.getChannel();
		
		if(token != null && token.getRefreshToken() != null) {
			
			return this._tokenRefreshRequest(cr, ch);
			
		}
		
		return this._tokenClientCredentialsRequest(cr, ch)
			.then((res) => {
				return res.body;
			}).catch((err) => {
				let error = new Error('Authorization error');
				error.data = err.response.body;
				throw error;
			});
		
	}
	
	getStoredToken() {
		let cr = this.getCredentials();
		return cr.token;
	}
	
	_tokenRequest(credentials, channel) {
		let m = channel.createMessage()
			.setUrl('/oauth/token')
			.setHeaders(this.baseHeaders)
			.setMethod(POST)
			.setBody(credentials);
		return channel.send(m);
	}
	
	_tokenClientCredentialsRequest(credentials, channel) {
		let cr = _.pick(credentials, this.baseCredentialNames);
		cr = _.assign({}, cr, {grant_type: 'client_credentials'});
		return this._tokenRequest(cr, channel);
	}
	
	_tokenAppUserRequest(credentials, channel) {
		let cr = _.pick(credentials, this.baseCredentialNames.concat(['username', 'password', 'device', 'deviceinfo']));
		cr = _.assign({}, cr, {grant_type: 'appuser'});
		return this._tokenRequest(cr, channel);
	}
	
	_tokenRefreshRequest(credentials, channel) {
		let cr = _.pick(credentials, this.baseCredentialNames.concat(['refresh_token']));
		cr = _.assign({}, cr, {grant_type: 'refresh_token'});
		return this._tokenRequest(cr, channel);
	}
	
	_tokenReviceCodeRequest(credentials, channel) {
		let cr = _.pick(credentials, this.baseCredentialNames.concat(['uuid']));
		cr = _.assign({}, cr, {grant_type: 'device'});
		return this._tokenRequest(cr, channel);
	}
	
	_tokenDeviceRequest(credentials, channel) {
		let cr = _.pick(credentials, this.baseCredentialNames.concat(['code']));
		cr = _.assign({}, cr, {grant_type: 'device'});
		return this._tokenRequest(cr, channel);
	}
	
	configureWithContext(context) {
		
		this.getChannel = context.getRestChannel.bind(context);
		this.getCredentials = context.getCredentials.bind(context);
		
	}
	
}
