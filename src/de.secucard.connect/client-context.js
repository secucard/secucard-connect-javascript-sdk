import {Rest} from './net/rest';
import {Auth} from './auth/auth';
import {Credentials} from './auth/credentials';
export class ClientContext {
	
	constructor(config, environment) {
		
		let auth = new Auth();
		auth.configureWithContext(this);
		this.auth = auth;
		
		let restChannel = new Rest();
		restChannel.configureWithContext(this);
		this.restChannel = restChannel;
		
		let stompChannel = environment.StompChannel.create();
		stompChannel.configureWithContext(this);
		this.stompChannel = stompChannel;
		
		this.config = config;
		
		
	}
	
	setCredentials(credentials) {
		this.credentials = Credentials.create(credentials);
	}
	
	getCredentials() {
		return this.credentials;
	}
	
	getConfig() {
		return this.config;
	}
	
	getAuth() {
		return this.auth;
	}
	
	getChannel() {
		// TODO here goes the logic of choosing the channel
		return null;
	}
	
	getRestChannel() {
		return this.restChannel;
	}
	
	getStompChannel() {
		return this.stompChannel;
	}
	
	getServiceDefaultOptions() {
		
		
		
	}
	
}
