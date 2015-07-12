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

Client.create = (environment, config) => {
	
	if(!config){
		config = Object.create(null);
	}
	
	config = Object.assign(ClientConfig.defaults(), config);
	
	return new Client(config, environment);
	
};