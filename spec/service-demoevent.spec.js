import TestPromise from 'jasmine-es6/helpers/promise';
import {catchError} from 'jasmine-es6';
import install from 'jasmine-es6/overrides/async';
import {Promise as ES6Promise} from 'es6-promise';

import {Rest} from '../src/de.secucard.connect/net/rest';
import {Message, HEAD, GET, POST, PUT, DELETE} from '../src/de.secucard.connect/net/message';
import {Client} from '../src/de.secucard.connect/client';
import {ClientConfig} from '../src/de.secucard.connect/client-config';
import devCredentialsRefreshToken from './support/dev-credentials-refresh-token.json';

import {Channel} from '../src/de.secucard.connect/net/channel';
import {General} from '../src/de.secucard.connect/product/general/general';
import devTransaction from './support/dev-transaction.json';
import {ClientNodeEnvironment} from '../src/de.secucard.connect/client-node-environment';

install();

describe('Service to fire demo event', function () {

	let originalTimeout;

	beforeEach('', async function () {

		let client = Client.create(ClientNodeEnvironment, {
			oAuthUrl: 'https://connect-dev10.secupay-ag.de/oauth/',
			stompHost: 'connect-dev10.secupay-ag.de'
		});

		client.setCredentials(devCredentialsRefreshToken);

		let skeleton = new General.SkeletonService();
		skeleton.configureWithContext(client.context);

		// /exchange/connect.api/api:exec:General.Skeletons.Demoevent

		this.client = client;
		this.skeleton = skeleton;

		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

	});
	
	/*
	it('executes DemoEvent action with STOMP without session refresh', function (done) {

		this.skeleton.getChannel = this.client.context.getStompChannel.bind(this.client.context);
		
		let data;

		this.skeleton.demoEvent()
			.then((res) => {
				data = res;
				console.log('demoEvent executed', res);
			});


	});
	*/
	
	it('executes DemoEvent action with STOMP after session refresh', function (done) {

		this.skeleton.getChannel = this.client.context.getStompChannel.bind(this.client.context);

		let data;
		this.client.context.getStompChannel().open().then(() => {
			
			this.skeleton.demoEvent();
			setTimeout(()=>{
				
			}, 2000);

		});
		
		/*
		{
			"object":"event.pushs",
			"id":"EPS_W3X8JZTRVQZSRQRVNJMR4U7WDMUR46",
			"created":"2015-07-16T08:57:18+02:00",
			"target":"general.skeletons",
			"type":"DemoEvent",
			"data":{
				"demo":"event"
			}
		}
		*/

	});

	afterEach(function () {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
	});


});