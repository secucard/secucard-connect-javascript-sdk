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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvY2xpZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztvREFLYSxNQUFNOzs7Ozs7eUJBTFgsT0FBTzs7Z0NBQ1AsWUFBWTs7a0NBQ1osYUFBYTs7NEJBQ2IsT0FBTzs7O0FBRUYsU0FBTTtBQUVQLGFBRkMsTUFBTSxDQUVOLE1BQU0sRUFBRSxXQUFXLEVBQUU7MkJBRnJCLE1BQU07O0FBSWpCLFNBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBQ3JCLFNBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxhQUFhLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0FBQ3RELFNBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM3RCxTQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDbkUsU0FBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN6RSxTQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3pFLFNBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0tBRXZCOztBQVpXLFVBQU0sV0FjbEIsY0FBYyxHQUFBLHdCQUFDLFdBQVcsRUFBRTtBQUMzQixTQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQztLQUN6Qzs7QUFoQlcsVUFBTSxXQWtCbEIsSUFBSSxHQUFBLGdCQUFHOzs7QUFFTixTQUFHLElBQUksQ0FBQyxTQUFTLEVBQUU7QUFDbEIsYUFBTyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztNQUN2Qzs7QUFFRCxZQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQU07QUFDckMsWUFBSyxTQUFTLEdBQUcsSUFBSSxDQUFDO0FBQ3RCLGFBQU8sTUFBSyxTQUFTLENBQUM7TUFDdEIsQ0FBQyxDQUFDO0tBRUg7O0FBN0JXLFVBQU0sV0ErQmxCLFVBQVUsR0FBQSxzQkFBRztBQUNaLFlBQU8sT0FBTyxDQUFDLElBQUksQ0FBQztLQUNwQjs7V0FqQ1csTUFBTTs7O3FCQUFOLE1BQU07O0FBcUNuQixTQUFNLENBQUMsTUFBTSxHQUFHLFVBQUMsV0FBVyxFQUFFLE1BQU0sRUFBSzs7QUFFeEMsUUFBRyxDQUFDLE1BQU0sRUFBQztBQUNWLFdBQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzdCOztBQUVELFVBQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsRUFBRSxXQUFXLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDOztBQUU1RSxXQUFPLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQztJQUV2QyxDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvY2xpZW50LmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==