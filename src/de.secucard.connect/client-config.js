/*
 Copyright 2015 hp.weber GmbH & Co secucard KG (www.secucard.com)
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */
export class ClientConfig {

    constructor() {

    }

    getOAuthUrl() {
        return this._getCompleteUrl(this.oAuthUrl);
    }

    getRestUrl() {
        return this._getCompleteUrl(this.restUrl);
    }

    getStompHost() {
        let value = this.stompHost;
        if (value.endsWith('/')) {
            value = value.slice(0, value.length - 1);
        }
        return value;
    }

    getStompPort() {
        return this.stompPort;
    }

    getStompSslEnabled() {
        return this.stompSslEnabled;
    }

    getStompVHost() {
        return this.stompVHost;
    }

    getStompQueue() {
        return this.stompQueue;
    }

    getStompDestination() {
        return this._getCompleteUrl(this.stompDestination);
    }

    getStompEndpoint() {
        return this.stompEndpoint;
    }

    getStompHeartbeatMs() {
        return this.stompHeartbeatSec * 1000;
    }

    isDevice() {

        return Boolean(this.deviceUUID);

    }

    getDeviceUUID() {
        return this.deviceUUID;
    }
    
    getRetrieveToken() {
        return this.retrieveToken;
    }
    
    getWithCredentials() {
        return this.withCredentials;
    }

    _getCompleteUrl(value) {

        let url = value;
        if (!url.endsWith('/')) {
            url += '/';
        }
        return url;

    }

}

ClientConfig._defaults = {

    // The default server communication channel: REST | STOMP.
    channelDefault: '', // TODO implement channelDefault

    // Cache dir
    cacheDir: '', // TODO implement cacheDir

    // Unique device id like UUID. Mandatory when using device auth type.
    deviceUUID: null,

    // URL of the OAuth service to use.
    oAuthUrl: 'https://connect.secucard.com/oauth/',
    // Timeout in seconds to use when waiting for auth tokens when performing "device" auth type.
    authDeviceTimeout: 0, //TODO implement authDeviceTimeout

    // URL of the secucard REST API.
    restUrl: 'https://connect.secucard.com/api/v2/',
    // Timeout for getting any response. 0 for no timeout.
    restTimeout: 0, //TODO implement restTimeout

    // STOMP server communication is enabled: true | false/nothing
    stompEnabled: true,
    // The interval the STOMP channel sends a "heartbeat".
    stompHeartbeatSec: 30,
    // stomp host, virtual host, stomp port
    stompHost: 'connect.secucard.com',
    stompPort: 61614, // or 15674 for browser
    stompVHost: null, // value for 'host' header to send with STOMP connect request
    stompEndpoint: '', // endpoint for socket connection: '' (not used in node) or '/stomp/websocket'(browser)
    // Base path of the secucard STOMP API.
    stompDestination: '/exchange/connect.api',
    // SSL used with for STOMP: true | false/nothing.
    stompSslEnabled: true,

    // The default queue for all STOMP messages.
    stompQueue: '/temp-queue/main',

    // Timeout for trying to connect to STOMP server. 0 means no waiting.
    stompConnectTimeoutSec: 0, //TODO implement stompConnectTimeoutSec
    // Timeout for awaiting message receipts and also message responses. An error is raised after. 0 means no waiting.
    stompMessageTimeoutSec: 0, //TODO implement stompMessageTimeoutSec
    /*
     Max age of received STOMP messages in the systems message box before they get deleted.
     Keeps the message queue clean, usually messages should not get very old in the box, if a message reaches this max age
     its very likely that nobody is interested or a problem exist and therefore we can remove.
     */
    stompMessageAge: 0, //TODO implement stompMessageAge,
    
    //if credentials not set, client retrieves token itself, can be string/URL or callback that returns Promise
    retrieveToken: null,
    
    // enable to send cookies set on backend (browser client setting)
    withCredentials: false
};

ClientConfig.defaults = () => {

    let config = new ClientConfig();
    Object.assign(config, ClientConfig._defaults);
    return config;

};
