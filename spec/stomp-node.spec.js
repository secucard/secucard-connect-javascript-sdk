import TestPromise from 'jasmine-es6/helpers/promise';
import {catchError} from 'jasmine-es6';
import install from 'jasmine-es6/overrides/async';
import {Promise as ES6Promise} from 'es6-promise';

import {Client} from '../src/de.secucard.connect/client';
import devCredentials from './support/dev-credentials.json';

import {ClientNodeEnvironment} from '../src/de.secucard.connect/client-node-environment';
import {Stomp} from '../src/de.secucard.connect/net/stomp';
import {Stomp as StompImpl} from '../src/de.secucard.connect/net/stomp-node/stomp';

install();

describe('Stomp', function () {
	
	beforeEach('', async function () {
		
		let client = Client.create(ClientNodeEnvironment);

		Object.assign(client.config, {
			oAuthUrl: 'https://connect-dev10.secupay-ag.de/oauth/',
			stompHost: 'connect-dev10.secupay-ag.de'
		});
		
		client.setCredentials(devCredentials);
		
		this.client = client;
		//this.transactions = transactions;
		
	});
	
	it('does STOMP connection and then disconnects', function (done) {
		
		let stomp = new Stomp(StompImpl);
		stomp.configureWithContext(this.client.context);
		stomp.connect().then(() => {
			
			stomp._disconnect().then(() => {
				done();
			});
			
		});
		
	});

	it('opens STOMP API connection', async function () {
		
		let stomp = new Stomp(StompImpl);
		stomp.configureWithContext(this.client.context);
		await stomp.open().then((res) => {
			
			console.log('stomp open result', res);
			
		});
		
	});

});