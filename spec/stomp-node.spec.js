import TestPromise from 'jasmine-es6/helpers/promise';
import {catchError} from 'jasmine-es6';
import install from 'jasmine-es6/overrides/async';
import {Promise as ES6Promise} from 'es6-promise';

import {Client} from '../src/de.secucard.connect/client';
import devCredentials from './support/dev-credentials.json';

import {Stomp} from '../src/de.secucard.connect/net/stomp';
import {Stomp as StompImpl} from '../src/de.secucard.connect/net/stomp-node/stomp';

install();

describe('Stomp', function () {
	
	beforeEach('', async function () {
		
		// connect-dev10.secupay-ag.de
		let client = Client.create();

		Object.assign(client.config, {
			oAuthUrl: 'https://connect-dev10.secupay-ag.de/oauth/'
		});
		
		client.setCredentials(devCredentials);
		
		this.client = client;
		//this.transactions = transactions;
		
	});
	
	it('1', function (done) {
		
		let stomp = new Stomp(StompImpl);
		stomp.configureWithContext(this.client.context);
		
		stomp.open(()=>{
			done();
		}).then((res) => {
			
		});
		
	});

	it('2', async function () {
		
	});

});