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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvY2xpZW50LWNvbnRleHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OzBEQW1CYSxhQUFhOzs7Ozs7OzttQkFQbEIsSUFBSTs7b0JBQ0osSUFBSTs7a0NBQ0osV0FBVzs7c0NBQ1gsVUFBVTs7eUJBQ1YsT0FBTzs7Ozs7QUFHRixnQkFBYTtBQUVkLGFBRkMsYUFBYSxDQUViLE1BQU0sRUFBRSxXQUFXLEVBQUU7MkJBRnJCLGFBQWE7O0FBSXhCLFdBQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7QUFFbEMsU0FBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztBQUN0QixTQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDaEMsU0FBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7O0FBRWpCLFNBQUksV0FBVyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7QUFDN0IsZ0JBQVcsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN2QyxTQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQzs7QUFFL0IsU0FBRyxNQUFNLENBQUMsWUFBWSxFQUFFO0FBQ3ZCLFVBQUksWUFBWSxHQUFHLFdBQVcsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDckQsa0JBQVksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN4QyxVQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztNQUNqQzs7QUFFRCxTQUFJLENBQUMsUUFBUSxHQUFHO0FBQ2YsV0FBSyxFQUFFLElBQUksQ0FBQyxZQUFZO0FBQ3hCLFVBQUksRUFBRSxJQUFJLENBQUMsV0FBVztNQUN0QixDQUFDOztBQUVGLFNBQUksQ0FBQyxtQkFBbUIsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDOztBQUUvQyxTQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7QUFFMUMsU0FBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7S0FHckI7O0FBaENXLGlCQUFhLFdBa0N6QixJQUFJLEdBQUEsZ0JBQUc7OztBQUdOLFlBQU8sSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFJOztBQUV6QyxVQUFHLENBQUMsTUFBSyxNQUFNLENBQUMsWUFBWSxFQUFFO0FBQzdCLGNBQU8sSUFBSSxDQUFDO09BQ1o7O0FBRUQsYUFBTyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFLLFFBQVEsQ0FBQyxFQUFFLFVBQUMsT0FBTyxFQUFLO0FBQzlELGNBQU8sT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO09BQ3RCLENBQUMsQ0FBQyxDQUFDO01BRUosQ0FBQyxDQUFDO0tBRUg7O0FBakRXLGlCQUFhLFdBbUR6QixjQUFjLEdBQUEsd0JBQUMsU0FBUyxFQUFFOztBQUV6QixTQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ25DLFNBQUksWUFBWSxZQUFBLENBQUM7QUFDakIsU0FBSSxPQUFPLFlBQUEsQ0FBQztBQUNaLFNBQUksR0FBRyxZQUFBLENBQUM7QUFDUixVQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTs7QUFFMUMsa0JBQVksR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDNUIsYUFBTyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7QUFDN0IsYUFBTyxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ25DLFNBQUcsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDdkIsY0FBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQztBQUN4QixVQUFJLENBQUMsMkJBQTJCLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDO01BQ3JFOztBQUVELFNBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0tBRXpCOztBQXJFVyxpQkFBYSxXQXVFekIsVUFBVSxHQUFBLG9CQUFDLEdBQUcsRUFBRTtBQUNmLFlBQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztLQUN4Qzs7QUF6RVcsaUJBQWEsV0EyRXpCLGFBQWEsR0FBQSx1QkFBQyxRQUFRLEVBQUU7O0FBRXZCLFNBQUksVUFBVSxHQUFHLFVBQVUsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDdEQsZUFBVSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RDLFNBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDO0FBQ2hELFNBQUksQ0FBQywyQkFBMkIsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUM7QUFDM0UsWUFBTyxVQUFVLENBQUM7S0FDbEI7O0FBbEZXLGlCQUFhLFdBb0Z6QixnQkFBZ0IsR0FBQSwwQkFBQyxHQUFHLEVBQUU7O0FBRXJCLFNBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7O0FBRXBDLFNBQUcsVUFBVSxJQUFJLFVBQVUsQ0FBQyxLQUFLLEVBQUM7O0FBRWpDLFVBQUksQ0FBQyw2QkFBNkIsQ0FBQyxVQUFVLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQztBQUNqRSxhQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7TUFFMUIsTUFBTTtBQUNOLFlBQU0sSUFBSSxLQUFLLENBQUMscUJBQXFCLEdBQUcsR0FBRyxDQUFDLENBQUM7TUFDN0M7S0FFRDs7QUFqR1csaUJBQWEsV0FtR3pCLGNBQWMsR0FBQSx3QkFBQyxXQUFXLEVBQUU7QUFDM0IsU0FBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0tBQ25EOztBQXJHVyxpQkFBYSxXQXVHekIsY0FBYyxHQUFBLDBCQUFHO0FBQ2hCLFlBQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztLQUN4Qjs7QUF6R1csaUJBQWEsV0EyR3pCLFNBQVMsR0FBQSxxQkFBRztBQUNYLFlBQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztLQUNuQjs7QUE3R1csaUJBQWEsV0ErR3pCLE9BQU8sR0FBQSxtQkFBRztBQUNULFlBQU8sSUFBSSxDQUFDLElBQUksQ0FBQztLQUNqQjs7QUFqSFcsaUJBQWEsV0FtSHpCLFVBQVUsR0FBQSxvQkFBQyxhQUFhLEVBQUU7OztBQUV6QixTQUFJLEVBQUUsR0FBRyxJQUFJLENBQUM7QUFDZCxNQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRSxVQUFDLElBQUksRUFBRztBQUNsRCxVQUFHLE9BQUssZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDL0IsU0FBRSxHQUFHLE9BQUssZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUM7T0FDakM7TUFDRCxDQUFDLENBQUM7QUFDSCxTQUFHLENBQUMsRUFBRSxFQUFDO0FBRU4sWUFBTSxJQUFJLEtBQUssQ0FBQyxtRUFBbUUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7TUFDckg7QUFDRCxZQUFPLEVBQUUsQ0FBQztLQUNWOztBQWhJVyxpQkFBYSxXQWtJekIsZ0JBQWdCLEdBQUEsMEJBQUMsSUFBSSxFQUFFOztBQUV0QixZQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7S0FFM0I7O0FBdElXLGlCQUFhLFdBd0l6QixjQUFjLEdBQUEsMEJBQUc7QUFDaEIsWUFBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0tBQ3hCOztBQTFJVyxpQkFBYSxXQTRJekIsZUFBZSxHQUFBLDJCQUFHO0FBQ2pCLFlBQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztLQUN6Qjs7QUE5SVcsaUJBQWEsV0FnSnpCLHdCQUF3QixHQUFBLG9DQUFHOztBQUUxQixZQUFPO0FBRU4sbUJBQWEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQztBQUM1QyxhQUFPLEVBQUUsSUFBSTtNQUNiLENBQUE7S0FFRDs7QUF4SlcsaUJBQWEsV0EwSnpCLGtCQUFrQixHQUFBLDRCQUFDLE9BQU8sRUFBRTs7QUFFM0IsWUFBTyxDQUFDLE9BQU8sSUFBSyxPQUFPLEtBQUssQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUEsQUFBQyxBQUFDLENBQUM7S0FFeEY7O0FBOUpXLGlCQUFhLFdBZ0t6QiwyQkFBMkIsR0FBQSxxQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFOzs7QUFFN0MsTUFBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBQyxNQUFNLEVBQUs7O0FBRTNCLFVBQUcsT0FBSyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBQztBQUNqRCxhQUFNLElBQUksS0FBSyxDQUFDLCtDQUErQyxHQUFHLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO09BQ3hGOztBQUVELGFBQUssbUJBQW1CLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDO01BRXpELENBQUMsQ0FBQztLQUVIOztBQTVLVyxpQkFBYSxXQThLekIsNkJBQTZCLEdBQUEsdUNBQUMsT0FBTyxFQUFFOzs7QUFFdEMsTUFBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBQyxNQUFNLEVBQUs7O0FBRTNCLGFBQU8sT0FBSyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztNQUV0RCxDQUFDLENBQUM7S0FFSDs7QUF0TFcsaUJBQWEsV0F3THpCLGdCQUFnQixHQUFBLDBCQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRTs7QUFFM0MsU0FBRyxLQUFLLEVBQUU7QUFDVCxZQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUM7QUFDaEMsVUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDO0FBQzFCLFVBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQztNQUMxQjs7QUFFRCxXQUFNLEdBQUcsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQzlCLFNBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMvQyxZQUFPLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztLQUV6Qjs7V0FwTVcsYUFBYTs7OzRCQUFiLGFBQWEiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9jbGllbnQtY29udGV4dC5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=