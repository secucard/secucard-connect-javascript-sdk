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

install();

describe('Authorization', function () {

	beforeEach('', async function () {

		this.expectedHost = 'https://connect.secucard.com';

		let config = ClientConfig.defaults();
		let context = {
			getConfig: () => {
				return config;
			}
		};

		let channel = new Rest();
		channel.configureWithContext(context);

		this.ch = channel;
		this.auth = new Auth();


	});

	it('checks Auth Token message host', async function () {
		let msg = this.ch.createMessage();
		expect(msg.baseUrl).toBe(this.expectedHost);
	});

	it('tries to get Auth Token with wrong credentials', async function () {

		let status = 'getToken never called';

		// first send wrong data
		let pr = this.auth._tokenClientCredentialsRequest({dummy: 'dummy'}, this.ch);

		await pr.then((res) => {
			status = res.status;
		}).catch((err)=> {
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

		let pr = this.auth._tokenRefreshRequest(devCredentialsRefreshToken, this.ch);

		await pr.then((res) => {
			status = res.status;
		}).catch((err)=> {
			status = err.status;
			console.log(err.response.body);
		});

		expect(status).toBe(200);

	});

	it('tries to get Code for the device and get Token for that code with no success', async function () {

		// we cannot test it to get 200 because there is an user_code verification step on device
		let status = 'getToken never called';

		// first send wrong data
		let cr = _.assign({}, devCredentials, {uuid: "/vendor/secucard/parameter1/test1/parameter2/test2"});
		let pr = this.auth._tokenReviceCodeRequest(cr, this.ch);

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


});