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

import {SecucardConnect, Services, MiniLog} from '../src/index.js';

install();


MiniLog.suggest.clear();
MiniLog.enable();

describe('Smart.Idents Service', function () {

    let originalTimeout;

    beforeEach('', async function () {

        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

    });

    it('gets list for smart idents with REST', async function () {

        let client = SecucardConnect.create({
            oAuthUrl: 'https://connect-dev10.secupay-ag.de/oauth/',
            restUrl: 'https://connect-dev10.secupay-ag.de/api/v2/',
            stompHost: 'connect-dev10.secupay-ag.de',
            stompEnabled: false
        });

        client.setCredentials(devCredentialRefreshToken);

        await client.open();

        let service = client.getService(Services.Smart.Idents);
        
        await service.retrieveList().then((res) => {
            console.log(res);
        });

    });


    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });


});