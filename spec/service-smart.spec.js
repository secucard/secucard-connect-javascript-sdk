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

install();

describe('Product Service', function() {
	
	let originalTimeout;
	
	beforeEach('', async function () {
		
		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
		
	});
	
	it('creates/updates smart transaction with REST' , async function() {
		
		let client = Client.create(ClientNodeEnvironment, {
			oAuthUrl: 'https://connect-dev10.secupay-ag.de/oauth/',
			stompHost: 'connect-dev10.secupay-ag.de'
		});
		
		client.setCredentials(devCredentials);
		
		let transactions = new Smart.TransactionService();
		transactions.configureWithContext(client.context);
		
		transactions.getChannel = client.context.getRestChannel.bind(client.context);
		expect(Boolean(transactions)).toBe(true);
		
		let data;
		await transactions.createObject(devTransaction)
			.then((res) => {
				data = res;
				console.log(res);
			});
		
		expect(data.object).toBe('smart.transactions');
		
		await transactions.updateObject(data)
			.then((res) => {
				
				console.log(res);
				
				expect(data.object).toBe('smart.transactions');
				expect(res.id == data.id).toBe(true);
				expect(res.created == data.created).toBe(true);
				
			})
			.catch((err) => {
				
				console.log('Rest Api Error', err);
				
			});
		
	});
	
	
	it('creates/updates smart transaction with STOMP' , async function(done) {
		
		let client = Client.create(ClientNodeEnvironment, {
			oAuthUrl: 'https://connect-dev10.secupay-ag.de/oauth/',
			stompHost: 'connect-dev10.secupay-ag.de'
		});
		
		client.setCredentials(devCredentialRefreshToken);
		
		await client.open();
		
		let transactions = client.getService('smart.transactions');
		
		expect(Boolean(transactions)).toBe(true);
		
		let data;
		await transactions.createObject(devTransaction)
			.then((res) => {
				data = res;
				console.log(res);
			});
		
		
		expect(data.object).toBe('smart.transactions');
		
		await transactions.updateObject(data)
			.then((res) => {
				
				console.log(res);
				
				expect(data.object).toBe('smart.transactions');
				expect(res.id == data.id).toBe(true);
				expect(res.created == data.created).toBe(true);
				
			})
			.catch((err) => {
				
				console.log('Stomp Api Error', err);
				
			});
		
		await Promise.all([
			transactions.startTransaction(data.id, "demo").then((res) => {
				
			}),
			new Promise((resolve, reject) => {

				transactions.on('display', (data) => {
					resolve(data);
				});
				
			})
		]);
		
	});
	
	afterEach(function () {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
	});
	
	
});