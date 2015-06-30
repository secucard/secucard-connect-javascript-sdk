import {Message} from './net/message'
export class Connection {
	
	constructor(config) {
		this.config = config;
	}
	
	setCredentials() {
		
		return this;
		
	}
	
	setToken() {
		
		return this;
		
	}
	
	/**
	 * 
	 * @returns {Message}
	 */
	createMessage() {
		let message = new Message();
		return message.setBaseUrl(this.config.host);
	}
	
}

export function configure () {
	
	//let connection = new Connection()
	
}