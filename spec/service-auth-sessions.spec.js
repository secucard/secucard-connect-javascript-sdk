import TestPromise from 'jasmine-es6/helpers/promise';
import {catchError} from 'jasmine-es6';
import install from 'jasmine-es6/overrides/async';
import {Promise as ES6Promise} from 'es6-promise';

import devCredentialsRefreshToken from './support/dev-credentials-refresh-token.json';
import {SecucardConnect, Services, Channel} from '../src/index.js';

install();

describe('Service to fire demo event', function () {

    let originalTimeout;

    beforeEach('', async function () {

        let client = SecucardConnect.create({
            restUrl: 'https://connect-dev10.secupay-ag.de/api/v2/',
            oAuthUrl: 'https://connect-dev10.secupay-ag.de/oauth/',
            stompHost: 'connect-dev10.secupay-ag.de'
        });
        client.setCredentials(devCredentialsRefreshToken);
        await client.open();

        this.client = client;

        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

    });

    it('perform session check with REST', async function () {

        let options = {
            channelConfig: [Channel.REST] // use only rest
        };

        var sessions = this.client.getService(Services.Auth.Sessions);

        let res = await sessions.retrieveWithAction('me', 'debug', null, options);
        console.log('from REST', res);

    });

    it('perform session check with REST', async function () {

        var sessions = this.client.getService(Services.Auth.Sessions);

        res = await sessions.check();
        console.log('from STOMP', res);

    });


    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });


});