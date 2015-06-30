
import _ from 'lodash';
import {POST} from '../net/message'



export class Auth {
	
	baseCredentialNames = ['client_id', 'client_secret'];
	baseHeaders = {'Content-Type': 'application/x-www-form-urlencoded'};
	
	constructor() {
		
	}
	
	_tokenRequest(credentials, channel) {
		let m = this.createMessage()
			.setUrl('/oauth/token')
			.setHeaders(this.baseHeaders)
			.setMethod(POST)
			.setBody(credentials);
		return channel.send(m);
	}
	
	getToken(credentials, channel) {
		let cr = _.pick(credentials, this.baseCredentialNames);
		cr = Object.assign(cr, {grant_type: 'client_credentials'});
		return this._tokenRequest(cr, channel)
	}
	
	getTokenAppUser(credentials, channel) {
		let cr = _.pick(credentials, this.baseCredentialNames.concat(['username', 'password', 'device', 'deviceinfo']));
		cr = Object.assign(cr, {grant_type: 'appuser'});
		return this._tokenRequest(cr, channel)
	}
	
	getTokenRefresh(credentials, channel) {
		let cr = _.pick(credentials, this.baseCredentialNames.concat(['refresh_token']));
		cr = Object.assign(cr, {grant_type: 'refresh_token'});
		return this._tokenRequest(cr, channel)
	}
	
	getTokenDeviceCode(credentials, channel) {
		let cr = _.pick(credentials, this.baseCredentialNames.concat(['uuid']));
		cr = Object.assign(cr, {grant_type: 'device'});
		return this._tokenRequest(cr, channel)
	}
	
	getTokenDevice(credentials, channel) {
		let cr = _.pick(credentials, this.baseCredentialNames.concat(['code']));
		cr = Object.assign(cr, {grant_type: 'device'});
		return this._tokenRequest(cr, channel)
	}
	
	configureWithConnection(connection) {
		
		this.createMessage = connection.createMessage.bind(connection);
		
	}
	
}
