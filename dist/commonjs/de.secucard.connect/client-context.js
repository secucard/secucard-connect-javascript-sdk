'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _netRest = require('./net/rest');

var _authAuth = require('./auth/auth');

var _authCredentials = require('./auth/credentials');

var _productAppAppService = require('./product/app/app-service');

var _netChannel = require('./net/channel');

var _eventemitter3 = require('eventemitter3');

var _eventemitter32 = _interopRequireDefault(_eventemitter3);

var _authTokenStorage = require('./auth/token-storage');

var ClientContext = (function () {
    function ClientContext(config, environment) {
        _classCallCheck(this, ClientContext);

        Object.assign(this, _eventemitter32['default'].prototype);

        this.tokenStorageCreate = environment.TokenStorage.create;

        var auth = new _authAuth.Auth();
        auth.configureWithContext(this);
        this.auth = auth;

        var restChannel = new _netRest.Rest();
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

            return Promise.all(_lodash2['default'].map(_lodash2['default'].values(_this.channels), function (channel) {
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
        var appService = _productAppAppService.AppService.createWithMixin(AppMixin);
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
        this.credentials = _authCredentials.Credentials.create(credentials);
        if (TokenStorageMixin) {
            this.tokenStorage = _authTokenStorage.TokenStorageInMem.createWithMixin(TokenStorageMixin);
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
            return token ? !isRaw ? _lodash2['default'].pickBy(token, ['access_token', 'expireTime', 'scope', 'expires_in']) : token : null;
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
        _lodash2['default'].each(_lodash2['default'](channelConfig).reverse().value(), function (type) {
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
            channelConfig: [_netChannel.Channel.STOMP, _netChannel.Channel.REST],
            useAuth: true
        };
    };

    ClientContext.prototype.isRequestWithToken = function isRequestWithToken(options) {
        return !options || options && (!options.hasOwnProperty('useAuth') || options.useAuth);
    };

    ClientContext.prototype.registerServiceEventTargets = function registerServiceEventTargets(service, targets) {
        var _this3 = this;

        _lodash2['default'].each(targets, function (target) {
            if (_this3.serviceEventTargets[target.toLowerCase()]) {
                throw new Error('Provided event target is registered already: ' + target.toLowerCase());
            }

            _this3.serviceEventTargets[target.toLowerCase()] = service;
        });
    };

    ClientContext.prototype.unregisterServiceEventTargets = function unregisterServiceEventTargets(targets) {
        var _this4 = this;

        _lodash2['default'].each(targets, function (target) {
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

exports.ClientContext = ClientContext;