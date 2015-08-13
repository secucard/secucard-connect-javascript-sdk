import TestPromise from 'jasmine-es6/helpers/promise';
import {catchError} from 'jasmine-es6';
import install from 'jasmine-es6/overrides/async';
import {Promise as ES6Promise} from 'es6-promise';

import {SecucardConnect, Services} from '../src/index';
import devCredentials from './support/dev-credentials.json';
import devCredentialRefreshToken from './support/dev-credentials-refresh-token.json';

import minilog from 'minilog';
minilog.suggest.clear();
minilog.enable();

install();

describe('Using Document services', function () {

    let originalTimeout;

    beforeEach('', async function () {

        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

    });

    it('Uploading/downloading files via STOMP', async function () {

        let testBase64str = "SGVsbG8h";

        let client = SecucardConnect.create({
            restUrl: 'https://connect-dev10.secupay-ag.de/api/v2/',
            oAuthUrl: 'https://connect-dev10.secupay-ag.de/oauth/',
            stompHost: 'connect-dev10.secupay-ag.de'
        });

        let uploads = client.getService(Services.Document.Uploads);

        let documentId = null;
        await uploads.upload(testBase64str).then((res) => {
            documentId = res.id;
        });

        expect(documentId != null).toBe(true);

        client.setCredentials(devCredentialRefreshToken);

        let doc = await uploads.retrieve(documentId);
        console.log(doc);
        expect(doc.content).toBe(testBase64str);

    });

    it('Uploading/downloading files via REST', async function () {

        let testBase64str = "SGVsbG8h";

        let client = SecucardConnect.create({
            restUrl: 'https://connect-dev10.secupay-ag.de/api/v2/',
            oAuthUrl: 'https://connect-dev10.secupay-ag.de/oauth/',
            stompHost: 'connect-dev10.secupay-ag.de',
            stompEnabled: false
        });

        let uploads = client.getService(Services.Document.Uploads);

        let documentId = null;
        await uploads.upload(testBase64str).then((res) => {
            documentId = res.id;
        });

        expect(documentId != null).toBe(true);

        client.setCredentials(devCredentialRefreshToken);

        let doc = await uploads.retrieve(documentId);
        console.log(doc);
        expect(doc.content).toBe(testBase64str);

    });

    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });


});