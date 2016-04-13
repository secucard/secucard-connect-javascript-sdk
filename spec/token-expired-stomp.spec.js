import EE from 'eventemitter3';
import _ from 'lodash';

import {Services, MiniLog, SecucardConnect as Client} from '../src/index.js';
import {Stomp} from '../src/de.secucard.connect/net/stomp';
import {SocketAtNode} from '../src/de.secucard.connect/net/socket/socket-node';

import devCredentialRefreshToken from './support/dev-credentials-refresh-token.json';
import util from './support/util';

describe("Testing token creating. passing and expiration using STOMP", function () {
    
    var originalTimeout;
    var server;
    
    MiniLog.suggest.clear();
    MiniLog.enable();
    
    beforeEach(async function () {
        
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10 * 60 * 1000;
        
        let newTokenCount = 0;
        
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
                return _client.exportToken();

            });
            
        };
        
        server = await util.runHttpServer(null, {
            method: 'GET',
            path: '/token',
            handler: function (request, reply) {
                
                if(newTokenCount > 0) {
                    reply({});
                    return;
                }
                
                newTokenCount += 1;
                getNewToken().then((token) => {
                    // Note: here server sends reply with 'Content-type' header set to 'application/json'
                    reply(token);
                });
            }
        });
        
        
    });
    
    it("creates client that retrieves token from URL, STOMP enabled", function (done) {
        
        let client = Client.create({
            oAuthUrl: 'https://connect-dev10.secupay-ag.de/oauth/',
            stompHost: 'connect-dev10.secupay-ag.de',
            restUrl: 'https://connect-dev10.secupay-ag.de/api/v2/',
            retrieveToken: 'http://localhost:9000/token'
        });
        
        // we set credentials (backend app does it usually) 
        client.setCredentials();
        
        // configure client to send stomp session refresh every 2 sec 
        client.config.stompHeartbeatSec = 2;

        let stomp = new Stomp(SocketAtNode);
        stomp.configureWithContext(client.context);

        let counter = 0;
        stomp.on('sessionRefresh', ()=> {

            counter++;
            console.log('sessionRefresh', counter);

            if (counter == 3) {

                // close stomp channel and ...

                stomp.close().then(()=> {

                    // ... wait for 3 sec to ensure 'sessionRefresh' event is never recieved later 

                    setTimeout(()=> {
                        expect(counter == 3).toBe(true);
                        done();
                    }, 3 * 1000);

                });
            }

        });

        stomp.open().then(() => {
            console.log('Stomp opened', counter);
        });
        
    });
    

    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

});
