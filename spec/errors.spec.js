import TestPromise from 'jasmine-es6/helpers/promise';
import {catchError} from 'jasmine-es6';
import install from 'jasmine-es6/overrides/async';
import {Promise as ES6Promise} from 'es6-promise';

import {SecucardConnect, Services} from '../src/index';
import devCredentials from './support/dev-credentials.json';
import devCredentialRefreshToken from './support/dev-credentials-refresh-token.json';
import {AuthenticationFailedException} from '../src/de.secucard.connect/auth/exception';
import {SecucardConnectException} from '../src/de.secucard.connect/net/exception';

install();

describe('Handling different exceptions.', function () {

	let originalTimeout;

	beforeEach('', async function () {
		
		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

	});
	
	it('Getting AuthenticationFailedException with wrong credentials oAuth', async function () {
		
		let client = SecucardConnect.create({
			oAuthUrl: 'https://connect-dev10.secupay-ag.de/oauth/',
			restUrl: 'https://connect-dev10.secupay-ag.de/api/v2/',
			stompHost: 'connect-dev10.secupay-ag.de'
		});
		
		client.setCredentials({dummy: ''});
		
		//await client.open();
		
		await client.open().catch((err) => {
			console.log(err);
		});
		
	});
	
	it('Getting AuthenticationFailedException with wrong credentials from oAuth on service request', async function () {
		
		let client = SecucardConnect.create({
			oAuthUrl: 'https://connect-dev10.secupay-ag.de/oauth/',
			restUrl: 'https://connect-dev10.secupay-ag.de/api/v2/',
			stompHost: 'connect-dev10.secupay-ag.de'
		});
		
		client.setCredentials({dummy: ''});
		
		let accounts = client.getService(Services.General.Accounts);
		//await accounts.retrieveList();
		let err;
		err = await accounts.retrieveList(null, {channelConfig: ['rest']}).catch((err) => {
			console.log(err);
			return err;
		});
		
		expect(err instanceof AuthenticationFailedException).toBe(true);
		
		err = await accounts.retrieveList(null, {channelConfig: ['stomp']}).catch((err) => {
			console.log(err);
			return err;
		});
		
		expect(err instanceof AuthenticationFailedException).toBe(true);
	});
	
	it('Getting ProductNotAllowedException on service request', async function () {
		
		let client = SecucardConnect.create({
			oAuthUrl: 'https://connect-dev10.secupay-ag.de/oauth/',
			restUrl: 'https://connect-dev10.secupay-ag.de/api/v2/',
			stompHost: 'connect-dev10.secupay-ag.de'
		});
		
		client.setCredentials(devCredentials);
		await client.open();
		
		let accounts = client.getService(Services.Smart.Checkins);
		//await accounts.retrieveList();
		let err = await accounts.retrieveList(null, {channelConfig: ['rest']}).then((res) => {
			console.log(res);
		}).catch((err) => {
			console.log(err);
			return err;
		});
		
		expect(err instanceof SecucardConnectException).toBe(true);
		expect(err.error).toBe('ProductNotAllowedException');
		
		err = await accounts.retrieveList(null, {channelConfig: ['stomp']}).then((res) => {
			console.log('Services.Smart.Checkins', res);
		}).catch((err) => {
			console.log('retrieveList stomp error', err);
			return err;
		});
		
		expect(err instanceof SecucardConnectException).toBe(true);
		expect(err.error).toBe('ProductNotAllowedException');
		
	});
	
	it('Getting AuthenticationFailedException from STOMP with wrong credentials', async function () {
		
		let client = SecucardConnect.create({
			oAuthUrl: 'https://connect-dev10.secupay-ag.de/oauth/',
			restUrl: 'https://connect-dev10.secupay-ag.de/api/v2/',
			stompHost: 'connect-dev10.secupay-ag.de'
		});
		
		let credentials = {
			token: {
				access_token: '111111111',
				expires_in: 1200,
				token_type: 'bearer',
				scope: 'https://scope.secucard.com/e/api'
			}
		};
		
		client.setCredentials(credentials);
		let err = await client.open().catch((err) => {
			console.log('stomp auth error', err);
			return err;
		});
		
		expect(err instanceof AuthenticationFailedException).toBe(true);
		
	});
	
	it('Getting ProductInternalException from STOMP', async function () {
		
		let client = SecucardConnect.create({
			oAuthUrl: 'https://connect-dev10.secupay-ag.de/oauth/',
			restUrl: 'https://connect-dev10.secupay-ag.de/api/v2/',
			stompHost: 'connect-dev10.secupay-ag.de'
		});
		
		client.setCredentials(devCredentialRefreshToken);
		
		await client.open();
		
		let transactions = client.getService(Services.Smart.Transactions);
		
		await transactions.start("", "demo");
		
	});
	
	afterEach(function () {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
	});
	
	

});