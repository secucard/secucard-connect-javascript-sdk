import TestPromise from 'jasmine-es6/helpers/promise';
import {catchError} from 'jasmine-es6';
import install from 'jasmine-es6/overrides/async';
import {Promise as ES6Promise} from 'es6-promise';

import {Client} from '../src/de.secucard.connect/client';
import devCredentials from './support/dev-credentials.json';

import {ClientNodeEnvironment} from '../src/de.secucard.connect/client-node-environment';
import {Stomp} from '../src/de.secucard.connect/net/stomp';
import {SocketAtNode} from '../src/de.secucard.connect/net/socket/socket-node';

install();

describe('Stomp', function () {
	
	let originalTimeout;
	
	beforeEach('', async function () {
		
		let client = Client.create(ClientNodeEnvironment, {
			oAuthUrl: 'https://connect-dev10.secupay-ag.de/oauth/',
			stompHost: 'connect-dev10.secupay-ag.de'
		});
		
		client.setCredentials(devCredentials);
		
		this.client = client;
		//this.transactions = transactions;
		
		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
	  	jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
		
	});
	
	it('does STOMP connection and then disconnects', function (done) {
		
		let stomp = new Stomp(SocketAtNode);
		stomp.configureWithContext(this.client.context);
		stomp.connect().then(() => {
			
			stomp._disconnect().then(() => {
				done();
			});
			
		});
		
	});

	it('opens STOMP API connection', async function () {
		
		let stomp = new Stomp(SocketAtNode);
		stomp.configureWithContext(this.client.context);
		await stomp.open().then((res) => {
			
			console.log('stomp open result', res);
			
		});
		
	});
	
	it('opens STOMP connection and wait for some session refresh events', function (done) {
		
		// configure client to send stomp session refresh every 2 sec 
		this.client.config.stompHeartbeatSec = 2;
		
		let stomp = new Stomp(SocketAtNode);
		stomp.configureWithContext(this.client.context);
		
		let counter = 0;
		stomp.on('sessionRefresh', ()=>{
			
			counter++;
			console.log('sessionRefresh', counter);
			
			if(counter == 3){
				
				// close stomp channel and ...
				
				stomp.close().then(()=>{
					
					// ... wait for 3 sec to ensure 'sessionRefresh' event is never recieved later 
					
					setTimeout(()=>{
						expect(counter == 3).toBe(true);
						done();
					}, 3*1000);
					
				});
			}
			
		});
		
		stomp.open().then(() => {
			console.log('Stomp opened', counter);
		});
		
	});
	
	afterEach(function() {
	  	jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
	});
	
});