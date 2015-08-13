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

        let client = Client.create({
            oAuthUrl: 'https://connect-dev10.secupay-ag.de/oauth/',
            stompHost: 'connect-dev10.secupay-ag.de'
        }, null);

        client.setCredentials(devCredentialsRefreshToken);

        this.client = client;

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

    it('handles external event supposed to be recieved by webhook', async function () {

        let skeletonService = this.client.getService('General.Skeletons');

        let testEvent = {
            target: 'general.skeletons',
            type: 'DemoEvent',
            data: {test: 'Some test data'}
        };

        let recievedData = await new Promise((resolve, reject) => {

            skeletonService.on('DemoEvent', (data) => {
                resolve(data);
            });

            this.client.emitServiceEvent(testEvent);

        });

        expect(recievedData == testEvent.data).toBe(true);

    });

    it('executes DemoEvent action with STOMP after session refresh', async function () {


        let skeletonService = this.client.getService('General.Skeletons');

        let data;
        await Promise.all([
            this.client.open().then(() => {

                return skeletonService.demoEvent().then((res) => {
                    console.log('DemoEvent response', res);
                    return res;
                });

            }),
            new Promise((resolve, reject) => {

                skeletonService.on('DemoEvent', (data) => {
                    console.log('DemoEvent', data);
                    resolve(data);
                });

            })
        ]);

        //
        //{
        //	"object":"event.pushs",
        //	"id":"EPS_W3X8JZTRVQZSRQRVNJMR4U7WDMUR46",
        //	"created":"2015-07-16T08:57:18+02:00",
        //	"target":"general.skeletons",
        //	"type":"DemoEvent",
        //	"data":{
        //		"demo":"event"
        //	}
        //}
        //

    });

    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });


});