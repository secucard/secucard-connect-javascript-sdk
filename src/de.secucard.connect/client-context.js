import _ from 'lodash';
import {Rest} from './net/rest';
import {Auth} from './auth/auth';
import {Credentials} from './auth/credentials';
import {AppService} from './product/app/app-service';
import {Channel} from './net/channel';
import EE from 'eventemitter3';

export class ClientContext {
	
	constructor(config, environment) {
		
		Object.assign(this, EE.prototype);
		
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
		let uid;
		for (let i = 0; i < classList.length; i++) {
			
			ServiceClass = classList[i];
			service = new ServiceClass();
			service.configureWithContext(this);
			uid = service.getUid();
			services[uid] = service;
			this.registerServiceEventTargets(service, service.getEventTargets());
		}
		
		this.services = services;
		
	}
	
	getService(uid) {
		return this.services[uid.toLowerCase()];
	}
	
	addAppService(AppMixin) {
		
		let appService = AppService.createWithMixin(AppMixin);
		appService.configureWithContext(this);
		this.services[appService.getUid()] = appService;
		this.registerServiceEventTargets(appService, appService.getEventTargets());
		return appService;
	}
	
	removeAppService(uid) {
		
		let appService = this.services[uid];
		
		if(appService && appService.isApp){
			
			this.unregisterServiceEventTargets(appService.getEventTargets());
			delete this.services[uid];
			
		} else {
			throw new Error('Service not found: ' + uid); // TODO custom errors
		}
		
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
			channelConfig: [Channel.STOMP, Channel.REST],
			useAuth: true
		}
		
	}
	
	isRequestWithToken(options) {
		
		return !options || (options && (!options.hasOwnProperty('useAuth') || options.useAuth));
		
	}
	
	registerServiceEventTargets(service, targets) {
		
		_.each(targets, (target) => {
			
			if(this.serviceEventTargets[target.toLowerCase()]){
				throw new Error('Provided event target is registered already: ' + target.toLowerCase()); //TODO custom errors
			}
			
			this.serviceEventTargets[target.toLowerCase()] = service;
			
		});
		
	}
	
	unregisterServiceEventTargets(targets) {
		
		_.each(targets, (target) => {
			
			delete this.serviceEventTargets[target.toLowerCase()];
			
		});
		
	}
	
	emitServiceEvent(event, target, type, data) {
		
		if(event) {
			target = event.target || target;
			type = event.type || type;
			data = event.data || data;
		}
		
		target = target.toLowerCase();
		let service = this.serviceEventTargets[target];
		service.emit(type, data);
		
	}
	
}
