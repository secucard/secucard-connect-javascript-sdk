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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvY2xpZW50LWNvbnRleHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OzZFQW1CYSxhQUFhOzs7Ozs7NEJBUmxCLElBQUk7OzZCQUNKLElBQUk7OzJDQUNKLFdBQVc7OytDQUNYLFVBQVU7O2tDQUNWLE9BQU87Ozs7a0RBRVAsaUJBQWlCOzs7QUFFWix5QkFBYTtBQUVYLHlCQUZGLGFBQWEsQ0FFVixNQUFNLEVBQUUsV0FBVyxFQUFFOzBDQUZ4QixhQUFhOztBQUdsQiwwQkFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDOztBQUVsQyx3QkFBSSxDQUFDLGtCQUFrQixHQUFHLFdBQVcsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDOztBQUUxRCx3QkFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztBQUN0Qix3QkFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2hDLHdCQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQzs7QUFFakIsd0JBQUksV0FBVyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7QUFDN0IsK0JBQVcsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN2Qyx3QkFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7O0FBRS9CLHdCQUFJLE1BQU0sQ0FBQyxZQUFZLEVBQUU7QUFDckIsNEJBQUksWUFBWSxHQUFHLFdBQVcsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDckQsb0NBQVksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN4Qyw0QkFBSSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7cUJBQ3BDOztBQUVELHdCQUFJLENBQUMsUUFBUSxHQUFHO0FBQ1osNkJBQUssRUFBRSxJQUFJLENBQUMsWUFBWTtBQUN4Qiw0QkFBSSxFQUFFLElBQUksQ0FBQyxXQUFXO3FCQUN6QixDQUFD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RUFBRTtBQUNoRCxrQ0FBTSxJQUFJLEtBQUssQ0FBQywrQ0FBK0MsR0FBRyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQzt5QkFDM0Y7O0FBRUQsK0JBQUssbUJBQW1CLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDO3FCQUM1RCxDQUFDLENBQUE7aUJBQ0w7O0FBL0tRLDZCQUFhLFdBaUx0Qiw2QkFBNkIsR0FBQSx1Q0FBQyxPQUFPLEVBQUU7OztBQUNuQywyQkFBTyxDQUFDLEdBQUcsQ0FBQyxVQUFBLE1BQU0sRUFBSTtBQUNsQiwrQkFBTyxPQUFLLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO3FCQUN6RCxDQUFDLENBQUM7aUJBQ047O0FBckxRLDZCQUFhLFdBdUx0QixnQkFBZ0IsR0FBQSwwQkFBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUU7QUFDeEMsd0JBQUksS0FBSyxFQUFFO0FBQ1AsOEJBQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQztBQUNoQyw0QkFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDO0FBQzFCLDRCQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUM7cUJBQzdCOztBQUVELDBCQUFNLEdBQUcsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQzlCLHdCQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDL0MsMkJBQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO2lCQUM1Qjs7dUJBak1RLGFBQWEiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9jbGllbnQtY29udGV4dC5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=
