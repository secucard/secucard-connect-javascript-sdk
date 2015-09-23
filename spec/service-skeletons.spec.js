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

describe('General.Skeletons Service', function () {

    let originalTimeout;

    beforeEach('', async function () {

        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;

    });

    it('gets list for skeletons with REST', async function () {

        let client = SecucardConnect.create({
            //oAuthUrl: 'https://connect-dev10.secupay-ag.de/oauth/',
            //restUrl: 'https://connect-dev10.secupay-ag.de/api/v2/',
            //stompHost: 'connect-dev10.secupay-ag.de',
            stompEnabled: false
        });

        client.setCredentials(devCredentialRefreshToken);

        await client.open();

        let service = client.getService(Services.General.Skeletons);
        
        /*
        await service.retrieveList().then((res) => {
            console.log(res);
        });
        */
        
        /*
        await service.retrieveList({aggregate: {sum_by_prop: "amount", group_by_prop: "picture"}}).then((res) => {
            console.log(res);
        });
        */
        
        
        /*
        await service.retrieveList('aggregate[sum_by_prop]=amount&aggregate[group_by_prop]=picture').then((res) => {
            console.log(res);
        });
        */
        
        /*
        await service.retrieveList('aggregate%5Bsum_by_prop%5D=amount&aggregate%5Btimestamp_prop%5D=date&aggregate%5Binterval%5D=month').then((res) => {
            console.log(res);
        });
        */
        
        
        await service.retrieveList({'aggregate[sum_by_prop]': "amount", 'aggregate[group_by_prop]' : 'picture'}).then((res) => {
            console.log(res);
        });
        
        
    });


    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });


});