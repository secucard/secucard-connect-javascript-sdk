import EE from 'eventemitter3';
import _ from 'lodash';

import {ClientNodeEnvironment} from '../src/de.secucard.connect/client-node-environment';
import {Services, MiniLog, SecucardConnect as Client} from '../src/index.js';
//import {Client} from '../src/de.secucard.connect/client';
import devCredentialRefreshToken from './support/dev-credentials-refresh-token.json';

class CustomEventEmitter {
	constructor () {
		Object.assign(this, EE.prototype);
	}
}

describe("dummy, temp testing", function() {
	var originalTimeout;
	
	beforeEach(function() {
		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
	  	jasmine.DEFAULT_TIMEOUT_INTERVAL = 10*60*1000;
	});
	
	it("tests", async function(){
		
		MiniLog.suggest.clear();
		MiniLog.enable();
		
		let client = Client.create({
			oAuthUrl: 'https://connect-dev10.secupay-ag.de/oauth/',
			stompHost: 'connect-dev10.secupay-ag.de',
			restUrl: 'https://connect-dev10.secupay-ag.de/api/v2/'
		}, ClientNodeEnvironment);
		
		let credentials = {
			token: {
				access_token: '',
				expires_in: 1200,
				token_type: 'bearer',
				scope: 'https://scope.secucard.com/e/api'
			}
		};
		
		client.setCredentials(devCredentialRefreshToken);
		
		await client.open().catch((err) => {
			
			console.log(err.message);
			
			return new Promise(() => {
				
			});
			
		});
		
	});
	
	afterEach(function() {
	  	jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
	});
	
});
