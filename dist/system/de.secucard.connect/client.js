System.register(['./net/message', './client-config', './client-context', './client-version'], function (_export) {
	'use strict';

	var Message, ClientConfig, ClientContext, Version, Client;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	return {
		setters: [function (_netMessage) {
			Message = _netMessage.Message;
		}, function (_clientConfig) {
			ClientConfig = _clientConfig.ClientConfig;
		}, function (_clientContext) {
			ClientContext = _clientContext.ClientContext;
		}, function (_clientVersion) {
			Version = _clientVersion.Version;
		}],
		execute: function () {
			Client = (function () {
				function Client(config, environment) {
					_classCallCheck(this, Client);

					this.config = config;
					this.context = new ClientContext(config, environment);
					this.getService = this.context.getService.bind(this.context);
					this.addAppService = this.context.addAppService.bind(this.context);
					this.removeAppService = this.context.removeAppService.bind(this.context);
					this.emitServiceEvent = this.context.emitServiceEvent.bind(this.context);
					this.on = this.context.on.bind(this.context);
					this.setCredentials = this.context.setCredentials.bind(this.context);
					this.connected = false;
				}

				Client.prototype.open = function open() {
					var _this = this;

					if (this.connected) {
						return Promise.resolve(this.connected);
					}

					return this.context.open().then(function () {
						_this.connected = true;
						return _this.connected;
					});
				};

				Client.prototype.getVersion = function getVersion() {
					return Version.name;
				};

				return Client;
			})();

			_export('Client', Client);

			Client.create = function (environment, config) {

				if (!config) {
					config = Object.create(null);
				}

				config = Object.assign(ClientConfig.defaults(), environment.config, config);

				return new Client(config, environment);
			};
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvY2xpZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztvREFnQmEsTUFBTTs7Ozs7O3lCQUxYLE9BQU87O2dDQUNQLFlBQVk7O2tDQUNaLGFBQWE7OzRCQUNiLE9BQU87OztBQUVGLFNBQU07QUFFUCxhQUZDLE1BQU0sQ0FFTixNQUFNLEVBQUUsV0FBVyxFQUFFOzJCQUZyQixNQUFNOztBQUlqQixTQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUNyQixTQUFJLENBQUMsT0FBTyxHQUFHLElBQUksYUFBYSxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQztBQUN0RCxTQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDN0QsU0FBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ25FLFNBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDekUsU0FBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN6RSxTQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDN0MsU0FBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3JFLFNBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0tBRXZCOztBQWRXLFVBQU0sV0FnQmxCLElBQUksR0FBQSxnQkFBRzs7O0FBRU4sU0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFO0FBQ2xCLGFBQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7TUFDdkM7O0FBRUQsWUFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFNO0FBQ3JDLFlBQUssU0FBUyxHQUFHLElBQUksQ0FBQztBQUN0QixhQUFPLE1BQUssU0FBUyxDQUFDO01BQ3RCLENBQUMsQ0FBQztLQUVIOztBQTNCVyxVQUFNLFdBNkJsQixVQUFVLEdBQUEsc0JBQUc7QUFDWixZQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUM7S0FDcEI7O1dBL0JXLE1BQU07OztxQkFBTixNQUFNOztBQW1DbkIsU0FBTSxDQUFDLE1BQU0sR0FBRyxVQUFDLFdBQVcsRUFBRSxNQUFNLEVBQUs7O0FBRXhDLFFBQUcsQ0FBQyxNQUFNLEVBQUM7QUFDVixXQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUM3Qjs7QUFFRCxVQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLEVBQUUsV0FBVyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQzs7QUFFNUUsV0FBTyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFFdkMsQ0FBQyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L2NsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=