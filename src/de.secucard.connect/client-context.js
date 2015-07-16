import _ from 'lodash';
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
		
		if(config.stompEnabled) {
			let stompChannel = environment.StompChannel.create();
			stompChannel.configureWithContext(this);
			this.stompChannel = stompChannel;
		}
		
		this.channels = {
			stomp: this.stompChannel,
			rest: this.restChannel
		};
		
		this.serviceEventTargets = Object.create(null);
		
		this.createServices(environment.services);
		
		this.config = config;
		
		
	}
	
	open() {
		
		
		return this.getAuth().getToken().then(()=>{
			
			if(!this.config.stompEnabled) {
				return true;
			}
			
			return Promise.all(_.map(_.values(this.channels), (channel) => {
				return channel.open();
			}));
			
		});
		
	}
	
	createServices(classList) {
		
		let services = Object.create(null);
		let ServiceClass;
		let service;
		let target;
		for (let i = 0; i < classList.length; i++) {
			
			ServiceClass = classList[i];
			service = new ServiceClass();
			service.configureWithContext(this);
			target = service.getEndpoint().join('.').toLowerCase();
			services[target] = service;
			this.registerServiceEventTargets(service, service.getEventTargets());
		}
		
		this.services = services;
		
	}
	
	getService(target) {
		return this.services[target.toLowerCase()];
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
	
	getChannel(channelConfig) {
		
		let ch = null;
		_.each(_(channelConfig).reverse().value(), (type)=>{
			if(this.getChannelByType(type)) {
				ch = this.getChannelByType(type);
			}
		});
		if(!ch){
			// TODO custom error
			throw new Error('Channel not found, please, check channel config for the service: ' + JSON.stringify(channelConfig));
		}
		return ch;
	}
	
	getChannelByType(type) {
		
		return this.channels[type];
		
	}
	
	getRestChannel() {
		return this.restChannel;
	}
	
	getStompChannel() {
		return this.stompChannel;
	}
	
	getServiceDefaultOptions() {
		
		return {
			// stomp is preferred
			channelConfig: ['stomp', 'rest']
		}
		
	}
	
	registerServiceEventTargets(service, targets) {
		
		_.each(targets, (target) => {
			
			this.serviceEventTargets[target.toLowerCase()] = service;
			
		});
		
	}
	
	emitServiceEvent(target, type, data) {
		
		target = target.toLowerCase();
		let service = this.serviceEventTargets[target];
		service.emit(type, data);
		
	}
	
}
