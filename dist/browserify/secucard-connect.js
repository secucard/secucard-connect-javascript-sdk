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
},{"./de.secucard.connect/client":11,"./de.secucard.connect/client-browser-environment":7,"./de.secucard.connect/net/channel":12,"es6-shim":110,"minilog":122}],2:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

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

    Auth.prototype.pick = function pick(object, keys) {

        return keys.reduce(function (obj, key) {
            if (object[key]) {
                obj[key] = object[key];
            }
            return obj;
        }, {});
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

                    return _this.retrieveNewToken()['catch'](function () {

                        _minilog2['default']('secucard.auth').error('Token is expired');
                        throw new _exception.AuthenticationFailedException('Token is expired');
                    });
                } else {

                    return _this.retrieveNewToken()['catch'](function () {

                        _minilog2['default']('secucard.auth').error('Credentials error');
                        throw new _exception.AuthenticationFailedException('Credentials error');
                    });
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

    Auth.prototype.retrieveNewToken = function retrieveNewToken() {

        var storage = this.getTokenStorage();
        if (!storage) {
            var err = new _exception.AuthenticationFailedException('Credentials error');
            return Promise.reject(err);
        }

        return storage.retrieveNewToken();
    };

    Auth.prototype._tokenRequest = function _tokenRequest(credentials, channel) {
        var m = channel.createMessage().setBaseUrl(this.oAuthUrl()).setUrl('token').setHeaders(this.baseHeaders).setMethod(_netMessage.POST).setBody(credentials);
        _minilog2['default']('secucard.auth').debug('token request', m);
        return channel.send(m);
    };

    Auth.prototype._tokenClientCredentialsRequest = function _tokenClientCredentialsRequest(credentials, channel) {
        var tmpcr = this.pick(credentials, this.baseCredentialNames);
        var cr = Object.assign({}, tmpcr, { grant_type: 'client_credentials' });
        return this._tokenRequest(cr, channel);
    };

    Auth.prototype._tokenRefreshRequest = function _tokenRefreshRequest(credentials, refresh_token, channel) {
        var tmpcr = this.pick(credentials, this.baseCredentialNames);
        var cr = Object.assign({}, tmpcr, { grant_type: 'refresh_token', refresh_token: refresh_token });
        return this._tokenRequest(cr, channel);
    };

    Auth.prototype._tokenDeviceCodeRequest = function _tokenDeviceCodeRequest(credentials, channel) {
        var tmpcr = this.pick(credentials, this.baseCredentialNames.concat(['uuid']));
        var cr = Object.assign({}, tmpcr, { grant_type: 'device' });
        return this._tokenRequest(cr, channel);
    };

    Auth.prototype._tokenDeviceRequest = function _tokenDeviceRequest(credentials, channel) {
        var tmpcr = this.pick(credentials, this.baseCredentialNames.concat(['code']));
        var cr = Object.assign({}, tmpcr, { grant_type: 'device' });
        return this._tokenRequest(cr, channel);
    };

    Auth.prototype._tokenAppUserRequest = function _tokenAppUserRequest(credentials, channel) {
        var tmpcr = this.pick(credentials, this.baseCredentialNames.concat(['username', 'password', 'device', 'deviceinfo']));
        var cr = Object.assign({}, tmpcr, { grant_type: 'appuser' });
        return this._tokenRequest(cr, channel);
    };

    return Auth;
})();

exports.Auth = Auth;
},{"../net/message":14,"./exception":4,"./token":6,"minilog":122}],3:[function(require,module,exports){
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

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AuthenticationFailedException = (function (_Error) {
    _inherits(AuthenticationFailedException, _Error);

    function AuthenticationFailedException() {
        var message = arguments.length <= 0 || arguments[0] === undefined ? 'Authentication failed' : arguments[0];

        _classCallCheck(this, AuthenticationFailedException);

        _Error.call(this, message);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        } else {
            Object.defineProperty(this, 'stack', {
                configurable: true,
                enumerable: false,
                writable: true,
                value: Error(message).stack
            });
        }

        Object.defineProperty(this, 'message', {
            configurable: true,
            enumerable: false,
            writable: true,
            value: message
        });

        Object.defineProperty(this, 'name', {
            configurable: true,
            enumerable: false,
            writable: true,
            value: 'AuthenticationFailedException'
        });

        Object.defineProperty(this, 'error_user', {
            configurable: true,
            enumerable: false,
            writable: true,
            value: ''
        });
    }

    return AuthenticationFailedException;
})(Error);

exports.AuthenticationFailedException = AuthenticationFailedException;

var AuthenticationTimeoutException = (function (_Error2) {
    _inherits(AuthenticationTimeoutException, _Error2);

    function AuthenticationTimeoutException() {
        var message = arguments.length <= 0 || arguments[0] === undefined ? 'Authentication timeout' : arguments[0];

        _classCallCheck(this, AuthenticationTimeoutException);

        _Error2.call(this, message);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        } else {
            Object.defineProperty(this, 'stack', {
                configurable: true,
                enumerable: false,
                writable: true,
                value: Error(message).stack
            });
        }

        Object.defineProperty(this, 'message', {
            configurable: true,
            enumerable: false,
            writable: true,
            value: message
        });

        Object.defineProperty(this, 'name', {
            configurable: true,
            enumerable: false,
            writable: true,
            value: 'AuthenticationTimeoutException'
        });
    }

    return AuthenticationTimeoutException;
})(Error);

exports.AuthenticationTimeoutException = AuthenticationTimeoutException;
},{}],5:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _token = require('./token');

var _utilMixins = require('../util/mixins');

var _utilMixins2 = _interopRequireDefault(_utilMixins);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _minilog = require('minilog');

var _minilog2 = _interopRequireDefault(_minilog);

var TokenStorageInMem = (function () {
    function TokenStorageInMem() {
        _classCallCheck(this, TokenStorageInMem);
    }

    TokenStorageInMem.prototype.setCredentials = function setCredentials(credentials) {
        this.credentials = credentials;

        var token = null;

        if (credentials.token) {
            token = _token.Token.create(credentials.token);
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

    TokenStorageInMem.prototype.retrieveNewToken = function retrieveNewToken() {
        var _this = this;

        var retrieveToken = this.getRetrieveToken();

        if (typeof retrieveToken === 'string') {

            if (this.retrievingToken) {
                return this.retrievingToken;
            }

            this.retrievingToken = new Promise(function (resolve, reject) {

                var url = retrieveToken;
                var request = _superagent2['default'].get(url);

                request.end(function (err, res) {
                    if (err) {
                        reject(err, res);
                    } else {
                        resolve(res);
                    }
                });
            }).then(function (response) {

                delete _this.retrievingToken;

                _minilog2['default']('secucard.TokenStorageInMem').debug(response.text);

                if (!_token.Token.isValid(response.body)) {
                    var err = 'Retrieved token from ' + retrieveToken + ' is not valid: ' + response.text;
                    _minilog2['default']('secucard.TokenStorageInMem').error(err + '. Please check if \'Content-type\' header set to \'application/json\'');
                    throw new Error(err);
                }

                return _this.storeToken(response.body);
            })['catch'](function (err) {
                delete _this.retrievingToken;
                throw err;
            });

            return this.retrievingToken;
        } else if (typeof retrieveToken === 'function') {

            if (this.retrievingToken) {
                return this.retrievingToken;
            }

            this.retrievingToken = retrieveToken().then(function (token) {
                delete _this.retrievingToken;

                if (!_token.Token.isValid(token)) {
                    var err = 'Retrieved token from ' + JSON.stringify(token) + ' is not valid';
                    _minilog2['default']('secucard.TokenStorageInMem').error('' + err);
                    throw new Error(err);
                }

                return _this.storeToken(token);
            })['catch'](function (err) {
                console.log(err);
                delete _this.retrievingToken;
                throw err;
            });

            return this.retrievingToken;
        } else {
            return Promise.reject(new Error('retrieveToken is not defined'));
        }
    };

    return TokenStorageInMem;
})();

exports.TokenStorageInMem = TokenStorageInMem;

TokenStorageInMem.createWithMixin = function (TokenStorageMixin) {

    var Mixed = _utilMixins2['default'](TokenStorageInMem, TokenStorageMixin);
    return new Mixed();
};
},{"../util/mixins":108,"./token":6,"minilog":122,"superagent":132}],6:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Token = (function () {
    function Token() {
        _classCallCheck(this, Token);

        this.access_token = null;
        this.refresh_token = null;
        this.token_type = 'bearer';
        this.expires_in = 1200;
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

Token.isValid = function (data) {

    return data && data.hasOwnProperty('access_token') && data.hasOwnProperty('expireTime');
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

var _productPrepaidPrepaid = require('./product/prepaid/prepaid');

var _productServicesServices = require('./product/services/services');

var _productDocumentDocument = require('./product/document/document');

var _productAuthAuth = require('./product/auth/auth');

var _authTokenStorage = require('./auth/token-storage');

var _productClearingClearing = require('./product/clearing/clearing');

var _productCardprocessingCardprocessing = require('./product/cardprocessing/cardprocessing');

var _productEasycreditEasycredit = require('./product/easycredit/easycredit');

var _productPublicPublic = require('./product/public/public');

var ClientBrowserEnvironment = {
    config: {
        stompPort: 15671,
        stompEndpoint: '/stomp/websocket'
    },
    services: [_productAuthAuth.Auth.SessionService, _productCardprocessingCardprocessing.Cardprocessing.InvoiceService, _productCardprocessingCardprocessing.Cardprocessing.TransactionService, _productClearingClearing.Clearing.SepaInbatchsService, _productClearingClearing.Clearing.SepaInrecordsService, _productClearingClearing.Clearing.SepaOutbatchsService, _productClearingClearing.Clearing.SepaOutrecordsService, _productDocumentDocument.Document.UploadService, _productEasycreditEasycredit.Easycredit.TransactionService, _productGeneralGeneral.General.SkeletonService, _productGeneralGeneral.General.AccountService, _productGeneralGeneral.General.AccountDeviceService, _productGeneralGeneral.General.AccountInvitationService, _productGeneralGeneral.General.ContactService, _productGeneralGeneral.General.ContractService, _productGeneralGeneral.General.DeliveryAddressService, _productGeneralGeneral.General.DeviceService, _productGeneralGeneral.General.FileAccessService, _productGeneralGeneral.General.MerchantService, _productGeneralGeneral.General.NewsService, _productGeneralGeneral.General.NotificationService, _productGeneralGeneral.General.PublicMerchantService, _productGeneralGeneral.General.StoreGroupService, _productGeneralGeneral.General.StoreService, _productGeneralGeneral.General.TransactionService, _productLoyaltyLoyalty.Loyalty.ActionService, _productLoyaltyLoyalty.Loyalty.ActionProfileService, _productLoyaltyLoyalty.Loyalty.ActionMessageService, _productLoyaltyLoyalty.Loyalty.ActionCampaignService, _productLoyaltyLoyalty.Loyalty.ActionConfigService, _productLoyaltyLoyalty.Loyalty.ApprovalService, _productLoyaltyLoyalty.Loyalty.BeaconService, _productLoyaltyLoyalty.Loyalty.CardGroupService, _productLoyaltyLoyalty.Loyalty.CardService, _productLoyaltyLoyalty.Loyalty.ChargeService, _productLoyaltyLoyalty.Loyalty.CheckinService, _productLoyaltyLoyalty.Loyalty.CustomerService, _productLoyaltyLoyalty.Loyalty.MerchantCardService, _productLoyaltyLoyalty.Loyalty.PaymentContainerService, _productLoyaltyLoyalty.Loyalty.ProgramService, _productLoyaltyLoyalty.Loyalty.ProgramSpecialService, _productLoyaltyLoyalty.Loyalty.ReportService, _productLoyaltyLoyalty.Loyalty.SaleService, _productLoyaltyLoyalty.Loyalty.StoreGroupService, _productLoyaltyLoyalty.Loyalty.TransactionService, _productPaymentPayment.Payment.ContainerService, _productPaymentPayment.Payment.ContractService, _productPaymentPayment.Payment.CustomerService, _productPaymentPayment.Payment.EterminalTransactionService, _productPaymentPayment.Payment.InvoiceService, _productPaymentPayment.Payment.PayoutService, _productPaymentPayment.Payment.SecupayDebitService, _productPaymentPayment.Payment.SecupayPayoutService, _productPaymentPayment.Payment.SecupayPrepayService, _productPaymentPayment.Payment.TransactionService, _productPaymentPayment.Payment.TransactionHistoriesService, _productPrepaidPrepaid.Prepaid.ContractService, _productPrepaidPrepaid.Prepaid.ItemGroupService, _productPrepaidPrepaid.Prepaid.ItemService, _productPrepaidPrepaid.Prepaid.ReportService, _productPrepaidPrepaid.Prepaid.SaleService, _productPrepaidPrepaid.Prepaid.StockService, _productPublicPublic.Public.WebsiteService, _productServicesServices.Services.IdentCaseService, _productServicesServices.Services.IdentContractService, _productServicesServices.Services.IdentRequestService, _productServicesServices.Services.IdentResultService, _productSmartSmart.Smart.CheckinService, _productSmartSmart.Smart.ConfigurationService, _productSmartSmart.Smart.DeviceService, _productSmartSmart.Smart.DeviceHistoriesService, _productSmartSmart.Smart.IdentService, _productSmartSmart.Smart.RoutingService, _productSmartSmart.Smart.TransactionService]
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
    Cardprocessing: {
        Invoices: _productCardprocessingCardprocessing.Cardprocessing.InvoiceService.Uid,
        Transactions: _productCardprocessingCardprocessing.Cardprocessing.TransactionService.Uid
    },
    Clearing: {
        SepaInbatchs: _productClearingClearing.Clearing.SepaInbatchsService.Uid,
        SepaInrecords: _productClearingClearing.Clearing.SepaInrecordsService.Uid,
        SepaOutbatchs: _productClearingClearing.Clearing.SepaOutbatchsService.Uid,
        SepaOutrecords: _productClearingClearing.Clearing.SepaOutrecordsService.Uid
    },
    Document: {
        Uploads: _productDocumentDocument.Document.UploadService.Uid
    },
    Easycredit: {
        Transactions: _productEasycreditEasycredit.Easycredit.TransactionService.Uid
    },
    General: {
        Skeletons: _productGeneralGeneral.General.SkeletonService.Uid,
        Accounts: _productGeneralGeneral.General.AccountService.Uid,
        AccountDevices: _productGeneralGeneral.General.AccountDeviceService.Uid,
        AccountInvitations: _productGeneralGeneral.General.AccountInvitationService.Uid,
        Contacts: _productGeneralGeneral.General.ContactService.Uid,
        Contracts: _productGeneralGeneral.General.ContractService.Uid,
        DeliveryAddresses: _productGeneralGeneral.General.DeliveryAddressService.Uid,
        Devices: _productGeneralGeneral.General.DeviceService.Uid,
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
        ActionCampaigns: _productLoyaltyLoyalty.Loyalty.ActionCampaignService.Uid,
        ActionConfigs: _productLoyaltyLoyalty.Loyalty.ActionConfigService.Uid,
        ActionMessages: _productLoyaltyLoyalty.Loyalty.ActionMessageService.Uid,
        ActionProfiles: _productLoyaltyLoyalty.Loyalty.ActionProfileService.Uid,
        Actions: _productLoyaltyLoyalty.Loyalty.ActionService.Uid,
        Approvals: _productLoyaltyLoyalty.Loyalty.ApprovalService.Uid,
        Beacons: _productLoyaltyLoyalty.Loyalty.BeaconService.Uid,
        CardGroups: _productLoyaltyLoyalty.Loyalty.CardGroupService.Uid,
        Cards: _productLoyaltyLoyalty.Loyalty.CardService.Uid,
        Charges: _productLoyaltyLoyalty.Loyalty.ChargeService.Uid,
        Checkins: _productLoyaltyLoyalty.Loyalty.CheckinService.Uid,
        Customers: _productLoyaltyLoyalty.Loyalty.CustomerService.Uid,
        MerchantCards: _productLoyaltyLoyalty.Loyalty.MerchantCardService.Uid,
        PaymentContainers: _productLoyaltyLoyalty.Loyalty.PaymentContainerService.Uid,
        Programs: _productLoyaltyLoyalty.Loyalty.ProgramService.Uid,
        ProrgamSpecials: _productLoyaltyLoyalty.Loyalty.ProgramSpecialService.Uid,
        Reports: _productLoyaltyLoyalty.Loyalty.ReportService.Uid,
        Sales: _productLoyaltyLoyalty.Loyalty.SaleService.Uid,
        StoreGroups: _productLoyaltyLoyalty.Loyalty.StoreGroupService.Uid,
        Transactions: _productLoyaltyLoyalty.Loyalty.TransactionService.Uid
    },
    Payment: {
        Containers: _productPaymentPayment.Payment.ContainerService.Uid,
        Contracts: _productPaymentPayment.Payment.ContractService.Uid,
        Customers: _productPaymentPayment.Payment.CustomerService.Uid,
        EterminalTransactions: _productPaymentPayment.Payment.EterminalTransactionService.Uid,
        Invoices: _productPaymentPayment.Payment.InvoiceService.Uid,
        Payouts: _productPaymentPayment.Payment.PayoutService.Uid,
        SecupayDebits: _productPaymentPayment.Payment.SecupayDebitService.Uid,
        SecupayPayouts: _productPaymentPayment.Payment.SecupayPayoutService.Uid,
        SecupayPrepays: _productPaymentPayment.Payment.SecupayPrepayService.Uid,
        Transactions: _productPaymentPayment.Payment.TransactionService.Uid,
        TransactionHistories: _productPaymentPayment.Payment.TransactionHistoriesService.Uid
    },
    Prepaid: {
        Contracts: _productPrepaidPrepaid.Prepaid.ContractService.Uid,
        ItemGroups: _productPrepaidPrepaid.Prepaid.ItemGroupService.Uid,
        Items: _productPrepaidPrepaid.Prepaid.ItemService.Uid,
        Reports: _productPrepaidPrepaid.Prepaid.ReportService.Uid,
        Sales: _productPrepaidPrepaid.Prepaid.SaleService.Uid,
        Stocks: _productPrepaidPrepaid.Prepaid.StockService.Uid
    },
    Public: {
        Website: _productPublicPublic.Public.WebsiteService.Uid
    },
    Services: {
        IdentCases: _productServicesServices.Services.IdentCaseService.Uid,
        IdentContracts: _productServicesServices.Services.IdentContractService.Uid,
        IdentRequests: _productServicesServices.Services.IdentRequestService.Uid,
        IdentResults: _productServicesServices.Services.IdentResultService.Uid
    },
    Smart: {
        Checkins: _productSmartSmart.Smart.CheckinService.Uid,
        Configurations: _productSmartSmart.Smart.ConfigurationService.Uid,
        Devices: _productSmartSmart.Smart.DeviceService.Uid,
        DeviceHistories: _productSmartSmart.Smart.DeviceHistoriesService.Uid,
        Idents: _productSmartSmart.Smart.IdentService.Uid,
        Routings: _productSmartSmart.Smart.RoutingService.Uid,
        Transactions: _productSmartSmart.Smart.TransactionService.Uid
    }
};
exports.ServiceMap = ServiceMap;
},{"./auth/token-storage":5,"./net/socket/socket-browser":16,"./net/stomp":19,"./product/auth/auth":21,"./product/cardprocessing/cardprocessing":23,"./product/clearing/clearing":26,"./product/document/document":31,"./product/easycredit/easycredit":33,"./product/general/general":43,"./product/loyalty/loyalty":64,"./product/payment/payment":78,"./product/prepaid/prepaid":88,"./product/public/public":93,"./product/services/services":99,"./product/smart/smart":106}],8:[function(require,module,exports){
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

    ClientConfig.prototype.getRetrieveToken = function getRetrieveToken() {
        return this.retrieveToken;
    };

    ClientConfig.prototype.getWithCredentials = function getWithCredentials() {
        return this.withCredentials;
    };

    ClientConfig.prototype._getCompleteUrl = function _getCompleteUrl(value) {
        var url = value;
        if (!url.endsWith('/')) {
            url += '/';
        }
        return url;
    };

    ClientConfig.prototype.getLanguage = function getLanguage() {
        return this.language;
    };

    ClientConfig.prototype.setLanguage = function setLanguage(lang) {
        this.language = lang;
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
    stompMessageAge: 0,
    retrieveToken: null,

    withCredentials: false,

    language: 'de'
};

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
            channelConfig: [_netChannel.Channel.STOMP, _netChannel.Channel.REST],
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

exports.ClientContext = ClientContext;
},{"./auth/auth":2,"./auth/credentials":3,"./auth/token-storage":5,"./net/channel":12,"./net/rest":15,"./product/app/app-service":20,"eventemitter3":111}],10:[function(require,module,exports){
"use strict";

exports.__esModule = true;
var Version = {
  "name": "0.6.12"
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
        this.exportToken = this.context.exportToken.bind(this.context);
        this.connected = false;
        this.setLanguage = this.context.setLanguage.bind(this.context);

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
},{"./client-config":8,"./client-context":9,"./client-version":10,"./net/message":14,"minilog":122}],12:[function(require,module,exports){
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
    PATCH: "PATCH",
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
var PATCH = 'PATCH';
exports.PATCH = PATCH;
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
        this.methodFuns[_message.PATCH] = _superagent2['default'].patch;
        this.methodFuns[_message.HEAD] = _superagent2['default'].head;
        this.methodFuns[_message.DELETE] = _superagent2['default'].del;

        this.methodFuns[_channel.Channel.METHOD.GET] = _superagent2['default'].get;

        this.methodFuns[_channel.Channel.METHOD.CREATE] = _superagent2['default'].post;
        this.methodFuns[_channel.Channel.METHOD.EXECUTE] = _superagent2['default'].post;

        this.methodFuns[_channel.Channel.METHOD.UPDATE] = _superagent2['default'].put;
        this.methodFuns[_channel.Channel.METHOD.PATCH] = _superagent2['default'].patch;
        this.methodFuns[_channel.Channel.METHOD.DELETE] = _superagent2['default'].del;
    }

    Rest.prototype.configureWithContext = function configureWithContext(context) {
        this.restUrl = function () {
            return context.getConfig().getRestUrl();
        };

        this.getToken = function (extend) {
            return context.getAuth().getToken(extend);
        };

        this.withCredentials = function () {
            return context.getConfig().getWithCredentials();
        };

        this.isRequestWithToken = context.isRequestWithToken.bind(context);

        this.getLanguage = function () {
            return context.getConfig().getLanguage();
        };
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
            _this.createRequestFromMessage(message).end(function (err, res) {
                if (err) {
                    reject(err, res);
                } else {
                    resolve(res);
                }
            });
        });
    };

    Rest.prototype.createRequestFromMessage = function createRequestFromMessage(message) {
        var url = message.baseUrl ? message.baseUrl + message.url : message.url;
        var request = this.r(url, message.method);

        if (this.withCredentials()) {
            request.withCredentials();
        }

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

        return request;
    };

    Rest.prototype.getAuthHeader = function getAuthHeader(token) {
        return { 'Authorization': 'Bearer ' + token.access_token };
    };

    Rest.prototype.getLanguageHeader = function getLanguageHeader() {
        return { 'Accept-Language': this.getLanguage() };
    };

    Rest.prototype.sendWithToken = function sendWithToken(message) {
        var _this2 = this;

        return this.getToken(true).then(function (token) {
            var headers = Object.assign({}, message.headers, _this2.getAuthHeader(token), _this2.getLanguageHeader());
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

            if (err.response) {
                error = _exception.SecucardConnectException.create(err.response.body);
            }

            error.request = request;

            throw error;
        };

        var message = this.createMessageForRequest(method, params);

        var pr = !this.isRequestWithToken || this.isRequestWithToken(params.options) ? this.sendWithToken(message) : this.send(message);

        return pr.then(requestSuccess)['catch'](requestError);
    };

    Rest.prototype.generateUrl = function generateUrl(method, params) {

        var message = this.createMessageForRequest(method, params);
        var req = this.createRequestFromMessage(message);

        var query = req._query ? req._query.join('&') : '';

        var url = req.url;

        if (query) {
            url += (url.indexOf('?') >= 0 ? '&' : '?') + query;
        }

        return url;
    };

    Rest.prototype.createMessageForRequest = function createMessageForRequest(method, params) {
        var message = this.createMessage();
        var headers = Object.assign({}, { 'Content-Type': 'application/json' }, this.getLanguageHeader());

        if (params.headers) {
            Object.assign(headers, params.headers);
        }

        if (!params.multipart) {
            message.setHeaders(headers);
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
},{"../auth/exception":4,"./channel":12,"./exception":13,"./message":14,"minilog":122,"superagent":132}],16:[function(require,module,exports){
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
},{"eventemitter3":111,"minilog":122}],17:[function(require,module,exports){
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
            body = null;

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
},{"./frame":17,"eventemitter3":111,"minilog":122,"uuid":137}],19:[function(require,module,exports){
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
},{"../auth/exception":4,"./channel":12,"./exception":13,"./stomp-impl/stomp":18,"eventemitter3":111,"minilog":122,"uuid":137}],20:[function(require,module,exports){
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
},{"../../util/mixins":108,"../product-service":92}],21:[function(require,module,exports){
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
},{"../product-service":92}],23:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _invoiceService = require('./invoice-service');

var _transactionService = require('./transaction-service');

var Cardprocessing = {};
exports.Cardprocessing = Cardprocessing;
Cardprocessing.InvoiceService = _invoiceService.InvoiceService;
Cardprocessing.TransactionService = _transactionService.TransactionService;
},{"./invoice-service":24,"./transaction-service":25}],24:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var InvoiceService = (function (_ProductService) {
    _inherits(InvoiceService, _ProductService);

    function InvoiceService() {
        _classCallCheck(this, InvoiceService);

        _ProductService.call(this);
    }

    InvoiceService.prototype.getEndpoint = function getEndpoint() {
        return ['cardprocessing', 'invoices'];
    };

    InvoiceService.prototype.getEventTargets = function getEventTargets() {
        return ['cardprocessing.invoices'];
    };

    return InvoiceService;
})(_productService.ProductService);

exports.InvoiceService = InvoiceService;

InvoiceService.Uid = ['cardprocessing', 'invoices'].join('.');
},{"../product-service":92}],25:[function(require,module,exports){
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
        return ['cardprocessing', 'transactions'];
    };

    TransactionService.prototype.getEventTargets = function getEventTargets() {
        return ['cardprocessing.transactions'];
    };

    return TransactionService;
})(_productService.ProductService);

exports.TransactionService = TransactionService;

TransactionService.Uid = ['cardprocessing', 'transactions'].join('.');
},{"../product-service":92}],26:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _sepaInbatchsService = require('./sepa-inbatchs-service');

var _sepaInrecordsService = require('./sepa-inrecords-service');

var _sepaOutbatchsService = require('./sepa-outbatchs-service');

var _sepaOutrecordsService = require('./sepa-outrecords-service');

var Clearing = {};
exports.Clearing = Clearing;
Clearing.SepaInbatchsService = _sepaInbatchsService.SepaInbatchsService;
Clearing.SepaInrecordsService = _sepaInrecordsService.SepaInrecordsService;
Clearing.SepaOutbatchsService = _sepaOutbatchsService.SepaOutbatchsService;
Clearing.SepaOutrecordsService = _sepaOutrecordsService.SepaOutrecordsService;
},{"./sepa-inbatchs-service":27,"./sepa-inrecords-service":28,"./sepa-outbatchs-service":29,"./sepa-outrecords-service":30}],27:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var SepaInbatchsService = (function (_ProductService) {
    _inherits(SepaInbatchsService, _ProductService);

    function SepaInbatchsService() {
        _classCallCheck(this, SepaInbatchsService);

        _ProductService.call(this);
    }

    SepaInbatchsService.prototype.getEndpoint = function getEndpoint() {
        return ['clearing', 'sepainbatchs'];
    };

    SepaInbatchsService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return SepaInbatchsService;
})(_productService.ProductService);

exports.SepaInbatchsService = SepaInbatchsService;

SepaInbatchsService.Uid = ['clearing', 'sepainbatchs'].join('.');
},{"../product-service":92}],28:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var SepaInrecordsService = (function (_ProductService) {
    _inherits(SepaInrecordsService, _ProductService);

    function SepaInrecordsService() {
        _classCallCheck(this, SepaInrecordsService);

        _ProductService.call(this);
    }

    SepaInrecordsService.prototype.getEndpoint = function getEndpoint() {
        return ['clearing', 'sepainrecords'];
    };

    SepaInrecordsService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return SepaInrecordsService;
})(_productService.ProductService);

exports.SepaInrecordsService = SepaInrecordsService;

SepaInrecordsService.Uid = ['clearing', 'sepainrecords'].join('.');
},{"../product-service":92}],29:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var SepaOutbatchsService = (function (_ProductService) {
    _inherits(SepaOutbatchsService, _ProductService);

    function SepaOutbatchsService() {
        _classCallCheck(this, SepaOutbatchsService);

        _ProductService.call(this);
    }

    SepaOutbatchsService.prototype.getEndpoint = function getEndpoint() {
        return ['clearing', 'sepaoutbatchs'];
    };

    SepaOutbatchsService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return SepaOutbatchsService;
})(_productService.ProductService);

exports.SepaOutbatchsService = SepaOutbatchsService;

SepaOutbatchsService.Uid = ['clearing', 'sepaoutbatchs'].join('.');
},{"../product-service":92}],30:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var SepaOutrecordsService = (function (_ProductService) {
    _inherits(SepaOutrecordsService, _ProductService);

    function SepaOutrecordsService() {
        _classCallCheck(this, SepaOutrecordsService);

        _ProductService.call(this);
    }

    SepaOutrecordsService.prototype.getEndpoint = function getEndpoint() {
        return ['clearing', 'sepaoutrecords'];
    };

    SepaOutrecordsService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return SepaOutrecordsService;
})(_productService.ProductService);

exports.SepaOutrecordsService = SepaOutrecordsService;

SepaOutrecordsService.Uid = ['clearing', 'sepaoutrecords'].join('.');
},{"../product-service":92}],31:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _uploadService = require('./upload-service');

var Document = {};

exports.Document = Document;
Document.UploadService = _uploadService.UploadService;
},{"./upload-service":32}],32:[function(require,module,exports){
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
},{"../product-service":92}],33:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _transactionService = require('./transaction-service');

var Easycredit = {};
exports.Easycredit = Easycredit;
Easycredit.TransactionService = _transactionService.TransactionService;
},{"./transaction-service":34}],34:[function(require,module,exports){
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
    return ['easycredit', 'transactions'];
  };

  TransactionService.prototype.getEventTargets = function getEventTargets() {
    return ['easycredit.transactions'];
  };

  return TransactionService;
})(_productService.ProductService);

exports.TransactionService = TransactionService;

TransactionService.Uid = ['easycredit', 'transactions'].join('.');
},{"../product-service":92}],35:[function(require,module,exports){
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
},{"../product-service":92}],36:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var AccountInvitationService = (function (_ProductService) {
  _inherits(AccountInvitationService, _ProductService);

  function AccountInvitationService() {
    _classCallCheck(this, AccountInvitationService);

    _ProductService.call(this);
  }

  AccountInvitationService.prototype.getEndpoint = function getEndpoint() {
    return ['general', 'accountinvitations'];
  };

  AccountInvitationService.prototype.getEventTargets = function getEventTargets() {
    return ['general.accountinvitations'];
  };

  return AccountInvitationService;
})(_productService.ProductService);

exports.AccountInvitationService = AccountInvitationService;

AccountInvitationService.Uid = ['general', 'accountinvitations'].join('.');
},{"../product-service":92}],37:[function(require,module,exports){
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
},{"../product-service":92}],38:[function(require,module,exports){
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
},{"../product-service":92}],39:[function(require,module,exports){
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
        return ['general', 'contracts'];
    };

    ContractService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return ContractService;
})(_productService.ProductService);

exports.ContractService = ContractService;

ContractService.Uid = ['general', 'contracts'].join('.');
},{"../product-service":92}],40:[function(require,module,exports){
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
},{"../product-service":92}],41:[function(require,module,exports){
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
        return ['general', 'devices'];
    };

    DeviceService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return DeviceService;
})(_productService.ProductService);

exports.DeviceService = DeviceService;

DeviceService.Uid = ['general', 'devices'].join('.');
},{"../product-service":92}],42:[function(require,module,exports){
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
},{"../product-service":92}],43:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _skeletonService = require('./skeleton-service');

var _accountService = require('./account-service');

var _accountDeviceService = require('./account-device-service');

var _accountInvitationService = require('./account-invitation-service');

var _contactService = require('./contact-service');

var _contractService = require('./contract-service');

var _deliveryAddressService = require('./delivery-address-service');

var _deviceService = require('./device-service');

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
General.AccountInvitationService = _accountInvitationService.AccountInvitationService;
General.ContactService = _contactService.ContactService;
General.ContractService = _contractService.ContractService;
General.DeliveryAddressService = _deliveryAddressService.DeliveryAddressService;
General.DeviceService = _deviceService.DeviceService;
General.FileAccessService = _fileAccessService.FileAccessService;
General.MerchantService = _merchantService.MerchantService;
General.NewsService = _newsService.NewsService;
General.NotificationService = _notificationService.NotificationService;
General.PublicMerchantService = _publicMerchantService.PublicMerchantService;
General.StoreGroupService = _storeGroupService.StoreGroupService;
General.StoreService = _storeService.StoreService;
General.TransactionService = _transactionService.TransactionService;
},{"./account-device-service":35,"./account-invitation-service":36,"./account-service":37,"./contact-service":38,"./contract-service":39,"./delivery-address-service":40,"./device-service":41,"./file-access-service":42,"./merchant-service":44,"./news-service":45,"./notification-service":46,"./public-merchant-service":47,"./skeleton-service":48,"./store-group-service":49,"./store-service":50,"./transaction-service":51}],44:[function(require,module,exports){
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
},{"../product-service":92}],45:[function(require,module,exports){
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
},{"../product-service":92}],46:[function(require,module,exports){
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
},{"../product-service":92}],47:[function(require,module,exports){
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
},{"../product-service":92}],48:[function(require,module,exports){
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
},{"../product-service":92}],49:[function(require,module,exports){
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
},{"../product-service":92}],50:[function(require,module,exports){
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
},{"../product-service":92}],51:[function(require,module,exports){
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
},{"../product-service":92}],52:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var ActionCampaignService = (function (_ProductService) {
    _inherits(ActionCampaignService, _ProductService);

    function ActionCampaignService() {
        _classCallCheck(this, ActionCampaignService);

        _ProductService.call(this);
    }

    ActionCampaignService.prototype.getCampaignRemoveAllowed = function getCampaignRemoveAllowed(id) {
        return this.retrieveWithAction(id, 'campaignRemoveAllowed');
    };

    ActionCampaignService.prototype.getEndpoint = function getEndpoint() {
        return ['loyalty', 'actioncampaigns'];
    };

    ActionCampaignService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return ActionCampaignService;
})(_productService.ProductService);

exports.ActionCampaignService = ActionCampaignService;

ActionCampaignService.Uid = ['loyalty', 'actioncampaigns'].join('.');
},{"../product-service":92}],53:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var ActionConfigService = (function (_ProductService) {
    _inherits(ActionConfigService, _ProductService);

    function ActionConfigService() {
        _classCallCheck(this, ActionConfigService);

        _ProductService.call(this);
    }

    ActionConfigService.prototype.getEndpoint = function getEndpoint() {
        return ['loyalty', 'actionconfigs'];
    };

    ActionConfigService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    ActionConfigService.prototype.checkConfirmationCode = function checkConfirmationCode(id, code) {
        return this.execute(id, 'checkConfirmationCode', code);
    };

    ActionConfigService.prototype.processConfirmationCode = function processConfirmationCode(id) {
        return this.execute(id, 'processConfirmationCode');
    };

    ActionConfigService.prototype.cancelConfirmationCode = function cancelConfirmationCode(id) {
        return this.execute(id, 'cancelConfirmationCode');
    };

    return ActionConfigService;
})(_productService.ProductService);

exports.ActionConfigService = ActionConfigService;

ActionConfigService.Uid = ['loyalty', 'actionconfigs'].join('.');
},{"../product-service":92}],54:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var ActionMessageService = (function (_ProductService) {
    _inherits(ActionMessageService, _ProductService);

    function ActionMessageService() {
        _classCallCheck(this, ActionMessageService);

        _ProductService.call(this);
    }

    ActionMessageService.prototype.getEndpoint = function getEndpoint() {
        return ['loyalty', 'actionmessages'];
    };

    ActionMessageService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return ActionMessageService;
})(_productService.ProductService);

exports.ActionMessageService = ActionMessageService;

ActionMessageService.Uid = ['loyalty', 'actionmessages'].join('.');
},{"../product-service":92}],55:[function(require,module,exports){
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
},{"../product-service":92}],56:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var ActionService = (function (_ProductService) {
    _inherits(ActionService, _ProductService);

    function ActionService() {
        _classCallCheck(this, ActionService);

        _ProductService.call(this);
    }

    ActionService.prototype.getEndpoint = function getEndpoint() {
        return ['loyalty', 'actions'];
    };

    ActionService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return ActionService;
})(_productService.ProductService);

exports.ActionService = ActionService;

ActionService.Uid = ['loyalty', 'actions'].join('.');
},{"../product-service":92}],57:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var ApprovalService = (function (_ProductService) {
  _inherits(ApprovalService, _ProductService);

  function ApprovalService() {
    _classCallCheck(this, ApprovalService);

    _ProductService.call(this);
  }

  ApprovalService.prototype.getEndpoint = function getEndpoint() {
    return ['loyalty', 'approvals'];
  };

  ApprovalService.prototype.getEventTargets = function getEventTargets() {
    return [];
  };

  return ApprovalService;
})(_productService.ProductService);

exports.ApprovalService = ApprovalService;

ApprovalService.Uid = ['loyalty', 'approvals'].join('.');
},{"../product-service":92}],58:[function(require,module,exports){
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
},{"../product-service":92}],59:[function(require,module,exports){
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
},{"../product-service":92}],60:[function(require,module,exports){
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
},{"../product-service":92}],61:[function(require,module,exports){
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
},{"../product-service":92}],62:[function(require,module,exports){
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
},{"../product-service":92}],63:[function(require,module,exports){
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

    CustomerService.prototype.retrieveTemplates = function retrieveTemplates(merchantId) {
        return this.retrieveWithAction('me', 'templateList', merchantId);
    };

    CustomerService.prototype.getEndpoint = function getEndpoint() {
        return ['loyalty', 'customers'];
    };

    CustomerService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    CustomerService.prototype.assignPaymentContainer = function assignPaymentContainer(customerId, paymentContainerId) {
        return this.execute(customerId, 'assignPaymentcontainer', paymentContainerId);
    };

    CustomerService.prototype.removePaymentContainer = function removePaymentContainer(customerId, paymentContainerId) {
        return this.removeWithAction(customerId, 'assignPaymentcontainer', paymentContainerId);
    };

    return CustomerService;
})(_productService.ProductService);

exports.CustomerService = CustomerService;

CustomerService.Uid = ['loyalty', 'customers'].join('.');
},{"../product-service":92}],64:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _actionCampaignService = require('./action-campaign-service');

var _actionConfigService = require('./action-config-service');

var _actionMessageService = require('./action-message-service');

var _actionProfileService = require('./action-profile-service');

var _actionService = require('./action-service');

var _approvalService = require('./approval-service');

var _beaconService = require('./beacon-service');

var _cardGroupService = require('./card-group-service');

var _cardService = require('./card-service');

var _chargeService = require('./charge-service');

var _checkinService = require('./checkin-service');

var _customerService = require('./customer-service');

var _merchantCardService = require('./merchant-card-service');

var _programService = require('./program-service');

var _programSpecialService = require('./program-special-service');

var _reportService = require('./report-service');

var _saleService = require('./sale-service');

var _storeGroupService = require('./store-group-service');

var _transactionService = require('./transaction-service');

var _paymentContainerService = require('./payment-container-service');

var Loyalty = {};
exports.Loyalty = Loyalty;
Loyalty.ActionCampaignService = _actionCampaignService.ActionCampaignService;
Loyalty.ActionConfigService = _actionConfigService.ActionConfigService;
Loyalty.ActionMessageService = _actionMessageService.ActionMessageService;
Loyalty.ActionProfileService = _actionProfileService.ActionProfileService;
Loyalty.ActionService = _actionService.ActionService;
Loyalty.ApprovalService = _approvalService.ApprovalService;
Loyalty.BeaconService = _beaconService.BeaconService;
Loyalty.CardGroupService = _cardGroupService.CardGroupService;
Loyalty.CardService = _cardService.CardService;
Loyalty.ChargeService = _chargeService.ChargeService;
Loyalty.CheckinService = _checkinService.CheckinService;
Loyalty.CustomerService = _customerService.CustomerService;
Loyalty.MerchantCardService = _merchantCardService.MerchantCardService;
Loyalty.ProgramService = _programService.ProgramService;
Loyalty.ProgramSpecialService = _programSpecialService.ProgramSpecialService;
Loyalty.ReportService = _reportService.ReportService;
Loyalty.SaleService = _saleService.SaleService;
Loyalty.StoreGroupService = _storeGroupService.StoreGroupService;
Loyalty.TransactionService = _transactionService.TransactionService;
Loyalty.PaymentContainerService = _paymentContainerService.PaymentContainerService;
},{"./action-campaign-service":52,"./action-config-service":53,"./action-message-service":54,"./action-profile-service":55,"./action-service":56,"./approval-service":57,"./beacon-service":58,"./card-group-service":59,"./card-service":60,"./charge-service":61,"./checkin-service":62,"./customer-service":63,"./merchant-card-service":65,"./payment-container-service":66,"./program-service":67,"./program-special-service":68,"./report-service":69,"./sale-service":70,"./store-group-service":71,"./transaction-service":72}],65:[function(require,module,exports){
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

    MerchantCardService.prototype.retrieveTemplates = function retrieveTemplates(merchantId) {
        return this.retrieveWithAction('me', 'templateList', merchantId);
    };

    MerchantCardService.prototype.transact = function transact(merchantCardId, tid, cardnumber, action, amount, bonusAmount, amountSplitAllowed, additionalData) {

        if (action == 'cashreport') {
            return this.execute(merchantCardId, 'transaction', null, { tid: tid, action: action });
        }

        return this.execute(merchantCardId, 'transaction', null, { tid: tid, cardnumber: cardnumber, action: action, amount: amount, bonus_amount: bonusAmount,
            amount_split_allowed: amountSplitAllowed, additional_data: additionalData });
    };

    MerchantCardService.prototype.lock = function lock(merchantCardId, reasonId, note) {
        return this.execute(merchantCardId, 'lock', null, { reason: reasonId, note: note });
    };

    MerchantCardService.prototype.unlock = function unlock(merchantCardId, note) {
        return this.execute(merchantCardId, 'unlock', null, { note: note });
    };

    MerchantCardService.prototype.registerCustomer = function registerCustomer(merchantCardId, data) {
        return this.execute(merchantCardId, 'registerCustomer', null, data);
    };

    MerchantCardService.prototype.retrieveLock = function retrieveLock(merchantCardId) {
        return this.retrieveWithAction(merchantCardId, 'lock', null);
    };

    MerchantCardService.prototype.retrieveLockReasons = function retrieveLockReasons(merchantCardId) {
        return this.retrieveWithAction(merchantCardId, 'lockreasons', null);
    };

    MerchantCardService.prototype.updateGroup = function updateGroup(merchantCardId, groupId) {
        return this.updateWithAction(merchantCardId, 'cardgroup', groupId);
    };

    MerchantCardService.prototype.retrieveVirtualTerminalData = function retrieveVirtualTerminalData(merchantId) {
        return this.retrieveWithAction('me', 'virtualTerminalData', merchantId);
    };

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
},{"../product-service":92}],66:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var PaymentContainerService = (function (_ProductService) {
    _inherits(PaymentContainerService, _ProductService);

    function PaymentContainerService() {
        _classCallCheck(this, PaymentContainerService);

        _ProductService.call(this);
    }

    PaymentContainerService.prototype.getEndpoint = function getEndpoint() {
        return ['loyalty', 'paymentcontainers'];
    };

    PaymentContainerService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    PaymentContainerService.prototype.validateIban = function validateIban(data) {

        if (data.iban && data.owner) {
            return this.execute('me', 'validateIban', null, data);
        } else {
            throw new Error("Iban and owner are required");
        }
    };

    return PaymentContainerService;
})(_productService.ProductService);

exports.PaymentContainerService = PaymentContainerService;

PaymentContainerService.Uid = ['loyalty', 'paymentcontainers'].join('.');
},{"../product-service":92}],67:[function(require,module,exports){
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
},{"../product-service":92}],68:[function(require,module,exports){
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
},{"../product-service":92}],69:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var ReportService = (function (_ProductService) {
    _inherits(ReportService, _ProductService);

    function ReportService() {
        _classCallCheck(this, ReportService);

        _ProductService.call(this);
    }

    ReportService.prototype.getEndpoint = function getEndpoint() {
        return ['loyalty', 'reports'];
    };

    ReportService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return ReportService;
})(_productService.ProductService);

exports.ReportService = ReportService;

ReportService.Uid = ['loyalty', 'reports'].join('.');
},{"../product-service":92}],70:[function(require,module,exports){
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
},{"../product-service":92}],71:[function(require,module,exports){
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
},{"../product-service":92}],72:[function(require,module,exports){
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
        return ['loyalty', 'transactions'];
    };

    TransactionService.prototype.getEventTargets = function getEventTargets() {
        return ['loyalty.transactions'];
    };

    TransactionService.prototype.retrieveTemplates = function retrieveTemplates(merchantId) {
        return this.retrieveWithAction('me', 'templateList', merchantId);
    };

    return TransactionService;
})(_productService.ProductService);

exports.TransactionService = TransactionService;

TransactionService.Uid = ['loyalty', 'transactions'].join('.');
},{"../product-service":92}],73:[function(require,module,exports){
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
},{"../product-service":92}],74:[function(require,module,exports){
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
},{"../product-service":92}],75:[function(require,module,exports){
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
},{"../product-service":92}],76:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var EterminalTransactionService = (function (_ProductService) {
    _inherits(EterminalTransactionService, _ProductService);

    function EterminalTransactionService() {
        _classCallCheck(this, EterminalTransactionService);

        _ProductService.call(this);
    }

    EterminalTransactionService.prototype.getEndpoint = function getEndpoint() {
        return ['payment', 'eterminaltransactions'];
    };

    EterminalTransactionService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return EterminalTransactionService;
})(_productService.ProductService);

exports.EterminalTransactionService = EterminalTransactionService;

EterminalTransactionService.Uid = ['payment', 'eterminaltransactions'].join('.');
},{"../product-service":92}],77:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var InvoiceService = (function (_ProductService) {
    _inherits(InvoiceService, _ProductService);

    function InvoiceService() {
        _classCallCheck(this, InvoiceService);

        _ProductService.call(this);
    }

    InvoiceService.prototype.getEndpoint = function getEndpoint() {
        return ['payment', 'invoices'];
    };

    InvoiceService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return InvoiceService;
})(_productService.ProductService);

exports.InvoiceService = InvoiceService;

InvoiceService.Uid = ['payment', 'invoices'].join('.');
},{"../product-service":92}],78:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _containerService = require('./container-service');

var _contractService = require('./contract-service');

var _customerService = require('./customer-service');

var _invoiceService = require('./invoice-service');

var _payoutService = require('./payout-service');

var _secupayDebitService = require('./secupay-debit-service');

var _secupayPayoutService = require('./secupay-payout-service');

var _secupayPrepayService = require('./secupay-prepay-service');

var _transactionService = require('./transaction-service');

var _transactionHistoriesService = require('./transaction-histories-service');

var _eterminalTransactionService = require('./eterminal-transaction-service');

var Payment = {};
exports.Payment = Payment;
Payment.ContainerService = _containerService.ContainerService;
Payment.ContractService = _contractService.ContractService;
Payment.CustomerService = _customerService.CustomerService;
Payment.EterminalTransactionService = _eterminalTransactionService.EterminalTransactionService;
Payment.InvoiceService = _invoiceService.InvoiceService;
Payment.PayoutService = _payoutService.PayoutService;
Payment.SecupayDebitService = _secupayDebitService.SecupayDebitService;
Payment.SecupayPayoutService = _secupayPayoutService.SecupayPayoutService;
Payment.SecupayPrepayService = _secupayPrepayService.SecupayPrepayService;
Payment.TransactionService = _transactionService.TransactionService;
Payment.TransactionHistoriesService = _transactionHistoriesService.TransactionHistoriesService;
},{"./container-service":73,"./contract-service":74,"./customer-service":75,"./eterminal-transaction-service":76,"./invoice-service":77,"./payout-service":79,"./secupay-debit-service":80,"./secupay-payout-service":81,"./secupay-prepay-service":82,"./transaction-histories-service":83,"./transaction-service":84}],79:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var PayoutService = (function (_ProductService) {
    _inherits(PayoutService, _ProductService);

    function PayoutService() {
        _classCallCheck(this, PayoutService);

        _ProductService.call(this);
    }

    PayoutService.prototype.getEndpoint = function getEndpoint() {
        return ['payment', 'payouts'];
    };

    PayoutService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return PayoutService;
})(_productService.ProductService);

exports.PayoutService = PayoutService;

PayoutService.Uid = ['payment', 'payouts'].join('.');
},{"../product-service":92}],80:[function(require,module,exports){
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
},{"../product-service":92}],81:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var SecupayPayoutService = (function (_ProductService) {
    _inherits(SecupayPayoutService, _ProductService);

    function SecupayPayoutService() {
        _classCallCheck(this, SecupayPayoutService);

        _ProductService.call(this);
    }

    SecupayPayoutService.prototype.getEndpoint = function getEndpoint() {
        return ['payment', 'secupaypayout'];
    };

    SecupayPayoutService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    SecupayPayoutService.prototype.payoutWithoutCustomer = function payoutWithoutCustomer(data) {
        return this.execute('me', 'PayoutWithoutCustomer', null, data);
    };

    return SecupayPayoutService;
})(_productService.ProductService);

exports.SecupayPayoutService = SecupayPayoutService;

SecupayPayoutService.Uid = ['payment', 'secupaypayout'].join('.');
},{"../product-service":92}],82:[function(require,module,exports){
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
},{"../product-service":92}],83:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var TransactionHistoriesService = (function (_ProductService) {
	_inherits(TransactionHistoriesService, _ProductService);

	function TransactionHistoriesService() {
		_classCallCheck(this, TransactionHistoriesService);

		_ProductService.call(this);
	}

	TransactionHistoriesService.prototype.getEndpoint = function getEndpoint() {
		return ['payment', 'transactionhistories'];
	};

	TransactionHistoriesService.prototype.getEventTargets = function getEventTargets() {
		return [];
	};

	return TransactionHistoriesService;
})(_productService.ProductService);

exports.TransactionHistoriesService = TransactionHistoriesService;

TransactionHistoriesService.Uid = ['payment', 'transactionhistories'].join('.');
},{"../product-service":92}],84:[function(require,module,exports){
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

    TransactionService.prototype.getCrowdfundingData = function getCrowdfundingData(id) {
        return this.retrieveWithAction('me', 'CrowdFundingData', id);
    };

    return TransactionService;
})(_productService.ProductService);

exports.TransactionService = TransactionService;

TransactionService.Uid = ['payment', 'transactions'].join('.');
},{"../product-service":92}],85:[function(require,module,exports){
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
        return ['prepaid', 'contracts'];
    };

    ContractService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return ContractService;
})(_productService.ProductService);

exports.ContractService = ContractService;

ContractService.Uid = ['prepaid', 'contracts'].join('.');
},{"../product-service":92}],86:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var ItemGroupService = (function (_ProductService) {
    _inherits(ItemGroupService, _ProductService);

    function ItemGroupService() {
        _classCallCheck(this, ItemGroupService);

        _ProductService.call(this);
    }

    ItemGroupService.prototype.getEndpoint = function getEndpoint() {
        return ['prepaid', 'itemgroups'];
    };

    ItemGroupService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return ItemGroupService;
})(_productService.ProductService);

exports.ItemGroupService = ItemGroupService;

ItemGroupService.Uid = ['prepaid', 'itemgroups'].join('.');
},{"../product-service":92}],87:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var ItemService = (function (_ProductService) {
    _inherits(ItemService, _ProductService);

    function ItemService() {
        _classCallCheck(this, ItemService);

        _ProductService.call(this);
    }

    ItemService.prototype.getEndpoint = function getEndpoint() {
        return ['prepaid', 'items'];
    };

    ItemService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return ItemService;
})(_productService.ProductService);

exports.ItemService = ItemService;

ItemService.Uid = ['prepaid', 'items'].join('.');
},{"../product-service":92}],88:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _contractService = require('./contract-service');

var _itemGroupService = require('./item-group-service');

var _itemService = require('./item-service');

var _saleService = require('./sale-service');

var _stockService = require('./stock-service');

var _reportService = require('./report-service');

var Prepaid = {};
exports.Prepaid = Prepaid;
Prepaid.ContractService = _contractService.ContractService;
Prepaid.ItemGroupService = _itemGroupService.ItemGroupService;
Prepaid.ItemService = _itemService.ItemService;
Prepaid.ReportService = _reportService.ReportService;
Prepaid.SaleService = _saleService.SaleService;
Prepaid.StockService = _stockService.StockService;
},{"./contract-service":85,"./item-group-service":86,"./item-service":87,"./report-service":89,"./sale-service":90,"./stock-service":91}],89:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var ReportService = (function (_ProductService) {
    _inherits(ReportService, _ProductService);

    function ReportService() {
        _classCallCheck(this, ReportService);

        _ProductService.call(this);
    }

    ReportService.prototype.getEndpoint = function getEndpoint() {
        return ['prepaid', 'reports'];
    };

    ReportService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return ReportService;
})(_productService.ProductService);

exports.ReportService = ReportService;

ReportService.Uid = ['prepaid', 'reports'].join('.');
},{"../product-service":92}],90:[function(require,module,exports){
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
        return ['prepaid', 'sales'];
    };

    SaleService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    SaleService.prototype.cancel = function cancel(saleId) {
        return this.execute(saleId, 'cancel');
    };

    return SaleService;
})(_productService.ProductService);

exports.SaleService = SaleService;

SaleService.Uid = ['prepaid', 'sales'].join('.');
},{"../product-service":92}],91:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var StockService = (function (_ProductService) {
    _inherits(StockService, _ProductService);

    function StockService() {
        _classCallCheck(this, StockService);

        _ProductService.call(this);
    }

    StockService.prototype.getEndpoint = function getEndpoint() {
        return ['prepaid', 'stocks'];
    };

    StockService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return StockService;
})(_productService.ProductService);

exports.StockService = StockService;

StockService.Uid = ['prepaid', 'stocks'].join('.');
},{"../product-service":92}],92:[function(require,module,exports){
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

    ProductService.prototype.generateRetrieveUrl = function generateRetrieveUrl(id, queryParams, options) {
        var params = {
            endpoint: this.getEndpoint(),
            objectId: id,
            queryParams: queryParams,
            options: options
        };

        return this._generateUrl(_netChannel.Channel.METHOD.GET, params, options);
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

    ProductService.prototype.generateRetrieveWithActionUrl = function generateRetrieveWithActionUrl(id, action, actionArg, options) {

        var params = {
            endpoint: this.getEndpoint(),
            objectId: id,
            action: action,
            actionArg: actionArg,
            options: options
        };

        return this._generateUrl(_netChannel.Channel.METHOD.GET, params, options);
    };

    ProductService.prototype.retrieveList = function retrieveList(queryParams, options) {

        var params = {
            endpoint: this.getEndpoint(),
            queryParams: queryParams,
            options: options
        };

        return this._request(_netChannel.Channel.METHOD.GET, params, options);
    };

    ProductService.prototype.generateRetrieveListUrl = function generateRetrieveListUrl(queryParams, options) {

        var params = {
            endpoint: this.getEndpoint(),
            queryParams: queryParams,
            options: options
        };

        return this._generateUrl(_netChannel.Channel.METHOD.GET, params, options);
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

    ProductService.prototype.patch = function patch(data, options, multipart) {

        var params = {
            endpoint: this.getEndpoint(),
            objectId: data.id,
            data: data,
            options: options,
            multipart: multipart
        };

        return this._request(_netChannel.Channel.METHOD.PATCH, params, options);
    };

    ProductService.prototype.patchWithAction = function patchWithAction(id, action, actionArg, data, options, multipart) {

        var params = {
            endpoint: this.getEndpoint(),
            objectId: id,
            data: data,
            action: action,
            actionArg: actionArg,
            options: options,
            multipart: multipart
        };

        return this._request(_netChannel.Channel.METHOD.PATCH, params, options);
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

    ProductService.prototype._generateUrl = function _generateUrl(method, params, options) {

        if (options == null) {
            options = this.getServiceDefaultOptions();
        }

        if (params.options == null) {
            params.options = options;
        }

        return this.getChannel([_netChannel.Channel.REST]).generateUrl(method, params);
    };

    return ProductService;
})();

exports.ProductService = ProductService;
},{"../net/channel":12,"eventemitter3":111}],93:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _websiteService = require('./website-service');

var Public = {};
exports.Public = Public;
Public.WebsiteService = _websiteService.WebsiteService;
},{"./website-service":94}],94:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var WebsiteService = (function (_ProductService) {
	_inherits(WebsiteService, _ProductService);

	function WebsiteService() {
		_classCallCheck(this, WebsiteService);

		_ProductService.call(this);
	}

	WebsiteService.prototype.getEndpoint = function getEndpoint() {
		return ['public', 'website'];
	};

	WebsiteService.prototype.getEventTargets = function getEventTargets() {
		return [];
	};

	return WebsiteService;
})(_productService.ProductService);

exports.WebsiteService = WebsiteService;

WebsiteService.Uid = ['public', 'website'].join('.');
},{"../product-service":92}],95:[function(require,module,exports){
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
},{"../product-service":92}],96:[function(require,module,exports){
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
},{"../product-service":92}],97:[function(require,module,exports){
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
},{"../product-service":92}],98:[function(require,module,exports){
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
},{"../product-service":92}],99:[function(require,module,exports){
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
},{"./ident-case-service":95,"./ident-contract-service":96,"./ident-request-service":97,"./ident-result-service":98}],100:[function(require,module,exports){
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
},{"../product-service":92}],101:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var ConfigurationService = (function (_ProductService) {
    _inherits(ConfigurationService, _ProductService);

    function ConfigurationService() {
        _classCallCheck(this, ConfigurationService);

        _ProductService.call(this);
    }

    ConfigurationService.prototype.getEndpoint = function getEndpoint() {
        return ['smart', 'configurations'];
    };

    ConfigurationService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    ConfigurationService.prototype.importConfiguration = function importConfiguration(id, data) {
        return this.execute(id, "importConfiguration", null, data, null);
    };

    return ConfigurationService;
})(_productService.ProductService);

exports.ConfigurationService = ConfigurationService;

ConfigurationService.Uid = ['smart', 'configurations'].join('.');
},{"../product-service":92}],102:[function(require,module,exports){
'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var DeviceHistoriesService = (function (_ProductService) {
    _inherits(DeviceHistoriesService, _ProductService);

    function DeviceHistoriesService() {
        _classCallCheck(this, DeviceHistoriesService);

        _ProductService.call(this);
    }

    DeviceHistoriesService.prototype.getEndpoint = function getEndpoint() {
        return ['smart', 'devicehistories'];
    };

    DeviceHistoriesService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return DeviceHistoriesService;
})(_productService.ProductService);

exports.DeviceHistoriesService = DeviceHistoriesService;

DeviceHistoriesService.Uid = ['smart', 'devicehistories'].join('.');
},{"../product-service":92}],103:[function(require,module,exports){
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
},{"../product-service":92}],104:[function(require,module,exports){
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
},{"../product-service":92}],105:[function(require,module,exports){
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
},{"../product-service":92}],106:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _checkinService = require('./checkin-service');

var _configurationService = require('./configuration-service');

var _deviceService = require('./device-service');

var _deviceHistories = require('./device-histories');

var _identService = require('./ident-service');

var _routingService = require('./routing-service');

var _transactionService = require('./transaction-service');

var Smart = {};
exports.Smart = Smart;
Smart.CheckinService = _checkinService.CheckinService;
Smart.ConfigurationService = _configurationService.ConfigurationService;
Smart.DeviceService = _deviceService.DeviceService;
Smart.DeviceHistoriesService = _deviceHistories.DeviceHistoriesService;
Smart.IdentService = _identService.IdentService;
Smart.RoutingService = _routingService.RoutingService;
Smart.TransactionService = _transactionService.TransactionService;
},{"./checkin-service":100,"./configuration-service":101,"./device-histories":102,"./device-service":103,"./ident-service":104,"./routing-service":105,"./transaction-service":107}],107:[function(require,module,exports){
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
},{"../product-service":92}],108:[function(require,module,exports){
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
},{}],109:[function(require,module,exports){

/**
 * Expose `Emitter`.
 */

if (typeof module !== 'undefined') {
  module.exports = Emitter;
}

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
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
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
  function on() {
    this.off(event, on);
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
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
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

  // Remove event specific arrays for event types that no
  // one is subscribed for to avoid memory leak.
  if (callbacks.length === 0) {
    delete this._callbacks['$' + event];
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

  var args = new Array(arguments.length - 1)
    , callbacks = this._callbacks['$' + event];

  for (var i = 1; i < arguments.length; i++) {
    args[i - 1] = arguments[i];
  }

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
  return this._callbacks['$' + event] || [];
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

},{}],110:[function(require,module,exports){
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
},{"_process":125}],111:[function(require,module,exports){
'use strict';

var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once)
    , evt = prefix ? prefix + event : event;

  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  else emitter._events[evt] = [emitter._events[evt], listener];

  return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();
  else delete emitter._events[evt];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event
    , handlers = this._events[evt];

  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event
    , listeners = this._events[evt];

  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
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
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
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
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
      listeners.fn === fn &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
    ) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
        listeners[i].fn !== fn ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else clearEvent(this, evt);
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
if ('undefined' !== typeof module) {
  module.exports = EventEmitter;
}

},{}],112:[function(require,module,exports){
module.exports = stringify
stringify.default = stringify
stringify.stable = deterministicStringify
stringify.stableStringify = deterministicStringify

var arr = []
var replacerStack = []

// Regular stringify
function stringify (obj, replacer, spacer) {
  decirc(obj, '', [], undefined)
  var res
  if (replacerStack.length === 0) {
    res = JSON.stringify(obj, replacer, spacer)
  } else {
    res = JSON.stringify(obj, replaceGetterValues(replacer), spacer)
  }
  while (arr.length !== 0) {
    var part = arr.pop()
    if (part.length === 4) {
      Object.defineProperty(part[0], part[1], part[3])
    } else {
      part[0][part[1]] = part[2]
    }
  }
  return res
}
function decirc (val, k, stack, parent) {
  var i
  if (typeof val === 'object' && val !== null) {
    for (i = 0; i < stack.length; i++) {
      if (stack[i] === val) {
        var propertyDescriptor = Object.getOwnPropertyDescriptor(parent, k)
        if (propertyDescriptor.get !== undefined) {
          if (propertyDescriptor.configurable) {
            Object.defineProperty(parent, k, { value: '[Circular]' })
            arr.push([parent, k, val, propertyDescriptor])
          } else {
            replacerStack.push([val, k])
          }
        } else {
          parent[k] = '[Circular]'
          arr.push([parent, k, val])
        }
        return
      }
    }
    stack.push(val)
    // Optimize for Arrays. Big arrays could kill the performance otherwise!
    if (Array.isArray(val)) {
      for (i = 0; i < val.length; i++) {
        decirc(val[i], i, stack, val)
      }
    } else {
      var keys = Object.keys(val)
      for (i = 0; i < keys.length; i++) {
        var key = keys[i]
        decirc(val[key], key, stack, val)
      }
    }
    stack.pop()
  }
}

// Stable-stringify
function compareFunction (a, b) {
  if (a < b) {
    return -1
  }
  if (a > b) {
    return 1
  }
  return 0
}

function deterministicStringify (obj, replacer, spacer) {
  var tmp = deterministicDecirc(obj, '', [], undefined) || obj
  var res
  if (replacerStack.length === 0) {
    res = JSON.stringify(tmp, replacer, spacer)
  } else {
    res = JSON.stringify(tmp, replaceGetterValues(replacer), spacer)
  }
  while (arr.length !== 0) {
    var part = arr.pop()
    if (part.length === 4) {
      Object.defineProperty(part[0], part[1], part[3])
    } else {
      part[0][part[1]] = part[2]
    }
  }
  return res
}

function deterministicDecirc (val, k, stack, parent) {
  var i
  if (typeof val === 'object' && val !== null) {
    for (i = 0; i < stack.length; i++) {
      if (stack[i] === val) {
        var propertyDescriptor = Object.getOwnPropertyDescriptor(parent, k)
        if (propertyDescriptor.get !== undefined) {
          if (propertyDescriptor.configurable) {
            Object.defineProperty(parent, k, { value: '[Circular]' })
            arr.push([parent, k, val, propertyDescriptor])
          } else {
            replacerStack.push([val, k])
          }
        } else {
          parent[k] = '[Circular]'
          arr.push([parent, k, val])
        }
        return
      }
    }
    if (typeof val.toJSON === 'function') {
      return
    }
    stack.push(val)
    // Optimize for Arrays. Big arrays could kill the performance otherwise!
    if (Array.isArray(val)) {
      for (i = 0; i < val.length; i++) {
        deterministicDecirc(val[i], i, stack, val)
      }
    } else {
      // Create a temporary object in the required way
      var tmp = {}
      var keys = Object.keys(val).sort(compareFunction)
      for (i = 0; i < keys.length; i++) {
        var key = keys[i]
        deterministicDecirc(val[key], key, stack, val)
        tmp[key] = val[key]
      }
      if (parent !== undefined) {
        arr.push([parent, k, val])
        parent[k] = tmp
      } else {
        return tmp
      }
    }
    stack.pop()
  }
}

// wraps replacer function to handle values we couldn't replace
// and mark them as [Circular]
function replaceGetterValues (replacer) {
  replacer = replacer !== undefined ? replacer : function (k, v) { return v }
  return function (key, val) {
    if (replacerStack.length > 0) {
      for (var i = 0; i < replacerStack.length; i++) {
        var part = replacerStack[i]
        if (part[1] === key && part[0] === val) {
          val = '[Circular]'
          replacerStack.splice(i, 1)
          break
        }
      }
    }
    return replacer.call(this, key, val)
  }
}

},{}],113:[function(require,module,exports){
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
  listeners: function(ev) {
    return (this._events ? this._events[ev] || [] : []);
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

},{}],114:[function(require,module,exports){
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
    if(this._black[i] && test(this._black[i], name) && levelMap[level] <= this._black[i].l) {
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

},{"./transform.js":116}],115:[function(require,module,exports){
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


},{"./filter.js":114,"./transform.js":116}],116:[function(require,module,exports){
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

},{"microee":113}],117:[function(require,module,exports){
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

},{"../common/transform.js":116}],118:[function(require,module,exports){
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

},{"../common/transform.js":116,"./formatters/color.js":119,"./formatters/minilog.js":120}],119:[function(require,module,exports){
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

},{"../../common/transform.js":116,"./util.js":121}],120:[function(require,module,exports){
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

},{"../../common/transform.js":116,"./util.js":121}],121:[function(require,module,exports){
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

},{}],122:[function(require,module,exports){
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

},{"../common/minilog.js":115,"./array.js":117,"./console.js":118,"./jquery_simple.js":123,"./localstorage.js":124}],123:[function(require,module,exports){
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
    // Test each log line and only log the ones that are valid (e.g. don't have circular references).
    // Slight performance hit but benefit is we log all valid lines.
    for(i = 0; i < self.cache.length; i++) {
      try {
        JSON.stringify(self.cache[i]);
        logs.push(self.cache[i]);
      } catch(e) { }
    }
    if(self.jQuery.isEmptyObject(self.extras)) {
        ajaxData = JSON.stringify({ logs: logs });
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

},{"../common/transform.js":116}],124:[function(require,module,exports){
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
},{"../common/transform.js":116}],125:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
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
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
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
        runTimeout(drainQueue);
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
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],126:[function(require,module,exports){
'use strict';

var replace = String.prototype.replace;
var percentTwenties = /%20/g;

var util = require('./utils');

var Format = {
    RFC1738: 'RFC1738',
    RFC3986: 'RFC3986'
};

module.exports = util.assign(
    {
        'default': Format.RFC3986,
        formatters: {
            RFC1738: function (value) {
                return replace.call(value, percentTwenties, '+');
            },
            RFC3986: function (value) {
                return String(value);
            }
        }
    },
    Format
);

},{"./utils":130}],127:[function(require,module,exports){
'use strict';

var stringify = require('./stringify');
var parse = require('./parse');
var formats = require('./formats');

module.exports = {
    formats: formats,
    parse: parse,
    stringify: stringify
};

},{"./formats":126,"./parse":128,"./stringify":129}],128:[function(require,module,exports){
'use strict';

var utils = require('./utils');

var has = Object.prototype.hasOwnProperty;
var isArray = Array.isArray;

var defaults = {
    allowDots: false,
    allowPrototypes: false,
    arrayLimit: 20,
    charset: 'utf-8',
    charsetSentinel: false,
    comma: false,
    decoder: utils.decode,
    delimiter: '&',
    depth: 5,
    ignoreQueryPrefix: false,
    interpretNumericEntities: false,
    parameterLimit: 1000,
    parseArrays: true,
    plainObjects: false,
    strictNullHandling: false
};

var interpretNumericEntities = function (str) {
    return str.replace(/&#(\d+);/g, function ($0, numberStr) {
        return String.fromCharCode(parseInt(numberStr, 10));
    });
};

var parseArrayValue = function (val, options) {
    if (val && typeof val === 'string' && options.comma && val.indexOf(',') > -1) {
        return val.split(',');
    }

    return val;
};

// This is what browsers will submit when the ✓ character occurs in an
// application/x-www-form-urlencoded body and the encoding of the page containing
// the form is iso-8859-1, or when the submitted form has an accept-charset
// attribute of iso-8859-1. Presumably also with other charsets that do not contain
// the ✓ character, such as us-ascii.
var isoSentinel = 'utf8=%26%2310003%3B'; // encodeURIComponent('&#10003;')

// These are the percent-encoded utf-8 octets representing a checkmark, indicating that the request actually is utf-8 encoded.
var charsetSentinel = 'utf8=%E2%9C%93'; // encodeURIComponent('✓')

var parseValues = function parseQueryStringValues(str, options) {
    var obj = {};
    var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
    var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
    var parts = cleanStr.split(options.delimiter, limit);
    var skipIndex = -1; // Keep track of where the utf8 sentinel was found
    var i;

    var charset = options.charset;
    if (options.charsetSentinel) {
        for (i = 0; i < parts.length; ++i) {
            if (parts[i].indexOf('utf8=') === 0) {
                if (parts[i] === charsetSentinel) {
                    charset = 'utf-8';
                } else if (parts[i] === isoSentinel) {
                    charset = 'iso-8859-1';
                }
                skipIndex = i;
                i = parts.length; // The eslint settings do not allow break;
            }
        }
    }

    for (i = 0; i < parts.length; ++i) {
        if (i === skipIndex) {
            continue;
        }
        var part = parts[i];

        var bracketEqualsPos = part.indexOf(']=');
        var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;

        var key, val;
        if (pos === -1) {
            key = options.decoder(part, defaults.decoder, charset, 'key');
            val = options.strictNullHandling ? null : '';
        } else {
            key = options.decoder(part.slice(0, pos), defaults.decoder, charset, 'key');
            val = utils.maybeMap(
                parseArrayValue(part.slice(pos + 1), options),
                function (encodedVal) {
                    return options.decoder(encodedVal, defaults.decoder, charset, 'value');
                }
            );
        }

        if (val && options.interpretNumericEntities && charset === 'iso-8859-1') {
            val = interpretNumericEntities(val);
        }

        if (part.indexOf('[]=') > -1) {
            val = isArray(val) ? [val] : val;
        }

        if (has.call(obj, key)) {
            obj[key] = utils.combine(obj[key], val);
        } else {
            obj[key] = val;
        }
    }

    return obj;
};

var parseObject = function (chain, val, options, valuesParsed) {
    var leaf = valuesParsed ? val : parseArrayValue(val, options);

    for (var i = chain.length - 1; i >= 0; --i) {
        var obj;
        var root = chain[i];

        if (root === '[]' && options.parseArrays) {
            obj = [].concat(leaf);
        } else {
            obj = options.plainObjects ? Object.create(null) : {};
            var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
            var index = parseInt(cleanRoot, 10);
            if (!options.parseArrays && cleanRoot === '') {
                obj = { 0: leaf };
            } else if (
                !isNaN(index)
                && root !== cleanRoot
                && String(index) === cleanRoot
                && index >= 0
                && (options.parseArrays && index <= options.arrayLimit)
            ) {
                obj = [];
                obj[index] = leaf;
            } else {
                obj[cleanRoot] = leaf;
            }
        }

        leaf = obj; // eslint-disable-line no-param-reassign
    }

    return leaf;
};

var parseKeys = function parseQueryStringKeys(givenKey, val, options, valuesParsed) {
    if (!givenKey) {
        return;
    }

    // Transform dot notation to bracket notation
    var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

    // The regex chunks

    var brackets = /(\[[^[\]]*])/;
    var child = /(\[[^[\]]*])/g;

    // Get the parent

    var segment = options.depth > 0 && brackets.exec(key);
    var parent = segment ? key.slice(0, segment.index) : key;

    // Stash the parent if it exists

    var keys = [];
    if (parent) {
        // If we aren't using plain objects, optionally prefix keys that would overwrite object prototype properties
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
            if (!options.allowPrototypes) {
                return;
            }
        }

        keys.push(parent);
    }

    // Loop through children appending to the array until we hit depth

    var i = 0;
    while (options.depth > 0 && (segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
            if (!options.allowPrototypes) {
                return;
            }
        }
        keys.push(segment[1]);
    }

    // If there's a remainder, just add whatever is left

    if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
    }

    return parseObject(keys, val, options, valuesParsed);
};

var normalizeParseOptions = function normalizeParseOptions(opts) {
    if (!opts) {
        return defaults;
    }

    if (opts.decoder !== null && opts.decoder !== undefined && typeof opts.decoder !== 'function') {
        throw new TypeError('Decoder has to be a function.');
    }

    if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
        throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
    }
    var charset = typeof opts.charset === 'undefined' ? defaults.charset : opts.charset;

    return {
        allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,
        allowPrototypes: typeof opts.allowPrototypes === 'boolean' ? opts.allowPrototypes : defaults.allowPrototypes,
        arrayLimit: typeof opts.arrayLimit === 'number' ? opts.arrayLimit : defaults.arrayLimit,
        charset: charset,
        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
        comma: typeof opts.comma === 'boolean' ? opts.comma : defaults.comma,
        decoder: typeof opts.decoder === 'function' ? opts.decoder : defaults.decoder,
        delimiter: typeof opts.delimiter === 'string' || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults.delimiter,
        // eslint-disable-next-line no-implicit-coercion, no-extra-parens
        depth: (typeof opts.depth === 'number' || opts.depth === false) ? +opts.depth : defaults.depth,
        ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
        interpretNumericEntities: typeof opts.interpretNumericEntities === 'boolean' ? opts.interpretNumericEntities : defaults.interpretNumericEntities,
        parameterLimit: typeof opts.parameterLimit === 'number' ? opts.parameterLimit : defaults.parameterLimit,
        parseArrays: opts.parseArrays !== false,
        plainObjects: typeof opts.plainObjects === 'boolean' ? opts.plainObjects : defaults.plainObjects,
        strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
    };
};

module.exports = function (str, opts) {
    var options = normalizeParseOptions(opts);

    if (str === '' || str === null || typeof str === 'undefined') {
        return options.plainObjects ? Object.create(null) : {};
    }

    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
    var obj = options.plainObjects ? Object.create(null) : {};

    // Iterate over the keys and setup the new object

    var keys = Object.keys(tempObj);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options, typeof str === 'string');
        obj = utils.merge(obj, newObj, options);
    }

    return utils.compact(obj);
};

},{"./utils":130}],129:[function(require,module,exports){
'use strict';

var utils = require('./utils');
var formats = require('./formats');
var has = Object.prototype.hasOwnProperty;

var arrayPrefixGenerators = {
    brackets: function brackets(prefix) {
        return prefix + '[]';
    },
    comma: 'comma',
    indices: function indices(prefix, key) {
        return prefix + '[' + key + ']';
    },
    repeat: function repeat(prefix) {
        return prefix;
    }
};

var isArray = Array.isArray;
var push = Array.prototype.push;
var pushToArray = function (arr, valueOrArray) {
    push.apply(arr, isArray(valueOrArray) ? valueOrArray : [valueOrArray]);
};

var toISO = Date.prototype.toISOString;

var defaultFormat = formats['default'];
var defaults = {
    addQueryPrefix: false,
    allowDots: false,
    charset: 'utf-8',
    charsetSentinel: false,
    delimiter: '&',
    encode: true,
    encoder: utils.encode,
    encodeValuesOnly: false,
    format: defaultFormat,
    formatter: formats.formatters[defaultFormat],
    // deprecated
    indices: false,
    serializeDate: function serializeDate(date) {
        return toISO.call(date);
    },
    skipNulls: false,
    strictNullHandling: false
};

var isNonNullishPrimitive = function isNonNullishPrimitive(v) {
    return typeof v === 'string'
        || typeof v === 'number'
        || typeof v === 'boolean'
        || typeof v === 'symbol'
        || typeof v === 'bigint';
};

var stringify = function stringify(
    object,
    prefix,
    generateArrayPrefix,
    strictNullHandling,
    skipNulls,
    encoder,
    filter,
    sort,
    allowDots,
    serializeDate,
    formatter,
    encodeValuesOnly,
    charset
) {
    var obj = object;
    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
        obj = serializeDate(obj);
    } else if (generateArrayPrefix === 'comma' && isArray(obj)) {
        obj = utils.maybeMap(obj, function (value) {
            if (value instanceof Date) {
                return serializeDate(value);
            }
            return value;
        }).join(',');
    }

    if (obj === null) {
        if (strictNullHandling) {
            return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder, charset, 'key') : prefix;
        }

        obj = '';
    }

    if (isNonNullishPrimitive(obj) || utils.isBuffer(obj)) {
        if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset, 'key');
            return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults.encoder, charset, 'value'))];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys;
    if (isArray(filter)) {
        objKeys = filter;
    } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];
        var value = obj[key];

        if (skipNulls && value === null) {
            continue;
        }

        var keyPrefix = isArray(obj)
            ? typeof generateArrayPrefix === 'function' ? generateArrayPrefix(prefix, key) : prefix
            : prefix + (allowDots ? '.' + key : '[' + key + ']');

        pushToArray(values, stringify(
            value,
            keyPrefix,
            generateArrayPrefix,
            strictNullHandling,
            skipNulls,
            encoder,
            filter,
            sort,
            allowDots,
            serializeDate,
            formatter,
            encodeValuesOnly,
            charset
        ));
    }

    return values;
};

var normalizeStringifyOptions = function normalizeStringifyOptions(opts) {
    if (!opts) {
        return defaults;
    }

    if (opts.encoder !== null && opts.encoder !== undefined && typeof opts.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
    }

    var charset = opts.charset || defaults.charset;
    if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
        throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
    }

    var format = formats['default'];
    if (typeof opts.format !== 'undefined') {
        if (!has.call(formats.formatters, opts.format)) {
            throw new TypeError('Unknown format option provided.');
        }
        format = opts.format;
    }
    var formatter = formats.formatters[format];

    var filter = defaults.filter;
    if (typeof opts.filter === 'function' || isArray(opts.filter)) {
        filter = opts.filter;
    }

    return {
        addQueryPrefix: typeof opts.addQueryPrefix === 'boolean' ? opts.addQueryPrefix : defaults.addQueryPrefix,
        allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,
        charset: charset,
        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
        delimiter: typeof opts.delimiter === 'undefined' ? defaults.delimiter : opts.delimiter,
        encode: typeof opts.encode === 'boolean' ? opts.encode : defaults.encode,
        encoder: typeof opts.encoder === 'function' ? opts.encoder : defaults.encoder,
        encodeValuesOnly: typeof opts.encodeValuesOnly === 'boolean' ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
        filter: filter,
        formatter: formatter,
        serializeDate: typeof opts.serializeDate === 'function' ? opts.serializeDate : defaults.serializeDate,
        skipNulls: typeof opts.skipNulls === 'boolean' ? opts.skipNulls : defaults.skipNulls,
        sort: typeof opts.sort === 'function' ? opts.sort : null,
        strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
    };
};

module.exports = function (object, opts) {
    var obj = object;
    var options = normalizeStringifyOptions(opts);

    var objKeys;
    var filter;

    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    } else if (isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
    }

    var keys = [];

    if (typeof obj !== 'object' || obj === null) {
        return '';
    }

    var arrayFormat;
    if (opts && opts.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = opts.arrayFormat;
    } else if (opts && 'indices' in opts) {
        arrayFormat = opts.indices ? 'indices' : 'repeat';
    } else {
        arrayFormat = 'indices';
    }

    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

    if (!objKeys) {
        objKeys = Object.keys(obj);
    }

    if (options.sort) {
        objKeys.sort(options.sort);
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (options.skipNulls && obj[key] === null) {
            continue;
        }
        pushToArray(keys, stringify(
            obj[key],
            key,
            generateArrayPrefix,
            options.strictNullHandling,
            options.skipNulls,
            options.encode ? options.encoder : null,
            options.filter,
            options.sort,
            options.allowDots,
            options.serializeDate,
            options.formatter,
            options.encodeValuesOnly,
            options.charset
        ));
    }

    var joined = keys.join(options.delimiter);
    var prefix = options.addQueryPrefix === true ? '?' : '';

    if (options.charsetSentinel) {
        if (options.charset === 'iso-8859-1') {
            // encodeURIComponent('&#10003;'), the "numeric entity" representation of a checkmark
            prefix += 'utf8=%26%2310003%3B&';
        } else {
            // encodeURIComponent('✓')
            prefix += 'utf8=%E2%9C%93&';
        }
    }

    return joined.length > 0 ? prefix + joined : '';
};

},{"./formats":126,"./utils":130}],130:[function(require,module,exports){
'use strict';

var has = Object.prototype.hasOwnProperty;
var isArray = Array.isArray;

var hexTable = (function () {
    var array = [];
    for (var i = 0; i < 256; ++i) {
        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
    }

    return array;
}());

var compactQueue = function compactQueue(queue) {
    while (queue.length > 1) {
        var item = queue.pop();
        var obj = item.obj[item.prop];

        if (isArray(obj)) {
            var compacted = [];

            for (var j = 0; j < obj.length; ++j) {
                if (typeof obj[j] !== 'undefined') {
                    compacted.push(obj[j]);
                }
            }

            item.obj[item.prop] = compacted;
        }
    }
};

var arrayToObject = function arrayToObject(source, options) {
    var obj = options && options.plainObjects ? Object.create(null) : {};
    for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== 'undefined') {
            obj[i] = source[i];
        }
    }

    return obj;
};

var merge = function merge(target, source, options) {
    /* eslint no-param-reassign: 0 */
    if (!source) {
        return target;
    }

    if (typeof source !== 'object') {
        if (isArray(target)) {
            target.push(source);
        } else if (target && typeof target === 'object') {
            if ((options && (options.plainObjects || options.allowPrototypes)) || !has.call(Object.prototype, source)) {
                target[source] = true;
            }
        } else {
            return [target, source];
        }

        return target;
    }

    if (!target || typeof target !== 'object') {
        return [target].concat(source);
    }

    var mergeTarget = target;
    if (isArray(target) && !isArray(source)) {
        mergeTarget = arrayToObject(target, options);
    }

    if (isArray(target) && isArray(source)) {
        source.forEach(function (item, i) {
            if (has.call(target, i)) {
                var targetItem = target[i];
                if (targetItem && typeof targetItem === 'object' && item && typeof item === 'object') {
                    target[i] = merge(targetItem, item, options);
                } else {
                    target.push(item);
                }
            } else {
                target[i] = item;
            }
        });
        return target;
    }

    return Object.keys(source).reduce(function (acc, key) {
        var value = source[key];

        if (has.call(acc, key)) {
            acc[key] = merge(acc[key], value, options);
        } else {
            acc[key] = value;
        }
        return acc;
    }, mergeTarget);
};

var assign = function assignSingleSource(target, source) {
    return Object.keys(source).reduce(function (acc, key) {
        acc[key] = source[key];
        return acc;
    }, target);
};

var decode = function (str, decoder, charset) {
    var strWithoutPlus = str.replace(/\+/g, ' ');
    if (charset === 'iso-8859-1') {
        // unescape never throws, no try...catch needed:
        return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
    }
    // utf-8
    try {
        return decodeURIComponent(strWithoutPlus);
    } catch (e) {
        return strWithoutPlus;
    }
};

var encode = function encode(str, defaultEncoder, charset) {
    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
    // It has been adapted here for stricter adherence to RFC 3986
    if (str.length === 0) {
        return str;
    }

    var string = str;
    if (typeof str === 'symbol') {
        string = Symbol.prototype.toString.call(str);
    } else if (typeof str !== 'string') {
        string = String(str);
    }

    if (charset === 'iso-8859-1') {
        return escape(string).replace(/%u[0-9a-f]{4}/gi, function ($0) {
            return '%26%23' + parseInt($0.slice(2), 16) + '%3B';
        });
    }

    var out = '';
    for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);

        if (
            c === 0x2D // -
            || c === 0x2E // .
            || c === 0x5F // _
            || c === 0x7E // ~
            || (c >= 0x30 && c <= 0x39) // 0-9
            || (c >= 0x41 && c <= 0x5A) // a-z
            || (c >= 0x61 && c <= 0x7A) // A-Z
        ) {
            out += string.charAt(i);
            continue;
        }

        if (c < 0x80) {
            out = out + hexTable[c];
            continue;
        }

        if (c < 0x800) {
            out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        if (c < 0xD800 || c >= 0xE000) {
            out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        i += 1;
        c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
        out += hexTable[0xF0 | (c >> 18)]
            + hexTable[0x80 | ((c >> 12) & 0x3F)]
            + hexTable[0x80 | ((c >> 6) & 0x3F)]
            + hexTable[0x80 | (c & 0x3F)];
    }

    return out;
};

var compact = function compact(value) {
    var queue = [{ obj: { o: value }, prop: 'o' }];
    var refs = [];

    for (var i = 0; i < queue.length; ++i) {
        var item = queue[i];
        var obj = item.obj[item.prop];

        var keys = Object.keys(obj);
        for (var j = 0; j < keys.length; ++j) {
            var key = keys[j];
            var val = obj[key];
            if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
                queue.push({ obj: obj, prop: key });
                refs.push(val);
            }
        }
    }

    compactQueue(queue);

    return value;
};

var isRegExp = function isRegExp(obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};

var isBuffer = function isBuffer(obj) {
    if (!obj || typeof obj !== 'object') {
        return false;
    }

    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};

var combine = function combine(a, b) {
    return [].concat(a, b);
};

var maybeMap = function maybeMap(val, fn) {
    if (isArray(val)) {
        var mapped = [];
        for (var i = 0; i < val.length; i += 1) {
            mapped.push(fn(val[i]));
        }
        return mapped;
    }
    return fn(val);
};

module.exports = {
    arrayToObject: arrayToObject,
    assign: assign,
    combine: combine,
    compact: compact,
    decode: decode,
    encode: encode,
    isBuffer: isBuffer,
    isRegExp: isRegExp,
    maybeMap: maybeMap,
    merge: merge
};

},{}],131:[function(require,module,exports){
"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function Agent() {
  this._defaults = [];
}

['use', 'on', 'once', 'set', 'query', 'type', 'accept', 'auth', 'withCredentials', 'sortQuery', 'retry', 'ok', 'redirects', 'timeout', 'buffer', 'serialize', 'parse', 'ca', 'key', 'pfx', 'cert', 'disableTLSCerts'].forEach(function (fn) {
  // Default setting for all requests from this agent
  Agent.prototype[fn] = function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    this._defaults.push({
      fn: fn,
      args: args
    });

    return this;
  };
});

Agent.prototype._setDefaults = function (req) {
  this._defaults.forEach(function (def) {
    req[def.fn].apply(req, _toConsumableArray(def.args));
  });
};

module.exports = Agent;

},{}],132:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Root reference for iframes.
 */
var root;

if (typeof window !== 'undefined') {
  // Browser window
  root = window;
} else if (typeof self === 'undefined') {
  // Other environments
  console.warn('Using browser-only version of superagent in non-browser environment');
  root = void 0;
} else {
  // Web Worker
  root = self;
}

var Emitter = require('component-emitter');

var safeStringify = require('fast-safe-stringify');

var qs = require('qs');

var RequestBase = require('./request-base');

var isObject = require('./is-object');

var ResponseBase = require('./response-base');

var Agent = require('./agent-base');
/**
 * Noop.
 */


function noop() {}
/**
 * Expose `request`.
 */


module.exports = function (method, url) {
  // callback
  if (typeof url === 'function') {
    return new exports.Request('GET', method).end(url);
  } // url first


  if (arguments.length === 1) {
    return new exports.Request('GET', method);
  }

  return new exports.Request(method, url);
};

exports = module.exports;
var request = exports;
exports.Request = Request;
/**
 * Determine XHR.
 */

request.getXHR = function () {
  if (root.XMLHttpRequest && (!root.location || root.location.protocol !== 'file:' || !root.ActiveXObject)) {
    return new XMLHttpRequest();
  }

  try {
    return new ActiveXObject('Microsoft.XMLHTTP');
  } catch (_unused) {}

  try {
    return new ActiveXObject('Msxml2.XMLHTTP.6.0');
  } catch (_unused2) {}

  try {
    return new ActiveXObject('Msxml2.XMLHTTP.3.0');
  } catch (_unused3) {}

  try {
    return new ActiveXObject('Msxml2.XMLHTTP');
  } catch (_unused4) {}

  throw new Error('Browser-only version of superagent could not find XHR');
};
/**
 * Removes leading and trailing whitespace, added to support IE.
 *
 * @param {String} s
 * @return {String}
 * @api private
 */


var trim = ''.trim ? function (s) {
  return s.trim();
} : function (s) {
  return s.replace(/(^\s*|\s*$)/g, '');
};
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
    if (Object.prototype.hasOwnProperty.call(obj, key)) pushEncodedKeyValuePair(pairs, key, obj[key]);
  }

  return pairs.join('&');
}
/**
 * Helps 'serialize' with serializing arrays.
 * Mutates the pairs array.
 *
 * @param {Array} pairs
 * @param {String} key
 * @param {Mixed} val
 */


function pushEncodedKeyValuePair(pairs, key, val) {
  if (val === undefined) return;

  if (val === null) {
    pairs.push(encodeURI(key));
    return;
  }

  if (Array.isArray(val)) {
    val.forEach(function (v) {
      pushEncodedKeyValuePair(pairs, key, v);
    });
  } else if (isObject(val)) {
    for (var subkey in val) {
      if (Object.prototype.hasOwnProperty.call(val, subkey)) pushEncodedKeyValuePair(pairs, "".concat(key, "[").concat(subkey, "]"), val[subkey]);
    }
  } else {
    pairs.push(encodeURI(key) + '=' + encodeURIComponent(val));
  }
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
  var pair;
  var pos;

  for (var i = 0, len = pairs.length; i < len; ++i) {
    pair = pairs[i];
    pos = pair.indexOf('=');

    if (pos === -1) {
      obj[decodeURIComponent(pair)] = '';
    } else {
      obj[decodeURIComponent(pair.slice(0, pos))] = decodeURIComponent(pair.slice(pos + 1));
    }
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
  xml: 'text/xml',
  urlencoded: 'application/x-www-form-urlencoded',
  form: 'application/x-www-form-urlencoded',
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
  'application/x-www-form-urlencoded': qs.stringify,
  'application/json': safeStringify
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

  for (var i = 0, len = lines.length; i < len; ++i) {
    line = lines[i];
    index = line.indexOf(':');

    if (index === -1) {
      // could be empty line, just skip it
      continue;
    }

    field = line.slice(0, index).toLowerCase();
    val = trim(line.slice(index + 1));
    fields[field] = val;
  }

  return fields;
}
/**
 * Check if `mime` is json or has +json structured syntax suffix.
 *
 * @param {String} mime
 * @return {Boolean}
 * @api private
 */


function isJSON(mime) {
  // should match /json or +json
  // but not /json-seq
  return /[/+]json($|[^-\w])/i.test(mime);
}
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


function Response(req) {
  this.req = req;
  this.xhr = this.req.xhr; // responseText is accessible only if responseType is '' or 'text' and on older browsers

  this.text = this.req.method !== 'HEAD' && (this.xhr.responseType === '' || this.xhr.responseType === 'text') || typeof this.xhr.responseType === 'undefined' ? this.xhr.responseText : null;
  this.statusText = this.req.xhr.statusText;
  var status = this.xhr.status; // handle IE9 bug: http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request

  if (status === 1223) {
    status = 204;
  }

  this._setStatusProperties(status);

  this.headers = parseHeader(this.xhr.getAllResponseHeaders());
  this.header = this.headers; // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
  // getResponseHeader still works. so we get content-type even if getting
  // other headers fails.

  this.header['content-type'] = this.xhr.getResponseHeader('content-type');

  this._setHeaderProperties(this.header);

  if (this.text === null && req._responseType) {
    this.body = this.xhr.response;
  } else {
    this.body = this.req.method === 'HEAD' ? null : this._parseBody(this.text ? this.text : this.xhr.response);
  }
} // eslint-disable-next-line new-cap


ResponseBase(Response.prototype);
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

Response.prototype._parseBody = function (str) {
  var parse = request.parse[this.type];

  if (this.req._parser) {
    return this.req._parser(this, str);
  }

  if (!parse && isJSON(this.type)) {
    parse = request.parse['application/json'];
  }

  return parse && str && (str.length > 0 || str instanceof Object) ? parse(str) : null;
};
/**
 * Return an `Error` representative of this response.
 *
 * @return {Error}
 * @api public
 */


Response.prototype.toError = function () {
  var req = this.req;
  var method = req.method;
  var url = req.url;
  var msg = "cannot ".concat(method, " ").concat(url, " (").concat(this.status, ")");
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
  this._query = this._query || [];
  this.method = method;
  this.url = url;
  this.header = {}; // preserves header name case

  this._header = {}; // coerces header names to lowercase

  this.on('end', function () {
    var err = null;
    var res = null;

    try {
      res = new Response(self);
    } catch (err_) {
      err = new Error('Parser is unable to parse the response');
      err.parse = true;
      err.original = err_; // issue #675: return the raw response if the response parsing fails

      if (self.xhr) {
        // ie9 doesn't have 'response' property
        err.rawResponse = typeof self.xhr.responseType === 'undefined' ? self.xhr.responseText : self.xhr.response; // issue #876: return the http status code if the response parsing fails

        err.status = self.xhr.status ? self.xhr.status : null;
        err.statusCode = err.status; // backwards-compat only
      } else {
        err.rawResponse = null;
        err.status = null;
      }

      return self.callback(err);
    }

    self.emit('response', res);
    var new_err;

    try {
      if (!self._isResponseOK(res)) {
        new_err = new Error(res.statusText || res.text || 'Unsuccessful HTTP response');
      }
    } catch (err_) {
      new_err = err_; // ok() callback can throw
    } // #1000 don't catch errors from the callback to avoid double calling it


    if (new_err) {
      new_err.original = err;
      new_err.response = res;
      new_err.status = res.status;
      self.callback(new_err, res);
    } else {
      self.callback(null, res);
    }
  });
}
/**
 * Mixin `Emitter` and `RequestBase`.
 */
// eslint-disable-next-line new-cap


Emitter(Request.prototype); // eslint-disable-next-line new-cap

RequestBase(Request.prototype);
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

Request.prototype.type = function (type) {
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


Request.prototype.accept = function (type) {
  this.set('Accept', request.types[type] || type);
  return this;
};
/**
 * Set Authorization field value with `user` and `pass`.
 *
 * @param {String} user
 * @param {String} [pass] optional in case of using 'bearer' as type
 * @param {Object} options with 'type' property 'auto', 'basic' or 'bearer' (default 'basic')
 * @return {Request} for chaining
 * @api public
 */


Request.prototype.auth = function (user, pass, options) {
  if (arguments.length === 1) pass = '';

  if (_typeof(pass) === 'object' && pass !== null) {
    // pass is optional and can be replaced with options
    options = pass;
    pass = '';
  }

  if (!options) {
    options = {
      type: typeof btoa === 'function' ? 'basic' : 'auto'
    };
  }

  var encoder = function encoder(string) {
    if (typeof btoa === 'function') {
      return btoa(string);
    }

    throw new Error('Cannot use basic auth, btoa is not a function');
  };

  return this._auth(user, pass, options, encoder);
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


Request.prototype.query = function (val) {
  if (typeof val !== 'string') val = serialize(val);
  if (val) this._query.push(val);
  return this;
};
/**
 * Queue the given `file` as an attachment to the specified `field`,
 * with optional `options` (or filename).
 *
 * ``` js
 * request.post('/upload')
 *   .attach('content', new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
 *   .end(callback);
 * ```
 *
 * @param {String} field
 * @param {Blob|File} file
 * @param {String|Object} options
 * @return {Request} for chaining
 * @api public
 */


Request.prototype.attach = function (field, file, options) {
  if (file) {
    if (this._data) {
      throw new Error("superagent can't mix .send() and .attach()");
    }

    this._getFormData().append(field, file, options || file.name);
  }

  return this;
};

Request.prototype._getFormData = function () {
  if (!this._formData) {
    this._formData = new root.FormData();
  }

  return this._formData;
};
/**
 * Invoke the callback with `err` and `res`
 * and handle arity check.
 *
 * @param {Error} err
 * @param {Response} res
 * @api private
 */


Request.prototype.callback = function (err, res) {
  if (this._shouldRetry(err, res)) {
    return this._retry();
  }

  var fn = this._callback;
  this.clearTimeout();

  if (err) {
    if (this._maxRetries) err.retries = this._retries - 1;
    this.emit('error', err);
  }

  fn(err, res);
};
/**
 * Invoke callback with x-domain error.
 *
 * @api private
 */


Request.prototype.crossDomainError = function () {
  var err = new Error('Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.');
  err.crossDomain = true;
  err.status = this.status;
  err.method = this.method;
  err.url = this.url;
  this.callback(err);
}; // This only warns, because the request is still likely to work


Request.prototype.agent = function () {
  console.warn('This is not supported in browser version of superagent');
  return this;
};

Request.prototype.ca = Request.prototype.agent;
Request.prototype.buffer = Request.prototype.ca; // This throws, because it can't send/receive data as expected

Request.prototype.write = function () {
  throw new Error('Streaming is not supported in browser version of superagent');
};

Request.prototype.pipe = Request.prototype.write;
/**
 * Check if `obj` is a host object,
 * we don't want to serialize these :)
 *
 * @param {Object} obj host object
 * @return {Boolean} is a host object
 * @api private
 */

Request.prototype._isHost = function (obj) {
  // Native objects stringify to [object File], [object Blob], [object FormData], etc.
  return obj && _typeof(obj) === 'object' && !Array.isArray(obj) && Object.prototype.toString.call(obj) !== '[object Object]';
};
/**
 * Initiate request, invoking callback `fn(res)`
 * with an instanceof `Response`.
 *
 * @param {Function} fn
 * @return {Request} for chaining
 * @api public
 */


Request.prototype.end = function (fn) {
  if (this._endCalled) {
    console.warn('Warning: .end() was called twice. This is not supported in superagent');
  }

  this._endCalled = true; // store callback

  this._callback = fn || noop; // querystring

  this._finalizeQueryString();

  this._end();
};

Request.prototype._setUploadTimeout = function () {
  var self = this; // upload timeout it's wokrs only if deadline timeout is off

  if (this._uploadTimeout && !this._uploadTimeoutTimer) {
    this._uploadTimeoutTimer = setTimeout(function () {
      self._timeoutError('Upload timeout of ', self._uploadTimeout, 'ETIMEDOUT');
    }, this._uploadTimeout);
  }
}; // eslint-disable-next-line complexity


Request.prototype._end = function () {
  if (this._aborted) return this.callback(new Error('The request has been aborted even before .end() was called'));
  var self = this;
  this.xhr = request.getXHR();
  var xhr = this.xhr;
  var data = this._formData || this._data;

  this._setTimeouts(); // state change


  xhr.onreadystatechange = function () {
    var readyState = xhr.readyState;

    if (readyState >= 2 && self._responseTimeoutTimer) {
      clearTimeout(self._responseTimeoutTimer);
    }

    if (readyState !== 4) {
      return;
    } // In IE9, reads to any property (e.g. status) off of an aborted XHR will
    // result in the error "Could not complete the operation due to error c00c023f"


    var status;

    try {
      status = xhr.status;
    } catch (_unused5) {
      status = 0;
    }

    if (!status) {
      if (self.timedout || self._aborted) return;
      return self.crossDomainError();
    }

    self.emit('end');
  }; // progress


  var handleProgress = function handleProgress(direction, e) {
    if (e.total > 0) {
      e.percent = e.loaded / e.total * 100;

      if (e.percent === 100) {
        clearTimeout(self._uploadTimeoutTimer);
      }
    }

    e.direction = direction;
    self.emit('progress', e);
  };

  if (this.hasListeners('progress')) {
    try {
      xhr.addEventListener('progress', handleProgress.bind(null, 'download'));

      if (xhr.upload) {
        xhr.upload.addEventListener('progress', handleProgress.bind(null, 'upload'));
      }
    } catch (_unused6) {// Accessing xhr.upload fails in IE from a web worker, so just pretend it doesn't exist.
      // Reported here:
      // https://connect.microsoft.com/IE/feedback/details/837245/xmlhttprequest-upload-throws-invalid-argument-when-used-from-web-worker-context
    }
  }

  if (xhr.upload) {
    this._setUploadTimeout();
  } // initiate request


  try {
    if (this.username && this.password) {
      xhr.open(this.method, this.url, true, this.username, this.password);
    } else {
      xhr.open(this.method, this.url, true);
    }
  } catch (err) {
    // see #1149
    return this.callback(err);
  } // CORS


  if (this._withCredentials) xhr.withCredentials = true; // body

  if (!this._formData && this.method !== 'GET' && this.method !== 'HEAD' && typeof data !== 'string' && !this._isHost(data)) {
    // serialize stuff
    var contentType = this._header['content-type'];

    var _serialize = this._serializer || request.serialize[contentType ? contentType.split(';')[0] : ''];

    if (!_serialize && isJSON(contentType)) {
      _serialize = request.serialize['application/json'];
    }

    if (_serialize) data = _serialize(data);
  } // set header fields


  for (var field in this.header) {
    if (this.header[field] === null) continue;
    if (Object.prototype.hasOwnProperty.call(this.header, field)) xhr.setRequestHeader(field, this.header[field]);
  }

  if (this._responseType) {
    xhr.responseType = this._responseType;
  } // send stuff


  this.emit('request', this); // IE11 xhr.send(undefined) sends 'undefined' string as POST payload (instead of nothing)
  // We need null here if data is undefined

  xhr.send(typeof data === 'undefined' ? null : data);
};

request.agent = function () {
  return new Agent();
};

['GET', 'POST', 'OPTIONS', 'PATCH', 'PUT', 'DELETE'].forEach(function (method) {
  Agent.prototype[method.toLowerCase()] = function (url, fn) {
    var req = new request.Request(method, url);

    this._setDefaults(req);

    if (fn) {
      req.end(fn);
    }

    return req;
  };
});
Agent.prototype.del = Agent.prototype.delete;
/**
 * GET `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.get = function (url, data, fn) {
  var req = request('GET', url);

  if (typeof data === 'function') {
    fn = data;
    data = null;
  }

  if (data) req.query(data);
  if (fn) req.end(fn);
  return req;
};
/**
 * HEAD `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */


request.head = function (url, data, fn) {
  var req = request('HEAD', url);

  if (typeof data === 'function') {
    fn = data;
    data = null;
  }

  if (data) req.query(data);
  if (fn) req.end(fn);
  return req;
};
/**
 * OPTIONS query to `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */


request.options = function (url, data, fn) {
  var req = request('OPTIONS', url);

  if (typeof data === 'function') {
    fn = data;
    data = null;
  }

  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};
/**
 * DELETE `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */


function del(url, data, fn) {
  var req = request('DELETE', url);

  if (typeof data === 'function') {
    fn = data;
    data = null;
  }

  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
}

request.del = del;
request.delete = del;
/**
 * PATCH `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.patch = function (url, data, fn) {
  var req = request('PATCH', url);

  if (typeof data === 'function') {
    fn = data;
    data = null;
  }

  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};
/**
 * POST `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */


request.post = function (url, data, fn) {
  var req = request('POST', url);

  if (typeof data === 'function') {
    fn = data;
    data = null;
  }

  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};
/**
 * PUT `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */


request.put = function (url, data, fn) {
  var req = request('PUT', url);

  if (typeof data === 'function') {
    fn = data;
    data = null;
  }

  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

},{"./agent-base":131,"./is-object":133,"./request-base":134,"./response-base":135,"component-emitter":109,"fast-safe-stringify":112,"qs":127}],133:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Check if `obj` is an object.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */
function isObject(obj) {
  return obj !== null && _typeof(obj) === 'object';
}

module.exports = isObject;

},{}],134:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Module of mixed-in functions shared between node and client code
 */
var isObject = require('./is-object');
/**
 * Expose `RequestBase`.
 */


module.exports = RequestBase;
/**
 * Initialize a new `RequestBase`.
 *
 * @api public
 */

function RequestBase(object) {
  if (object) return mixin(object);
}
/**
 * Mixin the prototype properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */


function mixin(object) {
  for (var key in RequestBase.prototype) {
    if (Object.prototype.hasOwnProperty.call(RequestBase.prototype, key)) object[key] = RequestBase.prototype[key];
  }

  return object;
}
/**
 * Clear previous timeout.
 *
 * @return {Request} for chaining
 * @api public
 */


RequestBase.prototype.clearTimeout = function () {
  clearTimeout(this._timer);
  clearTimeout(this._responseTimeoutTimer);
  clearTimeout(this._uploadTimeoutTimer);
  delete this._timer;
  delete this._responseTimeoutTimer;
  delete this._uploadTimeoutTimer;
  return this;
};
/**
 * Override default response body parser
 *
 * This function will be called to convert incoming data into request.body
 *
 * @param {Function}
 * @api public
 */


RequestBase.prototype.parse = function (fn) {
  this._parser = fn;
  return this;
};
/**
 * Set format of binary response body.
 * In browser valid formats are 'blob' and 'arraybuffer',
 * which return Blob and ArrayBuffer, respectively.
 *
 * In Node all values result in Buffer.
 *
 * Examples:
 *
 *      req.get('/')
 *        .responseType('blob')
 *        .end(callback);
 *
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */


RequestBase.prototype.responseType = function (value) {
  this._responseType = value;
  return this;
};
/**
 * Override default request body serializer
 *
 * This function will be called to convert data set via .send or .attach into payload to send
 *
 * @param {Function}
 * @api public
 */


RequestBase.prototype.serialize = function (fn) {
  this._serializer = fn;
  return this;
};
/**
 * Set timeouts.
 *
 * - response timeout is time between sending request and receiving the first byte of the response. Includes DNS and connection time.
 * - deadline is the time from start of the request to receiving response body in full. If the deadline is too short large files may not load at all on slow connections.
 * - upload is the time  since last bit of data was sent or received. This timeout works only if deadline timeout is off
 *
 * Value of 0 or false means no timeout.
 *
 * @param {Number|Object} ms or {response, deadline}
 * @return {Request} for chaining
 * @api public
 */


RequestBase.prototype.timeout = function (options) {
  if (!options || _typeof(options) !== 'object') {
    this._timeout = options;
    this._responseTimeout = 0;
    this._uploadTimeout = 0;
    return this;
  }

  for (var option in options) {
    if (Object.prototype.hasOwnProperty.call(options, option)) {
      switch (option) {
        case 'deadline':
          this._timeout = options.deadline;
          break;

        case 'response':
          this._responseTimeout = options.response;
          break;

        case 'upload':
          this._uploadTimeout = options.upload;
          break;

        default:
          console.warn('Unknown timeout option', option);
      }
    }
  }

  return this;
};
/**
 * Set number of retry attempts on error.
 *
 * Failed requests will be retried 'count' times if timeout or err.code >= 500.
 *
 * @param {Number} count
 * @param {Function} [fn]
 * @return {Request} for chaining
 * @api public
 */


RequestBase.prototype.retry = function (count, fn) {
  // Default to 1 if no count passed or true
  if (arguments.length === 0 || count === true) count = 1;
  if (count <= 0) count = 0;
  this._maxRetries = count;
  this._retries = 0;
  this._retryCallback = fn;
  return this;
}; //
// NOTE: we do not include ESOCKETTIMEDOUT because that is from `request` package
//       <https://github.com/sindresorhus/got/pull/537>
//
// NOTE: we do not include EADDRINFO because it was removed from libuv in 2014
//       <https://github.com/libuv/libuv/commit/02e1ebd40b807be5af46343ea873331b2ee4e9c1>
//       <https://github.com/request/request/search?q=ESOCKETTIMEDOUT&unscoped_q=ESOCKETTIMEDOUT>
//
//
// TODO: expose these as configurable defaults
//


var ERROR_CODES = new Set(['ETIMEDOUT', 'ECONNRESET', 'EADDRINUSE', 'ECONNREFUSED', 'EPIPE', 'ENOTFOUND', 'ENETUNREACH', 'EAI_AGAIN']);
var STATUS_CODES = new Set([408, 413, 429, 500, 502, 503, 504, 521, 522, 524]); // TODO: we would need to make this easily configurable before adding it in (e.g. some might want to add POST)
// const METHODS = new Set(['GET', 'PUT', 'HEAD', 'DELETE', 'OPTIONS', 'TRACE']);

/**
 * Determine if a request should be retried.
 * (Inspired by https://github.com/sindresorhus/got#retry)
 *
 * @param {Error} err an error
 * @param {Response} [res] response
 * @returns {Boolean} if segment should be retried
 */

RequestBase.prototype._shouldRetry = function (err, res) {
  if (!this._maxRetries || this._retries++ >= this._maxRetries) {
    return false;
  }

  if (this._retryCallback) {
    try {
      var override = this._retryCallback(err, res);

      if (override === true) return true;
      if (override === false) return false; // undefined falls back to defaults
    } catch (err_) {
      console.error(err_);
    }
  } // TODO: we would need to make this easily configurable before adding it in (e.g. some might want to add POST)

  /*
  if (
    this.req &&
    this.req.method &&
    !METHODS.has(this.req.method.toUpperCase())
  )
    return false;
  */


  if (res && res.status && STATUS_CODES.has(res.status)) return true;

  if (err) {
    if (err.code && ERROR_CODES.has(err.code)) return true; // Superagent timeout

    if (err.timeout && err.code === 'ECONNABORTED') return true;
    if (err.crossDomain) return true;
  }

  return false;
};
/**
 * Retry request
 *
 * @return {Request} for chaining
 * @api private
 */


RequestBase.prototype._retry = function () {
  this.clearTimeout(); // node

  if (this.req) {
    this.req = null;
    this.req = this.request();
  }

  this._aborted = false;
  this.timedout = false;
  this.timedoutError = null;
  return this._end();
};
/**
 * Promise support
 *
 * @param {Function} resolve
 * @param {Function} [reject]
 * @return {Request}
 */


RequestBase.prototype.then = function (resolve, reject) {
  var _this = this;

  if (!this._fullfilledPromise) {
    var self = this;

    if (this._endCalled) {
      console.warn('Warning: superagent request was sent twice, because both .end() and .then() were called. Never call .end() if you use promises');
    }

    this._fullfilledPromise = new Promise(function (resolve, reject) {
      self.on('abort', function () {
        if (_this._maxRetries && _this._maxRetries > _this._retries) {
          return;
        }

        if (_this.timedout && _this.timedoutError) {
          reject(_this.timedoutError);
          return;
        }

        var err = new Error('Aborted');
        err.code = 'ABORTED';
        err.status = _this.status;
        err.method = _this.method;
        err.url = _this.url;
        reject(err);
      });
      self.end(function (err, res) {
        if (err) reject(err);else resolve(res);
      });
    });
  }

  return this._fullfilledPromise.then(resolve, reject);
};

RequestBase.prototype.catch = function (cb) {
  return this.then(undefined, cb);
};
/**
 * Allow for extension
 */


RequestBase.prototype.use = function (fn) {
  fn(this);
  return this;
};

RequestBase.prototype.ok = function (cb) {
  if (typeof cb !== 'function') throw new Error('Callback required');
  this._okCallback = cb;
  return this;
};

RequestBase.prototype._isResponseOK = function (res) {
  if (!res) {
    return false;
  }

  if (this._okCallback) {
    return this._okCallback(res);
  }

  return res.status >= 200 && res.status < 300;
};
/**
 * Get request header `field`.
 * Case-insensitive.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */


RequestBase.prototype.get = function (field) {
  return this._header[field.toLowerCase()];
};
/**
 * Get case-insensitive header `field` value.
 * This is a deprecated internal API. Use `.get(field)` instead.
 *
 * (getHeader is no longer used internally by the superagent code base)
 *
 * @param {String} field
 * @return {String}
 * @api private
 * @deprecated
 */


RequestBase.prototype.getHeader = RequestBase.prototype.get;
/**
 * Set header `field` to `val`, or multiple fields with one object.
 * Case-insensitive.
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

RequestBase.prototype.set = function (field, value) {
  if (isObject(field)) {
    for (var key in field) {
      if (Object.prototype.hasOwnProperty.call(field, key)) this.set(key, field[key]);
    }

    return this;
  }

  this._header[field.toLowerCase()] = value;
  this.header[field] = value;
  return this;
};
/**
 * Remove header `field`.
 * Case-insensitive.
 *
 * Example:
 *
 *      req.get('/')
 *        .unset('User-Agent')
 *        .end(callback);
 *
 * @param {String} field field name
 */


RequestBase.prototype.unset = function (field) {
  delete this._header[field.toLowerCase()];
  delete this.header[field];
  return this;
};
/**
 * Write the field `name` and `val`, or multiple fields with one object
 * for "multipart/form-data" request bodies.
 *
 * ``` js
 * request.post('/upload')
 *   .field('foo', 'bar')
 *   .end(callback);
 *
 * request.post('/upload')
 *   .field({ foo: 'bar', baz: 'qux' })
 *   .end(callback);
 * ```
 *
 * @param {String|Object} name name of field
 * @param {String|Blob|File|Buffer|fs.ReadStream} val value of field
 * @return {Request} for chaining
 * @api public
 */


RequestBase.prototype.field = function (name, value) {
  // name should be either a string or an object.
  if (name === null || undefined === name) {
    throw new Error('.field(name, val) name can not be empty');
  }

  if (this._data) {
    throw new Error(".field() can't be used if .send() is used. Please use only .send() or only .field() & .attach()");
  }

  if (isObject(name)) {
    for (var key in name) {
      if (Object.prototype.hasOwnProperty.call(name, key)) this.field(key, name[key]);
    }

    return this;
  }

  if (Array.isArray(value)) {
    for (var i in value) {
      if (Object.prototype.hasOwnProperty.call(value, i)) this.field(name, value[i]);
    }

    return this;
  } // val should be defined now


  if (value === null || undefined === value) {
    throw new Error('.field(name, val) val can not be empty');
  }

  if (typeof value === 'boolean') {
    value = String(value);
  }

  this._getFormData().append(name, value);

  return this;
};
/**
 * Abort the request, and clear potential timeout.
 *
 * @return {Request} request
 * @api public
 */


RequestBase.prototype.abort = function () {
  if (this._aborted) {
    return this;
  }

  this._aborted = true;
  if (this.xhr) this.xhr.abort(); // browser

  if (this.req) this.req.abort(); // node

  this.clearTimeout();
  this.emit('abort');
  return this;
};

RequestBase.prototype._auth = function (user, pass, options, base64Encoder) {
  switch (options.type) {
    case 'basic':
      this.set('Authorization', "Basic ".concat(base64Encoder("".concat(user, ":").concat(pass))));
      break;

    case 'auto':
      this.username = user;
      this.password = pass;
      break;

    case 'bearer':
      // usage would be .auth(accessToken, { type: 'bearer' })
      this.set('Authorization', "Bearer ".concat(user));
      break;

    default:
      break;
  }

  return this;
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


RequestBase.prototype.withCredentials = function (on) {
  // This is browser-only functionality. Node side is no-op.
  if (on === undefined) on = true;
  this._withCredentials = on;
  return this;
};
/**
 * Set the max redirects to `n`. Does nothing in browser XHR implementation.
 *
 * @param {Number} n
 * @return {Request} for chaining
 * @api public
 */


RequestBase.prototype.redirects = function (n) {
  this._maxRedirects = n;
  return this;
};
/**
 * Maximum size of buffered response body, in bytes. Counts uncompressed size.
 * Default 200MB.
 *
 * @param {Number} n number of bytes
 * @return {Request} for chaining
 */


RequestBase.prototype.maxResponseSize = function (n) {
  if (typeof n !== 'number') {
    throw new TypeError('Invalid argument');
  }

  this._maxResponseSize = n;
  return this;
};
/**
 * Convert to a plain javascript object (not JSON string) of scalar properties.
 * Note as this method is designed to return a useful non-this value,
 * it cannot be chained.
 *
 * @return {Object} describing method, url, and data of this request
 * @api public
 */


RequestBase.prototype.toJSON = function () {
  return {
    method: this.method,
    url: this.url,
    data: this._data,
    headers: this._header
  };
};
/**
 * Send `data` as the request body, defaulting the `.type()` to "json" when
 * an object is given.
 *
 * Examples:
 *
 *       // manual json
 *       request.post('/user')
 *         .type('json')
 *         .send('{"name":"tj"}')
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
// eslint-disable-next-line complexity


RequestBase.prototype.send = function (data) {
  var isObject_ = isObject(data);
  var type = this._header['content-type'];

  if (this._formData) {
    throw new Error(".send() can't be used if .attach() or .field() is used. Please use only .send() or only .field() & .attach()");
  }

  if (isObject_ && !this._data) {
    if (Array.isArray(data)) {
      this._data = [];
    } else if (!this._isHost(data)) {
      this._data = {};
    }
  } else if (data && this._data && this._isHost(this._data)) {
    throw new Error("Can't merge these send calls");
  } // merge


  if (isObject_ && isObject(this._data)) {
    for (var key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) this._data[key] = data[key];
    }
  } else if (typeof data === 'string') {
    // default to x-www-form-urlencoded
    if (!type) this.type('form');
    type = this._header['content-type'];
    if (type) type = type.toLowerCase().trim();

    if (type === 'application/x-www-form-urlencoded') {
      this._data = this._data ? "".concat(this._data, "&").concat(data) : data;
    } else {
      this._data = (this._data || '') + data;
    }
  } else {
    this._data = data;
  }

  if (!isObject_ || this._isHost(data)) {
    return this;
  } // default to json


  if (!type) this.type('json');
  return this;
};
/**
 * Sort `querystring` by the sort function
 *
 *
 * Examples:
 *
 *       // default order
 *       request.get('/user')
 *         .query('name=Nick')
 *         .query('search=Manny')
 *         .sortQuery()
 *         .end(callback)
 *
 *       // customized sort function
 *       request.get('/user')
 *         .query('name=Nick')
 *         .query('search=Manny')
 *         .sortQuery(function(a, b){
 *           return a.length - b.length;
 *         })
 *         .end(callback)
 *
 *
 * @param {Function} sort
 * @return {Request} for chaining
 * @api public
 */


RequestBase.prototype.sortQuery = function (sort) {
  // _sort default to true but otherwise can be a function or boolean
  this._sort = typeof sort === 'undefined' ? true : sort;
  return this;
};
/**
 * Compose querystring to append to req.url
 *
 * @api private
 */


RequestBase.prototype._finalizeQueryString = function () {
  var query = this._query.join('&');

  if (query) {
    this.url += (this.url.includes('?') ? '&' : '?') + query;
  }

  this._query.length = 0; // Makes the call idempotent

  if (this._sort) {
    var index = this.url.indexOf('?');

    if (index >= 0) {
      var queryArray = this.url.slice(index + 1).split('&');

      if (typeof this._sort === 'function') {
        queryArray.sort(this._sort);
      } else {
        queryArray.sort();
      }

      this.url = this.url.slice(0, index) + '?' + queryArray.join('&');
    }
  }
}; // For backwards compat only


RequestBase.prototype._appendQueryString = function () {
  console.warn('Unsupported');
};
/**
 * Invoke callback with timeout error.
 *
 * @api private
 */


RequestBase.prototype._timeoutError = function (reason, timeout, errno) {
  if (this._aborted) {
    return;
  }

  var err = new Error("".concat(reason + timeout, "ms exceeded"));
  err.timeout = timeout;
  err.code = 'ECONNABORTED';
  err.errno = errno;
  this.timedout = true;
  this.timedoutError = err;
  this.abort();
  this.callback(err);
};

RequestBase.prototype._setTimeouts = function () {
  var self = this; // deadline

  if (this._timeout && !this._timer) {
    this._timer = setTimeout(function () {
      self._timeoutError('Timeout of ', self._timeout, 'ETIME');
    }, this._timeout);
  } // response timeout


  if (this._responseTimeout && !this._responseTimeoutTimer) {
    this._responseTimeoutTimer = setTimeout(function () {
      self._timeoutError('Response timeout of ', self._responseTimeout, 'ETIMEDOUT');
    }, this._responseTimeout);
  }
};

},{"./is-object":133}],135:[function(require,module,exports){
"use strict";

/**
 * Module dependencies.
 */
var utils = require('./utils');
/**
 * Expose `ResponseBase`.
 */


module.exports = ResponseBase;
/**
 * Initialize a new `ResponseBase`.
 *
 * @api public
 */

function ResponseBase(obj) {
  if (obj) return mixin(obj);
}
/**
 * Mixin the prototype properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */


function mixin(obj) {
  for (var key in ResponseBase.prototype) {
    if (Object.prototype.hasOwnProperty.call(ResponseBase.prototype, key)) obj[key] = ResponseBase.prototype[key];
  }

  return obj;
}
/**
 * Get case-insensitive `field` value.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */


ResponseBase.prototype.get = function (field) {
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


ResponseBase.prototype._setHeaderProperties = function (header) {
  // TODO: moar!
  // TODO: make this a util
  // content-type
  var ct = header['content-type'] || '';
  this.type = utils.type(ct); // params

  var params = utils.params(ct);

  for (var key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key)) this[key] = params[key];
  }

  this.links = {}; // links

  try {
    if (header.link) {
      this.links = utils.parseLinks(header.link);
    }
  } catch (_unused) {// ignore
  }
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


ResponseBase.prototype._setStatusProperties = function (status) {
  var type = status / 100 | 0; // status / class

  this.statusCode = status;
  this.status = this.statusCode;
  this.statusType = type; // basics

  this.info = type === 1;
  this.ok = type === 2;
  this.redirect = type === 3;
  this.clientError = type === 4;
  this.serverError = type === 5;
  this.error = type === 4 || type === 5 ? this.toError() : false; // sugar

  this.created = status === 201;
  this.accepted = status === 202;
  this.noContent = status === 204;
  this.badRequest = status === 400;
  this.unauthorized = status === 401;
  this.notAcceptable = status === 406;
  this.forbidden = status === 403;
  this.notFound = status === 404;
  this.unprocessableEntity = status === 422;
};

},{"./utils":136}],136:[function(require,module,exports){
"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Return the mime type for the given `str`.
 *
 * @param {String} str
 * @return {String}
 * @api private
 */
exports.type = function (str) {
  return str.split(/ *; */).shift();
};
/**
 * Return header field parameters.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */


exports.params = function (val) {
  var obj = {};

  var _iterator = _createForOfIteratorHelper(val.split(/ *; */)),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var str = _step.value;
      var parts = str.split(/ *= */);
      var key = parts.shift();

      var _val = parts.shift();

      if (key && _val) obj[key] = _val;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return obj;
};
/**
 * Parse Link header fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */


exports.parseLinks = function (val) {
  var obj = {};

  var _iterator2 = _createForOfIteratorHelper(val.split(/ *, */)),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var str = _step2.value;
      var parts = str.split(/ *; */);
      var url = parts[0].slice(1, -1);
      var rel = parts[1].split(/ *= */)[1].slice(1, -1);
      obj[rel] = url;
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  return obj;
};
/**
 * Strip content related fields from `header`.
 *
 * @param {Object} header
 * @return {Object} header
 * @api private
 */


exports.cleanHeader = function (header, changesOrigin) {
  delete header['content-type'];
  delete header['content-length'];
  delete header['transfer-encoding'];
  delete header.host; // secuirty

  if (changesOrigin) {
    delete header.authorization;
    delete header.cookie;
  }

  return header;
};

},{}],137:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "v1", {
  enumerable: true,
  get: function () {
    return _v.default;
  }
});
Object.defineProperty(exports, "v3", {
  enumerable: true,
  get: function () {
    return _v2.default;
  }
});
Object.defineProperty(exports, "v4", {
  enumerable: true,
  get: function () {
    return _v3.default;
  }
});
Object.defineProperty(exports, "v5", {
  enumerable: true,
  get: function () {
    return _v4.default;
  }
});
Object.defineProperty(exports, "NIL", {
  enumerable: true,
  get: function () {
    return _nil.default;
  }
});
Object.defineProperty(exports, "version", {
  enumerable: true,
  get: function () {
    return _version.default;
  }
});
Object.defineProperty(exports, "validate", {
  enumerable: true,
  get: function () {
    return _validate.default;
  }
});
Object.defineProperty(exports, "stringify", {
  enumerable: true,
  get: function () {
    return _stringify.default;
  }
});
Object.defineProperty(exports, "parse", {
  enumerable: true,
  get: function () {
    return _parse.default;
  }
});

var _v = _interopRequireDefault(require("./v1.js"));

var _v2 = _interopRequireDefault(require("./v3.js"));

var _v3 = _interopRequireDefault(require("./v4.js"));

var _v4 = _interopRequireDefault(require("./v5.js"));

var _nil = _interopRequireDefault(require("./nil.js"));

var _version = _interopRequireDefault(require("./version.js"));

var _validate = _interopRequireDefault(require("./validate.js"));

var _stringify = _interopRequireDefault(require("./stringify.js"));

var _parse = _interopRequireDefault(require("./parse.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./nil.js":139,"./parse.js":140,"./stringify.js":144,"./v1.js":145,"./v3.js":146,"./v4.js":148,"./v5.js":149,"./validate.js":150,"./version.js":151}],138:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/*
 * Browser-compatible JavaScript MD5
 *
 * Modification of JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */
function md5(bytes) {
  if (typeof bytes === 'string') {
    const msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = new Uint8Array(msg.length);

    for (let i = 0; i < msg.length; ++i) {
      bytes[i] = msg.charCodeAt(i);
    }
  }

  return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
}
/*
 * Convert an array of little-endian words to an array of bytes
 */


function md5ToHexEncodedArray(input) {
  const output = [];
  const length32 = input.length * 32;
  const hexTab = '0123456789abcdef';

  for (let i = 0; i < length32; i += 8) {
    const x = input[i >> 5] >>> i % 32 & 0xff;
    const hex = parseInt(hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f), 16);
    output.push(hex);
  }

  return output;
}
/**
 * Calculate output length with padding and bit length
 */


function getOutputLength(inputLength8) {
  return (inputLength8 + 64 >>> 9 << 4) + 14 + 1;
}
/*
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */


function wordsToMd5(x, len) {
  /* append padding */
  x[len >> 5] |= 0x80 << len % 32;
  x[getOutputLength(len) - 1] = len;
  let a = 1732584193;
  let b = -271733879;
  let c = -1732584194;
  let d = 271733878;

  for (let i = 0; i < x.length; i += 16) {
    const olda = a;
    const oldb = b;
    const oldc = c;
    const oldd = d;
    a = md5ff(a, b, c, d, x[i], 7, -680876936);
    d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5gg(b, c, d, a, x[i], 20, -373897302);
    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5hh(d, a, b, c, x[i], 11, -358537222);
    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = md5ii(a, b, c, d, x[i], 6, -198630844);
    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = safeAdd(a, olda);
    b = safeAdd(b, oldb);
    c = safeAdd(c, oldc);
    d = safeAdd(d, oldd);
  }

  return [a, b, c, d];
}
/*
 * Convert an array bytes to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */


function bytesToWords(input) {
  if (input.length === 0) {
    return [];
  }

  const length8 = input.length * 8;
  const output = new Uint32Array(getOutputLength(length8));

  for (let i = 0; i < length8; i += 8) {
    output[i >> 5] |= (input[i / 8] & 0xff) << i % 32;
  }

  return output;
}
/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */


function safeAdd(x, y) {
  const lsw = (x & 0xffff) + (y & 0xffff);
  const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 0xffff;
}
/*
 * Bitwise rotate a 32-bit number to the left.
 */


function bitRotateLeft(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}
/*
 * These functions implement the four basic operations the algorithm uses.
 */


function md5cmn(q, a, b, x, s, t) {
  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}

function md5ff(a, b, c, d, x, s, t) {
  return md5cmn(b & c | ~b & d, a, b, x, s, t);
}

function md5gg(a, b, c, d, x, s, t) {
  return md5cmn(b & d | c & ~d, a, b, x, s, t);
}

function md5hh(a, b, c, d, x, s, t) {
  return md5cmn(b ^ c ^ d, a, b, x, s, t);
}

function md5ii(a, b, c, d, x, s, t) {
  return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}

var _default = md5;
exports.default = _default;
},{}],139:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = '00000000-0000-0000-0000-000000000000';
exports.default = _default;
},{}],140:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _validate = _interopRequireDefault(require("./validate.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parse(uuid) {
  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Invalid UUID');
  }

  let v;
  const arr = new Uint8Array(16); // Parse ########-....-....-....-............

  arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
  arr[1] = v >>> 16 & 0xff;
  arr[2] = v >>> 8 & 0xff;
  arr[3] = v & 0xff; // Parse ........-####-....-....-............

  arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
  arr[5] = v & 0xff; // Parse ........-....-####-....-............

  arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
  arr[7] = v & 0xff; // Parse ........-....-....-####-............

  arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
  arr[9] = v & 0xff; // Parse ........-....-....-....-############
  // (Use "/" to avoid 32-bit truncation when bit-shifting high-order bytes)

  arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 0x10000000000 & 0xff;
  arr[11] = v / 0x100000000 & 0xff;
  arr[12] = v >>> 24 & 0xff;
  arr[13] = v >>> 16 & 0xff;
  arr[14] = v >>> 8 & 0xff;
  arr[15] = v & 0xff;
  return arr;
}

var _default = parse;
exports.default = _default;
},{"./validate.js":150}],141:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
exports.default = _default;
},{}],142:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rng;
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
// getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
// find the complete implementation of crypto (msCrypto) on IE11.
const getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);
const rnds8 = new Uint8Array(16);

function rng() {
  if (!getRandomValues) {
    throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
  }

  return getRandomValues(rnds8);
}
},{}],143:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// Adapted from Chris Veness' SHA1 code at
// http://www.movable-type.co.uk/scripts/sha1.html
function f(s, x, y, z) {
  switch (s) {
    case 0:
      return x & y ^ ~x & z;

    case 1:
      return x ^ y ^ z;

    case 2:
      return x & y ^ x & z ^ y & z;

    case 3:
      return x ^ y ^ z;
  }
}

function ROTL(x, n) {
  return x << n | x >>> 32 - n;
}

function sha1(bytes) {
  const K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
  const H = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];

  if (typeof bytes === 'string') {
    const msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = [];

    for (let i = 0; i < msg.length; ++i) {
      bytes.push(msg.charCodeAt(i));
    }
  } else if (!Array.isArray(bytes)) {
    // Convert Array-like to Array
    bytes = Array.prototype.slice.call(bytes);
  }

  bytes.push(0x80);
  const l = bytes.length / 4 + 2;
  const N = Math.ceil(l / 16);
  const M = new Array(N);

  for (let i = 0; i < N; ++i) {
    const arr = new Uint32Array(16);

    for (let j = 0; j < 16; ++j) {
      arr[j] = bytes[i * 64 + j * 4] << 24 | bytes[i * 64 + j * 4 + 1] << 16 | bytes[i * 64 + j * 4 + 2] << 8 | bytes[i * 64 + j * 4 + 3];
    }

    M[i] = arr;
  }

  M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
  M[N - 1][14] = Math.floor(M[N - 1][14]);
  M[N - 1][15] = (bytes.length - 1) * 8 & 0xffffffff;

  for (let i = 0; i < N; ++i) {
    const W = new Uint32Array(80);

    for (let t = 0; t < 16; ++t) {
      W[t] = M[i][t];
    }

    for (let t = 16; t < 80; ++t) {
      W[t] = ROTL(W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16], 1);
    }

    let a = H[0];
    let b = H[1];
    let c = H[2];
    let d = H[3];
    let e = H[4];

    for (let t = 0; t < 80; ++t) {
      const s = Math.floor(t / 20);
      const T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[t] >>> 0;
      e = d;
      d = c;
      c = ROTL(b, 30) >>> 0;
      b = a;
      a = T;
    }

    H[0] = H[0] + a >>> 0;
    H[1] = H[1] + b >>> 0;
    H[2] = H[2] + c >>> 0;
    H[3] = H[3] + d >>> 0;
    H[4] = H[4] + e >>> 0;
  }

  return [H[0] >> 24 & 0xff, H[0] >> 16 & 0xff, H[0] >> 8 & 0xff, H[0] & 0xff, H[1] >> 24 & 0xff, H[1] >> 16 & 0xff, H[1] >> 8 & 0xff, H[1] & 0xff, H[2] >> 24 & 0xff, H[2] >> 16 & 0xff, H[2] >> 8 & 0xff, H[2] & 0xff, H[3] >> 24 & 0xff, H[3] >> 16 & 0xff, H[3] >> 8 & 0xff, H[3] & 0xff, H[4] >> 24 & 0xff, H[4] >> 16 & 0xff, H[4] >> 8 & 0xff, H[4] & 0xff];
}

var _default = sha1;
exports.default = _default;
},{}],144:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _validate = _interopRequireDefault(require("./validate.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  const uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

var _default = stringify;
exports.default = _default;
},{"./validate.js":150}],145:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rng = _interopRequireDefault(require("./rng.js"));

var _stringify = _interopRequireDefault(require("./stringify.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html
let _nodeId;

let _clockseq; // Previous uuid creation time


let _lastMSecs = 0;
let _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details

function v1(options, buf, offset) {
  let i = buf && offset || 0;
  const b = buf || new Array(16);
  options = options || {};
  let node = options.node || _nodeId;
  let clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189

  if (node == null || clockseq == null) {
    const seedBytes = options.random || (options.rng || _rng.default)();

    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }

    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.


  let msecs = options.msecs !== undefined ? options.msecs : Date.now(); // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock

  let nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)

  const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression

  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval


  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  } // Per 4.2.1.2 Throw error if too many uuids are requested


  if (nsecs >= 10000) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch

  msecs += 12219292800000; // `time_low`

  const tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff; // `time_mid`

  const tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff; // `time_high_and_version`

  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version

  b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)

  b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`

  b[i++] = clockseq & 0xff; // `node`

  for (let n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf || (0, _stringify.default)(b);
}

var _default = v1;
exports.default = _default;
},{"./rng.js":142,"./stringify.js":144}],146:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _v = _interopRequireDefault(require("./v35.js"));

var _md = _interopRequireDefault(require("./md5.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const v3 = (0, _v.default)('v3', 0x30, _md.default);
var _default = v3;
exports.default = _default;
},{"./md5.js":138,"./v35.js":147}],147:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.URL = exports.DNS = void 0;

var _stringify = _interopRequireDefault(require("./stringify.js"));

var _parse = _interopRequireDefault(require("./parse.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function stringToBytes(str) {
  str = unescape(encodeURIComponent(str)); // UTF8 escape

  const bytes = [];

  for (let i = 0; i < str.length; ++i) {
    bytes.push(str.charCodeAt(i));
  }

  return bytes;
}

const DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
exports.DNS = DNS;
const URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
exports.URL = URL;

function _default(name, version, hashfunc) {
  function generateUUID(value, namespace, buf, offset) {
    if (typeof value === 'string') {
      value = stringToBytes(value);
    }

    if (typeof namespace === 'string') {
      namespace = (0, _parse.default)(namespace);
    }

    if (namespace.length !== 16) {
      throw TypeError('Namespace must be array-like (16 iterable integer values, 0-255)');
    } // Compute hash of namespace and value, Per 4.3
    // Future: Use spread syntax when supported on all platforms, e.g. `bytes =
    // hashfunc([...namespace, ... value])`


    let bytes = new Uint8Array(16 + value.length);
    bytes.set(namespace);
    bytes.set(value, namespace.length);
    bytes = hashfunc(bytes);
    bytes[6] = bytes[6] & 0x0f | version;
    bytes[8] = bytes[8] & 0x3f | 0x80;

    if (buf) {
      offset = offset || 0;

      for (let i = 0; i < 16; ++i) {
        buf[offset + i] = bytes[i];
      }

      return buf;
    }

    return (0, _stringify.default)(bytes);
  } // Function#name is not settable on some platforms (#270)


  try {
    generateUUID.name = name; // eslint-disable-next-line no-empty
  } catch (err) {} // For CommonJS default export support


  generateUUID.DNS = DNS;
  generateUUID.URL = URL;
  return generateUUID;
}
},{"./parse.js":140,"./stringify.js":144}],148:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _rng = _interopRequireDefault(require("./rng.js"));

var _stringify = _interopRequireDefault(require("./stringify.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function v4(options, buf, offset) {
  options = options || {};

  const rnds = options.random || (options.rng || _rng.default)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`


  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0, _stringify.default)(rnds);
}

var _default = v4;
exports.default = _default;
},{"./rng.js":142,"./stringify.js":144}],149:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _v = _interopRequireDefault(require("./v35.js"));

var _sha = _interopRequireDefault(require("./sha1.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const v5 = (0, _v.default)('v5', 0x50, _sha.default);
var _default = v5;
exports.default = _default;
},{"./sha1.js":143,"./v35.js":147}],150:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regex = _interopRequireDefault(require("./regex.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validate(uuid) {
  return typeof uuid === 'string' && _regex.default.test(uuid);
}

var _default = validate;
exports.default = _default;
},{"./regex.js":141}],151:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _validate = _interopRequireDefault(require("./validate.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function version(uuid) {
  if (!(0, _validate.default)(uuid)) {
    throw TypeError('Invalid UUID');
  }

  return parseInt(uuid.substr(14, 1), 16);
}

var _default = version;
exports.default = _default;
},{"./validate.js":150}]},{},[1])(1)
});
