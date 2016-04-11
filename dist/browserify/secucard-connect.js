(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.secucardConnect = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _es6Shim = require('es6-shim');

var _es6Shim2 = _interopRequireDefault(_es6Shim);

var _deSecucardConnectClientBrowserEnvironment = require('./de.secucard.connect/client-browser-environment');

var _deSecucardConnectClient = require('./de.secucard.connect/client');

var _minilog = require('minilog');

var _minilog2 = _interopRequireDefault(_minilog);

exports.Services = _deSecucardConnectClientBrowserEnvironment.ServiceMap;

var _deSecucardConnectNetChannel = require('./de.secucard.connect/net/channel');

exports.Channel = _deSecucardConnectNetChannel.Channel;
var MiniLog = _minilog2['default'];
exports.MiniLog = MiniLog;
_minilog2['default'].suggest.deny(/secucard\..*/, 'warn');

var SecucardConnect = {
    description: 'SecucardConnect for browser'
};

exports.SecucardConnect = SecucardConnect;
SecucardConnect.create = function (config) {

    return _deSecucardConnectClient.Client.create(config, _deSecucardConnectClientBrowserEnvironment.ClientBrowserEnvironment);
};
},{"./de.secucard.connect/client":11,"./de.secucard.connect/client-browser-environment":7,"./de.secucard.connect/net/channel":12,"es6-shim":74,"minilog":85}],2:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _netMessage = require('../net/message');

var _token2 = require('./token');

var _exception = require('./exception');

var _minilog = require('minilog');

var _minilog2 = _interopRequireDefault(_minilog);

var Auth = (function () {
    function Auth() {
        _classCallCheck(this, Auth);

        this.baseCredentialNames = ['client_id', 'client_secret'];
        this.baseHeaders = { 'Content-Type': 'application/x-www-form-urlencoded' };
    }

    Auth.prototype.configureWithContext = function configureWithContext(context) {

        this.emit = context.emit.bind(context);

        this.getChannel = context.getRestChannel.bind(context);
        this.getCredentials = context.getCredentials.bind(context);
        this.getTokenStorage = context.getTokenStorage.bind(context);

        this.oAuthUrl = function () {

            return context.getConfig().getOAuthUrl();
        };

        this.getDeviceUUID = function () {
            return context.getConfig().getDeviceUUID();
        };
    };

    Auth.prototype.getToken = function getToken(extend) {
        var _this = this;

        return this.getStoredToken().then(function (token) {

            if (token != null && !token.isExpired()) {
                if (extend) {
                    token.setExpireTime();
                    _this.storeToken(token);
                }

                return Promise.resolve(token);
            }

            var cr = _this.getCredentials();
            var ch = _this.getChannel();

            if (!cr.isValid()) {

                if (token != null && token.isExpired()) {
                    _minilog2['default']('secucard.auth').error('Token is expired');
                    throw new _exception.AuthenticationFailedException('Token is expired');
                } else {
                    _minilog2['default']('secucard.auth').error('Credentials error');
                    throw new _exception.AuthenticationFailedException('Credentials error');
                }
            }

            var tokenSuccess = function tokenSuccess(res) {

                var _token = token ? token.update(res.body) : _token2.Token.create(res.body);
                _token.setExpireTime();
                _this.storeToken(_token);
                return _token;
            };

            var tokenError = function tokenError(err) {
                _this.removeToken();

                var error = undefined;
                if (err instanceof _exception.AuthenticationTimeoutException) {
                    error = err;
                } else {
                    error = Object.assign(new _exception.AuthenticationFailedException(), err.response.body);
                }

                throw error;
            };

            var req = undefined;

            if (token != null && token.getRefreshToken() != null) {

                req = _this._tokenRefreshRequest(cr, token.getRefreshToken(), ch);
            } else {

                req = _this.isDeviceAuth() ? _this.getDeviceToken(Object.assign({}, cr, { uuid: _this.getDeviceUUID() }), ch) : _this._tokenClientCredentialsRequest(cr, ch);
            }

            return req.then(tokenSuccess)['catch'](tokenError);
        });
    };

    Auth.prototype.isDeviceAuth = function isDeviceAuth() {
        return Boolean(this.getDeviceUUID());
    };

    Auth.prototype.getDeviceToken = function getDeviceToken(credentials, channel) {
        var _this2 = this;

        return this._tokenDeviceCodeRequest(credentials, channel).then(function (res) {

            var data = res.body;
            _this2.emit('deviceCode', data);

            var pollIntervalSec = data.interval > 0 ? data.interval : 5;
            var pollExpireTime = parseInt(data.expires_in) * 1000 + new Date().getTime();
            var codeCredentials = Object.assign({}, credentials, { code: data.device_code });

            return new Promise(function (resolve, reject) {

                _this2.pollTimer = setInterval(function () {

                    if (new Date().getTime() < pollExpireTime) {

                        _this2._tokenDeviceRequest(codeCredentials, channel).then(function (res) {
                            clearInterval(_this2.pollTimer);
                            resolve(res);
                        })['catch'](function (err) {

                            if (err.status == 401) {} else {
                                    clearInterval(_this2.pollTimer);
                                    reject(err);
                                }
                        });
                    } else {
                        clearInterval(_this2.pollTimer);
                        reject(new _exception.AuthenticationTimeoutException());
                    }
                }, pollIntervalSec * 1000);
            });
        });
    };

    Auth.prototype.removeToken = function removeToken() {

        var storage = this.getTokenStorage();
        if (!storage) {
            var err = new _exception.AuthenticationFailedException('Credentials error');
            return Promise.reject(err);
        }
        storage.removeToken();
    };

    Auth.prototype.storeToken = function storeToken(token) {

        var storage = this.getTokenStorage();
        if (!storage) {
            var err = new _exception.AuthenticationFailedException('Credentials error');
            return Promise.reject(err);
        }
        storage.storeToken(token);
    };

    Auth.prototype.getStoredToken = function getStoredToken() {
        var storage = this.getTokenStorage();
        if (!storage) {
            var err = new _exception.AuthenticationFailedException('Credentials error');
            return Promise.reject(err);
        }
        return storage.getStoredToken().then(function (token) {

            if (token && !(token instanceof _token2.Token)) {
                return _token2.Token.create(token);
            }

            return token;
        });
    };

    Auth.prototype._tokenRequest = function _tokenRequest(credentials, channel) {
        var m = channel.createMessage().setBaseUrl(this.oAuthUrl()).setUrl('token').setHeaders(this.baseHeaders).setMethod(_netMessage.POST).setBody(credentials);
        _minilog2['default']('secucard.auth').debug('token request', m);
        return channel.send(m);
    };

    Auth.prototype._tokenClientCredentialsRequest = function _tokenClientCredentialsRequest(credentials, channel) {
        var cr = _lodash2['default'].pick(credentials, this.baseCredentialNames);
        cr = _lodash2['default'].assign({}, cr, { grant_type: 'client_credentials' });
        return this._tokenRequest(cr, channel);
    };

    Auth.prototype._tokenRefreshRequest = function _tokenRefreshRequest(credentials, refresh_token, channel) {
        var cr = _lodash2['default'].pick(credentials, this.baseCredentialNames);
        cr = _lodash2['default'].assign({}, cr, { grant_type: 'refresh_token', refresh_token: refresh_token });
        return this._tokenRequest(cr, channel);
    };

    Auth.prototype._tokenDeviceCodeRequest = function _tokenDeviceCodeRequest(credentials, channel) {
        var cr = _lodash2['default'].pick(credentials, this.baseCredentialNames.concat(['uuid']));
        cr = _lodash2['default'].assign({}, cr, { grant_type: 'device' });
        return this._tokenRequest(cr, channel);
    };

    Auth.prototype._tokenDeviceRequest = function _tokenDeviceRequest(credentials, channel) {
        var cr = _lodash2['default'].pick(credentials, this.baseCredentialNames.concat(['code']));
        cr = _lodash2['default'].assign({}, cr, { grant_type: 'device' });
        return this._tokenRequest(cr, channel);
    };

    Auth.prototype._tokenAppUserRequest = function _tokenAppUserRequest(credentials, channel) {
        var cr = _lodash2['default'].pick(credentials, this.baseCredentialNames.concat(['username', 'password', 'device', 'deviceinfo']));
        cr = _lodash2['default'].assign({}, cr, { grant_type: 'appuser' });
        return this._tokenRequest(cr, channel);
    };

    return Auth;
})();

exports.Auth = Auth;
},{"../net/message":14,"./exception":4,"./token":6,"lodash":76,"minilog":85}],3:[function(require,module,exports){
"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Credentials = (function () {
    function Credentials() {
        _classCallCheck(this, Credentials);

        this.client_id = null;
        this.client_secret = null;

        this.uuid = null;

        this.code = null;

        this.username = null;
        this.password = null;
        this.device = null;
        this.deviveinfo = { name: null };
    }

    Credentials.prototype.isValid = function isValid() {
        return this.client_id && this.client_secret;
    };

    return Credentials;
})();

exports.Credentials = Credentials;

Credentials.create = function (credentials) {

    var cr = new Credentials();
    return Object.assign(cr, credentials);
};
},{}],4:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var AuthenticationFailedException = function AuthenticationFailedException() {
    var message = arguments.length <= 0 || arguments[0] === undefined ? 'Authentication failed' : arguments[0];

    _classCallCheck(this, AuthenticationFailedException);

    if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
    } else {
        Object.defineProperty(this, 'stack', {
            configurable: true,
            enumerable: false,
            value: Error(message).stack
        });
    }

    Object.defineProperty(this, 'message', {
        configurable: true,
        enumerable: false,
        value: message
    });

    Object.defineProperty(this, 'name', {
        configurable: true,
        enumerable: false,
        value: this.constructor.name
    });
};

exports.AuthenticationFailedException = AuthenticationFailedException;

var AuthenticationTimeoutException = function AuthenticationTimeoutException() {
    var message = arguments.length <= 0 || arguments[0] === undefined ? 'Authentication timeout' : arguments[0];

    _classCallCheck(this, AuthenticationTimeoutException);

    if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
    } else {
        Object.defineProperty(this, 'stack', {
            configurable: true,
            enumerable: false,
            value: Error(message).stack
        });
    }

    Object.defineProperty(this, 'message', {
        configurable: true,
        enumerable: false,
        value: message
    });

    Object.defineProperty(this, 'name', {
        configurable: true,
        enumerable: false,
        value: this.constructor.name
    });
};

exports.AuthenticationTimeoutException = AuthenticationTimeoutException;
},{}],5:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _token = require('./token');

var _utilMixins = require('../util/mixins');

var _utilMixins2 = _interopRequireDefault(_utilMixins);

var TokenStorageInMem = (function () {
    function TokenStorageInMem() {
        _classCallCheck(this, TokenStorageInMem);
    }

    TokenStorageInMem.prototype.setCredentials = function setCredentials(credentials) {
        this.credentials = credentials;

        var token = null;

        if (credentials.token) {
            token = _token.Token.create(credentials.token);
            token.setExpireTime();
            delete credentials.token;
        }

        return this.storeToken(token).then();
    };

    TokenStorageInMem.prototype.removeToken = function removeToken() {
        this.token = null;
        return Promise.resolve(this.token);
    };

    TokenStorageInMem.prototype.storeToken = function storeToken(token) {

        this.token = token ? token : null;
        return Promise.resolve(this.token);
    };

    TokenStorageInMem.prototype.getStoredToken = function getStoredToken() {

        return Promise.resolve(this.token);
    };

    return TokenStorageInMem;
})();

exports.TokenStorageInMem = TokenStorageInMem;

TokenStorageInMem.createWithMixin = function (TokenStorageMixin) {

    var Mixed = _utilMixins2['default'](TokenStorageInMem, TokenStorageMixin);
    return new Mixed();
};
},{"../util/mixins":72,"./token":6}],6:[function(require,module,exports){
"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Token = (function () {
    function Token() {
        _classCallCheck(this, Token);

        this.access_token = null;
        this.refresh_token = null;
        this.token_type = null;
        this.expires_in = null;
        this.scope = null;
    }

    Token.prototype.getRefreshToken = function getRefreshToken() {

        return this.refresh_token;
    };

    Token.prototype.getAccessToken = function getAccessToken() {

        return this.access_token;
    };

    Token.prototype.isExpired = function isExpired() {

        return !this.expireTime || new Date().getTime() > this.expireTime;
    };

    Token.prototype.setExpireTime = function setExpireTime() {

        this.expireTime = parseInt(this.expires_in) * 1000 + new Date().getTime();
    };

    Token.prototype.getExpireTime = function getExpireTime() {

        return this.expireTime;
    };

    Token.prototype.update = function update(data) {
        return Object.assign(this, data);
    };

    return Token;
})();

exports.Token = Token;

Token.create = function (data) {

    var token = new Token();
    token = Object.assign(token, data);
    return token;
};
},{}],7:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _netStomp = require('./net/stomp');

var _netSocketSocketBrowser = require('./net/socket/socket-browser');

var _productGeneralGeneral = require('./product/general/general');

var _productSmartSmart = require('./product/smart/smart');

var _productLoyaltyLoyalty = require('./product/loyalty/loyalty');

var _productPaymentPayment = require('./product/payment/payment');

var _productServicesServices = require('./product/services/services');

var _productDocumentDocument = require('./product/document/document');

var _productAuthAuth = require('./product/auth/auth');

var _authTokenStorage = require('./auth/token-storage');

var ClientBrowserEnvironment = {
    config: {
        stompPort: 15671,
        stompEndpoint: '/stomp/websocket'
    },
    services: [_productAuthAuth.Auth.SessionService, _productDocumentDocument.Document.UploadService, _productGeneralGeneral.General.SkeletonService, _productGeneralGeneral.General.AccountService, _productGeneralGeneral.General.AccountDeviceService, _productGeneralGeneral.General.ContactService, _productGeneralGeneral.General.DeliveryAddressService, _productGeneralGeneral.General.FileAccessService, _productGeneralGeneral.General.MerchantService, _productGeneralGeneral.General.NewsService, _productGeneralGeneral.General.NotificationService, _productGeneralGeneral.General.PublicMerchantService, _productGeneralGeneral.General.StoreGroupService, _productGeneralGeneral.General.StoreService, _productGeneralGeneral.General.TransactionService, _productLoyaltyLoyalty.Loyalty.ActionActionService, _productLoyaltyLoyalty.Loyalty.ActionProfileService, _productLoyaltyLoyalty.Loyalty.BeaconService, _productLoyaltyLoyalty.Loyalty.CardGroupService, _productLoyaltyLoyalty.Loyalty.CardService, _productLoyaltyLoyalty.Loyalty.ChargeService, _productLoyaltyLoyalty.Loyalty.CheckinService, _productLoyaltyLoyalty.Loyalty.CustomerService, _productLoyaltyLoyalty.Loyalty.MerchantCardService, _productLoyaltyLoyalty.Loyalty.ProgramService, _productLoyaltyLoyalty.Loyalty.ProgramSpecialService, _productLoyaltyLoyalty.Loyalty.SaleService, _productLoyaltyLoyalty.Loyalty.StoreGroupService, _productPaymentPayment.Payment.ContainerService, _productPaymentPayment.Payment.ContractService, _productPaymentPayment.Payment.CustomerService, _productPaymentPayment.Payment.SecupayDebitService, _productPaymentPayment.Payment.SecupayPrepayService, _productPaymentPayment.Payment.TransactionService, _productServicesServices.Services.IdentCaseService, _productServicesServices.Services.IdentContractService, _productServicesServices.Services.IdentRequestService, _productServicesServices.Services.IdentResultService, _productSmartSmart.Smart.CheckinService, _productSmartSmart.Smart.DeviceService, _productSmartSmart.Smart.IdentService, _productSmartSmart.Smart.RoutingService, _productSmartSmart.Smart.TransactionService]
};
exports.ClientBrowserEnvironment = ClientBrowserEnvironment;
ClientBrowserEnvironment.StompChannel = {
    create: function create() {
        return new _netStomp.Stomp(_netSocketSocketBrowser.SocketAtBrowser);
    }
};

ClientBrowserEnvironment.TokenStorage = {
    create: function create() {
        return new _authTokenStorage.TokenStorageInMem();
    }
};

var ServiceMap = {
    Auth: {
        Sessions: _productAuthAuth.Auth.SessionService.Uid
    },
    Document: {
        Uploads: _productDocumentDocument.Document.UploadService.Uid
    },
    General: {
        Skeletons: _productGeneralGeneral.General.SkeletonService.Uid,
        Accounts: _productGeneralGeneral.General.AccountService.Uid,
        AccountDevices: _productGeneralGeneral.General.AccountDeviceService.Uid,
        Contacts: _productGeneralGeneral.General.ContactService.Uid,
        DeliveryAddresses: _productGeneralGeneral.General.DeliveryAddressService.Uid,
        FileAccesses: _productGeneralGeneral.General.FileAccessService.Uid,
        Merchants: _productGeneralGeneral.General.MerchantService.Uid,
        News: _productGeneralGeneral.General.NewsService.Uid,
        Notifications: _productGeneralGeneral.General.NotificationService.Uid,
        PublicMerchants: _productGeneralGeneral.General.PublicMerchantService.Uid,
        StoreGroups: _productGeneralGeneral.General.StoreGroupService.Uid,
        Stores: _productGeneralGeneral.General.StoreService.Uid,
        Transactions: _productGeneralGeneral.General.TransactionService.Uid
    },
    Loyalty: {
        ActionActions: _productLoyaltyLoyalty.Loyalty.ActionActionService.Uid,
        ActionProfiles: _productLoyaltyLoyalty.Loyalty.ActionProfileService.Uid,
        Beacons: _productLoyaltyLoyalty.Loyalty.BeaconService.Uid,
        CardGroups: _productLoyaltyLoyalty.Loyalty.CardGroupService.Uid,
        Cards: _productLoyaltyLoyalty.Loyalty.CardService.Uid,
        Charges: _productLoyaltyLoyalty.Loyalty.ChargeService.Uid,
        Checkins: _productLoyaltyLoyalty.Loyalty.CheckinService.Uid,
        Customers: _productLoyaltyLoyalty.Loyalty.CustomerService.Uid,
        MerchantCards: _productLoyaltyLoyalty.Loyalty.MerchantCardService.Uid,
        Programs: _productLoyaltyLoyalty.Loyalty.ProgramService.Uid,
        ProrgamSpecials: _productLoyaltyLoyalty.Loyalty.ProgramSpecialService.Uid,
        Sales: _productLoyaltyLoyalty.Loyalty.SaleService.Uid,
        StoreGroups: _productLoyaltyLoyalty.Loyalty.StoreGroupService.Uid
    },
    Payment: {
        Containers: _productPaymentPayment.Payment.ContainerService.Uid,
        Contracts: _productPaymentPayment.Payment.ContractService.Uid,
        Customers: _productPaymentPayment.Payment.CustomerService.Uid,
        SecupayDebits: _productPaymentPayment.Payment.SecupayDebitService.Uid,
        SecupayPrepays: _productPaymentPayment.Payment.SecupayPrepayService.Uid,
        Transactions: _productPaymentPayment.Payment.TransactionService.Uid
    },
    Services: {
        IdentCases: _productServicesServices.Services.IdentCaseService.Uid,
        IdentContracts: _productServicesServices.Services.IdentContractService.Uid,
        IdentRequests: _productServicesServices.Services.IdentRequestService.Uid,
        IdentResults: _productServicesServices.Services.IdentResultService.Uid
    },
    Smart: {
        Checkins: _productSmartSmart.Smart.CheckinService.Uid,
        Devices: _productSmartSmart.Smart.DeviceService.Uid,
        Idents: _productSmartSmart.Smart.IdentService.Uid,
        Routings: _productSmartSmart.Smart.RoutingService.Uid,
        Transactions: _productSmartSmart.Smart.TransactionService.Uid
    }
};
exports.ServiceMap = ServiceMap;
},{"./auth/token-storage":5,"./net/socket/socket-browser":16,"./net/stomp":19,"./product/auth/auth":21,"./product/document/document":23,"./product/general/general":30,"./product/loyalty/loyalty":47,"./product/payment/payment":56,"./product/services/services":65,"./product/smart/smart":70}],8:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var ClientConfig = (function () {
    function ClientConfig() {
        _classCallCheck(this, ClientConfig);
    }

    ClientConfig.prototype.getOAuthUrl = function getOAuthUrl() {
        return this._getCompleteUrl(this.oAuthUrl);
    };

    ClientConfig.prototype.getRestUrl = function getRestUrl() {
        return this._getCompleteUrl(this.restUrl);
    };

    ClientConfig.prototype.getStompHost = function getStompHost() {
        var value = this.stompHost;
        if (value.endsWith('/')) {
            value = value.slice(0, value.length - 1);
        }
        return value;
    };

    ClientConfig.prototype.getStompPort = function getStompPort() {
        return this.stompPort;
    };

    ClientConfig.prototype.getStompSslEnabled = function getStompSslEnabled() {
        return this.stompSslEnabled;
    };

    ClientConfig.prototype.getStompVHost = function getStompVHost() {
        return this.stompVHost;
    };

    ClientConfig.prototype.getStompQueue = function getStompQueue() {
        return this.stompQueue;
    };

    ClientConfig.prototype.getStompDestination = function getStompDestination() {
        return this._getCompleteUrl(this.stompDestination);
    };

    ClientConfig.prototype.getStompEndpoint = function getStompEndpoint() {
        return this.stompEndpoint;
    };

    ClientConfig.prototype.getStompHeartbeatMs = function getStompHeartbeatMs() {
        return this.stompHeartbeatSec * 1000;
    };

    ClientConfig.prototype.isDevice = function isDevice() {

        return Boolean(this.deviceUUID);
    };

    ClientConfig.prototype.getDeviceUUID = function getDeviceUUID() {
        return this.deviceUUID;
    };

    ClientConfig.prototype._getCompleteUrl = function _getCompleteUrl(value) {

        var url = value;
        if (!url.endsWith('/')) {
            url += '/';
        }
        return url;
    };

    return ClientConfig;
})();

exports.ClientConfig = ClientConfig;

ClientConfig._defaults = {
    channelDefault: '',
    cacheDir: '',
    deviceUUID: null,

    oAuthUrl: 'https://connect.secucard.com/oauth/',

    authDeviceTimeout: 0,
    restUrl: 'https://connect.secucard.com/api/v2/',

    restTimeout: 0,
    stompEnabled: true,
    stompHeartbeatSec: 30,

    stompHost: 'connect.secucard.com',
    stompPort: 61614,
    stompVHost: null,
    stompEndpoint: '',
    stompDestination: '/exchange/connect.api',

    stompSslEnabled: true,

    stompQueue: '/temp-queue/main',

    stompConnectTimeoutSec: 0,
    stompMessageTimeoutSec: 0,
    stompMessageAge: 0 };

ClientConfig.defaults = function () {

    var config = new ClientConfig();
    Object.assign(config, ClientConfig._defaults);
    return config;
};
},{}],9:[function(require,module,exports){
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
},{"./auth/auth":2,"./auth/credentials":3,"./auth/token-storage":5,"./net/channel":12,"./net/rest":15,"./product/app/app-service":20,"eventemitter3":75,"lodash":76}],10:[function(require,module,exports){
"use strict";

exports.__esModule = true;
var Version = {
  "name": "0.2.2"
};
exports.Version = Version;
},{}],11:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _netMessage = require('./net/message');

var _clientConfig = require('./client-config');

var _clientContext = require('./client-context');

var _clientVersion = require('./client-version');

var _minilog = require('minilog');

var _minilog2 = _interopRequireDefault(_minilog);

var Client = (function () {
    function Client(config, environment) {
        _classCallCheck(this, Client);

        this.config = config;
        this.context = new _clientContext.ClientContext(config, environment);
        this.getService = this.context.getService.bind(this.context);
        this.addAppService = this.context.addAppService.bind(this.context);
        this.removeAppService = this.context.removeAppService.bind(this.context);
        this.emitServiceEvent = this.context.emitServiceEvent.bind(this.context);
        this.on = this.context.on.bind(this.context);
        this.setCredentials = this.context.setCredentials.bind(this.context);
        this.getStoredToken = this.context.getStoredToken.bind(this.context);
        this.connected = false;

        _minilog2['default']('secucard.client').debug(config);
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
        return _clientVersion.Version.name;
    };

    return Client;
})();

exports.Client = Client;

Client.create = function (config, environment) {

    if (!config) {
        config = Object.create(null);
    }

    config = Object.assign(_clientConfig.ClientConfig.defaults(), environment.config, config);

    return new Client(config, environment);
};
},{"./client-config":8,"./client-context":9,"./client-version":10,"./net/message":14,"minilog":85}],12:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Channel = (function () {
    function Channel() {
        _classCallCheck(this, Channel);
    }

    Channel.prototype.send = function send() {};

    Channel.prototype.request = function request(method, params) {};

    return Channel;
})();

exports.Channel = Channel;

Channel.REST = 'rest';
Channel.STOMP = 'stomp';

Channel.METHOD = {
    GET: "GET",
    CREATE: "CREATE",
    UPDATE: "UPDATE",
    DELETE: "DELETE",
    EXECUTE: "EXECUTE"
};
},{}],13:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _authException = require('../auth/exception');

var SecucardConnectException = function SecucardConnectException(data) {
    _classCallCheck(this, SecucardConnectException);

    if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
    } else {
        Object.defineProperty(this, 'stack', {
            configurable: true,
            enumerable: false,
            value: Error(data.error_details).stack
        });
    }

    Object.defineProperty(this, 'message', {
        configurable: true,
        enumerable: false,
        value: data.error_details
    });

    Object.defineProperty(this, 'name', {
        configurable: true,
        enumerable: false,
        value: this.constructor.name
    });

    Object.defineProperty(this, 'status', {
        configurable: true,
        enumerable: false,
        value: data.status
    });

    Object.defineProperty(this, 'error', {
        configurable: true,
        enumerable: false,
        value: data.error
    });

    Object.defineProperty(this, 'error_details', {
        configurable: true,
        enumerable: false,
        value: data.error_details
    });

    Object.defineProperty(this, 'error_user', {
        configurable: true,
        enumerable: false,
        value: data.error_user
    });

    Object.defineProperty(this, 'code', {
        configurable: true,
        enumerable: false,
        value: data.code
    });

    Object.defineProperty(this, 'supportId', {
        configurable: true,
        enumerable: false,
        value: data.supportId
    });
};

exports.SecucardConnectException = SecucardConnectException;

SecucardConnectException.create = function (data) {

    var error = undefined;

    if (data.error == 'ProductSecurityException') {
        error = Object.assign(new _authException.AuthenticationFailedException(), data);
    } else {
        error = new SecucardConnectException(data);
    }

    return error;
};
},{"../auth/exception":4}],14:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var HEAD = 'HEAD';
exports.HEAD = HEAD;
var GET = 'GET';
exports.GET = GET;
var POST = 'POST';
exports.POST = POST;
var PUT = 'PUT';
exports.PUT = PUT;
var DELETE = 'DELETE';

exports.DELETE = DELETE;

var Message = (function () {
  function Message() {
    _classCallCheck(this, Message);
  }

  Message.prototype.setBaseUrl = function setBaseUrl(value) {
    this.baseUrl = value;
    return this;
  };

  Message.prototype.setUrl = function setUrl(value) {
    this.url = value;
    return this;
  };

  Message.prototype.setMethod = function setMethod(value) {
    this.method = value;
    return this;
  };

  Message.prototype.setHeaders = function setHeaders(value) {
    this.headers = value;
    return this;
  };

  Message.prototype.setQuery = function setQuery(value) {
    this.query = value;
    return this;
  };

  Message.prototype.setBody = function setBody(value) {
    this.body = value;
    return this;
  };

  Message.prototype.setAccept = function setAccept(value) {
    this.accept = value;
    return this;
  };

  Message.prototype.setMultipart = function setMultipart(value) {
    this.multipart = value;
  };

  return Message;
})();

exports.Message = Message;
},{}],15:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _message = require('./message');

var _channel = require('./channel');

var _authException = require('../auth/exception');

var _exception = require('./exception');

var _minilog = require('minilog');

var _minilog2 = _interopRequireDefault(_minilog);

var Rest = (function () {
    function Rest() {
        _classCallCheck(this, Rest);

        this.methodFuns = {};

        this.methodFuns[_message.GET] = _superagent2['default'].get;
        this.methodFuns[_message.POST] = _superagent2['default'].post;

        this.methodFuns[_message.PUT] = _superagent2['default'].put;
        this.methodFuns[_message.HEAD] = _superagent2['default'].head;
        this.methodFuns[_message.DELETE] = _superagent2['default'].del;

        this.methodFuns[_channel.Channel.METHOD.GET] = _superagent2['default'].get;

        this.methodFuns[_channel.Channel.METHOD.CREATE] = _superagent2['default'].post;
        this.methodFuns[_channel.Channel.METHOD.EXECUTE] = _superagent2['default'].post;

        this.methodFuns[_channel.Channel.METHOD.UPDATE] = _superagent2['default'].put;
        this.methodFuns[_channel.Channel.METHOD.DELETE] = _superagent2['default'].del;
    }

    Rest.prototype.configureWithContext = function configureWithContext(context) {

        this.restUrl = function () {

            return context.getConfig().getRestUrl();
        };

        this.getToken = function (extend) {

            return context.getAuth().getToken(extend);
        };

        this.isRequestWithToken = context.isRequestWithToken.bind(context);
    };

    Rest.prototype.open = function open() {
        return Promise.resolve(true);
    };

    Rest.prototype.createMessage = function createMessage() {
        var message = new _message.Message();
        return message.setBaseUrl(this.restUrl());
    };

    Rest.prototype.r = function r(url, method) {
        return this.methodFuns[method](url);
    };

    Rest.prototype.send = function send(message) {
        var _this = this;

        return new Promise(function (resolve, reject) {

            var url = message.baseUrl ? message.baseUrl + message.url : message.url;
            var request = _this.r(url, message.method);

            if (message.headers) {
                request.set(message.headers);
            }

            if (message.query) {
                request.query(message.query);
            }

            if (message.body) {
                request.send(message.body);
            }

            if (message.accept) {
                request.accept(message.accept);
            }

            if (message.multipart && message.multipart.files) {
                message.multipart.files.forEach(function (item) {
                    request.attach(item.field, item.path, item.filename);
                });
            }

            if (message.multipart && message.multipart.fields) {
                message.multipart.fields.forEach(function (item) {
                    request.field(item.name, item.value);
                });
            }

            request.end(function (err, res) {
                if (err) {
                    reject(err, res);
                } else {
                    resolve(res);
                }
            });
        });
    };

    Rest.prototype.getAuthHeader = function getAuthHeader(token) {

        return { 'Authorization': 'Bearer ' + token.access_token };
    };

    Rest.prototype.sendWithToken = function sendWithToken(message) {
        var _this2 = this;

        return this.getToken(true).then(function (token) {

            var headers = Object.assign({}, message.headers, _this2.getAuthHeader(token));
            message.setHeaders(headers);
            return _this2.send(message);
        });
    };

    Rest.prototype.request = function request(method, params) {

        var requestSuccess = function requestSuccess(res) {
            _minilog2['default']('secucard.rest').debug('requestSuccess', res.req.path);
            return res.body;
        };

        var requestError = function requestError(err) {
            var error = err;
            var request = JSON.stringify({ method: method, params: params });

            if (error instanceof _authException.AuthenticationFailedException) {} else if (err.response) {
                error = _exception.SecucardConnectException.create(err.response.body);
            }

            error.request = request;

            throw error;
        };

        var message = this.createMessageForRequest(method, params);

        var pr = !this.isRequestWithToken || this.isRequestWithToken(params.options) ? this.sendWithToken(message) : this.send(message);

        return pr.then(requestSuccess)['catch'](requestError);
    };

    Rest.prototype.createMessageForRequest = function createMessageForRequest(method, params) {

        var message = this.createMessage();

        if (!params.multipart && params.headers) {
            message.setHeaders(Object.assign({}, { 'Content-Type': 'application/json' }, params.headers));
        } else if (!params.multipart) {
            message.setHeaders({ 'Content-Type': 'application/json' });
        }

        message.setMethod(method);

        var endPointSpec = [];

        if (params.appId) {
            endPointSpec = ['General', 'Apps', params.appId, 'callBackend'];
        } else if (params.endpoint) {
            endPointSpec = params.endpoint;
        } else {
            throw new Error('Missing endpoint spec or app id.');
        }

        if (params.objectId != null) {
            endPointSpec.push(params.objectId);
        }

        if (params.action) {
            endPointSpec.push(params.action);
        }

        if (params.actionArg) {
            endPointSpec.push(params.actionArg);
        }

        message.setUrl(this.buildEndpoint(endPointSpec));

        if (params.queryParams) {
            message.setQuery(params.queryParams);
        }

        if (params.data) {
            message.setBody(params.data);
        }

        if (params.multipart) {
            message.setMultipart(params.multipart);
        }

        _minilog2['default']('secucard.rest').debug('message', message);

        return message;
    };

    Rest.prototype.buildEndpoint = function buildEndpoint(endpoint) {

        if (!endpoint || endpoint.length < 2) {
            throw new Error('Invalid endpoint specification.');
        }

        return endpoint.join('/');
    };

    return Rest;
})();

exports.Rest = Rest;
},{"../auth/exception":4,"./channel":12,"./exception":13,"./message":14,"minilog":85,"superagent":89}],16:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _eventemitter3 = require('eventemitter3');

var _eventemitter32 = _interopRequireDefault(_eventemitter3);

var _minilog = require('minilog');

var _minilog2 = _interopRequireDefault(_minilog);

var SocketAtBrowser = (function () {
    function SocketAtBrowser(url) {
        var _this = this;

        _classCallCheck(this, SocketAtBrowser);

        Object.assign(this, _eventemitter32['default'].prototype);

        var ws = new WebSocket(url);
        ws.binaryType = "arraybuffer";

        ws.onopen = function () {

            _minilog2['default']('secucard.socket.browser').debug('onopen');
            _this.emit('connect');
        };

        ws.onmessage = function (event) {

            _minilog2['default']('secucard.socket.browser').debug('onmessage', event);
            _this.emit('data', event.data);
        };

        ws.onclose = function (event) {

            if (event.code == 1000) {
                _this.emit('close');
            } else {
                _this.emit('close', event.reason);
            }
        };

        this.ws = ws;
    }

    SocketAtBrowser.prototype.close = function close() {

        this.ws.close();
    };

    SocketAtBrowser.prototype.write = function write(chunk) {

        this.ws.send(chunk);
        return true;
    };

    return SocketAtBrowser;
})();

exports.SocketAtBrowser = SocketAtBrowser;

SocketAtBrowser.connect = function (host, port, endpoint, sslEnabled, ssl_options, ssl_validate, onInit, onError) {

    var url = host + ':' + port + endpoint;
    if (sslEnabled) {
        url = 'wss://' + url;
    } else {
        url = 'ws://' + url;
    }

    var socket = new SocketAtBrowser(url);
    onInit(socket, false);
};

SocketAtBrowser.disconnect = function (socket) {

    _minilog2['default']('secucard.socket.browser').debug('disconnect called');
    socket.close();
};
},{"eventemitter3":75,"minilog":85}],17:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Frame = (function () {
    function Frame() {
        _classCallCheck(this, Frame);

        this.command = null;
        this.headers = null;
        this.body = null;
    }

    Frame.prototype.build_frame = function build_frame(args) {

        this.command = args['command'];
        this.headers = args['headers'];
        this.body = args['body'];

        return this;
    };

    Frame.prototype.as_string = function as_string() {
        var header_strs = [],
            frame = "",
            command = this.command,
            headers = this.headers,
            body = this.body;

        for (var header in headers) {
            header_strs.push(header + ':' + headers[header]);
        }

        frame += command + "\n";
        frame += header_strs.join("\n");
        frame += "\n\n";

        if (body) {
            frame += body;
        }

        frame += '\x00';

        return frame;
    };

    return Frame;
})();

exports.Frame = Frame;
},{}],18:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _frame2 = require('./frame');

var _eventemitter3 = require('eventemitter3');

var _eventemitter32 = _interopRequireDefault(_eventemitter3);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _minilog = require('minilog');

var _minilog2 = _interopRequireDefault(_minilog);

var utils = {};
utils.really_defined = function (var_to_test) {
    return !(var_to_test == null || var_to_test == undefined);
};

var Stomp = (function () {
    function Stomp(SocketImpl) {
        _classCallCheck(this, Stomp);

        Object.assign(this, _eventemitter32['default'].prototype);

        this._subscribed_to = {};
        this.session = null;
        this.connected = false;
        this.SocketImpl = SocketImpl;
    }

    Stomp.prototype.isConnected = function isConnected(ignoreSession) {
        return this.connected && (ignoreSession || this.session);
    };

    Stomp.prototype.configure = function configure(config) {

        this.port = config['port'] || 61613;
        this.host = config['host'] || '127.0.0.1';
        this.debug = config['debug'];
        this.login = config['login'] || null;
        this.passcode = config['passcode'] || null;

        this.ssl = config['ssl'] ? true : false;
        this.ssl_validate = config['ssl_validate'] ? true : false;
        this.ssl_options = config['ssl_options'] || {};
        this.vhost = config['vhost'];
        this.heartbeatMs = config['heartbeatMs'];
        this.endpoint = config['endpoint'] || '';

        this['client-id'] = config['client-id'] || null;
    };

    Stomp.prototype.connect = function connect(credentials) {
        this.login = credentials.login;
        this.passcode = credentials.passcode;
        this._connect(this);
    };

    Stomp.prototype.is_a_message = function is_a_message(this_frame) {
        return this_frame.headers !== null && utils.really_defined(this_frame.headers['message-id']);
    };

    Stomp.prototype.should_run_message_callback = function should_run_message_callback(this_frame) {};

    Stomp.prototype.handle_new_frame = function handle_new_frame(this_frame) {

        switch (this_frame.command) {
            case "MESSAGE":
                if (this.is_a_message(this_frame)) {
                    this.should_run_message_callback(this_frame);
                    this.emit('message', this_frame);
                }
                break;
            case "CONNECTED":
                _minilog2['default']('secucard.STOMP').debug('Connected');
                this.session = this_frame.headers['session'];
                this.emit('connected');
                break;
            case "RECEIPT":
                this.emit('receipt', this_frame.headers['receipt-id']);
                break;
            case "ERROR":
                this.emit('error', this_frame);
                break;
            default:
                _minilog2['default']('secucard.STOMP').error('Could not parse command', this_frame.command);
        }
    };

    Stomp.prototype.disconnect = function disconnect() {
        this._disconnect(this);
    };

    Stomp.prototype.subscribe = function subscribe(headers, callback) {

        var destination = headers['destination'];
        headers['session'] = this.session;
        this.send_command(this, 'SUBSCRIBE', headers);

        this._subscribed_to[destination] = { enabled: true, callback: callback };
    };

    Stomp.prototype.unsubscribe = function unsubscribe(headers) {
        var destination = headers['destination'];
        headers['session'] = this.session;
        this.send_command(this, 'UNSUBSCRIBE', headers);
        this._subscribed_to[destination].enabled = false;
    };

    Stomp.prototype.ack = function ack(message_id) {
        this.send_command(this, 'ACK', { 'message-id': message_id });
    };

    Stomp.prototype.begin = function begin() {
        var transaction_id = Math.floor(Math.random() * 99999999999).toString();
        this.send_command(this, 'BEGIN', { 'transaction': transaction_id });

        return transaction_id;
    };

    Stomp.prototype.commit = function commit(transaction_id) {
        this.send_command(this, 'COMMIT', { 'transaction': transaction_id });
    };

    Stomp.prototype.abort = function abort(transaction_id) {
        this.send_command(this, 'ABORT', { 'transaction': transaction_id });
    };

    Stomp.prototype.send = function send(destination, headers, body, withReceipt) {
        headers['session'] = this.session;
        headers['destination'] = destination;
        _minilog2['default']('secucard.STOMP').debug(headers, body);
        return this.send_command(this, 'SEND', headers, body, withReceipt);
    };

    Stomp.prototype.parse_command = function parse_command(data) {
        var command,
            this_string = data.toString('utf8', 0, data.length);
        command = this_string.split('\n');
        return command[0];
    };

    Stomp.prototype.parse_headers = function parse_headers(raw_headers) {
        var headers = {},
            headers_split = raw_headers.split('\n');

        for (var i = 0; i < headers_split.length; i++) {
            var header = headers_split[i].split(':');
            if (header.length > 1) {
                var header_key = header.shift().trim();
                var header_val = header.join(':').trim();
                headers[header_key] = header_val;
                continue;
            }
            headers[header[0].trim()] = header[1].trim();
        }
        return headers;
    };

    Stomp.prototype.parse_frame = function parse_frame(chunk) {
        var args = {},
            data = null,
            command = null,
            headers = null,
            body = null,
            headers_str = null;

        if (!utils.really_defined(chunk)) {
            return null;
        }

        command = this.parse_command(chunk);
        data = chunk.slice(command.length + 1, chunk.length);
        data = data.toString('utf8', 0, data.length);

        var the_rest = data.split('\n\n');
        headers = this.parse_headers(the_rest[0]);
        body = the_rest.slice(1, the_rest.length);

        if ('content-length' in headers) {
            headers['bytes_message'] = true;
        }

        args = {
            command: command,
            headers: headers,
            body: body
        };

        var this_frame = new _frame2.Frame();
        var return_frame = this_frame.build_frame(args);

        return return_frame;
    };

    Stomp.prototype._connect = function _connect(stomp) {
        var _this = this;

        var onInit = function onInit(socket, handleConnected) {

            stomp.socket = socket;
            _this._setupListeners(stomp, handleConnected);
        };

        var onError = function onError(err) {
            stomp.emit('connectionError', err);
        };

        stomp.SocketImpl.connect(stomp.host, stomp.port, stomp.endpoint, stomp.ssl, stomp.ssl_options, stomp.ssl_validate, onInit, onError);
    };

    Stomp.prototype._setupListeners = function _setupListeners(stomp, handleConnected) {
        var _this2 = this;

        var _connected = function _connected() {

            _minilog2['default']('secucard.STOMP').debug('Connected to socket');
            _this2.connected = true;

            var headers = {};

            if (utils.really_defined(stomp.login) && utils.really_defined(stomp.passcode)) {
                headers.login = stomp.login;
                headers.passcode = stomp.passcode;
            }

            if (utils.really_defined(stomp["client-id"])) {
                headers["client-id"] = stomp["client-id"];
            }
            if (utils.really_defined(stomp["vhost"])) {
                headers["host"] = stomp["vhost"];
            }

            _this2.stomp_connect(stomp, headers);
        };

        var socket = stomp.socket;

        socket.on('drain', function (data) {
            _minilog2['default']('secucard.STOMP').debug('draining');
        });

        var buffer = '';

        socket.on('data', function (chunk) {

            buffer += chunk;
            var frames = buffer.split('\0\n');

            if (frames.length == 1) {
                frames = buffer.split('\0');
            }

            if (frames.length == 1) return;
            buffer = frames.pop();

            var parsed_frame = null;
            var _frame = null;
            while (_frame = frames.shift()) {
                parsed_frame = _this2.parse_frame(_frame);
                stomp.handle_new_frame(parsed_frame);
            }
        });

        socket.on('end', function () {});

        socket.on('close', function (error) {
            _minilog2['default']('secucard.STOMP').debug('Disconnected with error:', error);
            stomp.session = null;
            stomp.connected = false;
            stomp.emit("disconnected", error);
        });

        if (handleConnected) {
            _connected();
        } else {
            socket.on('connect', _connected);
        }
    };

    Stomp.prototype.stomp_connect = function stomp_connect(stomp, headers) {

        var _frame = new _frame2.Frame(),
            args = {},
            headers = headers || {};

        if (this.heartbeatMs > 0) {
            headers['heart-beat'] = this.heartbeatMs + ',0';
        }

        args['command'] = 'CONNECT';
        args['headers'] = headers;

        var frame_to_send = _frame.build_frame(args);
        this.send_frame(stomp, frame_to_send);
    };

    Stomp.prototype._disconnect = function _disconnect(stomp) {

        stomp.SocketImpl.disconnect(stomp.socket);
    };

    Stomp.prototype.send_command = function send_command(stomp, command, headers, body, withReceipt) {

        var withReceipt = withReceipt || false;

        if (!utils.really_defined(headers)) {
            headers = {};
        }

        if (withReceipt) {
            headers['receipt'] = this.createReceiptId();
        }

        var args = {
            'command': command,
            'headers': headers,
            'body': body
        };

        var _frame = new _frame2.Frame();
        var this_frame = _frame.build_frame(args);
        this.send_frame(stomp, this_frame);
        return this_frame;
    };

    Stomp.prototype.send_frame = function send_frame(stomp, _frame) {

        var socket = stomp.socket;
        var frame_str = _frame.as_string();

        _minilog2['default']('secucard.STOMP').debug('socket write:', frame_str);

        if (socket.write(frame_str) === false) {
            _minilog2['default']('secucard.STOMP').debug('Write buffered');
        }

        return true;
    };

    Stomp.prototype.createReceiptId = function createReceiptId() {

        return 'rcpt-' + _uuid2['default'].v1();
    };

    return Stomp;
})();

exports.Stomp = Stomp;
},{"./frame":17,"eventemitter3":75,"minilog":85,"uuid":93}],19:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _eventemitter3 = require('eventemitter3');

var _eventemitter32 = _interopRequireDefault(_eventemitter3);

var _minilog = require('minilog');

var _minilog2 = _interopRequireDefault(_minilog);

var _channel = require('./channel');

var _stompImplStomp = require('./stomp-impl/stomp');

var _exception = require('./exception');

var _authException = require('../auth/exception');

var utils = {};
utils.really_defined = function (var_to_test) {
    return !(var_to_test == null || var_to_test == undefined);
};

utils.sizeOfUTF8 = function (str) {
    var size = 0;
    if (str) {
        size = encodeURI(str).match(/%..|./g).length;
    }
    return size;
};

var Stomp = (function () {
    function Stomp(SocketImpl) {
        _classCallCheck(this, Stomp);

        Object.assign(this, _eventemitter32['default'].prototype);

        this.connection = null;
        this.messages = {};

        this.skipSessionRefresh = false;
        this.sessionTimer = null;

        this.connectAccessToken = null;

        this.stompCommands = {};
        this.stompCommands[_channel.Channel.METHOD.GET] = 'get';
        this.stompCommands[_channel.Channel.METHOD.CREATE] = 'add';
        this.stompCommands[_channel.Channel.METHOD.EXECUTE] = 'exec';
        this.stompCommands[_channel.Channel.METHOD.UPDATE] = 'update';
        this.stompCommands[_channel.Channel.METHOD.DELETE] = 'delete';

        this.connection = new _stompImplStomp.Stomp(SocketImpl);
        this.connection.on('message', this._handleStompMessage.bind(this));
    }

    Stomp.prototype.configureWithContext = function configureWithContext(context) {

        this.emitServiceEvent = context.emitServiceEvent.bind(context);

        this.getToken = function (extend) {
            return context.getAuth().getToken(extend);
        };

        this.getStompHost = function () {
            return context.getConfig().getStompHost();
        };

        this.getStompPort = function () {
            return context.getConfig().getStompPort();
        };

        this.getStompSslEnabled = function () {
            return context.getConfig().getStompSslEnabled();
        };

        this.getStompVHost = function () {
            return context.getConfig().getStompVHost();
        };

        this.getStompQueue = function () {
            return context.getConfig().getStompQueue();
        };

        this.getStompDestination = function () {
            return context.getConfig().getStompDestination();
        };

        this.getStompEndpoint = function () {
            return context.getConfig().getStompEndpoint();
        };

        this.getStompHeartbeatMs = function () {
            return context.getConfig().getStompHeartbeatMs();
        };
    };

    Stomp.prototype.getStompConfig = function getStompConfig() {

        return {

            host: this.getStompHost(),
            port: this.getStompPort(),
            ssl: this.getStompSslEnabled(),
            vhost: this.getStompVHost(),
            heartbeatMs: this.getStompHeartbeatMs(),
            endpoint: this.getStompEndpoint(),
            login: '',
            passcode: ''
        };
    };

    Stomp.prototype.open = function open() {

        return this._startSessionRefresh();
    };

    Stomp.prototype.connect = function connect() {
        var _this = this;

        _minilog2['default']('secucard.stomp').debug('stomp start connection');

        return this.getToken().then(function (token) {

            _minilog2['default']('secucard.stomp').debug('Got token', token);
            return _this._connect(token.access_token);
        });
    };

    Stomp.prototype.close = function close() {

        if (this.sessionTimer) {
            clearInterval(this.sessionTimer);
        }

        return this._disconnect();
    };

    Stomp.prototype._disconnect = function _disconnect() {
        var _this2 = this;

        return new Promise(function (resolve, reject) {

            var ignoreSession = true;
            if (!_this2.connection.isConnected(ignoreSession)) {
                resolve();
                return;
            }

            if (_this2.connection && _this2.connection.disconnect) {

                _this2.connection.disconnect();

                _this2._stompOnDisconnected = function () {
                    _minilog2['default']('secucard.stomp').debug('stomp disconnected');
                    _this2.connection.removeListener('disconnected', _this2._stompOnDisconnected);
                    delete _this2._stompOnDisconnected;
                    resolve();
                };

                _this2.connection.on('disconnected', _this2._stompOnDisconnected);
            } else {

                resolve();
            }
        });
    };

    Stomp.prototype.request = function request(method, params) {

        var destination = this.buildDestination(method, params);
        var message = this.createMessage(params);
        return this._sendMessage(destination, message)['catch'](function (err) {
            err.request = JSON.stringify({ method: method, params: params });
            throw err;
        });
    };

    Stomp.prototype.buildDestination = function buildDestination(method, params) {

        var destination = {};

        if (params.endpoint != null) {
            destination.endpoint = params.endpoint;
        } else if (params.appId != null) {
            destination.appId = params.appId;
        } else {
            throw new Error('Missing object spec or app id');
        }

        destination.command = this.stompCommands[method];

        if (!destination.command) {
            throw new Error('Invalid method arg');
        }

        destination.action = params.action;

        return destination;
    };

    Stomp.prototype.createMessage = function createMessage(params) {

        var message = {};

        if (utils.really_defined(params.objectId)) {
            message.pid = params.objectId;
        }

        if (utils.really_defined(params.actionArg)) {
            message.sid = params.actionArg;
        }

        if (utils.really_defined(params.queryParams)) {
            message.query = params.queryParams;
        }

        if (utils.really_defined(params.data)) {
            message.data = params.data;
        }

        return message;
    };

    Stomp.prototype._connect = function _connect(accessToken) {
        var _this3 = this;

        if (!accessToken) {

            return this.close().then(function () {
                return Promise.reject(new _authException.AuthenticationFailedException('Access token is not valid'));
            });
        }

        this.connectAccessToken = accessToken;

        var stompCredentials = {
            login: accessToken,
            passcode: accessToken
        };

        this.connection.configure(this.getStompConfig());
        this.connection.connect(stompCredentials);

        return new Promise(function (resolve, reject) {

            _this3._stompOnConnected = function () {
                _minilog2['default']('secucard.stomp').debug('stomp connected');
                _this3._stompClearListeners ? _this3._stompClearListeners() : null;
                resolve(true);
            };

            _this3._stompOnError = function (message) {
                _minilog2['default']('secucard.stomp').error('stomp error', message);
                _this3._stompClearListeners ? _this3._stompClearListeners() : null;
                _this3.close().then(function () {
                    if (message.headers && message.headers.message == 'Bad CONNECT') {
                        reject(new _authException.AuthenticationFailedException(message.body[0]));
                    } else {
                        reject(message);
                    }
                });
            };

            _this3._stompClearListeners = function () {
                _this3.connection.removeListener('connected', _this3._stompOnConnected);
                _this3.connection.removeListener('error', _this3._stompOnError);
                delete _this3._stompOnConnected;
                delete _this3._stompOnError;
                delete _this3._stompClearListeners;
            };

            _this3.connection.on('connected', _this3._stompOnConnected);
            _this3.connection.on('error', _this3._stompOnError);
        });
    };

    Stomp.prototype._sendMessage = function _sendMessage(destinationObj, message) {
        var _this4 = this;

        _minilog2['default']('secucard.stomp').debug('message', destinationObj, message);

        return this.getToken(true).then(function (token) {

            var accessToken = token.access_token;
            var correlationId = _this4.createCorrelationId();

            var headers = {};
            headers['reply-to'] = _this4.getStompQueue();
            headers['content-type'] = 'application/json';
            headers['user-id'] = accessToken;
            headers['correlation-id'] = correlationId;

            if (destinationObj.appId) {
                headers['app-id'] = destinationObj.appId;
            }

            var body = JSON.stringify(message);
            headers['content-length'] = utils.sizeOfUTF8(body);

            var destination = _this4.getStompDestination();
            if (destinationObj.appId) {

                destination += 'app:' + destinationObj.action;
            } else {

                destination += 'api:' + destinationObj.command + ':';

                var endpoint = [];
                if (destinationObj.endpoint) {
                    endpoint = endpoint.concat(destinationObj.endpoint);
                }
                if (destinationObj.action) {
                    endpoint.push(destinationObj.action);
                }

                destination += endpoint.join('.');
            }

            var sendWithStomp = function sendWithStomp() {

                return new Promise(function (resolve, reject) {

                    _this4.messages[correlationId] = { resolve: resolve, reject: reject };
                    _this4.connection.send(destination, headers, body);
                });
            };

            if (!_this4.connection.isConnected() || accessToken != _this4.connectAccessToken) {

                if (_this4.connection.isConnected()) {
                    _minilog2['default']('secucard.stomp').warn('Reconnect due token change.');
                }

                return _this4._disconnect().then(function () {
                    return _this4._runSessionRefresh().then(sendWithStomp);
                });
            }

            return sendWithStomp();
        });
    };

    Stomp.prototype._startSessionRefresh = function _startSessionRefresh() {
        var _this5 = this;

        _minilog2['default']('secucard.stomp').debug('Stomp session refresh loop started');

        var initial = true;

        var sessionInterval = this.getStompHeartbeatMs() > 0 ? this.getStompHeartbeatMs() - 500 : 25 * 1000;

        this.sessionTimer = setInterval(function () {

            if (_this5.skipSessionRefresh) {
                _this5.skipSessionRefresh = false;
            } else {
                _this5._runSessionRefresh(false);
            }
        }, sessionInterval);

        return this._runSessionRefresh(initial);
    };

    Stomp.prototype._runSessionRefresh = function _runSessionRefresh(initial) {
        var _this6 = this;

        var createRefreshRequest = function createRefreshRequest() {

            return _this6.request(_channel.Channel.METHOD.EXECUTE, {
                endpoint: ['auth', 'sessions'],
                objectId: 'me',
                action: 'refresh'
            }).then(function (res) {

                _this6.emit('sessionRefresh');
                _minilog2['default']('secucard.stomp').debug('Session refresh sent');
                _this6.skipSessionRefresh = false;
                return res;
            })['catch'](function (err) {

                _this6.emit('sessionRefreshError');
                _minilog2['default']('secucard.stomp').error('Session refresh failed');
                if (initial) {
                    throw err;
                }
            });
        };

        if (!this.connection.isConnected()) {

            return this.connect().then(createRefreshRequest);
        } else {

            return createRefreshRequest();
        }
    };

    Stomp.prototype._handleStompMessage = function _handleStompMessage(frame) {
        this.skipSessionRefresh = true;

        _minilog2['default']('secucard.stomp').debug('_handleStompMessage', frame);

        var body = undefined;

        if (frame && frame.headers && frame.headers['correlation-id']) {

            var correlationId = frame.headers['correlation-id'];
            body = JSON.parse(frame.body[0]);

            if (body.status == 'ok') {
                this.messages[correlationId].resolve(body.data);
            } else {
                var error = _exception.SecucardConnectException.create(body);
                this.messages[correlationId].reject(error);
            }

            delete this.messages[correlationId];
        } else if (frame) {

            body = JSON.parse(frame.body[0]);
            this.emitServiceEvent(null, body.target, body.type, body.data);
        }
    };

    Stomp.prototype.createCorrelationId = function createCorrelationId() {
        return _uuid2['default'].v1();
    };

    return Stomp;
})();

exports.Stomp = Stomp;
},{"../auth/exception":4,"./channel":12,"./exception":13,"./stomp-impl/stomp":18,"eventemitter3":75,"minilog":85,"uuid":93}],20:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var _utilMixins = require('../../util/mixins');

var _utilMixins2 = _interopRequireDefault(_utilMixins);

var AppService = (function (_ProductService) {
    _inherits(AppService, _ProductService);

    function AppService() {
        _classCallCheck(this, AppService);

        _ProductService.call(this);
        this.isApp = true;
        this.init();
    }

    AppService.prototype.init = function init() {};

    AppService.prototype.getEndpoint = function getEndpoint() {
        return ['general', 'apps'];
    };

    AppService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    AppService.prototype.getUid = function getUid() {
        return _ProductService.prototype.getUid.call(this) + '.' + this.getAppId();
    };

    return AppService;
})(_productService.ProductService);

exports.AppService = AppService;

AppService.createWithMixin = function (ServiceMixin) {

    var Mixed = _utilMixins2['default'](AppService, ServiceMixin);
    return new Mixed();
};
},{"../../util/mixins":72,"../product-service":60}],21:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _sessionService = require('./session-service');

var Auth = {};
exports.Auth = Auth;
Auth.SessionService = _sessionService.SessionService;
},{"./session-service":22}],22:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var SessionService = (function (_ProductService) {
    _inherits(SessionService, _ProductService);

    function SessionService() {
        _classCallCheck(this, SessionService);

        _ProductService.call(this);
    }

    SessionService.prototype.getEndpoint = function getEndpoint() {
        return ['auth', 'sessions'];
    };

    SessionService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    SessionService.prototype.check = function check() {
        return this.retrieveWithAction('me', 'debug');
    };

    return SessionService;
})(_productService.ProductService);

exports.SessionService = SessionService;

SessionService.Uid = ['auth', 'sessions'].join('.');
},{"../product-service":60}],23:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _uploadService = require('./upload-service');

var Document = {};

exports.Document = Document;
Document.UploadService = _uploadService.UploadService;
},{"./upload-service":24}],24:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var UploadService = (function (_ProductService) {
    _inherits(UploadService, _ProductService);

    function UploadService() {
        _classCallCheck(this, UploadService);

        _ProductService.call(this);
    }

    UploadService.prototype.getEndpoint = function getEndpoint() {
        return ['document', 'uploads'];
    };

    UploadService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    UploadService.prototype.upload = function upload(base64str) {
        return _ProductService.prototype.execute.call(this, null, null, null, { content: base64str }, {
            channelConfig: ['rest'],
            useAuth: false });
    };

    UploadService.prototype.uploadMultiForm = function uploadMultiForm(files) {
        return _ProductService.prototype.create.call(this, null, {
            channelConfig: ['rest'],
            useAuth: false }, { files: files });
    };

    return UploadService;
})(_productService.ProductService);

exports.UploadService = UploadService;

UploadService.Uid = ['document', 'uploads'].join('.');
},{"../product-service":60}],25:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var AccountDeviceService = (function (_ProductService) {
    _inherits(AccountDeviceService, _ProductService);

    function AccountDeviceService() {
        _classCallCheck(this, AccountDeviceService);

        _ProductService.call(this);
    }

    AccountDeviceService.prototype.getEndpoint = function getEndpoint() {
        return ['general', 'accountdevices'];
    };

    AccountDeviceService.prototype.getEventTargets = function getEventTargets() {
        return ['general.accountdevices'];
    };

    return AccountDeviceService;
})(_productService.ProductService);

exports.AccountDeviceService = AccountDeviceService;

AccountDeviceService.Uid = ['general', 'accountdevices'].join('.');
},{"../product-service":60}],26:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var AccountService = (function (_ProductService) {
    _inherits(AccountService, _ProductService);

    function AccountService() {
        _classCallCheck(this, AccountService);

        _ProductService.call(this);
    }

    AccountService.prototype.getEndpoint = function getEndpoint() {
        return ['general', 'accounts'];
    };

    AccountService.prototype.getEventTargets = function getEventTargets() {
        return ['general.accounts'];
    };

    AccountService.prototype.create = function create(data, options) {

        options = Object.assign({}, options, {
            channelConfig: ['rest'],
            useAuth: false });

        return _ProductService.prototype.create.call(this, data, options);
    };

    AccountService.prototype.updateLocation = function updateLocation(accountId, location) {
        return this.updateWithAction(accountId, 'location', null, location);
    };

    AccountService.prototype.updateBeacons = function updateBeacons(beaconList) {
        return this.updateWithAction("me", 'beaconEnvironment', null, beaconList);
    };

    AccountService.prototype.updateGCM = function updateGCM(accountId, gcm) {
        return this.updateWithAction(accountId, 'gcm', null, gcm);
    };

    return AccountService;
})(_productService.ProductService);

exports.AccountService = AccountService;

AccountService.Uid = ['general', 'accounts'].join('.');
},{"../product-service":60}],27:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var ContactService = (function (_ProductService) {
    _inherits(ContactService, _ProductService);

    function ContactService() {
        _classCallCheck(this, ContactService);

        _ProductService.call(this);
    }

    ContactService.prototype.getEndpoint = function getEndpoint() {
        return ['general', 'contacts'];
    };

    ContactService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return ContactService;
})(_productService.ProductService);

exports.ContactService = ContactService;

ContactService.Uid = ['general', 'contacts'].join('.');
},{"../product-service":60}],28:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var DeliveryAddressService = (function (_ProductService) {
    _inherits(DeliveryAddressService, _ProductService);

    function DeliveryAddressService() {
        _classCallCheck(this, DeliveryAddressService);

        _ProductService.call(this);
    }

    DeliveryAddressService.prototype.getEndpoint = function getEndpoint() {
        return ['general', 'deliveryaddresses'];
    };

    DeliveryAddressService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return DeliveryAddressService;
})(_productService.ProductService);

exports.DeliveryAddressService = DeliveryAddressService;

DeliveryAddressService.Uid = ['general', 'deliveryaddresses'].join('.');
},{"../product-service":60}],29:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var FileAccessService = (function (_ProductService) {
    _inherits(FileAccessService, _ProductService);

    function FileAccessService() {
        _classCallCheck(this, FileAccessService);

        _ProductService.call(this);
    }

    FileAccessService.prototype.getEndpoint = function getEndpoint() {
        return ['general', 'fileaccesses'];
    };

    FileAccessService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return FileAccessService;
})(_productService.ProductService);

exports.FileAccessService = FileAccessService;

FileAccessService.Uid = ['general', 'fileaccesses'].join('.');
},{"../product-service":60}],30:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _skeletonService = require('./skeleton-service');

var _accountService = require('./account-service');

var _accountDeviceService = require('./account-device-service');

var _contactService = require('./contact-service');

var _deliveryAddressService = require('./delivery-address-service');

var _fileAccessService = require('./file-access-service');

var _merchantService = require('./merchant-service');

var _newsService = require('./news-service');

var _notificationService = require('./notification-service');

var _publicMerchantService = require('./public-merchant-service');

var _storeService = require('./store-service');

var _transactionService = require('./transaction-service');

var _storeGroupService = require('./store-group-service');

var General = {};

exports.General = General;
General.SkeletonService = _skeletonService.SkeletonService;
General.AccountService = _accountService.AccountService;
General.AccountDeviceService = _accountDeviceService.AccountDeviceService;
General.ContactService = _contactService.ContactService;
General.DeliveryAddressService = _deliveryAddressService.DeliveryAddressService;
General.FileAccessService = _fileAccessService.FileAccessService;
General.MerchantService = _merchantService.MerchantService;
General.NewsService = _newsService.NewsService;
General.NotificationService = _notificationService.NotificationService;
General.PublicMerchantService = _publicMerchantService.PublicMerchantService;
General.StoreGroupService = _storeGroupService.StoreGroupService;
General.StoreService = _storeService.StoreService;
General.TransactionService = _transactionService.TransactionService;
},{"./account-device-service":25,"./account-service":26,"./contact-service":27,"./delivery-address-service":28,"./file-access-service":29,"./merchant-service":31,"./news-service":32,"./notification-service":33,"./public-merchant-service":34,"./skeleton-service":35,"./store-group-service":36,"./store-service":37,"./transaction-service":38}],31:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var MerchantService = (function (_ProductService) {
    _inherits(MerchantService, _ProductService);

    function MerchantService() {
        _classCallCheck(this, MerchantService);

        _ProductService.call(this);
    }

    MerchantService.prototype.getEndpoint = function getEndpoint() {
        return ['general', 'merchants'];
    };

    MerchantService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return MerchantService;
})(_productService.ProductService);

exports.MerchantService = MerchantService;

MerchantService.Uid = ['general', 'merchants'].join('.');
},{"../product-service":60}],32:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var NewsService = (function (_ProductService) {
    _inherits(NewsService, _ProductService);

    function NewsService() {
        _classCallCheck(this, NewsService);

        _ProductService.call(this);
    }

    NewsService.prototype.getEndpoint = function getEndpoint() {
        return ['general', 'news'];
    };

    NewsService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    NewsService.prototype.markRead = function markRead(newsId) {
        return this.updateWithAction(newsId, 'markRead');
    };

    return NewsService;
})(_productService.ProductService);

exports.NewsService = NewsService;

NewsService.Uid = ['general', 'news'].join('.');
},{"../product-service":60}],33:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var NotificationService = (function (_ProductService) {
    _inherits(NotificationService, _ProductService);

    function NotificationService() {
        _classCallCheck(this, NotificationService);

        _ProductService.call(this);
    }

    NotificationService.prototype.getEndpoint = function getEndpoint() {
        return ['general', 'notifications'];
    };

    NotificationService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return NotificationService;
})(_productService.ProductService);

exports.NotificationService = NotificationService;

NotificationService.Uid = ['general', 'notifications'].join('.');
},{"../product-service":60}],34:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var PublicMerchantService = (function (_ProductService) {
    _inherits(PublicMerchantService, _ProductService);

    function PublicMerchantService() {
        _classCallCheck(this, PublicMerchantService);

        _ProductService.call(this);
    }

    PublicMerchantService.prototype.getEndpoint = function getEndpoint() {
        return ['general', 'publicmerchants'];
    };

    PublicMerchantService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return PublicMerchantService;
})(_productService.ProductService);

exports.PublicMerchantService = PublicMerchantService;

PublicMerchantService.Uid = ['general', 'publicmerchants'].join('.');
},{"../product-service":60}],35:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var SkeletonService = (function (_ProductService) {
    _inherits(SkeletonService, _ProductService);

    function SkeletonService() {
        _classCallCheck(this, SkeletonService);

        _ProductService.call(this);
    }

    SkeletonService.prototype.getEndpoint = function getEndpoint() {
        return ['general', 'skeletons'];
    };

    SkeletonService.prototype.getEventTargets = function getEventTargets() {
        return ['general.skeletons'];
    };

    SkeletonService.prototype.demoEvent = function demoEvent() {
        return this.execute(1, 'demoevent');
    };

    return SkeletonService;
})(_productService.ProductService);

exports.SkeletonService = SkeletonService;

SkeletonService.Uid = ['general', 'skeletons'].join('.');
},{"../product-service":60}],36:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var StoreGroupService = (function (_ProductService) {
    _inherits(StoreGroupService, _ProductService);

    function StoreGroupService() {
        _classCallCheck(this, StoreGroupService);

        _ProductService.call(this);
    }

    StoreGroupService.prototype.getEndpoint = function getEndpoint() {
        return ['general', 'storegroups'];
    };

    StoreGroupService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return StoreGroupService;
})(_productService.ProductService);

exports.StoreGroupService = StoreGroupService;

StoreGroupService.Uid = ['general', 'storegroups'].join('.');
},{"../product-service":60}],37:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var StoreService = (function (_ProductService) {
    _inherits(StoreService, _ProductService);

    function StoreService() {
        _classCallCheck(this, StoreService);

        _ProductService.call(this);
    }

    StoreService.prototype.getEndpoint = function getEndpoint() {
        return ['general', 'stores'];
    };

    StoreService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    StoreService.prototype.checkIn = function checkIn(storeId, checkInState) {
        return this.updateWithAction(storeId, 'checkin', checkInState);
    };

    StoreService.prototype.setDefault = function setDefault(storeId) {
        return this.updateWithAction(storeId, 'setDefault');
    };

    return StoreService;
})(_productService.ProductService);

exports.StoreService = StoreService;

StoreService.Uid = ['general', 'stores'].join('.');
},{"../product-service":60}],38:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var TransactionService = (function (_ProductService) {
    _inherits(TransactionService, _ProductService);

    function TransactionService() {
        _classCallCheck(this, TransactionService);

        _ProductService.call(this);
    }

    TransactionService.prototype.getEndpoint = function getEndpoint() {
        return ['general', 'transactions'];
    };

    TransactionService.prototype.getEventTargets = function getEventTargets() {
        return ['general.transactions'];
    };

    return TransactionService;
})(_productService.ProductService);

exports.TransactionService = TransactionService;

TransactionService.Uid = ['general', 'transactions'].join('.');
},{"../product-service":60}],39:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var ActionActionService = (function (_ProductService) {
    _inherits(ActionActionService, _ProductService);

    function ActionActionService() {
        _classCallCheck(this, ActionActionService);

        _ProductService.call(this);
    }

    ActionActionService.prototype.getEndpoint = function getEndpoint() {
        return ['loyalty', 'actionactions'];
    };

    ActionActionService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return ActionActionService;
})(_productService.ProductService);

exports.ActionActionService = ActionActionService;

ActionActionService.Uid = ['loyalty', 'actionactions'].join('.');
},{"../product-service":60}],40:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var ActionProfileService = (function (_ProductService) {
    _inherits(ActionProfileService, _ProductService);

    function ActionProfileService() {
        _classCallCheck(this, ActionProfileService);

        _ProductService.call(this);
    }

    ActionProfileService.prototype.getEndpoint = function getEndpoint() {
        return ['loyalty', 'actionprofiles'];
    };

    ActionProfileService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return ActionProfileService;
})(_productService.ProductService);

exports.ActionProfileService = ActionProfileService;

ActionProfileService.Uid = ['loyalty', 'actionprofiles'].join('.');
},{"../product-service":60}],41:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var BeaconService = (function (_ProductService) {
    _inherits(BeaconService, _ProductService);

    function BeaconService() {
        _classCallCheck(this, BeaconService);

        _ProductService.call(this);
    }

    BeaconService.prototype.getEndpoint = function getEndpoint() {
        return ['loyalty', 'beacons'];
    };

    BeaconService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return BeaconService;
})(_productService.ProductService);

exports.BeaconService = BeaconService;

BeaconService.Uid = ['loyalty', 'beacons'].join('.');
},{"../product-service":60}],42:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var CardGroupService = (function (_ProductService) {
    _inherits(CardGroupService, _ProductService);

    function CardGroupService() {
        _classCallCheck(this, CardGroupService);

        _ProductService.call(this);
    }

    CardGroupService.prototype.getEndpoint = function getEndpoint() {
        return ['loyalty', 'cardgroups'];
    };

    CardGroupService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return CardGroupService;
})(_productService.ProductService);

exports.CardGroupService = CardGroupService;

CardGroupService.Uid = ['loyalty', 'cardgroups'].join('.');
},{"../product-service":60}],43:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var CardService = (function (_ProductService) {
    _inherits(CardService, _ProductService);

    function CardService() {
        _classCallCheck(this, CardService);

        _ProductService.call(this);
    }

    CardService.prototype.getEndpoint = function getEndpoint() {
        return ['loyalty', 'cards'];
    };

    CardService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    CardService.prototype.assignUser = function assignUser(cardNumber, pin) {
        return this.execute(cardNumber, 'assignUser', 'me', pin);
    };

    CardService.prototype.removeUser = function removeUser(cardNumber) {
        return this.removeWithAction(cardNumber, 'assignUser', 'me');
    };

    return CardService;
})(_productService.ProductService);

exports.CardService = CardService;

CardService.Uid = ['loyalty', 'cards'].join('.');
},{"../product-service":60}],44:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var ChargeService = (function (_ProductService) {
    _inherits(ChargeService, _ProductService);

    function ChargeService() {
        _classCallCheck(this, ChargeService);

        _ProductService.call(this);
    }

    ChargeService.prototype.getEndpoint = function getEndpoint() {
        return ['loyalty', 'charges'];
    };

    ChargeService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return ChargeService;
})(_productService.ProductService);

exports.ChargeService = ChargeService;

ChargeService.Uid = ['loyalty', 'charges'].join('.');
},{"../product-service":60}],45:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var CheckinService = (function (_ProductService) {
    _inherits(CheckinService, _ProductService);

    function CheckinService() {
        _classCallCheck(this, CheckinService);

        _ProductService.call(this);
    }

    CheckinService.prototype.getEndpoint = function getEndpoint() {
        return ['loyalty', 'checkins'];
    };

    CheckinService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return CheckinService;
})(_productService.ProductService);

exports.CheckinService = CheckinService;

CheckinService.Uid = ['loyalty', 'checkins'].join('.');
},{"../product-service":60}],46:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var CustomerService = (function (_ProductService) {
    _inherits(CustomerService, _ProductService);

    function CustomerService() {
        _classCallCheck(this, CustomerService);

        _ProductService.call(this);
    }

    CustomerService.prototype.getEndpoint = function getEndpoint() {
        return ['loyalty', 'customers'];
    };

    CustomerService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return CustomerService;
})(_productService.ProductService);

exports.CustomerService = CustomerService;

CustomerService.Uid = ['loyalty', 'customers'].join('.');
},{"../product-service":60}],47:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _actionActionServiceJs = require('./action-action-service.js');

var _actionProfileService = require('./action-profile-service');

var _beaconService = require('./beacon-service');

var _cardGroupService = require('./card-group-service');

var _cardService = require('./card-service');

var _chargeService = require('./charge-service');

var _checkinService = require('./checkin-service');

var _customerService = require('./customer-service');

var _merchantCardService = require('./merchant-card-service');

var _programService = require('./program-service');

var _programSpecialService = require('./program-special-service');

var _saleService = require('./sale-service');

var _storeGroupService = require('./store-group-service');

var Loyalty = {};
exports.Loyalty = Loyalty;
Loyalty.ActionActionService = _actionActionServiceJs.ActionActionService;
Loyalty.ActionProfileService = _actionProfileService.ActionProfileService;
Loyalty.BeaconService = _beaconService.BeaconService;
Loyalty.CardGroupService = _cardGroupService.CardGroupService;
Loyalty.CardService = _cardService.CardService;
Loyalty.ChargeService = _chargeService.ChargeService;
Loyalty.CheckinService = _checkinService.CheckinService;
Loyalty.CustomerService = _customerService.CustomerService;
Loyalty.MerchantCardService = _merchantCardService.MerchantCardService;
Loyalty.ProgramService = _programService.ProgramService;
Loyalty.ProgramSpecialService = _programSpecialService.ProgramSpecialService;
Loyalty.SaleService = _saleService.SaleService;
Loyalty.StoreGroupService = _storeGroupService.StoreGroupService;
},{"./action-action-service.js":39,"./action-profile-service":40,"./beacon-service":41,"./card-group-service":42,"./card-service":43,"./charge-service":44,"./checkin-service":45,"./customer-service":46,"./merchant-card-service":48,"./program-service":49,"./program-special-service":50,"./sale-service":51,"./store-group-service":52}],48:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var MerchantCardService = (function (_ProductService) {
    _inherits(MerchantCardService, _ProductService);

    function MerchantCardService() {
        _classCallCheck(this, MerchantCardService);

        _ProductService.call(this);
    }

    MerchantCardService.prototype.getEndpoint = function getEndpoint() {
        return ['loyalty', 'merchantcards'];
    };

    MerchantCardService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return MerchantCardService;
})(_productService.ProductService);

exports.MerchantCardService = MerchantCardService;

MerchantCardService.Uid = ['loyalty', 'merchantcards'].join('.');
},{"../product-service":60}],49:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var ProgramService = (function (_ProductService) {
    _inherits(ProgramService, _ProductService);

    function ProgramService() {
        _classCallCheck(this, ProgramService);

        _ProductService.call(this);
    }

    ProgramService.prototype.getEndpoint = function getEndpoint() {
        return ['loyalty', 'programs'];
    };

    ProgramService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return ProgramService;
})(_productService.ProductService);

exports.ProgramService = ProgramService;

ProgramService.Uid = ['loyalty', 'programs'].join('.');
},{"../product-service":60}],50:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var ProgramSpecialService = (function (_ProductService) {
    _inherits(ProgramSpecialService, _ProductService);

    function ProgramSpecialService() {
        _classCallCheck(this, ProgramSpecialService);

        _ProductService.call(this);
    }

    ProgramSpecialService.prototype.getEndpoint = function getEndpoint() {
        return ['loyalty', 'programspecials'];
    };

    ProgramSpecialService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return ProgramSpecialService;
})(_productService.ProductService);

exports.ProgramSpecialService = ProgramSpecialService;

ProgramSpecialService.Uid = ['loyalty', 'programspecials'].join('.');
},{"../product-service":60}],51:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var SaleService = (function (_ProductService) {
    _inherits(SaleService, _ProductService);

    function SaleService() {
        _classCallCheck(this, SaleService);

        _ProductService.call(this);
    }

    SaleService.prototype.getEndpoint = function getEndpoint() {
        return ['loyalty', 'sales'];
    };

    SaleService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return SaleService;
})(_productService.ProductService);

exports.SaleService = SaleService;

SaleService.Uid = ['loyalty', 'sales'].join('.');
},{"../product-service":60}],52:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var StoreGroupService = (function (_ProductService) {
    _inherits(StoreGroupService, _ProductService);

    function StoreGroupService() {
        _classCallCheck(this, StoreGroupService);

        _ProductService.call(this);
    }

    StoreGroupService.prototype.getEndpoint = function getEndpoint() {
        return ['loyalty', 'storegroups'];
    };

    StoreGroupService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return StoreGroupService;
})(_productService.ProductService);

exports.StoreGroupService = StoreGroupService;

StoreGroupService.Uid = ['loyalty', 'storegroups'].join('.');
},{"../product-service":60}],53:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var ContainerService = (function (_ProductService) {
    _inherits(ContainerService, _ProductService);

    function ContainerService() {
        _classCallCheck(this, ContainerService);

        _ProductService.call(this);
    }

    ContainerService.prototype.getEndpoint = function getEndpoint() {
        return ['payment', 'containers'];
    };

    ContainerService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    ContainerService.prototype.assignCustomer = function assignCustomer(containerId, customerId) {
        return this.execute(containerId, 'assign', customerId);
    };

    ContainerService.prototype.removeCustomer = function removeCustomer(containerId) {
        return this.removeWithAction(containerId, 'assign');
    };

    return ContainerService;
})(_productService.ProductService);

exports.ContainerService = ContainerService;

ContainerService.Uid = ['payment', 'containers'].join('.');
},{"../product-service":60}],54:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var ContractService = (function (_ProductService) {
    _inherits(ContractService, _ProductService);

    function ContractService() {
        _classCallCheck(this, ContractService);

        _ProductService.call(this);
    }

    ContractService.prototype.getEndpoint = function getEndpoint() {
        return ['payment', 'contracts'];
    };

    ContractService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    ContractService.prototype.clone = function clone(contractId, cloneParams) {
        return this.execute(contractId, 'clone');
    };

    ContractService.prototype.cloneMine = function cloneMine(cloneParams) {
        return this.clone('me', cloneParams);
    };

    return ContractService;
})(_productService.ProductService);

exports.ContractService = ContractService;

ContractService.Uid = ['payment', 'contracts'].join('.');
},{"../product-service":60}],55:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var CustomerService = (function (_ProductService) {
    _inherits(CustomerService, _ProductService);

    function CustomerService() {
        _classCallCheck(this, CustomerService);

        _ProductService.call(this);
    }

    CustomerService.prototype.getEndpoint = function getEndpoint() {
        return ['payment', 'customers'];
    };

    CustomerService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return CustomerService;
})(_productService.ProductService);

exports.CustomerService = CustomerService;

CustomerService.Uid = ['payment', 'customers'].join('.');
},{"../product-service":60}],56:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _containerService = require('./container-service');

var _contractService = require('./contract-service');

var _customerService = require('./customer-service');

var _secupayDebitService = require('./secupay-debit-service');

var _secupayPrepayService = require('./secupay-prepay-service');

var _transactionService = require('./transaction-service');

var Payment = {};
exports.Payment = Payment;
Payment.ContainerService = _containerService.ContainerService;
Payment.ContractService = _contractService.ContractService;
Payment.CustomerService = _customerService.CustomerService;
Payment.SecupayDebitService = _secupayDebitService.SecupayDebitService;
Payment.SecupayPrepayService = _secupayPrepayService.SecupayPrepayService;
Payment.TransactionService = _transactionService.TransactionService;
},{"./container-service":53,"./contract-service":54,"./customer-service":55,"./secupay-debit-service":57,"./secupay-prepay-service":58,"./transaction-service":59}],57:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var SecupayDebitService = (function (_ProductService) {
    _inherits(SecupayDebitService, _ProductService);

    function SecupayDebitService() {
        _classCallCheck(this, SecupayDebitService);

        _ProductService.call(this);
    }

    SecupayDebitService.prototype.getEndpoint = function getEndpoint() {
        return ['payment', 'secupaydebits'];
    };

    SecupayDebitService.prototype.getEventTargets = function getEventTargets() {
        return ['payment.secupaydebits'];
    };

    SecupayDebitService.prototype.cancel = function cancel(id) {
        return this.execute(id, 'cancel');
    };

    return SecupayDebitService;
})(_productService.ProductService);

exports.SecupayDebitService = SecupayDebitService;

SecupayDebitService.Uid = ['payment', 'secupaydebits'].join('.');
},{"../product-service":60}],58:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var SecupayPrepayService = (function (_ProductService) {
    _inherits(SecupayPrepayService, _ProductService);

    function SecupayPrepayService() {
        _classCallCheck(this, SecupayPrepayService);

        _ProductService.call(this);
    }

    SecupayPrepayService.prototype.getEndpoint = function getEndpoint() {
        return ['payment', 'secupayprepays'];
    };

    SecupayPrepayService.prototype.getEventTargets = function getEventTargets() {
        return ['payment.secupayprepays'];
    };

    SecupayPrepayService.prototype.cancel = function cancel(id) {
        return this.execute(id, 'cancel');
    };

    return SecupayPrepayService;
})(_productService.ProductService);

exports.SecupayPrepayService = SecupayPrepayService;

SecupayPrepayService.Uid = ['payment', 'secupayprepays'].join('.');
},{"../product-service":60}],59:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var TransactionService = (function (_ProductService) {
    _inherits(TransactionService, _ProductService);

    function TransactionService() {
        _classCallCheck(this, TransactionService);

        _ProductService.call(this);
    }

    TransactionService.prototype.getShippingUrl = function getShippingUrl(id) {
        return this.retrieveWithAction(id, 'shippingUrl');
    };

    TransactionService.prototype.cancel = function cancel(id, data) {
        return this.execute(id, 'cancel', null, data);
    };

    TransactionService.prototype.getEndpoint = function getEndpoint() {
        return ['payment', 'transactions'];
    };

    TransactionService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return TransactionService;
})(_productService.ProductService);

exports.TransactionService = TransactionService;

TransactionService.Uid = ['payment', 'transactions'].join('.');
},{"../product-service":60}],60:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _netChannel = require('../net/channel');

var _eventemitter3 = require('eventemitter3');

var _eventemitter32 = _interopRequireDefault(_eventemitter3);

var ProductService = (function () {
    function ProductService() {
        _classCallCheck(this, ProductService);

        Object.assign(this, _eventemitter32['default'].prototype);
    }

    ProductService.prototype.configureWithContext = function configureWithContext(context) {

        this.getChannel = context.getChannel.bind(context);
        this.getServiceDefaultOptions = context.getServiceDefaultOptions.bind(context);
    };

    ProductService.prototype.getEndpoint = function getEndpoint() {};

    ProductService.prototype.getEventTargets = function getEventTargets() {};

    ProductService.prototype.getUid = function getUid() {

        return this.getEndpoint().join('.').toLowerCase();
    };

    ProductService.prototype._parseMeta = function _parseMeta(data) {

        if (!data) {
            return data;
        }

        data.describe = function (property) {

            var _this = this;

            var res = property.split('.').reduce(function (collector, item) {
                return collector.properties[item];
            }, _this);

            if (res.type == 'object') {
                res.describe = this.describe;
            }

            return res;
        };

        return data;
    };

    ProductService.prototype.getMeta = function getMeta(options) {
        var _this2 = this;

        return this._meta && !options ? Promise.resolve(this._meta) : this.retrieveMeta(options).then(function (res) {
            _this2._meta = _this2._parseMeta(res.meta);
            return _this2._meta;
        });
    };

    ProductService.prototype.retrieveMeta = function retrieveMeta(options) {

        var params = {
            endpoint: this.getEndpoint(),
            queryParams: { meta: 'only' },
            options: options
        };

        return this._request(_netChannel.Channel.METHOD.GET, params, options);
    };

    ProductService.prototype.retrieve = function retrieve(id, queryParams, options) {

        var params = {
            endpoint: this.getEndpoint(),
            objectId: id,
            queryParams: queryParams,
            options: options
        };

        return this._request(_netChannel.Channel.METHOD.GET, params, options);
    };

    ProductService.prototype.retrieveWithAction = function retrieveWithAction(id, action, actionArg, options) {

        var params = {
            endpoint: this.getEndpoint(),
            objectId: id,
            action: action,
            actionArg: actionArg,
            options: options
        };

        return this._request(_netChannel.Channel.METHOD.GET, params, options);
    };

    ProductService.prototype.retrieveList = function retrieveList(queryParams, options) {

        var params = {
            endpoint: this.getEndpoint(),
            queryParams: queryParams,
            options: options
        };

        return this._request(_netChannel.Channel.METHOD.GET, params, options);
    };

    ProductService.prototype.create = function create(data, options, multipart) {

        var params = {
            endpoint: this.getEndpoint(),
            data: data,
            options: options,
            multipart: multipart
        };

        return this._request(_netChannel.Channel.METHOD.CREATE, params, options);
    };

    ProductService.prototype.update = function update(data, options, multipart) {

        var params = {
            endpoint: this.getEndpoint(),
            objectId: data.id,
            data: data,
            options: options,
            multipart: multipart
        };

        return this._request(_netChannel.Channel.METHOD.UPDATE, params, options);
    };

    ProductService.prototype.updateWithAction = function updateWithAction(id, action, actionArg, data, options, multipart) {

        var params = {
            endpoint: this.getEndpoint(),
            objectId: id,
            data: data,
            action: action,
            actionArg: actionArg,
            options: options,
            multipart: multipart
        };

        return this._request(_netChannel.Channel.METHOD.UPDATE, params, options);
    };

    ProductService.prototype.remove = function remove(id, options) {

        var params = {
            endpoint: this.getEndpoint(),
            objectId: id,
            options: options
        };

        return this._request(_netChannel.Channel.METHOD.DELETE, params, options);
    };

    ProductService.prototype.removeWithAction = function removeWithAction(id, action, actionArg, options) {

        var params = {
            endpoint: this.getEndpoint(),
            objectId: id,
            action: action,
            actionArg: actionArg,
            options: options
        };

        return this._request(_netChannel.Channel.METHOD.DELETE, params, options);
    };

    ProductService.prototype.execute = function execute(id, action, actionArg, data, options) {

        var params = {
            endpoint: this.getEndpoint(),
            objectId: id,
            action: action,
            actionArg: actionArg,
            data: data,
            options: options
        };

        return this._request(_netChannel.Channel.METHOD.EXECUTE, params, options);
    };

    ProductService.prototype.executeAppAction = function executeAppAction(appId, action, data, options) {

        var params = {
            appId: appId,
            action: action,
            data: data,
            options: options
        };

        return this._request(_netChannel.Channel.METHOD.EXECUTE, params, options);
    };

    ProductService.prototype._request = function _request(method, params, options) {

        if (options == null) {
            options = this.getServiceDefaultOptions();
        }

        if (params.options == null) {
            params.options = options;
        }

        return this.getChannel(options.channelConfig).request(method, params);
    };

    return ProductService;
})();

exports.ProductService = ProductService;
},{"../net/channel":12,"eventemitter3":75}],61:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var IdentCaseService = (function (_ProductService) {
    _inherits(IdentCaseService, _ProductService);

    function IdentCaseService() {
        _classCallCheck(this, IdentCaseService);

        _ProductService.call(this);
    }

    IdentCaseService.prototype.getEndpoint = function getEndpoint() {
        return ['services', 'identcases'];
    };

    IdentCaseService.prototype.getEventTargets = function getEventTargets() {
        return ['services.identcases'];
    };

    IdentCaseService.prototype.start = function start(id) {
        return this.execute(id, "start");
    };

    IdentCaseService.prototype.task = function task(id, taskId, data) {
        return this.updateWithAction(id, "task", taskId, data);
    };

    IdentCaseService.prototype.close = function close(id) {
        return this.execute(id, "close");
    };

    return IdentCaseService;
})(_productService.ProductService);

exports.IdentCaseService = IdentCaseService;

IdentCaseService.Uid = ['services', 'identcases'].join('.');
},{"../product-service":60}],62:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var IdentContractService = (function (_ProductService) {
    _inherits(IdentContractService, _ProductService);

    function IdentContractService() {
        _classCallCheck(this, IdentContractService);

        _ProductService.call(this);
    }

    IdentContractService.prototype.getEndpoint = function getEndpoint() {
        return ['services', 'identcontracts'];
    };

    IdentContractService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return IdentContractService;
})(_productService.ProductService);

exports.IdentContractService = IdentContractService;

IdentContractService.Uid = ['services', 'identcontracts'].join('.');
},{"../product-service":60}],63:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var IdentRequestService = (function (_ProductService) {
    _inherits(IdentRequestService, _ProductService);

    function IdentRequestService() {
        _classCallCheck(this, IdentRequestService);

        _ProductService.call(this);
    }

    IdentRequestService.prototype.getEndpoint = function getEndpoint() {
        return ['services', 'identrequests'];
    };

    IdentRequestService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return IdentRequestService;
})(_productService.ProductService);

exports.IdentRequestService = IdentRequestService;

IdentRequestService.Uid = ['services', 'identrequests'].join('.');
},{"../product-service":60}],64:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var IdentResultService = (function (_ProductService) {
    _inherits(IdentResultService, _ProductService);

    function IdentResultService() {
        _classCallCheck(this, IdentResultService);

        _ProductService.call(this);
    }

    IdentResultService.prototype.getEndpoint = function getEndpoint() {
        return ['services', 'identresults'];
    };

    IdentResultService.prototype.getEventTargets = function getEventTargets() {
        return ['services.identresults'];
    };

    return IdentResultService;
})(_productService.ProductService);

exports.IdentResultService = IdentResultService;

IdentResultService.Uid = ['services', 'identresults'].join('.');
},{"../product-service":60}],65:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _identCaseService = require('./ident-case-service');

var _identContractService = require('./ident-contract-service');

var _identRequestService = require('./ident-request-service');

var _identResultService = require('./ident-result-service');

var Services = {};
exports.Services = Services;
Services.IdentCaseService = _identCaseService.IdentCaseService;
Services.IdentContractService = _identContractService.IdentContractService;
Services.IdentRequestService = _identRequestService.IdentRequestService;
Services.IdentResultService = _identResultService.IdentResultService;
},{"./ident-case-service":61,"./ident-contract-service":62,"./ident-request-service":63,"./ident-result-service":64}],66:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var CheckinService = (function (_ProductService) {
    _inherits(CheckinService, _ProductService);

    function CheckinService() {
        _classCallCheck(this, CheckinService);

        _ProductService.call(this);
    }

    CheckinService.prototype.getEndpoint = function getEndpoint() {
        return ['smart', 'checkins'];
    };

    CheckinService.prototype.getEventTargets = function getEventTargets() {
        return ['smart.checkins'];
    };

    return CheckinService;
})(_productService.ProductService);

exports.CheckinService = CheckinService;

CheckinService.Uid = ['smart', 'checkins'].join('.');
},{"../product-service":60}],67:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var DeviceService = (function (_ProductService) {
    _inherits(DeviceService, _ProductService);

    function DeviceService() {
        _classCallCheck(this, DeviceService);

        _ProductService.call(this);
    }

    DeviceService.prototype.getEndpoint = function getEndpoint() {
        return ['smart', 'devices'];
    };

    DeviceService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return DeviceService;
})(_productService.ProductService);

exports.DeviceService = DeviceService;

DeviceService.Uid = ['smart', 'devices'].join('.');
},{"../product-service":60}],68:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var IdentService = (function (_ProductService) {
    _inherits(IdentService, _ProductService);

    function IdentService() {
        _classCallCheck(this, IdentService);

        _ProductService.call(this);
    }

    IdentService.prototype.getEndpoint = function getEndpoint() {
        return ['smart', 'idents'];
    };

    IdentService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    IdentService.prototype.validate = function validate(id) {
        return this.execute(id, "validate");
    };

    IdentService.prototype.read = function read(id) {
        return this.execute(id, "read");
    };

    return IdentService;
})(_productService.ProductService);

exports.IdentService = IdentService;

IdentService.Uid = ['smart', 'idents'].join('.');
},{"../product-service":60}],69:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var RoutingService = (function (_ProductService) {
    _inherits(RoutingService, _ProductService);

    function RoutingService() {
        _classCallCheck(this, RoutingService);

        _ProductService.call(this);
    }

    RoutingService.prototype.getEndpoint = function getEndpoint() {
        return ['smart', 'routings'];
    };

    RoutingService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    RoutingService.prototype.assignDevice = function assignDevice(id, deviceId) {
        return this.execute(id, 'assign', deviceId);
    };

    RoutingService.prototype.removeDevice = function removeDevice(id, deviceId) {
        return this.removeWithAction(id, 'assign', deviceId);
    };

    return RoutingService;
})(_productService.ProductService);

exports.RoutingService = RoutingService;

RoutingService.Uid = ['smart', 'routings'].join('.');
},{"../product-service":60}],70:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _checkinService = require('./checkin-service');

var _deviceService = require('./device-service');

var _identService = require('./ident-service');

var _routingService = require('./routing-service');

var _transactionService = require('./transaction-service');

var Smart = {};
exports.Smart = Smart;
Smart.CheckinService = _checkinService.CheckinService;
Smart.DeviceService = _deviceService.DeviceService;
Smart.IdentService = _identService.IdentService;
Smart.RoutingService = _routingService.RoutingService;
Smart.TransactionService = _transactionService.TransactionService;
},{"./checkin-service":66,"./device-service":67,"./ident-service":68,"./routing-service":69,"./transaction-service":71}],71:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var TransactionService = (function (_ProductService) {
    _inherits(TransactionService, _ProductService);

    function TransactionService() {
        _classCallCheck(this, TransactionService);

        _ProductService.call(this);
    }

    TransactionService.prototype.getEndpoint = function getEndpoint() {
        return ['smart', 'transactions'];
    };

    TransactionService.prototype.getEventTargets = function getEventTargets() {
        return ['general.notifications'];
    };

    TransactionService.prototype.start = function start(id, type) {
        return this.execute(id, "start", type);
    };

    TransactionService.prototype.cancel = function cancel(id) {
        return this.execute(id, "cancel");
    };

    return TransactionService;
})(_productService.ProductService);

exports.TransactionService = TransactionService;

TransactionService.Uid = ['smart', 'transactions'].join('.');
},{"../product-service":60}],72:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var mixins = function mixins(Parent) {
    for (var _len = arguments.length, _mixins = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        _mixins[_key - 1] = arguments[_key];
    }

    var Mixed = (function (_Parent) {
        _inherits(Mixed, _Parent);

        function Mixed() {
            _classCallCheck(this, Mixed);

            _Parent.apply(this, arguments);
        }

        return Mixed;
    })(Parent);

    var merged = Object.create(null);
    for (var _iterator = _mixins, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
        }

        var mixin = _ref;

        for (var _iterator2 = Object.getOwnPropertyNames(mixin.prototype), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
            var _ref2;

            if (_isArray2) {
                if (_i2 >= _iterator2.length) break;
                _ref2 = _iterator2[_i2++];
            } else {
                _i2 = _iterator2.next();
                if (_i2.done) break;
                _ref2 = _i2.value;
            }

            var prop = _ref2;

            if (prop == 'constructor') {
                if (!merged[prop]) {
                    merged[prop] = [];
                }
                merged[prop].push(mixin.prototype[prop]);
            } else {
                Mixed.prototype[prop] = mixin.prototype[prop];
            }
        }
    }
    return Mixed;
};

exports['default'] = mixins;
module.exports = exports['default'];
},{}],73:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            currentQueue[queueIndex].run();
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    clearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        setTimeout(drainQueue, 0);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],74:[function(require,module,exports){
(function (process,global){
 /*!
  * https://github.com/paulmillr/es6-shim
  * @license es6-shim Copyright 2013-2016 by Paul Miller (http://paulmillr.com)
  *   and contributors,  MIT License
  * es6-shim: v0.34.4
  * see https://github.com/paulmillr/es6-shim/blob/0.34.4/LICENSE
  * Details and documentation:
  * https://github.com/paulmillr/es6-shim/
  */

// UMD (Universal Module Definition)
// see https://github.com/umdjs/umd/blob/master/returnExports.js
(function (root, factory) {
  /*global define, module, exports */
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(factory);
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.returnExports = factory();
  }
}(this, function () {
  'use strict';

  var _apply = Function.call.bind(Function.apply);
  var _call = Function.call.bind(Function.call);
  var isArray = Array.isArray;
  var keys = Object.keys;

  var not = function notThunker(func) {
    return function notThunk() { return !_apply(func, this, arguments); };
  };
  var throwsError = function (func) {
    try {
      func();
      return false;
    } catch (e) {
      return true;
    }
  };
  var valueOrFalseIfThrows = function valueOrFalseIfThrows(func) {
    try {
      return func();
    } catch (e) {
      return false;
    }
  };

  var isCallableWithoutNew = not(throwsError);
  var arePropertyDescriptorsSupported = function () {
    // if Object.defineProperty exists but throws, it's IE 8
    return !throwsError(function () { Object.defineProperty({}, 'x', { get: function () {} }); });
  };
  var supportsDescriptors = !!Object.defineProperty && arePropertyDescriptorsSupported();
  var functionsHaveNames = (function foo() {}).name === 'foo';

  var _forEach = Function.call.bind(Array.prototype.forEach);
  var _reduce = Function.call.bind(Array.prototype.reduce);
  var _filter = Function.call.bind(Array.prototype.filter);
  var _some = Function.call.bind(Array.prototype.some);

  var defineProperty = function (object, name, value, force) {
    if (!force && name in object) { return; }
    if (supportsDescriptors) {
      Object.defineProperty(object, name, {
        configurable: true,
        enumerable: false,
        writable: true,
        value: value
      });
    } else {
      object[name] = value;
    }
  };

  // Define configurable, writable and non-enumerable props
  // if they don’t exist.
  var defineProperties = function (object, map, forceOverride) {
    _forEach(keys(map), function (name) {
      var method = map[name];
      defineProperty(object, name, method, !!forceOverride);
    });
  };

  var _toString = Function.call.bind(Object.prototype.toString);
  var isCallable = typeof /abc/ === 'function' ? function IsCallableSlow(x) {
    // Some old browsers (IE, FF) say that typeof /abc/ === 'function'
    return typeof x === 'function' && _toString(x) === '[object Function]';
  } : function IsCallableFast(x) { return typeof x === 'function'; };

  var Value = {
    getter: function (object, name, getter) {
      if (!supportsDescriptors) {
        throw new TypeError('getters require true ES5 support');
      }
      Object.defineProperty(object, name, {
        configurable: true,
        enumerable: false,
        get: getter
      });
    },
    proxy: function (originalObject, key, targetObject) {
      if (!supportsDescriptors) {
        throw new TypeError('getters require true ES5 support');
      }
      var originalDescriptor = Object.getOwnPropertyDescriptor(originalObject, key);
      Object.defineProperty(targetObject, key, {
        configurable: originalDescriptor.configurable,
        enumerable: originalDescriptor.enumerable,
        get: function getKey() { return originalObject[key]; },
        set: function setKey(value) { originalObject[key] = value; }
      });
    },
    redefine: function (object, property, newValue) {
      if (supportsDescriptors) {
        var descriptor = Object.getOwnPropertyDescriptor(object, property);
        descriptor.value = newValue;
        Object.defineProperty(object, property, descriptor);
      } else {
        object[property] = newValue;
      }
    },
    defineByDescriptor: function (object, property, descriptor) {
      if (supportsDescriptors) {
        Object.defineProperty(object, property, descriptor);
      } else if ('value' in descriptor) {
        object[property] = descriptor.value;
      }
    },
    preserveToString: function (target, source) {
      if (source && isCallable(source.toString)) {
        defineProperty(target, 'toString', source.toString.bind(source), true);
      }
    }
  };

  // Simple shim for Object.create on ES3 browsers
  // (unlike real shim, no attempt to support `prototype === null`)
  var create = Object.create || function (prototype, properties) {
    var Prototype = function Prototype() {};
    Prototype.prototype = prototype;
    var object = new Prototype();
    if (typeof properties !== 'undefined') {
      keys(properties).forEach(function (key) {
        Value.defineByDescriptor(object, key, properties[key]);
      });
    }
    return object;
  };

  var supportsSubclassing = function (C, f) {
    if (!Object.setPrototypeOf) { return false; /* skip test on IE < 11 */ }
    return valueOrFalseIfThrows(function () {
      var Sub = function Subclass(arg) {
        var o = new C(arg);
        Object.setPrototypeOf(o, Subclass.prototype);
        return o;
      };
      Object.setPrototypeOf(Sub, C);
      Sub.prototype = create(C.prototype, {
        constructor: { value: Sub }
      });
      return f(Sub);
    });
  };

  var getGlobal = function () {
    /* global self, window, global */
    // the only reliable means to get the global object is
    // `Function('return this')()`
    // However, this causes CSP violations in Chrome apps.
    if (typeof self !== 'undefined') { return self; }
    if (typeof window !== 'undefined') { return window; }
    if (typeof global !== 'undefined') { return global; }
    throw new Error('unable to locate global object');
  };

  var globals = getGlobal();
  var globalIsFinite = globals.isFinite;
  var _indexOf = Function.call.bind(String.prototype.indexOf);
  var _concat = Function.call.bind(Array.prototype.concat);
  var _sort = Function.call.bind(Array.prototype.sort);
  var _strSlice = Function.call.bind(String.prototype.slice);
  var _push = Function.call.bind(Array.prototype.push);
  var _pushApply = Function.apply.bind(Array.prototype.push);
  var _shift = Function.call.bind(Array.prototype.shift);
  var _max = Math.max;
  var _min = Math.min;
  var _floor = Math.floor;
  var _abs = Math.abs;
  var _log = Math.log;
  var _sqrt = Math.sqrt;
  var _hasOwnProperty = Function.call.bind(Object.prototype.hasOwnProperty);
  var ArrayIterator; // make our implementation private
  var noop = function () {};

  var Symbol = globals.Symbol || {};
  var symbolSpecies = Symbol.species || '@@species';

  var numberIsNaN = Number.isNaN || function isNaN(value) {
    // NaN !== NaN, but they are identical.
    // NaNs are the only non-reflexive value, i.e., if x !== x,
    // then x is NaN.
    // isNaN is broken: it converts its argument to number, so
    // isNaN('foo') => true
    return value !== value;
  };
  var numberIsFinite = Number.isFinite || function isFinite(value) {
    return typeof value === 'number' && globalIsFinite(value);
  };

  // taken directly from https://github.com/ljharb/is-arguments/blob/master/index.js
  // can be replaced with require('is-arguments') if we ever use a build process instead
  var isStandardArguments = function isArguments(value) {
    return _toString(value) === '[object Arguments]';
  };
  var isLegacyArguments = function isArguments(value) {
    return value !== null &&
      typeof value === 'object' &&
      typeof value.length === 'number' &&
      value.length >= 0 &&
      _toString(value) !== '[object Array]' &&
      _toString(value.callee) === '[object Function]';
  };
  var isArguments = isStandardArguments(arguments) ? isStandardArguments : isLegacyArguments;

  var Type = {
    primitive: function (x) { return x === null || (typeof x !== 'function' && typeof x !== 'object'); },
    object: function (x) { return x !== null && typeof x === 'object'; },
    string: function (x) { return _toString(x) === '[object String]'; },
    regex: function (x) { return _toString(x) === '[object RegExp]'; },
    symbol: function (x) {
      return typeof globals.Symbol === 'function' && typeof x === 'symbol';
    }
  };

  var overrideNative = function overrideNative(object, property, replacement) {
    var original = object[property];
    defineProperty(object, property, replacement, true);
    Value.preserveToString(object[property], original);
  };

  var hasSymbols = typeof Symbol === 'function' && typeof Symbol['for'] === 'function' && Type.symbol(Symbol());

  // This is a private name in the es6 spec, equal to '[Symbol.iterator]'
  // we're going to use an arbitrary _-prefixed name to make our shims
  // work properly with each other, even though we don't have full Iterator
  // support.  That is, `Array.from(map.keys())` will work, but we don't
  // pretend to export a "real" Iterator interface.
  var $iterator$ = Type.symbol(Symbol.iterator) ? Symbol.iterator : '_es6-shim iterator_';
  // Firefox ships a partial implementation using the name @@iterator.
  // https://bugzilla.mozilla.org/show_bug.cgi?id=907077#c14
  // So use that name if we detect it.
  if (globals.Set && typeof new globals.Set()['@@iterator'] === 'function') {
    $iterator$ = '@@iterator';
  }

  // Reflect
  if (!globals.Reflect) {
    defineProperty(globals, 'Reflect', {});
  }
  var Reflect = globals.Reflect;

  var $String = String;

  var ES = {
    // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-call-f-v-args
    Call: function Call(F, V) {
      var args = arguments.length > 2 ? arguments[2] : [];
      if (!ES.IsCallable(F)) {
        throw new TypeError(F + ' is not a function');
      }
      return _apply(F, V, args);
    },

    RequireObjectCoercible: function (x, optMessage) {
      /* jshint eqnull:true */
      if (x == null) {
        throw new TypeError(optMessage || 'Cannot call method on ' + x);
      }
      return x;
    },

    // This might miss the "(non-standard exotic and does not implement
    // [[Call]])" case from
    // http://www.ecma-international.org/ecma-262/6.0/#sec-typeof-operator-runtime-semantics-evaluation
    // but we can't find any evidence these objects exist in practice.
    // If we find some in the future, you could test `Object(x) === x`,
    // which is reliable according to
    // http://www.ecma-international.org/ecma-262/6.0/#sec-toobject
    // but is not well optimized by runtimes and creates an object
    // whenever it returns false, and thus is very slow.
    TypeIsObject: function (x) {
      if (x === void 0 || x === null || x === true || x === false) {
        return false;
      }
      return typeof x === 'function' || typeof x === 'object';
    },

    ToObject: function (o, optMessage) {
      return Object(ES.RequireObjectCoercible(o, optMessage));
    },

    IsCallable: isCallable,

    IsConstructor: function (x) {
      // We can't tell callables from constructors in ES5
      return ES.IsCallable(x);
    },

    ToInt32: function (x) {
      return ES.ToNumber(x) >> 0;
    },

    ToUint32: function (x) {
      return ES.ToNumber(x) >>> 0;
    },

    ToNumber: function (value) {
      if (_toString(value) === '[object Symbol]') {
        throw new TypeError('Cannot convert a Symbol value to a number');
      }
      return +value;
    },

    ToInteger: function (value) {
      var number = ES.ToNumber(value);
      if (numberIsNaN(number)) { return 0; }
      if (number === 0 || !numberIsFinite(number)) { return number; }
      return (number > 0 ? 1 : -1) * _floor(_abs(number));
    },

    ToLength: function (value) {
      var len = ES.ToInteger(value);
      if (len <= 0) { return 0; } // includes converting -0 to +0
      if (len > Number.MAX_SAFE_INTEGER) { return Number.MAX_SAFE_INTEGER; }
      return len;
    },

    SameValue: function (a, b) {
      if (a === b) {
        // 0 === -0, but they are not identical.
        if (a === 0) { return 1 / a === 1 / b; }
        return true;
      }
      return numberIsNaN(a) && numberIsNaN(b);
    },

    SameValueZero: function (a, b) {
      // same as SameValue except for SameValueZero(+0, -0) == true
      return (a === b) || (numberIsNaN(a) && numberIsNaN(b));
    },

    IsIterable: function (o) {
      return ES.TypeIsObject(o) && (typeof o[$iterator$] !== 'undefined' || isArguments(o));
    },

    GetIterator: function (o) {
      if (isArguments(o)) {
        // special case support for `arguments`
        return new ArrayIterator(o, 'value');
      }
      var itFn = ES.GetMethod(o, $iterator$);
      if (!ES.IsCallable(itFn)) {
        // Better diagnostics if itFn is null or undefined
        throw new TypeError('value is not an iterable');
      }
      var it = ES.Call(itFn, o);
      if (!ES.TypeIsObject(it)) {
        throw new TypeError('bad iterator');
      }
      return it;
    },

    GetMethod: function (o, p) {
      var func = ES.ToObject(o)[p];
      if (func === void 0 || func === null) {
        return void 0;
      }
      if (!ES.IsCallable(func)) {
        throw new TypeError('Method not callable: ' + p);
      }
      return func;
    },

    IteratorComplete: function (iterResult) {
      return !!(iterResult.done);
    },

    IteratorClose: function (iterator, completionIsThrow) {
      var returnMethod = ES.GetMethod(iterator, 'return');
      if (returnMethod === void 0) {
        return;
      }
      var innerResult, innerException;
      try {
        innerResult = ES.Call(returnMethod, iterator);
      } catch (e) {
        innerException = e;
      }
      if (completionIsThrow) {
        return;
      }
      if (innerException) {
        throw innerException;
      }
      if (!ES.TypeIsObject(innerResult)) {
        throw new TypeError("Iterator's return method returned a non-object.");
      }
    },

    IteratorNext: function (it) {
      var result = arguments.length > 1 ? it.next(arguments[1]) : it.next();
      if (!ES.TypeIsObject(result)) {
        throw new TypeError('bad iterator');
      }
      return result;
    },

    IteratorStep: function (it) {
      var result = ES.IteratorNext(it);
      var done = ES.IteratorComplete(result);
      return done ? false : result;
    },

    Construct: function (C, args, newTarget, isES6internal) {
      var target = typeof newTarget === 'undefined' ? C : newTarget;

      if (!isES6internal && Reflect.construct) {
        // Try to use Reflect.construct if available
        return Reflect.construct(C, args, target);
      }
      // OK, we have to fake it.  This will only work if the
      // C.[[ConstructorKind]] == "base" -- but that's the only
      // kind we can make in ES5 code anyway.

      // OrdinaryCreateFromConstructor(target, "%ObjectPrototype%")
      var proto = target.prototype;
      if (!ES.TypeIsObject(proto)) {
        proto = Object.prototype;
      }
      var obj = create(proto);
      // Call the constructor.
      var result = ES.Call(C, obj, args);
      return ES.TypeIsObject(result) ? result : obj;
    },

    SpeciesConstructor: function (O, defaultConstructor) {
      var C = O.constructor;
      if (C === void 0) {
        return defaultConstructor;
      }
      if (!ES.TypeIsObject(C)) {
        throw new TypeError('Bad constructor');
      }
      var S = C[symbolSpecies];
      if (S === void 0 || S === null) {
        return defaultConstructor;
      }
      if (!ES.IsConstructor(S)) {
        throw new TypeError('Bad @@species');
      }
      return S;
    },

    CreateHTML: function (string, tag, attribute, value) {
      var S = ES.ToString(string);
      var p1 = '<' + tag;
      if (attribute !== '') {
        var V = ES.ToString(value);
        var escapedV = V.replace(/"/g, '&quot;');
        p1 += ' ' + attribute + '="' + escapedV + '"';
      }
      var p2 = p1 + '>';
      var p3 = p2 + S;
      return p3 + '</' + tag + '>';
    },

    IsRegExp: function IsRegExp(argument) {
      if (!ES.TypeIsObject(argument)) {
        return false;
      }
      var isRegExp = argument[Symbol.match];
      if (typeof isRegExp !== 'undefined') {
        return !!isRegExp;
      }
      return Type.regex(argument);
    },

    ToString: function ToString(string) {
      return $String(string);
    }
  };

  // Well-known Symbol shims
  if (supportsDescriptors && hasSymbols) {
    var defineWellKnownSymbol = function defineWellKnownSymbol(name) {
      if (Type.symbol(Symbol[name])) {
        return Symbol[name];
      }
      var sym = Symbol['for']('Symbol.' + name);
      Object.defineProperty(Symbol, name, {
        configurable: false,
        enumerable: false,
        writable: false,
        value: sym
      });
      return sym;
    };
    if (!Type.symbol(Symbol.search)) {
      var symbolSearch = defineWellKnownSymbol('search');
      var originalSearch = String.prototype.search;
      defineProperty(RegExp.prototype, symbolSearch, function search(string) {
        return ES.Call(originalSearch, string, [this]);
      });
      var searchShim = function search(regexp) {
        var O = ES.RequireObjectCoercible(this);
        if (regexp !== null && typeof regexp !== 'undefined') {
          var searcher = ES.GetMethod(regexp, symbolSearch);
          if (typeof searcher !== 'undefined') {
            return ES.Call(searcher, regexp, [O]);
          }
        }
        return ES.Call(originalSearch, O, [ES.ToString(regexp)]);
      };
      overrideNative(String.prototype, 'search', searchShim);
    }
    if (!Type.symbol(Symbol.replace)) {
      var symbolReplace = defineWellKnownSymbol('replace');
      var originalReplace = String.prototype.replace;
      defineProperty(RegExp.prototype, symbolReplace, function replace(string, replaceValue) {
        return ES.Call(originalReplace, string, [this, replaceValue]);
      });
      var replaceShim = function replace(searchValue, replaceValue) {
        var O = ES.RequireObjectCoercible(this);
        if (searchValue !== null && typeof searchValue !== 'undefined') {
          var replacer = ES.GetMethod(searchValue, symbolReplace);
          if (typeof replacer !== 'undefined') {
            return ES.Call(replacer, searchValue, [O, replaceValue]);
          }
        }
        return ES.Call(originalReplace, O, [ES.ToString(searchValue), replaceValue]);
      };
      overrideNative(String.prototype, 'replace', replaceShim);
    }
    if (!Type.symbol(Symbol.split)) {
      var symbolSplit = defineWellKnownSymbol('split');
      var originalSplit = String.prototype.split;
      defineProperty(RegExp.prototype, symbolSplit, function split(string, limit) {
        return ES.Call(originalSplit, string, [this, limit]);
      });
      var splitShim = function split(separator, limit) {
        var O = ES.RequireObjectCoercible(this);
        if (separator !== null && typeof separator !== 'undefined') {
          var splitter = ES.GetMethod(separator, symbolSplit);
          if (typeof splitter !== 'undefined') {
            return ES.Call(splitter, separator, [O, limit]);
          }
        }
        return ES.Call(originalSplit, O, [ES.ToString(separator), limit]);
      };
      overrideNative(String.prototype, 'split', splitShim);
    }
    var symbolMatchExists = Type.symbol(Symbol.match);
    var stringMatchIgnoresSymbolMatch = symbolMatchExists && (function () {
      // Firefox 41, through Nightly 45 has Symbol.match, but String#match ignores it.
      // Firefox 40 and below have Symbol.match but String#match works fine.
      var o = {};
      o[Symbol.match] = function () { return 42; };
      return 'a'.match(o) !== 42;
    }());
    if (!symbolMatchExists || stringMatchIgnoresSymbolMatch) {
      var symbolMatch = defineWellKnownSymbol('match');

      var originalMatch = String.prototype.match;
      defineProperty(RegExp.prototype, symbolMatch, function match(string) {
        return ES.Call(originalMatch, string, [this]);
      });

      var matchShim = function match(regexp) {
        var O = ES.RequireObjectCoercible(this);
        if (regexp !== null && typeof regexp !== 'undefined') {
          var matcher = ES.GetMethod(regexp, symbolMatch);
          if (typeof matcher !== 'undefined') {
            return ES.Call(matcher, regexp, [O]);
          }
        }
        return ES.Call(originalMatch, O, [ES.ToString(regexp)]);
      };
      overrideNative(String.prototype, 'match', matchShim);
    }
  }

  var wrapConstructor = function wrapConstructor(original, replacement, keysToSkip) {
    Value.preserveToString(replacement, original);
    if (Object.setPrototypeOf) {
      // sets up proper prototype chain where possible
      Object.setPrototypeOf(original, replacement);
    }
    if (supportsDescriptors) {
      _forEach(Object.getOwnPropertyNames(original), function (key) {
        if (key in noop || keysToSkip[key]) { return; }
        Value.proxy(original, key, replacement);
      });
    } else {
      _forEach(Object.keys(original), function (key) {
        if (key in noop || keysToSkip[key]) { return; }
        replacement[key] = original[key];
      });
    }
    replacement.prototype = original.prototype;
    Value.redefine(original.prototype, 'constructor', replacement);
  };

  var defaultSpeciesGetter = function () { return this; };
  var addDefaultSpecies = function (C) {
    if (supportsDescriptors && !_hasOwnProperty(C, symbolSpecies)) {
      Value.getter(C, symbolSpecies, defaultSpeciesGetter);
    }
  };

  var addIterator = function (prototype, impl) {
    var implementation = impl || function iterator() { return this; };
    defineProperty(prototype, $iterator$, implementation);
    if (!prototype[$iterator$] && Type.symbol($iterator$)) {
      // implementations are buggy when $iterator$ is a Symbol
      prototype[$iterator$] = implementation;
    }
  };

  var createDataProperty = function createDataProperty(object, name, value) {
    if (supportsDescriptors) {
      Object.defineProperty(object, name, {
        configurable: true,
        enumerable: true,
        writable: true,
        value: value
      });
    } else {
      object[name] = value;
    }
  };
  var createDataPropertyOrThrow = function createDataPropertyOrThrow(object, name, value) {
    createDataProperty(object, name, value);
    if (!ES.SameValue(object[name], value)) {
      throw new TypeError('property is nonconfigurable');
    }
  };

  var emulateES6construct = function (o, defaultNewTarget, defaultProto, slots) {
    // This is an es5 approximation to es6 construct semantics.  in es6,
    // 'new Foo' invokes Foo.[[Construct]] which (for almost all objects)
    // just sets the internal variable NewTarget (in es6 syntax `new.target`)
    // to Foo and then returns Foo().

    // Many ES6 object then have constructors of the form:
    // 1. If NewTarget is undefined, throw a TypeError exception
    // 2. Let xxx by OrdinaryCreateFromConstructor(NewTarget, yyy, zzz)

    // So we're going to emulate those first two steps.
    if (!ES.TypeIsObject(o)) {
      throw new TypeError('Constructor requires `new`: ' + defaultNewTarget.name);
    }
    var proto = defaultNewTarget.prototype;
    if (!ES.TypeIsObject(proto)) {
      proto = defaultProto;
    }
    var obj = create(proto);
    for (var name in slots) {
      if (_hasOwnProperty(slots, name)) {
        var value = slots[name];
        defineProperty(obj, name, value, true);
      }
    }
    return obj;
  };

  // Firefox 31 reports this function's length as 0
  // https://bugzilla.mozilla.org/show_bug.cgi?id=1062484
  if (String.fromCodePoint && String.fromCodePoint.length !== 1) {
    var originalFromCodePoint = String.fromCodePoint;
    overrideNative(String, 'fromCodePoint', function fromCodePoint(codePoints) { return ES.Call(originalFromCodePoint, this, arguments); });
  }

  var StringShims = {
    fromCodePoint: function fromCodePoint(codePoints) {
      var result = [];
      var next;
      for (var i = 0, length = arguments.length; i < length; i++) {
        next = Number(arguments[i]);
        if (!ES.SameValue(next, ES.ToInteger(next)) || next < 0 || next > 0x10FFFF) {
          throw new RangeError('Invalid code point ' + next);
        }

        if (next < 0x10000) {
          _push(result, String.fromCharCode(next));
        } else {
          next -= 0x10000;
          _push(result, String.fromCharCode((next >> 10) + 0xD800));
          _push(result, String.fromCharCode((next % 0x400) + 0xDC00));
        }
      }
      return result.join('');
    },

    raw: function raw(callSite) {
      var cooked = ES.ToObject(callSite, 'bad callSite');
      var rawString = ES.ToObject(cooked.raw, 'bad raw value');
      var len = rawString.length;
      var literalsegments = ES.ToLength(len);
      if (literalsegments <= 0) {
        return '';
      }

      var stringElements = [];
      var nextIndex = 0;
      var nextKey, next, nextSeg, nextSub;
      while (nextIndex < literalsegments) {
        nextKey = ES.ToString(nextIndex);
        nextSeg = ES.ToString(rawString[nextKey]);
        _push(stringElements, nextSeg);
        if (nextIndex + 1 >= literalsegments) {
          break;
        }
        next = nextIndex + 1 < arguments.length ? arguments[nextIndex + 1] : '';
        nextSub = ES.ToString(next);
        _push(stringElements, nextSub);
        nextIndex += 1;
      }
      return stringElements.join('');
    }
  };
  if (String.raw && String.raw({ raw: { 0: 'x', 1: 'y', length: 2 } }) !== 'xy') {
    // IE 11 TP has a broken String.raw implementation
    overrideNative(String, 'raw', StringShims.raw);
  }
  defineProperties(String, StringShims);

  // Fast repeat, uses the `Exponentiation by squaring` algorithm.
  // Perf: http://jsperf.com/string-repeat2/2
  var stringRepeat = function repeat(s, times) {
    if (times < 1) { return ''; }
    if (times % 2) { return repeat(s, times - 1) + s; }
    var half = repeat(s, times / 2);
    return half + half;
  };
  var stringMaxLength = Infinity;

  var StringPrototypeShims = {
    repeat: function repeat(times) {
      var thisStr = ES.ToString(ES.RequireObjectCoercible(this));
      var numTimes = ES.ToInteger(times);
      if (numTimes < 0 || numTimes >= stringMaxLength) {
        throw new RangeError('repeat count must be less than infinity and not overflow maximum string size');
      }
      return stringRepeat(thisStr, numTimes);
    },

    startsWith: function startsWith(searchString) {
      var S = ES.ToString(ES.RequireObjectCoercible(this));
      if (ES.IsRegExp(searchString)) {
        throw new TypeError('Cannot call method "startsWith" with a regex');
      }
      var searchStr = ES.ToString(searchString);
      var position;
      if (arguments.length > 1) {
        position = arguments[1];
      }
      var start = _max(ES.ToInteger(position), 0);
      return _strSlice(S, start, start + searchStr.length) === searchStr;
    },

    endsWith: function endsWith(searchString) {
      var S = ES.ToString(ES.RequireObjectCoercible(this));
      if (ES.IsRegExp(searchString)) {
        throw new TypeError('Cannot call method "endsWith" with a regex');
      }
      var searchStr = ES.ToString(searchString);
      var len = S.length;
      var endPosition;
      if (arguments.length > 1) {
        endPosition = arguments[1];
      }
      var pos = typeof endPosition === 'undefined' ? len : ES.ToInteger(endPosition);
      var end = _min(_max(pos, 0), len);
      return _strSlice(S, end - searchStr.length, end) === searchStr;
    },

    includes: function includes(searchString) {
      if (ES.IsRegExp(searchString)) {
        throw new TypeError('"includes" does not accept a RegExp');
      }
      var searchStr = ES.ToString(searchString);
      var position;
      if (arguments.length > 1) {
        position = arguments[1];
      }
      // Somehow this trick makes method 100% compat with the spec.
      return _indexOf(this, searchStr, position) !== -1;
    },

    codePointAt: function codePointAt(pos) {
      var thisStr = ES.ToString(ES.RequireObjectCoercible(this));
      var position = ES.ToInteger(pos);
      var length = thisStr.length;
      if (position >= 0 && position < length) {
        var first = thisStr.charCodeAt(position);
        var isEnd = (position + 1 === length);
        if (first < 0xD800 || first > 0xDBFF || isEnd) { return first; }
        var second = thisStr.charCodeAt(position + 1);
        if (second < 0xDC00 || second > 0xDFFF) { return first; }
        return ((first - 0xD800) * 1024) + (second - 0xDC00) + 0x10000;
      }
    }
  };
  if (String.prototype.includes && 'a'.includes('a', Infinity) !== false) {
    overrideNative(String.prototype, 'includes', StringPrototypeShims.includes);
  }

  if (String.prototype.startsWith && String.prototype.endsWith) {
    var startsWithRejectsRegex = throwsError(function () {
      /* throws if spec-compliant */
      '/a/'.startsWith(/a/);
    });
    var startsWithHandlesInfinity = valueOrFalseIfThrows(function () {
      return 'abc'.startsWith('a', Infinity) === false;
    });
    if (!startsWithRejectsRegex || !startsWithHandlesInfinity) {
      // Firefox (< 37?) and IE 11 TP have a noncompliant startsWith implementation
      overrideNative(String.prototype, 'startsWith', StringPrototypeShims.startsWith);
      overrideNative(String.prototype, 'endsWith', StringPrototypeShims.endsWith);
    }
  }
  if (hasSymbols) {
    var startsWithSupportsSymbolMatch = valueOrFalseIfThrows(function () {
      var re = /a/;
      re[Symbol.match] = false;
      return '/a/'.startsWith(re);
    });
    if (!startsWithSupportsSymbolMatch) {
      overrideNative(String.prototype, 'startsWith', StringPrototypeShims.startsWith);
    }
    var endsWithSupportsSymbolMatch = valueOrFalseIfThrows(function () {
      var re = /a/;
      re[Symbol.match] = false;
      return '/a/'.endsWith(re);
    });
    if (!endsWithSupportsSymbolMatch) {
      overrideNative(String.prototype, 'endsWith', StringPrototypeShims.endsWith);
    }
    var includesSupportsSymbolMatch = valueOrFalseIfThrows(function () {
      var re = /a/;
      re[Symbol.match] = false;
      return '/a/'.includes(re);
    });
    if (!includesSupportsSymbolMatch) {
      overrideNative(String.prototype, 'includes', StringPrototypeShims.includes);
    }
  }

  defineProperties(String.prototype, StringPrototypeShims);

  // whitespace from: http://es5.github.io/#x15.5.4.20
  // implementation from https://github.com/es-shims/es5-shim/blob/v3.4.0/es5-shim.js#L1304-L1324
  var ws = [
    '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003',
    '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028',
    '\u2029\uFEFF'
  ].join('');
  var trimRegexp = new RegExp('(^[' + ws + ']+)|([' + ws + ']+$)', 'g');
  var trimShim = function trim() {
    return ES.ToString(ES.RequireObjectCoercible(this)).replace(trimRegexp, '');
  };
  var nonWS = ['\u0085', '\u200b', '\ufffe'].join('');
  var nonWSregex = new RegExp('[' + nonWS + ']', 'g');
  var isBadHexRegex = /^[\-+]0x[0-9a-f]+$/i;
  var hasStringTrimBug = nonWS.trim().length !== nonWS.length;
  defineProperty(String.prototype, 'trim', trimShim, hasStringTrimBug);

  // see https://people.mozilla.org/~jorendorff/es6-draft.html#sec-string.prototype-@@iterator
  var StringIterator = function (s) {
    ES.RequireObjectCoercible(s);
    this._s = ES.ToString(s);
    this._i = 0;
  };
  StringIterator.prototype.next = function () {
    var s = this._s, i = this._i;
    if (typeof s === 'undefined' || i >= s.length) {
      this._s = void 0;
      return { value: void 0, done: true };
    }
    var first = s.charCodeAt(i), second, len;
    if (first < 0xD800 || first > 0xDBFF || (i + 1) === s.length) {
      len = 1;
    } else {
      second = s.charCodeAt(i + 1);
      len = (second < 0xDC00 || second > 0xDFFF) ? 1 : 2;
    }
    this._i = i + len;
    return { value: s.substr(i, len), done: false };
  };
  addIterator(StringIterator.prototype);
  addIterator(String.prototype, function () {
    return new StringIterator(this);
  });

  var ArrayShims = {
    from: function from(items) {
      var C = this;
      var mapFn;
      if (arguments.length > 1) {
        mapFn = arguments[1];
      }
      var mapping, T;
      if (typeof mapFn === 'undefined') {
        mapping = false;
      } else {
        if (!ES.IsCallable(mapFn)) {
          throw new TypeError('Array.from: when provided, the second argument must be a function');
        }
        if (arguments.length > 2) {
          T = arguments[2];
        }
        mapping = true;
      }

      // Note that that Arrays will use ArrayIterator:
      // https://bugs.ecmascript.org/show_bug.cgi?id=2416
      var usingIterator = typeof (isArguments(items) || ES.GetMethod(items, $iterator$)) !== 'undefined';

      var length, result, i;
      if (usingIterator) {
        result = ES.IsConstructor(C) ? Object(new C()) : [];
        var iterator = ES.GetIterator(items);
        var next, nextValue;

        i = 0;
        while (true) {
          next = ES.IteratorStep(iterator);
          if (next === false) {
            break;
          }
          nextValue = next.value;
          try {
            if (mapping) {
              nextValue = typeof T === 'undefined' ? mapFn(nextValue, i) : _call(mapFn, T, nextValue, i);
            }
            result[i] = nextValue;
          } catch (e) {
            ES.IteratorClose(iterator, true);
            throw e;
          }
          i += 1;
        }
        length = i;
      } else {
        var arrayLike = ES.ToObject(items);
        length = ES.ToLength(arrayLike.length);
        result = ES.IsConstructor(C) ? Object(new C(length)) : new Array(length);
        var value;
        for (i = 0; i < length; ++i) {
          value = arrayLike[i];
          if (mapping) {
            value = typeof T === 'undefined' ? mapFn(value, i) : _call(mapFn, T, value, i);
          }
          result[i] = value;
        }
      }

      result.length = length;
      return result;
    },

    of: function of() {
      var len = arguments.length;
      var C = this;
      var A = isArray(C) || !ES.IsCallable(C) ? new Array(len) : ES.Construct(C, [len]);
      for (var k = 0; k < len; ++k) {
        createDataPropertyOrThrow(A, k, arguments[k]);
      }
      A.length = len;
      return A;
    }
  };
  defineProperties(Array, ArrayShims);
  addDefaultSpecies(Array);

  // Given an argument x, it will return an IteratorResult object,
  // with value set to x and done to false.
  // Given no arguments, it will return an iterator completion object.
  var iteratorResult = function (x) {
    return { value: x, done: arguments.length === 0 };
  };

  // Our ArrayIterator is private; see
  // https://github.com/paulmillr/es6-shim/issues/252
  ArrayIterator = function (array, kind) {
      this.i = 0;
      this.array = array;
      this.kind = kind;
  };

  defineProperties(ArrayIterator.prototype, {
    next: function () {
      var i = this.i, array = this.array;
      if (!(this instanceof ArrayIterator)) {
        throw new TypeError('Not an ArrayIterator');
      }
      if (typeof array !== 'undefined') {
        var len = ES.ToLength(array.length);
        for (; i < len; i++) {
          var kind = this.kind;
          var retval;
          if (kind === 'key') {
            retval = i;
          } else if (kind === 'value') {
            retval = array[i];
          } else if (kind === 'entry') {
            retval = [i, array[i]];
          }
          this.i = i + 1;
          return { value: retval, done: false };
        }
      }
      this.array = void 0;
      return { value: void 0, done: true };
    }
  });
  addIterator(ArrayIterator.prototype);

  var orderKeys = function orderKeys(a, b) {
    var aNumeric = String(ES.ToInteger(a)) === a;
    var bNumeric = String(ES.ToInteger(b)) === b;
    if (aNumeric && bNumeric) {
      return b - a;
    } else if (aNumeric && !bNumeric) {
      return -1;
    } else if (!aNumeric && bNumeric) {
      return 1;
    } else {
      return a.localeCompare(b);
    }
  };
  var getAllKeys = function getAllKeys(object) {
    var ownKeys = [];
    var keys = [];

    for (var key in object) {
      _push(_hasOwnProperty(object, key) ? ownKeys : keys, key);
    }
    _sort(ownKeys, orderKeys);
    _sort(keys, orderKeys);

    return _concat(ownKeys, keys);
  };

  var ObjectIterator = function (object, kind) {
    defineProperties(this, {
      object: object,
      array: getAllKeys(object),
      kind: kind
    });
  };

  defineProperties(ObjectIterator.prototype, {
    next: function next() {
      var key;
      var array = this.array;

      if (!(this instanceof ObjectIterator)) {
        throw new TypeError('Not an ObjectIterator');
      }

      // Find next key in the object
      while (array.length > 0) {
        key = _shift(array);

        // The candidate key isn't defined on object.
        // Must have been deleted, or object[[Prototype]]
        // has been modified.
        if (!(key in this.object)) {
          continue;
        }

        if (this.kind === 'key') {
          return iteratorResult(key);
        } else if (this.kind === 'value') {
          return iteratorResult(this.object[key]);
        } else {
          return iteratorResult([key, this.object[key]]);
        }
      }

      return iteratorResult();
    }
  });
  addIterator(ObjectIterator.prototype);

  // note: this is positioned here because it depends on ArrayIterator
  var arrayOfSupportsSubclassing = Array.of === ArrayShims.of || (function () {
    // Detects a bug in Webkit nightly r181886
    var Foo = function Foo(len) { this.length = len; };
    Foo.prototype = [];
    var fooArr = Array.of.apply(Foo, [1, 2]);
    return fooArr instanceof Foo && fooArr.length === 2;
  }());
  if (!arrayOfSupportsSubclassing) {
    overrideNative(Array, 'of', ArrayShims.of);
  }

  var ArrayPrototypeShims = {
    copyWithin: function copyWithin(target, start) {
      var o = ES.ToObject(this);
      var len = ES.ToLength(o.length);
      var relativeTarget = ES.ToInteger(target);
      var relativeStart = ES.ToInteger(start);
      var to = relativeTarget < 0 ? _max(len + relativeTarget, 0) : _min(relativeTarget, len);
      var from = relativeStart < 0 ? _max(len + relativeStart, 0) : _min(relativeStart, len);
      var end;
      if (arguments.length > 2) {
        end = arguments[2];
      }
      var relativeEnd = typeof end === 'undefined' ? len : ES.ToInteger(end);
      var finalItem = relativeEnd < 0 ? _max(len + relativeEnd, 0) : _min(relativeEnd, len);
      var count = _min(finalItem - from, len - to);
      var direction = 1;
      if (from < to && to < (from + count)) {
        direction = -1;
        from += count - 1;
        to += count - 1;
      }
      while (count > 0) {
        if (from in o) {
          o[to] = o[from];
        } else {
          delete o[to];
        }
        from += direction;
        to += direction;
        count -= 1;
      }
      return o;
    },

    fill: function fill(value) {
      var start;
      if (arguments.length > 1) {
        start = arguments[1];
      }
      var end;
      if (arguments.length > 2) {
        end = arguments[2];
      }
      var O = ES.ToObject(this);
      var len = ES.ToLength(O.length);
      start = ES.ToInteger(typeof start === 'undefined' ? 0 : start);
      end = ES.ToInteger(typeof end === 'undefined' ? len : end);

      var relativeStart = start < 0 ? _max(len + start, 0) : _min(start, len);
      var relativeEnd = end < 0 ? len + end : end;

      for (var i = relativeStart; i < len && i < relativeEnd; ++i) {
        O[i] = value;
      }
      return O;
    },

    find: function find(predicate) {
      var list = ES.ToObject(this);
      var length = ES.ToLength(list.length);
      if (!ES.IsCallable(predicate)) {
        throw new TypeError('Array#find: predicate must be a function');
      }
      var thisArg = arguments.length > 1 ? arguments[1] : null;
      for (var i = 0, value; i < length; i++) {
        value = list[i];
        if (thisArg) {
          if (_call(predicate, thisArg, value, i, list)) { return value; }
        } else if (predicate(value, i, list)) {
          return value;
        }
      }
    },

    findIndex: function findIndex(predicate) {
      var list = ES.ToObject(this);
      var length = ES.ToLength(list.length);
      if (!ES.IsCallable(predicate)) {
        throw new TypeError('Array#findIndex: predicate must be a function');
      }
      var thisArg = arguments.length > 1 ? arguments[1] : null;
      for (var i = 0; i < length; i++) {
        if (thisArg) {
          if (_call(predicate, thisArg, list[i], i, list)) { return i; }
        } else if (predicate(list[i], i, list)) {
          return i;
        }
      }
      return -1;
    },

    keys: function keys() {
      return new ArrayIterator(this, 'key');
    },

    values: function values() {
      return new ArrayIterator(this, 'value');
    },

    entries: function entries() {
      return new ArrayIterator(this, 'entry');
    }
  };
  // Safari 7.1 defines Array#keys and Array#entries natively,
  // but the resulting ArrayIterator objects don't have a "next" method.
  if (Array.prototype.keys && !ES.IsCallable([1].keys().next)) {
    delete Array.prototype.keys;
  }
  if (Array.prototype.entries && !ES.IsCallable([1].entries().next)) {
    delete Array.prototype.entries;
  }

  // Chrome 38 defines Array#keys and Array#entries, and Array#@@iterator, but not Array#values
  if (Array.prototype.keys && Array.prototype.entries && !Array.prototype.values && Array.prototype[$iterator$]) {
    defineProperties(Array.prototype, {
      values: Array.prototype[$iterator$]
    });
    if (Type.symbol(Symbol.unscopables)) {
      Array.prototype[Symbol.unscopables].values = true;
    }
  }
  // Chrome 40 defines Array#values with the incorrect name, although Array#{keys,entries} have the correct name
  if (functionsHaveNames && Array.prototype.values && Array.prototype.values.name !== 'values') {
    var originalArrayPrototypeValues = Array.prototype.values;
    overrideNative(Array.prototype, 'values', function values() { return ES.Call(originalArrayPrototypeValues, this, arguments); });
    defineProperty(Array.prototype, $iterator$, Array.prototype.values, true);
  }
  defineProperties(Array.prototype, ArrayPrototypeShims);

  addIterator(Array.prototype, function () { return this.values(); });
  // Chrome defines keys/values/entries on Array, but doesn't give us
  // any way to identify its iterator.  So add our own shimmed field.
  if (Object.getPrototypeOf) {
    addIterator(Object.getPrototypeOf([].values()));
  }

  // note: this is positioned here because it relies on Array#entries
  var arrayFromSwallowsNegativeLengths = (function () {
    // Detects a Firefox bug in v32
    // https://bugzilla.mozilla.org/show_bug.cgi?id=1063993
    return valueOrFalseIfThrows(function () { return Array.from({ length: -1 }).length === 0; });
  }());
  var arrayFromHandlesIterables = (function () {
    // Detects a bug in Webkit nightly r181886
    var arr = Array.from([0].entries());
    return arr.length === 1 && isArray(arr[0]) && arr[0][0] === 0 && arr[0][1] === 0;
  }());
  if (!arrayFromSwallowsNegativeLengths || !arrayFromHandlesIterables) {
    overrideNative(Array, 'from', ArrayShims.from);
  }
  var arrayFromHandlesUndefinedMapFunction = (function () {
    // Microsoft Edge v0.11 throws if the mapFn argument is *provided* but undefined,
    // but the spec doesn't care if it's provided or not - undefined doesn't throw.
    return valueOrFalseIfThrows(function () { return Array.from([0], void 0); });
  }());
  if (!arrayFromHandlesUndefinedMapFunction) {
    var origArrayFrom = Array.from;
    overrideNative(Array, 'from', function from(items) {
      if (arguments.length > 1 && typeof arguments[1] !== 'undefined') {
        return ES.Call(origArrayFrom, this, arguments);
      } else {
        return _call(origArrayFrom, this, items);
      }
    });
  }

  var int32sAsOne = -(Math.pow(2, 32) - 1);
  var toLengthsCorrectly = function (method, reversed) {
    var obj = { length: int32sAsOne };
    obj[reversed ? ((obj.length >>> 0) - 1) : 0] = true;
    return valueOrFalseIfThrows(function () {
      _call(method, obj, function () {
        // note: in nonconforming browsers, this will be called
        // -1 >>> 0 times, which is 4294967295, so the throw matters.
        throw new RangeError('should not reach here');
      }, []);
      return true;
    });
  };
  if (!toLengthsCorrectly(Array.prototype.forEach)) {
    var originalForEach = Array.prototype.forEach;
    overrideNative(Array.prototype, 'forEach', function forEach(callbackFn) {
      return ES.Call(originalForEach, this.length >= 0 ? this : [], arguments);
    }, true);
  }
  if (!toLengthsCorrectly(Array.prototype.map)) {
    var originalMap = Array.prototype.map;
    overrideNative(Array.prototype, 'map', function map(callbackFn) {
      return ES.Call(originalMap, this.length >= 0 ? this : [], arguments);
    }, true);
  }
  if (!toLengthsCorrectly(Array.prototype.filter)) {
    var originalFilter = Array.prototype.filter;
    overrideNative(Array.prototype, 'filter', function filter(callbackFn) {
      return ES.Call(originalFilter, this.length >= 0 ? this : [], arguments);
    }, true);
  }
  if (!toLengthsCorrectly(Array.prototype.some)) {
    var originalSome = Array.prototype.some;
    overrideNative(Array.prototype, 'some', function some(callbackFn) {
      return ES.Call(originalSome, this.length >= 0 ? this : [], arguments);
    }, true);
  }
  if (!toLengthsCorrectly(Array.prototype.every)) {
    var originalEvery = Array.prototype.every;
    overrideNative(Array.prototype, 'every', function every(callbackFn) {
      return ES.Call(originalEvery, this.length >= 0 ? this : [], arguments);
    }, true);
  }
  if (!toLengthsCorrectly(Array.prototype.reduce)) {
    var originalReduce = Array.prototype.reduce;
    overrideNative(Array.prototype, 'reduce', function reduce(callbackFn) {
      return ES.Call(originalReduce, this.length >= 0 ? this : [], arguments);
    }, true);
  }
  if (!toLengthsCorrectly(Array.prototype.reduceRight, true)) {
    var originalReduceRight = Array.prototype.reduceRight;
    overrideNative(Array.prototype, 'reduceRight', function reduceRight(callbackFn) {
      return ES.Call(originalReduceRight, this.length >= 0 ? this : [], arguments);
    }, true);
  }

  var lacksOctalSupport = Number('0o10') !== 8;
  var lacksBinarySupport = Number('0b10') !== 2;
  var trimsNonWhitespace = _some(nonWS, function (c) {
    return Number(c + 0 + c) === 0;
  });
  if (lacksOctalSupport || lacksBinarySupport || trimsNonWhitespace) {
    var OrigNumber = Number;
    var binaryRegex = /^0b[01]+$/i;
    var octalRegex = /^0o[0-7]+$/i;
    // Note that in IE 8, RegExp.prototype.test doesn't seem to exist: ie, "test" is an own property of regexes. wtf.
    var isBinary = binaryRegex.test.bind(binaryRegex);
    var isOctal = octalRegex.test.bind(octalRegex);
    var toPrimitive = function (O) { // need to replace this with `es-to-primitive/es6`
      var result;
      if (typeof O.valueOf === 'function') {
        result = O.valueOf();
        if (Type.primitive(result)) {
          return result;
        }
      }
      if (typeof O.toString === 'function') {
        result = O.toString();
        if (Type.primitive(result)) {
          return result;
        }
      }
      throw new TypeError('No default value');
    };
    var hasNonWS = nonWSregex.test.bind(nonWSregex);
    var isBadHex = isBadHexRegex.test.bind(isBadHexRegex);
    var NumberShim = (function () {
      // this is wrapped in an IIFE because of IE 6-8's wacky scoping issues with named function expressions.
      var NumberShim = function Number(value) {
        var primValue;
        if (arguments.length > 0) {
          primValue = Type.primitive(value) ? value : toPrimitive(value, 'number');
        } else {
          primValue = 0;
        }
        if (typeof primValue === 'string') {
          primValue = ES.Call(trimShim, primValue);
          if (isBinary(primValue)) {
            primValue = parseInt(_strSlice(primValue, 2), 2);
          } else if (isOctal(primValue)) {
            primValue = parseInt(_strSlice(primValue, 2), 8);
          } else if (hasNonWS(primValue) || isBadHex(primValue)) {
            primValue = NaN;
          }
        }
        var receiver = this;
        var valueOfSucceeds = valueOrFalseIfThrows(function () {
          OrigNumber.prototype.valueOf.call(receiver);
          return true;
        });
        if (receiver instanceof NumberShim && !valueOfSucceeds) {
          return new OrigNumber(primValue);
        }
        /* jshint newcap: false */
        return OrigNumber(primValue);
        /* jshint newcap: true */
      };
      return NumberShim;
    }());
    wrapConstructor(OrigNumber, NumberShim, {});
    // this is necessary for ES3 browsers, where these properties are non-enumerable.
    defineProperties(NumberShim, {
      NaN: OrigNumber.NaN,
      MAX_VALUE: OrigNumber.MAX_VALUE,
      MIN_VALUE: OrigNumber.MIN_VALUE,
      NEGATIVE_INFINITY: OrigNumber.NEGATIVE_INFINITY,
      POSITIVE_INFINITY: OrigNumber.POSITIVE_INFINITY
    });
    /* globals Number: true */
    /* eslint-disable no-undef */
    /* jshint -W020 */
    Number = NumberShim;
    Value.redefine(globals, 'Number', NumberShim);
    /* jshint +W020 */
    /* eslint-enable no-undef */
    /* globals Number: false */
  }

  var maxSafeInteger = Math.pow(2, 53) - 1;
  defineProperties(Number, {
    MAX_SAFE_INTEGER: maxSafeInteger,
    MIN_SAFE_INTEGER: -maxSafeInteger,
    EPSILON: 2.220446049250313e-16,

    parseInt: globals.parseInt,
    parseFloat: globals.parseFloat,

    isFinite: numberIsFinite,

    isInteger: function isInteger(value) {
      return numberIsFinite(value) && ES.ToInteger(value) === value;
    },

    isSafeInteger: function isSafeInteger(value) {
      return Number.isInteger(value) && _abs(value) <= Number.MAX_SAFE_INTEGER;
    },

    isNaN: numberIsNaN
  });
  // Firefox 37 has a conforming Number.parseInt, but it's not === to the global parseInt (fixed in v40)
  defineProperty(Number, 'parseInt', globals.parseInt, Number.parseInt !== globals.parseInt);

  // Work around bugs in Array#find and Array#findIndex -- early
  // implementations skipped holes in sparse arrays. (Note that the
  // implementations of find/findIndex indirectly use shimmed
  // methods of Number, so this test has to happen down here.)
  /*jshint elision: true */
  /* eslint-disable no-sparse-arrays */
  if (![, 1].find(function (item, idx) { return idx === 0; })) {
    overrideNative(Array.prototype, 'find', ArrayPrototypeShims.find);
  }
  if ([, 1].findIndex(function (item, idx) { return idx === 0; }) !== 0) {
    overrideNative(Array.prototype, 'findIndex', ArrayPrototypeShims.findIndex);
  }
  /* eslint-enable no-sparse-arrays */
  /*jshint elision: false */

  var isEnumerableOn = Function.bind.call(Function.bind, Object.prototype.propertyIsEnumerable);
  var ensureEnumerable = function ensureEnumerable(obj, prop) {
    if (supportsDescriptors && isEnumerableOn(obj, prop)) {
      Object.defineProperty(obj, prop, { enumerable: false });
    }
  };
  var sliceArgs = function sliceArgs() {
    // per https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#32-leaking-arguments
    // and https://gist.github.com/WebReflection/4327762cb87a8c634a29
    var initial = Number(this);
    var len = arguments.length;
    var desiredArgCount = len - initial;
    var args = new Array(desiredArgCount < 0 ? 0 : desiredArgCount);
    for (var i = initial; i < len; ++i) {
      args[i - initial] = arguments[i];
    }
    return args;
  };
  var assignTo = function assignTo(source) {
    return function assignToSource(target, key) {
      target[key] = source[key];
      return target;
    };
  };
  var assignReducer = function (target, source) {
    var sourceKeys = keys(Object(source));
    var symbols;
    if (ES.IsCallable(Object.getOwnPropertySymbols)) {
      symbols = _filter(Object.getOwnPropertySymbols(Object(source)), isEnumerableOn(source));
    }
    return _reduce(_concat(sourceKeys, symbols || []), assignTo(source), target);
  };

  var ObjectShims = {
    // 19.1.3.1
    assign: function (target, source) {
      var to = ES.ToObject(target, 'Cannot convert undefined or null to object');
      return _reduce(ES.Call(sliceArgs, 1, arguments), assignReducer, to);
    },

    // Added in WebKit in https://bugs.webkit.org/show_bug.cgi?id=143865
    is: function is(a, b) {
      return ES.SameValue(a, b);
    }
  };
  var assignHasPendingExceptions = Object.assign && Object.preventExtensions && (function () {
    // Firefox 37 still has "pending exception" logic in its Object.assign implementation,
    // which is 72% slower than our shim, and Firefox 40's native implementation.
    var thrower = Object.preventExtensions({ 1: 2 });
    try {
      Object.assign(thrower, 'xy');
    } catch (e) {
      return thrower[1] === 'y';
    }
  }());
  if (assignHasPendingExceptions) {
    overrideNative(Object, 'assign', ObjectShims.assign);
  }
  defineProperties(Object, ObjectShims);

  if (supportsDescriptors) {
    var ES5ObjectShims = {
      // 19.1.3.9
      // shim from https://gist.github.com/WebReflection/5593554
      setPrototypeOf: (function (Object, magic) {
        var set;

        var checkArgs = function (O, proto) {
          if (!ES.TypeIsObject(O)) {
            throw new TypeError('cannot set prototype on a non-object');
          }
          if (!(proto === null || ES.TypeIsObject(proto))) {
            throw new TypeError('can only set prototype to an object or null' + proto);
          }
        };

        var setPrototypeOf = function (O, proto) {
          checkArgs(O, proto);
          _call(set, O, proto);
          return O;
        };

        try {
          // this works already in Firefox and Safari
          set = Object.getOwnPropertyDescriptor(Object.prototype, magic).set;
          _call(set, {}, null);
        } catch (e) {
          if (Object.prototype !== {}[magic]) {
            // IE < 11 cannot be shimmed
            return;
          }
          // probably Chrome or some old Mobile stock browser
          set = function (proto) {
            this[magic] = proto;
          };
          // please note that this will **not** work
          // in those browsers that do not inherit
          // __proto__ by mistake from Object.prototype
          // in these cases we should probably throw an error
          // or at least be informed about the issue
          setPrototypeOf.polyfill = setPrototypeOf(
            setPrototypeOf({}, null),
            Object.prototype
          ) instanceof Object;
          // setPrototypeOf.polyfill === true means it works as meant
          // setPrototypeOf.polyfill === false means it's not 100% reliable
          // setPrototypeOf.polyfill === undefined
          // or
          // setPrototypeOf.polyfill ==  null means it's not a polyfill
          // which means it works as expected
          // we can even delete Object.prototype.__proto__;
        }
        return setPrototypeOf;
      }(Object, '__proto__'))
    };

    defineProperties(Object, ES5ObjectShims);
  }

  // Workaround bug in Opera 12 where setPrototypeOf(x, null) doesn't work,
  // but Object.create(null) does.
  if (Object.setPrototypeOf && Object.getPrototypeOf &&
      Object.getPrototypeOf(Object.setPrototypeOf({}, null)) !== null &&
      Object.getPrototypeOf(Object.create(null)) === null) {
    (function () {
      var FAKENULL = Object.create(null);
      var gpo = Object.getPrototypeOf, spo = Object.setPrototypeOf;
      Object.getPrototypeOf = function (o) {
        var result = gpo(o);
        return result === FAKENULL ? null : result;
      };
      Object.setPrototypeOf = function (o, p) {
        var proto = p === null ? FAKENULL : p;
        return spo(o, proto);
      };
      Object.setPrototypeOf.polyfill = false;
    }());
  }

  var objectKeysAcceptsPrimitives = !throwsError(function () { Object.keys('foo'); });
  if (!objectKeysAcceptsPrimitives) {
    var originalObjectKeys = Object.keys;
    overrideNative(Object, 'keys', function keys(value) {
      return originalObjectKeys(ES.ToObject(value));
    });
    keys = Object.keys;
  }

  if (Object.getOwnPropertyNames) {
    var objectGOPNAcceptsPrimitives = !throwsError(function () { Object.getOwnPropertyNames('foo'); });
    if (!objectGOPNAcceptsPrimitives) {
      var cachedWindowNames = typeof window === 'object' ? Object.getOwnPropertyNames(window) : [];
      var originalObjectGetOwnPropertyNames = Object.getOwnPropertyNames;
      overrideNative(Object, 'getOwnPropertyNames', function getOwnPropertyNames(value) {
        var val = ES.ToObject(value);
        if (_toString(val) === '[object Window]') {
          try {
            return originalObjectGetOwnPropertyNames(val);
          } catch (e) {
            // IE bug where layout engine calls userland gOPN for cross-domain `window` objects
            return _concat([], cachedWindowNames);
          }
        }
        return originalObjectGetOwnPropertyNames(val);
      });
    }
  }
  if (Object.getOwnPropertyDescriptor) {
    var objectGOPDAcceptsPrimitives = !throwsError(function () { Object.getOwnPropertyDescriptor('foo', 'bar'); });
    if (!objectGOPDAcceptsPrimitives) {
      var originalObjectGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
      overrideNative(Object, 'getOwnPropertyDescriptor', function getOwnPropertyDescriptor(value, property) {
        return originalObjectGetOwnPropertyDescriptor(ES.ToObject(value), property);
      });
    }
  }
  if (Object.seal) {
    var objectSealAcceptsPrimitives = !throwsError(function () { Object.seal('foo'); });
    if (!objectSealAcceptsPrimitives) {
      var originalObjectSeal = Object.seal;
      overrideNative(Object, 'seal', function seal(value) {
        if (!Type.object(value)) { return value; }
        return originalObjectSeal(value);
      });
    }
  }
  if (Object.isSealed) {
    var objectIsSealedAcceptsPrimitives = !throwsError(function () { Object.isSealed('foo'); });
    if (!objectIsSealedAcceptsPrimitives) {
      var originalObjectIsSealed = Object.isSealed;
      overrideNative(Object, 'isSealed', function isSealed(value) {
        if (!Type.object(value)) { return true; }
        return originalObjectIsSealed(value);
      });
    }
  }
  if (Object.freeze) {
    var objectFreezeAcceptsPrimitives = !throwsError(function () { Object.freeze('foo'); });
    if (!objectFreezeAcceptsPrimitives) {
      var originalObjectFreeze = Object.freeze;
      overrideNative(Object, 'freeze', function freeze(value) {
        if (!Type.object(value)) { return value; }
        return originalObjectFreeze(value);
      });
    }
  }
  if (Object.isFrozen) {
    var objectIsFrozenAcceptsPrimitives = !throwsError(function () { Object.isFrozen('foo'); });
    if (!objectIsFrozenAcceptsPrimitives) {
      var originalObjectIsFrozen = Object.isFrozen;
      overrideNative(Object, 'isFrozen', function isFrozen(value) {
        if (!Type.object(value)) { return true; }
        return originalObjectIsFrozen(value);
      });
    }
  }
  if (Object.preventExtensions) {
    var objectPreventExtensionsAcceptsPrimitives = !throwsError(function () { Object.preventExtensions('foo'); });
    if (!objectPreventExtensionsAcceptsPrimitives) {
      var originalObjectPreventExtensions = Object.preventExtensions;
      overrideNative(Object, 'preventExtensions', function preventExtensions(value) {
        if (!Type.object(value)) { return value; }
        return originalObjectPreventExtensions(value);
      });
    }
  }
  if (Object.isExtensible) {
    var objectIsExtensibleAcceptsPrimitives = !throwsError(function () { Object.isExtensible('foo'); });
    if (!objectIsExtensibleAcceptsPrimitives) {
      var originalObjectIsExtensible = Object.isExtensible;
      overrideNative(Object, 'isExtensible', function isExtensible(value) {
        if (!Type.object(value)) { return false; }
        return originalObjectIsExtensible(value);
      });
    }
  }
  if (Object.getPrototypeOf) {
    var objectGetProtoAcceptsPrimitives = !throwsError(function () { Object.getPrototypeOf('foo'); });
    if (!objectGetProtoAcceptsPrimitives) {
      var originalGetProto = Object.getPrototypeOf;
      overrideNative(Object, 'getPrototypeOf', function getPrototypeOf(value) {
        return originalGetProto(ES.ToObject(value));
      });
    }
  }

  var hasFlags = supportsDescriptors && (function () {
    var desc = Object.getOwnPropertyDescriptor(RegExp.prototype, 'flags');
    return desc && ES.IsCallable(desc.get);
  }());
  if (supportsDescriptors && !hasFlags) {
    var regExpFlagsGetter = function flags() {
      if (!ES.TypeIsObject(this)) {
        throw new TypeError('Method called on incompatible type: must be an object.');
      }
      var result = '';
      if (this.global) {
        result += 'g';
      }
      if (this.ignoreCase) {
        result += 'i';
      }
      if (this.multiline) {
        result += 'm';
      }
      if (this.unicode) {
        result += 'u';
      }
      if (this.sticky) {
        result += 'y';
      }
      return result;
    };

    Value.getter(RegExp.prototype, 'flags', regExpFlagsGetter);
  }

  var regExpSupportsFlagsWithRegex = supportsDescriptors && valueOrFalseIfThrows(function () {
    return String(new RegExp(/a/g, 'i')) === '/a/i';
  });
  var regExpNeedsToSupportSymbolMatch = hasSymbols && supportsDescriptors && (function () {
    // Edge 0.12 supports flags fully, but does not support Symbol.match
    var regex = /./;
    regex[Symbol.match] = false;
    return RegExp(regex) === regex;
  }());

  if (supportsDescriptors && (!regExpSupportsFlagsWithRegex || regExpNeedsToSupportSymbolMatch)) {
    var flagsGetter = Object.getOwnPropertyDescriptor(RegExp.prototype, 'flags').get;
    var sourceDesc = Object.getOwnPropertyDescriptor(RegExp.prototype, 'source') || {};
    var legacySourceGetter = function () { return this.source; }; // prior to it being a getter, it's own + nonconfigurable
    var sourceGetter = ES.IsCallable(sourceDesc.get) ? sourceDesc.get : legacySourceGetter;

    var OrigRegExp = RegExp;
    var RegExpShim = (function () {
      return function RegExp(pattern, flags) {
        var patternIsRegExp = ES.IsRegExp(pattern);
        var calledWithNew = this instanceof RegExp;
        if (!calledWithNew && patternIsRegExp && typeof flags === 'undefined' && pattern.constructor === RegExp) {
          return pattern;
        }

        var P = pattern;
        var F = flags;
        if (Type.regex(pattern)) {
          P = ES.Call(sourceGetter, pattern);
          F = typeof flags === 'undefined' ? ES.Call(flagsGetter, pattern) : flags;
          return new RegExp(P, F);
        } else if (patternIsRegExp) {
          P = pattern.source;
          F = typeof flags === 'undefined' ? pattern.flags : flags;
        }
        return new OrigRegExp(pattern, flags);
      };
    }());
    wrapConstructor(OrigRegExp, RegExpShim, {
      $input: true // Chrome < v39 & Opera < 26 have a nonstandard "$input" property
    });
    /* globals RegExp: true */
    /* eslint-disable no-undef */
    /* jshint -W020 */
    RegExp = RegExpShim;
    Value.redefine(globals, 'RegExp', RegExpShim);
    /* jshint +W020 */
    /* eslint-enable no-undef */
    /* globals RegExp: false */
  }

  if (supportsDescriptors) {
    var regexGlobals = {
      input: '$_',
      lastMatch: '$&',
      lastParen: '$+',
      leftContext: '$`',
      rightContext: '$\''
    };
    _forEach(keys(regexGlobals), function (prop) {
      if (prop in RegExp && !(regexGlobals[prop] in RegExp)) {
        Value.getter(RegExp, regexGlobals[prop], function get() {
          return RegExp[prop];
        });
      }
    });
  }
  addDefaultSpecies(RegExp);

  var inverseEpsilon = 1 / Number.EPSILON;
  var roundTiesToEven = function roundTiesToEven(n) {
    // Even though this reduces down to `return n`, it takes advantage of built-in rounding.
    return (n + inverseEpsilon) - inverseEpsilon;
  };
  var BINARY_32_EPSILON = Math.pow(2, -23);
  var BINARY_32_MAX_VALUE = Math.pow(2, 127) * (2 - BINARY_32_EPSILON);
  var BINARY_32_MIN_VALUE = Math.pow(2, -126);
  var numberCLZ = Number.prototype.clz;
  delete Number.prototype.clz; // Safari 8 has Number#clz

  var MathShims = {
    acosh: function acosh(value) {
      var x = Number(value);
      if (Number.isNaN(x) || value < 1) { return NaN; }
      if (x === 1) { return 0; }
      if (x === Infinity) { return x; }
      return _log(x / Math.E + _sqrt(x + 1) * _sqrt(x - 1) / Math.E) + 1;
    },

    asinh: function asinh(value) {
      var x = Number(value);
      if (x === 0 || !globalIsFinite(x)) {
        return x;
      }
      return x < 0 ? -Math.asinh(-x) : _log(x + _sqrt(x * x + 1));
    },

    atanh: function atanh(value) {
      var x = Number(value);
      if (Number.isNaN(x) || x < -1 || x > 1) {
        return NaN;
      }
      if (x === -1) { return -Infinity; }
      if (x === 1) { return Infinity; }
      if (x === 0) { return x; }
      return 0.5 * _log((1 + x) / (1 - x));
    },

    cbrt: function cbrt(value) {
      var x = Number(value);
      if (x === 0) { return x; }
      var negate = x < 0, result;
      if (negate) { x = -x; }
      if (x === Infinity) {
        result = Infinity;
      } else {
        result = Math.exp(_log(x) / 3);
        // from http://en.wikipedia.org/wiki/Cube_root#Numerical_methods
        result = (x / (result * result) + (2 * result)) / 3;
      }
      return negate ? -result : result;
    },

    clz32: function clz32(value) {
      // See https://bugs.ecmascript.org/show_bug.cgi?id=2465
      var x = Number(value);
      var number = ES.ToUint32(x);
      if (number === 0) {
        return 32;
      }
      return numberCLZ ? ES.Call(numberCLZ, number) : 31 - _floor(_log(number + 0.5) * Math.LOG2E);
    },

    cosh: function cosh(value) {
      var x = Number(value);
      if (x === 0) { return 1; } // +0 or -0
      if (Number.isNaN(x)) { return NaN; }
      if (!globalIsFinite(x)) { return Infinity; }
      if (x < 0) { x = -x; }
      if (x > 21) { return Math.exp(x) / 2; }
      return (Math.exp(x) + Math.exp(-x)) / 2;
    },

    expm1: function expm1(value) {
      var x = Number(value);
      if (x === -Infinity) { return -1; }
      if (!globalIsFinite(x) || x === 0) { return x; }
      if (_abs(x) > 0.5) {
        return Math.exp(x) - 1;
      }
      // A more precise approximation using Taylor series expansion
      // from https://github.com/paulmillr/es6-shim/issues/314#issuecomment-70293986
      var t = x;
      var sum = 0;
      var n = 1;
      while (sum + t !== sum) {
        sum += t;
        n += 1;
        t *= x / n;
      }
      return sum;
    },

    hypot: function hypot(x, y) {
      var result = 0;
      var largest = 0;
      for (var i = 0; i < arguments.length; ++i) {
        var value = _abs(Number(arguments[i]));
        if (largest < value) {
          result *= (largest / value) * (largest / value);
          result += 1;
          largest = value;
        } else {
          result += (value > 0 ? (value / largest) * (value / largest) : value);
        }
      }
      return largest === Infinity ? Infinity : largest * _sqrt(result);
    },

    log2: function log2(value) {
      return _log(value) * Math.LOG2E;
    },

    log10: function log10(value) {
      return _log(value) * Math.LOG10E;
    },

    log1p: function log1p(value) {
      var x = Number(value);
      if (x < -1 || Number.isNaN(x)) { return NaN; }
      if (x === 0 || x === Infinity) { return x; }
      if (x === -1) { return -Infinity; }

      return (1 + x) - 1 === 0 ? x : x * (_log(1 + x) / ((1 + x) - 1));
    },

    sign: function sign(value) {
      var number = Number(value);
      if (number === 0) { return number; }
      if (Number.isNaN(number)) { return number; }
      return number < 0 ? -1 : 1;
    },

    sinh: function sinh(value) {
      var x = Number(value);
      if (!globalIsFinite(x) || x === 0) { return x; }

      if (_abs(x) < 1) {
        return (Math.expm1(x) - Math.expm1(-x)) / 2;
      }
      return (Math.exp(x - 1) - Math.exp(-x - 1)) * Math.E / 2;
    },

    tanh: function tanh(value) {
      var x = Number(value);
      if (Number.isNaN(x) || x === 0) { return x; }
      if (x === Infinity) { return 1; }
      if (x === -Infinity) { return -1; }
      var a = Math.expm1(x);
      var b = Math.expm1(-x);
      if (a === Infinity) { return 1; }
      if (b === Infinity) { return -1; }
      return (a - b) / (Math.exp(x) + Math.exp(-x));
    },

    trunc: function trunc(value) {
      var x = Number(value);
      return x < 0 ? -_floor(-x) : _floor(x);
    },

    imul: function imul(x, y) {
      // taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/imul
      var a = ES.ToUint32(x);
      var b = ES.ToUint32(y);
      var ah = (a >>> 16) & 0xffff;
      var al = a & 0xffff;
      var bh = (b >>> 16) & 0xffff;
      var bl = b & 0xffff;
      // the shift by 0 fixes the sign on the high part
      // the final |0 converts the unsigned value into a signed value
      return ((al * bl) + (((ah * bl + al * bh) << 16) >>> 0) | 0);
    },

    fround: function fround(x) {
      var v = Number(x);
      if (v === 0 || v === Infinity || v === -Infinity || numberIsNaN(v)) {
        return v;
      }
      var sign = Math.sign(v);
      var abs = _abs(v);
      if (abs < BINARY_32_MIN_VALUE) {
        return sign * roundTiesToEven(abs / BINARY_32_MIN_VALUE / BINARY_32_EPSILON) * BINARY_32_MIN_VALUE * BINARY_32_EPSILON;
      }
      // Veltkamp's splitting (?)
      var a = (1 + BINARY_32_EPSILON / Number.EPSILON) * abs;
      var result = a - (a - abs);
      if (result > BINARY_32_MAX_VALUE || numberIsNaN(result)) {
        return sign * Infinity;
      }
      return sign * result;
    }
  };
  defineProperties(Math, MathShims);
  // IE 11 TP has an imprecise log1p: reports Math.log1p(-1e-17) as 0
  defineProperty(Math, 'log1p', MathShims.log1p, Math.log1p(-1e-17) !== -1e-17);
  // IE 11 TP has an imprecise asinh: reports Math.asinh(-1e7) as not exactly equal to -Math.asinh(1e7)
  defineProperty(Math, 'asinh', MathShims.asinh, Math.asinh(-1e7) !== -Math.asinh(1e7));
  // Chrome 40 has an imprecise Math.tanh with very small numbers
  defineProperty(Math, 'tanh', MathShims.tanh, Math.tanh(-2e-17) !== -2e-17);
  // Chrome 40 loses Math.acosh precision with high numbers
  defineProperty(Math, 'acosh', MathShims.acosh, Math.acosh(Number.MAX_VALUE) === Infinity);
  // Firefox 38 on Windows
  defineProperty(Math, 'cbrt', MathShims.cbrt, Math.abs(1 - Math.cbrt(1e-300) / 1e-100) / Number.EPSILON > 8);
  // node 0.11 has an imprecise Math.sinh with very small numbers
  defineProperty(Math, 'sinh', MathShims.sinh, Math.sinh(-2e-17) !== -2e-17);
  // FF 35 on Linux reports 22025.465794806725 for Math.expm1(10)
  var expm1OfTen = Math.expm1(10);
  defineProperty(Math, 'expm1', MathShims.expm1, expm1OfTen > 22025.465794806719 || expm1OfTen < 22025.4657948067165168);

  var origMathRound = Math.round;
  // breaks in e.g. Safari 8, Internet Explorer 11, Opera 12
  var roundHandlesBoundaryConditions = Math.round(0.5 - Number.EPSILON / 4) === 0 && Math.round(-0.5 + Number.EPSILON / 3.99) === 1;

  // When engines use Math.floor(x + 0.5) internally, Math.round can be buggy for large integers.
  // This behavior should be governed by "round to nearest, ties to even mode"
  // see https://people.mozilla.org/~jorendorff/es6-draft.html#sec-ecmascript-language-types-number-type
  // These are the boundary cases where it breaks.
  var smallestPositiveNumberWhereRoundBreaks = inverseEpsilon + 1;
  var largestPositiveNumberWhereRoundBreaks = 2 * inverseEpsilon - 1;
  var roundDoesNotIncreaseIntegers = [smallestPositiveNumberWhereRoundBreaks, largestPositiveNumberWhereRoundBreaks].every(function (num) {
    return Math.round(num) === num;
  });
  defineProperty(Math, 'round', function round(x) {
    var floor = _floor(x);
    var ceil = floor === -1 ? -0 : floor + 1;
    return x - floor < 0.5 ? floor : ceil;
  }, !roundHandlesBoundaryConditions || !roundDoesNotIncreaseIntegers);
  Value.preserveToString(Math.round, origMathRound);

  var origImul = Math.imul;
  if (Math.imul(0xffffffff, 5) !== -5) {
    // Safari 6.1, at least, reports "0" for this value
    Math.imul = MathShims.imul;
    Value.preserveToString(Math.imul, origImul);
  }
  if (Math.imul.length !== 2) {
    // Safari 8.0.4 has a length of 1
    // fixed in https://bugs.webkit.org/show_bug.cgi?id=143658
    overrideNative(Math, 'imul', function imul(x, y) {
      return ES.Call(origImul, Math, arguments);
    });
  }

  // Promises
  // Simplest possible implementation; use a 3rd-party library if you
  // want the best possible speed and/or long stack traces.
  var PromiseShim = (function () {
    var setTimeout = globals.setTimeout;
    // some environments don't have setTimeout - no way to shim here.
    if (typeof setTimeout !== 'function' && typeof setTimeout !== 'object') { return; }

    ES.IsPromise = function (promise) {
      if (!ES.TypeIsObject(promise)) {
        return false;
      }
      if (typeof promise._promise === 'undefined') {
        return false; // uninitialized, or missing our hidden field.
      }
      return true;
    };

    // "PromiseCapability" in the spec is what most promise implementations
    // call a "deferred".
    var PromiseCapability = function (C) {
      if (!ES.IsConstructor(C)) {
        throw new TypeError('Bad promise constructor');
      }
      var capability = this;
      var resolver = function (resolve, reject) {
        if (capability.resolve !== void 0 || capability.reject !== void 0) {
          throw new TypeError('Bad Promise implementation!');
        }
        capability.resolve = resolve;
        capability.reject = reject;
      };
      // Initialize fields to inform optimizers about the object shape.
      capability.resolve = void 0;
      capability.reject = void 0;
      capability.promise = new C(resolver);
      if (!(ES.IsCallable(capability.resolve) && ES.IsCallable(capability.reject))) {
        throw new TypeError('Bad promise constructor');
      }
    };

    // find an appropriate setImmediate-alike
    var makeZeroTimeout;
    /*global window */
    if (typeof window !== 'undefined' && ES.IsCallable(window.postMessage)) {
      makeZeroTimeout = function () {
        // from http://dbaron.org/log/20100309-faster-timeouts
        var timeouts = [];
        var messageName = 'zero-timeout-message';
        var setZeroTimeout = function (fn) {
          _push(timeouts, fn);
          window.postMessage(messageName, '*');
        };
        var handleMessage = function (event) {
          if (event.source === window && event.data === messageName) {
            event.stopPropagation();
            if (timeouts.length === 0) { return; }
            var fn = _shift(timeouts);
            fn();
          }
        };
        window.addEventListener('message', handleMessage, true);
        return setZeroTimeout;
      };
    }
    var makePromiseAsap = function () {
      // An efficient task-scheduler based on a pre-existing Promise
      // implementation, which we can use even if we override the
      // global Promise below (in order to workaround bugs)
      // https://github.com/Raynos/observ-hash/issues/2#issuecomment-35857671
      var P = globals.Promise;
      var pr = P && P.resolve && P.resolve();
      return pr && function (task) {
        return pr.then(task);
      };
    };
    /*global process */
    /* jscs:disable disallowMultiLineTernary */
    var enqueue = ES.IsCallable(globals.setImmediate) ?
      globals.setImmediate :
      typeof process === 'object' && process.nextTick ? process.nextTick :
      makePromiseAsap() ||
      (ES.IsCallable(makeZeroTimeout) ? makeZeroTimeout() :
      function (task) { setTimeout(task, 0); }); // fallback
    /* jscs:enable disallowMultiLineTernary */

    // Constants for Promise implementation
    var PROMISE_IDENTITY = function (x) { return x; };
    var PROMISE_THROWER = function (e) { throw e; };
    var PROMISE_PENDING = 0;
    var PROMISE_FULFILLED = 1;
    var PROMISE_REJECTED = 2;
    // We store fulfill/reject handlers and capabilities in a single array.
    var PROMISE_FULFILL_OFFSET = 0;
    var PROMISE_REJECT_OFFSET = 1;
    var PROMISE_CAPABILITY_OFFSET = 2;
    // This is used in an optimization for chaining promises via then.
    var PROMISE_FAKE_CAPABILITY = {};

    var enqueuePromiseReactionJob = function (handler, capability, argument) {
      enqueue(function () {
        promiseReactionJob(handler, capability, argument);
      });
    };

    var promiseReactionJob = function (handler, promiseCapability, argument) {
      var handlerResult, f;
      if (promiseCapability === PROMISE_FAKE_CAPABILITY) {
        // Fast case, when we don't actually need to chain through to a
        // (real) promiseCapability.
        return handler(argument);
      }
      try {
        handlerResult = handler(argument);
        f = promiseCapability.resolve;
      } catch (e) {
        handlerResult = e;
        f = promiseCapability.reject;
      }
      f(handlerResult);
    };

    var fulfillPromise = function (promise, value) {
      var _promise = promise._promise;
      var length = _promise.reactionLength;
      if (length > 0) {
        enqueuePromiseReactionJob(
          _promise.fulfillReactionHandler0,
          _promise.reactionCapability0,
          value
        );
        _promise.fulfillReactionHandler0 = void 0;
        _promise.rejectReactions0 = void 0;
        _promise.reactionCapability0 = void 0;
        if (length > 1) {
          for (var i = 1, idx = 0; i < length; i++, idx += 3) {
            enqueuePromiseReactionJob(
              _promise[idx + PROMISE_FULFILL_OFFSET],
              _promise[idx + PROMISE_CAPABILITY_OFFSET],
              value
            );
            promise[idx + PROMISE_FULFILL_OFFSET] = void 0;
            promise[idx + PROMISE_REJECT_OFFSET] = void 0;
            promise[idx + PROMISE_CAPABILITY_OFFSET] = void 0;
          }
        }
      }
      _promise.result = value;
      _promise.state = PROMISE_FULFILLED;
      _promise.reactionLength = 0;
    };

    var rejectPromise = function (promise, reason) {
      var _promise = promise._promise;
      var length = _promise.reactionLength;
      if (length > 0) {
        enqueuePromiseReactionJob(
          _promise.rejectReactionHandler0,
          _promise.reactionCapability0,
          reason
        );
        _promise.fulfillReactionHandler0 = void 0;
        _promise.rejectReactions0 = void 0;
        _promise.reactionCapability0 = void 0;
        if (length > 1) {
          for (var i = 1, idx = 0; i < length; i++, idx += 3) {
            enqueuePromiseReactionJob(
              _promise[idx + PROMISE_REJECT_OFFSET],
              _promise[idx + PROMISE_CAPABILITY_OFFSET],
              reason
            );
            promise[idx + PROMISE_FULFILL_OFFSET] = void 0;
            promise[idx + PROMISE_REJECT_OFFSET] = void 0;
            promise[idx + PROMISE_CAPABILITY_OFFSET] = void 0;
          }
        }
      }
      _promise.result = reason;
      _promise.state = PROMISE_REJECTED;
      _promise.reactionLength = 0;
    };

    var createResolvingFunctions = function (promise) {
      var alreadyResolved = false;
      var resolve = function (resolution) {
        var then;
        if (alreadyResolved) { return; }
        alreadyResolved = true;
        if (resolution === promise) {
          return rejectPromise(promise, new TypeError('Self resolution'));
        }
        if (!ES.TypeIsObject(resolution)) {
          return fulfillPromise(promise, resolution);
        }
        try {
          then = resolution.then;
        } catch (e) {
          return rejectPromise(promise, e);
        }
        if (!ES.IsCallable(then)) {
          return fulfillPromise(promise, resolution);
        }
        enqueue(function () {
          promiseResolveThenableJob(promise, resolution, then);
        });
      };
      var reject = function (reason) {
        if (alreadyResolved) { return; }
        alreadyResolved = true;
        return rejectPromise(promise, reason);
      };
      return { resolve: resolve, reject: reject };
    };

    var optimizedThen = function (then, thenable, resolve, reject) {
      // Optimization: since we discard the result, we can pass our
      // own then implementation a special hint to let it know it
      // doesn't have to create it.  (The PROMISE_FAKE_CAPABILITY
      // object is local to this implementation and unforgeable outside.)
      if (then === Promise$prototype$then) {
        _call(then, thenable, resolve, reject, PROMISE_FAKE_CAPABILITY);
      } else {
        _call(then, thenable, resolve, reject);
      }
    };
    var promiseResolveThenableJob = function (promise, thenable, then) {
      var resolvingFunctions = createResolvingFunctions(promise);
      var resolve = resolvingFunctions.resolve;
      var reject = resolvingFunctions.reject;
      try {
        optimizedThen(then, thenable, resolve, reject);
      } catch (e) {
        reject(e);
      }
    };

    var Promise$prototype, Promise$prototype$then;
    var Promise = (function () {
      var PromiseShim = function Promise(resolver) {
        if (!(this instanceof PromiseShim)) {
          throw new TypeError('Constructor Promise requires "new"');
        }
        if (this && this._promise) {
          throw new TypeError('Bad construction');
        }
        // see https://bugs.ecmascript.org/show_bug.cgi?id=2482
        if (!ES.IsCallable(resolver)) {
          throw new TypeError('not a valid resolver');
        }
        var promise = emulateES6construct(this, PromiseShim, Promise$prototype, {
          _promise: {
            result: void 0,
            state: PROMISE_PENDING,
            // The first member of the "reactions" array is inlined here,
            // since most promises only have one reaction.
            // We've also exploded the 'reaction' object to inline the
            // "handler" and "capability" fields, since both fulfill and
            // reject reactions share the same capability.
            reactionLength: 0,
            fulfillReactionHandler0: void 0,
            rejectReactionHandler0: void 0,
            reactionCapability0: void 0
          }
        });
        var resolvingFunctions = createResolvingFunctions(promise);
        var reject = resolvingFunctions.reject;
        try {
          resolver(resolvingFunctions.resolve, reject);
        } catch (e) {
          reject(e);
        }
        return promise;
      };
      return PromiseShim;
    }());
    Promise$prototype = Promise.prototype;

    var _promiseAllResolver = function (index, values, capability, remaining) {
      var alreadyCalled = false;
      return function (x) {
        if (alreadyCalled) { return; }
        alreadyCalled = true;
        values[index] = x;
        if ((--remaining.count) === 0) {
          var resolve = capability.resolve;
          resolve(values); // call w/ this===undefined
        }
      };
    };

    var performPromiseAll = function (iteratorRecord, C, resultCapability) {
      var it = iteratorRecord.iterator;
      var values = [], remaining = { count: 1 }, next, nextValue;
      var index = 0;
      while (true) {
        try {
          next = ES.IteratorStep(it);
          if (next === false) {
            iteratorRecord.done = true;
            break;
          }
          nextValue = next.value;
        } catch (e) {
          iteratorRecord.done = true;
          throw e;
        }
        values[index] = void 0;
        var nextPromise = C.resolve(nextValue);
        var resolveElement = _promiseAllResolver(
          index, values, resultCapability, remaining
        );
        remaining.count += 1;
        optimizedThen(nextPromise.then, nextPromise, resolveElement, resultCapability.reject);
        index += 1;
      }
      if ((--remaining.count) === 0) {
        var resolve = resultCapability.resolve;
        resolve(values); // call w/ this===undefined
      }
      return resultCapability.promise;
    };

    var performPromiseRace = function (iteratorRecord, C, resultCapability) {
      var it = iteratorRecord.iterator, next, nextValue, nextPromise;
      while (true) {
        try {
          next = ES.IteratorStep(it);
          if (next === false) {
            // NOTE: If iterable has no items, resulting promise will never
            // resolve; see:
            // https://github.com/domenic/promises-unwrapping/issues/75
            // https://bugs.ecmascript.org/show_bug.cgi?id=2515
            iteratorRecord.done = true;
            break;
          }
          nextValue = next.value;
        } catch (e) {
          iteratorRecord.done = true;
          throw e;
        }
        nextPromise = C.resolve(nextValue);
        optimizedThen(nextPromise.then, nextPromise, resultCapability.resolve, resultCapability.reject);
      }
      return resultCapability.promise;
    };

    defineProperties(Promise, {
      all: function all(iterable) {
        var C = this;
        if (!ES.TypeIsObject(C)) {
          throw new TypeError('Promise is not object');
        }
        var capability = new PromiseCapability(C);
        var iterator, iteratorRecord;
        try {
          iterator = ES.GetIterator(iterable);
          iteratorRecord = { iterator: iterator, done: false };
          return performPromiseAll(iteratorRecord, C, capability);
        } catch (e) {
          var exception = e;
          if (iteratorRecord && !iteratorRecord.done) {
            try {
              ES.IteratorClose(iterator, true);
            } catch (ee) {
              exception = ee;
            }
          }
          var reject = capability.reject;
          reject(exception);
          return capability.promise;
        }
      },

      race: function race(iterable) {
        var C = this;
        if (!ES.TypeIsObject(C)) {
          throw new TypeError('Promise is not object');
        }
        var capability = new PromiseCapability(C);
        var iterator, iteratorRecord;
        try {
          iterator = ES.GetIterator(iterable);
          iteratorRecord = { iterator: iterator, done: false };
          return performPromiseRace(iteratorRecord, C, capability);
        } catch (e) {
          var exception = e;
          if (iteratorRecord && !iteratorRecord.done) {
            try {
              ES.IteratorClose(iterator, true);
            } catch (ee) {
              exception = ee;
            }
          }
          var reject = capability.reject;
          reject(exception);
          return capability.promise;
        }
      },

      reject: function reject(reason) {
        var C = this;
        if (!ES.TypeIsObject(C)) {
          throw new TypeError('Bad promise constructor');
        }
        var capability = new PromiseCapability(C);
        var rejectFunc = capability.reject;
        rejectFunc(reason); // call with this===undefined
        return capability.promise;
      },

      resolve: function resolve(v) {
        // See https://esdiscuss.org/topic/fixing-promise-resolve for spec
        var C = this;
        if (!ES.TypeIsObject(C)) {
          throw new TypeError('Bad promise constructor');
        }
        if (ES.IsPromise(v)) {
          var constructor = v.constructor;
          if (constructor === C) { return v; }
        }
        var capability = new PromiseCapability(C);
        var resolveFunc = capability.resolve;
        resolveFunc(v); // call with this===undefined
        return capability.promise;
      }
    });

    defineProperties(Promise$prototype, {
      'catch': function (onRejected) {
        return this.then(null, onRejected);
      },

      then: function then(onFulfilled, onRejected) {
        var promise = this;
        if (!ES.IsPromise(promise)) { throw new TypeError('not a promise'); }
        var C = ES.SpeciesConstructor(promise, Promise);
        var resultCapability;
        var returnValueIsIgnored = arguments.length > 2 && arguments[2] === PROMISE_FAKE_CAPABILITY;
        if (returnValueIsIgnored && C === Promise) {
          resultCapability = PROMISE_FAKE_CAPABILITY;
        } else {
          resultCapability = new PromiseCapability(C);
        }
        // PerformPromiseThen(promise, onFulfilled, onRejected, resultCapability)
        // Note that we've split the 'reaction' object into its two
        // components, "capabilities" and "handler"
        // "capabilities" is always equal to `resultCapability`
        var fulfillReactionHandler = ES.IsCallable(onFulfilled) ? onFulfilled : PROMISE_IDENTITY;
        var rejectReactionHandler = ES.IsCallable(onRejected) ? onRejected : PROMISE_THROWER;
        var _promise = promise._promise;
        var value;
        if (_promise.state === PROMISE_PENDING) {
          if (_promise.reactionLength === 0) {
            _promise.fulfillReactionHandler0 = fulfillReactionHandler;
            _promise.rejectReactionHandler0 = rejectReactionHandler;
            _promise.reactionCapability0 = resultCapability;
          } else {
            var idx = 3 * (_promise.reactionLength - 1);
            _promise[idx + PROMISE_FULFILL_OFFSET] = fulfillReactionHandler;
            _promise[idx + PROMISE_REJECT_OFFSET] = rejectReactionHandler;
            _promise[idx + PROMISE_CAPABILITY_OFFSET] = resultCapability;
          }
          _promise.reactionLength += 1;
        } else if (_promise.state === PROMISE_FULFILLED) {
          value = _promise.result;
          enqueuePromiseReactionJob(
            fulfillReactionHandler, resultCapability, value
          );
        } else if (_promise.state === PROMISE_REJECTED) {
          value = _promise.result;
          enqueuePromiseReactionJob(
            rejectReactionHandler, resultCapability, value
          );
        } else {
          throw new TypeError('unexpected Promise state');
        }
        return resultCapability.promise;
      }
    });
    // This helps the optimizer by ensuring that methods which take
    // capabilities aren't polymorphic.
    PROMISE_FAKE_CAPABILITY = new PromiseCapability(Promise);
    Promise$prototype$then = Promise$prototype.then;

    return Promise;
  }());

  // Chrome's native Promise has extra methods that it shouldn't have. Let's remove them.
  if (globals.Promise) {
    delete globals.Promise.accept;
    delete globals.Promise.defer;
    delete globals.Promise.prototype.chain;
  }

  if (typeof PromiseShim === 'function') {
    // export the Promise constructor.
    defineProperties(globals, { Promise: PromiseShim });
    // In Chrome 33 (and thereabouts) Promise is defined, but the
    // implementation is buggy in a number of ways.  Let's check subclassing
    // support to see if we have a buggy implementation.
    var promiseSupportsSubclassing = supportsSubclassing(globals.Promise, function (S) {
      return S.resolve(42).then(function () {}) instanceof S;
    });
    var promiseIgnoresNonFunctionThenCallbacks = !throwsError(function () { globals.Promise.reject(42).then(null, 5).then(null, noop); });
    var promiseRequiresObjectContext = throwsError(function () { globals.Promise.call(3, noop); });
    // Promise.resolve() was errata'ed late in the ES6 process.
    // See: https://bugzilla.mozilla.org/show_bug.cgi?id=1170742
    //      https://code.google.com/p/v8/issues/detail?id=4161
    // It serves as a proxy for a number of other bugs in early Promise
    // implementations.
    var promiseResolveBroken = (function (Promise) {
      var p = Promise.resolve(5);
      p.constructor = {};
      var p2 = Promise.resolve(p);
      try {
        p2.then(null, noop).then(null, noop); // avoid "uncaught rejection" warnings in console
      } catch (e) {
        return true; // v8 native Promises break here https://code.google.com/p/chromium/issues/detail?id=575314
      }
      return p === p2; // This *should* be false!
    }(globals.Promise));

    // Chrome 46 (probably older too) does not retrieve a thenable's .then synchronously
    var getsThenSynchronously = supportsDescriptors && (function () {
      var count = 0;
      var thenable = Object.defineProperty({}, 'then', { get: function () { count += 1; } });
      Promise.resolve(thenable);
      return count === 1;
    }());

    var BadResolverPromise = function BadResolverPromise(executor) {
      var p = new Promise(executor);
      executor(3, function () {});
      this.then = p.then;
      this.constructor = BadResolverPromise;
    };
    BadResolverPromise.prototype = Promise.prototype;
    BadResolverPromise.all = Promise.all;
    // Chrome Canary 49 (probably older too) has some implementation bugs
    var hasBadResolverPromise = valueOrFalseIfThrows(function () {
      return !!BadResolverPromise.all([1, 2]);
    });

    if (!promiseSupportsSubclassing || !promiseIgnoresNonFunctionThenCallbacks ||
        !promiseRequiresObjectContext || promiseResolveBroken ||
        !getsThenSynchronously || hasBadResolverPromise) {
      /* globals Promise: true */
      /* eslint-disable no-undef */
      /* jshint -W020 */
      Promise = PromiseShim;
      /* jshint +W020 */
      /* eslint-enable no-undef */
      /* globals Promise: false */
      overrideNative(globals, 'Promise', PromiseShim);
    }
    if (Promise.all.length !== 1) {
      var origAll = Promise.all;
      overrideNative(Promise, 'all', function all(iterable) {
        return ES.Call(origAll, this, arguments);
      });
    }
    if (Promise.race.length !== 1) {
      var origRace = Promise.race;
      overrideNative(Promise, 'race', function race(iterable) {
        return ES.Call(origRace, this, arguments);
      });
    }
    if (Promise.resolve.length !== 1) {
      var origResolve = Promise.resolve;
      overrideNative(Promise, 'resolve', function resolve(x) {
        return ES.Call(origResolve, this, arguments);
      });
    }
    if (Promise.reject.length !== 1) {
      var origReject = Promise.reject;
      overrideNative(Promise, 'reject', function reject(r) {
        return ES.Call(origReject, this, arguments);
      });
    }
    ensureEnumerable(Promise, 'all');
    ensureEnumerable(Promise, 'race');
    ensureEnumerable(Promise, 'resolve');
    ensureEnumerable(Promise, 'reject');
    addDefaultSpecies(Promise);
  }

  // Map and Set require a true ES5 environment
  // Their fast path also requires that the environment preserve
  // property insertion order, which is not guaranteed by the spec.
  var testOrder = function (a) {
    var b = keys(_reduce(a, function (o, k) {
      o[k] = true;
      return o;
    }, {}));
    return a.join(':') === b.join(':');
  };
  var preservesInsertionOrder = testOrder(['z', 'a', 'bb']);
  // some engines (eg, Chrome) only preserve insertion order for string keys
  var preservesNumericInsertionOrder = testOrder(['z', 1, 'a', '3', 2]);

  if (supportsDescriptors) {

    var fastkey = function fastkey(key) {
      if (!preservesInsertionOrder) {
        return null;
      }
      if (typeof key === 'undefined' || key === null) {
        return '^' + ES.ToString(key);
      } else if (typeof key === 'string') {
        return '$' + key;
      } else if (typeof key === 'number') {
        // note that -0 will get coerced to "0" when used as a property key
        if (!preservesNumericInsertionOrder) {
          return 'n' + key;
        }
        return key;
      } else if (typeof key === 'boolean') {
        return 'b' + key;
      }
      return null;
    };

    var emptyObject = function emptyObject() {
      // accomodate some older not-quite-ES5 browsers
      return Object.create ? Object.create(null) : {};
    };

    var addIterableToMap = function addIterableToMap(MapConstructor, map, iterable) {
      if (isArray(iterable) || Type.string(iterable)) {
        _forEach(iterable, function (entry) {
          if (!ES.TypeIsObject(entry)) {
            throw new TypeError('Iterator value ' + entry + ' is not an entry object');
          }
          map.set(entry[0], entry[1]);
        });
      } else if (iterable instanceof MapConstructor) {
        _call(MapConstructor.prototype.forEach, iterable, function (value, key) {
          map.set(key, value);
        });
      } else {
        var iter, adder;
        if (iterable !== null && typeof iterable !== 'undefined') {
          adder = map.set;
          if (!ES.IsCallable(adder)) { throw new TypeError('bad map'); }
          iter = ES.GetIterator(iterable);
        }
        if (typeof iter !== 'undefined') {
          while (true) {
            var next = ES.IteratorStep(iter);
            if (next === false) { break; }
            var nextItem = next.value;
            try {
              if (!ES.TypeIsObject(nextItem)) {
                throw new TypeError('Iterator value ' + nextItem + ' is not an entry object');
              }
              _call(adder, map, nextItem[0], nextItem[1]);
            } catch (e) {
              ES.IteratorClose(iter, true);
              throw e;
            }
          }
        }
      }
    };
    var addIterableToSet = function addIterableToSet(SetConstructor, set, iterable) {
      if (isArray(iterable) || Type.string(iterable)) {
        _forEach(iterable, function (value) {
          set.add(value);
        });
      } else if (iterable instanceof SetConstructor) {
        _call(SetConstructor.prototype.forEach, iterable, function (value) {
          set.add(value);
        });
      } else {
        var iter, adder;
        if (iterable !== null && typeof iterable !== 'undefined') {
          adder = set.add;
          if (!ES.IsCallable(adder)) { throw new TypeError('bad set'); }
          iter = ES.GetIterator(iterable);
        }
        if (typeof iter !== 'undefined') {
          while (true) {
            var next = ES.IteratorStep(iter);
            if (next === false) { break; }
            var nextValue = next.value;
            try {
              _call(adder, set, nextValue);
            } catch (e) {
              ES.IteratorClose(iter, true);
              throw e;
            }
          }
        }
      }
    };

    var collectionShims = {
      Map: (function () {

        var empty = {};

        var MapEntry = function MapEntry(key, value) {
          this.key = key;
          this.value = value;
          this.next = null;
          this.prev = null;
        };

        MapEntry.prototype.isRemoved = function isRemoved() {
          return this.key === empty;
        };

        var isMap = function isMap(map) {
          return !!map._es6map;
        };

        var requireMapSlot = function requireMapSlot(map, method) {
          if (!ES.TypeIsObject(map) || !isMap(map)) {
            throw new TypeError('Method Map.prototype.' + method + ' called on incompatible receiver ' + ES.ToString(map));
          }
        };

        var MapIterator = function MapIterator(map, kind) {
          requireMapSlot(map, '[[MapIterator]]');
          this.head = map._head;
          this.i = this.head;
          this.kind = kind;
        };

        MapIterator.prototype = {
          next: function next() {
            var i = this.i, kind = this.kind, head = this.head, result;
            if (typeof this.i === 'undefined') {
              return { value: void 0, done: true };
            }
            while (i.isRemoved() && i !== head) {
              // back up off of removed entries
              i = i.prev;
            }
            // advance to next unreturned element.
            while (i.next !== head) {
              i = i.next;
              if (!i.isRemoved()) {
                if (kind === 'key') {
                  result = i.key;
                } else if (kind === 'value') {
                  result = i.value;
                } else {
                  result = [i.key, i.value];
                }
                this.i = i;
                return { value: result, done: false };
              }
            }
            // once the iterator is done, it is done forever.
            this.i = void 0;
            return { value: void 0, done: true };
          }
        };
        addIterator(MapIterator.prototype);

        var Map$prototype;
        var MapShim = function Map() {
          if (!(this instanceof Map)) {
            throw new TypeError('Constructor Map requires "new"');
          }
          if (this && this._es6map) {
            throw new TypeError('Bad construction');
          }
          var map = emulateES6construct(this, Map, Map$prototype, {
            _es6map: true,
            _head: null,
            _storage: emptyObject(),
            _size: 0
          });

          var head = new MapEntry(null, null);
          // circular doubly-linked list.
          head.next = head.prev = head;
          map._head = head;

          // Optionally initialize map from iterable
          if (arguments.length > 0) {
            addIterableToMap(Map, map, arguments[0]);
          }
          return map;
        };
        Map$prototype = MapShim.prototype;

        Value.getter(Map$prototype, 'size', function () {
          if (typeof this._size === 'undefined') {
            throw new TypeError('size method called on incompatible Map');
          }
          return this._size;
        });

        defineProperties(Map$prototype, {
          get: function get(key) {
            requireMapSlot(this, 'get');
            var fkey = fastkey(key);
            if (fkey !== null) {
              // fast O(1) path
              var entry = this._storage[fkey];
              if (entry) {
                return entry.value;
              } else {
                return;
              }
            }
            var head = this._head, i = head;
            while ((i = i.next) !== head) {
              if (ES.SameValueZero(i.key, key)) {
                return i.value;
              }
            }
          },

          has: function has(key) {
            requireMapSlot(this, 'has');
            var fkey = fastkey(key);
            if (fkey !== null) {
              // fast O(1) path
              return typeof this._storage[fkey] !== 'undefined';
            }
            var head = this._head, i = head;
            while ((i = i.next) !== head) {
              if (ES.SameValueZero(i.key, key)) {
                return true;
              }
            }
            return false;
          },

          set: function set(key, value) {
            requireMapSlot(this, 'set');
            var head = this._head, i = head, entry;
            var fkey = fastkey(key);
            if (fkey !== null) {
              // fast O(1) path
              if (typeof this._storage[fkey] !== 'undefined') {
                this._storage[fkey].value = value;
                return this;
              } else {
                entry = this._storage[fkey] = new MapEntry(key, value);
                i = head.prev;
                // fall through
              }
            }
            while ((i = i.next) !== head) {
              if (ES.SameValueZero(i.key, key)) {
                i.value = value;
                return this;
              }
            }
            entry = entry || new MapEntry(key, value);
            if (ES.SameValue(-0, key)) {
              entry.key = +0; // coerce -0 to +0 in entry
            }
            entry.next = this._head;
            entry.prev = this._head.prev;
            entry.prev.next = entry;
            entry.next.prev = entry;
            this._size += 1;
            return this;
          },

          'delete': function (key) {
            requireMapSlot(this, 'delete');
            var head = this._head, i = head;
            var fkey = fastkey(key);
            if (fkey !== null) {
              // fast O(1) path
              if (typeof this._storage[fkey] === 'undefined') {
                return false;
              }
              i = this._storage[fkey].prev;
              delete this._storage[fkey];
              // fall through
            }
            while ((i = i.next) !== head) {
              if (ES.SameValueZero(i.key, key)) {
                i.key = i.value = empty;
                i.prev.next = i.next;
                i.next.prev = i.prev;
                this._size -= 1;
                return true;
              }
            }
            return false;
          },

          clear: function clear() {
            requireMapSlot(this, 'clear');
            this._size = 0;
            this._storage = emptyObject();
            var head = this._head, i = head, p = i.next;
            while ((i = p) !== head) {
              i.key = i.value = empty;
              p = i.next;
              i.next = i.prev = head;
            }
            head.next = head.prev = head;
          },

          keys: function keys() {
            requireMapSlot(this, 'keys');
            return new MapIterator(this, 'key');
          },

          values: function values() {
            requireMapSlot(this, 'values');
            return new MapIterator(this, 'value');
          },

          entries: function entries() {
            requireMapSlot(this, 'entries');
            return new MapIterator(this, 'key+value');
          },

          forEach: function forEach(callback) {
            requireMapSlot(this, 'forEach');
            var context = arguments.length > 1 ? arguments[1] : null;
            var it = this.entries();
            for (var entry = it.next(); !entry.done; entry = it.next()) {
              if (context) {
                _call(callback, context, entry.value[1], entry.value[0], this);
              } else {
                callback(entry.value[1], entry.value[0], this);
              }
            }
          }
        });
        addIterator(Map$prototype, Map$prototype.entries);

        return MapShim;
      }()),

      Set: (function () {
        var isSet = function isSet(set) {
          return set._es6set && typeof set._storage !== 'undefined';
        };
        var requireSetSlot = function requireSetSlot(set, method) {
          if (!ES.TypeIsObject(set) || !isSet(set)) {
            // https://github.com/paulmillr/es6-shim/issues/176
            throw new TypeError('Set.prototype.' + method + ' called on incompatible receiver ' + ES.ToString(set));
          }
        };

        // Creating a Map is expensive.  To speed up the common case of
        // Sets containing only string or numeric keys, we use an object
        // as backing storage and lazily create a full Map only when
        // required.
        var Set$prototype;
        var SetShim = function Set() {
          if (!(this instanceof Set)) {
            throw new TypeError('Constructor Set requires "new"');
          }
          if (this && this._es6set) {
            throw new TypeError('Bad construction');
          }
          var set = emulateES6construct(this, Set, Set$prototype, {
            _es6set: true,
            '[[SetData]]': null,
            _storage: emptyObject()
          });
          if (!set._es6set) {
            throw new TypeError('bad set');
          }

          // Optionally initialize Set from iterable
          if (arguments.length > 0) {
            addIterableToSet(Set, set, arguments[0]);
          }
          return set;
        };
        Set$prototype = SetShim.prototype;

        var decodeKey = function (key) {
          var k = key;
          if (k === '^null') {
            return null;
          } else if (k === '^undefined') {
            return void 0;
          } else {
            var first = k.charAt(0);
            if (first === '$') {
              return _strSlice(k, 1);
            } else if (first === 'n') {
              return +_strSlice(k, 1);
            } else if (first === 'b') {
              return k === 'btrue';
            }
          }
          return +k;
        };
        // Switch from the object backing storage to a full Map.
        var ensureMap = function ensureMap(set) {
          if (!set['[[SetData]]']) {
            var m = set['[[SetData]]'] = new collectionShims.Map();
            _forEach(keys(set._storage), function (key) {
              var k = decodeKey(key);
              m.set(k, k);
            });
            set['[[SetData]]'] = m;
          }
          set._storage = null; // free old backing storage
        };

        Value.getter(SetShim.prototype, 'size', function () {
          requireSetSlot(this, 'size');
          if (this._storage) {
            return keys(this._storage).length;
          }
          ensureMap(this);
          return this['[[SetData]]'].size;
        });

        defineProperties(SetShim.prototype, {
          has: function has(key) {
            requireSetSlot(this, 'has');
            var fkey;
            if (this._storage && (fkey = fastkey(key)) !== null) {
              return !!this._storage[fkey];
            }
            ensureMap(this);
            return this['[[SetData]]'].has(key);
          },

          add: function add(key) {
            requireSetSlot(this, 'add');
            var fkey;
            if (this._storage && (fkey = fastkey(key)) !== null) {
              this._storage[fkey] = true;
              return this;
            }
            ensureMap(this);
            this['[[SetData]]'].set(key, key);
            return this;
          },

          'delete': function (key) {
            requireSetSlot(this, 'delete');
            var fkey;
            if (this._storage && (fkey = fastkey(key)) !== null) {
              var hasFKey = _hasOwnProperty(this._storage, fkey);
              return (delete this._storage[fkey]) && hasFKey;
            }
            ensureMap(this);
            return this['[[SetData]]']['delete'](key);
          },

          clear: function clear() {
            requireSetSlot(this, 'clear');
            if (this._storage) {
              this._storage = emptyObject();
            }
            if (this['[[SetData]]']) {
              this['[[SetData]]'].clear();
            }
          },

          values: function values() {
            requireSetSlot(this, 'values');
            ensureMap(this);
            return this['[[SetData]]'].values();
          },

          entries: function entries() {
            requireSetSlot(this, 'entries');
            ensureMap(this);
            return this['[[SetData]]'].entries();
          },

          forEach: function forEach(callback) {
            requireSetSlot(this, 'forEach');
            var context = arguments.length > 1 ? arguments[1] : null;
            var entireSet = this;
            ensureMap(entireSet);
            this['[[SetData]]'].forEach(function (value, key) {
              if (context) {
                _call(callback, context, key, key, entireSet);
              } else {
                callback(key, key, entireSet);
              }
            });
          }
        });
        defineProperty(SetShim.prototype, 'keys', SetShim.prototype.values, true);
        addIterator(SetShim.prototype, SetShim.prototype.values);

        return SetShim;
      }())
    };

    if (globals.Map || globals.Set) {
      // Safari 8, for example, doesn't accept an iterable.
      var mapAcceptsArguments = valueOrFalseIfThrows(function () { return new Map([[1, 2]]).get(1) === 2; });
      if (!mapAcceptsArguments) {
        var OrigMapNoArgs = globals.Map;
        globals.Map = function Map() {
          if (!(this instanceof Map)) {
            throw new TypeError('Constructor Map requires "new"');
          }
          var m = new OrigMapNoArgs();
          if (arguments.length > 0) {
            addIterableToMap(Map, m, arguments[0]);
          }
          delete m.constructor;
          Object.setPrototypeOf(m, globals.Map.prototype);
          return m;
        };
        globals.Map.prototype = create(OrigMapNoArgs.prototype);
        defineProperty(globals.Map.prototype, 'constructor', globals.Map, true);
        Value.preserveToString(globals.Map, OrigMapNoArgs);
      }
      var testMap = new Map();
      var mapUsesSameValueZero = (function () {
        // Chrome 38-42, node 0.11/0.12, iojs 1/2 also have a bug when the Map has a size > 4
        var m = new Map([[1, 0], [2, 0], [3, 0], [4, 0]]);
        m.set(-0, m);
        return m.get(0) === m && m.get(-0) === m && m.has(0) && m.has(-0);
      }());
      var mapSupportsChaining = testMap.set(1, 2) === testMap;
      if (!mapUsesSameValueZero || !mapSupportsChaining) {
        var origMapSet = Map.prototype.set;
        overrideNative(Map.prototype, 'set', function set(k, v) {
          _call(origMapSet, this, k === 0 ? 0 : k, v);
          return this;
        });
      }
      if (!mapUsesSameValueZero) {
        var origMapGet = Map.prototype.get;
        var origMapHas = Map.prototype.has;
        defineProperties(Map.prototype, {
          get: function get(k) {
            return _call(origMapGet, this, k === 0 ? 0 : k);
          },
          has: function has(k) {
            return _call(origMapHas, this, k === 0 ? 0 : k);
          }
        }, true);
        Value.preserveToString(Map.prototype.get, origMapGet);
        Value.preserveToString(Map.prototype.has, origMapHas);
      }
      var testSet = new Set();
      var setUsesSameValueZero = (function (s) {
        s['delete'](0);
        s.add(-0);
        return !s.has(0);
      }(testSet));
      var setSupportsChaining = testSet.add(1) === testSet;
      if (!setUsesSameValueZero || !setSupportsChaining) {
        var origSetAdd = Set.prototype.add;
        Set.prototype.add = function add(v) {
          _call(origSetAdd, this, v === 0 ? 0 : v);
          return this;
        };
        Value.preserveToString(Set.prototype.add, origSetAdd);
      }
      if (!setUsesSameValueZero) {
        var origSetHas = Set.prototype.has;
        Set.prototype.has = function has(v) {
          return _call(origSetHas, this, v === 0 ? 0 : v);
        };
        Value.preserveToString(Set.prototype.has, origSetHas);
        var origSetDel = Set.prototype['delete'];
        Set.prototype['delete'] = function SetDelete(v) {
          return _call(origSetDel, this, v === 0 ? 0 : v);
        };
        Value.preserveToString(Set.prototype['delete'], origSetDel);
      }
      var mapSupportsSubclassing = supportsSubclassing(globals.Map, function (M) {
        var m = new M([]);
        // Firefox 32 is ok with the instantiating the subclass but will
        // throw when the map is used.
        m.set(42, 42);
        return m instanceof M;
      });
      var mapFailsToSupportSubclassing = Object.setPrototypeOf && !mapSupportsSubclassing; // without Object.setPrototypeOf, subclassing is not possible
      var mapRequiresNew = (function () {
        try {
          return !(globals.Map() instanceof globals.Map);
        } catch (e) {
          return e instanceof TypeError;
        }
      }());
      if (globals.Map.length !== 0 || mapFailsToSupportSubclassing || !mapRequiresNew) {
        var OrigMap = globals.Map;
        globals.Map = function Map() {
          if (!(this instanceof Map)) {
            throw new TypeError('Constructor Map requires "new"');
          }
          var m = new OrigMap();
          if (arguments.length > 0) {
            addIterableToMap(Map, m, arguments[0]);
          }
          delete m.constructor;
          Object.setPrototypeOf(m, Map.prototype);
          return m;
        };
        globals.Map.prototype = OrigMap.prototype;
        defineProperty(globals.Map.prototype, 'constructor', globals.Map, true);
        Value.preserveToString(globals.Map, OrigMap);
      }
      var setSupportsSubclassing = supportsSubclassing(globals.Set, function (S) {
        var s = new S([]);
        s.add(42, 42);
        return s instanceof S;
      });
      var setFailsToSupportSubclassing = Object.setPrototypeOf && !setSupportsSubclassing; // without Object.setPrototypeOf, subclassing is not possible
      var setRequiresNew = (function () {
        try {
          return !(globals.Set() instanceof globals.Set);
        } catch (e) {
          return e instanceof TypeError;
        }
      }());
      if (globals.Set.length !== 0 || setFailsToSupportSubclassing || !setRequiresNew) {
        var OrigSet = globals.Set;
        globals.Set = function Set() {
          if (!(this instanceof Set)) {
            throw new TypeError('Constructor Set requires "new"');
          }
          var s = new OrigSet();
          if (arguments.length > 0) {
            addIterableToSet(Set, s, arguments[0]);
          }
          delete s.constructor;
          Object.setPrototypeOf(s, Set.prototype);
          return s;
        };
        globals.Set.prototype = OrigSet.prototype;
        defineProperty(globals.Set.prototype, 'constructor', globals.Set, true);
        Value.preserveToString(globals.Set, OrigSet);
      }
      var mapIterationThrowsStopIterator = !valueOrFalseIfThrows(function () {
        return (new Map()).keys().next().done;
      });
      /*
        - In Firefox < 23, Map#size is a function.
        - In all current Firefox, Set#entries/keys/values & Map#clear do not exist
        - https://bugzilla.mozilla.org/show_bug.cgi?id=869996
        - In Firefox 24, Map and Set do not implement forEach
        - In Firefox 25 at least, Map and Set are callable without "new"
      */
      if (
        typeof globals.Map.prototype.clear !== 'function' ||
        new globals.Set().size !== 0 ||
        new globals.Map().size !== 0 ||
        typeof globals.Map.prototype.keys !== 'function' ||
        typeof globals.Set.prototype.keys !== 'function' ||
        typeof globals.Map.prototype.forEach !== 'function' ||
        typeof globals.Set.prototype.forEach !== 'function' ||
        isCallableWithoutNew(globals.Map) ||
        isCallableWithoutNew(globals.Set) ||
        typeof (new globals.Map().keys().next) !== 'function' || // Safari 8
        mapIterationThrowsStopIterator || // Firefox 25
        !mapSupportsSubclassing
      ) {
        defineProperties(globals, {
          Map: collectionShims.Map,
          Set: collectionShims.Set
        }, true);
      }

      if (globals.Set.prototype.keys !== globals.Set.prototype.values) {
        // Fixed in WebKit with https://bugs.webkit.org/show_bug.cgi?id=144190
        defineProperty(globals.Set.prototype, 'keys', globals.Set.prototype.values, true);
      }

      // Shim incomplete iterator implementations.
      addIterator(Object.getPrototypeOf((new globals.Map()).keys()));
      addIterator(Object.getPrototypeOf((new globals.Set()).keys()));

      if (functionsHaveNames && globals.Set.prototype.has.name !== 'has') {
        // Microsoft Edge v0.11.10074.0 is missing a name on Set#has
        var anonymousSetHas = globals.Set.prototype.has;
        overrideNative(globals.Set.prototype, 'has', function has(key) {
          return _call(anonymousSetHas, this, key);
        });
      }
    }
    defineProperties(globals, collectionShims);
    addDefaultSpecies(globals.Map);
    addDefaultSpecies(globals.Set);
  }

  var throwUnlessTargetIsObject = function throwUnlessTargetIsObject(target) {
    if (!ES.TypeIsObject(target)) {
      throw new TypeError('target must be an object');
    }
  };

  // Some Reflect methods are basically the same as
  // those on the Object global, except that a TypeError is thrown if
  // target isn't an object. As well as returning a boolean indicating
  // the success of the operation.
  var ReflectShims = {
    // Apply method in a functional form.
    apply: function apply() {
      return ES.Call(ES.Call, null, arguments);
    },

    // New operator in a functional form.
    construct: function construct(constructor, args) {
      if (!ES.IsConstructor(constructor)) {
        throw new TypeError('First argument must be a constructor.');
      }
      var newTarget = arguments.length > 2 ? arguments[2] : constructor;
      if (!ES.IsConstructor(newTarget)) {
        throw new TypeError('new.target must be a constructor.');
      }
      return ES.Construct(constructor, args, newTarget, 'internal');
    },

    // When deleting a non-existent or configurable property,
    // true is returned.
    // When attempting to delete a non-configurable property,
    // it will return false.
    deleteProperty: function deleteProperty(target, key) {
      throwUnlessTargetIsObject(target);
      if (supportsDescriptors) {
        var desc = Object.getOwnPropertyDescriptor(target, key);

        if (desc && !desc.configurable) {
          return false;
        }
      }

      // Will return true.
      return delete target[key];
    },

    enumerate: function enumerate(target) {
      throwUnlessTargetIsObject(target);
      return new ObjectIterator(target, 'key');
    },

    has: function has(target, key) {
      throwUnlessTargetIsObject(target);
      return key in target;
    }
  };

  if (Object.getOwnPropertyNames) {
    Object.assign(ReflectShims, {
      // Basically the result of calling the internal [[OwnPropertyKeys]].
      // Concatenating propertyNames and propertySymbols should do the trick.
      // This should continue to work together with a Symbol shim
      // which overrides Object.getOwnPropertyNames and implements
      // Object.getOwnPropertySymbols.
      ownKeys: function ownKeys(target) {
        throwUnlessTargetIsObject(target);
        var keys = Object.getOwnPropertyNames(target);

        if (ES.IsCallable(Object.getOwnPropertySymbols)) {
          _pushApply(keys, Object.getOwnPropertySymbols(target));
        }

        return keys;
      }
    });
  }

  var callAndCatchException = function ConvertExceptionToBoolean(func) {
    return !throwsError(func);
  };

  if (Object.preventExtensions) {
    Object.assign(ReflectShims, {
      isExtensible: function isExtensible(target) {
        throwUnlessTargetIsObject(target);
        return Object.isExtensible(target);
      },
      preventExtensions: function preventExtensions(target) {
        throwUnlessTargetIsObject(target);
        return callAndCatchException(function () {
          Object.preventExtensions(target);
        });
      }
    });
  }

  if (supportsDescriptors) {
    var internalGet = function get(target, key, receiver) {
      var desc = Object.getOwnPropertyDescriptor(target, key);

      if (!desc) {
        var parent = Object.getPrototypeOf(target);

        if (parent === null) {
          return void 0;
        }

        return internalGet(parent, key, receiver);
      }

      if ('value' in desc) {
        return desc.value;
      }

      if (desc.get) {
        return ES.Call(desc.get, receiver);
      }

      return void 0;
    };

    var internalSet = function set(target, key, value, receiver) {
      var desc = Object.getOwnPropertyDescriptor(target, key);

      if (!desc) {
        var parent = Object.getPrototypeOf(target);

        if (parent !== null) {
          return internalSet(parent, key, value, receiver);
        }

        desc = {
          value: void 0,
          writable: true,
          enumerable: true,
          configurable: true
        };
      }

      if ('value' in desc) {
        if (!desc.writable) {
          return false;
        }

        if (!ES.TypeIsObject(receiver)) {
          return false;
        }

        var existingDesc = Object.getOwnPropertyDescriptor(receiver, key);

        if (existingDesc) {
          return Reflect.defineProperty(receiver, key, {
            value: value
          });
        } else {
          return Reflect.defineProperty(receiver, key, {
            value: value,
            writable: true,
            enumerable: true,
            configurable: true
          });
        }
      }

      if (desc.set) {
        _call(desc.set, receiver, value);
        return true;
      }

      return false;
    };

    Object.assign(ReflectShims, {
      defineProperty: function defineProperty(target, propertyKey, attributes) {
        throwUnlessTargetIsObject(target);
        return callAndCatchException(function () {
          Object.defineProperty(target, propertyKey, attributes);
        });
      },

      getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
        throwUnlessTargetIsObject(target);
        return Object.getOwnPropertyDescriptor(target, propertyKey);
      },

      // Syntax in a functional form.
      get: function get(target, key) {
        throwUnlessTargetIsObject(target);
        var receiver = arguments.length > 2 ? arguments[2] : target;

        return internalGet(target, key, receiver);
      },

      set: function set(target, key, value) {
        throwUnlessTargetIsObject(target);
        var receiver = arguments.length > 3 ? arguments[3] : target;

        return internalSet(target, key, value, receiver);
      }
    });
  }

  if (Object.getPrototypeOf) {
    var objectDotGetPrototypeOf = Object.getPrototypeOf;
    ReflectShims.getPrototypeOf = function getPrototypeOf(target) {
      throwUnlessTargetIsObject(target);
      return objectDotGetPrototypeOf(target);
    };
  }

  if (Object.setPrototypeOf && ReflectShims.getPrototypeOf) {
    var willCreateCircularPrototype = function (object, lastProto) {
      var proto = lastProto;
      while (proto) {
        if (object === proto) {
          return true;
        }
        proto = ReflectShims.getPrototypeOf(proto);
      }
      return false;
    };

    Object.assign(ReflectShims, {
      // Sets the prototype of the given object.
      // Returns true on success, otherwise false.
      setPrototypeOf: function setPrototypeOf(object, proto) {
        throwUnlessTargetIsObject(object);
        if (proto !== null && !ES.TypeIsObject(proto)) {
          throw new TypeError('proto must be an object or null');
        }

        // If they already are the same, we're done.
        if (proto === Reflect.getPrototypeOf(object)) {
          return true;
        }

        // Cannot alter prototype if object not extensible.
        if (Reflect.isExtensible && !Reflect.isExtensible(object)) {
          return false;
        }

        // Ensure that we do not create a circular prototype chain.
        if (willCreateCircularPrototype(object, proto)) {
          return false;
        }

        Object.setPrototypeOf(object, proto);

        return true;
      }
    });
  }
  var defineOrOverrideReflectProperty = function (key, shim) {
    if (!ES.IsCallable(globals.Reflect[key])) {
      defineProperty(globals.Reflect, key, shim);
    } else {
      var acceptsPrimitives = valueOrFalseIfThrows(function () {
        globals.Reflect[key](1);
        globals.Reflect[key](NaN);
        globals.Reflect[key](true);
        return true;
      });
      if (acceptsPrimitives) {
        overrideNative(globals.Reflect, key, shim);
      }
    }
  };
  Object.keys(ReflectShims).forEach(function (key) {
    defineOrOverrideReflectProperty(key, ReflectShims[key]);
  });
  if (functionsHaveNames && globals.Reflect.getPrototypeOf.name !== 'getPrototypeOf') {
    var originalReflectGetProto = globals.Reflect.getPrototypeOf;
    overrideNative(globals.Reflect, 'getPrototypeOf', function getPrototypeOf(target) {
      return _call(originalReflectGetProto, globals.Reflect, target);
    });
  }
  if (globals.Reflect.setPrototypeOf) {
    if (valueOrFalseIfThrows(function () {
      globals.Reflect.setPrototypeOf(1, {});
      return true;
    })) {
      overrideNative(globals.Reflect, 'setPrototypeOf', ReflectShims.setPrototypeOf);
    }
  }
  if (globals.Reflect.defineProperty) {
    if (!valueOrFalseIfThrows(function () {
      var basic = !globals.Reflect.defineProperty(1, 'test', { value: 1 });
      // "extensible" fails on Edge 0.12
      var extensible = typeof Object.preventExtensions !== 'function' || !globals.Reflect.defineProperty(Object.preventExtensions({}), 'test', {});
      return basic && extensible;
    })) {
      overrideNative(globals.Reflect, 'defineProperty', ReflectShims.defineProperty);
    }
  }
  if (globals.Reflect.construct) {
    if (!valueOrFalseIfThrows(function () {
      var F = function F() {};
      return globals.Reflect.construct(function () {}, [], F) instanceof F;
    })) {
      overrideNative(globals.Reflect, 'construct', ReflectShims.construct);
    }
  }

  if (String(new Date(NaN)) !== 'Invalid Date') {
    var dateToString = Date.prototype.toString;
    var shimmedDateToString = function toString() {
      var valueOf = +this;
      if (valueOf !== valueOf) {
        return 'Invalid Date';
      }
      return ES.Call(dateToString, this);
    };
    overrideNative(Date.prototype, 'toString', shimmedDateToString);
  }

  // Annex B HTML methods
  // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-additional-properties-of-the-string.prototype-object
  var stringHTMLshims = {
    anchor: function anchor(name) { return ES.CreateHTML(this, 'a', 'name', name); },
    big: function big() { return ES.CreateHTML(this, 'big', '', ''); },
    blink: function blink() { return ES.CreateHTML(this, 'blink', '', ''); },
    bold: function bold() { return ES.CreateHTML(this, 'b', '', ''); },
    fixed: function fixed() { return ES.CreateHTML(this, 'tt', '', ''); },
    fontcolor: function fontcolor(color) { return ES.CreateHTML(this, 'font', 'color', color); },
    fontsize: function fontsize(size) { return ES.CreateHTML(this, 'font', 'size', size); },
    italics: function italics() { return ES.CreateHTML(this, 'i', '', ''); },
    link: function link(url) { return ES.CreateHTML(this, 'a', 'href', url); },
    small: function small() { return ES.CreateHTML(this, 'small', '', ''); },
    strike: function strike() { return ES.CreateHTML(this, 'strike', '', ''); },
    sub: function sub() { return ES.CreateHTML(this, 'sub', '', ''); },
    sup: function sub() { return ES.CreateHTML(this, 'sup', '', ''); }
  };
  _forEach(Object.keys(stringHTMLshims), function (key) {
    var method = String.prototype[key];
    var shouldOverwrite = false;
    if (ES.IsCallable(method)) {
      var output = _call(method, '', ' " ');
      var quotesCount = _concat([], output.match(/"/g)).length;
      shouldOverwrite = output !== output.toLowerCase() || quotesCount > 2;
    } else {
      shouldOverwrite = true;
    }
    if (shouldOverwrite) {
      overrideNative(String.prototype, key, stringHTMLshims[key]);
    }
  });

  var JSONstringifiesSymbols = (function () {
    // Microsoft Edge v0.12 stringifies Symbols incorrectly
    if (!hasSymbols) { return false; } // Symbols are not supported
    var stringify = typeof JSON === 'object' && typeof JSON.stringify === 'function' ? JSON.stringify : null;
    if (!stringify) { return false; } // JSON.stringify is not supported
    if (typeof stringify(Symbol()) !== 'undefined') { return true; } // Symbols should become `undefined`
    if (stringify([Symbol()]) !== '[null]') { return true; } // Symbols in arrays should become `null`
    var obj = { a: Symbol() };
    obj[Symbol()] = true;
    if (stringify(obj) !== '{}') { return true; } // Symbol-valued keys *and* Symbol-valued properties should be omitted
    return false;
  }());
  var JSONstringifyAcceptsObjectSymbol = valueOrFalseIfThrows(function () {
    // Chrome 45 throws on stringifying object symbols
    if (!hasSymbols) { return true; } // Symbols are not supported
    return JSON.stringify(Object(Symbol())) === '{}' && JSON.stringify([Object(Symbol())]) === '[{}]';
  });
  if (JSONstringifiesSymbols || !JSONstringifyAcceptsObjectSymbol) {
    var origStringify = JSON.stringify;
    overrideNative(JSON, 'stringify', function stringify(value) {
      if (typeof value === 'symbol') { return; }
      var replacer;
      if (arguments.length > 1) {
        replacer = arguments[1];
      }
      var args = [value];
      if (!isArray(replacer)) {
        var replaceFn = ES.IsCallable(replacer) ? replacer : null;
        var wrappedReplacer = function (key, val) {
          var parsedValue = replaceFn ? _call(replaceFn, this, key, val) : val;
          if (typeof parsedValue !== 'symbol') {
            if (Type.symbol(parsedValue)) {
              return assignTo({})(parsedValue);
            } else {
              return parsedValue;
            }
          }
        };
        args.push(wrappedReplacer);
      } else {
        // create wrapped replacer that handles an array replacer?
        args.push(replacer);
      }
      if (arguments.length > 2) {
        args.push(arguments[2]);
      }
      return origStringify.apply(this, args);
    });
  }

  return globals;
}));

}).call(this,require('_process'),typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"_process":73}],75:[function(require,module,exports){
'use strict';

//
// We store our EE objects in a plain object whose properties are event names.
// If `Object.create(null)` is not supported we prefix the event names with a
// `~` to make sure that the built-in object properties are not overridden or
// used as an attack vector.
// We also assume that `Object.create(null)` is available when the event name
// is an ES6 Symbol.
//
var prefix = typeof Object.create !== 'function' ? '~' : false;

/**
 * Representation of a single EventEmitter function.
 *
 * @param {Function} fn Event handler to be called.
 * @param {Mixed} context Context for function execution.
 * @param {Boolean} once Only emit once
 * @api private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Minimal EventEmitter interface that is molded against the Node.js
 * EventEmitter interface.
 *
 * @constructor
 * @api public
 */
function EventEmitter() { /* Nothing to set */ }

/**
 * Holds the assigned EventEmitters by name.
 *
 * @type {Object}
 * @private
 */
EventEmitter.prototype._events = undefined;

/**
 * Return a list of assigned event listeners.
 *
 * @param {String} event The events that should be listed.
 * @param {Boolean} exists We only need to know if there are listeners.
 * @returns {Array|Boolean}
 * @api public
 */
EventEmitter.prototype.listeners = function listeners(event, exists) {
  var evt = prefix ? prefix + event : event
    , available = this._events && this._events[evt];

  if (exists) return !!available;
  if (!available) return [];
  if (available.fn) return [available.fn];

  for (var i = 0, l = available.length, ee = new Array(l); i < l; i++) {
    ee[i] = available[i].fn;
  }

  return ee;
};

/**
 * Emit an event to all registered event listeners.
 *
 * @param {String} event The name of the event.
 * @returns {Boolean} Indication if we've emitted an event.
 * @api public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events || !this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if ('function' === typeof listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Register a new EventListener for the given event.
 *
 * @param {String} event Name of the event.
 * @param {Functon} fn Callback function.
 * @param {Mixed} context The context of the function.
 * @api public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  var listener = new EE(fn, context || this)
    , evt = prefix ? prefix + event : event;

  if (!this._events) this._events = prefix ? {} : Object.create(null);
  if (!this._events[evt]) this._events[evt] = listener;
  else {
    if (!this._events[evt].fn) this._events[evt].push(listener);
    else this._events[evt] = [
      this._events[evt], listener
    ];
  }

  return this;
};

/**
 * Add an EventListener that's only called once.
 *
 * @param {String} event Name of the event.
 * @param {Function} fn Callback function.
 * @param {Mixed} context The context of the function.
 * @api public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  var listener = new EE(fn, context || this, true)
    , evt = prefix ? prefix + event : event;

  if (!this._events) this._events = prefix ? {} : Object.create(null);
  if (!this._events[evt]) this._events[evt] = listener;
  else {
    if (!this._events[evt].fn) this._events[evt].push(listener);
    else this._events[evt] = [
      this._events[evt], listener
    ];
  }

  return this;
};

/**
 * Remove event listeners.
 *
 * @param {String} event The event we want to remove.
 * @param {Function} fn The listener that we need to find.
 * @param {Mixed} context Only remove listeners matching this context.
 * @param {Boolean} once Only remove once listeners.
 * @api public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events || !this._events[evt]) return this;

  var listeners = this._events[evt]
    , events = [];

  if (fn) {
    if (listeners.fn) {
      if (
           listeners.fn !== fn
        || (once && !listeners.once)
        || (context && listeners.context !== context)
      ) {
        events.push(listeners);
      }
    } else {
      for (var i = 0, length = listeners.length; i < length; i++) {
        if (
             listeners[i].fn !== fn
          || (once && !listeners[i].once)
          || (context && listeners[i].context !== context)
        ) {
          events.push(listeners[i]);
        }
      }
    }
  }

  //
  // Reset the array, or remove it completely if we have no more listeners.
  //
  if (events.length) {
    this._events[evt] = events.length === 1 ? events[0] : events;
  } else {
    delete this._events[evt];
  }

  return this;
};

/**
 * Remove all listeners or only the listeners for the specified event.
 *
 * @param {String} event The event want to remove all listeners for.
 * @api public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  if (!this._events) return this;

  if (event) delete this._events[prefix ? prefix + event : event];
  else this._events = prefix ? {} : Object.create(null);

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// This function doesn't apply anymore.
//
EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
  return this;
};

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Expose the module.
//
if ('undefined' !== typeof module) {
  module.exports = EventEmitter;
}

},{}],76:[function(require,module,exports){
(function (global){
/**
 * @license
 * lodash 3.10.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern -d -o ./index.js`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
;(function() {

  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
  var undefined;

  /** Used as the semantic version number. */
  var VERSION = '3.10.1';

  /** Used to compose bitmasks for wrapper metadata. */
  var BIND_FLAG = 1,
      BIND_KEY_FLAG = 2,
      CURRY_BOUND_FLAG = 4,
      CURRY_FLAG = 8,
      CURRY_RIGHT_FLAG = 16,
      PARTIAL_FLAG = 32,
      PARTIAL_RIGHT_FLAG = 64,
      ARY_FLAG = 128,
      REARG_FLAG = 256;

  /** Used as default options for `_.trunc`. */
  var DEFAULT_TRUNC_LENGTH = 30,
      DEFAULT_TRUNC_OMISSION = '...';

  /** Used to detect when a function becomes hot. */
  var HOT_COUNT = 150,
      HOT_SPAN = 16;

  /** Used as the size to enable large array optimizations. */
  var LARGE_ARRAY_SIZE = 200;

  /** Used to indicate the type of lazy iteratees. */
  var LAZY_FILTER_FLAG = 1,
      LAZY_MAP_FLAG = 2;

  /** Used as the `TypeError` message for "Functions" methods. */
  var FUNC_ERROR_TEXT = 'Expected a function';

  /** Used as the internal argument placeholder. */
  var PLACEHOLDER = '__lodash_placeholder__';

  /** `Object#toString` result references. */
  var argsTag = '[object Arguments]',
      arrayTag = '[object Array]',
      boolTag = '[object Boolean]',
      dateTag = '[object Date]',
      errorTag = '[object Error]',
      funcTag = '[object Function]',
      mapTag = '[object Map]',
      numberTag = '[object Number]',
      objectTag = '[object Object]',
      regexpTag = '[object RegExp]',
      setTag = '[object Set]',
      stringTag = '[object String]',
      weakMapTag = '[object WeakMap]';

  var arrayBufferTag = '[object ArrayBuffer]',
      float32Tag = '[object Float32Array]',
      float64Tag = '[object Float64Array]',
      int8Tag = '[object Int8Array]',
      int16Tag = '[object Int16Array]',
      int32Tag = '[object Int32Array]',
      uint8Tag = '[object Uint8Array]',
      uint8ClampedTag = '[object Uint8ClampedArray]',
      uint16Tag = '[object Uint16Array]',
      uint32Tag = '[object Uint32Array]';

  /** Used to match empty string literals in compiled template source. */
  var reEmptyStringLeading = /\b__p \+= '';/g,
      reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
      reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;

  /** Used to match HTML entities and HTML characters. */
  var reEscapedHtml = /&(?:amp|lt|gt|quot|#39|#96);/g,
      reUnescapedHtml = /[&<>"'`]/g,
      reHasEscapedHtml = RegExp(reEscapedHtml.source),
      reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

  /** Used to match template delimiters. */
  var reEscape = /<%-([\s\S]+?)%>/g,
      reEvaluate = /<%([\s\S]+?)%>/g,
      reInterpolate = /<%=([\s\S]+?)%>/g;

  /** Used to match property names within property paths. */
  var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,
      reIsPlainProp = /^\w*$/,
      rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g;

  /**
   * Used to match `RegExp` [syntax characters](http://ecma-international.org/ecma-262/6.0/#sec-patterns)
   * and those outlined by [`EscapeRegExpPattern`](http://ecma-international.org/ecma-262/6.0/#sec-escaperegexppattern).
   */
  var reRegExpChars = /^[:!,]|[\\^$.*+?()[\]{}|\/]|(^[0-9a-fA-Fnrtuvx])|([\n\r\u2028\u2029])/g,
      reHasRegExpChars = RegExp(reRegExpChars.source);

  /** Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks). */
  var reComboMark = /[\u0300-\u036f\ufe20-\ufe23]/g;

  /** Used to match backslashes in property paths. */
  var reEscapeChar = /\\(\\)?/g;

  /** Used to match [ES template delimiters](http://ecma-international.org/ecma-262/6.0/#sec-template-literal-lexical-components). */
  var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;

  /** Used to match `RegExp` flags from their coerced string values. */
  var reFlags = /\w*$/;

  /** Used to detect hexadecimal string values. */
  var reHasHexPrefix = /^0[xX]/;

  /** Used to detect host constructors (Safari > 5). */
  var reIsHostCtor = /^\[object .+?Constructor\]$/;

  /** Used to detect unsigned integer values. */
  var reIsUint = /^\d+$/;

  /** Used to match latin-1 supplementary letters (excluding mathematical operators). */
  var reLatin1 = /[\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]/g;

  /** Used to ensure capturing order of template delimiters. */
  var reNoMatch = /($^)/;

  /** Used to match unescaped characters in compiled string literals. */
  var reUnescapedString = /['\n\r\u2028\u2029\\]/g;

  /** Used to match words to create compound words. */
  var reWords = (function() {
    var upper = '[A-Z\\xc0-\\xd6\\xd8-\\xde]',
        lower = '[a-z\\xdf-\\xf6\\xf8-\\xff]+';

    return RegExp(upper + '+(?=' + upper + lower + ')|' + upper + '?' + lower + '|' + upper + '+|[0-9]+', 'g');
  }());

  /** Used to assign default `context` object properties. */
  var contextProps = [
    'Array', 'ArrayBuffer', 'Date', 'Error', 'Float32Array', 'Float64Array',
    'Function', 'Int8Array', 'Int16Array', 'Int32Array', 'Math', 'Number',
    'Object', 'RegExp', 'Set', 'String', '_', 'clearTimeout', 'isFinite',
    'parseFloat', 'parseInt', 'setTimeout', 'TypeError', 'Uint8Array',
    'Uint8ClampedArray', 'Uint16Array', 'Uint32Array', 'WeakMap'
  ];

  /** Used to make template sourceURLs easier to identify. */
  var templateCounter = -1;

  /** Used to identify `toStringTag` values of typed arrays. */
  var typedArrayTags = {};
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
  typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
  typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
  typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
  typedArrayTags[uint32Tag] = true;
  typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
  typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
  typedArrayTags[dateTag] = typedArrayTags[errorTag] =
  typedArrayTags[funcTag] = typedArrayTags[mapTag] =
  typedArrayTags[numberTag] = typedArrayTags[objectTag] =
  typedArrayTags[regexpTag] = typedArrayTags[setTag] =
  typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

  /** Used to identify `toStringTag` values supported by `_.clone`. */
  var cloneableTags = {};
  cloneableTags[argsTag] = cloneableTags[arrayTag] =
  cloneableTags[arrayBufferTag] = cloneableTags[boolTag] =
  cloneableTags[dateTag] = cloneableTags[float32Tag] =
  cloneableTags[float64Tag] = cloneableTags[int8Tag] =
  cloneableTags[int16Tag] = cloneableTags[int32Tag] =
  cloneableTags[numberTag] = cloneableTags[objectTag] =
  cloneableTags[regexpTag] = cloneableTags[stringTag] =
  cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
  cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
  cloneableTags[errorTag] = cloneableTags[funcTag] =
  cloneableTags[mapTag] = cloneableTags[setTag] =
  cloneableTags[weakMapTag] = false;

  /** Used to map latin-1 supplementary letters to basic latin letters. */
  var deburredLetters = {
    '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
    '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
    '\xc7': 'C',  '\xe7': 'c',
    '\xd0': 'D',  '\xf0': 'd',
    '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
    '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
    '\xcC': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
    '\xeC': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
    '\xd1': 'N',  '\xf1': 'n',
    '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
    '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
    '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
    '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
    '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
    '\xc6': 'Ae', '\xe6': 'ae',
    '\xde': 'Th', '\xfe': 'th',
    '\xdf': 'ss'
  };

  /** Used to map characters to HTML entities. */
  var htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '`': '&#96;'
  };

  /** Used to map HTML entities to characters. */
  var htmlUnescapes = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&#96;': '`'
  };

  /** Used to determine if values are of the language type `Object`. */
  var objectTypes = {
    'function': true,
    'object': true
  };

  /** Used to escape characters for inclusion in compiled regexes. */
  var regexpEscapes = {
    '0': 'x30', '1': 'x31', '2': 'x32', '3': 'x33', '4': 'x34',
    '5': 'x35', '6': 'x36', '7': 'x37', '8': 'x38', '9': 'x39',
    'A': 'x41', 'B': 'x42', 'C': 'x43', 'D': 'x44', 'E': 'x45', 'F': 'x46',
    'a': 'x61', 'b': 'x62', 'c': 'x63', 'd': 'x64', 'e': 'x65', 'f': 'x66',
    'n': 'x6e', 'r': 'x72', 't': 'x74', 'u': 'x75', 'v': 'x76', 'x': 'x78'
  };

  /** Used to escape characters for inclusion in compiled string literals. */
  var stringEscapes = {
    '\\': '\\',
    "'": "'",
    '\n': 'n',
    '\r': 'r',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  /** Detect free variable `exports`. */
  var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;

  /** Detect free variable `global` from Node.js. */
  var freeGlobal = freeExports && freeModule && typeof global == 'object' && global && global.Object && global;

  /** Detect free variable `self`. */
  var freeSelf = objectTypes[typeof self] && self && self.Object && self;

  /** Detect free variable `window`. */
  var freeWindow = objectTypes[typeof window] && window && window.Object && window;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports && freeExports;

  /**
   * Used as a reference to the global object.
   *
   * The `this` value is used if it's the global object to avoid Greasemonkey's
   * restricted `window` object, otherwise the `window` object is used.
   */
  var root = freeGlobal || ((freeWindow !== (this && this.window)) && freeWindow) || freeSelf || this;

  /*--------------------------------------------------------------------------*/

  /**
   * The base implementation of `compareAscending` which compares values and
   * sorts them in ascending order without guaranteeing a stable sort.
   *
   * @private
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {number} Returns the sort order indicator for `value`.
   */
  function baseCompareAscending(value, other) {
    if (value !== other) {
      var valIsNull = value === null,
          valIsUndef = value === undefined,
          valIsReflexive = value === value;

      var othIsNull = other === null,
          othIsUndef = other === undefined,
          othIsReflexive = other === other;

      if ((value > other && !othIsNull) || !valIsReflexive ||
          (valIsNull && !othIsUndef && othIsReflexive) ||
          (valIsUndef && othIsReflexive)) {
        return 1;
      }
      if ((value < other && !valIsNull) || !othIsReflexive ||
          (othIsNull && !valIsUndef && valIsReflexive) ||
          (othIsUndef && valIsReflexive)) {
        return -1;
      }
    }
    return 0;
  }

  /**
   * The base implementation of `_.findIndex` and `_.findLastIndex` without
   * support for callback shorthands and `this` binding.
   *
   * @private
   * @param {Array} array The array to search.
   * @param {Function} predicate The function invoked per iteration.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function baseFindIndex(array, predicate, fromRight) {
    var length = array.length,
        index = fromRight ? length : -1;

    while ((fromRight ? index-- : ++index < length)) {
      if (predicate(array[index], index, array)) {
        return index;
      }
    }
    return -1;
  }

  /**
   * The base implementation of `_.indexOf` without support for binary searches.
   *
   * @private
   * @param {Array} array The array to search.
   * @param {*} value The value to search for.
   * @param {number} fromIndex The index to search from.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function baseIndexOf(array, value, fromIndex) {
    if (value !== value) {
      return indexOfNaN(array, fromIndex);
    }
    var index = fromIndex - 1,
        length = array.length;

    while (++index < length) {
      if (array[index] === value) {
        return index;
      }
    }
    return -1;
  }

  /**
   * The base implementation of `_.isFunction` without support for environments
   * with incorrect `typeof` results.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
   */
  function baseIsFunction(value) {
    // Avoid a Chakra JIT bug in compatibility modes of IE 11.
    // See https://github.com/jashkenas/underscore/issues/1621 for more details.
    return typeof value == 'function' || false;
  }

  /**
   * Converts `value` to a string if it's not one. An empty string is returned
   * for `null` or `undefined` values.
   *
   * @private
   * @param {*} value The value to process.
   * @returns {string} Returns the string.
   */
  function baseToString(value) {
    return value == null ? '' : (value + '');
  }

  /**
   * Used by `_.trim` and `_.trimLeft` to get the index of the first character
   * of `string` that is not found in `chars`.
   *
   * @private
   * @param {string} string The string to inspect.
   * @param {string} chars The characters to find.
   * @returns {number} Returns the index of the first character not found in `chars`.
   */
  function charsLeftIndex(string, chars) {
    var index = -1,
        length = string.length;

    while (++index < length && chars.indexOf(string.charAt(index)) > -1) {}
    return index;
  }

  /**
   * Used by `_.trim` and `_.trimRight` to get the index of the last character
   * of `string` that is not found in `chars`.
   *
   * @private
   * @param {string} string The string to inspect.
   * @param {string} chars The characters to find.
   * @returns {number} Returns the index of the last character not found in `chars`.
   */
  function charsRightIndex(string, chars) {
    var index = string.length;

    while (index-- && chars.indexOf(string.charAt(index)) > -1) {}
    return index;
  }

  /**
   * Used by `_.sortBy` to compare transformed elements of a collection and stable
   * sort them in ascending order.
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @returns {number} Returns the sort order indicator for `object`.
   */
  function compareAscending(object, other) {
    return baseCompareAscending(object.criteria, other.criteria) || (object.index - other.index);
  }

  /**
   * Used by `_.sortByOrder` to compare multiple properties of a value to another
   * and stable sort them.
   *
   * If `orders` is unspecified, all valuess are sorted in ascending order. Otherwise,
   * a value is sorted in ascending order if its corresponding order is "asc", and
   * descending if "desc".
   *
   * @private
   * @param {Object} object The object to compare.
   * @param {Object} other The other object to compare.
   * @param {boolean[]} orders The order to sort by for each property.
   * @returns {number} Returns the sort order indicator for `object`.
   */
  function compareMultiple(object, other, orders) {
    var index = -1,
        objCriteria = object.criteria,
        othCriteria = other.criteria,
        length = objCriteria.length,
        ordersLength = orders.length;

    while (++index < length) {
      var result = baseCompareAscending(objCriteria[index], othCriteria[index]);
      if (result) {
        if (index >= ordersLength) {
          return result;
        }
        var order = orders[index];
        return result * ((order === 'asc' || order === true) ? 1 : -1);
      }
    }
    // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
    // that causes it, under certain circumstances, to provide the same value for
    // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
    // for more details.
    //
    // This also ensures a stable sort in V8 and other engines.
    // See https://code.google.com/p/v8/issues/detail?id=90 for more details.
    return object.index - other.index;
  }

  /**
   * Used by `_.deburr` to convert latin-1 supplementary letters to basic latin letters.
   *
   * @private
   * @param {string} letter The matched letter to deburr.
   * @returns {string} Returns the deburred letter.
   */
  function deburrLetter(letter) {
    return deburredLetters[letter];
  }

  /**
   * Used by `_.escape` to convert characters to HTML entities.
   *
   * @private
   * @param {string} chr The matched character to escape.
   * @returns {string} Returns the escaped character.
   */
  function escapeHtmlChar(chr) {
    return htmlEscapes[chr];
  }

  /**
   * Used by `_.escapeRegExp` to escape characters for inclusion in compiled regexes.
   *
   * @private
   * @param {string} chr The matched character to escape.
   * @param {string} leadingChar The capture group for a leading character.
   * @param {string} whitespaceChar The capture group for a whitespace character.
   * @returns {string} Returns the escaped character.
   */
  function escapeRegExpChar(chr, leadingChar, whitespaceChar) {
    if (leadingChar) {
      chr = regexpEscapes[chr];
    } else if (whitespaceChar) {
      chr = stringEscapes[chr];
    }
    return '\\' + chr;
  }

  /**
   * Used by `_.template` to escape characters for inclusion in compiled string literals.
   *
   * @private
   * @param {string} chr The matched character to escape.
   * @returns {string} Returns the escaped character.
   */
  function escapeStringChar(chr) {
    return '\\' + stringEscapes[chr];
  }

  /**
   * Gets the index at which the first occurrence of `NaN` is found in `array`.
   *
   * @private
   * @param {Array} array The array to search.
   * @param {number} fromIndex The index to search from.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {number} Returns the index of the matched `NaN`, else `-1`.
   */
  function indexOfNaN(array, fromIndex, fromRight) {
    var length = array.length,
        index = fromIndex + (fromRight ? 0 : -1);

    while ((fromRight ? index-- : ++index < length)) {
      var other = array[index];
      if (other !== other) {
        return index;
      }
    }
    return -1;
  }

  /**
   * Checks if `value` is object-like.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   */
  function isObjectLike(value) {
    return !!value && typeof value == 'object';
  }

  /**
   * Used by `trimmedLeftIndex` and `trimmedRightIndex` to determine if a
   * character code is whitespace.
   *
   * @private
   * @param {number} charCode The character code to inspect.
   * @returns {boolean} Returns `true` if `charCode` is whitespace, else `false`.
   */
  function isSpace(charCode) {
    return ((charCode <= 160 && (charCode >= 9 && charCode <= 13) || charCode == 32 || charCode == 160) || charCode == 5760 || charCode == 6158 ||
      (charCode >= 8192 && (charCode <= 8202 || charCode == 8232 || charCode == 8233 || charCode == 8239 || charCode == 8287 || charCode == 12288 || charCode == 65279)));
  }

  /**
   * Replaces all `placeholder` elements in `array` with an internal placeholder
   * and returns an array of their indexes.
   *
   * @private
   * @param {Array} array The array to modify.
   * @param {*} placeholder The placeholder to replace.
   * @returns {Array} Returns the new array of placeholder indexes.
   */
  function replaceHolders(array, placeholder) {
    var index = -1,
        length = array.length,
        resIndex = -1,
        result = [];

    while (++index < length) {
      if (array[index] === placeholder) {
        array[index] = PLACEHOLDER;
        result[++resIndex] = index;
      }
    }
    return result;
  }

  /**
   * An implementation of `_.uniq` optimized for sorted arrays without support
   * for callback shorthands and `this` binding.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {Function} [iteratee] The function invoked per iteration.
   * @returns {Array} Returns the new duplicate-value-free array.
   */
  function sortedUniq(array, iteratee) {
    var seen,
        index = -1,
        length = array.length,
        resIndex = -1,
        result = [];

    while (++index < length) {
      var value = array[index],
          computed = iteratee ? iteratee(value, index, array) : value;

      if (!index || seen !== computed) {
        seen = computed;
        result[++resIndex] = value;
      }
    }
    return result;
  }

  /**
   * Used by `_.trim` and `_.trimLeft` to get the index of the first non-whitespace
   * character of `string`.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {number} Returns the index of the first non-whitespace character.
   */
  function trimmedLeftIndex(string) {
    var index = -1,
        length = string.length;

    while (++index < length && isSpace(string.charCodeAt(index))) {}
    return index;
  }

  /**
   * Used by `_.trim` and `_.trimRight` to get the index of the last non-whitespace
   * character of `string`.
   *
   * @private
   * @param {string} string The string to inspect.
   * @returns {number} Returns the index of the last non-whitespace character.
   */
  function trimmedRightIndex(string) {
    var index = string.length;

    while (index-- && isSpace(string.charCodeAt(index))) {}
    return index;
  }

  /**
   * Used by `_.unescape` to convert HTML entities to characters.
   *
   * @private
   * @param {string} chr The matched character to unescape.
   * @returns {string} Returns the unescaped character.
   */
  function unescapeHtmlChar(chr) {
    return htmlUnescapes[chr];
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Create a new pristine `lodash` function using the given `context` object.
   *
   * @static
   * @memberOf _
   * @category Utility
   * @param {Object} [context=root] The context object.
   * @returns {Function} Returns a new `lodash` function.
   * @example
   *
   * _.mixin({ 'foo': _.constant('foo') });
   *
   * var lodash = _.runInContext();
   * lodash.mixin({ 'bar': lodash.constant('bar') });
   *
   * _.isFunction(_.foo);
   * // => true
   * _.isFunction(_.bar);
   * // => false
   *
   * lodash.isFunction(lodash.foo);
   * // => false
   * lodash.isFunction(lodash.bar);
   * // => true
   *
   * // using `context` to mock `Date#getTime` use in `_.now`
   * var mock = _.runInContext({
   *   'Date': function() {
   *     return { 'getTime': getTimeMock };
   *   }
   * });
   *
   * // or creating a suped-up `defer` in Node.js
   * var defer = _.runInContext({ 'setTimeout': setImmediate }).defer;
   */
  function runInContext(context) {
    // Avoid issues with some ES3 environments that attempt to use values, named
    // after built-in constructors like `Object`, for the creation of literals.
    // ES5 clears this up by stating that literals must use built-in constructors.
    // See https://es5.github.io/#x11.1.5 for more details.
    context = context ? _.defaults(root.Object(), context, _.pick(root, contextProps)) : root;

    /** Native constructor references. */
    var Array = context.Array,
        Date = context.Date,
        Error = context.Error,
        Function = context.Function,
        Math = context.Math,
        Number = context.Number,
        Object = context.Object,
        RegExp = context.RegExp,
        String = context.String,
        TypeError = context.TypeError;

    /** Used for native method references. */
    var arrayProto = Array.prototype,
        objectProto = Object.prototype,
        stringProto = String.prototype;

    /** Used to resolve the decompiled source of functions. */
    var fnToString = Function.prototype.toString;

    /** Used to check objects for own properties. */
    var hasOwnProperty = objectProto.hasOwnProperty;

    /** Used to generate unique IDs. */
    var idCounter = 0;

    /**
     * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
     * of values.
     */
    var objToString = objectProto.toString;

    /** Used to restore the original `_` reference in `_.noConflict`. */
    var oldDash = root._;

    /** Used to detect if a method is native. */
    var reIsNative = RegExp('^' +
      fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
      .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
    );

    /** Native method references. */
    var ArrayBuffer = context.ArrayBuffer,
        clearTimeout = context.clearTimeout,
        parseFloat = context.parseFloat,
        pow = Math.pow,
        propertyIsEnumerable = objectProto.propertyIsEnumerable,
        Set = getNative(context, 'Set'),
        setTimeout = context.setTimeout,
        splice = arrayProto.splice,
        Uint8Array = context.Uint8Array,
        WeakMap = getNative(context, 'WeakMap');

    /* Native method references for those with the same name as other `lodash` methods. */
    var nativeCeil = Math.ceil,
        nativeCreate = getNative(Object, 'create'),
        nativeFloor = Math.floor,
        nativeIsArray = getNative(Array, 'isArray'),
        nativeIsFinite = context.isFinite,
        nativeKeys = getNative(Object, 'keys'),
        nativeMax = Math.max,
        nativeMin = Math.min,
        nativeNow = getNative(Date, 'now'),
        nativeParseInt = context.parseInt,
        nativeRandom = Math.random;

    /** Used as references for `-Infinity` and `Infinity`. */
    var NEGATIVE_INFINITY = Number.NEGATIVE_INFINITY,
        POSITIVE_INFINITY = Number.POSITIVE_INFINITY;

    /** Used as references for the maximum length and index of an array. */
    var MAX_ARRAY_LENGTH = 4294967295,
        MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1,
        HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;

    /**
     * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
     * of an array-like value.
     */
    var MAX_SAFE_INTEGER = 9007199254740991;

    /** Used to store function metadata. */
    var metaMap = WeakMap && new WeakMap;

    /** Used to lookup unminified function names. */
    var realNames = {};

    /*------------------------------------------------------------------------*/

    /**
     * Creates a `lodash` object which wraps `value` to enable implicit chaining.
     * Methods that operate on and return arrays, collections, and functions can
     * be chained together. Methods that retrieve a single value or may return a
     * primitive value will automatically end the chain returning the unwrapped
     * value. Explicit chaining may be enabled using `_.chain`. The execution of
     * chained methods is lazy, that is, execution is deferred until `_#value`
     * is implicitly or explicitly called.
     *
     * Lazy evaluation allows several methods to support shortcut fusion. Shortcut
     * fusion is an optimization strategy which merge iteratee calls; this can help
     * to avoid the creation of intermediate data structures and greatly reduce the
     * number of iteratee executions.
     *
     * Chaining is supported in custom builds as long as the `_#value` method is
     * directly or indirectly included in the build.
     *
     * In addition to lodash methods, wrappers have `Array` and `String` methods.
     *
     * The wrapper `Array` methods are:
     * `concat`, `join`, `pop`, `push`, `reverse`, `shift`, `slice`, `sort`,
     * `splice`, and `unshift`
     *
     * The wrapper `String` methods are:
     * `replace` and `split`
     *
     * The wrapper methods that support shortcut fusion are:
     * `compact`, `drop`, `dropRight`, `dropRightWhile`, `dropWhile`, `filter`,
     * `first`, `initial`, `last`, `map`, `pluck`, `reject`, `rest`, `reverse`,
     * `slice`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, `toArray`,
     * and `where`
     *
     * The chainable wrapper methods are:
     * `after`, `ary`, `assign`, `at`, `before`, `bind`, `bindAll`, `bindKey`,
     * `callback`, `chain`, `chunk`, `commit`, `compact`, `concat`, `constant`,
     * `countBy`, `create`, `curry`, `debounce`, `defaults`, `defaultsDeep`,
     * `defer`, `delay`, `difference`, `drop`, `dropRight`, `dropRightWhile`,
     * `dropWhile`, `fill`, `filter`, `flatten`, `flattenDeep`, `flow`, `flowRight`,
     * `forEach`, `forEachRight`, `forIn`, `forInRight`, `forOwn`, `forOwnRight`,
     * `functions`, `groupBy`, `indexBy`, `initial`, `intersection`, `invert`,
     * `invoke`, `keys`, `keysIn`, `map`, `mapKeys`, `mapValues`, `matches`,
     * `matchesProperty`, `memoize`, `merge`, `method`, `methodOf`, `mixin`,
     * `modArgs`, `negate`, `omit`, `once`, `pairs`, `partial`, `partialRight`,
     * `partition`, `pick`, `plant`, `pluck`, `property`, `propertyOf`, `pull`,
     * `pullAt`, `push`, `range`, `rearg`, `reject`, `remove`, `rest`, `restParam`,
     * `reverse`, `set`, `shuffle`, `slice`, `sort`, `sortBy`, `sortByAll`,
     * `sortByOrder`, `splice`, `spread`, `take`, `takeRight`, `takeRightWhile`,
     * `takeWhile`, `tap`, `throttle`, `thru`, `times`, `toArray`, `toPlainObject`,
     * `transform`, `union`, `uniq`, `unshift`, `unzip`, `unzipWith`, `values`,
     * `valuesIn`, `where`, `without`, `wrap`, `xor`, `zip`, `zipObject`, `zipWith`
     *
     * The wrapper methods that are **not** chainable by default are:
     * `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clone`, `cloneDeep`,
     * `deburr`, `endsWith`, `escape`, `escapeRegExp`, `every`, `find`, `findIndex`,
     * `findKey`, `findLast`, `findLastIndex`, `findLastKey`, `findWhere`, `first`,
     * `floor`, `get`, `gt`, `gte`, `has`, `identity`, `includes`, `indexOf`,
     * `inRange`, `isArguments`, `isArray`, `isBoolean`, `isDate`, `isElement`,
     * `isEmpty`, `isEqual`, `isError`, `isFinite` `isFunction`, `isMatch`,
     * `isNative`, `isNaN`, `isNull`, `isNumber`, `isObject`, `isPlainObject`,
     * `isRegExp`, `isString`, `isUndefined`, `isTypedArray`, `join`, `kebabCase`,
     * `last`, `lastIndexOf`, `lt`, `lte`, `max`, `min`, `noConflict`, `noop`,
     * `now`, `pad`, `padLeft`, `padRight`, `parseInt`, `pop`, `random`, `reduce`,
     * `reduceRight`, `repeat`, `result`, `round`, `runInContext`, `shift`, `size`,
     * `snakeCase`, `some`, `sortedIndex`, `sortedLastIndex`, `startCase`,
     * `startsWith`, `sum`, `template`, `trim`, `trimLeft`, `trimRight`, `trunc`,
     * `unescape`, `uniqueId`, `value`, and `words`
     *
     * The wrapper method `sample` will return a wrapped value when `n` is provided,
     * otherwise an unwrapped value is returned.
     *
     * @name _
     * @constructor
     * @category Chain
     * @param {*} value The value to wrap in a `lodash` instance.
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var wrapped = _([1, 2, 3]);
     *
     * // returns an unwrapped value
     * wrapped.reduce(function(total, n) {
     *   return total + n;
     * });
     * // => 6
     *
     * // returns a wrapped value
     * var squares = wrapped.map(function(n) {
     *   return n * n;
     * });
     *
     * _.isArray(squares);
     * // => false
     *
     * _.isArray(squares.value());
     * // => true
     */
    function lodash(value) {
      if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
        if (value instanceof LodashWrapper) {
          return value;
        }
        if (hasOwnProperty.call(value, '__chain__') && hasOwnProperty.call(value, '__wrapped__')) {
          return wrapperClone(value);
        }
      }
      return new LodashWrapper(value);
    }

    /**
     * The function whose prototype all chaining wrappers inherit from.
     *
     * @private
     */
    function baseLodash() {
      // No operation performed.
    }

    /**
     * The base constructor for creating `lodash` wrapper objects.
     *
     * @private
     * @param {*} value The value to wrap.
     * @param {boolean} [chainAll] Enable chaining for all wrapper methods.
     * @param {Array} [actions=[]] Actions to peform to resolve the unwrapped value.
     */
    function LodashWrapper(value, chainAll, actions) {
      this.__wrapped__ = value;
      this.__actions__ = actions || [];
      this.__chain__ = !!chainAll;
    }

    /**
     * An object environment feature flags.
     *
     * @static
     * @memberOf _
     * @type Object
     */
    var support = lodash.support = {};

    /**
     * By default, the template delimiters used by lodash are like those in
     * embedded Ruby (ERB). Change the following template settings to use
     * alternative delimiters.
     *
     * @static
     * @memberOf _
     * @type Object
     */
    lodash.templateSettings = {

      /**
       * Used to detect `data` property values to be HTML-escaped.
       *
       * @memberOf _.templateSettings
       * @type RegExp
       */
      'escape': reEscape,

      /**
       * Used to detect code to be evaluated.
       *
       * @memberOf _.templateSettings
       * @type RegExp
       */
      'evaluate': reEvaluate,

      /**
       * Used to detect `data` property values to inject.
       *
       * @memberOf _.templateSettings
       * @type RegExp
       */
      'interpolate': reInterpolate,

      /**
       * Used to reference the data object in the template text.
       *
       * @memberOf _.templateSettings
       * @type string
       */
      'variable': '',

      /**
       * Used to import variables into the compiled template.
       *
       * @memberOf _.templateSettings
       * @type Object
       */
      'imports': {

        /**
         * A reference to the `lodash` function.
         *
         * @memberOf _.templateSettings.imports
         * @type Function
         */
        '_': lodash
      }
    };

    /*------------------------------------------------------------------------*/

    /**
     * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.
     *
     * @private
     * @param {*} value The value to wrap.
     */
    function LazyWrapper(value) {
      this.__wrapped__ = value;
      this.__actions__ = [];
      this.__dir__ = 1;
      this.__filtered__ = false;
      this.__iteratees__ = [];
      this.__takeCount__ = POSITIVE_INFINITY;
      this.__views__ = [];
    }

    /**
     * Creates a clone of the lazy wrapper object.
     *
     * @private
     * @name clone
     * @memberOf LazyWrapper
     * @returns {Object} Returns the cloned `LazyWrapper` object.
     */
    function lazyClone() {
      var result = new LazyWrapper(this.__wrapped__);
      result.__actions__ = arrayCopy(this.__actions__);
      result.__dir__ = this.__dir__;
      result.__filtered__ = this.__filtered__;
      result.__iteratees__ = arrayCopy(this.__iteratees__);
      result.__takeCount__ = this.__takeCount__;
      result.__views__ = arrayCopy(this.__views__);
      return result;
    }

    /**
     * Reverses the direction of lazy iteration.
     *
     * @private
     * @name reverse
     * @memberOf LazyWrapper
     * @returns {Object} Returns the new reversed `LazyWrapper` object.
     */
    function lazyReverse() {
      if (this.__filtered__) {
        var result = new LazyWrapper(this);
        result.__dir__ = -1;
        result.__filtered__ = true;
      } else {
        result = this.clone();
        result.__dir__ *= -1;
      }
      return result;
    }

    /**
     * Extracts the unwrapped value from its lazy wrapper.
     *
     * @private
     * @name value
     * @memberOf LazyWrapper
     * @returns {*} Returns the unwrapped value.
     */
    function lazyValue() {
      var array = this.__wrapped__.value(),
          dir = this.__dir__,
          isArr = isArray(array),
          isRight = dir < 0,
          arrLength = isArr ? array.length : 0,
          view = getView(0, arrLength, this.__views__),
          start = view.start,
          end = view.end,
          length = end - start,
          index = isRight ? end : (start - 1),
          iteratees = this.__iteratees__,
          iterLength = iteratees.length,
          resIndex = 0,
          takeCount = nativeMin(length, this.__takeCount__);

      if (!isArr || arrLength < LARGE_ARRAY_SIZE || (arrLength == length && takeCount == length)) {
        return baseWrapperValue((isRight && isArr) ? array.reverse() : array, this.__actions__);
      }
      var result = [];

      outer:
      while (length-- && resIndex < takeCount) {
        index += dir;

        var iterIndex = -1,
            value = array[index];

        while (++iterIndex < iterLength) {
          var data = iteratees[iterIndex],
              iteratee = data.iteratee,
              type = data.type,
              computed = iteratee(value);

          if (type == LAZY_MAP_FLAG) {
            value = computed;
          } else if (!computed) {
            if (type == LAZY_FILTER_FLAG) {
              continue outer;
            } else {
              break outer;
            }
          }
        }
        result[resIndex++] = value;
      }
      return result;
    }

    /*------------------------------------------------------------------------*/

    /**
     * Creates a cache object to store key/value pairs.
     *
     * @private
     * @static
     * @name Cache
     * @memberOf _.memoize
     */
    function MapCache() {
      this.__data__ = {};
    }

    /**
     * Removes `key` and its value from the cache.
     *
     * @private
     * @name delete
     * @memberOf _.memoize.Cache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed successfully, else `false`.
     */
    function mapDelete(key) {
      return this.has(key) && delete this.__data__[key];
    }

    /**
     * Gets the cached value for `key`.
     *
     * @private
     * @name get
     * @memberOf _.memoize.Cache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the cached value.
     */
    function mapGet(key) {
      return key == '__proto__' ? undefined : this.__data__[key];
    }

    /**
     * Checks if a cached value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf _.memoize.Cache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function mapHas(key) {
      return key != '__proto__' && hasOwnProperty.call(this.__data__, key);
    }

    /**
     * Sets `value` to `key` of the cache.
     *
     * @private
     * @name set
     * @memberOf _.memoize.Cache
     * @param {string} key The key of the value to cache.
     * @param {*} value The value to cache.
     * @returns {Object} Returns the cache object.
     */
    function mapSet(key, value) {
      if (key != '__proto__') {
        this.__data__[key] = value;
      }
      return this;
    }

    /*------------------------------------------------------------------------*/

    /**
     *
     * Creates a cache object to store unique values.
     *
     * @private
     * @param {Array} [values] The values to cache.
     */
    function SetCache(values) {
      var length = values ? values.length : 0;

      this.data = { 'hash': nativeCreate(null), 'set': new Set };
      while (length--) {
        this.push(values[length]);
      }
    }

    /**
     * Checks if `value` is in `cache` mimicking the return signature of
     * `_.indexOf` by returning `0` if the value is found, else `-1`.
     *
     * @private
     * @param {Object} cache The cache to search.
     * @param {*} value The value to search for.
     * @returns {number} Returns `0` if `value` is found, else `-1`.
     */
    function cacheIndexOf(cache, value) {
      var data = cache.data,
          result = (typeof value == 'string' || isObject(value)) ? data.set.has(value) : data.hash[value];

      return result ? 0 : -1;
    }

    /**
     * Adds `value` to the cache.
     *
     * @private
     * @name push
     * @memberOf SetCache
     * @param {*} value The value to cache.
     */
    function cachePush(value) {
      var data = this.data;
      if (typeof value == 'string' || isObject(value)) {
        data.set.add(value);
      } else {
        data.hash[value] = true;
      }
    }

    /*------------------------------------------------------------------------*/

    /**
     * Creates a new array joining `array` with `other`.
     *
     * @private
     * @param {Array} array The array to join.
     * @param {Array} other The other array to join.
     * @returns {Array} Returns the new concatenated array.
     */
    function arrayConcat(array, other) {
      var index = -1,
          length = array.length,
          othIndex = -1,
          othLength = other.length,
          result = Array(length + othLength);

      while (++index < length) {
        result[index] = array[index];
      }
      while (++othIndex < othLength) {
        result[index++] = other[othIndex];
      }
      return result;
    }

    /**
     * Copies the values of `source` to `array`.
     *
     * @private
     * @param {Array} source The array to copy values from.
     * @param {Array} [array=[]] The array to copy values to.
     * @returns {Array} Returns `array`.
     */
    function arrayCopy(source, array) {
      var index = -1,
          length = source.length;

      array || (array = Array(length));
      while (++index < length) {
        array[index] = source[index];
      }
      return array;
    }

    /**
     * A specialized version of `_.forEach` for arrays without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns `array`.
     */
    function arrayEach(array, iteratee) {
      var index = -1,
          length = array.length;

      while (++index < length) {
        if (iteratee(array[index], index, array) === false) {
          break;
        }
      }
      return array;
    }

    /**
     * A specialized version of `_.forEachRight` for arrays without support for
     * callback shorthands and `this` binding.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns `array`.
     */
    function arrayEachRight(array, iteratee) {
      var length = array.length;

      while (length--) {
        if (iteratee(array[length], length, array) === false) {
          break;
        }
      }
      return array;
    }

    /**
     * A specialized version of `_.every` for arrays without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {boolean} Returns `true` if all elements pass the predicate check,
     *  else `false`.
     */
    function arrayEvery(array, predicate) {
      var index = -1,
          length = array.length;

      while (++index < length) {
        if (!predicate(array[index], index, array)) {
          return false;
        }
      }
      return true;
    }

    /**
     * A specialized version of `baseExtremum` for arrays which invokes `iteratee`
     * with one argument: (value).
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {Function} comparator The function used to compare values.
     * @param {*} exValue The initial extremum value.
     * @returns {*} Returns the extremum value.
     */
    function arrayExtremum(array, iteratee, comparator, exValue) {
      var index = -1,
          length = array.length,
          computed = exValue,
          result = computed;

      while (++index < length) {
        var value = array[index],
            current = +iteratee(value);

        if (comparator(current, computed)) {
          computed = current;
          result = value;
        }
      }
      return result;
    }

    /**
     * A specialized version of `_.filter` for arrays without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {Array} Returns the new filtered array.
     */
    function arrayFilter(array, predicate) {
      var index = -1,
          length = array.length,
          resIndex = -1,
          result = [];

      while (++index < length) {
        var value = array[index];
        if (predicate(value, index, array)) {
          result[++resIndex] = value;
        }
      }
      return result;
    }

    /**
     * A specialized version of `_.map` for arrays without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the new mapped array.
     */
    function arrayMap(array, iteratee) {
      var index = -1,
          length = array.length,
          result = Array(length);

      while (++index < length) {
        result[index] = iteratee(array[index], index, array);
      }
      return result;
    }

    /**
     * Appends the elements of `values` to `array`.
     *
     * @private
     * @param {Array} array The array to modify.
     * @param {Array} values The values to append.
     * @returns {Array} Returns `array`.
     */
    function arrayPush(array, values) {
      var index = -1,
          length = values.length,
          offset = array.length;

      while (++index < length) {
        array[offset + index] = values[index];
      }
      return array;
    }

    /**
     * A specialized version of `_.reduce` for arrays without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {*} [accumulator] The initial value.
     * @param {boolean} [initFromArray] Specify using the first element of `array`
     *  as the initial value.
     * @returns {*} Returns the accumulated value.
     */
    function arrayReduce(array, iteratee, accumulator, initFromArray) {
      var index = -1,
          length = array.length;

      if (initFromArray && length) {
        accumulator = array[++index];
      }
      while (++index < length) {
        accumulator = iteratee(accumulator, array[index], index, array);
      }
      return accumulator;
    }

    /**
     * A specialized version of `_.reduceRight` for arrays without support for
     * callback shorthands and `this` binding.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {*} [accumulator] The initial value.
     * @param {boolean} [initFromArray] Specify using the last element of `array`
     *  as the initial value.
     * @returns {*} Returns the accumulated value.
     */
    function arrayReduceRight(array, iteratee, accumulator, initFromArray) {
      var length = array.length;
      if (initFromArray && length) {
        accumulator = array[--length];
      }
      while (length--) {
        accumulator = iteratee(accumulator, array[length], length, array);
      }
      return accumulator;
    }

    /**
     * A specialized version of `_.some` for arrays without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {boolean} Returns `true` if any element passes the predicate check,
     *  else `false`.
     */
    function arraySome(array, predicate) {
      var index = -1,
          length = array.length;

      while (++index < length) {
        if (predicate(array[index], index, array)) {
          return true;
        }
      }
      return false;
    }

    /**
     * A specialized version of `_.sum` for arrays without support for callback
     * shorthands and `this` binding..
     *
     * @private
     * @param {Array} array The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {number} Returns the sum.
     */
    function arraySum(array, iteratee) {
      var length = array.length,
          result = 0;

      while (length--) {
        result += +iteratee(array[length]) || 0;
      }
      return result;
    }

    /**
     * Used by `_.defaults` to customize its `_.assign` use.
     *
     * @private
     * @param {*} objectValue The destination object property value.
     * @param {*} sourceValue The source object property value.
     * @returns {*} Returns the value to assign to the destination object.
     */
    function assignDefaults(objectValue, sourceValue) {
      return objectValue === undefined ? sourceValue : objectValue;
    }

    /**
     * Used by `_.template` to customize its `_.assign` use.
     *
     * **Note:** This function is like `assignDefaults` except that it ignores
     * inherited property values when checking if a property is `undefined`.
     *
     * @private
     * @param {*} objectValue The destination object property value.
     * @param {*} sourceValue The source object property value.
     * @param {string} key The key associated with the object and source values.
     * @param {Object} object The destination object.
     * @returns {*} Returns the value to assign to the destination object.
     */
    function assignOwnDefaults(objectValue, sourceValue, key, object) {
      return (objectValue === undefined || !hasOwnProperty.call(object, key))
        ? sourceValue
        : objectValue;
    }

    /**
     * A specialized version of `_.assign` for customizing assigned values without
     * support for argument juggling, multiple sources, and `this` binding `customizer`
     * functions.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @param {Function} customizer The function to customize assigned values.
     * @returns {Object} Returns `object`.
     */
    function assignWith(object, source, customizer) {
      var index = -1,
          props = keys(source),
          length = props.length;

      while (++index < length) {
        var key = props[index],
            value = object[key],
            result = customizer(value, source[key], key, object, source);

        if ((result === result ? (result !== value) : (value === value)) ||
            (value === undefined && !(key in object))) {
          object[key] = result;
        }
      }
      return object;
    }

    /**
     * The base implementation of `_.assign` without support for argument juggling,
     * multiple sources, and `customizer` functions.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @returns {Object} Returns `object`.
     */
    function baseAssign(object, source) {
      return source == null
        ? object
        : baseCopy(source, keys(source), object);
    }

    /**
     * The base implementation of `_.at` without support for string collections
     * and individual key arguments.
     *
     * @private
     * @param {Array|Object} collection The collection to iterate over.
     * @param {number[]|string[]} props The property names or indexes of elements to pick.
     * @returns {Array} Returns the new array of picked elements.
     */
    function baseAt(collection, props) {
      var index = -1,
          isNil = collection == null,
          isArr = !isNil && isArrayLike(collection),
          length = isArr ? collection.length : 0,
          propsLength = props.length,
          result = Array(propsLength);

      while(++index < propsLength) {
        var key = props[index];
        if (isArr) {
          result[index] = isIndex(key, length) ? collection[key] : undefined;
        } else {
          result[index] = isNil ? undefined : collection[key];
        }
      }
      return result;
    }

    /**
     * Copies properties of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy properties from.
     * @param {Array} props The property names to copy.
     * @param {Object} [object={}] The object to copy properties to.
     * @returns {Object} Returns `object`.
     */
    function baseCopy(source, props, object) {
      object || (object = {});

      var index = -1,
          length = props.length;

      while (++index < length) {
        var key = props[index];
        object[key] = source[key];
      }
      return object;
    }

    /**
     * The base implementation of `_.callback` which supports specifying the
     * number of arguments to provide to `func`.
     *
     * @private
     * @param {*} [func=_.identity] The value to convert to a callback.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param {number} [argCount] The number of arguments to provide to `func`.
     * @returns {Function} Returns the callback.
     */
    function baseCallback(func, thisArg, argCount) {
      var type = typeof func;
      if (type == 'function') {
        return thisArg === undefined
          ? func
          : bindCallback(func, thisArg, argCount);
      }
      if (func == null) {
        return identity;
      }
      if (type == 'object') {
        return baseMatches(func);
      }
      return thisArg === undefined
        ? property(func)
        : baseMatchesProperty(func, thisArg);
    }

    /**
     * The base implementation of `_.clone` without support for argument juggling
     * and `this` binding `customizer` functions.
     *
     * @private
     * @param {*} value The value to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @param {Function} [customizer] The function to customize cloning values.
     * @param {string} [key] The key of `value`.
     * @param {Object} [object] The object `value` belongs to.
     * @param {Array} [stackA=[]] Tracks traversed source objects.
     * @param {Array} [stackB=[]] Associates clones with source counterparts.
     * @returns {*} Returns the cloned value.
     */
    function baseClone(value, isDeep, customizer, key, object, stackA, stackB) {
      var result;
      if (customizer) {
        result = object ? customizer(value, key, object) : customizer(value);
      }
      if (result !== undefined) {
        return result;
      }
      if (!isObject(value)) {
        return value;
      }
      var isArr = isArray(value);
      if (isArr) {
        result = initCloneArray(value);
        if (!isDeep) {
          return arrayCopy(value, result);
        }
      } else {
        var tag = objToString.call(value),
            isFunc = tag == funcTag;

        if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
          result = initCloneObject(isFunc ? {} : value);
          if (!isDeep) {
            return baseAssign(result, value);
          }
        } else {
          return cloneableTags[tag]
            ? initCloneByTag(value, tag, isDeep)
            : (object ? value : {});
        }
      }
      // Check for circular references and return its corresponding clone.
      stackA || (stackA = []);
      stackB || (stackB = []);

      var length = stackA.length;
      while (length--) {
        if (stackA[length] == value) {
          return stackB[length];
        }
      }
      // Add the source value to the stack of traversed objects and associate it with its clone.
      stackA.push(value);
      stackB.push(result);

      // Recursively populate clone (susceptible to call stack limits).
      (isArr ? arrayEach : baseForOwn)(value, function(subValue, key) {
        result[key] = baseClone(subValue, isDeep, customizer, key, value, stackA, stackB);
      });
      return result;
    }

    /**
     * The base implementation of `_.create` without support for assigning
     * properties to the created object.
     *
     * @private
     * @param {Object} prototype The object to inherit from.
     * @returns {Object} Returns the new object.
     */
    var baseCreate = (function() {
      function object() {}
      return function(prototype) {
        if (isObject(prototype)) {
          object.prototype = prototype;
          var result = new object;
          object.prototype = undefined;
        }
        return result || {};
      };
    }());

    /**
     * The base implementation of `_.delay` and `_.defer` which accepts an index
     * of where to slice the arguments to provide to `func`.
     *
     * @private
     * @param {Function} func The function to delay.
     * @param {number} wait The number of milliseconds to delay invocation.
     * @param {Object} args The arguments provide to `func`.
     * @returns {number} Returns the timer id.
     */
    function baseDelay(func, wait, args) {
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      return setTimeout(function() { func.apply(undefined, args); }, wait);
    }

    /**
     * The base implementation of `_.difference` which accepts a single array
     * of values to exclude.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {Array} values The values to exclude.
     * @returns {Array} Returns the new array of filtered values.
     */
    function baseDifference(array, values) {
      var length = array ? array.length : 0,
          result = [];

      if (!length) {
        return result;
      }
      var index = -1,
          indexOf = getIndexOf(),
          isCommon = indexOf == baseIndexOf,
          cache = (isCommon && values.length >= LARGE_ARRAY_SIZE) ? createCache(values) : null,
          valuesLength = values.length;

      if (cache) {
        indexOf = cacheIndexOf;
        isCommon = false;
        values = cache;
      }
      outer:
      while (++index < length) {
        var value = array[index];

        if (isCommon && value === value) {
          var valuesIndex = valuesLength;
          while (valuesIndex--) {
            if (values[valuesIndex] === value) {
              continue outer;
            }
          }
          result.push(value);
        }
        else if (indexOf(values, value, 0) < 0) {
          result.push(value);
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.forEach` without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array|Object|string} Returns `collection`.
     */
    var baseEach = createBaseEach(baseForOwn);

    /**
     * The base implementation of `_.forEachRight` without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array|Object|string} Returns `collection`.
     */
    var baseEachRight = createBaseEach(baseForOwnRight, true);

    /**
     * The base implementation of `_.every` without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {boolean} Returns `true` if all elements pass the predicate check,
     *  else `false`
     */
    function baseEvery(collection, predicate) {
      var result = true;
      baseEach(collection, function(value, index, collection) {
        result = !!predicate(value, index, collection);
        return result;
      });
      return result;
    }

    /**
     * Gets the extremum value of `collection` invoking `iteratee` for each value
     * in `collection` to generate the criterion by which the value is ranked.
     * The `iteratee` is invoked with three arguments: (value, index|key, collection).
     *
     * @private
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {Function} comparator The function used to compare values.
     * @param {*} exValue The initial extremum value.
     * @returns {*} Returns the extremum value.
     */
    function baseExtremum(collection, iteratee, comparator, exValue) {
      var computed = exValue,
          result = computed;

      baseEach(collection, function(value, index, collection) {
        var current = +iteratee(value, index, collection);
        if (comparator(current, computed) || (current === exValue && current === result)) {
          computed = current;
          result = value;
        }
      });
      return result;
    }

    /**
     * The base implementation of `_.fill` without an iteratee call guard.
     *
     * @private
     * @param {Array} array The array to fill.
     * @param {*} value The value to fill `array` with.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns `array`.
     */
    function baseFill(array, value, start, end) {
      var length = array.length;

      start = start == null ? 0 : (+start || 0);
      if (start < 0) {
        start = -start > length ? 0 : (length + start);
      }
      end = (end === undefined || end > length) ? length : (+end || 0);
      if (end < 0) {
        end += length;
      }
      length = start > end ? 0 : (end >>> 0);
      start >>>= 0;

      while (start < length) {
        array[start++] = value;
      }
      return array;
    }

    /**
     * The base implementation of `_.filter` without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {Array} Returns the new filtered array.
     */
    function baseFilter(collection, predicate) {
      var result = [];
      baseEach(collection, function(value, index, collection) {
        if (predicate(value, index, collection)) {
          result.push(value);
        }
      });
      return result;
    }

    /**
     * The base implementation of `_.find`, `_.findLast`, `_.findKey`, and `_.findLastKey`,
     * without support for callback shorthands and `this` binding, which iterates
     * over `collection` using the provided `eachFunc`.
     *
     * @private
     * @param {Array|Object|string} collection The collection to search.
     * @param {Function} predicate The function invoked per iteration.
     * @param {Function} eachFunc The function to iterate over `collection`.
     * @param {boolean} [retKey] Specify returning the key of the found element
     *  instead of the element itself.
     * @returns {*} Returns the found element or its key, else `undefined`.
     */
    function baseFind(collection, predicate, eachFunc, retKey) {
      var result;
      eachFunc(collection, function(value, key, collection) {
        if (predicate(value, key, collection)) {
          result = retKey ? key : value;
          return false;
        }
      });
      return result;
    }

    /**
     * The base implementation of `_.flatten` with added support for restricting
     * flattening and specifying the start index.
     *
     * @private
     * @param {Array} array The array to flatten.
     * @param {boolean} [isDeep] Specify a deep flatten.
     * @param {boolean} [isStrict] Restrict flattening to arrays-like objects.
     * @param {Array} [result=[]] The initial result value.
     * @returns {Array} Returns the new flattened array.
     */
    function baseFlatten(array, isDeep, isStrict, result) {
      result || (result = []);

      var index = -1,
          length = array.length;

      while (++index < length) {
        var value = array[index];
        if (isObjectLike(value) && isArrayLike(value) &&
            (isStrict || isArray(value) || isArguments(value))) {
          if (isDeep) {
            // Recursively flatten arrays (susceptible to call stack limits).
            baseFlatten(value, isDeep, isStrict, result);
          } else {
            arrayPush(result, value);
          }
        } else if (!isStrict) {
          result[result.length] = value;
        }
      }
      return result;
    }

    /**
     * The base implementation of `baseForIn` and `baseForOwn` which iterates
     * over `object` properties returned by `keysFunc` invoking `iteratee` for
     * each property. Iteratee functions may exit iteration early by explicitly
     * returning `false`.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @returns {Object} Returns `object`.
     */
    var baseFor = createBaseFor();

    /**
     * This function is like `baseFor` except that it iterates over properties
     * in the opposite order.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @returns {Object} Returns `object`.
     */
    var baseForRight = createBaseFor(true);

    /**
     * The base implementation of `_.forIn` without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Object} Returns `object`.
     */
    function baseForIn(object, iteratee) {
      return baseFor(object, iteratee, keysIn);
    }

    /**
     * The base implementation of `_.forOwn` without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Object} Returns `object`.
     */
    function baseForOwn(object, iteratee) {
      return baseFor(object, iteratee, keys);
    }

    /**
     * The base implementation of `_.forOwnRight` without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Object} object The object to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Object} Returns `object`.
     */
    function baseForOwnRight(object, iteratee) {
      return baseForRight(object, iteratee, keys);
    }

    /**
     * The base implementation of `_.functions` which creates an array of
     * `object` function property names filtered from those provided.
     *
     * @private
     * @param {Object} object The object to inspect.
     * @param {Array} props The property names to filter.
     * @returns {Array} Returns the new array of filtered property names.
     */
    function baseFunctions(object, props) {
      var index = -1,
          length = props.length,
          resIndex = -1,
          result = [];

      while (++index < length) {
        var key = props[index];
        if (isFunction(object[key])) {
          result[++resIndex] = key;
        }
      }
      return result;
    }

    /**
     * The base implementation of `get` without support for string paths
     * and default values.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array} path The path of the property to get.
     * @param {string} [pathKey] The key representation of path.
     * @returns {*} Returns the resolved value.
     */
    function baseGet(object, path, pathKey) {
      if (object == null) {
        return;
      }
      if (pathKey !== undefined && pathKey in toObject(object)) {
        path = [pathKey];
      }
      var index = 0,
          length = path.length;

      while (object != null && index < length) {
        object = object[path[index++]];
      }
      return (index && index == length) ? object : undefined;
    }

    /**
     * The base implementation of `_.isEqual` without support for `this` binding
     * `customizer` functions.
     *
     * @private
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @param {Function} [customizer] The function to customize comparing values.
     * @param {boolean} [isLoose] Specify performing partial comparisons.
     * @param {Array} [stackA] Tracks traversed `value` objects.
     * @param {Array} [stackB] Tracks traversed `other` objects.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     */
    function baseIsEqual(value, other, customizer, isLoose, stackA, stackB) {
      if (value === other) {
        return true;
      }
      if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
        return value !== value && other !== other;
      }
      return baseIsEqualDeep(value, other, baseIsEqual, customizer, isLoose, stackA, stackB);
    }

    /**
     * A specialized version of `baseIsEqual` for arrays and objects which performs
     * deep comparisons and tracks traversed objects enabling objects with circular
     * references to be compared.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Function} [customizer] The function to customize comparing objects.
     * @param {boolean} [isLoose] Specify performing partial comparisons.
     * @param {Array} [stackA=[]] Tracks traversed `value` objects.
     * @param {Array} [stackB=[]] Tracks traversed `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
    function baseIsEqualDeep(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
      var objIsArr = isArray(object),
          othIsArr = isArray(other),
          objTag = arrayTag,
          othTag = arrayTag;

      if (!objIsArr) {
        objTag = objToString.call(object);
        if (objTag == argsTag) {
          objTag = objectTag;
        } else if (objTag != objectTag) {
          objIsArr = isTypedArray(object);
        }
      }
      if (!othIsArr) {
        othTag = objToString.call(other);
        if (othTag == argsTag) {
          othTag = objectTag;
        } else if (othTag != objectTag) {
          othIsArr = isTypedArray(other);
        }
      }
      var objIsObj = objTag == objectTag,
          othIsObj = othTag == objectTag,
          isSameTag = objTag == othTag;

      if (isSameTag && !(objIsArr || objIsObj)) {
        return equalByTag(object, other, objTag);
      }
      if (!isLoose) {
        var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
            othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

        if (objIsWrapped || othIsWrapped) {
          return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, customizer, isLoose, stackA, stackB);
        }
      }
      if (!isSameTag) {
        return false;
      }
      // Assume cyclic values are equal.
      // For more information on detecting circular references see https://es5.github.io/#JO.
      stackA || (stackA = []);
      stackB || (stackB = []);

      var length = stackA.length;
      while (length--) {
        if (stackA[length] == object) {
          return stackB[length] == other;
        }
      }
      // Add `object` and `other` to the stack of traversed objects.
      stackA.push(object);
      stackB.push(other);

      var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, isLoose, stackA, stackB);

      stackA.pop();
      stackB.pop();

      return result;
    }

    /**
     * The base implementation of `_.isMatch` without support for callback
     * shorthands and `this` binding.
     *
     * @private
     * @param {Object} object The object to inspect.
     * @param {Array} matchData The propery names, values, and compare flags to match.
     * @param {Function} [customizer] The function to customize comparing objects.
     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
     */
    function baseIsMatch(object, matchData, customizer) {
      var index = matchData.length,
          length = index,
          noCustomizer = !customizer;

      if (object == null) {
        return !length;
      }
      object = toObject(object);
      while (index--) {
        var data = matchData[index];
        if ((noCustomizer && data[2])
              ? data[1] !== object[data[0]]
              : !(data[0] in object)
            ) {
          return false;
        }
      }
      while (++index < length) {
        data = matchData[index];
        var key = data[0],
            objValue = object[key],
            srcValue = data[1];

        if (noCustomizer && data[2]) {
          if (objValue === undefined && !(key in object)) {
            return false;
          }
        } else {
          var result = customizer ? customizer(objValue, srcValue, key) : undefined;
          if (!(result === undefined ? baseIsEqual(srcValue, objValue, customizer, true) : result)) {
            return false;
          }
        }
      }
      return true;
    }

    /**
     * The base implementation of `_.map` without support for callback shorthands
     * and `this` binding.
     *
     * @private
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the new mapped array.
     */
    function baseMap(collection, iteratee) {
      var index = -1,
          result = isArrayLike(collection) ? Array(collection.length) : [];

      baseEach(collection, function(value, key, collection) {
        result[++index] = iteratee(value, key, collection);
      });
      return result;
    }

    /**
     * The base implementation of `_.matches` which does not clone `source`.
     *
     * @private
     * @param {Object} source The object of property values to match.
     * @returns {Function} Returns the new function.
     */
    function baseMatches(source) {
      var matchData = getMatchData(source);
      if (matchData.length == 1 && matchData[0][2]) {
        var key = matchData[0][0],
            value = matchData[0][1];

        return function(object) {
          if (object == null) {
            return false;
          }
          return object[key] === value && (value !== undefined || (key in toObject(object)));
        };
      }
      return function(object) {
        return baseIsMatch(object, matchData);
      };
    }

    /**
     * The base implementation of `_.matchesProperty` which does not clone `srcValue`.
     *
     * @private
     * @param {string} path The path of the property to get.
     * @param {*} srcValue The value to compare.
     * @returns {Function} Returns the new function.
     */
    function baseMatchesProperty(path, srcValue) {
      var isArr = isArray(path),
          isCommon = isKey(path) && isStrictComparable(srcValue),
          pathKey = (path + '');

      path = toPath(path);
      return function(object) {
        if (object == null) {
          return false;
        }
        var key = pathKey;
        object = toObject(object);
        if ((isArr || !isCommon) && !(key in object)) {
          object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
          if (object == null) {
            return false;
          }
          key = last(path);
          object = toObject(object);
        }
        return object[key] === srcValue
          ? (srcValue !== undefined || (key in object))
          : baseIsEqual(srcValue, object[key], undefined, true);
      };
    }

    /**
     * The base implementation of `_.merge` without support for argument juggling,
     * multiple sources, and `this` binding `customizer` functions.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @param {Function} [customizer] The function to customize merged values.
     * @param {Array} [stackA=[]] Tracks traversed source objects.
     * @param {Array} [stackB=[]] Associates values with source counterparts.
     * @returns {Object} Returns `object`.
     */
    function baseMerge(object, source, customizer, stackA, stackB) {
      if (!isObject(object)) {
        return object;
      }
      var isSrcArr = isArrayLike(source) && (isArray(source) || isTypedArray(source)),
          props = isSrcArr ? undefined : keys(source);

      arrayEach(props || source, function(srcValue, key) {
        if (props) {
          key = srcValue;
          srcValue = source[key];
        }
        if (isObjectLike(srcValue)) {
          stackA || (stackA = []);
          stackB || (stackB = []);
          baseMergeDeep(object, source, key, baseMerge, customizer, stackA, stackB);
        }
        else {
          var value = object[key],
              result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
              isCommon = result === undefined;

          if (isCommon) {
            result = srcValue;
          }
          if ((result !== undefined || (isSrcArr && !(key in object))) &&
              (isCommon || (result === result ? (result !== value) : (value === value)))) {
            object[key] = result;
          }
        }
      });
      return object;
    }

    /**
     * A specialized version of `baseMerge` for arrays and objects which performs
     * deep merges and tracks traversed objects enabling objects with circular
     * references to be merged.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @param {string} key The key of the value to merge.
     * @param {Function} mergeFunc The function to merge values.
     * @param {Function} [customizer] The function to customize merged values.
     * @param {Array} [stackA=[]] Tracks traversed source objects.
     * @param {Array} [stackB=[]] Associates values with source counterparts.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
    function baseMergeDeep(object, source, key, mergeFunc, customizer, stackA, stackB) {
      var length = stackA.length,
          srcValue = source[key];

      while (length--) {
        if (stackA[length] == srcValue) {
          object[key] = stackB[length];
          return;
        }
      }
      var value = object[key],
          result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
          isCommon = result === undefined;

      if (isCommon) {
        result = srcValue;
        if (isArrayLike(srcValue) && (isArray(srcValue) || isTypedArray(srcValue))) {
          result = isArray(value)
            ? value
            : (isArrayLike(value) ? arrayCopy(value) : []);
        }
        else if (isPlainObject(srcValue) || isArguments(srcValue)) {
          result = isArguments(value)
            ? toPlainObject(value)
            : (isPlainObject(value) ? value : {});
        }
        else {
          isCommon = false;
        }
      }
      // Add the source value to the stack of traversed objects and associate
      // it with its merged value.
      stackA.push(srcValue);
      stackB.push(result);

      if (isCommon) {
        // Recursively merge objects and arrays (susceptible to call stack limits).
        object[key] = mergeFunc(result, srcValue, customizer, stackA, stackB);
      } else if (result === result ? (result !== value) : (value === value)) {
        object[key] = result;
      }
    }

    /**
     * The base implementation of `_.property` without support for deep paths.
     *
     * @private
     * @param {string} key The key of the property to get.
     * @returns {Function} Returns the new function.
     */
    function baseProperty(key) {
      return function(object) {
        return object == null ? undefined : object[key];
      };
    }

    /**
     * A specialized version of `baseProperty` which supports deep paths.
     *
     * @private
     * @param {Array|string} path The path of the property to get.
     * @returns {Function} Returns the new function.
     */
    function basePropertyDeep(path) {
      var pathKey = (path + '');
      path = toPath(path);
      return function(object) {
        return baseGet(object, path, pathKey);
      };
    }

    /**
     * The base implementation of `_.pullAt` without support for individual
     * index arguments and capturing the removed elements.
     *
     * @private
     * @param {Array} array The array to modify.
     * @param {number[]} indexes The indexes of elements to remove.
     * @returns {Array} Returns `array`.
     */
    function basePullAt(array, indexes) {
      var length = array ? indexes.length : 0;
      while (length--) {
        var index = indexes[length];
        if (index != previous && isIndex(index)) {
          var previous = index;
          splice.call(array, index, 1);
        }
      }
      return array;
    }

    /**
     * The base implementation of `_.random` without support for argument juggling
     * and returning floating-point numbers.
     *
     * @private
     * @param {number} min The minimum possible value.
     * @param {number} max The maximum possible value.
     * @returns {number} Returns the random number.
     */
    function baseRandom(min, max) {
      return min + nativeFloor(nativeRandom() * (max - min + 1));
    }

    /**
     * The base implementation of `_.reduce` and `_.reduceRight` without support
     * for callback shorthands and `this` binding, which iterates over `collection`
     * using the provided `eachFunc`.
     *
     * @private
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {*} accumulator The initial value.
     * @param {boolean} initFromCollection Specify using the first or last element
     *  of `collection` as the initial value.
     * @param {Function} eachFunc The function to iterate over `collection`.
     * @returns {*} Returns the accumulated value.
     */
    function baseReduce(collection, iteratee, accumulator, initFromCollection, eachFunc) {
      eachFunc(collection, function(value, index, collection) {
        accumulator = initFromCollection
          ? (initFromCollection = false, value)
          : iteratee(accumulator, value, index, collection);
      });
      return accumulator;
    }

    /**
     * The base implementation of `setData` without support for hot loop detection.
     *
     * @private
     * @param {Function} func The function to associate metadata with.
     * @param {*} data The metadata.
     * @returns {Function} Returns `func`.
     */
    var baseSetData = !metaMap ? identity : function(func, data) {
      metaMap.set(func, data);
      return func;
    };

    /**
     * The base implementation of `_.slice` without an iteratee call guard.
     *
     * @private
     * @param {Array} array The array to slice.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns the slice of `array`.
     */
    function baseSlice(array, start, end) {
      var index = -1,
          length = array.length;

      start = start == null ? 0 : (+start || 0);
      if (start < 0) {
        start = -start > length ? 0 : (length + start);
      }
      end = (end === undefined || end > length) ? length : (+end || 0);
      if (end < 0) {
        end += length;
      }
      length = start > end ? 0 : ((end - start) >>> 0);
      start >>>= 0;

      var result = Array(length);
      while (++index < length) {
        result[index] = array[index + start];
      }
      return result;
    }

    /**
     * The base implementation of `_.some` without support for callback shorthands
     * and `this` binding.
     *
     * @private
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {boolean} Returns `true` if any element passes the predicate check,
     *  else `false`.
     */
    function baseSome(collection, predicate) {
      var result;

      baseEach(collection, function(value, index, collection) {
        result = predicate(value, index, collection);
        return !result;
      });
      return !!result;
    }

    /**
     * The base implementation of `_.sortBy` which uses `comparer` to define
     * the sort order of `array` and replaces criteria objects with their
     * corresponding values.
     *
     * @private
     * @param {Array} array The array to sort.
     * @param {Function} comparer The function to define sort order.
     * @returns {Array} Returns `array`.
     */
    function baseSortBy(array, comparer) {
      var length = array.length;

      array.sort(comparer);
      while (length--) {
        array[length] = array[length].value;
      }
      return array;
    }

    /**
     * The base implementation of `_.sortByOrder` without param guards.
     *
     * @private
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
     * @param {boolean[]} orders The sort orders of `iteratees`.
     * @returns {Array} Returns the new sorted array.
     */
    function baseSortByOrder(collection, iteratees, orders) {
      var callback = getCallback(),
          index = -1;

      iteratees = arrayMap(iteratees, function(iteratee) { return callback(iteratee); });

      var result = baseMap(collection, function(value) {
        var criteria = arrayMap(iteratees, function(iteratee) { return iteratee(value); });
        return { 'criteria': criteria, 'index': ++index, 'value': value };
      });

      return baseSortBy(result, function(object, other) {
        return compareMultiple(object, other, orders);
      });
    }

    /**
     * The base implementation of `_.sum` without support for callback shorthands
     * and `this` binding.
     *
     * @private
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {number} Returns the sum.
     */
    function baseSum(collection, iteratee) {
      var result = 0;
      baseEach(collection, function(value, index, collection) {
        result += +iteratee(value, index, collection) || 0;
      });
      return result;
    }

    /**
     * The base implementation of `_.uniq` without support for callback shorthands
     * and `this` binding.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {Function} [iteratee] The function invoked per iteration.
     * @returns {Array} Returns the new duplicate-value-free array.
     */
    function baseUniq(array, iteratee) {
      var index = -1,
          indexOf = getIndexOf(),
          length = array.length,
          isCommon = indexOf == baseIndexOf,
          isLarge = isCommon && length >= LARGE_ARRAY_SIZE,
          seen = isLarge ? createCache() : null,
          result = [];

      if (seen) {
        indexOf = cacheIndexOf;
        isCommon = false;
      } else {
        isLarge = false;
        seen = iteratee ? [] : result;
      }
      outer:
      while (++index < length) {
        var value = array[index],
            computed = iteratee ? iteratee(value, index, array) : value;

        if (isCommon && value === value) {
          var seenIndex = seen.length;
          while (seenIndex--) {
            if (seen[seenIndex] === computed) {
              continue outer;
            }
          }
          if (iteratee) {
            seen.push(computed);
          }
          result.push(value);
        }
        else if (indexOf(seen, computed, 0) < 0) {
          if (iteratee || isLarge) {
            seen.push(computed);
          }
          result.push(value);
        }
      }
      return result;
    }

    /**
     * The base implementation of `_.values` and `_.valuesIn` which creates an
     * array of `object` property values corresponding to the property names
     * of `props`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array} props The property names to get values for.
     * @returns {Object} Returns the array of property values.
     */
    function baseValues(object, props) {
      var index = -1,
          length = props.length,
          result = Array(length);

      while (++index < length) {
        result[index] = object[props[index]];
      }
      return result;
    }

    /**
     * The base implementation of `_.dropRightWhile`, `_.dropWhile`, `_.takeRightWhile`,
     * and `_.takeWhile` without support for callback shorthands and `this` binding.
     *
     * @private
     * @param {Array} array The array to query.
     * @param {Function} predicate The function invoked per iteration.
     * @param {boolean} [isDrop] Specify dropping elements instead of taking them.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Array} Returns the slice of `array`.
     */
    function baseWhile(array, predicate, isDrop, fromRight) {
      var length = array.length,
          index = fromRight ? length : -1;

      while ((fromRight ? index-- : ++index < length) && predicate(array[index], index, array)) {}
      return isDrop
        ? baseSlice(array, (fromRight ? 0 : index), (fromRight ? index + 1 : length))
        : baseSlice(array, (fromRight ? index + 1 : 0), (fromRight ? length : index));
    }

    /**
     * The base implementation of `wrapperValue` which returns the result of
     * performing a sequence of actions on the unwrapped `value`, where each
     * successive action is supplied the return value of the previous.
     *
     * @private
     * @param {*} value The unwrapped value.
     * @param {Array} actions Actions to peform to resolve the unwrapped value.
     * @returns {*} Returns the resolved value.
     */
    function baseWrapperValue(value, actions) {
      var result = value;
      if (result instanceof LazyWrapper) {
        result = result.value();
      }
      var index = -1,
          length = actions.length;

      while (++index < length) {
        var action = actions[index];
        result = action.func.apply(action.thisArg, arrayPush([result], action.args));
      }
      return result;
    }

    /**
     * Performs a binary search of `array` to determine the index at which `value`
     * should be inserted into `array` in order to maintain its sort order.
     *
     * @private
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @param {boolean} [retHighest] Specify returning the highest qualified index.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     */
    function binaryIndex(array, value, retHighest) {
      var low = 0,
          high = array ? array.length : low;

      if (typeof value == 'number' && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
        while (low < high) {
          var mid = (low + high) >>> 1,
              computed = array[mid];

          if ((retHighest ? (computed <= value) : (computed < value)) && computed !== null) {
            low = mid + 1;
          } else {
            high = mid;
          }
        }
        return high;
      }
      return binaryIndexBy(array, value, identity, retHighest);
    }

    /**
     * This function is like `binaryIndex` except that it invokes `iteratee` for
     * `value` and each element of `array` to compute their sort ranking. The
     * iteratee is invoked with one argument; (value).
     *
     * @private
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {boolean} [retHighest] Specify returning the highest qualified index.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     */
    function binaryIndexBy(array, value, iteratee, retHighest) {
      value = iteratee(value);

      var low = 0,
          high = array ? array.length : 0,
          valIsNaN = value !== value,
          valIsNull = value === null,
          valIsUndef = value === undefined;

      while (low < high) {
        var mid = nativeFloor((low + high) / 2),
            computed = iteratee(array[mid]),
            isDef = computed !== undefined,
            isReflexive = computed === computed;

        if (valIsNaN) {
          var setLow = isReflexive || retHighest;
        } else if (valIsNull) {
          setLow = isReflexive && isDef && (retHighest || computed != null);
        } else if (valIsUndef) {
          setLow = isReflexive && (retHighest || isDef);
        } else if (computed == null) {
          setLow = false;
        } else {
          setLow = retHighest ? (computed <= value) : (computed < value);
        }
        if (setLow) {
          low = mid + 1;
        } else {
          high = mid;
        }
      }
      return nativeMin(high, MAX_ARRAY_INDEX);
    }

    /**
     * A specialized version of `baseCallback` which only supports `this` binding
     * and specifying the number of arguments to provide to `func`.
     *
     * @private
     * @param {Function} func The function to bind.
     * @param {*} thisArg The `this` binding of `func`.
     * @param {number} [argCount] The number of arguments to provide to `func`.
     * @returns {Function} Returns the callback.
     */
    function bindCallback(func, thisArg, argCount) {
      if (typeof func != 'function') {
        return identity;
      }
      if (thisArg === undefined) {
        return func;
      }
      switch (argCount) {
        case 1: return function(value) {
          return func.call(thisArg, value);
        };
        case 3: return function(value, index, collection) {
          return func.call(thisArg, value, index, collection);
        };
        case 4: return function(accumulator, value, index, collection) {
          return func.call(thisArg, accumulator, value, index, collection);
        };
        case 5: return function(value, other, key, object, source) {
          return func.call(thisArg, value, other, key, object, source);
        };
      }
      return function() {
        return func.apply(thisArg, arguments);
      };
    }

    /**
     * Creates a clone of the given array buffer.
     *
     * @private
     * @param {ArrayBuffer} buffer The array buffer to clone.
     * @returns {ArrayBuffer} Returns the cloned array buffer.
     */
    function bufferClone(buffer) {
      var result = new ArrayBuffer(buffer.byteLength),
          view = new Uint8Array(result);

      view.set(new Uint8Array(buffer));
      return result;
    }

    /**
     * Creates an array that is the composition of partially applied arguments,
     * placeholders, and provided arguments into a single array of arguments.
     *
     * @private
     * @param {Array|Object} args The provided arguments.
     * @param {Array} partials The arguments to prepend to those provided.
     * @param {Array} holders The `partials` placeholder indexes.
     * @returns {Array} Returns the new array of composed arguments.
     */
    function composeArgs(args, partials, holders) {
      var holdersLength = holders.length,
          argsIndex = -1,
          argsLength = nativeMax(args.length - holdersLength, 0),
          leftIndex = -1,
          leftLength = partials.length,
          result = Array(leftLength + argsLength);

      while (++leftIndex < leftLength) {
        result[leftIndex] = partials[leftIndex];
      }
      while (++argsIndex < holdersLength) {
        result[holders[argsIndex]] = args[argsIndex];
      }
      while (argsLength--) {
        result[leftIndex++] = args[argsIndex++];
      }
      return result;
    }

    /**
     * This function is like `composeArgs` except that the arguments composition
     * is tailored for `_.partialRight`.
     *
     * @private
     * @param {Array|Object} args The provided arguments.
     * @param {Array} partials The arguments to append to those provided.
     * @param {Array} holders The `partials` placeholder indexes.
     * @returns {Array} Returns the new array of composed arguments.
     */
    function composeArgsRight(args, partials, holders) {
      var holdersIndex = -1,
          holdersLength = holders.length,
          argsIndex = -1,
          argsLength = nativeMax(args.length - holdersLength, 0),
          rightIndex = -1,
          rightLength = partials.length,
          result = Array(argsLength + rightLength);

      while (++argsIndex < argsLength) {
        result[argsIndex] = args[argsIndex];
      }
      var offset = argsIndex;
      while (++rightIndex < rightLength) {
        result[offset + rightIndex] = partials[rightIndex];
      }
      while (++holdersIndex < holdersLength) {
        result[offset + holders[holdersIndex]] = args[argsIndex++];
      }
      return result;
    }

    /**
     * Creates a `_.countBy`, `_.groupBy`, `_.indexBy`, or `_.partition` function.
     *
     * @private
     * @param {Function} setter The function to set keys and values of the accumulator object.
     * @param {Function} [initializer] The function to initialize the accumulator object.
     * @returns {Function} Returns the new aggregator function.
     */
    function createAggregator(setter, initializer) {
      return function(collection, iteratee, thisArg) {
        var result = initializer ? initializer() : {};
        iteratee = getCallback(iteratee, thisArg, 3);

        if (isArray(collection)) {
          var index = -1,
              length = collection.length;

          while (++index < length) {
            var value = collection[index];
            setter(result, value, iteratee(value, index, collection), collection);
          }
        } else {
          baseEach(collection, function(value, key, collection) {
            setter(result, value, iteratee(value, key, collection), collection);
          });
        }
        return result;
      };
    }

    /**
     * Creates a `_.assign`, `_.defaults`, or `_.merge` function.
     *
     * @private
     * @param {Function} assigner The function to assign values.
     * @returns {Function} Returns the new assigner function.
     */
    function createAssigner(assigner) {
      return restParam(function(object, sources) {
        var index = -1,
            length = object == null ? 0 : sources.length,
            customizer = length > 2 ? sources[length - 2] : undefined,
            guard = length > 2 ? sources[2] : undefined,
            thisArg = length > 1 ? sources[length - 1] : undefined;

        if (typeof customizer == 'function') {
          customizer = bindCallback(customizer, thisArg, 5);
          length -= 2;
        } else {
          customizer = typeof thisArg == 'function' ? thisArg : undefined;
          length -= (customizer ? 1 : 0);
        }
        if (guard && isIterateeCall(sources[0], sources[1], guard)) {
          customizer = length < 3 ? undefined : customizer;
          length = 1;
        }
        while (++index < length) {
          var source = sources[index];
          if (source) {
            assigner(object, source, customizer);
          }
        }
        return object;
      });
    }

    /**
     * Creates a `baseEach` or `baseEachRight` function.
     *
     * @private
     * @param {Function} eachFunc The function to iterate over a collection.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new base function.
     */
    function createBaseEach(eachFunc, fromRight) {
      return function(collection, iteratee) {
        var length = collection ? getLength(collection) : 0;
        if (!isLength(length)) {
          return eachFunc(collection, iteratee);
        }
        var index = fromRight ? length : -1,
            iterable = toObject(collection);

        while ((fromRight ? index-- : ++index < length)) {
          if (iteratee(iterable[index], index, iterable) === false) {
            break;
          }
        }
        return collection;
      };
    }

    /**
     * Creates a base function for `_.forIn` or `_.forInRight`.
     *
     * @private
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new base function.
     */
    function createBaseFor(fromRight) {
      return function(object, iteratee, keysFunc) {
        var iterable = toObject(object),
            props = keysFunc(object),
            length = props.length,
            index = fromRight ? length : -1;

        while ((fromRight ? index-- : ++index < length)) {
          var key = props[index];
          if (iteratee(iterable[key], key, iterable) === false) {
            break;
          }
        }
        return object;
      };
    }

    /**
     * Creates a function that wraps `func` and invokes it with the `this`
     * binding of `thisArg`.
     *
     * @private
     * @param {Function} func The function to bind.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @returns {Function} Returns the new bound function.
     */
    function createBindWrapper(func, thisArg) {
      var Ctor = createCtorWrapper(func);

      function wrapper() {
        var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
        return fn.apply(thisArg, arguments);
      }
      return wrapper;
    }

    /**
     * Creates a `Set` cache object to optimize linear searches of large arrays.
     *
     * @private
     * @param {Array} [values] The values to cache.
     * @returns {null|Object} Returns the new cache object if `Set` is supported, else `null`.
     */
    function createCache(values) {
      return (nativeCreate && Set) ? new SetCache(values) : null;
    }

    /**
     * Creates a function that produces compound words out of the words in a
     * given string.
     *
     * @private
     * @param {Function} callback The function to combine each word.
     * @returns {Function} Returns the new compounder function.
     */
    function createCompounder(callback) {
      return function(string) {
        var index = -1,
            array = words(deburr(string)),
            length = array.length,
            result = '';

        while (++index < length) {
          result = callback(result, array[index], index);
        }
        return result;
      };
    }

    /**
     * Creates a function that produces an instance of `Ctor` regardless of
     * whether it was invoked as part of a `new` expression or by `call` or `apply`.
     *
     * @private
     * @param {Function} Ctor The constructor to wrap.
     * @returns {Function} Returns the new wrapped function.
     */
    function createCtorWrapper(Ctor) {
      return function() {
        // Use a `switch` statement to work with class constructors.
        // See http://ecma-international.org/ecma-262/6.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
        // for more details.
        var args = arguments;
        switch (args.length) {
          case 0: return new Ctor;
          case 1: return new Ctor(args[0]);
          case 2: return new Ctor(args[0], args[1]);
          case 3: return new Ctor(args[0], args[1], args[2]);
          case 4: return new Ctor(args[0], args[1], args[2], args[3]);
          case 5: return new Ctor(args[0], args[1], args[2], args[3], args[4]);
          case 6: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
          case 7: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
        }
        var thisBinding = baseCreate(Ctor.prototype),
            result = Ctor.apply(thisBinding, args);

        // Mimic the constructor's `return` behavior.
        // See https://es5.github.io/#x13.2.2 for more details.
        return isObject(result) ? result : thisBinding;
      };
    }

    /**
     * Creates a `_.curry` or `_.curryRight` function.
     *
     * @private
     * @param {boolean} flag The curry bit flag.
     * @returns {Function} Returns the new curry function.
     */
    function createCurry(flag) {
      function curryFunc(func, arity, guard) {
        if (guard && isIterateeCall(func, arity, guard)) {
          arity = undefined;
        }
        var result = createWrapper(func, flag, undefined, undefined, undefined, undefined, undefined, arity);
        result.placeholder = curryFunc.placeholder;
        return result;
      }
      return curryFunc;
    }

    /**
     * Creates a `_.defaults` or `_.defaultsDeep` function.
     *
     * @private
     * @param {Function} assigner The function to assign values.
     * @param {Function} customizer The function to customize assigned values.
     * @returns {Function} Returns the new defaults function.
     */
    function createDefaults(assigner, customizer) {
      return restParam(function(args) {
        var object = args[0];
        if (object == null) {
          return object;
        }
        args.push(customizer);
        return assigner.apply(undefined, args);
      });
    }

    /**
     * Creates a `_.max` or `_.min` function.
     *
     * @private
     * @param {Function} comparator The function used to compare values.
     * @param {*} exValue The initial extremum value.
     * @returns {Function} Returns the new extremum function.
     */
    function createExtremum(comparator, exValue) {
      return function(collection, iteratee, thisArg) {
        if (thisArg && isIterateeCall(collection, iteratee, thisArg)) {
          iteratee = undefined;
        }
        iteratee = getCallback(iteratee, thisArg, 3);
        if (iteratee.length == 1) {
          collection = isArray(collection) ? collection : toIterable(collection);
          var result = arrayExtremum(collection, iteratee, comparator, exValue);
          if (!(collection.length && result === exValue)) {
            return result;
          }
        }
        return baseExtremum(collection, iteratee, comparator, exValue);
      };
    }

    /**
     * Creates a `_.find` or `_.findLast` function.
     *
     * @private
     * @param {Function} eachFunc The function to iterate over a collection.
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new find function.
     */
    function createFind(eachFunc, fromRight) {
      return function(collection, predicate, thisArg) {
        predicate = getCallback(predicate, thisArg, 3);
        if (isArray(collection)) {
          var index = baseFindIndex(collection, predicate, fromRight);
          return index > -1 ? collection[index] : undefined;
        }
        return baseFind(collection, predicate, eachFunc);
      };
    }

    /**
     * Creates a `_.findIndex` or `_.findLastIndex` function.
     *
     * @private
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new find function.
     */
    function createFindIndex(fromRight) {
      return function(array, predicate, thisArg) {
        if (!(array && array.length)) {
          return -1;
        }
        predicate = getCallback(predicate, thisArg, 3);
        return baseFindIndex(array, predicate, fromRight);
      };
    }

    /**
     * Creates a `_.findKey` or `_.findLastKey` function.
     *
     * @private
     * @param {Function} objectFunc The function to iterate over an object.
     * @returns {Function} Returns the new find function.
     */
    function createFindKey(objectFunc) {
      return function(object, predicate, thisArg) {
        predicate = getCallback(predicate, thisArg, 3);
        return baseFind(object, predicate, objectFunc, true);
      };
    }

    /**
     * Creates a `_.flow` or `_.flowRight` function.
     *
     * @private
     * @param {boolean} [fromRight] Specify iterating from right to left.
     * @returns {Function} Returns the new flow function.
     */
    function createFlow(fromRight) {
      return function() {
        var wrapper,
            length = arguments.length,
            index = fromRight ? length : -1,
            leftIndex = 0,
            funcs = Array(length);

        while ((fromRight ? index-- : ++index < length)) {
          var func = funcs[leftIndex++] = arguments[index];
          if (typeof func != 'function') {
            throw new TypeError(FUNC_ERROR_TEXT);
          }
          if (!wrapper && LodashWrapper.prototype.thru && getFuncName(func) == 'wrapper') {
            wrapper = new LodashWrapper([], true);
          }
        }
        index = wrapper ? -1 : length;
        while (++index < length) {
          func = funcs[index];

          var funcName = getFuncName(func),
              data = funcName == 'wrapper' ? getData(func) : undefined;

          if (data && isLaziable(data[0]) && data[1] == (ARY_FLAG | CURRY_FLAG | PARTIAL_FLAG | REARG_FLAG) && !data[4].length && data[9] == 1) {
            wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
          } else {
            wrapper = (func.length == 1 && isLaziable(func)) ? wrapper[funcName]() : wrapper.thru(func);
          }
        }
        return function() {
          var args = arguments,
              value = args[0];

          if (wrapper && args.length == 1 && isArray(value) && value.length >= LARGE_ARRAY_SIZE) {
            return wrapper.plant(value).value();
          }
          var index = 0,
              result = length ? funcs[index].apply(this, args) : value;

          while (++index < length) {
            result = funcs[index].call(this, result);
          }
          return result;
        };
      };
    }

    /**
     * Creates a function for `_.forEach` or `_.forEachRight`.
     *
     * @private
     * @param {Function} arrayFunc The function to iterate over an array.
     * @param {Function} eachFunc The function to iterate over a collection.
     * @returns {Function} Returns the new each function.
     */
    function createForEach(arrayFunc, eachFunc) {
      return function(collection, iteratee, thisArg) {
        return (typeof iteratee == 'function' && thisArg === undefined && isArray(collection))
          ? arrayFunc(collection, iteratee)
          : eachFunc(collection, bindCallback(iteratee, thisArg, 3));
      };
    }

    /**
     * Creates a function for `_.forIn` or `_.forInRight`.
     *
     * @private
     * @param {Function} objectFunc The function to iterate over an object.
     * @returns {Function} Returns the new each function.
     */
    function createForIn(objectFunc) {
      return function(object, iteratee, thisArg) {
        if (typeof iteratee != 'function' || thisArg !== undefined) {
          iteratee = bindCallback(iteratee, thisArg, 3);
        }
        return objectFunc(object, iteratee, keysIn);
      };
    }

    /**
     * Creates a function for `_.forOwn` or `_.forOwnRight`.
     *
     * @private
     * @param {Function} objectFunc The function to iterate over an object.
     * @returns {Function} Returns the new each function.
     */
    function createForOwn(objectFunc) {
      return function(object, iteratee, thisArg) {
        if (typeof iteratee != 'function' || thisArg !== undefined) {
          iteratee = bindCallback(iteratee, thisArg, 3);
        }
        return objectFunc(object, iteratee);
      };
    }

    /**
     * Creates a function for `_.mapKeys` or `_.mapValues`.
     *
     * @private
     * @param {boolean} [isMapKeys] Specify mapping keys instead of values.
     * @returns {Function} Returns the new map function.
     */
    function createObjectMapper(isMapKeys) {
      return function(object, iteratee, thisArg) {
        var result = {};
        iteratee = getCallback(iteratee, thisArg, 3);

        baseForOwn(object, function(value, key, object) {
          var mapped = iteratee(value, key, object);
          key = isMapKeys ? mapped : key;
          value = isMapKeys ? value : mapped;
          result[key] = value;
        });
        return result;
      };
    }

    /**
     * Creates a function for `_.padLeft` or `_.padRight`.
     *
     * @private
     * @param {boolean} [fromRight] Specify padding from the right.
     * @returns {Function} Returns the new pad function.
     */
    function createPadDir(fromRight) {
      return function(string, length, chars) {
        string = baseToString(string);
        return (fromRight ? string : '') + createPadding(string, length, chars) + (fromRight ? '' : string);
      };
    }

    /**
     * Creates a `_.partial` or `_.partialRight` function.
     *
     * @private
     * @param {boolean} flag The partial bit flag.
     * @returns {Function} Returns the new partial function.
     */
    function createPartial(flag) {
      var partialFunc = restParam(function(func, partials) {
        var holders = replaceHolders(partials, partialFunc.placeholder);
        return createWrapper(func, flag, undefined, partials, holders);
      });
      return partialFunc;
    }

    /**
     * Creates a function for `_.reduce` or `_.reduceRight`.
     *
     * @private
     * @param {Function} arrayFunc The function to iterate over an array.
     * @param {Function} eachFunc The function to iterate over a collection.
     * @returns {Function} Returns the new each function.
     */
    function createReduce(arrayFunc, eachFunc) {
      return function(collection, iteratee, accumulator, thisArg) {
        var initFromArray = arguments.length < 3;
        return (typeof iteratee == 'function' && thisArg === undefined && isArray(collection))
          ? arrayFunc(collection, iteratee, accumulator, initFromArray)
          : baseReduce(collection, getCallback(iteratee, thisArg, 4), accumulator, initFromArray, eachFunc);
      };
    }

    /**
     * Creates a function that wraps `func` and invokes it with optional `this`
     * binding of, partial application, and currying.
     *
     * @private
     * @param {Function|string} func The function or method name to reference.
     * @param {number} bitmask The bitmask of flags. See `createWrapper` for more details.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param {Array} [partials] The arguments to prepend to those provided to the new function.
     * @param {Array} [holders] The `partials` placeholder indexes.
     * @param {Array} [partialsRight] The arguments to append to those provided to the new function.
     * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
     * @param {Array} [argPos] The argument positions of the new function.
     * @param {number} [ary] The arity cap of `func`.
     * @param {number} [arity] The arity of `func`.
     * @returns {Function} Returns the new wrapped function.
     */
    function createHybridWrapper(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
      var isAry = bitmask & ARY_FLAG,
          isBind = bitmask & BIND_FLAG,
          isBindKey = bitmask & BIND_KEY_FLAG,
          isCurry = bitmask & CURRY_FLAG,
          isCurryBound = bitmask & CURRY_BOUND_FLAG,
          isCurryRight = bitmask & CURRY_RIGHT_FLAG,
          Ctor = isBindKey ? undefined : createCtorWrapper(func);

      function wrapper() {
        // Avoid `arguments` object use disqualifying optimizations by
        // converting it to an array before providing it to other functions.
        var length = arguments.length,
            index = length,
            args = Array(length);

        while (index--) {
          args[index] = arguments[index];
        }
        if (partials) {
          args = composeArgs(args, partials, holders);
        }
        if (partialsRight) {
          args = composeArgsRight(args, partialsRight, holdersRight);
        }
        if (isCurry || isCurryRight) {
          var placeholder = wrapper.placeholder,
              argsHolders = replaceHolders(args, placeholder);

          length -= argsHolders.length;
          if (length < arity) {
            var newArgPos = argPos ? arrayCopy(argPos) : undefined,
                newArity = nativeMax(arity - length, 0),
                newsHolders = isCurry ? argsHolders : undefined,
                newHoldersRight = isCurry ? undefined : argsHolders,
                newPartials = isCurry ? args : undefined,
                newPartialsRight = isCurry ? undefined : args;

            bitmask |= (isCurry ? PARTIAL_FLAG : PARTIAL_RIGHT_FLAG);
            bitmask &= ~(isCurry ? PARTIAL_RIGHT_FLAG : PARTIAL_FLAG);

            if (!isCurryBound) {
              bitmask &= ~(BIND_FLAG | BIND_KEY_FLAG);
            }
            var newData = [func, bitmask, thisArg, newPartials, newsHolders, newPartialsRight, newHoldersRight, newArgPos, ary, newArity],
                result = createHybridWrapper.apply(undefined, newData);

            if (isLaziable(func)) {
              setData(result, newData);
            }
            result.placeholder = placeholder;
            return result;
          }
        }
        var thisBinding = isBind ? thisArg : this,
            fn = isBindKey ? thisBinding[func] : func;

        if (argPos) {
          args = reorder(args, argPos);
        }
        if (isAry && ary < args.length) {
          args.length = ary;
        }
        if (this && this !== root && this instanceof wrapper) {
          fn = Ctor || createCtorWrapper(func);
        }
        return fn.apply(thisBinding, args);
      }
      return wrapper;
    }

    /**
     * Creates the padding required for `string` based on the given `length`.
     * The `chars` string is truncated if the number of characters exceeds `length`.
     *
     * @private
     * @param {string} string The string to create padding for.
     * @param {number} [length=0] The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the pad for `string`.
     */
    function createPadding(string, length, chars) {
      var strLength = string.length;
      length = +length;

      if (strLength >= length || !nativeIsFinite(length)) {
        return '';
      }
      var padLength = length - strLength;
      chars = chars == null ? ' ' : (chars + '');
      return repeat(chars, nativeCeil(padLength / chars.length)).slice(0, padLength);
    }

    /**
     * Creates a function that wraps `func` and invokes it with the optional `this`
     * binding of `thisArg` and the `partials` prepended to those provided to
     * the wrapper.
     *
     * @private
     * @param {Function} func The function to partially apply arguments to.
     * @param {number} bitmask The bitmask of flags. See `createWrapper` for more details.
     * @param {*} thisArg The `this` binding of `func`.
     * @param {Array} partials The arguments to prepend to those provided to the new function.
     * @returns {Function} Returns the new bound function.
     */
    function createPartialWrapper(func, bitmask, thisArg, partials) {
      var isBind = bitmask & BIND_FLAG,
          Ctor = createCtorWrapper(func);

      function wrapper() {
        // Avoid `arguments` object use disqualifying optimizations by
        // converting it to an array before providing it `func`.
        var argsIndex = -1,
            argsLength = arguments.length,
            leftIndex = -1,
            leftLength = partials.length,
            args = Array(leftLength + argsLength);

        while (++leftIndex < leftLength) {
          args[leftIndex] = partials[leftIndex];
        }
        while (argsLength--) {
          args[leftIndex++] = arguments[++argsIndex];
        }
        var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
        return fn.apply(isBind ? thisArg : this, args);
      }
      return wrapper;
    }

    /**
     * Creates a `_.ceil`, `_.floor`, or `_.round` function.
     *
     * @private
     * @param {string} methodName The name of the `Math` method to use when rounding.
     * @returns {Function} Returns the new round function.
     */
    function createRound(methodName) {
      var func = Math[methodName];
      return function(number, precision) {
        precision = precision === undefined ? 0 : (+precision || 0);
        if (precision) {
          precision = pow(10, precision);
          return func(number * precision) / precision;
        }
        return func(number);
      };
    }

    /**
     * Creates a `_.sortedIndex` or `_.sortedLastIndex` function.
     *
     * @private
     * @param {boolean} [retHighest] Specify returning the highest qualified index.
     * @returns {Function} Returns the new index function.
     */
    function createSortedIndex(retHighest) {
      return function(array, value, iteratee, thisArg) {
        var callback = getCallback(iteratee);
        return (iteratee == null && callback === baseCallback)
          ? binaryIndex(array, value, retHighest)
          : binaryIndexBy(array, value, callback(iteratee, thisArg, 1), retHighest);
      };
    }

    /**
     * Creates a function that either curries or invokes `func` with optional
     * `this` binding and partially applied arguments.
     *
     * @private
     * @param {Function|string} func The function or method name to reference.
     * @param {number} bitmask The bitmask of flags.
     *  The bitmask may be composed of the following flags:
     *     1 - `_.bind`
     *     2 - `_.bindKey`
     *     4 - `_.curry` or `_.curryRight` of a bound function
     *     8 - `_.curry`
     *    16 - `_.curryRight`
     *    32 - `_.partial`
     *    64 - `_.partialRight`
     *   128 - `_.rearg`
     *   256 - `_.ary`
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param {Array} [partials] The arguments to be partially applied.
     * @param {Array} [holders] The `partials` placeholder indexes.
     * @param {Array} [argPos] The argument positions of the new function.
     * @param {number} [ary] The arity cap of `func`.
     * @param {number} [arity] The arity of `func`.
     * @returns {Function} Returns the new wrapped function.
     */
    function createWrapper(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
      var isBindKey = bitmask & BIND_KEY_FLAG;
      if (!isBindKey && typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      var length = partials ? partials.length : 0;
      if (!length) {
        bitmask &= ~(PARTIAL_FLAG | PARTIAL_RIGHT_FLAG);
        partials = holders = undefined;
      }
      length -= (holders ? holders.length : 0);
      if (bitmask & PARTIAL_RIGHT_FLAG) {
        var partialsRight = partials,
            holdersRight = holders;

        partials = holders = undefined;
      }
      var data = isBindKey ? undefined : getData(func),
          newData = [func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity];

      if (data) {
        mergeData(newData, data);
        bitmask = newData[1];
        arity = newData[9];
      }
      newData[9] = arity == null
        ? (isBindKey ? 0 : func.length)
        : (nativeMax(arity - length, 0) || 0);

      if (bitmask == BIND_FLAG) {
        var result = createBindWrapper(newData[0], newData[2]);
      } else if ((bitmask == PARTIAL_FLAG || bitmask == (BIND_FLAG | PARTIAL_FLAG)) && !newData[4].length) {
        result = createPartialWrapper.apply(undefined, newData);
      } else {
        result = createHybridWrapper.apply(undefined, newData);
      }
      var setter = data ? baseSetData : setData;
      return setter(result, newData);
    }

    /**
     * A specialized version of `baseIsEqualDeep` for arrays with support for
     * partial deep comparisons.
     *
     * @private
     * @param {Array} array The array to compare.
     * @param {Array} other The other array to compare.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Function} [customizer] The function to customize comparing arrays.
     * @param {boolean} [isLoose] Specify performing partial comparisons.
     * @param {Array} [stackA] Tracks traversed `value` objects.
     * @param {Array} [stackB] Tracks traversed `other` objects.
     * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
     */
    function equalArrays(array, other, equalFunc, customizer, isLoose, stackA, stackB) {
      var index = -1,
          arrLength = array.length,
          othLength = other.length;

      if (arrLength != othLength && !(isLoose && othLength > arrLength)) {
        return false;
      }
      // Ignore non-index properties.
      while (++index < arrLength) {
        var arrValue = array[index],
            othValue = other[index],
            result = customizer ? customizer(isLoose ? othValue : arrValue, isLoose ? arrValue : othValue, index) : undefined;

        if (result !== undefined) {
          if (result) {
            continue;
          }
          return false;
        }
        // Recursively compare arrays (susceptible to call stack limits).
        if (isLoose) {
          if (!arraySome(other, function(othValue) {
                return arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB);
              })) {
            return false;
          }
        } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB))) {
          return false;
        }
      }
      return true;
    }

    /**
     * A specialized version of `baseIsEqualDeep` for comparing objects of
     * the same `toStringTag`.
     *
     * **Note:** This function only supports comparing values with tags of
     * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {string} tag The `toStringTag` of the objects to compare.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
    function equalByTag(object, other, tag) {
      switch (tag) {
        case boolTag:
        case dateTag:
          // Coerce dates and booleans to numbers, dates to milliseconds and booleans
          // to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
          return +object == +other;

        case errorTag:
          return object.name == other.name && object.message == other.message;

        case numberTag:
          // Treat `NaN` vs. `NaN` as equal.
          return (object != +object)
            ? other != +other
            : object == +other;

        case regexpTag:
        case stringTag:
          // Coerce regexes to strings and treat strings primitives and string
          // objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
          return object == (other + '');
      }
      return false;
    }

    /**
     * A specialized version of `baseIsEqualDeep` for objects with support for
     * partial deep comparisons.
     *
     * @private
     * @param {Object} object The object to compare.
     * @param {Object} other The other object to compare.
     * @param {Function} equalFunc The function to determine equivalents of values.
     * @param {Function} [customizer] The function to customize comparing values.
     * @param {boolean} [isLoose] Specify performing partial comparisons.
     * @param {Array} [stackA] Tracks traversed `value` objects.
     * @param {Array} [stackB] Tracks traversed `other` objects.
     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
     */
    function equalObjects(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
      var objProps = keys(object),
          objLength = objProps.length,
          othProps = keys(other),
          othLength = othProps.length;

      if (objLength != othLength && !isLoose) {
        return false;
      }
      var index = objLength;
      while (index--) {
        var key = objProps[index];
        if (!(isLoose ? key in other : hasOwnProperty.call(other, key))) {
          return false;
        }
      }
      var skipCtor = isLoose;
      while (++index < objLength) {
        key = objProps[index];
        var objValue = object[key],
            othValue = other[key],
            result = customizer ? customizer(isLoose ? othValue : objValue, isLoose? objValue : othValue, key) : undefined;

        // Recursively compare objects (susceptible to call stack limits).
        if (!(result === undefined ? equalFunc(objValue, othValue, customizer, isLoose, stackA, stackB) : result)) {
          return false;
        }
        skipCtor || (skipCtor = key == 'constructor');
      }
      if (!skipCtor) {
        var objCtor = object.constructor,
            othCtor = other.constructor;

        // Non `Object` object instances with different constructors are not equal.
        if (objCtor != othCtor &&
            ('constructor' in object && 'constructor' in other) &&
            !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
              typeof othCtor == 'function' && othCtor instanceof othCtor)) {
          return false;
        }
      }
      return true;
    }

    /**
     * Gets the appropriate "callback" function. If the `_.callback` method is
     * customized this function returns the custom method, otherwise it returns
     * the `baseCallback` function. If arguments are provided the chosen function
     * is invoked with them and its result is returned.
     *
     * @private
     * @returns {Function} Returns the chosen function or its result.
     */
    function getCallback(func, thisArg, argCount) {
      var result = lodash.callback || callback;
      result = result === callback ? baseCallback : result;
      return argCount ? result(func, thisArg, argCount) : result;
    }

    /**
     * Gets metadata for `func`.
     *
     * @private
     * @param {Function} func The function to query.
     * @returns {*} Returns the metadata for `func`.
     */
    var getData = !metaMap ? noop : function(func) {
      return metaMap.get(func);
    };

    /**
     * Gets the name of `func`.
     *
     * @private
     * @param {Function} func The function to query.
     * @returns {string} Returns the function name.
     */
    function getFuncName(func) {
      var result = func.name,
          array = realNames[result],
          length = array ? array.length : 0;

      while (length--) {
        var data = array[length],
            otherFunc = data.func;
        if (otherFunc == null || otherFunc == func) {
          return data.name;
        }
      }
      return result;
    }

    /**
     * Gets the appropriate "indexOf" function. If the `_.indexOf` method is
     * customized this function returns the custom method, otherwise it returns
     * the `baseIndexOf` function. If arguments are provided the chosen function
     * is invoked with them and its result is returned.
     *
     * @private
     * @returns {Function|number} Returns the chosen function or its result.
     */
    function getIndexOf(collection, target, fromIndex) {
      var result = lodash.indexOf || indexOf;
      result = result === indexOf ? baseIndexOf : result;
      return collection ? result(collection, target, fromIndex) : result;
    }

    /**
     * Gets the "length" property value of `object`.
     *
     * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
     * that affects Safari on at least iOS 8.1-8.3 ARM64.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {*} Returns the "length" value.
     */
    var getLength = baseProperty('length');

    /**
     * Gets the propery names, values, and compare flags of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the match data of `object`.
     */
    function getMatchData(object) {
      var result = pairs(object),
          length = result.length;

      while (length--) {
        result[length][2] = isStrictComparable(result[length][1]);
      }
      return result;
    }

    /**
     * Gets the native function at `key` of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {string} key The key of the method to get.
     * @returns {*} Returns the function if it's native, else `undefined`.
     */
    function getNative(object, key) {
      var value = object == null ? undefined : object[key];
      return isNative(value) ? value : undefined;
    }

    /**
     * Gets the view, applying any `transforms` to the `start` and `end` positions.
     *
     * @private
     * @param {number} start The start of the view.
     * @param {number} end The end of the view.
     * @param {Array} transforms The transformations to apply to the view.
     * @returns {Object} Returns an object containing the `start` and `end`
     *  positions of the view.
     */
    function getView(start, end, transforms) {
      var index = -1,
          length = transforms.length;

      while (++index < length) {
        var data = transforms[index],
            size = data.size;

        switch (data.type) {
          case 'drop':      start += size; break;
          case 'dropRight': end -= size; break;
          case 'take':      end = nativeMin(end, start + size); break;
          case 'takeRight': start = nativeMax(start, end - size); break;
        }
      }
      return { 'start': start, 'end': end };
    }

    /**
     * Initializes an array clone.
     *
     * @private
     * @param {Array} array The array to clone.
     * @returns {Array} Returns the initialized clone.
     */
    function initCloneArray(array) {
      var length = array.length,
          result = new array.constructor(length);

      // Add array properties assigned by `RegExp#exec`.
      if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
        result.index = array.index;
        result.input = array.input;
      }
      return result;
    }

    /**
     * Initializes an object clone.
     *
     * @private
     * @param {Object} object The object to clone.
     * @returns {Object} Returns the initialized clone.
     */
    function initCloneObject(object) {
      var Ctor = object.constructor;
      if (!(typeof Ctor == 'function' && Ctor instanceof Ctor)) {
        Ctor = Object;
      }
      return new Ctor;
    }

    /**
     * Initializes an object clone based on its `toStringTag`.
     *
     * **Note:** This function only supports cloning values with tags of
     * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
     *
     * @private
     * @param {Object} object The object to clone.
     * @param {string} tag The `toStringTag` of the object to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the initialized clone.
     */
    function initCloneByTag(object, tag, isDeep) {
      var Ctor = object.constructor;
      switch (tag) {
        case arrayBufferTag:
          return bufferClone(object);

        case boolTag:
        case dateTag:
          return new Ctor(+object);

        case float32Tag: case float64Tag:
        case int8Tag: case int16Tag: case int32Tag:
        case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
          var buffer = object.buffer;
          return new Ctor(isDeep ? bufferClone(buffer) : buffer, object.byteOffset, object.length);

        case numberTag:
        case stringTag:
          return new Ctor(object);

        case regexpTag:
          var result = new Ctor(object.source, reFlags.exec(object));
          result.lastIndex = object.lastIndex;
      }
      return result;
    }

    /**
     * Invokes the method at `path` on `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the method to invoke.
     * @param {Array} args The arguments to invoke the method with.
     * @returns {*} Returns the result of the invoked method.
     */
    function invokePath(object, path, args) {
      if (object != null && !isKey(path, object)) {
        path = toPath(path);
        object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
        path = last(path);
      }
      var func = object == null ? object : object[path];
      return func == null ? undefined : func.apply(object, args);
    }

    /**
     * Checks if `value` is array-like.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
     */
    function isArrayLike(value) {
      return value != null && isLength(getLength(value));
    }

    /**
     * Checks if `value` is a valid array-like index.
     *
     * @private
     * @param {*} value The value to check.
     * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
     * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
     */
    function isIndex(value, length) {
      value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
      length = length == null ? MAX_SAFE_INTEGER : length;
      return value > -1 && value % 1 == 0 && value < length;
    }

    /**
     * Checks if the provided arguments are from an iteratee call.
     *
     * @private
     * @param {*} value The potential iteratee value argument.
     * @param {*} index The potential iteratee index or key argument.
     * @param {*} object The potential iteratee object argument.
     * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
     */
    function isIterateeCall(value, index, object) {
      if (!isObject(object)) {
        return false;
      }
      var type = typeof index;
      if (type == 'number'
          ? (isArrayLike(object) && isIndex(index, object.length))
          : (type == 'string' && index in object)) {
        var other = object[index];
        return value === value ? (value === other) : (other !== other);
      }
      return false;
    }

    /**
     * Checks if `value` is a property name and not a property path.
     *
     * @private
     * @param {*} value The value to check.
     * @param {Object} [object] The object to query keys on.
     * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
     */
    function isKey(value, object) {
      var type = typeof value;
      if ((type == 'string' && reIsPlainProp.test(value)) || type == 'number') {
        return true;
      }
      if (isArray(value)) {
        return false;
      }
      var result = !reIsDeepProp.test(value);
      return result || (object != null && value in toObject(object));
    }

    /**
     * Checks if `func` has a lazy counterpart.
     *
     * @private
     * @param {Function} func The function to check.
     * @returns {boolean} Returns `true` if `func` has a lazy counterpart, else `false`.
     */
    function isLaziable(func) {
      var funcName = getFuncName(func);
      if (!(funcName in LazyWrapper.prototype)) {
        return false;
      }
      var other = lodash[funcName];
      if (func === other) {
        return true;
      }
      var data = getData(other);
      return !!data && func === data[0];
    }

    /**
     * Checks if `value` is a valid array-like length.
     *
     * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
     */
    function isLength(value) {
      return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }

    /**
     * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` if suitable for strict
     *  equality comparisons, else `false`.
     */
    function isStrictComparable(value) {
      return value === value && !isObject(value);
    }

    /**
     * Merges the function metadata of `source` into `data`.
     *
     * Merging metadata reduces the number of wrappers required to invoke a function.
     * This is possible because methods like `_.bind`, `_.curry`, and `_.partial`
     * may be applied regardless of execution order. Methods like `_.ary` and `_.rearg`
     * augment function arguments, making the order in which they are executed important,
     * preventing the merging of metadata. However, we make an exception for a safe
     * common case where curried functions have `_.ary` and or `_.rearg` applied.
     *
     * @private
     * @param {Array} data The destination metadata.
     * @param {Array} source The source metadata.
     * @returns {Array} Returns `data`.
     */
    function mergeData(data, source) {
      var bitmask = data[1],
          srcBitmask = source[1],
          newBitmask = bitmask | srcBitmask,
          isCommon = newBitmask < ARY_FLAG;

      var isCombo =
        (srcBitmask == ARY_FLAG && bitmask == CURRY_FLAG) ||
        (srcBitmask == ARY_FLAG && bitmask == REARG_FLAG && data[7].length <= source[8]) ||
        (srcBitmask == (ARY_FLAG | REARG_FLAG) && bitmask == CURRY_FLAG);

      // Exit early if metadata can't be merged.
      if (!(isCommon || isCombo)) {
        return data;
      }
      // Use source `thisArg` if available.
      if (srcBitmask & BIND_FLAG) {
        data[2] = source[2];
        // Set when currying a bound function.
        newBitmask |= (bitmask & BIND_FLAG) ? 0 : CURRY_BOUND_FLAG;
      }
      // Compose partial arguments.
      var value = source[3];
      if (value) {
        var partials = data[3];
        data[3] = partials ? composeArgs(partials, value, source[4]) : arrayCopy(value);
        data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : arrayCopy(source[4]);
      }
      // Compose partial right arguments.
      value = source[5];
      if (value) {
        partials = data[5];
        data[5] = partials ? composeArgsRight(partials, value, source[6]) : arrayCopy(value);
        data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : arrayCopy(source[6]);
      }
      // Use source `argPos` if available.
      value = source[7];
      if (value) {
        data[7] = arrayCopy(value);
      }
      // Use source `ary` if it's smaller.
      if (srcBitmask & ARY_FLAG) {
        data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
      }
      // Use source `arity` if one is not provided.
      if (data[9] == null) {
        data[9] = source[9];
      }
      // Use source `func` and merge bitmasks.
      data[0] = source[0];
      data[1] = newBitmask;

      return data;
    }

    /**
     * Used by `_.defaultsDeep` to customize its `_.merge` use.
     *
     * @private
     * @param {*} objectValue The destination object property value.
     * @param {*} sourceValue The source object property value.
     * @returns {*} Returns the value to assign to the destination object.
     */
    function mergeDefaults(objectValue, sourceValue) {
      return objectValue === undefined ? sourceValue : merge(objectValue, sourceValue, mergeDefaults);
    }

    /**
     * A specialized version of `_.pick` which picks `object` properties specified
     * by `props`.
     *
     * @private
     * @param {Object} object The source object.
     * @param {string[]} props The property names to pick.
     * @returns {Object} Returns the new object.
     */
    function pickByArray(object, props) {
      object = toObject(object);

      var index = -1,
          length = props.length,
          result = {};

      while (++index < length) {
        var key = props[index];
        if (key in object) {
          result[key] = object[key];
        }
      }
      return result;
    }

    /**
     * A specialized version of `_.pick` which picks `object` properties `predicate`
     * returns truthy for.
     *
     * @private
     * @param {Object} object The source object.
     * @param {Function} predicate The function invoked per iteration.
     * @returns {Object} Returns the new object.
     */
    function pickByCallback(object, predicate) {
      var result = {};
      baseForIn(object, function(value, key, object) {
        if (predicate(value, key, object)) {
          result[key] = value;
        }
      });
      return result;
    }

    /**
     * Reorder `array` according to the specified indexes where the element at
     * the first index is assigned as the first element, the element at
     * the second index is assigned as the second element, and so on.
     *
     * @private
     * @param {Array} array The array to reorder.
     * @param {Array} indexes The arranged array indexes.
     * @returns {Array} Returns `array`.
     */
    function reorder(array, indexes) {
      var arrLength = array.length,
          length = nativeMin(indexes.length, arrLength),
          oldArray = arrayCopy(array);

      while (length--) {
        var index = indexes[length];
        array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined;
      }
      return array;
    }

    /**
     * Sets metadata for `func`.
     *
     * **Note:** If this function becomes hot, i.e. is invoked a lot in a short
     * period of time, it will trip its breaker and transition to an identity function
     * to avoid garbage collection pauses in V8. See [V8 issue 2070](https://code.google.com/p/v8/issues/detail?id=2070)
     * for more details.
     *
     * @private
     * @param {Function} func The function to associate metadata with.
     * @param {*} data The metadata.
     * @returns {Function} Returns `func`.
     */
    var setData = (function() {
      var count = 0,
          lastCalled = 0;

      return function(key, value) {
        var stamp = now(),
            remaining = HOT_SPAN - (stamp - lastCalled);

        lastCalled = stamp;
        if (remaining > 0) {
          if (++count >= HOT_COUNT) {
            return key;
          }
        } else {
          count = 0;
        }
        return baseSetData(key, value);
      };
    }());

    /**
     * A fallback implementation of `Object.keys` which creates an array of the
     * own enumerable property names of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */
    function shimKeys(object) {
      var props = keysIn(object),
          propsLength = props.length,
          length = propsLength && object.length;

      var allowIndexes = !!length && isLength(length) &&
        (isArray(object) || isArguments(object));

      var index = -1,
          result = [];

      while (++index < propsLength) {
        var key = props[index];
        if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
          result.push(key);
        }
      }
      return result;
    }

    /**
     * Converts `value` to an array-like object if it's not one.
     *
     * @private
     * @param {*} value The value to process.
     * @returns {Array|Object} Returns the array-like object.
     */
    function toIterable(value) {
      if (value == null) {
        return [];
      }
      if (!isArrayLike(value)) {
        return values(value);
      }
      return isObject(value) ? value : Object(value);
    }

    /**
     * Converts `value` to an object if it's not one.
     *
     * @private
     * @param {*} value The value to process.
     * @returns {Object} Returns the object.
     */
    function toObject(value) {
      return isObject(value) ? value : Object(value);
    }

    /**
     * Converts `value` to property path array if it's not one.
     *
     * @private
     * @param {*} value The value to process.
     * @returns {Array} Returns the property path array.
     */
    function toPath(value) {
      if (isArray(value)) {
        return value;
      }
      var result = [];
      baseToString(value).replace(rePropName, function(match, number, quote, string) {
        result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
      });
      return result;
    }

    /**
     * Creates a clone of `wrapper`.
     *
     * @private
     * @param {Object} wrapper The wrapper to clone.
     * @returns {Object} Returns the cloned wrapper.
     */
    function wrapperClone(wrapper) {
      return wrapper instanceof LazyWrapper
        ? wrapper.clone()
        : new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__, arrayCopy(wrapper.__actions__));
    }

    /*------------------------------------------------------------------------*/

    /**
     * Creates an array of elements split into groups the length of `size`.
     * If `collection` can't be split evenly, the final chunk will be the remaining
     * elements.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to process.
     * @param {number} [size=1] The length of each chunk.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Array} Returns the new array containing chunks.
     * @example
     *
     * _.chunk(['a', 'b', 'c', 'd'], 2);
     * // => [['a', 'b'], ['c', 'd']]
     *
     * _.chunk(['a', 'b', 'c', 'd'], 3);
     * // => [['a', 'b', 'c'], ['d']]
     */
    function chunk(array, size, guard) {
      if (guard ? isIterateeCall(array, size, guard) : size == null) {
        size = 1;
      } else {
        size = nativeMax(nativeFloor(size) || 1, 1);
      }
      var index = 0,
          length = array ? array.length : 0,
          resIndex = -1,
          result = Array(nativeCeil(length / size));

      while (index < length) {
        result[++resIndex] = baseSlice(array, index, (index += size));
      }
      return result;
    }

    /**
     * Creates an array with all falsey values removed. The values `false`, `null`,
     * `0`, `""`, `undefined`, and `NaN` are falsey.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to compact.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * _.compact([0, 1, false, 2, '', 3]);
     * // => [1, 2, 3]
     */
    function compact(array) {
      var index = -1,
          length = array ? array.length : 0,
          resIndex = -1,
          result = [];

      while (++index < length) {
        var value = array[index];
        if (value) {
          result[++resIndex] = value;
        }
      }
      return result;
    }

    /**
     * Creates an array of unique `array` values not included in the other
     * provided arrays using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {...Array} [values] The arrays of values to exclude.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * _.difference([1, 2, 3], [4, 2]);
     * // => [1, 3]
     */
    var difference = restParam(function(array, values) {
      return (isObjectLike(array) && isArrayLike(array))
        ? baseDifference(array, baseFlatten(values, false, true))
        : [];
    });

    /**
     * Creates a slice of `array` with `n` elements dropped from the beginning.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to drop.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.drop([1, 2, 3]);
     * // => [2, 3]
     *
     * _.drop([1, 2, 3], 2);
     * // => [3]
     *
     * _.drop([1, 2, 3], 5);
     * // => []
     *
     * _.drop([1, 2, 3], 0);
     * // => [1, 2, 3]
     */
    function drop(array, n, guard) {
      var length = array ? array.length : 0;
      if (!length) {
        return [];
      }
      if (guard ? isIterateeCall(array, n, guard) : n == null) {
        n = 1;
      }
      return baseSlice(array, n < 0 ? 0 : n);
    }

    /**
     * Creates a slice of `array` with `n` elements dropped from the end.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to drop.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.dropRight([1, 2, 3]);
     * // => [1, 2]
     *
     * _.dropRight([1, 2, 3], 2);
     * // => [1]
     *
     * _.dropRight([1, 2, 3], 5);
     * // => []
     *
     * _.dropRight([1, 2, 3], 0);
     * // => [1, 2, 3]
     */
    function dropRight(array, n, guard) {
      var length = array ? array.length : 0;
      if (!length) {
        return [];
      }
      if (guard ? isIterateeCall(array, n, guard) : n == null) {
        n = 1;
      }
      n = length - (+n || 0);
      return baseSlice(array, 0, n < 0 ? 0 : n);
    }

    /**
     * Creates a slice of `array` excluding elements dropped from the end.
     * Elements are dropped until `predicate` returns falsey. The predicate is
     * bound to `thisArg` and invoked with three arguments: (value, index, array).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that match the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.dropRightWhile([1, 2, 3], function(n) {
     *   return n > 1;
     * });
     * // => [1]
     *
     * var users = [
     *   { 'user': 'barney',  'active': true },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': false }
     * ];
     *
     * // using the `_.matches` callback shorthand
     * _.pluck(_.dropRightWhile(users, { 'user': 'pebbles', 'active': false }), 'user');
     * // => ['barney', 'fred']
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.pluck(_.dropRightWhile(users, 'active', false), 'user');
     * // => ['barney']
     *
     * // using the `_.property` callback shorthand
     * _.pluck(_.dropRightWhile(users, 'active'), 'user');
     * // => ['barney', 'fred', 'pebbles']
     */
    function dropRightWhile(array, predicate, thisArg) {
      return (array && array.length)
        ? baseWhile(array, getCallback(predicate, thisArg, 3), true, true)
        : [];
    }

    /**
     * Creates a slice of `array` excluding elements dropped from the beginning.
     * Elements are dropped until `predicate` returns falsey. The predicate is
     * bound to `thisArg` and invoked with three arguments: (value, index, array).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.dropWhile([1, 2, 3], function(n) {
     *   return n < 3;
     * });
     * // => [3]
     *
     * var users = [
     *   { 'user': 'barney',  'active': false },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': true }
     * ];
     *
     * // using the `_.matches` callback shorthand
     * _.pluck(_.dropWhile(users, { 'user': 'barney', 'active': false }), 'user');
     * // => ['fred', 'pebbles']
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.pluck(_.dropWhile(users, 'active', false), 'user');
     * // => ['pebbles']
     *
     * // using the `_.property` callback shorthand
     * _.pluck(_.dropWhile(users, 'active'), 'user');
     * // => ['barney', 'fred', 'pebbles']
     */
    function dropWhile(array, predicate, thisArg) {
      return (array && array.length)
        ? baseWhile(array, getCallback(predicate, thisArg, 3), true)
        : [];
    }

    /**
     * Fills elements of `array` with `value` from `start` up to, but not
     * including, `end`.
     *
     * **Note:** This method mutates `array`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to fill.
     * @param {*} value The value to fill `array` with.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = [1, 2, 3];
     *
     * _.fill(array, 'a');
     * console.log(array);
     * // => ['a', 'a', 'a']
     *
     * _.fill(Array(3), 2);
     * // => [2, 2, 2]
     *
     * _.fill([4, 6, 8], '*', 1, 2);
     * // => [4, '*', 8]
     */
    function fill(array, value, start, end) {
      var length = array ? array.length : 0;
      if (!length) {
        return [];
      }
      if (start && typeof start != 'number' && isIterateeCall(array, value, start)) {
        start = 0;
        end = length;
      }
      return baseFill(array, value, start, end);
    }

    /**
     * This method is like `_.find` except that it returns the index of the first
     * element `predicate` returns truthy for instead of the element itself.
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to search.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {number} Returns the index of the found element, else `-1`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': false },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': true }
     * ];
     *
     * _.findIndex(users, function(chr) {
     *   return chr.user == 'barney';
     * });
     * // => 0
     *
     * // using the `_.matches` callback shorthand
     * _.findIndex(users, { 'user': 'fred', 'active': false });
     * // => 1
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.findIndex(users, 'active', false);
     * // => 0
     *
     * // using the `_.property` callback shorthand
     * _.findIndex(users, 'active');
     * // => 2
     */
    var findIndex = createFindIndex();

    /**
     * This method is like `_.findIndex` except that it iterates over elements
     * of `collection` from right to left.
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to search.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {number} Returns the index of the found element, else `-1`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'active': true },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': false }
     * ];
     *
     * _.findLastIndex(users, function(chr) {
     *   return chr.user == 'pebbles';
     * });
     * // => 2
     *
     * // using the `_.matches` callback shorthand
     * _.findLastIndex(users, { 'user': 'barney', 'active': true });
     * // => 0
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.findLastIndex(users, 'active', false);
     * // => 2
     *
     * // using the `_.property` callback shorthand
     * _.findLastIndex(users, 'active');
     * // => 0
     */
    var findLastIndex = createFindIndex(true);

    /**
     * Gets the first element of `array`.
     *
     * @static
     * @memberOf _
     * @alias head
     * @category Array
     * @param {Array} array The array to query.
     * @returns {*} Returns the first element of `array`.
     * @example
     *
     * _.first([1, 2, 3]);
     * // => 1
     *
     * _.first([]);
     * // => undefined
     */
    function first(array) {
      return array ? array[0] : undefined;
    }

    /**
     * Flattens a nested array. If `isDeep` is `true` the array is recursively
     * flattened, otherwise it is only flattened a single level.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to flatten.
     * @param {boolean} [isDeep] Specify a deep flatten.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * _.flatten([1, [2, 3, [4]]]);
     * // => [1, 2, 3, [4]]
     *
     * // using `isDeep`
     * _.flatten([1, [2, 3, [4]]], true);
     * // => [1, 2, 3, 4]
     */
    function flatten(array, isDeep, guard) {
      var length = array ? array.length : 0;
      if (guard && isIterateeCall(array, isDeep, guard)) {
        isDeep = false;
      }
      return length ? baseFlatten(array, isDeep) : [];
    }

    /**
     * Recursively flattens a nested array.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to recursively flatten.
     * @returns {Array} Returns the new flattened array.
     * @example
     *
     * _.flattenDeep([1, [2, 3, [4]]]);
     * // => [1, 2, 3, 4]
     */
    function flattenDeep(array) {
      var length = array ? array.length : 0;
      return length ? baseFlatten(array, true) : [];
    }

    /**
     * Gets the index at which the first occurrence of `value` is found in `array`
     * using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
     * for equality comparisons. If `fromIndex` is negative, it is used as the offset
     * from the end of `array`. If `array` is sorted providing `true` for `fromIndex`
     * performs a faster binary search.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to search.
     * @param {*} value The value to search for.
     * @param {boolean|number} [fromIndex=0] The index to search from or `true`
     *  to perform a binary search on a sorted array.
     * @returns {number} Returns the index of the matched value, else `-1`.
     * @example
     *
     * _.indexOf([1, 2, 1, 2], 2);
     * // => 1
     *
     * // using `fromIndex`
     * _.indexOf([1, 2, 1, 2], 2, 2);
     * // => 3
     *
     * // performing a binary search
     * _.indexOf([1, 1, 2, 2], 2, true);
     * // => 2
     */
    function indexOf(array, value, fromIndex) {
      var length = array ? array.length : 0;
      if (!length) {
        return -1;
      }
      if (typeof fromIndex == 'number') {
        fromIndex = fromIndex < 0 ? nativeMax(length + fromIndex, 0) : fromIndex;
      } else if (fromIndex) {
        var index = binaryIndex(array, value);
        if (index < length &&
            (value === value ? (value === array[index]) : (array[index] !== array[index]))) {
          return index;
        }
        return -1;
      }
      return baseIndexOf(array, value, fromIndex || 0);
    }

    /**
     * Gets all but the last element of `array`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.initial([1, 2, 3]);
     * // => [1, 2]
     */
    function initial(array) {
      return dropRight(array, 1);
    }

    /**
     * Creates an array of unique values that are included in all of the provided
     * arrays using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @returns {Array} Returns the new array of shared values.
     * @example
     * _.intersection([1, 2], [4, 2], [2, 1]);
     * // => [2]
     */
    var intersection = restParam(function(arrays) {
      var othLength = arrays.length,
          othIndex = othLength,
          caches = Array(length),
          indexOf = getIndexOf(),
          isCommon = indexOf == baseIndexOf,
          result = [];

      while (othIndex--) {
        var value = arrays[othIndex] = isArrayLike(value = arrays[othIndex]) ? value : [];
        caches[othIndex] = (isCommon && value.length >= 120) ? createCache(othIndex && value) : null;
      }
      var array = arrays[0],
          index = -1,
          length = array ? array.length : 0,
          seen = caches[0];

      outer:
      while (++index < length) {
        value = array[index];
        if ((seen ? cacheIndexOf(seen, value) : indexOf(result, value, 0)) < 0) {
          var othIndex = othLength;
          while (--othIndex) {
            var cache = caches[othIndex];
            if ((cache ? cacheIndexOf(cache, value) : indexOf(arrays[othIndex], value, 0)) < 0) {
              continue outer;
            }
          }
          if (seen) {
            seen.push(value);
          }
          result.push(value);
        }
      }
      return result;
    });

    /**
     * Gets the last element of `array`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @returns {*} Returns the last element of `array`.
     * @example
     *
     * _.last([1, 2, 3]);
     * // => 3
     */
    function last(array) {
      var length = array ? array.length : 0;
      return length ? array[length - 1] : undefined;
    }

    /**
     * This method is like `_.indexOf` except that it iterates over elements of
     * `array` from right to left.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to search.
     * @param {*} value The value to search for.
     * @param {boolean|number} [fromIndex=array.length-1] The index to search from
     *  or `true` to perform a binary search on a sorted array.
     * @returns {number} Returns the index of the matched value, else `-1`.
     * @example
     *
     * _.lastIndexOf([1, 2, 1, 2], 2);
     * // => 3
     *
     * // using `fromIndex`
     * _.lastIndexOf([1, 2, 1, 2], 2, 2);
     * // => 1
     *
     * // performing a binary search
     * _.lastIndexOf([1, 1, 2, 2], 2, true);
     * // => 3
     */
    function lastIndexOf(array, value, fromIndex) {
      var length = array ? array.length : 0;
      if (!length) {
        return -1;
      }
      var index = length;
      if (typeof fromIndex == 'number') {
        index = (fromIndex < 0 ? nativeMax(length + fromIndex, 0) : nativeMin(fromIndex || 0, length - 1)) + 1;
      } else if (fromIndex) {
        index = binaryIndex(array, value, true) - 1;
        var other = array[index];
        if (value === value ? (value === other) : (other !== other)) {
          return index;
        }
        return -1;
      }
      if (value !== value) {
        return indexOfNaN(array, index, true);
      }
      while (index--) {
        if (array[index] === value) {
          return index;
        }
      }
      return -1;
    }

    /**
     * Removes all provided values from `array` using
     * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * **Note:** Unlike `_.without`, this method mutates `array`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to modify.
     * @param {...*} [values] The values to remove.
     * @returns {Array} Returns `array`.
     * @example
     *
     * var array = [1, 2, 3, 1, 2, 3];
     *
     * _.pull(array, 2, 3);
     * console.log(array);
     * // => [1, 1]
     */
    function pull() {
      var args = arguments,
          array = args[0];

      if (!(array && array.length)) {
        return array;
      }
      var index = 0,
          indexOf = getIndexOf(),
          length = args.length;

      while (++index < length) {
        var fromIndex = 0,
            value = args[index];

        while ((fromIndex = indexOf(array, value, fromIndex)) > -1) {
          splice.call(array, fromIndex, 1);
        }
      }
      return array;
    }

    /**
     * Removes elements from `array` corresponding to the given indexes and returns
     * an array of the removed elements. Indexes may be specified as an array of
     * indexes or as individual arguments.
     *
     * **Note:** Unlike `_.at`, this method mutates `array`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to modify.
     * @param {...(number|number[])} [indexes] The indexes of elements to remove,
     *  specified as individual indexes or arrays of indexes.
     * @returns {Array} Returns the new array of removed elements.
     * @example
     *
     * var array = [5, 10, 15, 20];
     * var evens = _.pullAt(array, 1, 3);
     *
     * console.log(array);
     * // => [5, 15]
     *
     * console.log(evens);
     * // => [10, 20]
     */
    var pullAt = restParam(function(array, indexes) {
      indexes = baseFlatten(indexes);

      var result = baseAt(array, indexes);
      basePullAt(array, indexes.sort(baseCompareAscending));
      return result;
    });

    /**
     * Removes all elements from `array` that `predicate` returns truthy for
     * and returns an array of the removed elements. The predicate is bound to
     * `thisArg` and invoked with three arguments: (value, index, array).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * **Note:** Unlike `_.filter`, this method mutates `array`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to modify.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {Array} Returns the new array of removed elements.
     * @example
     *
     * var array = [1, 2, 3, 4];
     * var evens = _.remove(array, function(n) {
     *   return n % 2 == 0;
     * });
     *
     * console.log(array);
     * // => [1, 3]
     *
     * console.log(evens);
     * // => [2, 4]
     */
    function remove(array, predicate, thisArg) {
      var result = [];
      if (!(array && array.length)) {
        return result;
      }
      var index = -1,
          indexes = [],
          length = array.length;

      predicate = getCallback(predicate, thisArg, 3);
      while (++index < length) {
        var value = array[index];
        if (predicate(value, index, array)) {
          result.push(value);
          indexes.push(index);
        }
      }
      basePullAt(array, indexes);
      return result;
    }

    /**
     * Gets all but the first element of `array`.
     *
     * @static
     * @memberOf _
     * @alias tail
     * @category Array
     * @param {Array} array The array to query.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.rest([1, 2, 3]);
     * // => [2, 3]
     */
    function rest(array) {
      return drop(array, 1);
    }

    /**
     * Creates a slice of `array` from `start` up to, but not including, `end`.
     *
     * **Note:** This method is used instead of `Array#slice` to support node
     * lists in IE < 9 and to ensure dense arrays are returned.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to slice.
     * @param {number} [start=0] The start position.
     * @param {number} [end=array.length] The end position.
     * @returns {Array} Returns the slice of `array`.
     */
    function slice(array, start, end) {
      var length = array ? array.length : 0;
      if (!length) {
        return [];
      }
      if (end && typeof end != 'number' && isIterateeCall(array, start, end)) {
        start = 0;
        end = length;
      }
      return baseSlice(array, start, end);
    }

    /**
     * Uses a binary search to determine the lowest index at which `value` should
     * be inserted into `array` in order to maintain its sort order. If an iteratee
     * function is provided it is invoked for `value` and each element of `array`
     * to compute their sort ranking. The iteratee is bound to `thisArg` and
     * invoked with one argument; (value).
     *
     * If a property name is provided for `iteratee` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `iteratee` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     * @example
     *
     * _.sortedIndex([30, 50], 40);
     * // => 1
     *
     * _.sortedIndex([4, 4, 5, 5], 5);
     * // => 2
     *
     * var dict = { 'data': { 'thirty': 30, 'forty': 40, 'fifty': 50 } };
     *
     * // using an iteratee function
     * _.sortedIndex(['thirty', 'fifty'], 'forty', function(word) {
     *   return this.data[word];
     * }, dict);
     * // => 1
     *
     * // using the `_.property` callback shorthand
     * _.sortedIndex([{ 'x': 30 }, { 'x': 50 }], { 'x': 40 }, 'x');
     * // => 1
     */
    var sortedIndex = createSortedIndex();

    /**
     * This method is like `_.sortedIndex` except that it returns the highest
     * index at which `value` should be inserted into `array` in order to
     * maintain its sort order.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The sorted array to inspect.
     * @param {*} value The value to evaluate.
     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {number} Returns the index at which `value` should be inserted
     *  into `array`.
     * @example
     *
     * _.sortedLastIndex([4, 4, 5, 5], 5);
     * // => 4
     */
    var sortedLastIndex = createSortedIndex(true);

    /**
     * Creates a slice of `array` with `n` elements taken from the beginning.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to take.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.take([1, 2, 3]);
     * // => [1]
     *
     * _.take([1, 2, 3], 2);
     * // => [1, 2]
     *
     * _.take([1, 2, 3], 5);
     * // => [1, 2, 3]
     *
     * _.take([1, 2, 3], 0);
     * // => []
     */
    function take(array, n, guard) {
      var length = array ? array.length : 0;
      if (!length) {
        return [];
      }
      if (guard ? isIterateeCall(array, n, guard) : n == null) {
        n = 1;
      }
      return baseSlice(array, 0, n < 0 ? 0 : n);
    }

    /**
     * Creates a slice of `array` with `n` elements taken from the end.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @param {number} [n=1] The number of elements to take.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.takeRight([1, 2, 3]);
     * // => [3]
     *
     * _.takeRight([1, 2, 3], 2);
     * // => [2, 3]
     *
     * _.takeRight([1, 2, 3], 5);
     * // => [1, 2, 3]
     *
     * _.takeRight([1, 2, 3], 0);
     * // => []
     */
    function takeRight(array, n, guard) {
      var length = array ? array.length : 0;
      if (!length) {
        return [];
      }
      if (guard ? isIterateeCall(array, n, guard) : n == null) {
        n = 1;
      }
      n = length - (+n || 0);
      return baseSlice(array, n < 0 ? 0 : n);
    }

    /**
     * Creates a slice of `array` with elements taken from the end. Elements are
     * taken until `predicate` returns falsey. The predicate is bound to `thisArg`
     * and invoked with three arguments: (value, index, array).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.takeRightWhile([1, 2, 3], function(n) {
     *   return n > 1;
     * });
     * // => [2, 3]
     *
     * var users = [
     *   { 'user': 'barney',  'active': true },
     *   { 'user': 'fred',    'active': false },
     *   { 'user': 'pebbles', 'active': false }
     * ];
     *
     * // using the `_.matches` callback shorthand
     * _.pluck(_.takeRightWhile(users, { 'user': 'pebbles', 'active': false }), 'user');
     * // => ['pebbles']
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.pluck(_.takeRightWhile(users, 'active', false), 'user');
     * // => ['fred', 'pebbles']
     *
     * // using the `_.property` callback shorthand
     * _.pluck(_.takeRightWhile(users, 'active'), 'user');
     * // => []
     */
    function takeRightWhile(array, predicate, thisArg) {
      return (array && array.length)
        ? baseWhile(array, getCallback(predicate, thisArg, 3), false, true)
        : [];
    }

    /**
     * Creates a slice of `array` with elements taken from the beginning. Elements
     * are taken until `predicate` returns falsey. The predicate is bound to
     * `thisArg` and invoked with three arguments: (value, index, array).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to query.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {Array} Returns the slice of `array`.
     * @example
     *
     * _.takeWhile([1, 2, 3], function(n) {
     *   return n < 3;
     * });
     * // => [1, 2]
     *
     * var users = [
     *   { 'user': 'barney',  'active': false },
     *   { 'user': 'fred',    'active': false},
     *   { 'user': 'pebbles', 'active': true }
     * ];
     *
     * // using the `_.matches` callback shorthand
     * _.pluck(_.takeWhile(users, { 'user': 'barney', 'active': false }), 'user');
     * // => ['barney']
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.pluck(_.takeWhile(users, 'active', false), 'user');
     * // => ['barney', 'fred']
     *
     * // using the `_.property` callback shorthand
     * _.pluck(_.takeWhile(users, 'active'), 'user');
     * // => []
     */
    function takeWhile(array, predicate, thisArg) {
      return (array && array.length)
        ? baseWhile(array, getCallback(predicate, thisArg, 3))
        : [];
    }

    /**
     * Creates an array of unique values, in order, from all of the provided arrays
     * using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @returns {Array} Returns the new array of combined values.
     * @example
     *
     * _.union([1, 2], [4, 2], [2, 1]);
     * // => [1, 2, 4]
     */
    var union = restParam(function(arrays) {
      return baseUniq(baseFlatten(arrays, false, true));
    });

    /**
     * Creates a duplicate-free version of an array, using
     * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
     * for equality comparisons, in which only the first occurence of each element
     * is kept. Providing `true` for `isSorted` performs a faster search algorithm
     * for sorted arrays. If an iteratee function is provided it is invoked for
     * each element in the array to generate the criterion by which uniqueness
     * is computed. The `iteratee` is bound to `thisArg` and invoked with three
     * arguments: (value, index, array).
     *
     * If a property name is provided for `iteratee` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `iteratee` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @alias unique
     * @category Array
     * @param {Array} array The array to inspect.
     * @param {boolean} [isSorted] Specify the array is sorted.
     * @param {Function|Object|string} [iteratee] The function invoked per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Array} Returns the new duplicate-value-free array.
     * @example
     *
     * _.uniq([2, 1, 2]);
     * // => [2, 1]
     *
     * // using `isSorted`
     * _.uniq([1, 1, 2], true);
     * // => [1, 2]
     *
     * // using an iteratee function
     * _.uniq([1, 2.5, 1.5, 2], function(n) {
     *   return this.floor(n);
     * }, Math);
     * // => [1, 2.5]
     *
     * // using the `_.property` callback shorthand
     * _.uniq([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
     * // => [{ 'x': 1 }, { 'x': 2 }]
     */
    function uniq(array, isSorted, iteratee, thisArg) {
      var length = array ? array.length : 0;
      if (!length) {
        return [];
      }
      if (isSorted != null && typeof isSorted != 'boolean') {
        thisArg = iteratee;
        iteratee = isIterateeCall(array, isSorted, thisArg) ? undefined : isSorted;
        isSorted = false;
      }
      var callback = getCallback();
      if (!(iteratee == null && callback === baseCallback)) {
        iteratee = callback(iteratee, thisArg, 3);
      }
      return (isSorted && getIndexOf() == baseIndexOf)
        ? sortedUniq(array, iteratee)
        : baseUniq(array, iteratee);
    }

    /**
     * This method is like `_.zip` except that it accepts an array of grouped
     * elements and creates an array regrouping the elements to their pre-zip
     * configuration.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array of grouped elements to process.
     * @returns {Array} Returns the new array of regrouped elements.
     * @example
     *
     * var zipped = _.zip(['fred', 'barney'], [30, 40], [true, false]);
     * // => [['fred', 30, true], ['barney', 40, false]]
     *
     * _.unzip(zipped);
     * // => [['fred', 'barney'], [30, 40], [true, false]]
     */
    function unzip(array) {
      if (!(array && array.length)) {
        return [];
      }
      var index = -1,
          length = 0;

      array = arrayFilter(array, function(group) {
        if (isArrayLike(group)) {
          length = nativeMax(group.length, length);
          return true;
        }
      });
      var result = Array(length);
      while (++index < length) {
        result[index] = arrayMap(array, baseProperty(index));
      }
      return result;
    }

    /**
     * This method is like `_.unzip` except that it accepts an iteratee to specify
     * how regrouped values should be combined. The `iteratee` is bound to `thisArg`
     * and invoked with four arguments: (accumulator, value, index, group).
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array of grouped elements to process.
     * @param {Function} [iteratee] The function to combine regrouped values.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Array} Returns the new array of regrouped elements.
     * @example
     *
     * var zipped = _.zip([1, 2], [10, 20], [100, 200]);
     * // => [[1, 10, 100], [2, 20, 200]]
     *
     * _.unzipWith(zipped, _.add);
     * // => [3, 30, 300]
     */
    function unzipWith(array, iteratee, thisArg) {
      var length = array ? array.length : 0;
      if (!length) {
        return [];
      }
      var result = unzip(array);
      if (iteratee == null) {
        return result;
      }
      iteratee = bindCallback(iteratee, thisArg, 4);
      return arrayMap(result, function(group) {
        return arrayReduce(group, iteratee, undefined, true);
      });
    }

    /**
     * Creates an array excluding all provided values using
     * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {Array} array The array to filter.
     * @param {...*} [values] The values to exclude.
     * @returns {Array} Returns the new array of filtered values.
     * @example
     *
     * _.without([1, 2, 1, 3], 1, 2);
     * // => [3]
     */
    var without = restParam(function(array, values) {
      return isArrayLike(array)
        ? baseDifference(array, values)
        : [];
    });

    /**
     * Creates an array of unique values that is the [symmetric difference](https://en.wikipedia.org/wiki/Symmetric_difference)
     * of the provided arrays.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {...Array} [arrays] The arrays to inspect.
     * @returns {Array} Returns the new array of values.
     * @example
     *
     * _.xor([1, 2], [4, 2]);
     * // => [1, 4]
     */
    function xor() {
      var index = -1,
          length = arguments.length;

      while (++index < length) {
        var array = arguments[index];
        if (isArrayLike(array)) {
          var result = result
            ? arrayPush(baseDifference(result, array), baseDifference(array, result))
            : array;
        }
      }
      return result ? baseUniq(result) : [];
    }

    /**
     * Creates an array of grouped elements, the first of which contains the first
     * elements of the given arrays, the second of which contains the second elements
     * of the given arrays, and so on.
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {...Array} [arrays] The arrays to process.
     * @returns {Array} Returns the new array of grouped elements.
     * @example
     *
     * _.zip(['fred', 'barney'], [30, 40], [true, false]);
     * // => [['fred', 30, true], ['barney', 40, false]]
     */
    var zip = restParam(unzip);

    /**
     * The inverse of `_.pairs`; this method returns an object composed from arrays
     * of property names and values. Provide either a single two dimensional array,
     * e.g. `[[key1, value1], [key2, value2]]` or two arrays, one of property names
     * and one of corresponding values.
     *
     * @static
     * @memberOf _
     * @alias object
     * @category Array
     * @param {Array} props The property names.
     * @param {Array} [values=[]] The property values.
     * @returns {Object} Returns the new object.
     * @example
     *
     * _.zipObject([['fred', 30], ['barney', 40]]);
     * // => { 'fred': 30, 'barney': 40 }
     *
     * _.zipObject(['fred', 'barney'], [30, 40]);
     * // => { 'fred': 30, 'barney': 40 }
     */
    function zipObject(props, values) {
      var index = -1,
          length = props ? props.length : 0,
          result = {};

      if (length && !values && !isArray(props[0])) {
        values = [];
      }
      while (++index < length) {
        var key = props[index];
        if (values) {
          result[key] = values[index];
        } else if (key) {
          result[key[0]] = key[1];
        }
      }
      return result;
    }

    /**
     * This method is like `_.zip` except that it accepts an iteratee to specify
     * how grouped values should be combined. The `iteratee` is bound to `thisArg`
     * and invoked with four arguments: (accumulator, value, index, group).
     *
     * @static
     * @memberOf _
     * @category Array
     * @param {...Array} [arrays] The arrays to process.
     * @param {Function} [iteratee] The function to combine grouped values.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Array} Returns the new array of grouped elements.
     * @example
     *
     * _.zipWith([1, 2], [10, 20], [100, 200], _.add);
     * // => [111, 222]
     */
    var zipWith = restParam(function(arrays) {
      var length = arrays.length,
          iteratee = length > 2 ? arrays[length - 2] : undefined,
          thisArg = length > 1 ? arrays[length - 1] : undefined;

      if (length > 2 && typeof iteratee == 'function') {
        length -= 2;
      } else {
        iteratee = (length > 1 && typeof thisArg == 'function') ? (--length, thisArg) : undefined;
        thisArg = undefined;
      }
      arrays.length = length;
      return unzipWith(arrays, iteratee, thisArg);
    });

    /*------------------------------------------------------------------------*/

    /**
     * Creates a `lodash` object that wraps `value` with explicit method
     * chaining enabled.
     *
     * @static
     * @memberOf _
     * @category Chain
     * @param {*} value The value to wrap.
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'age': 36 },
     *   { 'user': 'fred',    'age': 40 },
     *   { 'user': 'pebbles', 'age': 1 }
     * ];
     *
     * var youngest = _.chain(users)
     *   .sortBy('age')
     *   .map(function(chr) {
     *     return chr.user + ' is ' + chr.age;
     *   })
     *   .first()
     *   .value();
     * // => 'pebbles is 1'
     */
    function chain(value) {
      var result = lodash(value);
      result.__chain__ = true;
      return result;
    }

    /**
     * This method invokes `interceptor` and returns `value`. The interceptor is
     * bound to `thisArg` and invoked with one argument; (value). The purpose of
     * this method is to "tap into" a method chain in order to perform operations
     * on intermediate results within the chain.
     *
     * @static
     * @memberOf _
     * @category Chain
     * @param {*} value The value to provide to `interceptor`.
     * @param {Function} interceptor The function to invoke.
     * @param {*} [thisArg] The `this` binding of `interceptor`.
     * @returns {*} Returns `value`.
     * @example
     *
     * _([1, 2, 3])
     *  .tap(function(array) {
     *    array.pop();
     *  })
     *  .reverse()
     *  .value();
     * // => [2, 1]
     */
    function tap(value, interceptor, thisArg) {
      interceptor.call(thisArg, value);
      return value;
    }

    /**
     * This method is like `_.tap` except that it returns the result of `interceptor`.
     *
     * @static
     * @memberOf _
     * @category Chain
     * @param {*} value The value to provide to `interceptor`.
     * @param {Function} interceptor The function to invoke.
     * @param {*} [thisArg] The `this` binding of `interceptor`.
     * @returns {*} Returns the result of `interceptor`.
     * @example
     *
     * _('  abc  ')
     *  .chain()
     *  .trim()
     *  .thru(function(value) {
     *    return [value];
     *  })
     *  .value();
     * // => ['abc']
     */
    function thru(value, interceptor, thisArg) {
      return interceptor.call(thisArg, value);
    }

    /**
     * Enables explicit method chaining on the wrapper object.
     *
     * @name chain
     * @memberOf _
     * @category Chain
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36 },
     *   { 'user': 'fred',   'age': 40 }
     * ];
     *
     * // without explicit chaining
     * _(users).first();
     * // => { 'user': 'barney', 'age': 36 }
     *
     * // with explicit chaining
     * _(users).chain()
     *   .first()
     *   .pick('user')
     *   .value();
     * // => { 'user': 'barney' }
     */
    function wrapperChain() {
      return chain(this);
    }

    /**
     * Executes the chained sequence and returns the wrapped result.
     *
     * @name commit
     * @memberOf _
     * @category Chain
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var array = [1, 2];
     * var wrapped = _(array).push(3);
     *
     * console.log(array);
     * // => [1, 2]
     *
     * wrapped = wrapped.commit();
     * console.log(array);
     * // => [1, 2, 3]
     *
     * wrapped.last();
     * // => 3
     *
     * console.log(array);
     * // => [1, 2, 3]
     */
    function wrapperCommit() {
      return new LodashWrapper(this.value(), this.__chain__);
    }

    /**
     * Creates a new array joining a wrapped array with any additional arrays
     * and/or values.
     *
     * @name concat
     * @memberOf _
     * @category Chain
     * @param {...*} [values] The values to concatenate.
     * @returns {Array} Returns the new concatenated array.
     * @example
     *
     * var array = [1];
     * var wrapped = _(array).concat(2, [3], [[4]]);
     *
     * console.log(wrapped.value());
     * // => [1, 2, 3, [4]]
     *
     * console.log(array);
     * // => [1]
     */
    var wrapperConcat = restParam(function(values) {
      values = baseFlatten(values);
      return this.thru(function(array) {
        return arrayConcat(isArray(array) ? array : [toObject(array)], values);
      });
    });

    /**
     * Creates a clone of the chained sequence planting `value` as the wrapped value.
     *
     * @name plant
     * @memberOf _
     * @category Chain
     * @returns {Object} Returns the new `lodash` wrapper instance.
     * @example
     *
     * var array = [1, 2];
     * var wrapped = _(array).map(function(value) {
     *   return Math.pow(value, 2);
     * });
     *
     * var other = [3, 4];
     * var otherWrapped = wrapped.plant(other);
     *
     * otherWrapped.value();
     * // => [9, 16]
     *
     * wrapped.value();
     * // => [1, 4]
     */
    function wrapperPlant(value) {
      var result,
          parent = this;

      while (parent instanceof baseLodash) {
        var clone = wrapperClone(parent);
        if (result) {
          previous.__wrapped__ = clone;
        } else {
          result = clone;
        }
        var previous = clone;
        parent = parent.__wrapped__;
      }
      previous.__wrapped__ = value;
      return result;
    }

    /**
     * Reverses the wrapped array so the first element becomes the last, the
     * second element becomes the second to last, and so on.
     *
     * **Note:** This method mutates the wrapped array.
     *
     * @name reverse
     * @memberOf _
     * @category Chain
     * @returns {Object} Returns the new reversed `lodash` wrapper instance.
     * @example
     *
     * var array = [1, 2, 3];
     *
     * _(array).reverse().value()
     * // => [3, 2, 1]
     *
     * console.log(array);
     * // => [3, 2, 1]
     */
    function wrapperReverse() {
      var value = this.__wrapped__;

      var interceptor = function(value) {
        return (wrapped && wrapped.__dir__ < 0) ? value : value.reverse();
      };
      if (value instanceof LazyWrapper) {
        var wrapped = value;
        if (this.__actions__.length) {
          wrapped = new LazyWrapper(this);
        }
        wrapped = wrapped.reverse();
        wrapped.__actions__.push({ 'func': thru, 'args': [interceptor], 'thisArg': undefined });
        return new LodashWrapper(wrapped, this.__chain__);
      }
      return this.thru(interceptor);
    }

    /**
     * Produces the result of coercing the unwrapped value to a string.
     *
     * @name toString
     * @memberOf _
     * @category Chain
     * @returns {string} Returns the coerced string value.
     * @example
     *
     * _([1, 2, 3]).toString();
     * // => '1,2,3'
     */
    function wrapperToString() {
      return (this.value() + '');
    }

    /**
     * Executes the chained sequence to extract the unwrapped value.
     *
     * @name value
     * @memberOf _
     * @alias run, toJSON, valueOf
     * @category Chain
     * @returns {*} Returns the resolved unwrapped value.
     * @example
     *
     * _([1, 2, 3]).value();
     * // => [1, 2, 3]
     */
    function wrapperValue() {
      return baseWrapperValue(this.__wrapped__, this.__actions__);
    }

    /*------------------------------------------------------------------------*/

    /**
     * Creates an array of elements corresponding to the given keys, or indexes,
     * of `collection`. Keys may be specified as individual arguments or as arrays
     * of keys.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {...(number|number[]|string|string[])} [props] The property names
     *  or indexes of elements to pick, specified individually or in arrays.
     * @returns {Array} Returns the new array of picked elements.
     * @example
     *
     * _.at(['a', 'b', 'c'], [0, 2]);
     * // => ['a', 'c']
     *
     * _.at(['barney', 'fred', 'pebbles'], 0, 2);
     * // => ['barney', 'pebbles']
     */
    var at = restParam(function(collection, props) {
      return baseAt(collection, baseFlatten(props));
    });

    /**
     * Creates an object composed of keys generated from the results of running
     * each element of `collection` through `iteratee`. The corresponding value
     * of each key is the number of times the key was returned by `iteratee`.
     * The `iteratee` is bound to `thisArg` and invoked with three arguments:
     * (value, index|key, collection).
     *
     * If a property name is provided for `iteratee` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `iteratee` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Object} Returns the composed aggregate object.
     * @example
     *
     * _.countBy([4.3, 6.1, 6.4], function(n) {
     *   return Math.floor(n);
     * });
     * // => { '4': 1, '6': 2 }
     *
     * _.countBy([4.3, 6.1, 6.4], function(n) {
     *   return this.floor(n);
     * }, Math);
     * // => { '4': 1, '6': 2 }
     *
     * _.countBy(['one', 'two', 'three'], 'length');
     * // => { '3': 2, '5': 1 }
     */
    var countBy = createAggregator(function(result, value, key) {
      hasOwnProperty.call(result, key) ? ++result[key] : (result[key] = 1);
    });

    /**
     * Checks if `predicate` returns truthy for **all** elements of `collection`.
     * The predicate is bound to `thisArg` and invoked with three arguments:
     * (value, index|key, collection).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @alias all
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {boolean} Returns `true` if all elements pass the predicate check,
     *  else `false`.
     * @example
     *
     * _.every([true, 1, null, 'yes'], Boolean);
     * // => false
     *
     * var users = [
     *   { 'user': 'barney', 'active': false },
     *   { 'user': 'fred',   'active': false }
     * ];
     *
     * // using the `_.matches` callback shorthand
     * _.every(users, { 'user': 'barney', 'active': false });
     * // => false
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.every(users, 'active', false);
     * // => true
     *
     * // using the `_.property` callback shorthand
     * _.every(users, 'active');
     * // => false
     */
    function every(collection, predicate, thisArg) {
      var func = isArray(collection) ? arrayEvery : baseEvery;
      if (thisArg && isIterateeCall(collection, predicate, thisArg)) {
        predicate = undefined;
      }
      if (typeof predicate != 'function' || thisArg !== undefined) {
        predicate = getCallback(predicate, thisArg, 3);
      }
      return func(collection, predicate);
    }

    /**
     * Iterates over elements of `collection`, returning an array of all elements
     * `predicate` returns truthy for. The predicate is bound to `thisArg` and
     * invoked with three arguments: (value, index|key, collection).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @alias select
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {Array} Returns the new filtered array.
     * @example
     *
     * _.filter([4, 5, 6], function(n) {
     *   return n % 2 == 0;
     * });
     * // => [4, 6]
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': true },
     *   { 'user': 'fred',   'age': 40, 'active': false }
     * ];
     *
     * // using the `_.matches` callback shorthand
     * _.pluck(_.filter(users, { 'age': 36, 'active': true }), 'user');
     * // => ['barney']
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.pluck(_.filter(users, 'active', false), 'user');
     * // => ['fred']
     *
     * // using the `_.property` callback shorthand
     * _.pluck(_.filter(users, 'active'), 'user');
     * // => ['barney']
     */
    function filter(collection, predicate, thisArg) {
      var func = isArray(collection) ? arrayFilter : baseFilter;
      predicate = getCallback(predicate, thisArg, 3);
      return func(collection, predicate);
    }

    /**
     * Iterates over elements of `collection`, returning the first element
     * `predicate` returns truthy for. The predicate is bound to `thisArg` and
     * invoked with three arguments: (value, index|key, collection).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @alias detect
     * @category Collection
     * @param {Array|Object|string} collection The collection to search.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {*} Returns the matched element, else `undefined`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney',  'age': 36, 'active': true },
     *   { 'user': 'fred',    'age': 40, 'active': false },
     *   { 'user': 'pebbles', 'age': 1,  'active': true }
     * ];
     *
     * _.result(_.find(users, function(chr) {
     *   return chr.age < 40;
     * }), 'user');
     * // => 'barney'
     *
     * // using the `_.matches` callback shorthand
     * _.result(_.find(users, { 'age': 1, 'active': true }), 'user');
     * // => 'pebbles'
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.result(_.find(users, 'active', false), 'user');
     * // => 'fred'
     *
     * // using the `_.property` callback shorthand
     * _.result(_.find(users, 'active'), 'user');
     * // => 'barney'
     */
    var find = createFind(baseEach);

    /**
     * This method is like `_.find` except that it iterates over elements of
     * `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to search.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {*} Returns the matched element, else `undefined`.
     * @example
     *
     * _.findLast([1, 2, 3, 4], function(n) {
     *   return n % 2 == 1;
     * });
     * // => 3
     */
    var findLast = createFind(baseEachRight, true);

    /**
     * Performs a deep comparison between each element in `collection` and the
     * source object, returning the first element that has equivalent property
     * values.
     *
     * **Note:** This method supports comparing arrays, booleans, `Date` objects,
     * numbers, `Object` objects, regexes, and strings. Objects are compared by
     * their own, not inherited, enumerable properties. For comparing a single
     * own or inherited property value see `_.matchesProperty`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to search.
     * @param {Object} source The object of property values to match.
     * @returns {*} Returns the matched element, else `undefined`.
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': true },
     *   { 'user': 'fred',   'age': 40, 'active': false }
     * ];
     *
     * _.result(_.findWhere(users, { 'age': 36, 'active': true }), 'user');
     * // => 'barney'
     *
     * _.result(_.findWhere(users, { 'age': 40, 'active': false }), 'user');
     * // => 'fred'
     */
    function findWhere(collection, source) {
      return find(collection, baseMatches(source));
    }

    /**
     * Iterates over elements of `collection` invoking `iteratee` for each element.
     * The `iteratee` is bound to `thisArg` and invoked with three arguments:
     * (value, index|key, collection). Iteratee functions may exit iteration early
     * by explicitly returning `false`.
     *
     * **Note:** As with other "Collections" methods, objects with a "length" property
     * are iterated like arrays. To avoid this behavior `_.forIn` or `_.forOwn`
     * may be used for object iteration.
     *
     * @static
     * @memberOf _
     * @alias each
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Array|Object|string} Returns `collection`.
     * @example
     *
     * _([1, 2]).forEach(function(n) {
     *   console.log(n);
     * }).value();
     * // => logs each value from left to right and returns the array
     *
     * _.forEach({ 'a': 1, 'b': 2 }, function(n, key) {
     *   console.log(n, key);
     * });
     * // => logs each value-key pair and returns the object (iteration order is not guaranteed)
     */
    var forEach = createForEach(arrayEach, baseEach);

    /**
     * This method is like `_.forEach` except that it iterates over elements of
     * `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @alias eachRight
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Array|Object|string} Returns `collection`.
     * @example
     *
     * _([1, 2]).forEachRight(function(n) {
     *   console.log(n);
     * }).value();
     * // => logs each value from right to left and returns the array
     */
    var forEachRight = createForEach(arrayEachRight, baseEachRight);

    /**
     * Creates an object composed of keys generated from the results of running
     * each element of `collection` through `iteratee`. The corresponding value
     * of each key is an array of the elements responsible for generating the key.
     * The `iteratee` is bound to `thisArg` and invoked with three arguments:
     * (value, index|key, collection).
     *
     * If a property name is provided for `iteratee` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `iteratee` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Object} Returns the composed aggregate object.
     * @example
     *
     * _.groupBy([4.2, 6.1, 6.4], function(n) {
     *   return Math.floor(n);
     * });
     * // => { '4': [4.2], '6': [6.1, 6.4] }
     *
     * _.groupBy([4.2, 6.1, 6.4], function(n) {
     *   return this.floor(n);
     * }, Math);
     * // => { '4': [4.2], '6': [6.1, 6.4] }
     *
     * // using the `_.property` callback shorthand
     * _.groupBy(['one', 'two', 'three'], 'length');
     * // => { '3': ['one', 'two'], '5': ['three'] }
     */
    var groupBy = createAggregator(function(result, value, key) {
      if (hasOwnProperty.call(result, key)) {
        result[key].push(value);
      } else {
        result[key] = [value];
      }
    });

    /**
     * Checks if `value` is in `collection` using
     * [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
     * for equality comparisons. If `fromIndex` is negative, it is used as the offset
     * from the end of `collection`.
     *
     * @static
     * @memberOf _
     * @alias contains, include
     * @category Collection
     * @param {Array|Object|string} collection The collection to search.
     * @param {*} target The value to search for.
     * @param {number} [fromIndex=0] The index to search from.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.reduce`.
     * @returns {boolean} Returns `true` if a matching element is found, else `false`.
     * @example
     *
     * _.includes([1, 2, 3], 1);
     * // => true
     *
     * _.includes([1, 2, 3], 1, 2);
     * // => false
     *
     * _.includes({ 'user': 'fred', 'age': 40 }, 'fred');
     * // => true
     *
     * _.includes('pebbles', 'eb');
     * // => true
     */
    function includes(collection, target, fromIndex, guard) {
      var length = collection ? getLength(collection) : 0;
      if (!isLength(length)) {
        collection = values(collection);
        length = collection.length;
      }
      if (typeof fromIndex != 'number' || (guard && isIterateeCall(target, fromIndex, guard))) {
        fromIndex = 0;
      } else {
        fromIndex = fromIndex < 0 ? nativeMax(length + fromIndex, 0) : (fromIndex || 0);
      }
      return (typeof collection == 'string' || !isArray(collection) && isString(collection))
        ? (fromIndex <= length && collection.indexOf(target, fromIndex) > -1)
        : (!!length && getIndexOf(collection, target, fromIndex) > -1);
    }

    /**
     * Creates an object composed of keys generated from the results of running
     * each element of `collection` through `iteratee`. The corresponding value
     * of each key is the last element responsible for generating the key. The
     * iteratee function is bound to `thisArg` and invoked with three arguments:
     * (value, index|key, collection).
     *
     * If a property name is provided for `iteratee` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `iteratee` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Object} Returns the composed aggregate object.
     * @example
     *
     * var keyData = [
     *   { 'dir': 'left', 'code': 97 },
     *   { 'dir': 'right', 'code': 100 }
     * ];
     *
     * _.indexBy(keyData, 'dir');
     * // => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
     *
     * _.indexBy(keyData, function(object) {
     *   return String.fromCharCode(object.code);
     * });
     * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
     *
     * _.indexBy(keyData, function(object) {
     *   return this.fromCharCode(object.code);
     * }, String);
     * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
     */
    var indexBy = createAggregator(function(result, value, key) {
      result[key] = value;
    });

    /**
     * Invokes the method at `path` of each element in `collection`, returning
     * an array of the results of each invoked method. Any additional arguments
     * are provided to each invoked method. If `methodName` is a function it is
     * invoked for, and `this` bound to, each element in `collection`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Array|Function|string} path The path of the method to invoke or
     *  the function invoked per iteration.
     * @param {...*} [args] The arguments to invoke the method with.
     * @returns {Array} Returns the array of results.
     * @example
     *
     * _.invoke([[5, 1, 7], [3, 2, 1]], 'sort');
     * // => [[1, 5, 7], [1, 2, 3]]
     *
     * _.invoke([123, 456], String.prototype.split, '');
     * // => [['1', '2', '3'], ['4', '5', '6']]
     */
    var invoke = restParam(function(collection, path, args) {
      var index = -1,
          isFunc = typeof path == 'function',
          isProp = isKey(path),
          result = isArrayLike(collection) ? Array(collection.length) : [];

      baseEach(collection, function(value) {
        var func = isFunc ? path : ((isProp && value != null) ? value[path] : undefined);
        result[++index] = func ? func.apply(value, args) : invokePath(value, path, args);
      });
      return result;
    });

    /**
     * Creates an array of values by running each element in `collection` through
     * `iteratee`. The `iteratee` is bound to `thisArg` and invoked with three
     * arguments: (value, index|key, collection).
     *
     * If a property name is provided for `iteratee` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `iteratee` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * Many lodash methods are guarded to work as iteratees for methods like
     * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
     *
     * The guarded methods are:
     * `ary`, `callback`, `chunk`, `clone`, `create`, `curry`, `curryRight`,
     * `drop`, `dropRight`, `every`, `fill`, `flatten`, `invert`, `max`, `min`,
     * `parseInt`, `slice`, `sortBy`, `take`, `takeRight`, `template`, `trim`,
     * `trimLeft`, `trimRight`, `trunc`, `random`, `range`, `sample`, `some`,
     * `sum`, `uniq`, and `words`
     *
     * @static
     * @memberOf _
     * @alias collect
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Array} Returns the new mapped array.
     * @example
     *
     * function timesThree(n) {
     *   return n * 3;
     * }
     *
     * _.map([1, 2], timesThree);
     * // => [3, 6]
     *
     * _.map({ 'a': 1, 'b': 2 }, timesThree);
     * // => [3, 6] (iteration order is not guaranteed)
     *
     * var users = [
     *   { 'user': 'barney' },
     *   { 'user': 'fred' }
     * ];
     *
     * // using the `_.property` callback shorthand
     * _.map(users, 'user');
     * // => ['barney', 'fred']
     */
    function map(collection, iteratee, thisArg) {
      var func = isArray(collection) ? arrayMap : baseMap;
      iteratee = getCallback(iteratee, thisArg, 3);
      return func(collection, iteratee);
    }

    /**
     * Creates an array of elements split into two groups, the first of which
     * contains elements `predicate` returns truthy for, while the second of which
     * contains elements `predicate` returns falsey for. The predicate is bound
     * to `thisArg` and invoked with three arguments: (value, index|key, collection).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {Array} Returns the array of grouped elements.
     * @example
     *
     * _.partition([1, 2, 3], function(n) {
     *   return n % 2;
     * });
     * // => [[1, 3], [2]]
     *
     * _.partition([1.2, 2.3, 3.4], function(n) {
     *   return this.floor(n) % 2;
     * }, Math);
     * // => [[1.2, 3.4], [2.3]]
     *
     * var users = [
     *   { 'user': 'barney',  'age': 36, 'active': false },
     *   { 'user': 'fred',    'age': 40, 'active': true },
     *   { 'user': 'pebbles', 'age': 1,  'active': false }
     * ];
     *
     * var mapper = function(array) {
     *   return _.pluck(array, 'user');
     * };
     *
     * // using the `_.matches` callback shorthand
     * _.map(_.partition(users, { 'age': 1, 'active': false }), mapper);
     * // => [['pebbles'], ['barney', 'fred']]
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.map(_.partition(users, 'active', false), mapper);
     * // => [['barney', 'pebbles'], ['fred']]
     *
     * // using the `_.property` callback shorthand
     * _.map(_.partition(users, 'active'), mapper);
     * // => [['fred'], ['barney', 'pebbles']]
     */
    var partition = createAggregator(function(result, value, key) {
      result[key ? 0 : 1].push(value);
    }, function() { return [[], []]; });

    /**
     * Gets the property value of `path` from all elements in `collection`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Array|string} path The path of the property to pluck.
     * @returns {Array} Returns the property values.
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36 },
     *   { 'user': 'fred',   'age': 40 }
     * ];
     *
     * _.pluck(users, 'user');
     * // => ['barney', 'fred']
     *
     * var userIndex = _.indexBy(users, 'user');
     * _.pluck(userIndex, 'age');
     * // => [36, 40] (iteration order is not guaranteed)
     */
    function pluck(collection, path) {
      return map(collection, property(path));
    }

    /**
     * Reduces `collection` to a value which is the accumulated result of running
     * each element in `collection` through `iteratee`, where each successive
     * invocation is supplied the return value of the previous. If `accumulator`
     * is not provided the first element of `collection` is used as the initial
     * value. The `iteratee` is bound to `thisArg` and invoked with four arguments:
     * (accumulator, value, index|key, collection).
     *
     * Many lodash methods are guarded to work as iteratees for methods like
     * `_.reduce`, `_.reduceRight`, and `_.transform`.
     *
     * The guarded methods are:
     * `assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `sortByAll`,
     * and `sortByOrder`
     *
     * @static
     * @memberOf _
     * @alias foldl, inject
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [accumulator] The initial value.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {*} Returns the accumulated value.
     * @example
     *
     * _.reduce([1, 2], function(total, n) {
     *   return total + n;
     * });
     * // => 3
     *
     * _.reduce({ 'a': 1, 'b': 2 }, function(result, n, key) {
     *   result[key] = n * 3;
     *   return result;
     * }, {});
     * // => { 'a': 3, 'b': 6 } (iteration order is not guaranteed)
     */
    var reduce = createReduce(arrayReduce, baseEach);

    /**
     * This method is like `_.reduce` except that it iterates over elements of
     * `collection` from right to left.
     *
     * @static
     * @memberOf _
     * @alias foldr
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [accumulator] The initial value.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {*} Returns the accumulated value.
     * @example
     *
     * var array = [[0, 1], [2, 3], [4, 5]];
     *
     * _.reduceRight(array, function(flattened, other) {
     *   return flattened.concat(other);
     * }, []);
     * // => [4, 5, 2, 3, 0, 1]
     */
    var reduceRight = createReduce(arrayReduceRight, baseEachRight);

    /**
     * The opposite of `_.filter`; this method returns the elements of `collection`
     * that `predicate` does **not** return truthy for.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {Array} Returns the new filtered array.
     * @example
     *
     * _.reject([1, 2, 3, 4], function(n) {
     *   return n % 2 == 0;
     * });
     * // => [1, 3]
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': false },
     *   { 'user': 'fred',   'age': 40, 'active': true }
     * ];
     *
     * // using the `_.matches` callback shorthand
     * _.pluck(_.reject(users, { 'age': 40, 'active': true }), 'user');
     * // => ['barney']
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.pluck(_.reject(users, 'active', false), 'user');
     * // => ['fred']
     *
     * // using the `_.property` callback shorthand
     * _.pluck(_.reject(users, 'active'), 'user');
     * // => ['barney']
     */
    function reject(collection, predicate, thisArg) {
      var func = isArray(collection) ? arrayFilter : baseFilter;
      predicate = getCallback(predicate, thisArg, 3);
      return func(collection, function(value, index, collection) {
        return !predicate(value, index, collection);
      });
    }

    /**
     * Gets a random element or `n` random elements from a collection.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to sample.
     * @param {number} [n] The number of elements to sample.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {*} Returns the random sample(s).
     * @example
     *
     * _.sample([1, 2, 3, 4]);
     * // => 2
     *
     * _.sample([1, 2, 3, 4], 2);
     * // => [3, 1]
     */
    function sample(collection, n, guard) {
      if (guard ? isIterateeCall(collection, n, guard) : n == null) {
        collection = toIterable(collection);
        var length = collection.length;
        return length > 0 ? collection[baseRandom(0, length - 1)] : undefined;
      }
      var index = -1,
          result = toArray(collection),
          length = result.length,
          lastIndex = length - 1;

      n = nativeMin(n < 0 ? 0 : (+n || 0), length);
      while (++index < n) {
        var rand = baseRandom(index, lastIndex),
            value = result[rand];

        result[rand] = result[index];
        result[index] = value;
      }
      result.length = n;
      return result;
    }

    /**
     * Creates an array of shuffled values, using a version of the
     * [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to shuffle.
     * @returns {Array} Returns the new shuffled array.
     * @example
     *
     * _.shuffle([1, 2, 3, 4]);
     * // => [4, 1, 3, 2]
     */
    function shuffle(collection) {
      return sample(collection, POSITIVE_INFINITY);
    }

    /**
     * Gets the size of `collection` by returning its length for array-like
     * values or the number of own enumerable properties for objects.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to inspect.
     * @returns {number} Returns the size of `collection`.
     * @example
     *
     * _.size([1, 2, 3]);
     * // => 3
     *
     * _.size({ 'a': 1, 'b': 2 });
     * // => 2
     *
     * _.size('pebbles');
     * // => 7
     */
    function size(collection) {
      var length = collection ? getLength(collection) : 0;
      return isLength(length) ? length : keys(collection).length;
    }

    /**
     * Checks if `predicate` returns truthy for **any** element of `collection`.
     * The function returns as soon as it finds a passing value and does not iterate
     * over the entire collection. The predicate is bound to `thisArg` and invoked
     * with three arguments: (value, index|key, collection).
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @alias any
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {boolean} Returns `true` if any element passes the predicate check,
     *  else `false`.
     * @example
     *
     * _.some([null, 0, 'yes', false], Boolean);
     * // => true
     *
     * var users = [
     *   { 'user': 'barney', 'active': true },
     *   { 'user': 'fred',   'active': false }
     * ];
     *
     * // using the `_.matches` callback shorthand
     * _.some(users, { 'user': 'barney', 'active': false });
     * // => false
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.some(users, 'active', false);
     * // => true
     *
     * // using the `_.property` callback shorthand
     * _.some(users, 'active');
     * // => true
     */
    function some(collection, predicate, thisArg) {
      var func = isArray(collection) ? arraySome : baseSome;
      if (thisArg && isIterateeCall(collection, predicate, thisArg)) {
        predicate = undefined;
      }
      if (typeof predicate != 'function' || thisArg !== undefined) {
        predicate = getCallback(predicate, thisArg, 3);
      }
      return func(collection, predicate);
    }

    /**
     * Creates an array of elements, sorted in ascending order by the results of
     * running each element in a collection through `iteratee`. This method performs
     * a stable sort, that is, it preserves the original sort order of equal elements.
     * The `iteratee` is bound to `thisArg` and invoked with three arguments:
     * (value, index|key, collection).
     *
     * If a property name is provided for `iteratee` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `iteratee` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Array} Returns the new sorted array.
     * @example
     *
     * _.sortBy([1, 2, 3], function(n) {
     *   return Math.sin(n);
     * });
     * // => [3, 1, 2]
     *
     * _.sortBy([1, 2, 3], function(n) {
     *   return this.sin(n);
     * }, Math);
     * // => [3, 1, 2]
     *
     * var users = [
     *   { 'user': 'fred' },
     *   { 'user': 'pebbles' },
     *   { 'user': 'barney' }
     * ];
     *
     * // using the `_.property` callback shorthand
     * _.pluck(_.sortBy(users, 'user'), 'user');
     * // => ['barney', 'fred', 'pebbles']
     */
    function sortBy(collection, iteratee, thisArg) {
      if (collection == null) {
        return [];
      }
      if (thisArg && isIterateeCall(collection, iteratee, thisArg)) {
        iteratee = undefined;
      }
      var index = -1;
      iteratee = getCallback(iteratee, thisArg, 3);

      var result = baseMap(collection, function(value, key, collection) {
        return { 'criteria': iteratee(value, key, collection), 'index': ++index, 'value': value };
      });
      return baseSortBy(result, compareAscending);
    }

    /**
     * This method is like `_.sortBy` except that it can sort by multiple iteratees
     * or property names.
     *
     * If a property name is provided for an iteratee the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If an object is provided for an iteratee the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {...(Function|Function[]|Object|Object[]|string|string[])} iteratees
     *  The iteratees to sort by, specified as individual values or arrays of values.
     * @returns {Array} Returns the new sorted array.
     * @example
     *
     * var users = [
     *   { 'user': 'fred',   'age': 48 },
     *   { 'user': 'barney', 'age': 36 },
     *   { 'user': 'fred',   'age': 42 },
     *   { 'user': 'barney', 'age': 34 }
     * ];
     *
     * _.map(_.sortByAll(users, ['user', 'age']), _.values);
     * // => [['barney', 34], ['barney', 36], ['fred', 42], ['fred', 48]]
     *
     * _.map(_.sortByAll(users, 'user', function(chr) {
     *   return Math.floor(chr.age / 10);
     * }), _.values);
     * // => [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 42]]
     */
    var sortByAll = restParam(function(collection, iteratees) {
      if (collection == null) {
        return [];
      }
      var guard = iteratees[2];
      if (guard && isIterateeCall(iteratees[0], iteratees[1], guard)) {
        iteratees.length = 1;
      }
      return baseSortByOrder(collection, baseFlatten(iteratees), []);
    });

    /**
     * This method is like `_.sortByAll` except that it allows specifying the
     * sort orders of the iteratees to sort by. If `orders` is unspecified, all
     * values are sorted in ascending order. Otherwise, a value is sorted in
     * ascending order if its corresponding order is "asc", and descending if "desc".
     *
     * If a property name is provided for an iteratee the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If an object is provided for an iteratee the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
     * @param {boolean[]} [orders] The sort orders of `iteratees`.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.reduce`.
     * @returns {Array} Returns the new sorted array.
     * @example
     *
     * var users = [
     *   { 'user': 'fred',   'age': 48 },
     *   { 'user': 'barney', 'age': 34 },
     *   { 'user': 'fred',   'age': 42 },
     *   { 'user': 'barney', 'age': 36 }
     * ];
     *
     * // sort by `user` in ascending order and by `age` in descending order
     * _.map(_.sortByOrder(users, ['user', 'age'], ['asc', 'desc']), _.values);
     * // => [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 42]]
     */
    function sortByOrder(collection, iteratees, orders, guard) {
      if (collection == null) {
        return [];
      }
      if (guard && isIterateeCall(iteratees, orders, guard)) {
        orders = undefined;
      }
      if (!isArray(iteratees)) {
        iteratees = iteratees == null ? [] : [iteratees];
      }
      if (!isArray(orders)) {
        orders = orders == null ? [] : [orders];
      }
      return baseSortByOrder(collection, iteratees, orders);
    }

    /**
     * Performs a deep comparison between each element in `collection` and the
     * source object, returning an array of all elements that have equivalent
     * property values.
     *
     * **Note:** This method supports comparing arrays, booleans, `Date` objects,
     * numbers, `Object` objects, regexes, and strings. Objects are compared by
     * their own, not inherited, enumerable properties. For comparing a single
     * own or inherited property value see `_.matchesProperty`.
     *
     * @static
     * @memberOf _
     * @category Collection
     * @param {Array|Object|string} collection The collection to search.
     * @param {Object} source The object of property values to match.
     * @returns {Array} Returns the new filtered array.
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': false, 'pets': ['hoppy'] },
     *   { 'user': 'fred',   'age': 40, 'active': true, 'pets': ['baby puss', 'dino'] }
     * ];
     *
     * _.pluck(_.where(users, { 'age': 36, 'active': false }), 'user');
     * // => ['barney']
     *
     * _.pluck(_.where(users, { 'pets': ['dino'] }), 'user');
     * // => ['fred']
     */
    function where(collection, source) {
      return filter(collection, baseMatches(source));
    }

    /*------------------------------------------------------------------------*/

    /**
     * Gets the number of milliseconds that have elapsed since the Unix epoch
     * (1 January 1970 00:00:00 UTC).
     *
     * @static
     * @memberOf _
     * @category Date
     * @example
     *
     * _.defer(function(stamp) {
     *   console.log(_.now() - stamp);
     * }, _.now());
     * // => logs the number of milliseconds it took for the deferred function to be invoked
     */
    var now = nativeNow || function() {
      return new Date().getTime();
    };

    /*------------------------------------------------------------------------*/

    /**
     * The opposite of `_.before`; this method creates a function that invokes
     * `func` once it is called `n` or more times.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {number} n The number of calls before `func` is invoked.
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new restricted function.
     * @example
     *
     * var saves = ['profile', 'settings'];
     *
     * var done = _.after(saves.length, function() {
     *   console.log('done saving!');
     * });
     *
     * _.forEach(saves, function(type) {
     *   asyncSave({ 'type': type, 'complete': done });
     * });
     * // => logs 'done saving!' after the two async saves have completed
     */
    function after(n, func) {
      if (typeof func != 'function') {
        if (typeof n == 'function') {
          var temp = n;
          n = func;
          func = temp;
        } else {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
      }
      n = nativeIsFinite(n = +n) ? n : 0;
      return function() {
        if (--n < 1) {
          return func.apply(this, arguments);
        }
      };
    }

    /**
     * Creates a function that accepts up to `n` arguments ignoring any
     * additional arguments.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to cap arguments for.
     * @param {number} [n=func.length] The arity cap.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Function} Returns the new function.
     * @example
     *
     * _.map(['6', '8', '10'], _.ary(parseInt, 1));
     * // => [6, 8, 10]
     */
    function ary(func, n, guard) {
      if (guard && isIterateeCall(func, n, guard)) {
        n = undefined;
      }
      n = (func && n == null) ? func.length : nativeMax(+n || 0, 0);
      return createWrapper(func, ARY_FLAG, undefined, undefined, undefined, undefined, n);
    }

    /**
     * Creates a function that invokes `func`, with the `this` binding and arguments
     * of the created function, while it is called less than `n` times. Subsequent
     * calls to the created function return the result of the last `func` invocation.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {number} n The number of calls at which `func` is no longer invoked.
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new restricted function.
     * @example
     *
     * jQuery('#add').on('click', _.before(5, addContactToList));
     * // => allows adding up to 4 contacts to the list
     */
    function before(n, func) {
      var result;
      if (typeof func != 'function') {
        if (typeof n == 'function') {
          var temp = n;
          n = func;
          func = temp;
        } else {
          throw new TypeError(FUNC_ERROR_TEXT);
        }
      }
      return function() {
        if (--n > 0) {
          result = func.apply(this, arguments);
        }
        if (n <= 1) {
          func = undefined;
        }
        return result;
      };
    }

    /**
     * Creates a function that invokes `func` with the `this` binding of `thisArg`
     * and prepends any additional `_.bind` arguments to those provided to the
     * bound function.
     *
     * The `_.bind.placeholder` value, which defaults to `_` in monolithic builds,
     * may be used as a placeholder for partially applied arguments.
     *
     * **Note:** Unlike native `Function#bind` this method does not set the "length"
     * property of bound functions.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to bind.
     * @param {*} thisArg The `this` binding of `func`.
     * @param {...*} [partials] The arguments to be partially applied.
     * @returns {Function} Returns the new bound function.
     * @example
     *
     * var greet = function(greeting, punctuation) {
     *   return greeting + ' ' + this.user + punctuation;
     * };
     *
     * var object = { 'user': 'fred' };
     *
     * var bound = _.bind(greet, object, 'hi');
     * bound('!');
     * // => 'hi fred!'
     *
     * // using placeholders
     * var bound = _.bind(greet, object, _, '!');
     * bound('hi');
     * // => 'hi fred!'
     */
    var bind = restParam(function(func, thisArg, partials) {
      var bitmask = BIND_FLAG;
      if (partials.length) {
        var holders = replaceHolders(partials, bind.placeholder);
        bitmask |= PARTIAL_FLAG;
      }
      return createWrapper(func, bitmask, thisArg, partials, holders);
    });

    /**
     * Binds methods of an object to the object itself, overwriting the existing
     * method. Method names may be specified as individual arguments or as arrays
     * of method names. If no method names are provided all enumerable function
     * properties, own and inherited, of `object` are bound.
     *
     * **Note:** This method does not set the "length" property of bound functions.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Object} object The object to bind and assign the bound methods to.
     * @param {...(string|string[])} [methodNames] The object method names to bind,
     *  specified as individual method names or arrays of method names.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var view = {
     *   'label': 'docs',
     *   'onClick': function() {
     *     console.log('clicked ' + this.label);
     *   }
     * };
     *
     * _.bindAll(view);
     * jQuery('#docs').on('click', view.onClick);
     * // => logs 'clicked docs' when the element is clicked
     */
    var bindAll = restParam(function(object, methodNames) {
      methodNames = methodNames.length ? baseFlatten(methodNames) : functions(object);

      var index = -1,
          length = methodNames.length;

      while (++index < length) {
        var key = methodNames[index];
        object[key] = createWrapper(object[key], BIND_FLAG, object);
      }
      return object;
    });

    /**
     * Creates a function that invokes the method at `object[key]` and prepends
     * any additional `_.bindKey` arguments to those provided to the bound function.
     *
     * This method differs from `_.bind` by allowing bound functions to reference
     * methods that may be redefined or don't yet exist.
     * See [Peter Michaux's article](http://peter.michaux.ca/articles/lazy-function-definition-pattern)
     * for more details.
     *
     * The `_.bindKey.placeholder` value, which defaults to `_` in monolithic
     * builds, may be used as a placeholder for partially applied arguments.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Object} object The object the method belongs to.
     * @param {string} key The key of the method.
     * @param {...*} [partials] The arguments to be partially applied.
     * @returns {Function} Returns the new bound function.
     * @example
     *
     * var object = {
     *   'user': 'fred',
     *   'greet': function(greeting, punctuation) {
     *     return greeting + ' ' + this.user + punctuation;
     *   }
     * };
     *
     * var bound = _.bindKey(object, 'greet', 'hi');
     * bound('!');
     * // => 'hi fred!'
     *
     * object.greet = function(greeting, punctuation) {
     *   return greeting + 'ya ' + this.user + punctuation;
     * };
     *
     * bound('!');
     * // => 'hiya fred!'
     *
     * // using placeholders
     * var bound = _.bindKey(object, 'greet', _, '!');
     * bound('hi');
     * // => 'hiya fred!'
     */
    var bindKey = restParam(function(object, key, partials) {
      var bitmask = BIND_FLAG | BIND_KEY_FLAG;
      if (partials.length) {
        var holders = replaceHolders(partials, bindKey.placeholder);
        bitmask |= PARTIAL_FLAG;
      }
      return createWrapper(key, bitmask, object, partials, holders);
    });

    /**
     * Creates a function that accepts one or more arguments of `func` that when
     * called either invokes `func` returning its result, if all `func` arguments
     * have been provided, or returns a function that accepts one or more of the
     * remaining `func` arguments, and so on. The arity of `func` may be specified
     * if `func.length` is not sufficient.
     *
     * The `_.curry.placeholder` value, which defaults to `_` in monolithic builds,
     * may be used as a placeholder for provided arguments.
     *
     * **Note:** This method does not set the "length" property of curried functions.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to curry.
     * @param {number} [arity=func.length] The arity of `func`.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Function} Returns the new curried function.
     * @example
     *
     * var abc = function(a, b, c) {
     *   return [a, b, c];
     * };
     *
     * var curried = _.curry(abc);
     *
     * curried(1)(2)(3);
     * // => [1, 2, 3]
     *
     * curried(1, 2)(3);
     * // => [1, 2, 3]
     *
     * curried(1, 2, 3);
     * // => [1, 2, 3]
     *
     * // using placeholders
     * curried(1)(_, 3)(2);
     * // => [1, 2, 3]
     */
    var curry = createCurry(CURRY_FLAG);

    /**
     * This method is like `_.curry` except that arguments are applied to `func`
     * in the manner of `_.partialRight` instead of `_.partial`.
     *
     * The `_.curryRight.placeholder` value, which defaults to `_` in monolithic
     * builds, may be used as a placeholder for provided arguments.
     *
     * **Note:** This method does not set the "length" property of curried functions.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to curry.
     * @param {number} [arity=func.length] The arity of `func`.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Function} Returns the new curried function.
     * @example
     *
     * var abc = function(a, b, c) {
     *   return [a, b, c];
     * };
     *
     * var curried = _.curryRight(abc);
     *
     * curried(3)(2)(1);
     * // => [1, 2, 3]
     *
     * curried(2, 3)(1);
     * // => [1, 2, 3]
     *
     * curried(1, 2, 3);
     * // => [1, 2, 3]
     *
     * // using placeholders
     * curried(3)(1, _)(2);
     * // => [1, 2, 3]
     */
    var curryRight = createCurry(CURRY_RIGHT_FLAG);

    /**
     * Creates a debounced function that delays invoking `func` until after `wait`
     * milliseconds have elapsed since the last time the debounced function was
     * invoked. The debounced function comes with a `cancel` method to cancel
     * delayed invocations. Provide an options object to indicate that `func`
     * should be invoked on the leading and/or trailing edge of the `wait` timeout.
     * Subsequent calls to the debounced function return the result of the last
     * `func` invocation.
     *
     * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
     * on the trailing edge of the timeout only if the the debounced function is
     * invoked more than once during the `wait` timeout.
     *
     * See [David Corbacho's article](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
     * for details over the differences between `_.debounce` and `_.throttle`.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to debounce.
     * @param {number} [wait=0] The number of milliseconds to delay.
     * @param {Object} [options] The options object.
     * @param {boolean} [options.leading=false] Specify invoking on the leading
     *  edge of the timeout.
     * @param {number} [options.maxWait] The maximum time `func` is allowed to be
     *  delayed before it is invoked.
     * @param {boolean} [options.trailing=true] Specify invoking on the trailing
     *  edge of the timeout.
     * @returns {Function} Returns the new debounced function.
     * @example
     *
     * // avoid costly calculations while the window size is in flux
     * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
     *
     * // invoke `sendMail` when the click event is fired, debouncing subsequent calls
     * jQuery('#postbox').on('click', _.debounce(sendMail, 300, {
     *   'leading': true,
     *   'trailing': false
     * }));
     *
     * // ensure `batchLog` is invoked once after 1 second of debounced calls
     * var source = new EventSource('/stream');
     * jQuery(source).on('message', _.debounce(batchLog, 250, {
     *   'maxWait': 1000
     * }));
     *
     * // cancel a debounced call
     * var todoChanges = _.debounce(batchLog, 1000);
     * Object.observe(models.todo, todoChanges);
     *
     * Object.observe(models, function(changes) {
     *   if (_.find(changes, { 'user': 'todo', 'type': 'delete'})) {
     *     todoChanges.cancel();
     *   }
     * }, ['delete']);
     *
     * // ...at some point `models.todo` is changed
     * models.todo.completed = true;
     *
     * // ...before 1 second has passed `models.todo` is deleted
     * // which cancels the debounced `todoChanges` call
     * delete models.todo;
     */
    function debounce(func, wait, options) {
      var args,
          maxTimeoutId,
          result,
          stamp,
          thisArg,
          timeoutId,
          trailingCall,
          lastCalled = 0,
          maxWait = false,
          trailing = true;

      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      wait = wait < 0 ? 0 : (+wait || 0);
      if (options === true) {
        var leading = true;
        trailing = false;
      } else if (isObject(options)) {
        leading = !!options.leading;
        maxWait = 'maxWait' in options && nativeMax(+options.maxWait || 0, wait);
        trailing = 'trailing' in options ? !!options.trailing : trailing;
      }

      function cancel() {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        if (maxTimeoutId) {
          clearTimeout(maxTimeoutId);
        }
        lastCalled = 0;
        maxTimeoutId = timeoutId = trailingCall = undefined;
      }

      function complete(isCalled, id) {
        if (id) {
          clearTimeout(id);
        }
        maxTimeoutId = timeoutId = trailingCall = undefined;
        if (isCalled) {
          lastCalled = now();
          result = func.apply(thisArg, args);
          if (!timeoutId && !maxTimeoutId) {
            args = thisArg = undefined;
          }
        }
      }

      function delayed() {
        var remaining = wait - (now() - stamp);
        if (remaining <= 0 || remaining > wait) {
          complete(trailingCall, maxTimeoutId);
        } else {
          timeoutId = setTimeout(delayed, remaining);
        }
      }

      function maxDelayed() {
        complete(trailing, timeoutId);
      }

      function debounced() {
        args = arguments;
        stamp = now();
        thisArg = this;
        trailingCall = trailing && (timeoutId || !leading);

        if (maxWait === false) {
          var leadingCall = leading && !timeoutId;
        } else {
          if (!maxTimeoutId && !leading) {
            lastCalled = stamp;
          }
          var remaining = maxWait - (stamp - lastCalled),
              isCalled = remaining <= 0 || remaining > maxWait;

          if (isCalled) {
            if (maxTimeoutId) {
              maxTimeoutId = clearTimeout(maxTimeoutId);
            }
            lastCalled = stamp;
            result = func.apply(thisArg, args);
          }
          else if (!maxTimeoutId) {
            maxTimeoutId = setTimeout(maxDelayed, remaining);
          }
        }
        if (isCalled && timeoutId) {
          timeoutId = clearTimeout(timeoutId);
        }
        else if (!timeoutId && wait !== maxWait) {
          timeoutId = setTimeout(delayed, wait);
        }
        if (leadingCall) {
          isCalled = true;
          result = func.apply(thisArg, args);
        }
        if (isCalled && !timeoutId && !maxTimeoutId) {
          args = thisArg = undefined;
        }
        return result;
      }
      debounced.cancel = cancel;
      return debounced;
    }

    /**
     * Defers invoking the `func` until the current call stack has cleared. Any
     * additional arguments are provided to `func` when it is invoked.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to defer.
     * @param {...*} [args] The arguments to invoke the function with.
     * @returns {number} Returns the timer id.
     * @example
     *
     * _.defer(function(text) {
     *   console.log(text);
     * }, 'deferred');
     * // logs 'deferred' after one or more milliseconds
     */
    var defer = restParam(function(func, args) {
      return baseDelay(func, 1, args);
    });

    /**
     * Invokes `func` after `wait` milliseconds. Any additional arguments are
     * provided to `func` when it is invoked.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to delay.
     * @param {number} wait The number of milliseconds to delay invocation.
     * @param {...*} [args] The arguments to invoke the function with.
     * @returns {number} Returns the timer id.
     * @example
     *
     * _.delay(function(text) {
     *   console.log(text);
     * }, 1000, 'later');
     * // => logs 'later' after one second
     */
    var delay = restParam(function(func, wait, args) {
      return baseDelay(func, wait, args);
    });

    /**
     * Creates a function that returns the result of invoking the provided
     * functions with the `this` binding of the created function, where each
     * successive invocation is supplied the return value of the previous.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {...Function} [funcs] Functions to invoke.
     * @returns {Function} Returns the new function.
     * @example
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var addSquare = _.flow(_.add, square);
     * addSquare(1, 2);
     * // => 9
     */
    var flow = createFlow();

    /**
     * This method is like `_.flow` except that it creates a function that
     * invokes the provided functions from right to left.
     *
     * @static
     * @memberOf _
     * @alias backflow, compose
     * @category Function
     * @param {...Function} [funcs] Functions to invoke.
     * @returns {Function} Returns the new function.
     * @example
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var addSquare = _.flowRight(square, _.add);
     * addSquare(1, 2);
     * // => 9
     */
    var flowRight = createFlow(true);

    /**
     * Creates a function that memoizes the result of `func`. If `resolver` is
     * provided it determines the cache key for storing the result based on the
     * arguments provided to the memoized function. By default, the first argument
     * provided to the memoized function is coerced to a string and used as the
     * cache key. The `func` is invoked with the `this` binding of the memoized
     * function.
     *
     * **Note:** The cache is exposed as the `cache` property on the memoized
     * function. Its creation may be customized by replacing the `_.memoize.Cache`
     * constructor with one whose instances implement the [`Map`](http://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-map-prototype-object)
     * method interface of `get`, `has`, and `set`.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to have its output memoized.
     * @param {Function} [resolver] The function to resolve the cache key.
     * @returns {Function} Returns the new memoizing function.
     * @example
     *
     * var upperCase = _.memoize(function(string) {
     *   return string.toUpperCase();
     * });
     *
     * upperCase('fred');
     * // => 'FRED'
     *
     * // modifying the result cache
     * upperCase.cache.set('fred', 'BARNEY');
     * upperCase('fred');
     * // => 'BARNEY'
     *
     * // replacing `_.memoize.Cache`
     * var object = { 'user': 'fred' };
     * var other = { 'user': 'barney' };
     * var identity = _.memoize(_.identity);
     *
     * identity(object);
     * // => { 'user': 'fred' }
     * identity(other);
     * // => { 'user': 'fred' }
     *
     * _.memoize.Cache = WeakMap;
     * var identity = _.memoize(_.identity);
     *
     * identity(object);
     * // => { 'user': 'fred' }
     * identity(other);
     * // => { 'user': 'barney' }
     */
    function memoize(func, resolver) {
      if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      var memoized = function() {
        var args = arguments,
            key = resolver ? resolver.apply(this, args) : args[0],
            cache = memoized.cache;

        if (cache.has(key)) {
          return cache.get(key);
        }
        var result = func.apply(this, args);
        memoized.cache = cache.set(key, result);
        return result;
      };
      memoized.cache = new memoize.Cache;
      return memoized;
    }

    /**
     * Creates a function that runs each argument through a corresponding
     * transform function.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to wrap.
     * @param {...(Function|Function[])} [transforms] The functions to transform
     * arguments, specified as individual functions or arrays of functions.
     * @returns {Function} Returns the new function.
     * @example
     *
     * function doubled(n) {
     *   return n * 2;
     * }
     *
     * function square(n) {
     *   return n * n;
     * }
     *
     * var modded = _.modArgs(function(x, y) {
     *   return [x, y];
     * }, square, doubled);
     *
     * modded(1, 2);
     * // => [1, 4]
     *
     * modded(5, 10);
     * // => [25, 20]
     */
    var modArgs = restParam(function(func, transforms) {
      transforms = baseFlatten(transforms);
      if (typeof func != 'function' || !arrayEvery(transforms, baseIsFunction)) {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      var length = transforms.length;
      return restParam(function(args) {
        var index = nativeMin(args.length, length);
        while (index--) {
          args[index] = transforms[index](args[index]);
        }
        return func.apply(this, args);
      });
    });

    /**
     * Creates a function that negates the result of the predicate `func`. The
     * `func` predicate is invoked with the `this` binding and arguments of the
     * created function.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} predicate The predicate to negate.
     * @returns {Function} Returns the new function.
     * @example
     *
     * function isEven(n) {
     *   return n % 2 == 0;
     * }
     *
     * _.filter([1, 2, 3, 4, 5, 6], _.negate(isEven));
     * // => [1, 3, 5]
     */
    function negate(predicate) {
      if (typeof predicate != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      return function() {
        return !predicate.apply(this, arguments);
      };
    }

    /**
     * Creates a function that is restricted to invoking `func` once. Repeat calls
     * to the function return the value of the first call. The `func` is invoked
     * with the `this` binding and arguments of the created function.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to restrict.
     * @returns {Function} Returns the new restricted function.
     * @example
     *
     * var initialize = _.once(createApplication);
     * initialize();
     * initialize();
     * // `initialize` invokes `createApplication` once
     */
    function once(func) {
      return before(2, func);
    }

    /**
     * Creates a function that invokes `func` with `partial` arguments prepended
     * to those provided to the new function. This method is like `_.bind` except
     * it does **not** alter the `this` binding.
     *
     * The `_.partial.placeholder` value, which defaults to `_` in monolithic
     * builds, may be used as a placeholder for partially applied arguments.
     *
     * **Note:** This method does not set the "length" property of partially
     * applied functions.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to partially apply arguments to.
     * @param {...*} [partials] The arguments to be partially applied.
     * @returns {Function} Returns the new partially applied function.
     * @example
     *
     * var greet = function(greeting, name) {
     *   return greeting + ' ' + name;
     * };
     *
     * var sayHelloTo = _.partial(greet, 'hello');
     * sayHelloTo('fred');
     * // => 'hello fred'
     *
     * // using placeholders
     * var greetFred = _.partial(greet, _, 'fred');
     * greetFred('hi');
     * // => 'hi fred'
     */
    var partial = createPartial(PARTIAL_FLAG);

    /**
     * This method is like `_.partial` except that partially applied arguments
     * are appended to those provided to the new function.
     *
     * The `_.partialRight.placeholder` value, which defaults to `_` in monolithic
     * builds, may be used as a placeholder for partially applied arguments.
     *
     * **Note:** This method does not set the "length" property of partially
     * applied functions.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to partially apply arguments to.
     * @param {...*} [partials] The arguments to be partially applied.
     * @returns {Function} Returns the new partially applied function.
     * @example
     *
     * var greet = function(greeting, name) {
     *   return greeting + ' ' + name;
     * };
     *
     * var greetFred = _.partialRight(greet, 'fred');
     * greetFred('hi');
     * // => 'hi fred'
     *
     * // using placeholders
     * var sayHelloTo = _.partialRight(greet, 'hello', _);
     * sayHelloTo('fred');
     * // => 'hello fred'
     */
    var partialRight = createPartial(PARTIAL_RIGHT_FLAG);

    /**
     * Creates a function that invokes `func` with arguments arranged according
     * to the specified indexes where the argument value at the first index is
     * provided as the first argument, the argument value at the second index is
     * provided as the second argument, and so on.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to rearrange arguments for.
     * @param {...(number|number[])} indexes The arranged argument indexes,
     *  specified as individual indexes or arrays of indexes.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var rearged = _.rearg(function(a, b, c) {
     *   return [a, b, c];
     * }, 2, 0, 1);
     *
     * rearged('b', 'c', 'a')
     * // => ['a', 'b', 'c']
     *
     * var map = _.rearg(_.map, [1, 0]);
     * map(function(n) {
     *   return n * 3;
     * }, [1, 2, 3]);
     * // => [3, 6, 9]
     */
    var rearg = restParam(function(func, indexes) {
      return createWrapper(func, REARG_FLAG, undefined, undefined, undefined, baseFlatten(indexes));
    });

    /**
     * Creates a function that invokes `func` with the `this` binding of the
     * created function and arguments from `start` and beyond provided as an array.
     *
     * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters).
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to apply a rest parameter to.
     * @param {number} [start=func.length-1] The start position of the rest parameter.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var say = _.restParam(function(what, names) {
     *   return what + ' ' + _.initial(names).join(', ') +
     *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
     * });
     *
     * say('hello', 'fred', 'barney', 'pebbles');
     * // => 'hello fred, barney, & pebbles'
     */
    function restParam(func, start) {
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      start = nativeMax(start === undefined ? (func.length - 1) : (+start || 0), 0);
      return function() {
        var args = arguments,
            index = -1,
            length = nativeMax(args.length - start, 0),
            rest = Array(length);

        while (++index < length) {
          rest[index] = args[start + index];
        }
        switch (start) {
          case 0: return func.call(this, rest);
          case 1: return func.call(this, args[0], rest);
          case 2: return func.call(this, args[0], args[1], rest);
        }
        var otherArgs = Array(start + 1);
        index = -1;
        while (++index < start) {
          otherArgs[index] = args[index];
        }
        otherArgs[start] = rest;
        return func.apply(this, otherArgs);
      };
    }

    /**
     * Creates a function that invokes `func` with the `this` binding of the created
     * function and an array of arguments much like [`Function#apply`](https://es5.github.io/#x15.3.4.3).
     *
     * **Note:** This method is based on the [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator).
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to spread arguments over.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var say = _.spread(function(who, what) {
     *   return who + ' says ' + what;
     * });
     *
     * say(['fred', 'hello']);
     * // => 'fred says hello'
     *
     * // with a Promise
     * var numbers = Promise.all([
     *   Promise.resolve(40),
     *   Promise.resolve(36)
     * ]);
     *
     * numbers.then(_.spread(function(x, y) {
     *   return x + y;
     * }));
     * // => a Promise of 76
     */
    function spread(func) {
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      return function(array) {
        return func.apply(this, array);
      };
    }

    /**
     * Creates a throttled function that only invokes `func` at most once per
     * every `wait` milliseconds. The throttled function comes with a `cancel`
     * method to cancel delayed invocations. Provide an options object to indicate
     * that `func` should be invoked on the leading and/or trailing edge of the
     * `wait` timeout. Subsequent calls to the throttled function return the
     * result of the last `func` call.
     *
     * **Note:** If `leading` and `trailing` options are `true`, `func` is invoked
     * on the trailing edge of the timeout only if the the throttled function is
     * invoked more than once during the `wait` timeout.
     *
     * See [David Corbacho's article](http://drupalmotion.com/article/debounce-and-throttle-visual-explanation)
     * for details over the differences between `_.throttle` and `_.debounce`.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {Function} func The function to throttle.
     * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
     * @param {Object} [options] The options object.
     * @param {boolean} [options.leading=true] Specify invoking on the leading
     *  edge of the timeout.
     * @param {boolean} [options.trailing=true] Specify invoking on the trailing
     *  edge of the timeout.
     * @returns {Function} Returns the new throttled function.
     * @example
     *
     * // avoid excessively updating the position while scrolling
     * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
     *
     * // invoke `renewToken` when the click event is fired, but not more than once every 5 minutes
     * jQuery('.interactive').on('click', _.throttle(renewToken, 300000, {
     *   'trailing': false
     * }));
     *
     * // cancel a trailing throttled call
     * jQuery(window).on('popstate', throttled.cancel);
     */
    function throttle(func, wait, options) {
      var leading = true,
          trailing = true;

      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      if (options === false) {
        leading = false;
      } else if (isObject(options)) {
        leading = 'leading' in options ? !!options.leading : leading;
        trailing = 'trailing' in options ? !!options.trailing : trailing;
      }
      return debounce(func, wait, { 'leading': leading, 'maxWait': +wait, 'trailing': trailing });
    }

    /**
     * Creates a function that provides `value` to the wrapper function as its
     * first argument. Any additional arguments provided to the function are
     * appended to those provided to the wrapper function. The wrapper is invoked
     * with the `this` binding of the created function.
     *
     * @static
     * @memberOf _
     * @category Function
     * @param {*} value The value to wrap.
     * @param {Function} wrapper The wrapper function.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var p = _.wrap(_.escape, function(func, text) {
     *   return '<p>' + func(text) + '</p>';
     * });
     *
     * p('fred, barney, & pebbles');
     * // => '<p>fred, barney, &amp; pebbles</p>'
     */
    function wrap(value, wrapper) {
      wrapper = wrapper == null ? identity : wrapper;
      return createWrapper(wrapper, PARTIAL_FLAG, undefined, [value], []);
    }

    /*------------------------------------------------------------------------*/

    /**
     * Creates a clone of `value`. If `isDeep` is `true` nested objects are cloned,
     * otherwise they are assigned by reference. If `customizer` is provided it is
     * invoked to produce the cloned values. If `customizer` returns `undefined`
     * cloning is handled by the method instead. The `customizer` is bound to
     * `thisArg` and invoked with two argument; (value [, index|key, object]).
     *
     * **Note:** This method is loosely based on the
     * [structured clone algorithm](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm).
     * The enumerable properties of `arguments` objects and objects created by
     * constructors other than `Object` are cloned to plain `Object` objects. An
     * empty object is returned for uncloneable values such as functions, DOM nodes,
     * Maps, Sets, and WeakMaps.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @param {Function} [customizer] The function to customize cloning values.
     * @param {*} [thisArg] The `this` binding of `customizer`.
     * @returns {*} Returns the cloned value.
     * @example
     *
     * var users = [
     *   { 'user': 'barney' },
     *   { 'user': 'fred' }
     * ];
     *
     * var shallow = _.clone(users);
     * shallow[0] === users[0];
     * // => true
     *
     * var deep = _.clone(users, true);
     * deep[0] === users[0];
     * // => false
     *
     * // using a customizer callback
     * var el = _.clone(document.body, function(value) {
     *   if (_.isElement(value)) {
     *     return value.cloneNode(false);
     *   }
     * });
     *
     * el === document.body
     * // => false
     * el.nodeName
     * // => BODY
     * el.childNodes.length;
     * // => 0
     */
    function clone(value, isDeep, customizer, thisArg) {
      if (isDeep && typeof isDeep != 'boolean' && isIterateeCall(value, isDeep, customizer)) {
        isDeep = false;
      }
      else if (typeof isDeep == 'function') {
        thisArg = customizer;
        customizer = isDeep;
        isDeep = false;
      }
      return typeof customizer == 'function'
        ? baseClone(value, isDeep, bindCallback(customizer, thisArg, 1))
        : baseClone(value, isDeep);
    }

    /**
     * Creates a deep clone of `value`. If `customizer` is provided it is invoked
     * to produce the cloned values. If `customizer` returns `undefined` cloning
     * is handled by the method instead. The `customizer` is bound to `thisArg`
     * and invoked with two argument; (value [, index|key, object]).
     *
     * **Note:** This method is loosely based on the
     * [structured clone algorithm](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm).
     * The enumerable properties of `arguments` objects and objects created by
     * constructors other than `Object` are cloned to plain `Object` objects. An
     * empty object is returned for uncloneable values such as functions, DOM nodes,
     * Maps, Sets, and WeakMaps.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to deep clone.
     * @param {Function} [customizer] The function to customize cloning values.
     * @param {*} [thisArg] The `this` binding of `customizer`.
     * @returns {*} Returns the deep cloned value.
     * @example
     *
     * var users = [
     *   { 'user': 'barney' },
     *   { 'user': 'fred' }
     * ];
     *
     * var deep = _.cloneDeep(users);
     * deep[0] === users[0];
     * // => false
     *
     * // using a customizer callback
     * var el = _.cloneDeep(document.body, function(value) {
     *   if (_.isElement(value)) {
     *     return value.cloneNode(true);
     *   }
     * });
     *
     * el === document.body
     * // => false
     * el.nodeName
     * // => BODY
     * el.childNodes.length;
     * // => 20
     */
    function cloneDeep(value, customizer, thisArg) {
      return typeof customizer == 'function'
        ? baseClone(value, true, bindCallback(customizer, thisArg, 1))
        : baseClone(value, true);
    }

    /**
     * Checks if `value` is greater than `other`.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is greater than `other`, else `false`.
     * @example
     *
     * _.gt(3, 1);
     * // => true
     *
     * _.gt(3, 3);
     * // => false
     *
     * _.gt(1, 3);
     * // => false
     */
    function gt(value, other) {
      return value > other;
    }

    /**
     * Checks if `value` is greater than or equal to `other`.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is greater than or equal to `other`, else `false`.
     * @example
     *
     * _.gte(3, 1);
     * // => true
     *
     * _.gte(3, 3);
     * // => true
     *
     * _.gte(1, 3);
     * // => false
     */
    function gte(value, other) {
      return value >= other;
    }

    /**
     * Checks if `value` is classified as an `arguments` object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isArguments(function() { return arguments; }());
     * // => true
     *
     * _.isArguments([1, 2, 3]);
     * // => false
     */
    function isArguments(value) {
      return isObjectLike(value) && isArrayLike(value) &&
        hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
    }

    /**
     * Checks if `value` is classified as an `Array` object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isArray([1, 2, 3]);
     * // => true
     *
     * _.isArray(function() { return arguments; }());
     * // => false
     */
    var isArray = nativeIsArray || function(value) {
      return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
    };

    /**
     * Checks if `value` is classified as a boolean primitive or object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isBoolean(false);
     * // => true
     *
     * _.isBoolean(null);
     * // => false
     */
    function isBoolean(value) {
      return value === true || value === false || (isObjectLike(value) && objToString.call(value) == boolTag);
    }

    /**
     * Checks if `value` is classified as a `Date` object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isDate(new Date);
     * // => true
     *
     * _.isDate('Mon April 23 2012');
     * // => false
     */
    function isDate(value) {
      return isObjectLike(value) && objToString.call(value) == dateTag;
    }

    /**
     * Checks if `value` is a DOM element.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
     * @example
     *
     * _.isElement(document.body);
     * // => true
     *
     * _.isElement('<body>');
     * // => false
     */
    function isElement(value) {
      return !!value && value.nodeType === 1 && isObjectLike(value) && !isPlainObject(value);
    }

    /**
     * Checks if `value` is empty. A value is considered empty unless it is an
     * `arguments` object, array, string, or jQuery-like collection with a length
     * greater than `0` or an object with own enumerable properties.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {Array|Object|string} value The value to inspect.
     * @returns {boolean} Returns `true` if `value` is empty, else `false`.
     * @example
     *
     * _.isEmpty(null);
     * // => true
     *
     * _.isEmpty(true);
     * // => true
     *
     * _.isEmpty(1);
     * // => true
     *
     * _.isEmpty([1, 2, 3]);
     * // => false
     *
     * _.isEmpty({ 'a': 1 });
     * // => false
     */
    function isEmpty(value) {
      if (value == null) {
        return true;
      }
      if (isArrayLike(value) && (isArray(value) || isString(value) || isArguments(value) ||
          (isObjectLike(value) && isFunction(value.splice)))) {
        return !value.length;
      }
      return !keys(value).length;
    }

    /**
     * Performs a deep comparison between two values to determine if they are
     * equivalent. If `customizer` is provided it is invoked to compare values.
     * If `customizer` returns `undefined` comparisons are handled by the method
     * instead. The `customizer` is bound to `thisArg` and invoked with three
     * arguments: (value, other [, index|key]).
     *
     * **Note:** This method supports comparing arrays, booleans, `Date` objects,
     * numbers, `Object` objects, regexes, and strings. Objects are compared by
     * their own, not inherited, enumerable properties. Functions and DOM nodes
     * are **not** supported. Provide a customizer function to extend support
     * for comparing other values.
     *
     * @static
     * @memberOf _
     * @alias eq
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @param {Function} [customizer] The function to customize value comparisons.
     * @param {*} [thisArg] The `this` binding of `customizer`.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * var object = { 'user': 'fred' };
     * var other = { 'user': 'fred' };
     *
     * object == other;
     * // => false
     *
     * _.isEqual(object, other);
     * // => true
     *
     * // using a customizer callback
     * var array = ['hello', 'goodbye'];
     * var other = ['hi', 'goodbye'];
     *
     * _.isEqual(array, other, function(value, other) {
     *   if (_.every([value, other], RegExp.prototype.test, /^h(?:i|ello)$/)) {
     *     return true;
     *   }
     * });
     * // => true
     */
    function isEqual(value, other, customizer, thisArg) {
      customizer = typeof customizer == 'function' ? bindCallback(customizer, thisArg, 3) : undefined;
      var result = customizer ? customizer(value, other) : undefined;
      return  result === undefined ? baseIsEqual(value, other, customizer) : !!result;
    }

    /**
     * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`,
     * `SyntaxError`, `TypeError`, or `URIError` object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an error object, else `false`.
     * @example
     *
     * _.isError(new Error);
     * // => true
     *
     * _.isError(Error);
     * // => false
     */
    function isError(value) {
      return isObjectLike(value) && typeof value.message == 'string' && objToString.call(value) == errorTag;
    }

    /**
     * Checks if `value` is a finite primitive number.
     *
     * **Note:** This method is based on [`Number.isFinite`](http://ecma-international.org/ecma-262/6.0/#sec-number.isfinite).
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a finite number, else `false`.
     * @example
     *
     * _.isFinite(10);
     * // => true
     *
     * _.isFinite('10');
     * // => false
     *
     * _.isFinite(true);
     * // => false
     *
     * _.isFinite(Object(10));
     * // => false
     *
     * _.isFinite(Infinity);
     * // => false
     */
    function isFinite(value) {
      return typeof value == 'number' && nativeIsFinite(value);
    }

    /**
     * Checks if `value` is classified as a `Function` object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isFunction(_);
     * // => true
     *
     * _.isFunction(/abc/);
     * // => false
     */
    function isFunction(value) {
      // The use of `Object#toString` avoids issues with the `typeof` operator
      // in older versions of Chrome and Safari which return 'function' for regexes
      // and Safari 8 equivalents which return 'object' for typed array constructors.
      return isObject(value) && objToString.call(value) == funcTag;
    }

    /**
     * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
     * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
     * @example
     *
     * _.isObject({});
     * // => true
     *
     * _.isObject([1, 2, 3]);
     * // => true
     *
     * _.isObject(1);
     * // => false
     */
    function isObject(value) {
      // Avoid a V8 JIT bug in Chrome 19-20.
      // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
      var type = typeof value;
      return !!value && (type == 'object' || type == 'function');
    }

    /**
     * Performs a deep comparison between `object` and `source` to determine if
     * `object` contains equivalent property values. If `customizer` is provided
     * it is invoked to compare values. If `customizer` returns `undefined`
     * comparisons are handled by the method instead. The `customizer` is bound
     * to `thisArg` and invoked with three arguments: (value, other, index|key).
     *
     * **Note:** This method supports comparing properties of arrays, booleans,
     * `Date` objects, numbers, `Object` objects, regexes, and strings. Functions
     * and DOM nodes are **not** supported. Provide a customizer function to extend
     * support for comparing other values.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {Object} object The object to inspect.
     * @param {Object} source The object of property values to match.
     * @param {Function} [customizer] The function to customize value comparisons.
     * @param {*} [thisArg] The `this` binding of `customizer`.
     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
     * @example
     *
     * var object = { 'user': 'fred', 'age': 40 };
     *
     * _.isMatch(object, { 'age': 40 });
     * // => true
     *
     * _.isMatch(object, { 'age': 36 });
     * // => false
     *
     * // using a customizer callback
     * var object = { 'greeting': 'hello' };
     * var source = { 'greeting': 'hi' };
     *
     * _.isMatch(object, source, function(value, other) {
     *   return _.every([value, other], RegExp.prototype.test, /^h(?:i|ello)$/) || undefined;
     * });
     * // => true
     */
    function isMatch(object, source, customizer, thisArg) {
      customizer = typeof customizer == 'function' ? bindCallback(customizer, thisArg, 3) : undefined;
      return baseIsMatch(object, getMatchData(source), customizer);
    }

    /**
     * Checks if `value` is `NaN`.
     *
     * **Note:** This method is not the same as [`isNaN`](https://es5.github.io/#x15.1.2.4)
     * which returns `true` for `undefined` and other non-numeric values.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
     * @example
     *
     * _.isNaN(NaN);
     * // => true
     *
     * _.isNaN(new Number(NaN));
     * // => true
     *
     * isNaN(undefined);
     * // => true
     *
     * _.isNaN(undefined);
     * // => false
     */
    function isNaN(value) {
      // An `NaN` primitive is the only value that is not equal to itself.
      // Perform the `toStringTag` check first to avoid errors with some host objects in IE.
      return isNumber(value) && value != +value;
    }

    /**
     * Checks if `value` is a native function.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
     * @example
     *
     * _.isNative(Array.prototype.push);
     * // => true
     *
     * _.isNative(_);
     * // => false
     */
    function isNative(value) {
      if (value == null) {
        return false;
      }
      if (isFunction(value)) {
        return reIsNative.test(fnToString.call(value));
      }
      return isObjectLike(value) && reIsHostCtor.test(value);
    }

    /**
     * Checks if `value` is `null`.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is `null`, else `false`.
     * @example
     *
     * _.isNull(null);
     * // => true
     *
     * _.isNull(void 0);
     * // => false
     */
    function isNull(value) {
      return value === null;
    }

    /**
     * Checks if `value` is classified as a `Number` primitive or object.
     *
     * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are classified
     * as numbers, use the `_.isFinite` method.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isNumber(8.4);
     * // => true
     *
     * _.isNumber(NaN);
     * // => true
     *
     * _.isNumber('8.4');
     * // => false
     */
    function isNumber(value) {
      return typeof value == 'number' || (isObjectLike(value) && objToString.call(value) == numberTag);
    }

    /**
     * Checks if `value` is a plain object, that is, an object created by the
     * `Object` constructor or one with a `[[Prototype]]` of `null`.
     *
     * **Note:** This method assumes objects created by the `Object` constructor
     * have no inherited enumerable properties.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     * }
     *
     * _.isPlainObject(new Foo);
     * // => false
     *
     * _.isPlainObject([1, 2, 3]);
     * // => false
     *
     * _.isPlainObject({ 'x': 0, 'y': 0 });
     * // => true
     *
     * _.isPlainObject(Object.create(null));
     * // => true
     */
    function isPlainObject(value) {
      var Ctor;

      // Exit early for non `Object` objects.
      if (!(isObjectLike(value) && objToString.call(value) == objectTag && !isArguments(value)) ||
          (!hasOwnProperty.call(value, 'constructor') && (Ctor = value.constructor, typeof Ctor == 'function' && !(Ctor instanceof Ctor)))) {
        return false;
      }
      // IE < 9 iterates inherited properties before own properties. If the first
      // iterated property is an object's own property then there are no inherited
      // enumerable properties.
      var result;
      // In most environments an object's own properties are iterated before
      // its inherited properties. If the last iterated property is an object's
      // own property then there are no inherited enumerable properties.
      baseForIn(value, function(subValue, key) {
        result = key;
      });
      return result === undefined || hasOwnProperty.call(value, result);
    }

    /**
     * Checks if `value` is classified as a `RegExp` object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isRegExp(/abc/);
     * // => true
     *
     * _.isRegExp('/abc/');
     * // => false
     */
    function isRegExp(value) {
      return isObject(value) && objToString.call(value) == regexpTag;
    }

    /**
     * Checks if `value` is classified as a `String` primitive or object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isString('abc');
     * // => true
     *
     * _.isString(1);
     * // => false
     */
    function isString(value) {
      return typeof value == 'string' || (isObjectLike(value) && objToString.call(value) == stringTag);
    }

    /**
     * Checks if `value` is classified as a typed array.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
     * @example
     *
     * _.isTypedArray(new Uint8Array);
     * // => true
     *
     * _.isTypedArray([]);
     * // => false
     */
    function isTypedArray(value) {
      return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
    }

    /**
     * Checks if `value` is `undefined`.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
     * @example
     *
     * _.isUndefined(void 0);
     * // => true
     *
     * _.isUndefined(null);
     * // => false
     */
    function isUndefined(value) {
      return value === undefined;
    }

    /**
     * Checks if `value` is less than `other`.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is less than `other`, else `false`.
     * @example
     *
     * _.lt(1, 3);
     * // => true
     *
     * _.lt(3, 3);
     * // => false
     *
     * _.lt(3, 1);
     * // => false
     */
    function lt(value, other) {
      return value < other;
    }

    /**
     * Checks if `value` is less than or equal to `other`.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if `value` is less than or equal to `other`, else `false`.
     * @example
     *
     * _.lte(1, 3);
     * // => true
     *
     * _.lte(3, 3);
     * // => true
     *
     * _.lte(3, 1);
     * // => false
     */
    function lte(value, other) {
      return value <= other;
    }

    /**
     * Converts `value` to an array.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {Array} Returns the converted array.
     * @example
     *
     * (function() {
     *   return _.toArray(arguments).slice(1);
     * }(1, 2, 3));
     * // => [2, 3]
     */
    function toArray(value) {
      var length = value ? getLength(value) : 0;
      if (!isLength(length)) {
        return values(value);
      }
      if (!length) {
        return [];
      }
      return arrayCopy(value);
    }

    /**
     * Converts `value` to a plain object flattening inherited enumerable
     * properties of `value` to own properties of the plain object.
     *
     * @static
     * @memberOf _
     * @category Lang
     * @param {*} value The value to convert.
     * @returns {Object} Returns the converted plain object.
     * @example
     *
     * function Foo() {
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.assign({ 'a': 1 }, new Foo);
     * // => { 'a': 1, 'b': 2 }
     *
     * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
     * // => { 'a': 1, 'b': 2, 'c': 3 }
     */
    function toPlainObject(value) {
      return baseCopy(value, keysIn(value));
    }

    /*------------------------------------------------------------------------*/

    /**
     * Recursively merges own enumerable properties of the source object(s), that
     * don't resolve to `undefined` into the destination object. Subsequent sources
     * overwrite property assignments of previous sources. If `customizer` is
     * provided it is invoked to produce the merged values of the destination and
     * source properties. If `customizer` returns `undefined` merging is handled
     * by the method instead. The `customizer` is bound to `thisArg` and invoked
     * with five arguments: (objectValue, sourceValue, key, object, source).
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @param {Function} [customizer] The function to customize assigned values.
     * @param {*} [thisArg] The `this` binding of `customizer`.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var users = {
     *   'data': [{ 'user': 'barney' }, { 'user': 'fred' }]
     * };
     *
     * var ages = {
     *   'data': [{ 'age': 36 }, { 'age': 40 }]
     * };
     *
     * _.merge(users, ages);
     * // => { 'data': [{ 'user': 'barney', 'age': 36 }, { 'user': 'fred', 'age': 40 }] }
     *
     * // using a customizer callback
     * var object = {
     *   'fruits': ['apple'],
     *   'vegetables': ['beet']
     * };
     *
     * var other = {
     *   'fruits': ['banana'],
     *   'vegetables': ['carrot']
     * };
     *
     * _.merge(object, other, function(a, b) {
     *   if (_.isArray(a)) {
     *     return a.concat(b);
     *   }
     * });
     * // => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot'] }
     */
    var merge = createAssigner(baseMerge);

    /**
     * Assigns own enumerable properties of source object(s) to the destination
     * object. Subsequent sources overwrite property assignments of previous sources.
     * If `customizer` is provided it is invoked to produce the assigned values.
     * The `customizer` is bound to `thisArg` and invoked with five arguments:
     * (objectValue, sourceValue, key, object, source).
     *
     * **Note:** This method mutates `object` and is based on
     * [`Object.assign`](http://ecma-international.org/ecma-262/6.0/#sec-object.assign).
     *
     * @static
     * @memberOf _
     * @alias extend
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @param {Function} [customizer] The function to customize assigned values.
     * @param {*} [thisArg] The `this` binding of `customizer`.
     * @returns {Object} Returns `object`.
     * @example
     *
     * _.assign({ 'user': 'barney' }, { 'age': 40 }, { 'user': 'fred' });
     * // => { 'user': 'fred', 'age': 40 }
     *
     * // using a customizer callback
     * var defaults = _.partialRight(_.assign, function(value, other) {
     *   return _.isUndefined(value) ? other : value;
     * });
     *
     * defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
     * // => { 'user': 'barney', 'age': 36 }
     */
    var assign = createAssigner(function(object, source, customizer) {
      return customizer
        ? assignWith(object, source, customizer)
        : baseAssign(object, source);
    });

    /**
     * Creates an object that inherits from the given `prototype` object. If a
     * `properties` object is provided its own enumerable properties are assigned
     * to the created object.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} prototype The object to inherit from.
     * @param {Object} [properties] The properties to assign to the object.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Object} Returns the new object.
     * @example
     *
     * function Shape() {
     *   this.x = 0;
     *   this.y = 0;
     * }
     *
     * function Circle() {
     *   Shape.call(this);
     * }
     *
     * Circle.prototype = _.create(Shape.prototype, {
     *   'constructor': Circle
     * });
     *
     * var circle = new Circle;
     * circle instanceof Circle;
     * // => true
     *
     * circle instanceof Shape;
     * // => true
     */
    function create(prototype, properties, guard) {
      var result = baseCreate(prototype);
      if (guard && isIterateeCall(prototype, properties, guard)) {
        properties = undefined;
      }
      return properties ? baseAssign(result, properties) : result;
    }

    /**
     * Assigns own enumerable properties of source object(s) to the destination
     * object for all destination properties that resolve to `undefined`. Once a
     * property is set, additional values of the same property are ignored.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @example
     *
     * _.defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
     * // => { 'user': 'barney', 'age': 36 }
     */
    var defaults = createDefaults(assign, assignDefaults);

    /**
     * This method is like `_.defaults` except that it recursively assigns
     * default properties.
     *
     * **Note:** This method mutates `object`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The destination object.
     * @param {...Object} [sources] The source objects.
     * @returns {Object} Returns `object`.
     * @example
     *
     * _.defaultsDeep({ 'user': { 'name': 'barney' } }, { 'user': { 'name': 'fred', 'age': 36 } });
     * // => { 'user': { 'name': 'barney', 'age': 36 } }
     *
     */
    var defaultsDeep = createDefaults(merge, mergeDefaults);

    /**
     * This method is like `_.find` except that it returns the key of the first
     * element `predicate` returns truthy for instead of the element itself.
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to search.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {string|undefined} Returns the key of the matched element, else `undefined`.
     * @example
     *
     * var users = {
     *   'barney':  { 'age': 36, 'active': true },
     *   'fred':    { 'age': 40, 'active': false },
     *   'pebbles': { 'age': 1,  'active': true }
     * };
     *
     * _.findKey(users, function(chr) {
     *   return chr.age < 40;
     * });
     * // => 'barney' (iteration order is not guaranteed)
     *
     * // using the `_.matches` callback shorthand
     * _.findKey(users, { 'age': 1, 'active': true });
     * // => 'pebbles'
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.findKey(users, 'active', false);
     * // => 'fred'
     *
     * // using the `_.property` callback shorthand
     * _.findKey(users, 'active');
     * // => 'barney'
     */
    var findKey = createFindKey(baseForOwn);

    /**
     * This method is like `_.findKey` except that it iterates over elements of
     * a collection in the opposite order.
     *
     * If a property name is provided for `predicate` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `predicate` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to search.
     * @param {Function|Object|string} [predicate=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {string|undefined} Returns the key of the matched element, else `undefined`.
     * @example
     *
     * var users = {
     *   'barney':  { 'age': 36, 'active': true },
     *   'fred':    { 'age': 40, 'active': false },
     *   'pebbles': { 'age': 1,  'active': true }
     * };
     *
     * _.findLastKey(users, function(chr) {
     *   return chr.age < 40;
     * });
     * // => returns `pebbles` assuming `_.findKey` returns `barney`
     *
     * // using the `_.matches` callback shorthand
     * _.findLastKey(users, { 'age': 36, 'active': true });
     * // => 'barney'
     *
     * // using the `_.matchesProperty` callback shorthand
     * _.findLastKey(users, 'active', false);
     * // => 'fred'
     *
     * // using the `_.property` callback shorthand
     * _.findLastKey(users, 'active');
     * // => 'pebbles'
     */
    var findLastKey = createFindKey(baseForOwnRight);

    /**
     * Iterates over own and inherited enumerable properties of an object invoking
     * `iteratee` for each property. The `iteratee` is bound to `thisArg` and invoked
     * with three arguments: (value, key, object). Iteratee functions may exit
     * iteration early by explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Object} Returns `object`.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.forIn(new Foo, function(value, key) {
     *   console.log(key);
     * });
     * // => logs 'a', 'b', and 'c' (iteration order is not guaranteed)
     */
    var forIn = createForIn(baseFor);

    /**
     * This method is like `_.forIn` except that it iterates over properties of
     * `object` in the opposite order.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Object} Returns `object`.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.forInRight(new Foo, function(value, key) {
     *   console.log(key);
     * });
     * // => logs 'c', 'b', and 'a' assuming `_.forIn ` logs 'a', 'b', and 'c'
     */
    var forInRight = createForIn(baseForRight);

    /**
     * Iterates over own enumerable properties of an object invoking `iteratee`
     * for each property. The `iteratee` is bound to `thisArg` and invoked with
     * three arguments: (value, key, object). Iteratee functions may exit iteration
     * early by explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Object} Returns `object`.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.forOwn(new Foo, function(value, key) {
     *   console.log(key);
     * });
     * // => logs 'a' and 'b' (iteration order is not guaranteed)
     */
    var forOwn = createForOwn(baseForOwn);

    /**
     * This method is like `_.forOwn` except that it iterates over properties of
     * `object` in the opposite order.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Object} Returns `object`.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.forOwnRight(new Foo, function(value, key) {
     *   console.log(key);
     * });
     * // => logs 'b' and 'a' assuming `_.forOwn` logs 'a' and 'b'
     */
    var forOwnRight = createForOwn(baseForOwnRight);

    /**
     * Creates an array of function property names from all enumerable properties,
     * own and inherited, of `object`.
     *
     * @static
     * @memberOf _
     * @alias methods
     * @category Object
     * @param {Object} object The object to inspect.
     * @returns {Array} Returns the new array of property names.
     * @example
     *
     * _.functions(_);
     * // => ['after', 'ary', 'assign', ...]
     */
    function functions(object) {
      return baseFunctions(object, keysIn(object));
    }

    /**
     * Gets the property value at `path` of `object`. If the resolved value is
     * `undefined` the `defaultValue` is used in its place.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to get.
     * @param {*} [defaultValue] The value returned if the resolved value is `undefined`.
     * @returns {*} Returns the resolved value.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.get(object, 'a[0].b.c');
     * // => 3
     *
     * _.get(object, ['a', '0', 'b', 'c']);
     * // => 3
     *
     * _.get(object, 'a.b.c', 'default');
     * // => 'default'
     */
    function get(object, path, defaultValue) {
      var result = object == null ? undefined : baseGet(object, toPath(path), path + '');
      return result === undefined ? defaultValue : result;
    }

    /**
     * Checks if `path` is a direct property.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path to check.
     * @returns {boolean} Returns `true` if `path` is a direct property, else `false`.
     * @example
     *
     * var object = { 'a': { 'b': { 'c': 3 } } };
     *
     * _.has(object, 'a');
     * // => true
     *
     * _.has(object, 'a.b.c');
     * // => true
     *
     * _.has(object, ['a', 'b', 'c']);
     * // => true
     */
    function has(object, path) {
      if (object == null) {
        return false;
      }
      var result = hasOwnProperty.call(object, path);
      if (!result && !isKey(path)) {
        path = toPath(path);
        object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
        if (object == null) {
          return false;
        }
        path = last(path);
        result = hasOwnProperty.call(object, path);
      }
      return result || (isLength(object.length) && isIndex(path, object.length) &&
        (isArray(object) || isArguments(object)));
    }

    /**
     * Creates an object composed of the inverted keys and values of `object`.
     * If `object` contains duplicate values, subsequent values overwrite property
     * assignments of previous values unless `multiValue` is `true`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to invert.
     * @param {boolean} [multiValue] Allow multiple values per key.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Object} Returns the new inverted object.
     * @example
     *
     * var object = { 'a': 1, 'b': 2, 'c': 1 };
     *
     * _.invert(object);
     * // => { '1': 'c', '2': 'b' }
     *
     * // with `multiValue`
     * _.invert(object, true);
     * // => { '1': ['a', 'c'], '2': ['b'] }
     */
    function invert(object, multiValue, guard) {
      if (guard && isIterateeCall(object, multiValue, guard)) {
        multiValue = undefined;
      }
      var index = -1,
          props = keys(object),
          length = props.length,
          result = {};

      while (++index < length) {
        var key = props[index],
            value = object[key];

        if (multiValue) {
          if (hasOwnProperty.call(result, value)) {
            result[value].push(key);
          } else {
            result[value] = [key];
          }
        }
        else {
          result[value] = key;
        }
      }
      return result;
    }

    /**
     * Creates an array of the own enumerable property names of `object`.
     *
     * **Note:** Non-object values are coerced to objects. See the
     * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
     * for more details.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.keys(new Foo);
     * // => ['a', 'b'] (iteration order is not guaranteed)
     *
     * _.keys('hi');
     * // => ['0', '1']
     */
    var keys = !nativeKeys ? shimKeys : function(object) {
      var Ctor = object == null ? undefined : object.constructor;
      if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
          (typeof object != 'function' && isArrayLike(object))) {
        return shimKeys(object);
      }
      return isObject(object) ? nativeKeys(object) : [];
    };

    /**
     * Creates an array of the own and inherited enumerable property names of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.keysIn(new Foo);
     * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
     */
    function keysIn(object) {
      if (object == null) {
        return [];
      }
      if (!isObject(object)) {
        object = Object(object);
      }
      var length = object.length;
      length = (length && isLength(length) &&
        (isArray(object) || isArguments(object)) && length) || 0;

      var Ctor = object.constructor,
          index = -1,
          isProto = typeof Ctor == 'function' && Ctor.prototype === object,
          result = Array(length),
          skipIndexes = length > 0;

      while (++index < length) {
        result[index] = (index + '');
      }
      for (var key in object) {
        if (!(skipIndexes && isIndex(key, length)) &&
            !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
          result.push(key);
        }
      }
      return result;
    }

    /**
     * The opposite of `_.mapValues`; this method creates an object with the
     * same values as `object` and keys generated by running each own enumerable
     * property of `object` through `iteratee`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Object} Returns the new mapped object.
     * @example
     *
     * _.mapKeys({ 'a': 1, 'b': 2 }, function(value, key) {
     *   return key + value;
     * });
     * // => { 'a1': 1, 'b2': 2 }
     */
    var mapKeys = createObjectMapper(true);

    /**
     * Creates an object with the same keys as `object` and values generated by
     * running each own enumerable property of `object` through `iteratee`. The
     * iteratee function is bound to `thisArg` and invoked with three arguments:
     * (value, key, object).
     *
     * If a property name is provided for `iteratee` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `iteratee` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to iterate over.
     * @param {Function|Object|string} [iteratee=_.identity] The function invoked
     *  per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Object} Returns the new mapped object.
     * @example
     *
     * _.mapValues({ 'a': 1, 'b': 2 }, function(n) {
     *   return n * 3;
     * });
     * // => { 'a': 3, 'b': 6 }
     *
     * var users = {
     *   'fred':    { 'user': 'fred',    'age': 40 },
     *   'pebbles': { 'user': 'pebbles', 'age': 1 }
     * };
     *
     * // using the `_.property` callback shorthand
     * _.mapValues(users, 'age');
     * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
     */
    var mapValues = createObjectMapper();

    /**
     * The opposite of `_.pick`; this method creates an object composed of the
     * own and inherited enumerable properties of `object` that are not omitted.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The source object.
     * @param {Function|...(string|string[])} [predicate] The function invoked per
     *  iteration or property names to omit, specified as individual property
     *  names or arrays of property names.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {Object} Returns the new object.
     * @example
     *
     * var object = { 'user': 'fred', 'age': 40 };
     *
     * _.omit(object, 'age');
     * // => { 'user': 'fred' }
     *
     * _.omit(object, _.isNumber);
     * // => { 'user': 'fred' }
     */
    var omit = restParam(function(object, props) {
      if (object == null) {
        return {};
      }
      if (typeof props[0] != 'function') {
        var props = arrayMap(baseFlatten(props), String);
        return pickByArray(object, baseDifference(keysIn(object), props));
      }
      var predicate = bindCallback(props[0], props[1], 3);
      return pickByCallback(object, function(value, key, object) {
        return !predicate(value, key, object);
      });
    });

    /**
     * Creates a two dimensional array of the key-value pairs for `object`,
     * e.g. `[[key1, value1], [key2, value2]]`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the new array of key-value pairs.
     * @example
     *
     * _.pairs({ 'barney': 36, 'fred': 40 });
     * // => [['barney', 36], ['fred', 40]] (iteration order is not guaranteed)
     */
    function pairs(object) {
      object = toObject(object);

      var index = -1,
          props = keys(object),
          length = props.length,
          result = Array(length);

      while (++index < length) {
        var key = props[index];
        result[index] = [key, object[key]];
      }
      return result;
    }

    /**
     * Creates an object composed of the picked `object` properties. Property
     * names may be specified as individual arguments or as arrays of property
     * names. If `predicate` is provided it is invoked for each property of `object`
     * picking the properties `predicate` returns truthy for. The predicate is
     * bound to `thisArg` and invoked with three arguments: (value, key, object).
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The source object.
     * @param {Function|...(string|string[])} [predicate] The function invoked per
     *  iteration or property names to pick, specified as individual property
     *  names or arrays of property names.
     * @param {*} [thisArg] The `this` binding of `predicate`.
     * @returns {Object} Returns the new object.
     * @example
     *
     * var object = { 'user': 'fred', 'age': 40 };
     *
     * _.pick(object, 'user');
     * // => { 'user': 'fred' }
     *
     * _.pick(object, _.isString);
     * // => { 'user': 'fred' }
     */
    var pick = restParam(function(object, props) {
      if (object == null) {
        return {};
      }
      return typeof props[0] == 'function'
        ? pickByCallback(object, bindCallback(props[0], props[1], 3))
        : pickByArray(object, baseFlatten(props));
    });

    /**
     * This method is like `_.get` except that if the resolved value is a function
     * it is invoked with the `this` binding of its parent object and its result
     * is returned.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @param {Array|string} path The path of the property to resolve.
     * @param {*} [defaultValue] The value returned if the resolved value is `undefined`.
     * @returns {*} Returns the resolved value.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c1': 3, 'c2': _.constant(4) } }] };
     *
     * _.result(object, 'a[0].b.c1');
     * // => 3
     *
     * _.result(object, 'a[0].b.c2');
     * // => 4
     *
     * _.result(object, 'a.b.c', 'default');
     * // => 'default'
     *
     * _.result(object, 'a.b.c', _.constant('default'));
     * // => 'default'
     */
    function result(object, path, defaultValue) {
      var result = object == null ? undefined : object[path];
      if (result === undefined) {
        if (object != null && !isKey(path, object)) {
          path = toPath(path);
          object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
          result = object == null ? undefined : object[last(path)];
        }
        result = result === undefined ? defaultValue : result;
      }
      return isFunction(result) ? result.call(object) : result;
    }

    /**
     * Sets the property value of `path` on `object`. If a portion of `path`
     * does not exist it is created.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to augment.
     * @param {Array|string} path The path of the property to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns `object`.
     * @example
     *
     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
     *
     * _.set(object, 'a[0].b.c', 4);
     * console.log(object.a[0].b.c);
     * // => 4
     *
     * _.set(object, 'x[0].y.z', 5);
     * console.log(object.x[0].y.z);
     * // => 5
     */
    function set(object, path, value) {
      if (object == null) {
        return object;
      }
      var pathKey = (path + '');
      path = (object[pathKey] != null || isKey(path, object)) ? [pathKey] : toPath(path);

      var index = -1,
          length = path.length,
          lastIndex = length - 1,
          nested = object;

      while (nested != null && ++index < length) {
        var key = path[index];
        if (isObject(nested)) {
          if (index == lastIndex) {
            nested[key] = value;
          } else if (nested[key] == null) {
            nested[key] = isIndex(path[index + 1]) ? [] : {};
          }
        }
        nested = nested[key];
      }
      return object;
    }

    /**
     * An alternative to `_.reduce`; this method transforms `object` to a new
     * `accumulator` object which is the result of running each of its own enumerable
     * properties through `iteratee`, with each invocation potentially mutating
     * the `accumulator` object. The `iteratee` is bound to `thisArg` and invoked
     * with four arguments: (accumulator, value, key, object). Iteratee functions
     * may exit iteration early by explicitly returning `false`.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Array|Object} object The object to iterate over.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [accumulator] The custom accumulator value.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {*} Returns the accumulated value.
     * @example
     *
     * _.transform([2, 3, 4], function(result, n) {
     *   result.push(n *= n);
     *   return n % 2 == 0;
     * });
     * // => [4, 9]
     *
     * _.transform({ 'a': 1, 'b': 2 }, function(result, n, key) {
     *   result[key] = n * 3;
     * });
     * // => { 'a': 3, 'b': 6 }
     */
    function transform(object, iteratee, accumulator, thisArg) {
      var isArr = isArray(object) || isTypedArray(object);
      iteratee = getCallback(iteratee, thisArg, 4);

      if (accumulator == null) {
        if (isArr || isObject(object)) {
          var Ctor = object.constructor;
          if (isArr) {
            accumulator = isArray(object) ? new Ctor : [];
          } else {
            accumulator = baseCreate(isFunction(Ctor) ? Ctor.prototype : undefined);
          }
        } else {
          accumulator = {};
        }
      }
      (isArr ? arrayEach : baseForOwn)(object, function(value, index, object) {
        return iteratee(accumulator, value, index, object);
      });
      return accumulator;
    }

    /**
     * Creates an array of the own enumerable property values of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property values.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.values(new Foo);
     * // => [1, 2] (iteration order is not guaranteed)
     *
     * _.values('hi');
     * // => ['h', 'i']
     */
    function values(object) {
      return baseValues(object, keys(object));
    }

    /**
     * Creates an array of the own and inherited enumerable property values
     * of `object`.
     *
     * **Note:** Non-object values are coerced to objects.
     *
     * @static
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property values.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.valuesIn(new Foo);
     * // => [1, 2, 3] (iteration order is not guaranteed)
     */
    function valuesIn(object) {
      return baseValues(object, keysIn(object));
    }

    /*------------------------------------------------------------------------*/

    /**
     * Checks if `n` is between `start` and up to but not including, `end`. If
     * `end` is not specified it is set to `start` with `start` then set to `0`.
     *
     * @static
     * @memberOf _
     * @category Number
     * @param {number} n The number to check.
     * @param {number} [start=0] The start of the range.
     * @param {number} end The end of the range.
     * @returns {boolean} Returns `true` if `n` is in the range, else `false`.
     * @example
     *
     * _.inRange(3, 2, 4);
     * // => true
     *
     * _.inRange(4, 8);
     * // => true
     *
     * _.inRange(4, 2);
     * // => false
     *
     * _.inRange(2, 2);
     * // => false
     *
     * _.inRange(1.2, 2);
     * // => true
     *
     * _.inRange(5.2, 4);
     * // => false
     */
    function inRange(value, start, end) {
      start = +start || 0;
      if (end === undefined) {
        end = start;
        start = 0;
      } else {
        end = +end || 0;
      }
      return value >= nativeMin(start, end) && value < nativeMax(start, end);
    }

    /**
     * Produces a random number between `min` and `max` (inclusive). If only one
     * argument is provided a number between `0` and the given number is returned.
     * If `floating` is `true`, or either `min` or `max` are floats, a floating-point
     * number is returned instead of an integer.
     *
     * @static
     * @memberOf _
     * @category Number
     * @param {number} [min=0] The minimum possible value.
     * @param {number} [max=1] The maximum possible value.
     * @param {boolean} [floating] Specify returning a floating-point number.
     * @returns {number} Returns the random number.
     * @example
     *
     * _.random(0, 5);
     * // => an integer between 0 and 5
     *
     * _.random(5);
     * // => also an integer between 0 and 5
     *
     * _.random(5, true);
     * // => a floating-point number between 0 and 5
     *
     * _.random(1.2, 5.2);
     * // => a floating-point number between 1.2 and 5.2
     */
    function random(min, max, floating) {
      if (floating && isIterateeCall(min, max, floating)) {
        max = floating = undefined;
      }
      var noMin = min == null,
          noMax = max == null;

      if (floating == null) {
        if (noMax && typeof min == 'boolean') {
          floating = min;
          min = 1;
        }
        else if (typeof max == 'boolean') {
          floating = max;
          noMax = true;
        }
      }
      if (noMin && noMax) {
        max = 1;
        noMax = false;
      }
      min = +min || 0;
      if (noMax) {
        max = min;
        min = 0;
      } else {
        max = +max || 0;
      }
      if (floating || min % 1 || max % 1) {
        var rand = nativeRandom();
        return nativeMin(min + (rand * (max - min + parseFloat('1e-' + ((rand + '').length - 1)))), max);
      }
      return baseRandom(min, max);
    }

    /*------------------------------------------------------------------------*/

    /**
     * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the camel cased string.
     * @example
     *
     * _.camelCase('Foo Bar');
     * // => 'fooBar'
     *
     * _.camelCase('--foo-bar');
     * // => 'fooBar'
     *
     * _.camelCase('__foo_bar__');
     * // => 'fooBar'
     */
    var camelCase = createCompounder(function(result, word, index) {
      word = word.toLowerCase();
      return result + (index ? (word.charAt(0).toUpperCase() + word.slice(1)) : word);
    });

    /**
     * Capitalizes the first character of `string`.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to capitalize.
     * @returns {string} Returns the capitalized string.
     * @example
     *
     * _.capitalize('fred');
     * // => 'Fred'
     */
    function capitalize(string) {
      string = baseToString(string);
      return string && (string.charAt(0).toUpperCase() + string.slice(1));
    }

    /**
     * Deburrs `string` by converting [latin-1 supplementary letters](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
     * to basic latin letters and removing [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to deburr.
     * @returns {string} Returns the deburred string.
     * @example
     *
     * _.deburr('déjà vu');
     * // => 'deja vu'
     */
    function deburr(string) {
      string = baseToString(string);
      return string && string.replace(reLatin1, deburrLetter).replace(reComboMark, '');
    }

    /**
     * Checks if `string` ends with the given target string.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to search.
     * @param {string} [target] The string to search for.
     * @param {number} [position=string.length] The position to search from.
     * @returns {boolean} Returns `true` if `string` ends with `target`, else `false`.
     * @example
     *
     * _.endsWith('abc', 'c');
     * // => true
     *
     * _.endsWith('abc', 'b');
     * // => false
     *
     * _.endsWith('abc', 'b', 2);
     * // => true
     */
    function endsWith(string, target, position) {
      string = baseToString(string);
      target = (target + '');

      var length = string.length;
      position = position === undefined
        ? length
        : nativeMin(position < 0 ? 0 : (+position || 0), length);

      position -= target.length;
      return position >= 0 && string.indexOf(target, position) == position;
    }

    /**
     * Converts the characters "&", "<", ">", '"', "'", and "\`", in `string` to
     * their corresponding HTML entities.
     *
     * **Note:** No other characters are escaped. To escape additional characters
     * use a third-party library like [_he_](https://mths.be/he).
     *
     * Though the ">" character is escaped for symmetry, characters like
     * ">" and "/" don't need escaping in HTML and have no special meaning
     * unless they're part of a tag or unquoted attribute value.
     * See [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
     * (under "semi-related fun fact") for more details.
     *
     * Backticks are escaped because in Internet Explorer < 9, they can break out
     * of attribute values or HTML comments. See [#59](https://html5sec.org/#59),
     * [#102](https://html5sec.org/#102), [#108](https://html5sec.org/#108), and
     * [#133](https://html5sec.org/#133) of the [HTML5 Security Cheatsheet](https://html5sec.org/)
     * for more details.
     *
     * When working with HTML you should always [quote attribute values](http://wonko.com/post/html-escaping)
     * to reduce XSS vectors.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to escape.
     * @returns {string} Returns the escaped string.
     * @example
     *
     * _.escape('fred, barney, & pebbles');
     * // => 'fred, barney, &amp; pebbles'
     */
    function escape(string) {
      // Reset `lastIndex` because in IE < 9 `String#replace` does not.
      string = baseToString(string);
      return (string && reHasUnescapedHtml.test(string))
        ? string.replace(reUnescapedHtml, escapeHtmlChar)
        : string;
    }

    /**
     * Escapes the `RegExp` special characters "\", "/", "^", "$", ".", "|", "?",
     * "*", "+", "(", ")", "[", "]", "{" and "}" in `string`.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to escape.
     * @returns {string} Returns the escaped string.
     * @example
     *
     * _.escapeRegExp('[lodash](https://lodash.com/)');
     * // => '\[lodash\]\(https:\/\/lodash\.com\/\)'
     */
    function escapeRegExp(string) {
      string = baseToString(string);
      return (string && reHasRegExpChars.test(string))
        ? string.replace(reRegExpChars, escapeRegExpChar)
        : (string || '(?:)');
    }

    /**
     * Converts `string` to [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the kebab cased string.
     * @example
     *
     * _.kebabCase('Foo Bar');
     * // => 'foo-bar'
     *
     * _.kebabCase('fooBar');
     * // => 'foo-bar'
     *
     * _.kebabCase('__foo_bar__');
     * // => 'foo-bar'
     */
    var kebabCase = createCompounder(function(result, word, index) {
      return result + (index ? '-' : '') + word.toLowerCase();
    });

    /**
     * Pads `string` on the left and right sides if it's shorter than `length`.
     * Padding characters are truncated if they can't be evenly divided by `length`.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to pad.
     * @param {number} [length=0] The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padded string.
     * @example
     *
     * _.pad('abc', 8);
     * // => '  abc   '
     *
     * _.pad('abc', 8, '_-');
     * // => '_-abc_-_'
     *
     * _.pad('abc', 3);
     * // => 'abc'
     */
    function pad(string, length, chars) {
      string = baseToString(string);
      length = +length;

      var strLength = string.length;
      if (strLength >= length || !nativeIsFinite(length)) {
        return string;
      }
      var mid = (length - strLength) / 2,
          leftLength = nativeFloor(mid),
          rightLength = nativeCeil(mid);

      chars = createPadding('', rightLength, chars);
      return chars.slice(0, leftLength) + string + chars;
    }

    /**
     * Pads `string` on the left side if it's shorter than `length`. Padding
     * characters are truncated if they exceed `length`.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to pad.
     * @param {number} [length=0] The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padded string.
     * @example
     *
     * _.padLeft('abc', 6);
     * // => '   abc'
     *
     * _.padLeft('abc', 6, '_-');
     * // => '_-_abc'
     *
     * _.padLeft('abc', 3);
     * // => 'abc'
     */
    var padLeft = createPadDir();

    /**
     * Pads `string` on the right side if it's shorter than `length`. Padding
     * characters are truncated if they exceed `length`.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to pad.
     * @param {number} [length=0] The padding length.
     * @param {string} [chars=' '] The string used as padding.
     * @returns {string} Returns the padded string.
     * @example
     *
     * _.padRight('abc', 6);
     * // => 'abc   '
     *
     * _.padRight('abc', 6, '_-');
     * // => 'abc_-_'
     *
     * _.padRight('abc', 3);
     * // => 'abc'
     */
    var padRight = createPadDir(true);

    /**
     * Converts `string` to an integer of the specified radix. If `radix` is
     * `undefined` or `0`, a `radix` of `10` is used unless `value` is a hexadecimal,
     * in which case a `radix` of `16` is used.
     *
     * **Note:** This method aligns with the [ES5 implementation](https://es5.github.io/#E)
     * of `parseInt`.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} string The string to convert.
     * @param {number} [radix] The radix to interpret `value` by.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {number} Returns the converted integer.
     * @example
     *
     * _.parseInt('08');
     * // => 8
     *
     * _.map(['6', '08', '10'], _.parseInt);
     * // => [6, 8, 10]
     */
    function parseInt(string, radix, guard) {
      // Firefox < 21 and Opera < 15 follow ES3 for `parseInt`.
      // Chrome fails to trim leading <BOM> whitespace characters.
      // See https://code.google.com/p/v8/issues/detail?id=3109 for more details.
      if (guard ? isIterateeCall(string, radix, guard) : radix == null) {
        radix = 0;
      } else if (radix) {
        radix = +radix;
      }
      string = trim(string);
      return nativeParseInt(string, radix || (reHasHexPrefix.test(string) ? 16 : 10));
    }

    /**
     * Repeats the given string `n` times.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to repeat.
     * @param {number} [n=0] The number of times to repeat the string.
     * @returns {string} Returns the repeated string.
     * @example
     *
     * _.repeat('*', 3);
     * // => '***'
     *
     * _.repeat('abc', 2);
     * // => 'abcabc'
     *
     * _.repeat('abc', 0);
     * // => ''
     */
    function repeat(string, n) {
      var result = '';
      string = baseToString(string);
      n = +n;
      if (n < 1 || !string || !nativeIsFinite(n)) {
        return result;
      }
      // Leverage the exponentiation by squaring algorithm for a faster repeat.
      // See https://en.wikipedia.org/wiki/Exponentiation_by_squaring for more details.
      do {
        if (n % 2) {
          result += string;
        }
        n = nativeFloor(n / 2);
        string += string;
      } while (n);

      return result;
    }

    /**
     * Converts `string` to [snake case](https://en.wikipedia.org/wiki/Snake_case).
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the snake cased string.
     * @example
     *
     * _.snakeCase('Foo Bar');
     * // => 'foo_bar'
     *
     * _.snakeCase('fooBar');
     * // => 'foo_bar'
     *
     * _.snakeCase('--foo-bar');
     * // => 'foo_bar'
     */
    var snakeCase = createCompounder(function(result, word, index) {
      return result + (index ? '_' : '') + word.toLowerCase();
    });

    /**
     * Converts `string` to [start case](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage).
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to convert.
     * @returns {string} Returns the start cased string.
     * @example
     *
     * _.startCase('--foo-bar');
     * // => 'Foo Bar'
     *
     * _.startCase('fooBar');
     * // => 'Foo Bar'
     *
     * _.startCase('__foo_bar__');
     * // => 'Foo Bar'
     */
    var startCase = createCompounder(function(result, word, index) {
      return result + (index ? ' ' : '') + (word.charAt(0).toUpperCase() + word.slice(1));
    });

    /**
     * Checks if `string` starts with the given target string.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to search.
     * @param {string} [target] The string to search for.
     * @param {number} [position=0] The position to search from.
     * @returns {boolean} Returns `true` if `string` starts with `target`, else `false`.
     * @example
     *
     * _.startsWith('abc', 'a');
     * // => true
     *
     * _.startsWith('abc', 'b');
     * // => false
     *
     * _.startsWith('abc', 'b', 1);
     * // => true
     */
    function startsWith(string, target, position) {
      string = baseToString(string);
      position = position == null
        ? 0
        : nativeMin(position < 0 ? 0 : (+position || 0), string.length);

      return string.lastIndexOf(target, position) == position;
    }

    /**
     * Creates a compiled template function that can interpolate data properties
     * in "interpolate" delimiters, HTML-escape interpolated data properties in
     * "escape" delimiters, and execute JavaScript in "evaluate" delimiters. Data
     * properties may be accessed as free variables in the template. If a setting
     * object is provided it takes precedence over `_.templateSettings` values.
     *
     * **Note:** In the development build `_.template` utilizes
     * [sourceURLs](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl)
     * for easier debugging.
     *
     * For more information on precompiling templates see
     * [lodash's custom builds documentation](https://lodash.com/custom-builds).
     *
     * For more information on Chrome extension sandboxes see
     * [Chrome's extensions documentation](https://developer.chrome.com/extensions/sandboxingEval).
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The template string.
     * @param {Object} [options] The options object.
     * @param {RegExp} [options.escape] The HTML "escape" delimiter.
     * @param {RegExp} [options.evaluate] The "evaluate" delimiter.
     * @param {Object} [options.imports] An object to import into the template as free variables.
     * @param {RegExp} [options.interpolate] The "interpolate" delimiter.
     * @param {string} [options.sourceURL] The sourceURL of the template's compiled source.
     * @param {string} [options.variable] The data object variable name.
     * @param- {Object} [otherOptions] Enables the legacy `options` param signature.
     * @returns {Function} Returns the compiled template function.
     * @example
     *
     * // using the "interpolate" delimiter to create a compiled template
     * var compiled = _.template('hello <%= user %>!');
     * compiled({ 'user': 'fred' });
     * // => 'hello fred!'
     *
     * // using the HTML "escape" delimiter to escape data property values
     * var compiled = _.template('<b><%- value %></b>');
     * compiled({ 'value': '<script>' });
     * // => '<b>&lt;script&gt;</b>'
     *
     * // using the "evaluate" delimiter to execute JavaScript and generate HTML
     * var compiled = _.template('<% _.forEach(users, function(user) { %><li><%- user %></li><% }); %>');
     * compiled({ 'users': ['fred', 'barney'] });
     * // => '<li>fred</li><li>barney</li>'
     *
     * // using the internal `print` function in "evaluate" delimiters
     * var compiled = _.template('<% print("hello " + user); %>!');
     * compiled({ 'user': 'barney' });
     * // => 'hello barney!'
     *
     * // using the ES delimiter as an alternative to the default "interpolate" delimiter
     * var compiled = _.template('hello ${ user }!');
     * compiled({ 'user': 'pebbles' });
     * // => 'hello pebbles!'
     *
     * // using custom template delimiters
     * _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
     * var compiled = _.template('hello {{ user }}!');
     * compiled({ 'user': 'mustache' });
     * // => 'hello mustache!'
     *
     * // using backslashes to treat delimiters as plain text
     * var compiled = _.template('<%= "\\<%- value %\\>" %>');
     * compiled({ 'value': 'ignored' });
     * // => '<%- value %>'
     *
     * // using the `imports` option to import `jQuery` as `jq`
     * var text = '<% jq.each(users, function(user) { %><li><%- user %></li><% }); %>';
     * var compiled = _.template(text, { 'imports': { 'jq': jQuery } });
     * compiled({ 'users': ['fred', 'barney'] });
     * // => '<li>fred</li><li>barney</li>'
     *
     * // using the `sourceURL` option to specify a custom sourceURL for the template
     * var compiled = _.template('hello <%= user %>!', { 'sourceURL': '/basic/greeting.jst' });
     * compiled(data);
     * // => find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector
     *
     * // using the `variable` option to ensure a with-statement isn't used in the compiled template
     * var compiled = _.template('hi <%= data.user %>!', { 'variable': 'data' });
     * compiled.source;
     * // => function(data) {
     * //   var __t, __p = '';
     * //   __p += 'hi ' + ((__t = ( data.user )) == null ? '' : __t) + '!';
     * //   return __p;
     * // }
     *
     * // using the `source` property to inline compiled templates for meaningful
     * // line numbers in error messages and a stack trace
     * fs.writeFileSync(path.join(cwd, 'jst.js'), '\
     *   var JST = {\
     *     "main": ' + _.template(mainText).source + '\
     *   };\
     * ');
     */
    function template(string, options, otherOptions) {
      // Based on John Resig's `tmpl` implementation (http://ejohn.org/blog/javascript-micro-templating/)
      // and Laura Doktorova's doT.js (https://github.com/olado/doT).
      var settings = lodash.templateSettings;

      if (otherOptions && isIterateeCall(string, options, otherOptions)) {
        options = otherOptions = undefined;
      }
      string = baseToString(string);
      options = assignWith(baseAssign({}, otherOptions || options), settings, assignOwnDefaults);

      var imports = assignWith(baseAssign({}, options.imports), settings.imports, assignOwnDefaults),
          importsKeys = keys(imports),
          importsValues = baseValues(imports, importsKeys);

      var isEscaping,
          isEvaluating,
          index = 0,
          interpolate = options.interpolate || reNoMatch,
          source = "__p += '";

      // Compile the regexp to match each delimiter.
      var reDelimiters = RegExp(
        (options.escape || reNoMatch).source + '|' +
        interpolate.source + '|' +
        (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' +
        (options.evaluate || reNoMatch).source + '|$'
      , 'g');

      // Use a sourceURL for easier debugging.
      var sourceURL = '//# sourceURL=' +
        ('sourceURL' in options
          ? options.sourceURL
          : ('lodash.templateSources[' + (++templateCounter) + ']')
        ) + '\n';

      string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
        interpolateValue || (interpolateValue = esTemplateValue);

        // Escape characters that can't be included in string literals.
        source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);

        // Replace delimiters with snippets.
        if (escapeValue) {
          isEscaping = true;
          source += "' +\n__e(" + escapeValue + ") +\n'";
        }
        if (evaluateValue) {
          isEvaluating = true;
          source += "';\n" + evaluateValue + ";\n__p += '";
        }
        if (interpolateValue) {
          source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
        }
        index = offset + match.length;

        // The JS engine embedded in Adobe products requires returning the `match`
        // string in order to produce the correct `offset` value.
        return match;
      });

      source += "';\n";

      // If `variable` is not specified wrap a with-statement around the generated
      // code to add the data object to the top of the scope chain.
      var variable = options.variable;
      if (!variable) {
        source = 'with (obj) {\n' + source + '\n}\n';
      }
      // Cleanup code by stripping empty strings.
      source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source)
        .replace(reEmptyStringMiddle, '$1')
        .replace(reEmptyStringTrailing, '$1;');

      // Frame code as the function body.
      source = 'function(' + (variable || 'obj') + ') {\n' +
        (variable
          ? ''
          : 'obj || (obj = {});\n'
        ) +
        "var __t, __p = ''" +
        (isEscaping
           ? ', __e = _.escape'
           : ''
        ) +
        (isEvaluating
          ? ', __j = Array.prototype.join;\n' +
            "function print() { __p += __j.call(arguments, '') }\n"
          : ';\n'
        ) +
        source +
        'return __p\n}';

      var result = attempt(function() {
        return Function(importsKeys, sourceURL + 'return ' + source).apply(undefined, importsValues);
      });

      // Provide the compiled function's source by its `toString` method or
      // the `source` property as a convenience for inlining compiled templates.
      result.source = source;
      if (isError(result)) {
        throw result;
      }
      return result;
    }

    /**
     * Removes leading and trailing whitespace or specified characters from `string`.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to trim.
     * @param {string} [chars=whitespace] The characters to trim.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {string} Returns the trimmed string.
     * @example
     *
     * _.trim('  abc  ');
     * // => 'abc'
     *
     * _.trim('-_-abc-_-', '_-');
     * // => 'abc'
     *
     * _.map(['  foo  ', '  bar  '], _.trim);
     * // => ['foo', 'bar']
     */
    function trim(string, chars, guard) {
      var value = string;
      string = baseToString(string);
      if (!string) {
        return string;
      }
      if (guard ? isIterateeCall(value, chars, guard) : chars == null) {
        return string.slice(trimmedLeftIndex(string), trimmedRightIndex(string) + 1);
      }
      chars = (chars + '');
      return string.slice(charsLeftIndex(string, chars), charsRightIndex(string, chars) + 1);
    }

    /**
     * Removes leading whitespace or specified characters from `string`.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to trim.
     * @param {string} [chars=whitespace] The characters to trim.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {string} Returns the trimmed string.
     * @example
     *
     * _.trimLeft('  abc  ');
     * // => 'abc  '
     *
     * _.trimLeft('-_-abc-_-', '_-');
     * // => 'abc-_-'
     */
    function trimLeft(string, chars, guard) {
      var value = string;
      string = baseToString(string);
      if (!string) {
        return string;
      }
      if (guard ? isIterateeCall(value, chars, guard) : chars == null) {
        return string.slice(trimmedLeftIndex(string));
      }
      return string.slice(charsLeftIndex(string, (chars + '')));
    }

    /**
     * Removes trailing whitespace or specified characters from `string`.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to trim.
     * @param {string} [chars=whitespace] The characters to trim.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {string} Returns the trimmed string.
     * @example
     *
     * _.trimRight('  abc  ');
     * // => '  abc'
     *
     * _.trimRight('-_-abc-_-', '_-');
     * // => '-_-abc'
     */
    function trimRight(string, chars, guard) {
      var value = string;
      string = baseToString(string);
      if (!string) {
        return string;
      }
      if (guard ? isIterateeCall(value, chars, guard) : chars == null) {
        return string.slice(0, trimmedRightIndex(string) + 1);
      }
      return string.slice(0, charsRightIndex(string, (chars + '')) + 1);
    }

    /**
     * Truncates `string` if it's longer than the given maximum string length.
     * The last characters of the truncated string are replaced with the omission
     * string which defaults to "...".
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to truncate.
     * @param {Object|number} [options] The options object or maximum string length.
     * @param {number} [options.length=30] The maximum string length.
     * @param {string} [options.omission='...'] The string to indicate text is omitted.
     * @param {RegExp|string} [options.separator] The separator pattern to truncate to.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {string} Returns the truncated string.
     * @example
     *
     * _.trunc('hi-diddly-ho there, neighborino');
     * // => 'hi-diddly-ho there, neighbo...'
     *
     * _.trunc('hi-diddly-ho there, neighborino', 24);
     * // => 'hi-diddly-ho there, n...'
     *
     * _.trunc('hi-diddly-ho there, neighborino', {
     *   'length': 24,
     *   'separator': ' '
     * });
     * // => 'hi-diddly-ho there,...'
     *
     * _.trunc('hi-diddly-ho there, neighborino', {
     *   'length': 24,
     *   'separator': /,? +/
     * });
     * // => 'hi-diddly-ho there...'
     *
     * _.trunc('hi-diddly-ho there, neighborino', {
     *   'omission': ' [...]'
     * });
     * // => 'hi-diddly-ho there, neig [...]'
     */
    function trunc(string, options, guard) {
      if (guard && isIterateeCall(string, options, guard)) {
        options = undefined;
      }
      var length = DEFAULT_TRUNC_LENGTH,
          omission = DEFAULT_TRUNC_OMISSION;

      if (options != null) {
        if (isObject(options)) {
          var separator = 'separator' in options ? options.separator : separator;
          length = 'length' in options ? (+options.length || 0) : length;
          omission = 'omission' in options ? baseToString(options.omission) : omission;
        } else {
          length = +options || 0;
        }
      }
      string = baseToString(string);
      if (length >= string.length) {
        return string;
      }
      var end = length - omission.length;
      if (end < 1) {
        return omission;
      }
      var result = string.slice(0, end);
      if (separator == null) {
        return result + omission;
      }
      if (isRegExp(separator)) {
        if (string.slice(end).search(separator)) {
          var match,
              newEnd,
              substring = string.slice(0, end);

          if (!separator.global) {
            separator = RegExp(separator.source, (reFlags.exec(separator) || '') + 'g');
          }
          separator.lastIndex = 0;
          while ((match = separator.exec(substring))) {
            newEnd = match.index;
          }
          result = result.slice(0, newEnd == null ? end : newEnd);
        }
      } else if (string.indexOf(separator, end) != end) {
        var index = result.lastIndexOf(separator);
        if (index > -1) {
          result = result.slice(0, index);
        }
      }
      return result + omission;
    }

    /**
     * The inverse of `_.escape`; this method converts the HTML entities
     * `&amp;`, `&lt;`, `&gt;`, `&quot;`, `&#39;`, and `&#96;` in `string` to their
     * corresponding characters.
     *
     * **Note:** No other HTML entities are unescaped. To unescape additional HTML
     * entities use a third-party library like [_he_](https://mths.be/he).
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to unescape.
     * @returns {string} Returns the unescaped string.
     * @example
     *
     * _.unescape('fred, barney, &amp; pebbles');
     * // => 'fred, barney, & pebbles'
     */
    function unescape(string) {
      string = baseToString(string);
      return (string && reHasEscapedHtml.test(string))
        ? string.replace(reEscapedHtml, unescapeHtmlChar)
        : string;
    }

    /**
     * Splits `string` into an array of its words.
     *
     * @static
     * @memberOf _
     * @category String
     * @param {string} [string=''] The string to inspect.
     * @param {RegExp|string} [pattern] The pattern to match words.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Array} Returns the words of `string`.
     * @example
     *
     * _.words('fred, barney, & pebbles');
     * // => ['fred', 'barney', 'pebbles']
     *
     * _.words('fred, barney, & pebbles', /[^, ]+/g);
     * // => ['fred', 'barney', '&', 'pebbles']
     */
    function words(string, pattern, guard) {
      if (guard && isIterateeCall(string, pattern, guard)) {
        pattern = undefined;
      }
      string = baseToString(string);
      return string.match(pattern || reWords) || [];
    }

    /*------------------------------------------------------------------------*/

    /**
     * Attempts to invoke `func`, returning either the result or the caught error
     * object. Any additional arguments are provided to `func` when it is invoked.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {Function} func The function to attempt.
     * @returns {*} Returns the `func` result or error object.
     * @example
     *
     * // avoid throwing errors for invalid selectors
     * var elements = _.attempt(function(selector) {
     *   return document.querySelectorAll(selector);
     * }, '>_>');
     *
     * if (_.isError(elements)) {
     *   elements = [];
     * }
     */
    var attempt = restParam(function(func, args) {
      try {
        return func.apply(undefined, args);
      } catch(e) {
        return isError(e) ? e : new Error(e);
      }
    });

    /**
     * Creates a function that invokes `func` with the `this` binding of `thisArg`
     * and arguments of the created function. If `func` is a property name the
     * created callback returns the property value for a given element. If `func`
     * is an object the created callback returns `true` for elements that contain
     * the equivalent object properties, otherwise it returns `false`.
     *
     * @static
     * @memberOf _
     * @alias iteratee
     * @category Utility
     * @param {*} [func=_.identity] The value to convert to a callback.
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
     * @returns {Function} Returns the callback.
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36 },
     *   { 'user': 'fred',   'age': 40 }
     * ];
     *
     * // wrap to create custom callback shorthands
     * _.callback = _.wrap(_.callback, function(callback, func, thisArg) {
     *   var match = /^(.+?)__([gl]t)(.+)$/.exec(func);
     *   if (!match) {
     *     return callback(func, thisArg);
     *   }
     *   return function(object) {
     *     return match[2] == 'gt'
     *       ? object[match[1]] > match[3]
     *       : object[match[1]] < match[3];
     *   };
     * });
     *
     * _.filter(users, 'age__gt36');
     * // => [{ 'user': 'fred', 'age': 40 }]
     */
    function callback(func, thisArg, guard) {
      if (guard && isIterateeCall(func, thisArg, guard)) {
        thisArg = undefined;
      }
      return isObjectLike(func)
        ? matches(func)
        : baseCallback(func, thisArg);
    }

    /**
     * Creates a function that returns `value`.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {*} value The value to return from the new function.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var object = { 'user': 'fred' };
     * var getter = _.constant(object);
     *
     * getter() === object;
     * // => true
     */
    function constant(value) {
      return function() {
        return value;
      };
    }

    /**
     * This method returns the first argument provided to it.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {*} value Any value.
     * @returns {*} Returns `value`.
     * @example
     *
     * var object = { 'user': 'fred' };
     *
     * _.identity(object) === object;
     * // => true
     */
    function identity(value) {
      return value;
    }

    /**
     * Creates a function that performs a deep comparison between a given object
     * and `source`, returning `true` if the given object has equivalent property
     * values, else `false`.
     *
     * **Note:** This method supports comparing arrays, booleans, `Date` objects,
     * numbers, `Object` objects, regexes, and strings. Objects are compared by
     * their own, not inherited, enumerable properties. For comparing a single
     * own or inherited property value see `_.matchesProperty`.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {Object} source The object of property values to match.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36, 'active': true },
     *   { 'user': 'fred',   'age': 40, 'active': false }
     * ];
     *
     * _.filter(users, _.matches({ 'age': 40, 'active': false }));
     * // => [{ 'user': 'fred', 'age': 40, 'active': false }]
     */
    function matches(source) {
      return baseMatches(baseClone(source, true));
    }

    /**
     * Creates a function that compares the property value of `path` on a given
     * object to `value`.
     *
     * **Note:** This method supports comparing arrays, booleans, `Date` objects,
     * numbers, `Object` objects, regexes, and strings. Objects are compared by
     * their own, not inherited, enumerable properties.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {Array|string} path The path of the property to get.
     * @param {*} srcValue The value to match.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var users = [
     *   { 'user': 'barney' },
     *   { 'user': 'fred' }
     * ];
     *
     * _.find(users, _.matchesProperty('user', 'fred'));
     * // => { 'user': 'fred' }
     */
    function matchesProperty(path, srcValue) {
      return baseMatchesProperty(path, baseClone(srcValue, true));
    }

    /**
     * Creates a function that invokes the method at `path` on a given object.
     * Any additional arguments are provided to the invoked method.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {Array|string} path The path of the method to invoke.
     * @param {...*} [args] The arguments to invoke the method with.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var objects = [
     *   { 'a': { 'b': { 'c': _.constant(2) } } },
     *   { 'a': { 'b': { 'c': _.constant(1) } } }
     * ];
     *
     * _.map(objects, _.method('a.b.c'));
     * // => [2, 1]
     *
     * _.invoke(_.sortBy(objects, _.method(['a', 'b', 'c'])), 'a.b.c');
     * // => [1, 2]
     */
    var method = restParam(function(path, args) {
      return function(object) {
        return invokePath(object, path, args);
      };
    });

    /**
     * The opposite of `_.method`; this method creates a function that invokes
     * the method at a given path on `object`. Any additional arguments are
     * provided to the invoked method.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {Object} object The object to query.
     * @param {...*} [args] The arguments to invoke the method with.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var array = _.times(3, _.constant),
     *     object = { 'a': array, 'b': array, 'c': array };
     *
     * _.map(['a[2]', 'c[0]'], _.methodOf(object));
     * // => [2, 0]
     *
     * _.map([['a', '2'], ['c', '0']], _.methodOf(object));
     * // => [2, 0]
     */
    var methodOf = restParam(function(object, args) {
      return function(path) {
        return invokePath(object, path, args);
      };
    });

    /**
     * Adds all own enumerable function properties of a source object to the
     * destination object. If `object` is a function then methods are added to
     * its prototype as well.
     *
     * **Note:** Use `_.runInContext` to create a pristine `lodash` function to
     * avoid conflicts caused by modifying the original.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {Function|Object} [object=lodash] The destination object.
     * @param {Object} source The object of functions to add.
     * @param {Object} [options] The options object.
     * @param {boolean} [options.chain=true] Specify whether the functions added
     *  are chainable.
     * @returns {Function|Object} Returns `object`.
     * @example
     *
     * function vowels(string) {
     *   return _.filter(string, function(v) {
     *     return /[aeiou]/i.test(v);
     *   });
     * }
     *
     * _.mixin({ 'vowels': vowels });
     * _.vowels('fred');
     * // => ['e']
     *
     * _('fred').vowels().value();
     * // => ['e']
     *
     * _.mixin({ 'vowels': vowels }, { 'chain': false });
     * _('fred').vowels();
     * // => ['e']
     */
    function mixin(object, source, options) {
      if (options == null) {
        var isObj = isObject(source),
            props = isObj ? keys(source) : undefined,
            methodNames = (props && props.length) ? baseFunctions(source, props) : undefined;

        if (!(methodNames ? methodNames.length : isObj)) {
          methodNames = false;
          options = source;
          source = object;
          object = this;
        }
      }
      if (!methodNames) {
        methodNames = baseFunctions(source, keys(source));
      }
      var chain = true,
          index = -1,
          isFunc = isFunction(object),
          length = methodNames.length;

      if (options === false) {
        chain = false;
      } else if (isObject(options) && 'chain' in options) {
        chain = options.chain;
      }
      while (++index < length) {
        var methodName = methodNames[index],
            func = source[methodName];

        object[methodName] = func;
        if (isFunc) {
          object.prototype[methodName] = (function(func) {
            return function() {
              var chainAll = this.__chain__;
              if (chain || chainAll) {
                var result = object(this.__wrapped__),
                    actions = result.__actions__ = arrayCopy(this.__actions__);

                actions.push({ 'func': func, 'args': arguments, 'thisArg': object });
                result.__chain__ = chainAll;
                return result;
              }
              return func.apply(object, arrayPush([this.value()], arguments));
            };
          }(func));
        }
      }
      return object;
    }

    /**
     * Reverts the `_` variable to its previous value and returns a reference to
     * the `lodash` function.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @returns {Function} Returns the `lodash` function.
     * @example
     *
     * var lodash = _.noConflict();
     */
    function noConflict() {
      root._ = oldDash;
      return this;
    }

    /**
     * A no-operation function that returns `undefined` regardless of the
     * arguments it receives.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @example
     *
     * var object = { 'user': 'fred' };
     *
     * _.noop(object) === undefined;
     * // => true
     */
    function noop() {
      // No operation performed.
    }

    /**
     * Creates a function that returns the property value at `path` on a
     * given object.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {Array|string} path The path of the property to get.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var objects = [
     *   { 'a': { 'b': { 'c': 2 } } },
     *   { 'a': { 'b': { 'c': 1 } } }
     * ];
     *
     * _.map(objects, _.property('a.b.c'));
     * // => [2, 1]
     *
     * _.pluck(_.sortBy(objects, _.property(['a', 'b', 'c'])), 'a.b.c');
     * // => [1, 2]
     */
    function property(path) {
      return isKey(path) ? baseProperty(path) : basePropertyDeep(path);
    }

    /**
     * The opposite of `_.property`; this method creates a function that returns
     * the property value at a given path on `object`.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {Object} object The object to query.
     * @returns {Function} Returns the new function.
     * @example
     *
     * var array = [0, 1, 2],
     *     object = { 'a': array, 'b': array, 'c': array };
     *
     * _.map(['a[2]', 'c[0]'], _.propertyOf(object));
     * // => [2, 0]
     *
     * _.map([['a', '2'], ['c', '0']], _.propertyOf(object));
     * // => [2, 0]
     */
    function propertyOf(object) {
      return function(path) {
        return baseGet(object, toPath(path), path + '');
      };
    }

    /**
     * Creates an array of numbers (positive and/or negative) progressing from
     * `start` up to, but not including, `end`. If `end` is not specified it is
     * set to `start` with `start` then set to `0`. If `end` is less than `start`
     * a zero-length range is created unless a negative `step` is specified.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {number} [start=0] The start of the range.
     * @param {number} end The end of the range.
     * @param {number} [step=1] The value to increment or decrement by.
     * @returns {Array} Returns the new array of numbers.
     * @example
     *
     * _.range(4);
     * // => [0, 1, 2, 3]
     *
     * _.range(1, 5);
     * // => [1, 2, 3, 4]
     *
     * _.range(0, 20, 5);
     * // => [0, 5, 10, 15]
     *
     * _.range(0, -4, -1);
     * // => [0, -1, -2, -3]
     *
     * _.range(1, 4, 0);
     * // => [1, 1, 1]
     *
     * _.range(0);
     * // => []
     */
    function range(start, end, step) {
      if (step && isIterateeCall(start, end, step)) {
        end = step = undefined;
      }
      start = +start || 0;
      step = step == null ? 1 : (+step || 0);

      if (end == null) {
        end = start;
        start = 0;
      } else {
        end = +end || 0;
      }
      // Use `Array(length)` so engines like Chakra and V8 avoid slower modes.
      // See https://youtu.be/XAqIpGU8ZZk#t=17m25s for more details.
      var index = -1,
          length = nativeMax(nativeCeil((end - start) / (step || 1)), 0),
          result = Array(length);

      while (++index < length) {
        result[index] = start;
        start += step;
      }
      return result;
    }

    /**
     * Invokes the iteratee function `n` times, returning an array of the results
     * of each invocation. The `iteratee` is bound to `thisArg` and invoked with
     * one argument; (index).
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {number} n The number of times to invoke `iteratee`.
     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {Array} Returns the array of results.
     * @example
     *
     * var diceRolls = _.times(3, _.partial(_.random, 1, 6, false));
     * // => [3, 6, 4]
     *
     * _.times(3, function(n) {
     *   mage.castSpell(n);
     * });
     * // => invokes `mage.castSpell(n)` three times with `n` of `0`, `1`, and `2`
     *
     * _.times(3, function(n) {
     *   this.cast(n);
     * }, mage);
     * // => also invokes `mage.castSpell(n)` three times
     */
    function times(n, iteratee, thisArg) {
      n = nativeFloor(n);

      // Exit early to avoid a JSC JIT bug in Safari 8
      // where `Array(0)` is treated as `Array(1)`.
      if (n < 1 || !nativeIsFinite(n)) {
        return [];
      }
      var index = -1,
          result = Array(nativeMin(n, MAX_ARRAY_LENGTH));

      iteratee = bindCallback(iteratee, thisArg, 1);
      while (++index < n) {
        if (index < MAX_ARRAY_LENGTH) {
          result[index] = iteratee(index);
        } else {
          iteratee(index);
        }
      }
      return result;
    }

    /**
     * Generates a unique ID. If `prefix` is provided the ID is appended to it.
     *
     * @static
     * @memberOf _
     * @category Utility
     * @param {string} [prefix] The value to prefix the ID with.
     * @returns {string} Returns the unique ID.
     * @example
     *
     * _.uniqueId('contact_');
     * // => 'contact_104'
     *
     * _.uniqueId();
     * // => '105'
     */
    function uniqueId(prefix) {
      var id = ++idCounter;
      return baseToString(prefix) + id;
    }

    /*------------------------------------------------------------------------*/

    /**
     * Adds two numbers.
     *
     * @static
     * @memberOf _
     * @category Math
     * @param {number} augend The first number to add.
     * @param {number} addend The second number to add.
     * @returns {number} Returns the sum.
     * @example
     *
     * _.add(6, 4);
     * // => 10
     */
    function add(augend, addend) {
      return (+augend || 0) + (+addend || 0);
    }

    /**
     * Calculates `n` rounded up to `precision`.
     *
     * @static
     * @memberOf _
     * @category Math
     * @param {number} n The number to round up.
     * @param {number} [precision=0] The precision to round up to.
     * @returns {number} Returns the rounded up number.
     * @example
     *
     * _.ceil(4.006);
     * // => 5
     *
     * _.ceil(6.004, 2);
     * // => 6.01
     *
     * _.ceil(6040, -2);
     * // => 6100
     */
    var ceil = createRound('ceil');

    /**
     * Calculates `n` rounded down to `precision`.
     *
     * @static
     * @memberOf _
     * @category Math
     * @param {number} n The number to round down.
     * @param {number} [precision=0] The precision to round down to.
     * @returns {number} Returns the rounded down number.
     * @example
     *
     * _.floor(4.006);
     * // => 4
     *
     * _.floor(0.046, 2);
     * // => 0.04
     *
     * _.floor(4060, -2);
     * // => 4000
     */
    var floor = createRound('floor');

    /**
     * Gets the maximum value of `collection`. If `collection` is empty or falsey
     * `-Infinity` is returned. If an iteratee function is provided it is invoked
     * for each value in `collection` to generate the criterion by which the value
     * is ranked. The `iteratee` is bound to `thisArg` and invoked with three
     * arguments: (value, index, collection).
     *
     * If a property name is provided for `iteratee` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `iteratee` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Math
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [iteratee] The function invoked per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {*} Returns the maximum value.
     * @example
     *
     * _.max([4, 2, 8, 6]);
     * // => 8
     *
     * _.max([]);
     * // => -Infinity
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36 },
     *   { 'user': 'fred',   'age': 40 }
     * ];
     *
     * _.max(users, function(chr) {
     *   return chr.age;
     * });
     * // => { 'user': 'fred', 'age': 40 }
     *
     * // using the `_.property` callback shorthand
     * _.max(users, 'age');
     * // => { 'user': 'fred', 'age': 40 }
     */
    var max = createExtremum(gt, NEGATIVE_INFINITY);

    /**
     * Gets the minimum value of `collection`. If `collection` is empty or falsey
     * `Infinity` is returned. If an iteratee function is provided it is invoked
     * for each value in `collection` to generate the criterion by which the value
     * is ranked. The `iteratee` is bound to `thisArg` and invoked with three
     * arguments: (value, index, collection).
     *
     * If a property name is provided for `iteratee` the created `_.property`
     * style callback returns the property value of the given element.
     *
     * If a value is also provided for `thisArg` the created `_.matchesProperty`
     * style callback returns `true` for elements that have a matching property
     * value, else `false`.
     *
     * If an object is provided for `iteratee` the created `_.matches` style
     * callback returns `true` for elements that have the properties of the given
     * object, else `false`.
     *
     * @static
     * @memberOf _
     * @category Math
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [iteratee] The function invoked per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {*} Returns the minimum value.
     * @example
     *
     * _.min([4, 2, 8, 6]);
     * // => 2
     *
     * _.min([]);
     * // => Infinity
     *
     * var users = [
     *   { 'user': 'barney', 'age': 36 },
     *   { 'user': 'fred',   'age': 40 }
     * ];
     *
     * _.min(users, function(chr) {
     *   return chr.age;
     * });
     * // => { 'user': 'barney', 'age': 36 }
     *
     * // using the `_.property` callback shorthand
     * _.min(users, 'age');
     * // => { 'user': 'barney', 'age': 36 }
     */
    var min = createExtremum(lt, POSITIVE_INFINITY);

    /**
     * Calculates `n` rounded to `precision`.
     *
     * @static
     * @memberOf _
     * @category Math
     * @param {number} n The number to round.
     * @param {number} [precision=0] The precision to round to.
     * @returns {number} Returns the rounded number.
     * @example
     *
     * _.round(4.006);
     * // => 4
     *
     * _.round(4.006, 2);
     * // => 4.01
     *
     * _.round(4060, -2);
     * // => 4100
     */
    var round = createRound('round');

    /**
     * Gets the sum of the values in `collection`.
     *
     * @static
     * @memberOf _
     * @category Math
     * @param {Array|Object|string} collection The collection to iterate over.
     * @param {Function|Object|string} [iteratee] The function invoked per iteration.
     * @param {*} [thisArg] The `this` binding of `iteratee`.
     * @returns {number} Returns the sum.
     * @example
     *
     * _.sum([4, 6]);
     * // => 10
     *
     * _.sum({ 'a': 4, 'b': 6 });
     * // => 10
     *
     * var objects = [
     *   { 'n': 4 },
     *   { 'n': 6 }
     * ];
     *
     * _.sum(objects, function(object) {
     *   return object.n;
     * });
     * // => 10
     *
     * // using the `_.property` callback shorthand
     * _.sum(objects, 'n');
     * // => 10
     */
    function sum(collection, iteratee, thisArg) {
      if (thisArg && isIterateeCall(collection, iteratee, thisArg)) {
        iteratee = undefined;
      }
      iteratee = getCallback(iteratee, thisArg, 3);
      return iteratee.length == 1
        ? arraySum(isArray(collection) ? collection : toIterable(collection), iteratee)
        : baseSum(collection, iteratee);
    }

    /*------------------------------------------------------------------------*/

    // Ensure wrappers are instances of `baseLodash`.
    lodash.prototype = baseLodash.prototype;

    LodashWrapper.prototype = baseCreate(baseLodash.prototype);
    LodashWrapper.prototype.constructor = LodashWrapper;

    LazyWrapper.prototype = baseCreate(baseLodash.prototype);
    LazyWrapper.prototype.constructor = LazyWrapper;

    // Add functions to the `Map` cache.
    MapCache.prototype['delete'] = mapDelete;
    MapCache.prototype.get = mapGet;
    MapCache.prototype.has = mapHas;
    MapCache.prototype.set = mapSet;

    // Add functions to the `Set` cache.
    SetCache.prototype.push = cachePush;

    // Assign cache to `_.memoize`.
    memoize.Cache = MapCache;

    // Add functions that return wrapped values when chaining.
    lodash.after = after;
    lodash.ary = ary;
    lodash.assign = assign;
    lodash.at = at;
    lodash.before = before;
    lodash.bind = bind;
    lodash.bindAll = bindAll;
    lodash.bindKey = bindKey;
    lodash.callback = callback;
    lodash.chain = chain;
    lodash.chunk = chunk;
    lodash.compact = compact;
    lodash.constant = constant;
    lodash.countBy = countBy;
    lodash.create = create;
    lodash.curry = curry;
    lodash.curryRight = curryRight;
    lodash.debounce = debounce;
    lodash.defaults = defaults;
    lodash.defaultsDeep = defaultsDeep;
    lodash.defer = defer;
    lodash.delay = delay;
    lodash.difference = difference;
    lodash.drop = drop;
    lodash.dropRight = dropRight;
    lodash.dropRightWhile = dropRightWhile;
    lodash.dropWhile = dropWhile;
    lodash.fill = fill;
    lodash.filter = filter;
    lodash.flatten = flatten;
    lodash.flattenDeep = flattenDeep;
    lodash.flow = flow;
    lodash.flowRight = flowRight;
    lodash.forEach = forEach;
    lodash.forEachRight = forEachRight;
    lodash.forIn = forIn;
    lodash.forInRight = forInRight;
    lodash.forOwn = forOwn;
    lodash.forOwnRight = forOwnRight;
    lodash.functions = functions;
    lodash.groupBy = groupBy;
    lodash.indexBy = indexBy;
    lodash.initial = initial;
    lodash.intersection = intersection;
    lodash.invert = invert;
    lodash.invoke = invoke;
    lodash.keys = keys;
    lodash.keysIn = keysIn;
    lodash.map = map;
    lodash.mapKeys = mapKeys;
    lodash.mapValues = mapValues;
    lodash.matches = matches;
    lodash.matchesProperty = matchesProperty;
    lodash.memoize = memoize;
    lodash.merge = merge;
    lodash.method = method;
    lodash.methodOf = methodOf;
    lodash.mixin = mixin;
    lodash.modArgs = modArgs;
    lodash.negate = negate;
    lodash.omit = omit;
    lodash.once = once;
    lodash.pairs = pairs;
    lodash.partial = partial;
    lodash.partialRight = partialRight;
    lodash.partition = partition;
    lodash.pick = pick;
    lodash.pluck = pluck;
    lodash.property = property;
    lodash.propertyOf = propertyOf;
    lodash.pull = pull;
    lodash.pullAt = pullAt;
    lodash.range = range;
    lodash.rearg = rearg;
    lodash.reject = reject;
    lodash.remove = remove;
    lodash.rest = rest;
    lodash.restParam = restParam;
    lodash.set = set;
    lodash.shuffle = shuffle;
    lodash.slice = slice;
    lodash.sortBy = sortBy;
    lodash.sortByAll = sortByAll;
    lodash.sortByOrder = sortByOrder;
    lodash.spread = spread;
    lodash.take = take;
    lodash.takeRight = takeRight;
    lodash.takeRightWhile = takeRightWhile;
    lodash.takeWhile = takeWhile;
    lodash.tap = tap;
    lodash.throttle = throttle;
    lodash.thru = thru;
    lodash.times = times;
    lodash.toArray = toArray;
    lodash.toPlainObject = toPlainObject;
    lodash.transform = transform;
    lodash.union = union;
    lodash.uniq = uniq;
    lodash.unzip = unzip;
    lodash.unzipWith = unzipWith;
    lodash.values = values;
    lodash.valuesIn = valuesIn;
    lodash.where = where;
    lodash.without = without;
    lodash.wrap = wrap;
    lodash.xor = xor;
    lodash.zip = zip;
    lodash.zipObject = zipObject;
    lodash.zipWith = zipWith;

    // Add aliases.
    lodash.backflow = flowRight;
    lodash.collect = map;
    lodash.compose = flowRight;
    lodash.each = forEach;
    lodash.eachRight = forEachRight;
    lodash.extend = assign;
    lodash.iteratee = callback;
    lodash.methods = functions;
    lodash.object = zipObject;
    lodash.select = filter;
    lodash.tail = rest;
    lodash.unique = uniq;

    // Add functions to `lodash.prototype`.
    mixin(lodash, lodash);

    /*------------------------------------------------------------------------*/

    // Add functions that return unwrapped values when chaining.
    lodash.add = add;
    lodash.attempt = attempt;
    lodash.camelCase = camelCase;
    lodash.capitalize = capitalize;
    lodash.ceil = ceil;
    lodash.clone = clone;
    lodash.cloneDeep = cloneDeep;
    lodash.deburr = deburr;
    lodash.endsWith = endsWith;
    lodash.escape = escape;
    lodash.escapeRegExp = escapeRegExp;
    lodash.every = every;
    lodash.find = find;
    lodash.findIndex = findIndex;
    lodash.findKey = findKey;
    lodash.findLast = findLast;
    lodash.findLastIndex = findLastIndex;
    lodash.findLastKey = findLastKey;
    lodash.findWhere = findWhere;
    lodash.first = first;
    lodash.floor = floor;
    lodash.get = get;
    lodash.gt = gt;
    lodash.gte = gte;
    lodash.has = has;
    lodash.identity = identity;
    lodash.includes = includes;
    lodash.indexOf = indexOf;
    lodash.inRange = inRange;
    lodash.isArguments = isArguments;
    lodash.isArray = isArray;
    lodash.isBoolean = isBoolean;
    lodash.isDate = isDate;
    lodash.isElement = isElement;
    lodash.isEmpty = isEmpty;
    lodash.isEqual = isEqual;
    lodash.isError = isError;
    lodash.isFinite = isFinite;
    lodash.isFunction = isFunction;
    lodash.isMatch = isMatch;
    lodash.isNaN = isNaN;
    lodash.isNative = isNative;
    lodash.isNull = isNull;
    lodash.isNumber = isNumber;
    lodash.isObject = isObject;
    lodash.isPlainObject = isPlainObject;
    lodash.isRegExp = isRegExp;
    lodash.isString = isString;
    lodash.isTypedArray = isTypedArray;
    lodash.isUndefined = isUndefined;
    lodash.kebabCase = kebabCase;
    lodash.last = last;
    lodash.lastIndexOf = lastIndexOf;
    lodash.lt = lt;
    lodash.lte = lte;
    lodash.max = max;
    lodash.min = min;
    lodash.noConflict = noConflict;
    lodash.noop = noop;
    lodash.now = now;
    lodash.pad = pad;
    lodash.padLeft = padLeft;
    lodash.padRight = padRight;
    lodash.parseInt = parseInt;
    lodash.random = random;
    lodash.reduce = reduce;
    lodash.reduceRight = reduceRight;
    lodash.repeat = repeat;
    lodash.result = result;
    lodash.round = round;
    lodash.runInContext = runInContext;
    lodash.size = size;
    lodash.snakeCase = snakeCase;
    lodash.some = some;
    lodash.sortedIndex = sortedIndex;
    lodash.sortedLastIndex = sortedLastIndex;
    lodash.startCase = startCase;
    lodash.startsWith = startsWith;
    lodash.sum = sum;
    lodash.template = template;
    lodash.trim = trim;
    lodash.trimLeft = trimLeft;
    lodash.trimRight = trimRight;
    lodash.trunc = trunc;
    lodash.unescape = unescape;
    lodash.uniqueId = uniqueId;
    lodash.words = words;

    // Add aliases.
    lodash.all = every;
    lodash.any = some;
    lodash.contains = includes;
    lodash.eq = isEqual;
    lodash.detect = find;
    lodash.foldl = reduce;
    lodash.foldr = reduceRight;
    lodash.head = first;
    lodash.include = includes;
    lodash.inject = reduce;

    mixin(lodash, (function() {
      var source = {};
      baseForOwn(lodash, function(func, methodName) {
        if (!lodash.prototype[methodName]) {
          source[methodName] = func;
        }
      });
      return source;
    }()), false);

    /*------------------------------------------------------------------------*/

    // Add functions capable of returning wrapped and unwrapped values when chaining.
    lodash.sample = sample;

    lodash.prototype.sample = function(n) {
      if (!this.__chain__ && n == null) {
        return sample(this.value());
      }
      return this.thru(function(value) {
        return sample(value, n);
      });
    };

    /*------------------------------------------------------------------------*/

    /**
     * The semantic version number.
     *
     * @static
     * @memberOf _
     * @type string
     */
    lodash.VERSION = VERSION;

    // Assign default placeholders.
    arrayEach(['bind', 'bindKey', 'curry', 'curryRight', 'partial', 'partialRight'], function(methodName) {
      lodash[methodName].placeholder = lodash;
    });

    // Add `LazyWrapper` methods for `_.drop` and `_.take` variants.
    arrayEach(['drop', 'take'], function(methodName, index) {
      LazyWrapper.prototype[methodName] = function(n) {
        var filtered = this.__filtered__;
        if (filtered && !index) {
          return new LazyWrapper(this);
        }
        n = n == null ? 1 : nativeMax(nativeFloor(n) || 0, 0);

        var result = this.clone();
        if (filtered) {
          result.__takeCount__ = nativeMin(result.__takeCount__, n);
        } else {
          result.__views__.push({ 'size': n, 'type': methodName + (result.__dir__ < 0 ? 'Right' : '') });
        }
        return result;
      };

      LazyWrapper.prototype[methodName + 'Right'] = function(n) {
        return this.reverse()[methodName](n).reverse();
      };
    });

    // Add `LazyWrapper` methods that accept an `iteratee` value.
    arrayEach(['filter', 'map', 'takeWhile'], function(methodName, index) {
      var type = index + 1,
          isFilter = type != LAZY_MAP_FLAG;

      LazyWrapper.prototype[methodName] = function(iteratee, thisArg) {
        var result = this.clone();
        result.__iteratees__.push({ 'iteratee': getCallback(iteratee, thisArg, 1), 'type': type });
        result.__filtered__ = result.__filtered__ || isFilter;
        return result;
      };
    });

    // Add `LazyWrapper` methods for `_.first` and `_.last`.
    arrayEach(['first', 'last'], function(methodName, index) {
      var takeName = 'take' + (index ? 'Right' : '');

      LazyWrapper.prototype[methodName] = function() {
        return this[takeName](1).value()[0];
      };
    });

    // Add `LazyWrapper` methods for `_.initial` and `_.rest`.
    arrayEach(['initial', 'rest'], function(methodName, index) {
      var dropName = 'drop' + (index ? '' : 'Right');

      LazyWrapper.prototype[methodName] = function() {
        return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
      };
    });

    // Add `LazyWrapper` methods for `_.pluck` and `_.where`.
    arrayEach(['pluck', 'where'], function(methodName, index) {
      var operationName = index ? 'filter' : 'map',
          createCallback = index ? baseMatches : property;

      LazyWrapper.prototype[methodName] = function(value) {
        return this[operationName](createCallback(value));
      };
    });

    LazyWrapper.prototype.compact = function() {
      return this.filter(identity);
    };

    LazyWrapper.prototype.reject = function(predicate, thisArg) {
      predicate = getCallback(predicate, thisArg, 1);
      return this.filter(function(value) {
        return !predicate(value);
      });
    };

    LazyWrapper.prototype.slice = function(start, end) {
      start = start == null ? 0 : (+start || 0);

      var result = this;
      if (result.__filtered__ && (start > 0 || end < 0)) {
        return new LazyWrapper(result);
      }
      if (start < 0) {
        result = result.takeRight(-start);
      } else if (start) {
        result = result.drop(start);
      }
      if (end !== undefined) {
        end = (+end || 0);
        result = end < 0 ? result.dropRight(-end) : result.take(end - start);
      }
      return result;
    };

    LazyWrapper.prototype.takeRightWhile = function(predicate, thisArg) {
      return this.reverse().takeWhile(predicate, thisArg).reverse();
    };

    LazyWrapper.prototype.toArray = function() {
      return this.take(POSITIVE_INFINITY);
    };

    // Add `LazyWrapper` methods to `lodash.prototype`.
    baseForOwn(LazyWrapper.prototype, function(func, methodName) {
      var checkIteratee = /^(?:filter|map|reject)|While$/.test(methodName),
          retUnwrapped = /^(?:first|last)$/.test(methodName),
          lodashFunc = lodash[retUnwrapped ? ('take' + (methodName == 'last' ? 'Right' : '')) : methodName];

      if (!lodashFunc) {
        return;
      }
      lodash.prototype[methodName] = function() {
        var args = retUnwrapped ? [1] : arguments,
            chainAll = this.__chain__,
            value = this.__wrapped__,
            isHybrid = !!this.__actions__.length,
            isLazy = value instanceof LazyWrapper,
            iteratee = args[0],
            useLazy = isLazy || isArray(value);

        if (useLazy && checkIteratee && typeof iteratee == 'function' && iteratee.length != 1) {
          // Avoid lazy use if the iteratee has a "length" value other than `1`.
          isLazy = useLazy = false;
        }
        var interceptor = function(value) {
          return (retUnwrapped && chainAll)
            ? lodashFunc(value, 1)[0]
            : lodashFunc.apply(undefined, arrayPush([value], args));
        };

        var action = { 'func': thru, 'args': [interceptor], 'thisArg': undefined },
            onlyLazy = isLazy && !isHybrid;

        if (retUnwrapped && !chainAll) {
          if (onlyLazy) {
            value = value.clone();
            value.__actions__.push(action);
            return func.call(value);
          }
          return lodashFunc.call(undefined, this.value())[0];
        }
        if (!retUnwrapped && useLazy) {
          value = onlyLazy ? value : new LazyWrapper(this);
          var result = func.apply(value, args);
          result.__actions__.push(action);
          return new LodashWrapper(result, chainAll);
        }
        return this.thru(interceptor);
      };
    });

    // Add `Array` and `String` methods to `lodash.prototype`.
    arrayEach(['join', 'pop', 'push', 'replace', 'shift', 'sort', 'splice', 'split', 'unshift'], function(methodName) {
      var func = (/^(?:replace|split)$/.test(methodName) ? stringProto : arrayProto)[methodName],
          chainName = /^(?:push|sort|unshift)$/.test(methodName) ? 'tap' : 'thru',
          retUnwrapped = /^(?:join|pop|replace|shift)$/.test(methodName);

      lodash.prototype[methodName] = function() {
        var args = arguments;
        if (retUnwrapped && !this.__chain__) {
          return func.apply(this.value(), args);
        }
        return this[chainName](function(value) {
          return func.apply(value, args);
        });
      };
    });

    // Map minified function names to their real names.
    baseForOwn(LazyWrapper.prototype, function(func, methodName) {
      var lodashFunc = lodash[methodName];
      if (lodashFunc) {
        var key = lodashFunc.name,
            names = realNames[key] || (realNames[key] = []);

        names.push({ 'name': methodName, 'func': lodashFunc });
      }
    });

    realNames[createHybridWrapper(undefined, BIND_KEY_FLAG).name] = [{ 'name': 'wrapper', 'func': undefined }];

    // Add functions to the lazy wrapper.
    LazyWrapper.prototype.clone = lazyClone;
    LazyWrapper.prototype.reverse = lazyReverse;
    LazyWrapper.prototype.value = lazyValue;

    // Add chaining functions to the `lodash` wrapper.
    lodash.prototype.chain = wrapperChain;
    lodash.prototype.commit = wrapperCommit;
    lodash.prototype.concat = wrapperConcat;
    lodash.prototype.plant = wrapperPlant;
    lodash.prototype.reverse = wrapperReverse;
    lodash.prototype.toString = wrapperToString;
    lodash.prototype.run = lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;

    // Add function aliases to the `lodash` wrapper.
    lodash.prototype.collect = lodash.prototype.map;
    lodash.prototype.head = lodash.prototype.first;
    lodash.prototype.select = lodash.prototype.filter;
    lodash.prototype.tail = lodash.prototype.rest;

    return lodash;
  }

  /*--------------------------------------------------------------------------*/

  // Export lodash.
  var _ = runInContext();

  // Some AMD build optimizers like r.js check for condition patterns like the following:
  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    // Expose lodash to the global object when an AMD loader is present to avoid
    // errors in cases where lodash is loaded by a script tag and not intended
    // as an AMD module. See http://requirejs.org/docs/errors.html#mismatch for
    // more details.
    root._ = _;

    // Define as an anonymous module so, through path mapping, it can be
    // referenced as the "underscore" module.
    define(function() {
      return _;
    });
  }
  // Check for `exports` after `define` in case a build optimizer adds an `exports` object.
  else if (freeExports && freeModule) {
    // Export for Node.js or RingoJS.
    if (moduleExports) {
      (freeModule.exports = _)._ = _;
    }
    // Export for Rhino with CommonJS support.
    else {
      freeExports._ = _;
    }
  }
  else {
    // Export for a browser or Rhino.
    root._ = _;
  }
}.call(this));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],77:[function(require,module,exports){
// default filter
var Transform = require('./transform.js');

var levelMap = { debug: 1, info: 2, warn: 3, error: 4 };

function Filter() {
  this.enabled = true;
  this.defaultResult = true;
  this.clear();
}

Transform.mixin(Filter);

// allow all matching, with level >= given level
Filter.prototype.allow = function(name, level) {
  this._white.push({ n: name, l: levelMap[level] });
  return this;
};

// deny all matching, with level <= given level
Filter.prototype.deny = function(name, level) {
  this._black.push({ n: name, l: levelMap[level] });
  return this;
};

Filter.prototype.clear = function() {
  this._white = [];
  this._black = [];
  return this;
};

function test(rule, name) {
  // use .test for RegExps
  return (rule.n.test ? rule.n.test(name) : rule.n == name);
};

Filter.prototype.test = function(name, level) {
  var i, len = Math.max(this._white.length, this._black.length);
  for(i = 0; i < len; i++) {
    if(this._white[i] && test(this._white[i], name) && levelMap[level] >= this._white[i].l) {
      return true;
    }
    if(this._black[i] && test(this._black[i], name) && levelMap[level] < this._black[i].l) {
      return false;
    }
  }
  return this.defaultResult;
};

Filter.prototype.write = function(name, level, args) {
  if(!this.enabled || this.test(name, level)) {
    return this.emit('item', name, level, args);
  }
};

module.exports = Filter;

},{"./transform.js":79}],78:[function(require,module,exports){
var Transform = require('./transform.js'),
    Filter = require('./filter.js');

var log = new Transform(),
    slice = Array.prototype.slice;

exports = module.exports = function create(name) {
  var o   = function() { log.write(name, undefined, slice.call(arguments)); return o; };
  o.debug = function() { log.write(name, 'debug', slice.call(arguments)); return o; };
  o.info  = function() { log.write(name, 'info',  slice.call(arguments)); return o; };
  o.warn  = function() { log.write(name, 'warn',  slice.call(arguments)); return o; };
  o.error = function() { log.write(name, 'error', slice.call(arguments)); return o; };
  o.log   = o.debug; // for interface compliance with Node and browser consoles
  o.suggest = exports.suggest;
  o.format = log.format;
  return o;
};

// filled in separately
exports.defaultBackend = exports.defaultFormatter = null;

exports.pipe = function(dest) {
  return log.pipe(dest);
};

exports.end = exports.unpipe = exports.disable = function(from) {
  return log.unpipe(from);
};

exports.Transform = Transform;
exports.Filter = Filter;
// this is the default filter that's applied when .enable() is called normally
// you can bypass it completely and set up your own pipes
exports.suggest = new Filter();

exports.enable = function() {
  if(exports.defaultFormatter) {
    return log.pipe(exports.suggest) // filter
              .pipe(exports.defaultFormatter) // formatter
              .pipe(exports.defaultBackend); // backend
  }
  return log.pipe(exports.suggest) // filter
            .pipe(exports.defaultBackend); // formatter
};


},{"./filter.js":77,"./transform.js":79}],79:[function(require,module,exports){
var microee = require('microee');

// Implements a subset of Node's stream.Transform - in a cross-platform manner.
function Transform() {}

microee.mixin(Transform);

// The write() signature is different from Node's
// --> makes it much easier to work with objects in logs.
// One of the lessons from v1 was that it's better to target
// a good browser rather than the lowest common denominator
// internally.
// If you want to use external streams, pipe() to ./stringify.js first.
Transform.prototype.write = function(name, level, args) {
  this.emit('item', name, level, args);
};

Transform.prototype.end = function() {
  this.emit('end');
  this.removeAllListeners();
};

Transform.prototype.pipe = function(dest) {
  var s = this;
  // prevent double piping
  s.emit('unpipe', dest);
  // tell the dest that it's being piped to
  dest.emit('pipe', s);

  function onItem() {
    dest.write.apply(dest, Array.prototype.slice.call(arguments));
  }
  function onEnd() { !dest._isStdio && dest.end(); }

  s.on('item', onItem);
  s.on('end', onEnd);

  s.when('unpipe', function(from) {
    var match = (from === dest) || typeof from == 'undefined';
    if(match) {
      s.removeListener('item', onItem);
      s.removeListener('end', onEnd);
      dest.emit('unpipe');
    }
    return match;
  });

  return dest;
};

Transform.prototype.unpipe = function(from) {
  this.emit('unpipe', from);
  return this;
};

Transform.prototype.format = function(dest) {
  throw new Error([
    'Warning: .format() is deprecated in Minilog v2! Use .pipe() instead. For example:',
    'var Minilog = require(\'minilog\');',
    'Minilog',
    '  .pipe(Minilog.backends.console.formatClean)',
    '  .pipe(Minilog.backends.console);'].join('\n'));
};

Transform.mixin = function(dest) {
  var o = Transform.prototype, k;
  for (k in o) {
    o.hasOwnProperty(k) && (dest.prototype[k] = o[k]);
  }
};

module.exports = Transform;

},{"microee":88}],80:[function(require,module,exports){
var Transform = require('../common/transform.js'),
    cache = [ ];

var logger = new Transform();

logger.write = function(name, level, args) {
  cache.push([ name, level, args ]);
};

// utility functions
logger.get = function() { return cache; };
logger.empty = function() { cache = []; };

module.exports = logger;

},{"../common/transform.js":79}],81:[function(require,module,exports){
var Transform = require('../common/transform.js');

var newlines = /\n+$/,
    logger = new Transform();

logger.write = function(name, level, args) {
  var i = args.length-1;
  if (typeof console === 'undefined' || !console.log) {
    return;
  }
  if(console.log.apply) {
    return console.log.apply(console, [name, level].concat(args));
  } else if(JSON && JSON.stringify) {
    // console.log.apply is undefined in IE8 and IE9
    // for IE8/9: make console.log at least a bit less awful
    if(args[i] && typeof args[i] == 'string') {
      args[i] = args[i].replace(newlines, '');
    }
    try {
      for(i = 0; i < args.length; i++) {
        args[i] = JSON.stringify(args[i]);
      }
    } catch(e) {}
    console.log(args.join(' '));
  }
};

logger.formatters = ['color', 'minilog'];
logger.color = require('./formatters/color.js');
logger.minilog = require('./formatters/minilog.js');

module.exports = logger;

},{"../common/transform.js":79,"./formatters/color.js":82,"./formatters/minilog.js":83}],82:[function(require,module,exports){
var Transform = require('../../common/transform.js'),
    color = require('./util.js');

var colors = { debug: ['cyan'], info: ['purple' ], warn: [ 'yellow', true ], error: [ 'red', true ] },
    logger = new Transform();

logger.write = function(name, level, args) {
  var fn = console.log;
  if(console[level] && console[level].apply) {
    fn = console[level];
    fn.apply(console, [ '%c'+name+' %c'+level, color('gray'), color.apply(color, colors[level])].concat(args));
  }
};

// NOP, because piping the formatted logs can only cause trouble.
logger.pipe = function() { };

module.exports = logger;

},{"../../common/transform.js":79,"./util.js":84}],83:[function(require,module,exports){
var Transform = require('../../common/transform.js'),
    color = require('./util.js'),
    colors = { debug: ['gray'], info: ['purple' ], warn: [ 'yellow', true ], error: [ 'red', true ] },
    logger = new Transform();

logger.write = function(name, level, args) {
  var fn = console.log;
  if(level != 'debug' && console[level]) {
    fn = console[level];
  }

  var subset = [], i = 0;
  if(level != 'info') {
    for(; i < args.length; i++) {
      if(typeof args[i] != 'string') break;
    }
    fn.apply(console, [ '%c'+name +' '+ args.slice(0, i).join(' '), color.apply(color, colors[level]) ].concat(args.slice(i)));
  } else {
    fn.apply(console, [ '%c'+name, color.apply(color, colors[level]) ].concat(args));
  }
};

// NOP, because piping the formatted logs can only cause trouble.
logger.pipe = function() { };

module.exports = logger;

},{"../../common/transform.js":79,"./util.js":84}],84:[function(require,module,exports){
var hex = {
  black: '#000',
  red: '#c23621',
  green: '#25bc26',
  yellow: '#bbbb00',
  blue:  '#492ee1',
  magenta: '#d338d3',
  cyan: '#33bbc8',
  gray: '#808080',
  purple: '#708'
};
function color(fg, isInverse) {
  if(isInverse) {
    return 'color: #fff; background: '+hex[fg]+';';
  } else {
    return 'color: '+hex[fg]+';';
  }
}

module.exports = color;

},{}],85:[function(require,module,exports){
var Minilog = require('../common/minilog.js');

var oldEnable = Minilog.enable,
    oldDisable = Minilog.disable,
    isChrome = (typeof navigator != 'undefined' && /chrome/i.test(navigator.userAgent)),
    console = require('./console.js');

// Use a more capable logging backend if on Chrome
Minilog.defaultBackend = (isChrome ? console.minilog : console);

// apply enable inputs from localStorage and from the URL
if(typeof window != 'undefined') {
  try {
    Minilog.enable(JSON.parse(window.localStorage['minilogSettings']));
  } catch(e) {}
  if(window.location && window.location.search) {
    var match = RegExp('[?&]minilog=([^&]*)').exec(window.location.search);
    match && Minilog.enable(decodeURIComponent(match[1]));
  }
}

// Make enable also add to localStorage
Minilog.enable = function() {
  oldEnable.call(Minilog, true);
  try { window.localStorage['minilogSettings'] = JSON.stringify(true); } catch(e) {}
  return this;
};

Minilog.disable = function() {
  oldDisable.call(Minilog);
  try { delete window.localStorage.minilogSettings; } catch(e) {}
  return this;
};

exports = module.exports = Minilog;

exports.backends = {
  array: require('./array.js'),
  browser: Minilog.defaultBackend,
  localStorage: require('./localstorage.js'),
  jQuery: require('./jquery_simple.js')
};

},{"../common/minilog.js":78,"./array.js":80,"./console.js":81,"./jquery_simple.js":86,"./localstorage.js":87}],86:[function(require,module,exports){
var Transform = require('../common/transform.js');

var cid = new Date().valueOf().toString(36);

function AjaxLogger(options) {
  this.url = options.url || '';
  this.cache = [];
  this.timer = null;
  this.interval = options.interval || 30*1000;
  this.enabled = true;
  this.jQuery = window.jQuery;
  this.extras = {};
}

Transform.mixin(AjaxLogger);

AjaxLogger.prototype.write = function(name, level, args) {
  if(!this.timer) { this.init(); }
  this.cache.push([name, level].concat(args));
};

AjaxLogger.prototype.init = function() {
  if(!this.enabled || !this.jQuery) return;
  var self = this;
  this.timer = setTimeout(function() {
    var i, logs = [], ajaxData, url = self.url;
    if(self.cache.length == 0) return self.init();
    // Need to convert each log line individually
    // so that having invalid (circular) references won't impact all the lines.

    for(i = 0; i < self.cache.length; i++) {
      try {
        logs.push(JSON.stringify(self.cache[i]));
      } catch(e) { }
    }
    if(self.jQuery.isEmptyObject(self.extras)) {
        ajaxData = logs.join('\n');
        url = self.url + '?client_id=' + cid;
    } else {
        ajaxData = JSON.stringify(self.jQuery.extend({logs: logs}, self.extras));
    }

    self.jQuery.ajax(url, {
      type: 'POST',
      cache: false,
      processData: false,
      data: ajaxData,
      contentType: 'application/json',
      timeout: 10000
    }).success(function(data, status, jqxhr) {
      if(data.interval) {
        self.interval = Math.max(1000, data.interval);
      }
    }).error(function() {
      self.interval = 30000;
    }).always(function() {
      self.init();
    });
    self.cache = [];
  }, this.interval);
};

AjaxLogger.prototype.end = function() {};

// wait until jQuery is defined. Useful if you don't control the load order.
AjaxLogger.jQueryWait = function(onDone) {
  if(typeof window !== 'undefined' && (window.jQuery || window.$)) {
    return onDone(window.jQuery || window.$);
  } else if (typeof window !== 'undefined') {
    setTimeout(function() { AjaxLogger.jQueryWait(onDone); }, 200);
  }
};

module.exports = AjaxLogger;

},{"../common/transform.js":79}],87:[function(require,module,exports){
var Transform = require('../common/transform.js'),
    cache = false;

var logger = new Transform();

logger.write = function(name, level, args) {
  if(typeof window == 'undefined' || typeof JSON == 'undefined' || !JSON.stringify || !JSON.parse) return;
  try {
    if(!cache) { cache = (window.localStorage.minilog ? JSON.parse(window.localStorage.minilog) : []); }
    cache.push([ new Date().toString(), name, level, args ]);
    window.localStorage.minilog = JSON.stringify(cache);
  } catch(e) {}
};

module.exports = logger;
},{"../common/transform.js":79}],88:[function(require,module,exports){
function M() { this._events = {}; }
M.prototype = {
  on: function(ev, cb) {
    this._events || (this._events = {});
    var e = this._events;
    (e[ev] || (e[ev] = [])).push(cb);
    return this;
  },
  removeListener: function(ev, cb) {
    var e = this._events[ev] || [], i;
    for(i = e.length-1; i >= 0 && e[i]; i--){
      if(e[i] === cb || e[i].cb === cb) { e.splice(i, 1); }
    }
  },
  removeAllListeners: function(ev) {
    if(!ev) { this._events = {}; }
    else { this._events[ev] && (this._events[ev] = []); }
  },
  emit: function(ev) {
    this._events || (this._events = {});
    var args = Array.prototype.slice.call(arguments, 1), i, e = this._events[ev] || [];
    for(i = e.length-1; i >= 0 && e[i]; i--){
      e[i].apply(this, args);
    }
    return this;
  },
  when: function(ev, cb) {
    return this.once(ev, cb, true);
  },
  once: function(ev, cb, when) {
    if(!cb) return this;
    function c() {
      if(!when) this.removeListener(ev, c);
      if(cb.apply(this, arguments) && when) this.removeListener(ev, c);
    }
    c.cb = cb;
    this.on(ev, c);
    return this;
  }
};
M.mixin = function(dest) {
  var o = M.prototype, k;
  for (k in o) {
    o.hasOwnProperty(k) && (dest.prototype[k] = o[k]);
  }
};
module.exports = M;

},{}],89:[function(require,module,exports){
/**
 * Module dependencies.
 */

var Emitter = require('emitter');
var reduce = require('reduce');

/**
 * Root reference for iframes.
 */

var root = 'undefined' == typeof window
  ? (this || self)
  : window;

/**
 * Noop.
 */

function noop(){};

/**
 * Check if `obj` is a host object,
 * we don't want to serialize these :)
 *
 * TODO: future proof, move to compoent land
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isHost(obj) {
  var str = {}.toString.call(obj);

  switch (str) {
    case '[object File]':
    case '[object Blob]':
    case '[object FormData]':
      return true;
    default:
      return false;
  }
}

/**
 * Determine XHR.
 */

request.getXHR = function () {
  if (root.XMLHttpRequest
      && (!root.location || 'file:' != root.location.protocol
          || !root.ActiveXObject)) {
    return new XMLHttpRequest;
  } else {
    try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP'); } catch(e) {}
  }
  return false;
};

/**
 * Removes leading and trailing whitespace, added to support IE.
 *
 * @param {String} s
 * @return {String}
 * @api private
 */

var trim = ''.trim
  ? function(s) { return s.trim(); }
  : function(s) { return s.replace(/(^\s*|\s*$)/g, ''); };

/**
 * Check if `obj` is an object.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isObject(obj) {
  return obj === Object(obj);
}

/**
 * Serialize the given `obj`.
 *
 * @param {Object} obj
 * @return {String}
 * @api private
 */

function serialize(obj) {
  if (!isObject(obj)) return obj;
  var pairs = [];
  for (var key in obj) {
    if (null != obj[key]) {
      pairs.push(encodeURIComponent(key)
        + '=' + encodeURIComponent(obj[key]));
    }
  }
  return pairs.join('&');
}

/**
 * Expose serialization method.
 */

 request.serializeObject = serialize;

 /**
  * Parse the given x-www-form-urlencoded `str`.
  *
  * @param {String} str
  * @return {Object}
  * @api private
  */

function parseString(str) {
  var obj = {};
  var pairs = str.split('&');
  var parts;
  var pair;

  for (var i = 0, len = pairs.length; i < len; ++i) {
    pair = pairs[i];
    parts = pair.split('=');
    obj[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
  }

  return obj;
}

/**
 * Expose parser.
 */

request.parseString = parseString;

/**
 * Default MIME type map.
 *
 *     superagent.types.xml = 'application/xml';
 *
 */

request.types = {
  html: 'text/html',
  json: 'application/json',
  xml: 'application/xml',
  urlencoded: 'application/x-www-form-urlencoded',
  'form': 'application/x-www-form-urlencoded',
  'form-data': 'application/x-www-form-urlencoded'
};

/**
 * Default serialization map.
 *
 *     superagent.serialize['application/xml'] = function(obj){
 *       return 'generated xml here';
 *     };
 *
 */

 request.serialize = {
   'application/x-www-form-urlencoded': serialize,
   'application/json': JSON.stringify
 };

 /**
  * Default parsers.
  *
  *     superagent.parse['application/xml'] = function(str){
  *       return { object parsed from str };
  *     };
  *
  */

request.parse = {
  'application/x-www-form-urlencoded': parseString,
  'application/json': JSON.parse
};

/**
 * Parse the given header `str` into
 * an object containing the mapped fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function parseHeader(str) {
  var lines = str.split(/\r?\n/);
  var fields = {};
  var index;
  var line;
  var field;
  var val;

  lines.pop(); // trailing CRLF

  for (var i = 0, len = lines.length; i < len; ++i) {
    line = lines[i];
    index = line.indexOf(':');
    field = line.slice(0, index).toLowerCase();
    val = trim(line.slice(index + 1));
    fields[field] = val;
  }

  return fields;
}

/**
 * Return the mime type for the given `str`.
 *
 * @param {String} str
 * @return {String}
 * @api private
 */

function type(str){
  return str.split(/ *; */).shift();
};

/**
 * Return header field parameters.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function params(str){
  return reduce(str.split(/ *; */), function(obj, str){
    var parts = str.split(/ *= */)
      , key = parts.shift()
      , val = parts.shift();

    if (key && val) obj[key] = val;
    return obj;
  }, {});
};

/**
 * Initialize a new `Response` with the given `xhr`.
 *
 *  - set flags (.ok, .error, etc)
 *  - parse header
 *
 * Examples:
 *
 *  Aliasing `superagent` as `request` is nice:
 *
 *      request = superagent;
 *
 *  We can use the promise-like API, or pass callbacks:
 *
 *      request.get('/').end(function(res){});
 *      request.get('/', function(res){});
 *
 *  Sending data can be chained:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' })
 *        .end(function(res){});
 *
 *  Or passed to `.send()`:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' }, function(res){});
 *
 *  Or passed to `.post()`:
 *
 *      request
 *        .post('/user', { name: 'tj' })
 *        .end(function(res){});
 *
 * Or further reduced to a single call for simple cases:
 *
 *      request
 *        .post('/user', { name: 'tj' }, function(res){});
 *
 * @param {XMLHTTPRequest} xhr
 * @param {Object} options
 * @api private
 */

function Response(req, options) {
  options = options || {};
  this.req = req;
  this.xhr = this.req.xhr;
  // responseText is accessible only if responseType is '' or 'text' and on older browsers
  this.text = ((this.req.method !='HEAD' && (this.xhr.responseType === '' || this.xhr.responseType === 'text')) || typeof this.xhr.responseType === 'undefined')
     ? this.xhr.responseText
     : null;
  this.statusText = this.req.xhr.statusText;
  this.setStatusProperties(this.xhr.status);
  this.header = this.headers = parseHeader(this.xhr.getAllResponseHeaders());
  // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
  // getResponseHeader still works. so we get content-type even if getting
  // other headers fails.
  this.header['content-type'] = this.xhr.getResponseHeader('content-type');
  this.setHeaderProperties(this.header);
  this.body = this.req.method != 'HEAD'
    ? this.parseBody(this.text ? this.text : this.xhr.response)
    : null;
}

/**
 * Get case-insensitive `field` value.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */

Response.prototype.get = function(field){
  return this.header[field.toLowerCase()];
};

/**
 * Set header related properties:
 *
 *   - `.type` the content type without params
 *
 * A response of "Content-Type: text/plain; charset=utf-8"
 * will provide you with a `.type` of "text/plain".
 *
 * @param {Object} header
 * @api private
 */

Response.prototype.setHeaderProperties = function(header){
  // content-type
  var ct = this.header['content-type'] || '';
  this.type = type(ct);

  // params
  var obj = params(ct);
  for (var key in obj) this[key] = obj[key];
};

/**
 * Parse the given body `str`.
 *
 * Used for auto-parsing of bodies. Parsers
 * are defined on the `superagent.parse` object.
 *
 * @param {String} str
 * @return {Mixed}
 * @api private
 */

Response.prototype.parseBody = function(str){
  var parse = request.parse[this.type];
  return parse && str && (str.length || str instanceof Object)
    ? parse(str)
    : null;
};

/**
 * Set flags such as `.ok` based on `status`.
 *
 * For example a 2xx response will give you a `.ok` of __true__
 * whereas 5xx will be __false__ and `.error` will be __true__. The
 * `.clientError` and `.serverError` are also available to be more
 * specific, and `.statusType` is the class of error ranging from 1..5
 * sometimes useful for mapping respond colors etc.
 *
 * "sugar" properties are also defined for common cases. Currently providing:
 *
 *   - .noContent
 *   - .badRequest
 *   - .unauthorized
 *   - .notAcceptable
 *   - .notFound
 *
 * @param {Number} status
 * @api private
 */

Response.prototype.setStatusProperties = function(status){
  // handle IE9 bug: http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
  if (status === 1223) {
    status = 204;
  }

  var type = status / 100 | 0;

  // status / class
  this.status = status;
  this.statusType = type;

  // basics
  this.info = 1 == type;
  this.ok = 2 == type;
  this.clientError = 4 == type;
  this.serverError = 5 == type;
  this.error = (4 == type || 5 == type)
    ? this.toError()
    : false;

  // sugar
  this.accepted = 202 == status;
  this.noContent = 204 == status;
  this.badRequest = 400 == status;
  this.unauthorized = 401 == status;
  this.notAcceptable = 406 == status;
  this.notFound = 404 == status;
  this.forbidden = 403 == status;
};

/**
 * Return an `Error` representative of this response.
 *
 * @return {Error}
 * @api public
 */

Response.prototype.toError = function(){
  var req = this.req;
  var method = req.method;
  var url = req.url;

  var msg = 'cannot ' + method + ' ' + url + ' (' + this.status + ')';
  var err = new Error(msg);
  err.status = this.status;
  err.method = method;
  err.url = url;

  return err;
};

/**
 * Expose `Response`.
 */

request.Response = Response;

/**
 * Initialize a new `Request` with the given `method` and `url`.
 *
 * @param {String} method
 * @param {String} url
 * @api public
 */

function Request(method, url) {
  var self = this;
  Emitter.call(this);
  this._query = this._query || [];
  this.method = method;
  this.url = url;
  this.header = {};
  this._header = {};
  this.on('end', function(){
    var err = null;
    var res = null;

    try {
      res = new Response(self);
    } catch(e) {
      err = new Error('Parser is unable to parse the response');
      err.parse = true;
      err.original = e;
      return self.callback(err);
    }

    self.emit('response', res);

    if (err) {
      return self.callback(err, res);
    }

    if (res.status >= 200 && res.status < 300) {
      return self.callback(err, res);
    }

    var new_err = new Error(res.statusText || 'Unsuccessful HTTP response');
    new_err.original = err;
    new_err.response = res;
    new_err.status = res.status;

    self.callback(new_err, res);
  });
}

/**
 * Mixin `Emitter`.
 */

Emitter(Request.prototype);

/**
 * Allow for extension
 */

Request.prototype.use = function(fn) {
  fn(this);
  return this;
}

/**
 * Set timeout to `ms`.
 *
 * @param {Number} ms
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.timeout = function(ms){
  this._timeout = ms;
  return this;
};

/**
 * Clear previous timeout.
 *
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.clearTimeout = function(){
  this._timeout = 0;
  clearTimeout(this._timer);
  return this;
};

/**
 * Abort the request, and clear potential timeout.
 *
 * @return {Request}
 * @api public
 */

Request.prototype.abort = function(){
  if (this.aborted) return;
  this.aborted = true;
  this.xhr.abort();
  this.clearTimeout();
  this.emit('abort');
  return this;
};

/**
 * Set header `field` to `val`, or multiple fields with one object.
 *
 * Examples:
 *
 *      req.get('/')
 *        .set('Accept', 'application/json')
 *        .set('X-API-Key', 'foobar')
 *        .end(callback);
 *
 *      req.get('/')
 *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
 *        .end(callback);
 *
 * @param {String|Object} field
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.set = function(field, val){
  if (isObject(field)) {
    for (var key in field) {
      this.set(key, field[key]);
    }
    return this;
  }
  this._header[field.toLowerCase()] = val;
  this.header[field] = val;
  return this;
};

/**
 * Remove header `field`.
 *
 * Example:
 *
 *      req.get('/')
 *        .unset('User-Agent')
 *        .end(callback);
 *
 * @param {String} field
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.unset = function(field){
  delete this._header[field.toLowerCase()];
  delete this.header[field];
  return this;
};

/**
 * Get case-insensitive header `field` value.
 *
 * @param {String} field
 * @return {String}
 * @api private
 */

Request.prototype.getHeader = function(field){
  return this._header[field.toLowerCase()];
};

/**
 * Set Content-Type to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.xml = 'application/xml';
 *
 *      request.post('/')
 *        .type('xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 *      request.post('/')
 *        .type('application/xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 * @param {String} type
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.type = function(type){
  this.set('Content-Type', request.types[type] || type);
  return this;
};

/**
 * Set Accept to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.json = 'application/json';
 *
 *      request.get('/agent')
 *        .accept('json')
 *        .end(callback);
 *
 *      request.get('/agent')
 *        .accept('application/json')
 *        .end(callback);
 *
 * @param {String} accept
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.accept = function(type){
  this.set('Accept', request.types[type] || type);
  return this;
};

/**
 * Set Authorization field value with `user` and `pass`.
 *
 * @param {String} user
 * @param {String} pass
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.auth = function(user, pass){
  var str = btoa(user + ':' + pass);
  this.set('Authorization', 'Basic ' + str);
  return this;
};

/**
* Add query-string `val`.
*
* Examples:
*
*   request.get('/shoes')
*     .query('size=10')
*     .query({ color: 'blue' })
*
* @param {Object|String} val
* @return {Request} for chaining
* @api public
*/

Request.prototype.query = function(val){
  if ('string' != typeof val) val = serialize(val);
  if (val) this._query.push(val);
  return this;
};

/**
 * Write the field `name` and `val` for "multipart/form-data"
 * request bodies.
 *
 * ``` js
 * request.post('/upload')
 *   .field('foo', 'bar')
 *   .end(callback);
 * ```
 *
 * @param {String} name
 * @param {String|Blob|File} val
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.field = function(name, val){
  if (!this._formData) this._formData = new root.FormData();
  this._formData.append(name, val);
  return this;
};

/**
 * Queue the given `file` as an attachment to the specified `field`,
 * with optional `filename`.
 *
 * ``` js
 * request.post('/upload')
 *   .attach(new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
 *   .end(callback);
 * ```
 *
 * @param {String} field
 * @param {Blob|File} file
 * @param {String} filename
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.attach = function(field, file, filename){
  if (!this._formData) this._formData = new root.FormData();
  this._formData.append(field, file, filename);
  return this;
};

/**
 * Send `data`, defaulting the `.type()` to "json" when
 * an object is given.
 *
 * Examples:
 *
 *       // querystring
 *       request.get('/search')
 *         .end(callback)
 *
 *       // multiple data "writes"
 *       request.get('/search')
 *         .send({ search: 'query' })
 *         .send({ range: '1..5' })
 *         .send({ order: 'desc' })
 *         .end(callback)
 *
 *       // manual json
 *       request.post('/user')
 *         .type('json')
 *         .send('{"name":"tj"})
 *         .end(callback)
 *
 *       // auto json
 *       request.post('/user')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // manual x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send('name=tj')
 *         .end(callback)
 *
 *       // auto x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // defaults to x-www-form-urlencoded
  *      request.post('/user')
  *        .send('name=tobi')
  *        .send('species=ferret')
  *        .end(callback)
 *
 * @param {String|Object} data
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.send = function(data){
  var obj = isObject(data);
  var type = this.getHeader('Content-Type');

  // merge
  if (obj && isObject(this._data)) {
    for (var key in data) {
      this._data[key] = data[key];
    }
  } else if ('string' == typeof data) {
    if (!type) this.type('form');
    type = this.getHeader('Content-Type');
    if ('application/x-www-form-urlencoded' == type) {
      this._data = this._data
        ? this._data + '&' + data
        : data;
    } else {
      this._data = (this._data || '') + data;
    }
  } else {
    this._data = data;
  }

  if (!obj || isHost(data)) return this;
  if (!type) this.type('json');
  return this;
};

/**
 * Invoke the callback with `err` and `res`
 * and handle arity check.
 *
 * @param {Error} err
 * @param {Response} res
 * @api private
 */

Request.prototype.callback = function(err, res){
  var fn = this._callback;
  this.clearTimeout();
  fn(err, res);
};

/**
 * Invoke callback with x-domain error.
 *
 * @api private
 */

Request.prototype.crossDomainError = function(){
  var err = new Error('Origin is not allowed by Access-Control-Allow-Origin');
  err.crossDomain = true;
  this.callback(err);
};

/**
 * Invoke callback with timeout error.
 *
 * @api private
 */

Request.prototype.timeoutError = function(){
  var timeout = this._timeout;
  var err = new Error('timeout of ' + timeout + 'ms exceeded');
  err.timeout = timeout;
  this.callback(err);
};

/**
 * Enable transmission of cookies with x-domain requests.
 *
 * Note that for this to work the origin must not be
 * using "Access-Control-Allow-Origin" with a wildcard,
 * and also must set "Access-Control-Allow-Credentials"
 * to "true".
 *
 * @api public
 */

Request.prototype.withCredentials = function(){
  this._withCredentials = true;
  return this;
};

/**
 * Initiate request, invoking callback `fn(res)`
 * with an instanceof `Response`.
 *
 * @param {Function} fn
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.end = function(fn){
  var self = this;
  var xhr = this.xhr = request.getXHR();
  var query = this._query.join('&');
  var timeout = this._timeout;
  var data = this._formData || this._data;

  // store callback
  this._callback = fn || noop;

  // state change
  xhr.onreadystatechange = function(){
    if (4 != xhr.readyState) return;

    // In IE9, reads to any property (e.g. status) off of an aborted XHR will
    // result in the error "Could not complete the operation due to error c00c023f"
    var status;
    try { status = xhr.status } catch(e) { status = 0; }

    if (0 == status) {
      if (self.timedout) return self.timeoutError();
      if (self.aborted) return;
      return self.crossDomainError();
    }
    self.emit('end');
  };

  // progress
  var handleProgress = function(e){
    if (e.total > 0) {
      e.percent = e.loaded / e.total * 100;
    }
    self.emit('progress', e);
  };
  if (this.hasListeners('progress')) {
    xhr.onprogress = handleProgress;
  }
  try {
    if (xhr.upload && this.hasListeners('progress')) {
      xhr.upload.onprogress = handleProgress;
    }
  } catch(e) {
    // Accessing xhr.upload fails in IE from a web worker, so just pretend it doesn't exist.
    // Reported here:
    // https://connect.microsoft.com/IE/feedback/details/837245/xmlhttprequest-upload-throws-invalid-argument-when-used-from-web-worker-context
  }

  // timeout
  if (timeout && !this._timer) {
    this._timer = setTimeout(function(){
      self.timedout = true;
      self.abort();
    }, timeout);
  }

  // querystring
  if (query) {
    query = request.serializeObject(query);
    this.url += ~this.url.indexOf('?')
      ? '&' + query
      : '?' + query;
  }

  // initiate request
  xhr.open(this.method, this.url, true);

  // CORS
  if (this._withCredentials) xhr.withCredentials = true;

  // body
  if ('GET' != this.method && 'HEAD' != this.method && 'string' != typeof data && !isHost(data)) {
    // serialize stuff
    var contentType = this.getHeader('Content-Type');
    var serialize = request.serialize[contentType ? contentType.split(';')[0] : ''];
    if (serialize) data = serialize(data);
  }

  // set header fields
  for (var field in this.header) {
    if (null == this.header[field]) continue;
    xhr.setRequestHeader(field, this.header[field]);
  }

  // send stuff
  this.emit('request', this);
  xhr.send(data);
  return this;
};

/**
 * Faux promise support
 *
 * @param {Function} fulfill
 * @param {Function} reject
 * @return {Request}
 */

Request.prototype.then = function (fulfill, reject) {
  return this.end(function(err, res) {
    err ? reject(err) : fulfill(res);
  });
}

/**
 * Expose `Request`.
 */

request.Request = Request;

/**
 * Issue a request:
 *
 * Examples:
 *
 *    request('GET', '/users').end(callback)
 *    request('/users').end(callback)
 *    request('/users', callback)
 *
 * @param {String} method
 * @param {String|Function} url or callback
 * @return {Request}
 * @api public
 */

function request(method, url) {
  // callback
  if ('function' == typeof url) {
    return new Request('GET', method).end(url);
  }

  // url first
  if (1 == arguments.length) {
    return new Request('GET', method);
  }

  return new Request(method, url);
}

/**
 * GET `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} data or fn
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.get = function(url, data, fn){
  var req = request('GET', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.query(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * HEAD `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} data or fn
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.head = function(url, data, fn){
  var req = request('HEAD', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * DELETE `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.del = function(url, fn){
  var req = request('DELETE', url);
  if (fn) req.end(fn);
  return req;
};

/**
 * PATCH `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} data
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.patch = function(url, data, fn){
  var req = request('PATCH', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * POST `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} data
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.post = function(url, data, fn){
  var req = request('POST', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * PUT `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} data or fn
 * @param {Function} fn
 * @return {Request}
 * @api public
 */

request.put = function(url, data, fn){
  var req = request('PUT', url);
  if ('function' == typeof data) fn = data, data = null;
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * Expose `request`.
 */

module.exports = request;

},{"emitter":90,"reduce":91}],90:[function(require,module,exports){

/**
 * Expose `Emitter`.
 */

module.exports = Emitter;

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks[event] = this._callbacks[event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  var self = this;
  this._callbacks = this._callbacks || {};

  function on() {
    self.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks[event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks[event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks[event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks[event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};

},{}],91:[function(require,module,exports){

/**
 * Reduce `arr` with `fn`.
 *
 * @param {Array} arr
 * @param {Function} fn
 * @param {Mixed} initial
 *
 * TODO: combatible error handling?
 */

module.exports = function(arr, fn, initial){  
  var idx = 0;
  var len = arr.length;
  var curr = arguments.length == 3
    ? initial
    : arr[idx++];

  while (idx < len) {
    curr = fn.call(null, curr, arr[idx], ++idx, arr);
  }
  
  return curr;
};
},{}],92:[function(require,module,exports){
(function (global){

var rng;

if (global.crypto && crypto.getRandomValues) {
  // WHATWG crypto-based RNG - http://wiki.whatwg.org/wiki/Crypto
  // Moderately fast, high quality
  var _rnds8 = new Uint8Array(16);
  rng = function whatwgRNG() {
    crypto.getRandomValues(_rnds8);
    return _rnds8;
  };
}

if (!rng) {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var  _rnds = new Array(16);
  rng = function() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      _rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return _rnds;
  };
}

module.exports = rng;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],93:[function(require,module,exports){
//     uuid.js
//
//     Copyright (c) 2010-2012 Robert Kieffer
//     MIT License - http://opensource.org/licenses/mit-license.php

// Unique ID creation requires a high quality random # generator.  We feature
// detect to determine the best RNG source, normalizing to a function that
// returns 128-bits of randomness, since that's what's usually required
var _rng = require('./rng');

// Maps for number <-> hex string conversion
var _byteToHex = [];
var _hexToByte = {};
for (var i = 0; i < 256; i++) {
  _byteToHex[i] = (i + 0x100).toString(16).substr(1);
  _hexToByte[_byteToHex[i]] = i;
}

// **`parse()` - Parse a UUID into it's component bytes**
function parse(s, buf, offset) {
  var i = (buf && offset) || 0, ii = 0;

  buf = buf || [];
  s.toLowerCase().replace(/[0-9a-f]{2}/g, function(oct) {
    if (ii < 16) { // Don't overflow!
      buf[i + ii++] = _hexToByte[oct];
    }
  });

  // Zero out remaining bytes if string was short
  while (ii < 16) {
    buf[i + ii++] = 0;
  }

  return buf;
}

// **`unparse()` - Convert UUID byte array (ala parse()) into a string**
function unparse(buf, offset) {
  var i = offset || 0, bth = _byteToHex;
  return  bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]];
}

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

// random #'s we need to init node and clockseq
var _seedBytes = _rng();

// Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
var _nodeId = [
  _seedBytes[0] | 0x01,
  _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]
];

// Per 4.2.2, randomize (14 bit) clockseq
var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;

// Previous uuid creation time
var _lastMSecs = 0, _lastNSecs = 0;

// See https://github.com/broofa/node-uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};

  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  var node = options.node || _nodeId;
  for (var n = 0; n < 6; n++) {
    b[i + n] = node[n];
  }

  return buf ? buf : unparse(b);
}

// **`v4()` - Generate random UUID**

// See https://github.com/broofa/node-uuid for API details
function v4(options, buf, offset) {
  // Deprecated - 'format' argument, as supported in v1.2
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options == 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || _rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ii++) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || unparse(rnds);
}

// Export public API
var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;
uuid.parse = parse;
uuid.unparse = unparse;

module.exports = uuid;

},{"./rng":92}]},{},[1])(1)
});