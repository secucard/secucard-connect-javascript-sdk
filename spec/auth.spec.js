import TestPromise from 'jasmine-es6/helpers/promise';
import {catchError} from 'jasmine-es6';
import install from 'jasmine-es6/overrides/async';
import {Promise as ES6Promise} from 'es6-promise';
import _ from 'lodash';

import {Rest} from '../src/de.secucard.connect/net/rest'
import {Message, HEAD, GET, POST, PUT, DELETE} from '../src/de.secucard.connect/net/message'
import {Client} from '../src/de.secucard.connect/client'
import {ClientConfig} from '../src/de.secucard.connect/client-config'
import {Auth} from '../src/de.secucard.connect/auth/auth'
import devCredentials from './support/dev-credentials.json'
import devCredentialsRefreshToken from './support/dev-credentials-refresh-token.json'
import devCredentialsDevice from './support/dev-credentials-device.json'
import {Token} from '../src/de.secucard.connect/auth/token'

import {ClientNodeEnvironment} from '../src/de.secucard.connect/client-node-environment';

install();

describe('Authorization', function () {

	var originalTimeout;
	
	beforeEach('', async function () {
		
		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
	  	jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

		this.expectedAuthUrl = 'https://connect.secucard.com/oauth/';
		this.expectedRestUrl = 'https://connect.secucard.com/api/v2/';

		let config = ClientConfig.defaults();
		let context = {
			getConfig: () => {
				return config;
			}
		};

		let channel = new Rest();
		channel.configureWithContext(context);
		
		Object.assign(channel, {
			createMessage: () => {
				let message = new Message();
				return message.setBaseUrl(config.getOAuthUrl());
			}
		});

		this.ch = channel;
		this.auth = new Auth();
		this.auth.oAuthUrl = () => {
			return config.oAuthUrl;
		};
		
	});
	
	afterEach(function() {
	  	jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
	});

	it('checks Auth Token message host', async function () {
		let msg = this.ch.createMessage();
		expect(msg.baseUrl).toBe(this.expectedAuthUrl);
	});
	
	it('creates Token and waits for its expiring', function(done) {
		
		let data = {
			access_token: 'jpd86qo0e5hkvj5c18jrhnq4m3',
			token_type: 'bearer',
			expires_in: 5,
			scope: 'https://scope.secucard.com/e/api' 
		};
		
		let token = Token.create(data);
		token.setExpireTime();
		expect(token.isExpired()).toBe(false);
		
		setTimeout(function() {
			expect(token.isExpired()).toBe(true);
			done();
		}, 6000);
		
		
	});
	
	it('checks setting expire time on next getToken call', async function() {
		
		let client = Client.create(ClientNodeEnvironment);
		client.setCredentials(devCredentials);
		
		await client.context.auth.getToken().then((token) => {
			
			console.log(token);
			
		});
		
	});
	

	it('tries to get Auth Token with wrong credentials', async function () {

		let status = 'getToken never called';

		// first send wrong data
		let pr = this.auth._tokenClientCredentialsRequest({dummy: 'dummy'}, this.ch);

		await pr.then((res) => {
			status = res.status;
		}).catch((err)=> {
			console.log(err.response.body);
			status = err.status;
		});

		expect(status).toBe(400);

	});

	it('tries to get Auth Token with valid credentials', async function () {

		let status = 'getToken never called';

		// first send wrong data
		let pr = this.auth._tokenClientCredentialsRequest(devCredentials, this.ch);

		await pr.then((res) => {
			status = res.status;
			console.log(res.body);
		}).catch((err)=> {
			status = err.status;
			console.log(err.response.body);
		});

		expect(status).toBe(200);

	});

	it('tries to refresh Auth Token', async function () {

		//TODO move credentials to the JSON file
		//let devCredentials; // await fs.readFile('./spec/support/dev-credentials.json', 'utf8');
		//console.log(devCredentials.client_id);

		let status = 'getToken never called';

		// first send wrong data

		let pr = this.auth._tokenRefreshRequest(devCredentialsRefreshToken, devCredentialsRefreshToken.token.refresh_token, this.ch);

		await pr.then((res) => {
			status = res.status;
			console.log('refresh_token', res.body);
		}).catch((err)=> {
			status = err.status;
			console.log(err.response.body);
		});

		expect(status).toBe(200);

	});
	
	/*
	it('tries to get Code for the device and get Token for that code with no success', async function () {

		// we cannot test it to get 200 because there is an user_code verification step on device
		let status = 'getToken never called';

		// first send wrong data
		let cr = _.assign({}, devCredentialsDevice, {uuid: "/vendor/secucard/parameter1/test1/parameter2/test2"});
		let pr = this.auth._tokenDeviceCodeRequest(cr, this.ch);

		let code = null;
		await pr.then((res) => {
			status = res.status;
			console.log(res.body);
			code = res.body.device_code;
		}).catch((err)=> {
			status = err.status;
			console.log(err.response.body);
		});

		expect(status).toBe(200);

		cr = _.assign({}, devCredentialsDevice, {code: code});
		pr = this.auth._tokenDeviceRequest(cr, this.ch);

		await pr.then((res) => {
			status = res.status;
			console.log(res.body);
		}).catch((err)=> {
			status = err.status;
			console.log(err.response.body);
		});

		expect(status).toBe(401);

	});
	*/

});