import TestPromise from 'jasmine-es6/helpers/promise';
import {catchError} from 'jasmine-es6';
import install from 'jasmine-es6/overrides/async';
import {Promise as ES6Promise} from 'es6-promise';

import {Rest} from '../src/de.secucard.connect/net/rest';
import {Message, HEAD, GET, POST, PUT, DELETE} from '../src/de.secucard.connect/net/message';
import {Client} from '../src/de.secucard.connect/client';
import {ClientConfig} from '../src/de.secucard.connect/client-config';
import devCredentials from './support/dev-credentials.json';

import {Channel} from '../src/de.secucard.connect/net/channel';
import {Smart} from '../src/de.secucard.connect/product/smart/smart';
import devTransaction from './support/dev-transaction.json';
import {ClientNodeEnvironment} from '../src/de.secucard.connect/client-node-environment';

install();

describe('Product Service', function() {
	
	beforeEach('', async function () {
		
		let client = Client.create(ClientNodeEnvironment);
		client.setCredentials(devCredentials);
		
		let transactions = new Smart.TransactionService();
		transactions.configureWithContext(client.context);
		
		this.client = client;
		this.transactions = transactions;
		
	});
	
	it('gets object list from Product Service with REST' , async function() {
		
		this.transactions.getChannel = this.client.context.getRestChannel.bind(this.client.context);
		expect(Boolean(this.transactions)).toBe(true);
		
		let data;
		await this.transactions.createObject(devTransaction)
			.then((res) => {
				data = res;
				console.log(res);
			});
		
		expect(data.object).toBe('smart.transactions');
		
		await this.transactions.updateObject(data)
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
	
	
	it('gets object list from Product Service with STOMP' , async function() {
		
		this.transactions.getChannel = this.client.context.getStompChannel.bind(this.client.context);
		expect(Boolean(this.transactions)).toBe(true);
		
		let data;
		await this.transactions.createObject(devTransaction)
			.then((res) => {
				data = res;
				console.log(res);
			});
		
		
		expect(data.object).toBe('smart.transactions');
		
		await this.transactions.updateObject(data)
			.then((res) => {
				
				console.log(res);
				
				expect(data.object).toBe('smart.transactions');
				expect(res.id == data.id).toBe(true);
				expect(res.created == data.created).toBe(true);
				
			})
			.catch((err) => {
				
				console.log('Stomp Api Error', err);
				
			});
		
		
	});
	
	
});