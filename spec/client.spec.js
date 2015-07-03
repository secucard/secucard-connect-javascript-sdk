import TestPromise from 'jasmine-es6/helpers/promise';
import {catchError} from 'jasmine-es6';
import install from 'jasmine-es6/overrides/async';
import {Promise as ES6Promise} from 'es6-promise';

import {Rest} from '../src/de.secucard.connect/net/rest';
import {Message, HEAD, GET, POST, PUT, DELETE} from '../src/de.secucard.connect/net/message';
import {Client} from '../src/de.secucard.connect/client';
import {ClientConfig} from '../src/de.secucard.connect/client-config';
import devCredentials from './support/dev-credentials.json';
install();

describe('Connection', function() {
	
	beforeEach('', async function () {
		
		let client = Client.create();
		this.client = client;
		
	});
	
	it('configures Client with ConnectionConfig', async function() {
	
		let config = ClientConfig.defaults();
		let expectedHost = 'https://connect.secucard.com';
		
		expect(config.host).toBe(expectedHost);
		
		let client = new Client(config);
		
		expect(client.config.host).toBe(expectedHost);
	
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
	
});