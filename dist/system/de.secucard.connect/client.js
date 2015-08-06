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
					this.getStoredToken = this.context.getStoredToken.bind(this.context);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvY2xpZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztvREFnQmEsTUFBTTs7Ozs7O3lCQUxYLE9BQU87O2dDQUNQLFlBQVk7O2tDQUNaLGFBQWE7OzRCQUNiLE9BQU87OztBQUVGLFNBQU07QUFFUCxhQUZDLE1BQU0sQ0FFTixNQUFNLEVBQUUsV0FBVyxFQUFFOzJCQUZyQixNQUFNOztBQUlqQixTQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUNyQixTQUFJLENBQUMsT0FBTyxHQUFHLElBQUksYUFBYSxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQztBQUN0RCxTQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDN0QsU0FBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ25FLFNBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDekUsU0FBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN6RSxTQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDN0MsU0FBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3JFLFNBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNyRSxTQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztLQUV2Qjs7QUFmVyxVQUFNLFdBaUJsQixJQUFJLEdBQUEsZ0JBQUc7OztBQUVOLFNBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRTtBQUNsQixhQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO01BQ3ZDOztBQUVELFlBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBTTtBQUNyQyxZQUFLLFNBQVMsR0FBRyxJQUFJLENBQUM7QUFDdEIsYUFBTyxNQUFLLFNBQVMsQ0FBQztNQUN0QixDQUFDLENBQUM7S0FFSDs7QUE1QlcsVUFBTSxXQThCbEIsVUFBVSxHQUFBLHNCQUFHO0FBQ1osWUFBTyxPQUFPLENBQUMsSUFBSSxDQUFDO0tBQ3BCOztXQWhDVyxNQUFNOzs7cUJBQU4sTUFBTTs7QUFvQ25CLFNBQU0sQ0FBQyxNQUFNLEdBQUcsVUFBQyxXQUFXLEVBQUUsTUFBTSxFQUFLOztBQUV4QyxRQUFHLENBQUMsTUFBTSxFQUFDO0FBQ1YsV0FBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDN0I7O0FBRUQsVUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxFQUFFLFdBQVcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7O0FBRTVFLFdBQU8sSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBRXZDLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9jbGllbnQuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9