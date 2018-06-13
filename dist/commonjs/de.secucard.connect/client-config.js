'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var ClientConfig = (function () {
    function ClientConfig() {
        _classCallCheck(this, ClientConfig);
    }

    ClientConfig.prototype.getOAuthUrl = function getOAuthUrl() {
        return this._getCompleteUrl(this.oAuthUrl);
    };

    ClientConfig.prototype.getRestUrl = function getRestUrl() {
        return this._getCompleteUrl(this.restUrl);
    };

    ClientConfig.prototype.getStompHost = function getStompHost() {
        var value = this.stompHost;
        if (value.endsWith('/')) {
            value = value.slice(0, value.length - 1);
        }
        return value;
    };

    ClientConfig.prototype.getStompPort = function getStompPort() {
        return this.stompPort;
    };

    ClientConfig.prototype.getStompSslEnabled = function getStompSslEnabled() {
        return this.stompSslEnabled;
    };

    ClientConfig.prototype.getStompVHost = function getStompVHost() {
        return this.stompVHost;
    };

    ClientConfig.prototype.getStompQueue = function getStompQueue() {
        return this.stompQueue;
    };

    ClientConfig.prototype.getStompDestination = function getStompDestination() {
        return this._getCompleteUrl(this.stompDestination);
    };

    ClientConfig.prototype.getStompEndpoint = function getStompEndpoint() {
        return this.stompEndpoint;
    };

    ClientConfig.prototype.getStompHeartbeatMs = function getStompHeartbeatMs() {
        return this.stompHeartbeatSec * 1000;
    };

    ClientConfig.prototype.isDevice = function isDevice() {
        return Boolean(this.deviceUUID);
    };

    ClientConfig.prototype.getDeviceUUID = function getDeviceUUID() {
        return this.deviceUUID;
    };

    ClientConfig.prototype.getRetrieveToken = function getRetrieveToken() {
        return this.retrieveToken;
    };

    ClientConfig.prototype.getWithCredentials = function getWithCredentials() {
        return this.withCredentials;
    };

    ClientConfig.prototype._getCompleteUrl = function _getCompleteUrl(value) {
        var url = value;
        if (!url.endsWith('/')) {
            url += '/';
        }
        return url;
    };

    ClientConfig.prototype.getLanguage = function getLanguage() {
        return this.language;
    };

    return ClientConfig;
})();

exports.ClientConfig = ClientConfig;

ClientConfig._defaults = {
    channelDefault: '',
    cacheDir: '',
    deviceUUID: null,

    oAuthUrl: 'https://connect.secucard.com/oauth/',

    authDeviceTimeout: 0,
    restUrl: 'https://connect.secucard.com/api/v2/',

    restTimeout: 0,
    stompEnabled: true,

    stompHeartbeatSec: 30,

    stompHost: 'connect.secucard.com',
    stompPort: 61614,
    stompVHost: null,
    stompEndpoint: '',
    stompDestination: '/exchange/connect.api',

    stompSslEnabled: true,

    stompQueue: '/temp-queue/main',

    stompConnectTimeoutSec: 0,
    stompMessageTimeoutSec: 0,
    stompMessageAge: 0,
    retrieveToken: null,

    withCredentials: false,

    language: 'de'
};

ClientConfig.defaults = function () {
    var config = new ClientConfig();
    Object.assign(config, ClientConfig._defaults);
    return config;
};