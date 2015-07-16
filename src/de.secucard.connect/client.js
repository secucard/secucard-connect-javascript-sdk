import {Message} from './net/message';
import {ClientConfig} from './client-config';
import {ClientContext} from './client-context';

export class Client {
	
	constructor(config, environment) {
		
		this.config = config;
		this.context = new ClientContext(config, environment);
		this.getService = this.context.getService.bind(this.context);
		this.connected = false;
		
	}
	
	setCredentials(credentials) {
		this.context.setCredentials(credentials);
	}
	
	open() {
		
		if(this.connected) {
			return Promise.resolve(this.connected);
		}
		
		return this.context.open().then(() => {
			this.connected = true;
			return this.connected;
		});
		
	}
	
}

Client.create = (environment, config) => {
	
	if(!config){
		config = Object.create(null);
	}
	
	config = Object.assign(ClientConfig.defaults(), environment.config, config);
	
	return new Client(config, environment);
	
};