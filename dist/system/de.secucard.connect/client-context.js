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

                    return this.tokenStorage.setCredentials(Object.assign({}, credentials));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvY2xpZW50LWNvbnRleHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2dGQW9CYSxhQUFhOzs7Ozs7Ozs0QkFSbEIsSUFBSTs7NkJBQ0osSUFBSTs7MkNBQ0osV0FBVzs7K0NBQ1gsVUFBVTs7a0NBQ1YsT0FBTzs7OztrREFFUCxpQkFBaUI7OztBQUVaLHlCQUFhO0FBRVgseUJBRkYsYUFBYSxDQUVWLE1BQU0sRUFBRSxXQUFXLEVBQUU7MENBRnhCLGFBQWE7O0FBSWxCLDBCQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7O0FBRWxDLHdCQUFJLENBQUMsa0JBQWtCLEdBQUcsV0FBVyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUM7O0FBRTFELHdCQUFJLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO0FBQ3RCLHdCQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDaEMsd0JBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDOztBQUVqQix3QkFBSSxXQUFXLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztBQUM3QiwrQkFBVyxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3ZDLHdCQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQzs7QUFFL0Isd0JBQUksTUFBTSxDQUFDLFlBQVksRUFBRTtBQUNyQiw0QkFBSSxZQUFZLEdBQUcsV0FBVyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUNyRCxvQ0FBWSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3hDLDRCQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztxQkFDcEM7O0FBRUQsd0JBQUksQ0FBQyxRQUFRLEdBQUc7QUFDWiw2QkFBSyxFQUFFLElBQUksQ0FBQyxZQUFZO0FBQ3hCLDRCQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVc7cUJBQ3pCLENB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QUMsT0FBTyxJQUFLLE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQSxBQUFDLEFBQUMsQ0FBQztpQkFFM0Y7O0FBakxRLDZCQUFhLFdBbUx0QiwyQkFBMkIsR0FBQSxxQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFOzs7QUFFMUMscUJBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQUMsTUFBTSxFQUFLOztBQUV4Qiw0QkFBSSxPQUFLLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxFQUFFO0FBQ2hELGtDQUFNLElBQUksS0FBSyxDQUFDLCtDQUErQyxHQUFHLE1BQU0sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO3lCQUMzRjs7QUFFRCwrQkFBSyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUM7cUJBRTVELENBQUMsQ0FBQztpQkFFTjs7QUEvTFEsNkJBQWEsV0FpTXRCLDZCQUE2QixHQUFBLHVDQUFDLE9BQU8sRUFBRTs7O0FBRW5DLHFCQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxVQUFDLE1BQU0sRUFBSzs7QUFFeEIsK0JBQU8sT0FBSyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztxQkFFekQsQ0FBQyxDQUFDO2lCQUVOOztBQXpNUSw2QkFBYSxXQTJNdEIsZ0JBQWdCLEdBQUEsMEJBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFOztBQUV4Qyx3QkFBSSxLQUFLLEVBQUU7QUFDUCw4QkFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDO0FBQ2hDLDRCQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUM7QUFDMUIsNEJBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQztxQkFDN0I7O0FBRUQsMEJBQU0sR0FBRyxNQUFNLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDOUIsd0JBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMvQywyQkFBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7aUJBRTVCOzt1QkF2TlEsYUFBYTs7O3FDQUFiLGFBQWEiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9jbGllbnQtY29udGV4dC5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=