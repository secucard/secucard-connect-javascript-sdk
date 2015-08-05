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
				stompMessageAge: 0 };

			ClientConfig.defaults = function () {

				var config = new ClientConfig();
				Object.assign(config, ClientConfig._defaults);
				return config;
			};
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvY2xpZW50LWNvbmZpZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7S0FXYSxZQUFZOzs7Ozs7O0FBQVosZUFBWTtBQUViLGFBRkMsWUFBWSxHQUVWOzJCQUZGLFlBQVk7S0FJdkI7O0FBSlcsZ0JBQVksV0FNeEIsV0FBVyxHQUFBLHVCQUFHO0FBQ2IsWUFBTyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUMzQzs7QUFSVyxnQkFBWSxXQVV4QixVQUFVLEdBQUEsc0JBQUc7QUFDWixZQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQzFDOztBQVpXLGdCQUFZLFdBY3hCLFlBQVksR0FBQSx3QkFBRztBQUNkLFNBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7QUFDM0IsU0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFDO0FBQ3RCLFdBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxDQUFDO01BQ3ZDO0FBQ0QsWUFBTyxLQUFLLENBQUM7S0FDYjs7QUFwQlcsZ0JBQVksV0FzQnhCLFlBQVksR0FBQSx3QkFBRztBQUNkLFlBQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztLQUN0Qjs7QUF4QlcsZ0JBQVksV0EwQnhCLGtCQUFrQixHQUFBLDhCQUFHO0FBQ3BCLFlBQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztLQUM1Qjs7QUE1QlcsZ0JBQVksV0E4QnhCLGFBQWEsR0FBQSx5QkFBRztBQUNmLFlBQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztLQUN2Qjs7QUFoQ1csZ0JBQVksV0FrQ3hCLGFBQWEsR0FBQSx5QkFBRztBQUNmLFlBQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztLQUN2Qjs7QUFwQ1csZ0JBQVksV0FzQ3hCLG1CQUFtQixHQUFBLCtCQUFHO0FBQ3JCLFlBQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztLQUNuRDs7QUF4Q1csZ0JBQVksV0EwQ3hCLGdCQUFnQixHQUFBLDRCQUFHO0FBQ2xCLFlBQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQztLQUMxQjs7QUE1Q1csZ0JBQVksV0E4Q3hCLG1CQUFtQixHQUFDLCtCQUFHO0FBQ3RCLFlBQU8sSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztLQUNyQzs7QUFoRFcsZ0JBQVksV0FrRHhCLFFBQVEsR0FBQSxvQkFBRzs7QUFFVixZQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7S0FFaEM7O0FBdERXLGdCQUFZLFdBd0R4QixhQUFhLEdBQUEseUJBQUc7QUFDZixZQUFPLElBQUksQ0FBQyxVQUFVLENBQUM7S0FDdkI7O0FBMURXLGdCQUFZLFdBNER4QixlQUFlLEdBQUEseUJBQUMsS0FBSyxFQUFFOztBQUV0QixTQUFJLEdBQUcsR0FBRyxLQUFLLENBQUM7QUFDaEIsU0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7QUFDdEIsU0FBRyxJQUFJLEdBQUcsQ0FBQztNQUNYO0FBQ0QsWUFBTyxHQUFHLENBQUM7S0FFWDs7V0FwRVcsWUFBWTs7OzJCQUFaLFlBQVk7O0FBd0V6QixlQUFZLENBQUMsU0FBUyxHQUFHO0FBR3hCLGtCQUFjLEVBQUcsRUFBRTtBQUduQixZQUFRLEVBQUUsRUFBRTtBQUdaLGNBQVUsRUFBRSxJQUFJOztBQUdoQixZQUFRLEVBQUMscUNBQXFDOztBQUU5QyxxQkFBaUIsRUFBQyxDQUFDO0FBR25CLFdBQU8sRUFBRSxzQ0FBc0M7O0FBRS9DLGVBQVcsRUFBRSxDQUFDO0FBR2QsZ0JBQVksRUFBRSxJQUFJO0FBRWxCLHFCQUFpQixFQUFFLEVBQUU7O0FBRXJCLGFBQVMsRUFBRSxzQkFBc0I7QUFDakMsYUFBUyxFQUFFLEtBQUs7QUFDaEIsY0FBVSxFQUFFLElBQUk7QUFDaEIsaUJBQWEsRUFBRSxFQUFFO0FBRWpCLG9CQUFnQixFQUFFLHVCQUF1Qjs7QUFFekMsbUJBQWUsRUFBRSxJQUFJOztBQUdyQixjQUFVLEVBQUUsa0JBQWtCOztBQUc5QiwwQkFBc0IsRUFBRSxDQUFDO0FBRXpCLDBCQUFzQixFQUFFLENBQUM7QUFNekIsbUJBQWUsRUFBRSxDQUFDLEVBRWxCLENBQUM7O0FBRUYsZUFBWSxDQUFDLFFBQVEsR0FBRyxZQUFNOztBQUU3QixRQUFJLE1BQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0FBQ2hDLFVBQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUM5QyxXQUFPLE1BQU0sQ0FBQztJQUVkLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9jbGllbnQtY29uZmlnLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==