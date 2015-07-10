import {Message} from './net/message';
import {ClientConfig} from './client-config';
import {ClientContext} from './client-context';

export class Client {
	
	constructor(config, environment) {
		
		this.config = config;
		this.context = new ClientContext(config, environment);
		
	}
	
	setCredentials(credentials) {
		this.context.setCredentials(credentials);
	}
	
	connect() {
		
		return this.context.getAuth().getToken();
		
	}
	
}

Client.create = (environment) => {
	
	let config = ClientConfig.defaults();
    let client = new Client(config, environment);
	return client;
	
};