/*
 Copyright 2015 hp.weber GmbH & Co secucard KG (www.secucard.com)
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */
import {Message} from './net/message';
import {ClientConfig} from './client-config';
import {ClientContext} from './client-context';
import {Version} from './client-version';

export class Client {
	
	constructor(config, environment) {
		
		this.config = config;
		this.context = new ClientContext(config, environment);
		this.getService = this.context.getService.bind(this.context);
		this.addAppService = this.context.addAppService.bind(this.context);
		this.removeAppService = this.context.removeAppService.bind(this.context);
		this.emitServiceEvent = this.context.emitServiceEvent.bind(this.context);
		this.on = this.context.on.bind(this.context);
		this.setCredentials = this.context.setCredentials.bind(this.context);
		this.getStoredToken = this.context.getStoredToken.bind(this.context);
		this.connected = false;
		
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
	
	getVersion() {
		return Version.name;
	}
	
}

Client.create = (environment, config) => {
	
	if(!config){
		config = Object.create(null);
	}
	
	config = Object.assign(ClientConfig.defaults(), environment.config, config);
	
	return new Client(config, environment);
	
};