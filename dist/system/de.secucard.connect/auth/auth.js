'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Auth = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _message = require('../net/message');

var _token2 = require('./token');

var _exception = require('./exception');

var _minilog = require('minilog');

var _minilog2 = _interopRequireDefault(_minilog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Auth = exports.Auth = function () {
    function Auth() {
        _classCallCheck(this, Auth);

        this.baseCredentialNames = ['client_id', 'client_secret'];
        this.baseHeaders = { 'Content-Type': 'application/x-www-form-urlencoded' };
    }

    _createClass(Auth, [{
        key: 'configureWithContext',
        value: function configureWithContext(context) {

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
        }
    }, {
        key: 'getToken',
        value: function getToken(extend) {
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

                        return _this.retrieveNewToken().catch(function () {

                            (0, _minilog2.default)('secucard.auth').error('Token is expired');
                            throw new _exception.AuthenticationFailedException('Token is expired');
                        });
                    } else {

                        return _this.retrieveNewToken().catch(function () {

                            (0, _minilog2.default)('secucard.auth').error('Credentials error');
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

                    var error = void 0;
                    if (err instanceof _exception.AuthenticationTimeoutException) {
                        error = err;
                    } else {
                        error = Object.assign(new _exception.AuthenticationFailedException(), err.response.body);
                    }

                    throw error;
                };

                var req = void 0;

                if (token != null && token.getRefreshToken() != null) {

                    req = _this._tokenRefreshRequest(cr, token.getRefreshToken(), ch);
                } else {

                    req = _this.isDeviceAuth() ? _this.getDeviceToken(Object.assign({}, cr, { uuid: _this.getDeviceUUID() }), ch) : _this._tokenClientCredentialsRequest(cr, ch);
                }

                return req.then(tokenSuccess).catch(tokenError);
            });
        }
    }, {
        key: 'isDeviceAuth',
        value: function isDeviceAuth() {
            return Boolean(this.getDeviceUUID());
        }
    }, {
        key: 'getDeviceToken',
        value: function getDeviceToken(credentials, channel) {
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
                            }).catch(function (err) {

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
        }
    }, {
        key: 'removeToken',
        value: function removeToken() {

            var storage = this.getTokenStorage();
            if (!storage) {
                var err = new _exception.AuthenticationFailedException('Credentials error');
                return Promise.reject(err);
            }
            storage.removeToken();
        }
    }, {
        key: 'storeToken',
        value: function storeToken(token) {

            var storage = this.getTokenStorage();
            if (!storage) {
                var err = new _exception.AuthenticationFailedException('Credentials error');
                return Promise.reject(err);
            }
            storage.storeToken(token);
        }
    }, {
        key: 'getStoredToken',
        value: function getStoredToken() {
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
        }
    }, {
        key: 'retrieveNewToken',
        value: function retrieveNewToken() {

            var storage = this.getTokenStorage();
            if (!storage) {
                var err = new _exception.AuthenticationFailedException('Credentials error');
                return Promise.reject(err);
            }

            return storage.retrieveNewToken();
        }
    }, {
        key: '_tokenRequest',
        value: function _tokenRequest(credentials, channel) {
            var m = channel.createMessage().setBaseUrl(this.oAuthUrl()).setUrl('token').setHeaders(this.baseHeaders).setMethod(_message.POST).setBody(credentials);
            (0, _minilog2.default)('secucard.auth').debug('token request', m);
            return channel.send(m);
        }
    }, {
        key: '_tokenClientCredentialsRequest',
        value: function _tokenClientCredentialsRequest(credentials, channel) {
            var cr = _lodash2.default.pick(credentials, this.baseCredentialNames);
            cr = _lodash2.default.assign({}, cr, { grant_type: 'client_credentials' });
            return this._tokenRequest(cr, channel);
        }
    }, {
        key: '_tokenRefreshRequest',
        value: function _tokenRefreshRequest(credentials, refresh_token, channel) {
            var cr = _lodash2.default.pick(credentials, this.baseCredentialNames);
            cr = _lodash2.default.assign({}, cr, { grant_type: 'refresh_token', refresh_token: refresh_token });
            return this._tokenRequest(cr, channel);
        }
    }, {
        key: '_tokenDeviceCodeRequest',
        value: function _tokenDeviceCodeRequest(credentials, channel) {
            var cr = _lodash2.default.pick(credentials, this.baseCredentialNames.concat(['uuid']));
            cr = _lodash2.default.assign({}, cr, { grant_type: 'device' });
            return this._tokenRequest(cr, channel);
        }
    }, {
        key: '_tokenDeviceRequest',
        value: function _tokenDeviceRequest(credentials, channel) {
            var cr = _lodash2.default.pick(credentials, this.baseCredentialNames.concat(['code']));
            cr = _lodash2.default.assign({}, cr, { grant_type: 'device' });
            return this._tokenRequest(cr, channel);
        }
    }, {
        key: '_tokenAppUserRequest',
        value: function _tokenAppUserRequest(credentials, channel) {
            var cr = _lodash2.default.pick(credentials, this.baseCredentialNames.concat(['username', 'password', 'device', 'deviceinfo']));
            cr = _lodash2.default.assign({}, cr, { grant_type: 'appuser' });
            return this._tokenRequest(cr, channel);
        }
    }]);

    return Auth;
}();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvYXV0aC9hdXRoLmpzIl0sIm5hbWVzIjpbIkF1dGgiLCJiYXNlQ3JlZGVudGlhbE5hbWVzIiwiYmFzZUhlYWRlcnMiLCJjb250ZXh0IiwiZW1pdCIsImJpbmQiLCJnZXRDaGFubmVsIiwiZ2V0UmVzdENoYW5uZWwiLCJnZXRDcmVkZW50aWFscyIsImdldFRva2VuU3RvcmFnZSIsIm9BdXRoVXJsIiwiZ2V0Q29uZmlnIiwiZ2V0T0F1dGhVcmwiLCJnZXREZXZpY2VVVUlEIiwiZXh0ZW5kIiwiZ2V0U3RvcmVkVG9rZW4iLCJ0aGVuIiwidG9rZW4iLCJpc0V4cGlyZWQiLCJzZXRFeHBpcmVUaW1lIiwic3RvcmVUb2tlbiIsIlByb21pc2UiLCJyZXNvbHZlIiwiY3IiLCJjaCIsImlzVmFsaWQiLCJyZXRyaWV2ZU5ld1Rva2VuIiwiY2F0Y2giLCJlcnJvciIsIkF1dGhlbnRpY2F0aW9uRmFpbGVkRXhjZXB0aW9uIiwidG9rZW5TdWNjZXNzIiwicmVzIiwiX3Rva2VuIiwidXBkYXRlIiwiYm9keSIsIlRva2VuIiwiY3JlYXRlIiwidG9rZW5FcnJvciIsImVyciIsInJlbW92ZVRva2VuIiwiQXV0aGVudGljYXRpb25UaW1lb3V0RXhjZXB0aW9uIiwiT2JqZWN0IiwiYXNzaWduIiwicmVzcG9uc2UiLCJyZXEiLCJnZXRSZWZyZXNoVG9rZW4iLCJfdG9rZW5SZWZyZXNoUmVxdWVzdCIsImlzRGV2aWNlQXV0aCIsImdldERldmljZVRva2VuIiwidXVpZCIsIl90b2tlbkNsaWVudENyZWRlbnRpYWxzUmVxdWVzdCIsIkJvb2xlYW4iLCJjcmVkZW50aWFscyIsImNoYW5uZWwiLCJfdG9rZW5EZXZpY2VDb2RlUmVxdWVzdCIsImRhdGEiLCJwb2xsSW50ZXJ2YWxTZWMiLCJpbnRlcnZhbCIsInBvbGxFeHBpcmVUaW1lIiwicGFyc2VJbnQiLCJleHBpcmVzX2luIiwiRGF0ZSIsImdldFRpbWUiLCJjb2RlQ3JlZGVudGlhbHMiLCJjb2RlIiwiZGV2aWNlX2NvZGUiLCJyZWplY3QiLCJwb2xsVGltZXIiLCJzZXRJbnRlcnZhbCIsIl90b2tlbkRldmljZVJlcXVlc3QiLCJjbGVhckludGVydmFsIiwic3RhdHVzIiwic3RvcmFnZSIsIm0iLCJjcmVhdGVNZXNzYWdlIiwic2V0QmFzZVVybCIsInNldFVybCIsInNldEhlYWRlcnMiLCJzZXRNZXRob2QiLCJQT1NUIiwic2V0Qm9keSIsImRlYnVnIiwic2VuZCIsIl8iLCJwaWNrIiwiZ3JhbnRfdHlwZSIsIl90b2tlblJlcXVlc3QiLCJyZWZyZXNoX3Rva2VuIiwiY29uY2F0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFXQTs7OztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7OztJQUVhQSxJLFdBQUFBLEk7QUFLVCxvQkFBYztBQUFBOztBQUFBLGFBSGRDLG1CQUdjLEdBSFEsQ0FBQyxXQUFELEVBQWMsZUFBZCxDQUdSO0FBQUEsYUFGZEMsV0FFYyxHQUZBLEVBQUMsZ0JBQWdCLG1DQUFqQixFQUVBO0FBRWI7Ozs7NkNBRW9CQyxPLEVBQVM7O0FBRTFCLGlCQUFLQyxJQUFMLEdBQVlELFFBQVFDLElBQVIsQ0FBYUMsSUFBYixDQUFrQkYsT0FBbEIsQ0FBWjs7QUFFQSxpQkFBS0csVUFBTCxHQUFrQkgsUUFBUUksY0FBUixDQUF1QkYsSUFBdkIsQ0FBNEJGLE9BQTVCLENBQWxCO0FBQ0EsaUJBQUtLLGNBQUwsR0FBc0JMLFFBQVFLLGNBQVIsQ0FBdUJILElBQXZCLENBQTRCRixPQUE1QixDQUF0QjtBQUNBLGlCQUFLTSxlQUFMLEdBQXVCTixRQUFRTSxlQUFSLENBQXdCSixJQUF4QixDQUE2QkYsT0FBN0IsQ0FBdkI7O0FBRUEsaUJBQUtPLFFBQUwsR0FBZ0IsWUFBTTs7QUFFbEIsdUJBQU9QLFFBQVFRLFNBQVIsR0FBb0JDLFdBQXBCLEVBQVA7QUFFSCxhQUpEOztBQU1BLGlCQUFLQyxhQUFMLEdBQXFCLFlBQU07QUFDdkIsdUJBQU9WLFFBQVFRLFNBQVIsR0FBb0JFLGFBQXBCLEVBQVA7QUFD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
