System.register(['lodash', './net/rest', './auth/auth', './auth/credentials', './product/app/app-service', './net/channel', 'eventemitter3'], function (_export) {
	'use strict';

	var _, Rest, Auth, Credentials, AppService, Channel, EE, ClientContext;

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
		}, function (_netChannel) {
			Channel = _netChannel.Channel;
		}, function (_eventemitter3) {
			EE = _eventemitter3['default'];
		}],
		execute: function () {
			ClientContext = (function () {
				function ClientContext(config, environment) {
					_classCallCheck(this, ClientContext);

					Object.assign(this, EE.prototype);

					this.tokenStorageCreate = environment.TokenStorage.create;

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

				ClientContext.prototype.setCredentials = function setCredentials(credentials, TokenStorage) {

					this.credentials = Credentials.create(credentials);
					if (TokenStorage) {
						this.tokenStorage = new TokenStorage(Object.assign({}, credentials));
					} else {
						this.tokenStorage = this.tokenStorageCreate(Object.assign({}, credentials));
					}
				};

				ClientContext.prototype.getCredentials = function getCredentials() {
					return this.credentials;
				};

				ClientContext.prototype.getTokenStorage = function getTokenStorage() {
					return this.tokenStorage;
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
						channelConfig: [Channel.STOMP, Channel.REST],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvY2xpZW50LWNvbnRleHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OzBEQW1CYSxhQUFhOzs7Ozs7OzttQkFQbEIsSUFBSTs7b0JBQ0osSUFBSTs7a0NBQ0osV0FBVzs7c0NBQ1gsVUFBVTs7eUJBQ1YsT0FBTzs7Ozs7QUFHRixnQkFBYTtBQUVkLGFBRkMsYUFBYSxDQUViLE1BQU0sRUFBRSxXQUFXLEVBQUU7MkJBRnJCLGFBQWE7O0FBSXhCLFdBQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7QUFFbEMsU0FBSSxDQUFDLGtCQUFrQixHQUFHLFdBQVcsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDOztBQUUxRCxTQUFJLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO0FBQ3RCLFNBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNoQyxTQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQzs7QUFFakIsU0FBSSxXQUFXLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztBQUM3QixnQkFBVyxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3ZDLFNBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDOztBQUUvQixTQUFHLE1BQU0sQ0FBQyxZQUFZLEVBQUU7QUFDdkIsVUFBSSxZQUFZLEdBQUcsV0FBVyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUNyRCxrQkFBWSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3hDLFVBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO01BQ2pDOztBQUVELFNBQUksQ0FBQyxRQUFRLEdBQUc7QUFDZixXQUFLLEVBQUUsSUFBSSxDQUFDLFlBQVk7QUFDeEIsVUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXO01BQ3RCLENBQUM7O0FBRUYsU0FBSSxDQUFDLG1CQUFtQixHQUFH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akQsYUFBTSxJQUFJLEtBQUssQ0FBQywrQ0FBK0MsR0FBRyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztPQUN4Rjs7QUFFRCxhQUFLLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQztNQUV6RCxDQUFDLENBQUM7S0FFSDs7QUF6TFcsaUJBQWEsV0EyTHpCLDZCQUE2QixHQUFBLHVDQUFDLE9BQU8sRUFBRTs7O0FBRXRDLE1BQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQUMsTUFBTSxFQUFLOztBQUUzQixhQUFPLE9BQUssbUJBQW1CLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7TUFFdEQsQ0FBQyxDQUFDO0tBRUg7O0FBbk1XLGlCQUFhLFdBcU16QixnQkFBZ0IsR0FBQSwwQkFBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUU7O0FBRTNDLFNBQUcsS0FBSyxFQUFFO0FBQ1QsWUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDO0FBQ2hDLFVBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQztBQUMxQixVQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUM7TUFDMUI7O0FBRUQsV0FBTSxHQUFHLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUM5QixTQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDL0MsWUFBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7S0FFekI7O1dBak5XLGFBQWE7Ozs0QkFBYixhQUFhIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvY2xpZW50LWNvbnRleHQuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9