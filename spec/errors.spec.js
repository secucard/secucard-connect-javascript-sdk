import TestPromise from 'jasmine-es6/helpers/promise';
import {catchError} from 'jasmine-es6';
import install from 'jasmine-es6/overrides/async';
import {Promise as ES6Promise} from 'es6-promise';

import {SecucardConnect, Services} from '../src/index';
import devCredentials from './support/dev-credentials.json';

install();

describe('Handling different exceptions.', function () {

	let originalTimeout;

	beforeEach('', async function () {
		
		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

	});
	
	it('Getting AuthenticationFailedException with wrong credentials on open()', async function () {
		
		let client = SecucardConnect.create({
			oAuthUrl: 'https://connect-dev10.secupay-ag.de/oauth/',
			stompHost: 'connect-dev10.secupay-ag.de'
		});
		
		client.setCredentials({dummy: ''});
		
		//await client.open();
		
		await client.open().catch((err) => {
			console.log(err);
		});
		
	});
	
	it('Getting AuthenticationFailedException with wrong credentials on service request', async function () {
		
		let client = SecucardConnect.create({
			oAuthUrl: 'https://connect-dev10.secupay-ag.de/oauth/',
			stompHost: 'connect-dev10.secupay-ag.de'
		});
		
		client.setCredentials({dummy: ''});
		
		let accounts = client.getService(Services.General.Accounts);
		//await accounts.retrieveList();
		await accounts.retrieveList(null, {channelConfig: ['rest']}).catch((err) => {
			console.log(err);
		});
		
		await accounts.retrieveList(null, {channelConfig: ['stomp']}).catch((err) => {
			console.log(err);
		});
		
	});
	
	it('Getting ProductNotAllowedException on service request', async function () {
		
		let client = SecucardConnect.create({
			oAuthUrl: 'https://connect-dev10.secupay-ag.de/oauth/',
			stompHost: 'connect-dev10.secupay-ag.de'
		});
		
		client.setCredentials(devCredentials);
		await client.open();
		
		let accounts = client.getService(Services.Smart.Checkins);
		//await accounts.retrieveList();
		await accounts.retrieveList(null, {channelConfig: ['rest']}).then((res) => {
			console.log(res);
		}).catch((err) => {
			console.log(err);
		});
		
		await accounts.retrieveList(null, {channelConfig: ['stomp']}).then((res) => {
			console.log('Services.Smart.Checkins', res);
		}).catch((err) => {
			console.log('retrieveList stomp error', err);
		});
		
	});
	
	afterEach(function () {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
	});


});