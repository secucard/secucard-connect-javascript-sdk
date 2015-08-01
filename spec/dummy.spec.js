import EE from 'eventemitter3';
import _ from 'lodash';

import {ClientNodeEnvironment} from '../src/de.secucard.connect/client-node-environment';
import {Services} from '../src/index.js';
import {Client} from '../src/de.secucard.connect/client';

class CustomEventEmitter {
	constructor () {
		Object.assign(this, EE.prototype);
	}
}

describe("dummy, temp testing", function() {
	var originalTimeout;
	
	beforeEach(function() {
		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
	  	jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
	});
	
	it("tests", async function(){
		
		
		//let obj = {};
		//obj.length = 10;
		//console.log(JSON.stringify(obj));
		
		
		let client = Client.create(ClientNodeEnvironment, {
			oAuthUrl: 'https://connect-dev10.secupay-ag.de/oauth/',
			stompHost: 'connect-dev10.secupay-ag.de'
		});
		
		client.config.stompHeartbeatSec = 5;
		
		let credentials = {
			token: {
				access_token: '',
				expires_in: 1200,
				token_type: 'bearer',
				scope: 'https://scope.secucard.com/e/api'
			}
		};
		
		client.setCredentials(credentials);
		
		await client.open();
		
		let res = await client.open().catch((err) => {
			
			console.log(err, err.message);
			
			return new Promise(() => {
				
			});
			
		});
		
	});
	
	afterEach(function() {
	  	jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
	});
	
});
