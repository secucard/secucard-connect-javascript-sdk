System.register(['lodash', './net/rest', './auth/auth', './auth/credentials', './product/app/app-service'], function (_export) {
	'use strict';

	var _, Rest, Auth, Credentials, AppService, ClientContext;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	return {
		setters: [function (_lodash) {
			_ = _lodash['default'];
		}, function (_netRest) {
			Rest = _netRest.Rest;
		}, function (_authAuth) {
			Auth = _authAuth.Auth;
		}, function (_authCredentials) {
			Credentials = _authCredentials.Credentials;
		}, function (_productAppAppService) {
			AppService = _productAppAppService.AppService;
		}],
		execute: function () {
			ClientContext = (function () {
				function ClientContext(config, environment) {
					_classCallCheck(this, ClientContext);

					var auth = new Auth();
					auth.configureWithContext(this);
					this.auth = auth;

					var restChannel = new Rest();
					restChannel.configureWithContext(this);
					this.restChannel = restChannel;

					if (config.stompEnabled) {
						var stompChannel = environment.StompChannel.create();
						stompChannel.configureWithContext(this);
						this.stompChannel = stompChannel;
					}

					this.channels = {
						stomp: this.stompChannel,
						rest: this.restChannel
					};

					this.serviceEventTargets = Object.create(null);

					this.createServices(environment.services);

					this.config = config;
				}

				ClientContext.prototype.open = function open() {
					var _this = this;

					return this.getAuth().getToken().then(function () {

						if (!_this.config.stompEnabled) {
							return true;
						}

						return Promise.all(_.map(_.values(_this.channels), function (channel) {
							return channel.open();
						}));
					});
				};

				ClientContext.prototype.createServices = function createServices(classList) {

					var services = Object.create(null);
					var ServiceClass = undefined;
					var service = undefined;
					var uid = undefined;
					for (var i = 0; i < classList.length; i++) {

						ServiceClass = classList[i];
						service = new ServiceClass();
						service.configureWithContext(this);
						uid = service.getUid();
						services[uid] = service;
						this.registerServiceEventTargets(service, service.getEventTargets());
					}

					this.services = services;
				};

				ClientContext.prototype.getService = function getService(uid) {
					return this.services[uid.toLowerCase()];
				};

				ClientContext.prototype.addAppService = function addAppService(AppMixin) {

					var appService = AppService.createWithMixin(AppMixin);
					appService.configureWithContext(this);
					this.services[appService.getUid()] = appService;
					this.registerServiceEventTargets(appService, appService.getEventTargets());
					return appService;
				};

				ClientContext.prototype.removeAppService = function removeAppService(uid) {

					var appService = this.services[uid];

					if (appService && appService.isApp) {

						this.unregisterServiceEventTargets(appService.getEventTargets());
						delete this.services[uid];
					} else {
						throw new Error('Service not found: ' + uid);
					}
				};

				ClientContext.prototype.setCredentials = function setCredentials(credentials) {
					this.credentials = Credentials.create(credentials);
				};

				ClientContext.prototype.getCredentials = function getCredentials() {
					return this.credentials;
				};

				ClientContext.prototype.getConfig = function getConfig() {
					return this.config;
				};

				ClientContext.prototype.getAuth = function getAuth() {
					return this.auth;
				};

				ClientContext.prototype.getChannel = function getChannel(channelConfig) {
					var _this2 = this;

					var ch = null;
					_.each(_(channelConfig).reverse().value(), function (type) {
						if (_this2.getChannelByType(type)) {
							ch = _this2.getChannelByType(type);
						}
					});
					if (!ch) {
						throw new Error('Channel not found, please, check channel config for the service: ' + JSON.stringify(channelConfig));
					}
					return ch;
				};

				ClientContext.prototype.getChannelByType = function getChannelByType(type) {

					return this.channels[type];
				};

				ClientContext.prototype.getRestChannel = function getRestChannel() {
					return this.restChannel;
				};

				ClientContext.prototype.getStompChannel = function getStompChannel() {
					return this.stompChannel;
				};

				ClientContext.prototype.getServiceDefaultOptions = function getServiceDefaultOptions() {

					return {
						channelConfig: ['stomp', 'rest'],
						useAuth: true
					};
				};

				ClientContext.prototype.isRequestWithToken = function isRequestWithToken(options) {

					return !options || options && (!options.hasOwnProperty('useAuth') || options.useAuth);
				};

				ClientContext.prototype.registerServiceEventTargets = function registerServiceEventTargets(service, targets) {
					var _this3 = this;

					_.each(targets, function (target) {

						if (_this3.serviceEventTargets[target.toLowerCase()]) {
							throw new Error('Provided event target is registered already: ' + target.toLowerCase());
						}

						_this3.serviceEventTargets[target.toLowerCase()] = service;
					});
				};

				ClientContext.prototype.unregisterServiceEventTargets = function unregisterServiceEventTargets(targets) {
					var _this4 = this;

					_.each(targets, function (target) {

						delete _this4.serviceEventTargets[target.toLowerCase()];
					});
				};

				ClientContext.prototype.emitServiceEvent = function emitServiceEvent(event, target, type, data) {

					if (event) {
						target = event.target || target;
						type = event.type || type;
						data = event.data || data;
					}

					target = target.toLowerCase();
					var service = this.serviceEventTargets[target];
					service.emit(type, data);
				};

				return ClientContext;
			})();

			_export('ClientContext', ClientContext);
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvY2xpZW50LWNvbnRleHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OzZDQU1hLGFBQWE7Ozs7Ozs7O21CQUxsQixJQUFJOztvQkFDSixJQUFJOztrQ0FDSixXQUFXOztzQ0FDWCxVQUFVOzs7QUFFTCxnQkFBYTtBQUVkLGFBRkMsYUFBYSxDQUViLE1BQU0sRUFBRSxXQUFXLEVBQUU7MkJBRnJCLGFBQWE7O0FBSXhCLFNBQUksSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7QUFDdEIsU0FBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2hDLFNBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDOztBQUVqQixTQUFJLFdBQVcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO0FBQzdCLGdCQUFXLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdkMsU0FBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7O0FBRS9CLFNBQUcsTUFBTSxDQUFDLFlBQVksRUFBRTtBQUN2QixVQUFJLFlBQVksR0FBRyxXQUFXLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ3JELGtCQUFZLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDeEMsVUFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7TUFDakM7O0FBRUQsU0FBSSxDQUFDLFFBQVEsR0FBRztBQUNmLFdBQUssRUFBRSxJQUFJLENBQUMsWUFBWTtBQUN4QixVQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVc7TUFDdEIsQ0FBQzs7QUFFRixTQUFJLENBQUMsbUJBQW1CLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFL0MsU0FBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7O0FBRTFDLFNBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0tBR3JCOztBQTlC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QSxvQ0FBRzs7QUFFMUIsWUFBTztBQUVOLG1CQUFhLEVBQUUsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDO0FBQ2hDLGFBQU8sRUFBRSxJQUFJO01BQ2IsQ0FBQTtLQUVEOztBQXRKVyxpQkFBYSxXQXdKekIsa0JBQWtCLEdBQUEsNEJBQUMsT0FBTyxFQUFFOztBQUUzQixZQUFPLENBQUMsT0FBTyxJQUFLLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQSxBQUFDLEFBQUMsQ0FBQztLQUV4Rjs7QUE1SlcsaUJBQWEsV0E4SnpCLDJCQUEyQixHQUFBLHFDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUU7OztBQUU3QyxNQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxVQUFDLE1BQU0sRUFBSzs7QUFFM0IsVUFBRyxPQUFLLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxFQUFDO0FBQ2pELGFBQU0sSUFBSSxLQUFLLENBQUMsK0NBQStDLEdBQUcsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7T0FDeEY7O0FBRUQsYUFBSyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUM7TUFFekQsQ0FBQyxDQUFDO0tBRUg7O0FBMUtXLGlCQUFhLFdBNEt6Qiw2QkFBNkIsR0FBQSx1Q0FBQyxPQUFPLEVBQUU7OztBQUV0QyxNQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxVQUFDLE1BQU0sRUFBSzs7QUFFM0IsYUFBTyxPQUFLLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO01BRXRELENBQUMsQ0FBQztLQUVIOztBQXBMVyxpQkFBYSxXQXNMekIsZ0JBQWdCLEdBQUEsMEJBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFOztBQUUzQyxTQUFHLEtBQUssRUFBRTtBQUNULFlBQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQztBQUNoQyxVQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUM7QUFDMUIsVUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDO01BQzFCOztBQUVELFdBQU0sR0FBRyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDOUIsU0FBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQy9DLFlBQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0tBRXpCOztXQWxNVyxhQUFhOzs7NEJBQWIsYUFBYSIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L2NsaWVudC1jb250ZXh0LmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==