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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvY2xpZW50LWNvbnRleHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OzBEQVFhLGFBQWE7Ozs7Ozs7O21CQVBsQixJQUFJOztvQkFDSixJQUFJOztrQ0FDSixXQUFXOztzQ0FDWCxVQUFVOzt5QkFDVixPQUFPOzs7OztBQUdGLGdCQUFhO0FBRWQsYUFGQyxhQUFhLENBRWIsTUFBTSxFQUFFLFdBQVcsRUFBRTsyQkFGckIsYUFBYTs7QUFJeEIsV0FBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDOztBQUVsQyxTQUFJLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO0FBQ3RCLFNBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNoQyxTQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQzs7QUFFakIsU0FBSSxXQUFXLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztBQUM3QixnQkFBVyxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3ZDLFNBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDOztBQUUvQixTQUFHLE1BQU0sQ0FBQyxZQUFZLEVBQUU7QUFDdkIsVUFBSSxZQUFZLEdBQUcsV0FBVyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUNyRCxrQkFBWSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3hDLFVBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO01BQ2pDOztBQUVELFNBQUksQ0FBQyxRQUFRLEdBQUc7QUFDZixXQUFLLEVBQUUsSUFBSSxDQUFDLFlBQVk7QUFDeEIsVUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXO01BQ3RCLENBQUM7O0FBRUYsU0FBSSxDQUFDLG1CQUFtQixHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7O0FBRS9DLFNBQUksQ0FBQyxjQUFjLENB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MEJBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFOztBQUUzQyxTQUFHLEtBQUssRUFBRTtBQUNULFlBQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQztBQUNoQyxVQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUM7QUFDMUIsVUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDO01BQzFCOztBQUVELFdBQU0sR0FBRyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDOUIsU0FBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQy9DLFlBQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0tBRXpCOztXQXBNVyxhQUFhOzs7NEJBQWIsYUFBYSIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L2NsaWVudC1jb250ZXh0LmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==