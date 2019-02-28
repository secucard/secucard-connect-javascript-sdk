System.register(['lodash', './net/rest', './auth/auth', './auth/credentials', './product/app/app-service', './net/channel', 'eventemitter3', './auth/token-storage'], function (_export) {
    'use strict';

    var _, Rest, Auth, Credentials, AppService, Channel, EE, TokenStorageInMem, ClientContext;

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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvY2xpZW50LWNvbnRleHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2dGQW9CYSxhQUFhOzs7Ozs7Ozs0QkFSbEIsSUFBSTs7NkJBQ0osSUFBSTs7MkNBQ0osV0FBVzs7K0NBQ1gsVUFBVTs7a0NBQ1YsT0FBTzs7OztrREFFUCxpQkFBaUI7OztBQUVaLHlCQUFhO0FBRVgseUJBRkYsYUFBYSxDQUVWLE1BQU0sRUFBRSxXQUFXLEVBQUU7MENBRnhCLGFBQWE7O0FBR2xCLDBCQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7O0FBRWxDLHdCQUFJLENBQUMsa0JBQWtCLEdBQUcsV0FBVyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUM7O0FBRTFELHdCQUFJLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO0FBQ3RCLHdCQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDaEMsd0JBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDOztBQUVqQix3QkFBSSxXQUFXLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztBQUM3QiwrQkFBVyxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3ZDLHdCQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQzs7QUFFL0Isd0JBQUksTUFBTSxDQUFDLFlBQVksRUFBRTtBQUNyQiw0QkFBSSxZQUFZLEdBQUcsV0FBVyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUNyRCxvQ0FBWSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3hDLDRCQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztxQkFDcEM7O0FBRUQsd0JBQUksQ0FBQyxRQUFRLEdBQUc7QUFDWiw2QkFBSyxFQUFFLElBQUksQ0FBQyxZQUFZO0FBQ3hCLDRCQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVc7cUJBQ3pCLENB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QUksS0FBSyxDQUFDLCtDQUErQyxHQUFHLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO3lCQUMzRjs7QUFFRCwrQkFBSyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUM7cUJBQzVELENBQUMsQ0FBQTtpQkFDTDs7QUEvS1EsNkJBQWEsV0FpTHRCLDZCQUE2QixHQUFBLHVDQUFDLE9BQU8sRUFBRTs7O0FBQ25DLDJCQUFPLENBQUMsR0FBRyxDQUFDLFVBQUEsTUFBTSxFQUFJO0FBQ2xCLCtCQUFPLE9BQUssbUJBQW1CLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUM7cUJBQ3pELENBQUMsQ0FBQztpQkFDTjs7QUFyTFEsNkJBQWEsV0F1THRCLGdCQUFnQixHQUFBLDBCQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRTtBQUN4Qyx3QkFBSSxLQUFLLEVBQUU7QUFDUCw4QkFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDO0FBQ2hDLDRCQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUM7QUFDMUIsNEJBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQztxQkFDN0I7O0FBRUQsMEJBQU0sR0FBRyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDOUIsd0JBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMvQywyQkFBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7aUJBQzVCOzt1QkFqTVEsYUFBYSIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L2NsaWVudC1jb250ZXh0LmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==
