System.register([], function (_export) {
    'use strict';

    var ClientConfig;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    return {
        setters: [],
        execute: function () {
            ClientConfig = (function () {
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

                return ClientConfig;
            })();

            _export('ClientConfig', ClientConfig);

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

                withCredentials: false
            };

            ClientConfig.defaults = function () {

                var config = new ClientConfig();
                Object.assign(config, ClientConfig._defaults);
                return config;
            };
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvY2xpZW50LWNvbmZpZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7UUFXYSxZQUFZOzs7Ozs7O0FBQVosd0JBQVk7QUFFVix5QkFGRixZQUFZLEdBRVA7MENBRkwsWUFBWTtpQkFJcEI7O0FBSlEsNEJBQVksV0FNckIsV0FBVyxHQUFBLHVCQUFHO0FBQ1YsMkJBQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7aUJBQzlDOztBQVJRLDRCQUFZLFdBVXJCLFVBQVUsR0FBQSxzQkFBRztBQUNULDJCQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUM3Qzs7QUFaUSw0QkFBWSxXQWNyQixZQUFZLEdBQUEsd0JBQUc7QUFDWCx3QkFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztBQUMzQix3QkFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQ3JCLDZCQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztxQkFDNUM7QUFDRCwyQkFBTyxLQUFLLENBQUM7aUJBQ2hCOztBQXBCUSw0QkFBWSxXQXNCckIsWUFBWSxHQUFBLHdCQUFHO0FBQ1gsMkJBQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztpQkFDekI7O0FBeEJRLDRCQUFZLFdBMEJyQixrQkFBa0IsR0FBQSw4QkFBRztBQUNqQiwyQkFBTyxJQUFJLENBQUMsZUFBZSxDQUFDO2lCQUMvQjs7QUE1QlEsNEJBQVksV0E4QnJCLGFBQWEsR0FBQSx5QkFBRztBQUNaLDJCQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7aUJBQzFCOztBQWhDUSw0QkFBWSxXQWtDckIsYUFBYSxHQUFBLHlCQUFHO0FBQ1osMkJBQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztpQkFDMUI7O0FBcENRLDRCQUFZLFdBc0NyQixtQkFBbUIsR0FBQSwrQkFBRztBQUNsQiwyQkFBTyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2lCQUN0RDs7QUF4Q1EsNEJBQVksV0EwQ3JCLGdCQUFnQixHQUFBLDRCQUFHO0FBQ2YsMkJBQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztpQkFDN0I7O0FBNUNRLDRCQUFZLFdBOENyQixtQkFBbUIsR0FBQSwrQkFBRztBQUNsQiwyQkFBTyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO2lCQUN4Qzs7QUFoRFEsNEJBQVksV0FrRHJCLFFBQVEsR0FBQSxvQkFBRzs7QUFFUCwyQkFBTyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2lCQUVuQzs7QUF0RFEsNEJBQVksV0F3RHJCLGFBQWEsR0FBQSx5QkFBRztBQUNaLDJCQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7aUJBQzFCOztBQTFEUSw0QkFBWSxXQTREckIsZ0JBQWdCLEdBQUEsNEJBQUc7QUFDZiwyQkFBTyxJQUFJLENBQUMsYUFBYSxDQUFDO2lCQUM3Qjs7QUE5RFEsNEJBQVksV0FnRXJCLGtCQUFrQixHQUFBLDhCQUFHO0FBQ2pCLDJCQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7aUJBQy9COztBQWxFUSw0QkFBWSxXQW9FckIsZUFBZSxHQUFBLHlCQUFDLEtBQUssRUFBRTs7QUFFbkIsd0JBQUksR0FBRyxHQUFHLEtBQUssQ0FBQztBQUNoQix3QkFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7QUFDcEIsMkJBQUcsSUFBSSxHQUFHLENBQUM7cUJBQ2Q7QUFDRCwyQkFBTyxHQUFHLENBQUM7aUJBRWQ7O3VCQTVFUSxZQUFZOzs7b0NBQVosWUFBWTs7QUFnRnpCLHdCQUFZLENBQUMsU0FBUyxHQUFHO0FBR3JCLDhCQUFjLEVBQUUsRUFBRTtBQUdsQix3QkFBUSxFQUFFLEVBQUU7QUFHWiwwQkFBVSxFQUFFLElBQUk7O0FBR2hCLHdCQUFRLEVBQUUscUNBQXFDOztBQUUvQyxpQ0FBaUIsRUFBRSxDQUFDO0FBR3BCLHVCQUFPLEVBQUUsc0NBQXNDOztBQUUvQywyQkFBVyxFQUFFLENBQUM7QUFHZCw0QkFBWSxFQUFFLElBQUk7O0FBRWxCLGlDQUFpQixFQUFFLEVBQUU7O0FBRXJCLHlCQUFTLEVBQUUsc0JBQXNCO0FBQ2pDLHlCQUFTLEVBQUUsS0FBSztBQUNoQiwwQkFBVSxFQUFFLElBQUk7QUFDaEIsNkJBQWEsRUFBRSxFQUFFO0FBRWpCLGdDQUFnQixFQUFFLHVCQUF1Qjs7QUFFekMsK0JBQWUsRUFBRSxJQUFJOztBQUdyQiwwQkFBVSxFQUFFLGtCQUFrQjs7QUFHOUIsc0NBQXNCLEVBQUUsQ0FBQztBQUV6QixzQ0FBc0IsRUFBRSxDQUFDO0FBTXpCLCtCQUFlLEVBQUUsQ0FBQztBQUdsQiw2QkFBYSxFQUFFLElBQUk7O0FBR25CLCtCQUFlLEVBQUUsS0FBSzthQUN6QixDQUFDOztBQUVGLHdCQUFZLENBQUMsUUFBUSxHQUFHLFlBQU07O0FBRTFCLG9CQUFJLE1BQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0FBQ2hDLHNCQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDOUMsdUJBQU8sTUFBTSxDQUFDO2FBRWpCLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9jbGllbnQtY29uZmlnLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==