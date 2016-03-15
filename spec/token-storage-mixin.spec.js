import EE from 'eventemitter3';
import _ from 'lodash';

import {ClientNodeEnvironment} from '../src/de.secucard.connect/client-node-environment';
import {Services, MiniLog, SecucardConnect as Client} from '../src/index.js';
//import {Client} from '../src/de.secucard.connect/client';
import devCredentialRefreshToken from './support/dev-credentials-refresh-token.json';

function TokenStorageMixin() {

}

TokenStorageMixin.prototype.storeToken = function (token) {
    console.log('TokenStorageMixin.storeToken', JSON.stringify(token));
    this.token = JSON.stringify(token);
    return Promise.resolve(this.token);
};

TokenStorageMixin.prototype.removeToken = function () {
    console.log('TokenStorageMixin.removeToken');
    this.token = null;
    return Promise.resolve(this.token);
};

TokenStorageMixin.prototype.getStoredToken = function () {
    console.log('TokenStorageMixin.getStoredToken', this.token);
    return Promise.resolve(JSON.parse(this.token));
};

describe("dummy, temp testing", function () {
    var originalTimeout;

    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10 * 60 * 1000;
    });

    it("tests", async function () {

        MiniLog.suggest.clear();
        MiniLog.enable();

        let client = Client.create({
            oAuthUrl: 'https://connect-dev10.secupay-ag.de/oauth/',
            stompHost: 'connect-dev10.secupay-ag.de',
            restUrl: 'https://connect-dev10.secupay-ag.de/api/v2/'
        }, ClientNodeEnvironment);

        client.setCredentials(devCredentialRefreshToken, TokenStorageMixin);

        await client.open();

    });

    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

});
