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
        var cr = this.pick(credentials, this.baseCredentialNames);

        cr = Object.assign({}, cr, { grant_type: 'client_credentials' });
        return this._tokenRequest(cr, channel);
    };

    Auth.prototype._tokenRefreshRequest = function _tokenRefreshRequest(credentials, refresh_token, channel) {
        var cr = this.pick(credentials, this.baseCredentialNames);

        cr = Object.assign({}, cr, { grant_type: 'refresh_token', refresh_token: refresh_token });
        return this._tokenRequest(cr, channel);
    };

    Auth.prototype._tokenDeviceCodeRequest = function _tokenDeviceCodeRequest(credentials, channel) {
        var cr = this.pick(credentials, this.baseCredentialNames.concat(['uuid']));

        cr = Object.assign({}, cr, { grant_type: 'device' });
        return this._tokenRequest(cr, channel);
    };

    Auth.prototype._tokenDeviceRequest = function _tokenDeviceRequest(credentials, channel) {
        var cr = this.pick(credentials, this.baseCredentialNames.concat(['code']));

        cr = Object.assign({}, cr, { grant_type: 'device' });
        return this._tokenRequest(cr, channel);
    };

    Auth.prototype._tokenAppUserRequest = function _tokenAppUserRequest(credentials, channel) {
        var cr = this.pick(credentials, this.baseCredentialNames.concat(['username', 'password', 'device', 'deviceinfo']));

        cr = Object.assign({}, cr, { grant_type: 'appuser' });
        return this._tokenRequest(cr, channel);
    };

    return Auth;
})();

exports.Auth = Auth;