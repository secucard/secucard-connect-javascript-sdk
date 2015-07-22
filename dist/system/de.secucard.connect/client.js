System.register(['./net/message', './client-config', './client-context'], function (_export) {
	'use strict';

	var Message, ClientConfig, ClientContext, Client;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	return {
		setters: [function (_netMessage) {
			Message = _netMessage.Message;
		}, function (_clientConfig) {
			ClientConfig = _clientConfig.ClientConfig;
		}, function (_clientContext) {
			ClientContext = _clientContext.ClientContext;
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
					this.connected = false;
				}

				Client.prototype.setCredentials = function setCredentials(credentials) {
					this.context.setCredentials(credentials);
				};

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvY2xpZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OzsyQ0FJYSxNQUFNOzs7Ozs7eUJBSlgsT0FBTzs7Z0NBQ1AsWUFBWTs7a0NBQ1osYUFBYTs7O0FBRVIsU0FBTTtBQUVQLGFBRkMsTUFBTSxDQUVOLE1BQU0sRUFBRSxXQUFXLEVBQUU7MkJBRnJCLE1BQU07O0FBSWpCLFNBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBQ3JCLFNBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxhQUFhLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQ3RELFNBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM3RCxTQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDbkUsU0FBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN6RSxTQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3pFLFNBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0tBRXZCOztBQVpXLFVBQU0sV0FjbEIsY0FBYyxHQUFBLHdCQUFDLFdBQVcsRUFBRTtBQUMzQixTQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztLQUN6Qzs7QUFoQlcsVUFBTSxXQWtCbEIsSUFBSSxHQUFBLGdCQUFHOzs7QUFFTixTQUFHLElBQUksQ0FBQyxTQUFTLEVBQUU7QUFDbEIsYUFBTyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztNQUN2Qzs7QUFFRCxZQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQU07QUFDckMsWUFBSyxTQUFTLEdBQUcsSUFBSSxDQUFDO0FBQ3RCLGFBQU8sTUFBSyxTQUFTLENBQUM7TUFDdEIsQ0FBQyxDQUFDO0tBRUg7O1dBN0JXLE1BQU07OztxQkFBTixNQUFNOztBQWlDbkIsU0FBTSxDQUFDLE1BQU0sR0FBRyxVQUFDLFdBQVcsRUFBRSxNQUFNLEVBQUs7O0FBRXhDLFFBQUcsQ0FBQyxNQUFNLEVBQUM7QUFDVixXQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUM3Qjs7QUFFRCxVQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLEVBQUUsV0FBVyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQzs7QUFFNUUsV0FBTyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFFdkMsQ0FBQyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L2NsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=