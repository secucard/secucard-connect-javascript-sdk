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
					return this.stompHost;
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

				ClientConfig.prototype.getStompHeartbeatMs = function getStompHeartbeatMs() {
					return this.stompHeartbeatSec * 1000;
				};

				ClientConfig.prototype.isDevice = function isDevice() {

					return Boolean(this.deviceUUID);
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
				deviceUUID: '',
				oAuthUrl: 'https://connect.secucard.com/oauth/',

				authDeviceTimeout: 0,
				restUrl: 'https://connect.secucard.com/api/v2/',

				restTimeout: 0,
				stompEnabled: true,
				stompHeartbeatSec: 30,

				stompHost: 'connect.secucard.com',
				stompPort: 61614,
				stompVHost: null,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvY2xpZW50LWNvbmZpZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7S0FBYSxZQUFZOzs7Ozs7O0FBQVosZUFBWTtBQUViLGFBRkMsWUFBWSxHQUVWOzJCQUZGLFlBQVk7S0FJdkI7O0FBSlcsZ0JBQVksV0FNeEIsV0FBVyxHQUFBLHVCQUFHO0FBQ2IsWUFBTyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztLQUMzQzs7QUFSVyxnQkFBWSxXQVV4QixVQUFVLEdBQUEsc0JBQUc7QUFDWixZQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQzFDOztBQVpXLGdCQUFZLFdBY3hCLFlBQVksR0FBQSx3QkFBRztBQUNkLFlBQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztLQUN0Qjs7QUFoQlcsZ0JBQVksV0FrQnhCLFlBQVksR0FBQSx3QkFBRztBQUNkLFlBQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztLQUN0Qjs7QUFwQlcsZ0JBQVksV0FzQnhCLGtCQUFrQixHQUFBLDhCQUFHO0FBQ3BCLFlBQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztLQUM1Qjs7QUF4QlcsZ0JBQVksV0EwQnhCLGFBQWEsR0FBQSx5QkFBRztBQUNmLFlBQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztLQUN2Qjs7QUE1QlcsZ0JBQVksV0E4QnhCLGFBQWEsR0FBQSx5QkFBRztBQUNmLFlBQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztLQUN2Qjs7QUFoQ1csZ0JBQVksV0FrQ3hCLG1CQUFtQixHQUFBLCtCQUFHO0FBQ3JCLFlBQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztLQUNuRDs7QUFwQ1csZ0JBQVksV0FzQ3hCLG1CQUFtQixHQUFDLCtCQUFHO0FBQ3RCLFlBQU8sSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQztLQUNyQzs7QUF4Q1csZ0JBQVksV0EwQ3hCLFFBQVEsR0FBQSxvQkFBRzs7QUFFVixZQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7S0FFaEM7O0FBOUNXLGdCQUFZLFdBZ0R4QixlQUFlLEdBQUEseUJBQUMsS0FBSyxFQUFFOztBQUV0QixTQUFJLEdBQUcsR0FBRyxLQUFLLENBQUM7QUFDaEIsU0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7QUFDdEIsU0FBRyxJQUFJLEdBQUcsQ0FBQztNQUNYO0FBQ0QsWUFBTyxHQUFHLENBQUM7S0FFWDs7V0F4RFcsWUFBWTs7OzJCQUFaLFlBQVk7O0FBNER6QixlQUFZLENBQUMsU0FBUyxHQUFHO0FBR3hCLGtCQUFjLEVBQUcsRUFBRTtBQUduQixZQUFRLEVBQUUsRUFBRTtBQUdaLGNBQVUsRUFBRSxFQUFFO0FBR2QsWUFBUSxFQUFDLHFDQUFxQzs7QUFFOUMscUJBQWlCLEVBQUMsQ0FBQztBQUduQixXQUFPLEVBQUUsc0NBQXNDOztBQUUvQyxlQUFXLEVBQUUsQ0FBQztBQUdkLGdCQUFZLEVBQUUsSUFBSTtBQUVsQixxQkFBaUIsRUFBRSxFQUFFOztBQUVyQixhQUFTLEVBQUUsc0JBQXNCO0FBQ2pDLGFBQVMsRUFBRSxLQUFLO0FBQ2hCLGNBQVUsRUFBRSxJQUFJO0FBR2hCLG9CQUFnQixFQUFFLHVCQUF1Qjs7QUFFekMsbUJBQWUsRUFBRSxJQUFJOztBQUdyQixjQUFVLEVBQUUsa0JBQWtCOztBQUc5QiwwQkFBc0IsRUFBRSxDQUFDO0FBRXpCLDBCQUFzQixFQUFFLENBQUM7QUFNekIsbUJBQWUsRUFBRSxDQUFDLEVBRWxCLENBQUM7O0FBRUYsZUFBWSxDQUFDLFFBQVEsR0FBRyxZQUFNOztBQUU3QixRQUFJLE1BQU0sR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0FBQ2hDLFVBQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUM5QyxXQUFPLE1BQU0sQ0FBQztJQUVkLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9jbGllbnQtY29uZmlnLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==