System.register(['./net/rest', './auth/auth', './auth/credentials', './product/app/app-service', './net/channel', 'eventemitter3', './auth/token-storage'], function (_export) {
    'use strict';

    var Rest, Auth, Credentials, AppService, Channel, EE, TokenStorageInMem, ClientContext;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    return {
        setters: [function (_netRest) {
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
        }, function (_authTokenStorage) {
            TokenStorageInMem = _authTokenStorage.TokenStorageInMem;
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

                        var channelValues = Object.values(_this.channels);
                        return Promise.all(channelValues.map(function (channel) {
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

                ClientContext.prototype.setCredentials = function setCredentials(credentials, TokenStorageMixin) {
                    this.credentials = Credentials.create(credentials);
                    if (TokenStorageMixin) {
                        this.tokenStorage = TokenStorageInMem.createWithMixin(TokenStorageMixin);
                    } else {
                        this.tokenStorage = this.tokenStorageCreate();
                    }
                    this.tokenStorage.getRetrieveToken = this.config.getRetrieveToken.bind(this.config);

                    return this.tokenStorage.setCredentials(Object.assign({}, credentials));
                };

                ClientContext.prototype.setLanguage = function setLanguage(lang) {
                    this.config.setLanguage(lang);
                };

                ClientContext.prototype.getCredentials = function getCredentials() {
                    return this.credentials;
                };

                ClientContext.prototype.getTokenStorage = function getTokenStorage() {
                    return this.tokenStorage;
                };

                ClientContext.prototype.getStoredToken = function getStoredToken() {
                    return this.tokenStorage ? this.tokenStorage.getStoredToken() : Promise.resolve(null);
                };

                ClientContext.prototype.exportToken = function exportToken(isRaw) {
                    return this.getAuth().getToken().then(function (token) {
                        var access_token = token.access_token;
                        var expireTime = token.expireTime;
                        var scope = token.scope;
                        var expires_in = token.expires_in;

                        return token ? !isRaw ? { access_token: access_token, expireTime: expireTime, scope: scope, expires_in: expires_in } : token : null;
                    });
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
                    var channelConfReverted = channelConfig.reverse();
                    channelConfReverted.map(function (type) {
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

                    targets.map(function (target) {
                        if (_this3.serviceEventTargets[target.toLowerCase()]) {
                            throw new Error('Provided event target is registered already: ' + target.toLowerCase());
                        }

                        _this3.serviceEventTargets[target.toLowerCase()] = service;
                    });
                };

                ClientContext.prototype.unregisterServiceEventTargets = function unregisterServiceEventTargets(targets) {
                    var _this4 = this;

                    targets.map(function (target) {
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvY2xpZW50LWNvbnRleHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OzZFQW1CYSxhQUFhOzs7Ozs7NEJBUmxCLElBQUk7OzZCQUNKLElBQUk7OzJDQUNKLFdBQVc7OytDQUNYLFVBQVU7O2tDQUNWLE9BQU87Ozs7a0RBRVAsaUJBQWlCOzs7QUFFWix5QkFBYTtBQUVYLHlCQUZGLGFBQWEsQ0FFVixNQUFNLEVBQUUsV0FBVyxFQUFFOzBDQUZ4QixhQUFhOztBQUdsQiwwQkFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDOztBQUVsQyx3QkFBSSxDQUFDLGtCQUFrQixHQUFHLFdBQVcsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDOztBQUUxRCx3QkFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztBQUN0Qix3QkFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2hDLHdCQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQzs7QUFFakIsd0JBQUksV0FBVyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7QUFDN0IsK0JBQVcsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN2Qyx3QkFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7O0FBRS9CLHdCQUFJLE1BQU0sQ0FBQyxZQUFZLEVBQUU7QUFDckIsNEJBQUksWUFBWSxHQUFHLFdBQVcsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDckQsb0NBQVksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN4Qyw0QkFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7cUJBQ3BDOztBQUVELHdCQUFJLENBQUMsUUFBUSxHQUFHO0FBQ1osNkJBQUssRUFBRSxJQUFJLENBQUMsWUFBWTtBQUN4Qiw0QkFBSSxFQUFFLElBQUksQ0FBQyxXQUFXO3FCQUN6QixDQUFD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LEVBQUU7QUFDaEQsa0NBQU0sSUFBSSxLQUFLLENBQUMsK0NBQStDLEdBQUcsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7eUJBQzNGOztBQUVELCtCQUFLLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQztxQkFDNUQsQ0FBQyxDQUFBO2lCQUNMOztBQWpMUSw2QkFBYSxXQW1MdEIsNkJBQTZCLEdBQUEsdUNBQUMsT0FBTyxFQUFFOzs7QUFDbkMsMkJBQU8sQ0FBQyxHQUFHLENBQUMsVUFBQSxNQUFNLEVBQUk7QUFDbEIsK0JBQU8sT0FBSyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztxQkFDekQsQ0FBQyxDQUFDO2lCQUNOOztBQXZMUSw2QkFBYSxXQXlMdEIsZ0JBQWdCLEdBQUEsMEJBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFO0FBQ3hDLHdCQUFJLEtBQUssRUFBRTtBQUNQLDhCQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUM7QUFDaEMsNEJBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQztBQUMxQiw0QkFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDO3FCQUM3Qjs7QUFFRCwwQkFBTSxHQUFHLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUM5Qix3QkFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQy9DLDJCQUFPLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztpQkFDNUI7O3VCQW5NUSxhQUFhIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvY2xpZW50LWNvbnRleHQuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9
