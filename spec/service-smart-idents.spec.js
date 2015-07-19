import TestPromise from 'jasmine-es6/helpers/promise';
import {catchError} from 'jasmine-es6';
import install from 'jasmine-es6/overrides/async';
import {Promise as ES6Promise} from 'es6-promise';

import {Rest} from '../src/de.secucard.connect/net/rest';
import {Message, HEAD, GET, POST, PUT, DELETE} from '../src/de.secucard.connect/net/message';
import {Client} from '../src/de.secucard.connect/client';
import {ClientConfig} from '../src/de.secucard.connect/client-config';
import devCredentialRefreshToken from './support/dev-credentials-refresh-token.json';
import devCredentials from './support/dev-credentials.json';

import {Channel} from '../src/de.secucard.connect/net/channel';
import {Smart} from '../src/de.secucard.connect/product/smart/smart';
import devTransaction from './support/dev-transaction.json';
import {ClientNodeEnvironment} from '../src/de.secucard.connect/client-node-environment';
import {Services} from '../src/index.js';

install();

describe('Smart.Idents Service', function() {
	
	let originalTimeout;
	
	beforeEach('', async function () {
		
		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
		
	});
	
	it('gets list for smart idents with REST' , async function() {
		
		let client = Client.create(ClientNodeEnvironment, {
			oAuthUrl: 'https://connect-dev10.secupay-ag.de/oauth/',
			stompHost: 'connect-dev10.secupay-ag.de'
		});
		
		client.setCredentials(devCredentialRefreshToken);
		
		await client.open();
		
		let idents = client.getService(Services.Smart.Idents);
		idents.getChannel = client.context.getRestChannel.bind(client.context);
		
		await idents.getObjectList().then((res) => {
			console.log(res);
		});
		
	});
	
	
	afterEach(function () {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
	});
	
	
});