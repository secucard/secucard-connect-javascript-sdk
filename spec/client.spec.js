import TestPromise from 'jasmine-es6/helpers/promise';
import {catchError} from 'jasmine-es6';
import install from 'jasmine-es6/overrides/async';
import {Promise as ES6Promise} from 'es6-promise';

import {Rest} from '../src/de.secucard.connect/net/rest';
import {Message, HEAD, GET, POST, PUT, DELETE} from '../src/de.secucard.connect/net/message';
import {Client} from '../src/de.secucard.connect/client';
import {ClientConfig} from '../src/de.secucard.connect/client-config';
import devCredentials from './support/dev-credentials.json';
import devCredentialsRefreshToken from './support/dev-credentials-refresh-token.json';
import {ClientNodeEnvironment} from '../src/de.secucard.connect/client-node-environment';

install();

describe('Client', function() {
	
	beforeEach('', async function () {
		
		let client = Client.create(ClientNodeEnvironment);
		this.client = client;
		
	});
	
	it('checks ClientConfig apiUrl', async function() {
		
		let expectedAuthUrl = 'https://connect.secucard.com/oauth/';
		let config = new ClientConfig();
		
		config.oAuthUrl = "https://connect.secucard.com/oauth/";
		expect(config.getOAuthUrl()).toBe(expectedAuthUrl);
		
		config.oAuthUrl = "https://connect.secucard.com/oauth";
		expect(config.getOAuthUrl()).toBe(expectedAuthUrl);
		
	});
	
	it('configures Client with ClientConfig', async function() {
	
		let config = ClientConfig.defaults();
		let expectedRestUrl = 'https://connect.secucard.com/api/v2/';
		
		expect(config.getRestUrl()).toBe(expectedRestUrl);
		
		let client = new Client(config, ClientNodeEnvironment);
		
		expect(client.config.getRestUrl()).toBe(expectedRestUrl);
	
	});
	
	it('checks credentials', async function() {
		
		let client = this.client;
		client.setCredentials(devCredentials);
		
		expect(client.context.getCredentials().client_id == devCredentials.client_id).toBe(true);
		expect(client.context.getCredentials().client_secret == devCredentials.client_secret).toBe(true);
		expect(client.context.getCredentials().token === null).toBe(true);
		
	});
	
	it('connects' , async function() {
		
		let client = this.client;
		client.setCredentials(devCredentials);
		
		await client.connect().then((res) => {
			console.log(res);
		}).catch((err) => {
			console.log(err);
		});
		
	});
	
	it('connects with refresh_token', async function() {
		
		let client = Client.create(ClientNodeEnvironment, {
			oAuthUrl: 'https://connect-dev10.secupay-ag.de/oauth/',
			stompHost: 'connect-dev10.secupay-ag.de'
		});
			
		client.setCredentials(devCredentialsRefreshToken);
		
		await client.connect().then((res) => {
			console.log(res);
		}).catch((err) => {
			console.log(err);
		});
		
	});
	
});