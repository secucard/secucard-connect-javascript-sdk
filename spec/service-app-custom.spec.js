import TestPromise from 'jasmine-es6/helpers/promise';
import {catchError} from 'jasmine-es6';
import install from 'jasmine-es6/overrides/async';
import {Promise as ES6Promise} from 'es6-promise';
import EE from 'eventemitter3';

import {Rest} from '../src/de.secucard.connect/net/rest';
import {Message, HEAD, GET, POST, PUT, DELETE} from '../src/de.secucard.connect/net/message';
import {Client} from '../src/de.secucard.connect/client';
import {ClientConfig} from '../src/de.secucard.connect/client-config';
import devCredentialRefreshToken from './support/dev-credentials-refresh-token.json';
import devCredentials from './support/dev-credentials.json';

import {Smart} from '../src/de.secucard.connect/product/smart/smart';
import devTransaction from './support/dev-transaction.json';
import {ClientNodeEnvironment} from '../src/de.secucard.connect/client-node-environment';
import {Channel, Services} from '../src/index.js';

install();

class CustomAppMixin {
	
	custom = true;
	
	init() {
		console.log('init CustomApp mixin');
	}
	
	getAppId() {
		return CustomAppMixin.APP_ID;
	}
	
	getItemGroups() {
		
		return this.executeAppAction(this.getAppId(), 'getItemgroups');
		
	}
	
	
}
CustomAppMixin.APP_ID = 'APP_XH99MDTXH2Y8G7HDB5GQGKT9BQUUAE';


class SecuofficeMixin {
	
	custom = true;
	
	init() {
		console.log('init SecuofficeMixin mixin');
	}
	
	getAppId() {
		return SecuofficeMixin.APP_ID;
	}
	
	authenticate(username, password) {
		let options = {
				channelConfig: [Channel.REST], // use only rest
				useAuth: false // don't need auth token
		};
		return this.executeAppAction(this.getAppId(), 'authenticate', { username : username, password : password }, options);
	}
	
	getNavigation(options) {
		return this.executeAppAction(this.getAppId(), 'getNavigation', null, options);
	}
	
}
SecuofficeMixin.APP_ID = 'APP_3KGNCU78A2YBG4J7R5GQG5KDNM8UA6';

let CustomAppFun = function () {
	this.custom = true;
};

CustomAppFun.prototype.init = function() {
	console.log('init CustomAppFun mixin');
};

CustomAppFun.prototype.getAppId = function() {
	return CustomAppFun.APP_ID;
};

CustomAppFun.APP_ID = 'APP_XH99MDTXH2Y8G7HDB5GQGKT9BQUUAE';

describe('Custom App Service', function() {
	
	let originalTimeout;
	
	beforeEach('', async function () {
		
		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
		
	});
	
	it('creates custom app service and does some calls' , async function() {
		
		let client = Client.create({
			restUrl: 'https://connect-dev10.secupay-ag.de/api/v2/',
			oAuthUrl: 'https://connect-dev10.secupay-ag.de/oauth/',
			stompHost: 'connect-dev10.secupay-ag.de'
		}, ClientNodeEnvironment);
		
		client.setCredentials(devCredentialRefreshToken);
		
		
		let app = client.addAppService(CustomAppMixin);
		expect(app.getUid()).toBe('general.apps.APP_XH99MDTXH2Y8G7HDB5GQGKT9BQUUAE');
		
		await client.open();
		
		await app.getItemGroups().then((res) => {
			console.log(res);
		});
		
		// switch to REST
		app.getChannel = client.context.getRestChannel.bind(client.context);
		
		await app.getItemGroups().then((res) => {
			console.log(res);
		});
		
		
	});
	
	
	it('creates secuoffice app service and does some calls' , async function() {
		
		let client = Client.create({
			//restUrl: 'https://connect-dev10.secupay-ag.de/api/v2/',
			//stompHost: 'connect-dev10.secupay-ag.de',
			//stompEnabled: false
		}, ClientNodeEnvironment);
		
		let app = client.addAppService(SecuofficeMixin);
		//let result = await app.authenticate('developer@secucard.de', 'Test12345!');
		
		/*
		let credentials = {
			token: {
				access_token: result.token,
				expires_in: 1200,
				token_type: 'bearer',
				scope: 'https://scope.secucard.com/e/api'
			}
		};
		client.setCredentials(credentials);
		*/
		
		/*
		await client.open().catch((err) => {
			console.log(err);
		});
		*/
		
		let accounts = client.getService(Services.General.Accounts);
		let res = await accounts.retrieve("me", {channelConfig: [Channel.REST]}).catch((err) => {
			console.log('Catched error', err.message);
		});
		
		console.log(res);
		
		
		/*
		let nav = await app.getNavigation({ useAuth: false , channelConfig: ['rest']}).catch((err) => {
			console.log(err);
		});
		
		console.log(nav);
		*/
	});
	
	afterEach(function () {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
	});
	
	
});