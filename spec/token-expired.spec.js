import EE from 'eventemitter3';
import _ from 'lodash';

import {Services, MiniLog, SecucardConnect as Client} from '../src/index.js';
import devCredentialRefreshToken from './support/dev-credentials-refresh-token.json';
import util from './support/util';

describe("Testing token creating. passing and expiration", async function () {
    
    var originalTimeout;
    
    MiniLog.suggest.clear();
    MiniLog.enable();
    
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10 * 60 * 1000;
    });
    
    it("passes token between clients and make request", async function () {

        let client = Client.create({
            oAuthUrl: 'https://connect-dev10.secupay-ag.de/oauth/',
            stompHost: 'connect-dev10.secupay-ag.de',
            restUrl: 'https://connect-dev10.secupay-ag.de/api/v2/',
            stompEnabled: false
        });
        
        // we set credentials (backend app does it usually) 
        client.setCredentials(devCredentialRefreshToken);

        await client.open();
        
        //we export token for client that doesn't use actual credentials like client_id and secret_key, like browser client 
        let token = await client.exportToken();
        console.log(token);
        
        let client2 = Client.create({
            oAuthUrl: 'https://connect-dev10.secupay-ag.de/oauth/',
            stompHost: 'connect-dev10.secupay-ag.de',
            restUrl: 'https://connect-dev10.secupay-ag.de/api/v2/',
            stompEnabled: false
        });
        
        client2.setCredentials({token: token});
        
        let accounts = client2.getService(Services.General.Accounts);
        await accounts.retrieve("me").catch((err) => {
            console.log('Catched error', err.message);
        });
        
    });
    
    
    it("creates client that retrieves token from URL", async function () {
        
        let client = Client.create({
            oAuthUrl: 'https://connect-dev10.secupay-ag.de/oauth/',
            stompHost: 'connect-dev10.secupay-ag.de',
            restUrl: 'https://connect-dev10.secupay-ag.de/api/v2/',
            stompEnabled: false
        });
        
        client.setCredentials(devCredentialRefreshToken);

        await client.open();
        let token = await client.exportToken();
        
        let serverCreated = await util.runHttpServer(null, {
            method: 'GET',
            path: '/token',
            handler: function (request, reply) {
                // Note: here server sends reply with 'Content-type' header set to 'application/json'
                reply(token);
            }
        });
        
        
        client = Client.create({
            oAuthUrl: 'https://connect-dev10.secupay-ag.de/oauth/',
            stompHost: 'connect-dev10.secupay-ag.de',
            restUrl: 'https://connect-dev10.secupay-ag.de/api/v2/',
            stompEnabled: false,
            retrieveToken: 'http://localhost:9000/token'
        });
        
        // we set credentials (backend app does it usually) 
        client.setCredentials();
        
        let accounts = client.getService(Services.General.Accounts);
        await accounts.retrieve("me").catch((err) => {
            console.log('Catched error', err.message);
        });
        
    });
    
    it("creates client that retrieves token within callback and sends multiple concurrent requests", async function () {
        
        let count = 0;
        let getNewToken = function () {

            let _client = Client.create({
                oAuthUrl: 'https://connect-dev10.secupay-ag.de/oauth/',
                stompHost: 'connect-dev10.secupay-ag.de',
                restUrl: 'https://connect-dev10.secupay-ag.de/api/v2/',
                stompEnabled: false
            });

            _client.setCredentials(devCredentialRefreshToken);

            return _client.open().then(() => {
                
                console.log('getNewToken callback');
                count += 1;
                return _client.exportToken();

            });
            
        };
        
        let client = Client.create({
            oAuthUrl: 'https://connect-dev10.secupay-ag.de/oauth/',
            stompHost: 'connect-dev10.secupay-ag.de',
            restUrl: 'https://connect-dev10.secupay-ag.de/api/v2/',
            stompEnabled: false,
            retrieveToken: getNewToken
        });
        
        // we set credentials (backend app does it usually) 
        client.setCredentials();
        
        let accounts = client.getService(Services.General.Accounts);
        
        let arr = [];
        arr.length = 100;
        
        arr = _.map(arr, () => {

            return accounts.retrieve("me").catch((err) => {
                console.log('Catched error', err.message);
            })
            
        });
        
        await Promise.all(arr);
        
        let r1 = accounts.retrieve("me").catch((err) => {
            console.log('Catched error', err.message);
        });
        
        let r2 = accounts.retrieve("me").catch((err) => {
            console.log('Catched error', err.message);
        });
        
        await Promise.all([r1, r2]);
        
        console.log(`Token retrieved ${count} time(s)`);
        
        expect(count).toBe(1);
        
    });
    
    
    it("creates client that retrieves invalid token within callback", async function () {
        
        let count = 0;
        let getNewToken = function () {
            
            return Promise.reject().catch(() => {
                count += 1;
                throw new Error('Token is invalid');
            });
            
        };
        
        let client = Client.create({
            oAuthUrl: 'https://connect-dev10.secupay-ag.de/oauth/',
            stompHost: 'connect-dev10.secupay-ag.de',
            restUrl: 'https://connect-dev10.secupay-ag.de/api/v2/',
            stompEnabled: false,
            retrieveToken: getNewToken
        });
        
        // we set credentials (backend app does it usually) 
        client.setCredentials();
        
        let accounts = client.getService(Services.General.Accounts);
        
        let r1 = accounts.retrieve("me").catch((err) => {
            console.log('Catched error', err.message);
        });
        
        let r2 = accounts.retrieve("me").catch((err) => {
            console.log('Catched error', err.message);
        });
        
        await Promise.all([r1, r2]);
        
        let arr = [];
        arr.length = 100;
        
        arr = _.map(arr, () => {

            return accounts.retrieve("me").catch((err) => {
                console.log('Catched error', err.message);
            })
            
        });
        
        await Promise.all(arr);
        
        console.log(`Token retrieved ${count} time(s)`);
        expect(count).toBe(2);
        
    });

    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

});
