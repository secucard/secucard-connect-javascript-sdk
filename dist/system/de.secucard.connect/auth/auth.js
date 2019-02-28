System.register(['lodash', '../net/message', './token', './exception', 'minilog'], function (_export) {
    'use strict';

    var _, POST, Token, AuthenticationFailedException, AuthenticationTimeoutException, minilog, Auth;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    return {
        setters: [function (_lodash) {
            _ = _lodash['default'];
        }, function (_netMessage) {
            POST = _netMessage.POST;
        }, function (_token2) {
            Token = _token2.Token;
        }, function (_exception) {
            AuthenticationFailedException = _exception.AuthenticationFailedException;
            AuthenticationTimeoutException = _exception.AuthenticationTimeoutException;
        }, function (_minilog) {
            minilog = _minilog['default'];
        }],
        execute: function () {
            Auth = (function () {
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

                                    minilog('secucard.auth').error('Token is expired');
                                    throw new AuthenticationFailedException('Token is expired');
                                });
                            } else {

                                return _this.retrieveNewToken()['catch'](function () {

                                    minilog('secucard.auth').error('Credentials error');
                                    throw new AuthenticationFailedException('Credentials error');
                                });
                            }
                        }

                        var tokenSuccess = function tokenSuccess(res) {

                            var _token = token ? token.update(res.body) : Token.create(res.body);
                            _token.setExpireTime();
                            _this.storeToken(_token);
                            return _token;
                        };

                        var tokenError = function tokenError(err) {
                            _this.removeToken();

                            var error = undefined;
                            if (err instanceof AuthenticationTimeoutException) {
                                error = err;
                            } else {
                                error = Object.assign(new AuthenticationFailedException(), err.response.body);
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
                                    reject(new AuthenticationTimeoutException());
                                }
                            }, pollIntervalSec * 1000);
                        });
                    });
                };

                Auth.prototype.removeToken = function removeToken() {

                    var storage = this.getTokenStorage();
                    if (!storage) {
                        var err = new AuthenticationFailedException('Credentials error');
                        return Promise.reject(err);
                    }
                    storage.removeToken();
                };

                Auth.prototype.storeToken = function storeToken(token) {

                    var storage = this.getTokenStorage();
                    if (!storage) {
                        var err = new AuthenticationFailedException('Credentials error');
                        return Promise.reject(err);
                    }
                    storage.storeToken(token);
                };

                Auth.prototype.getStoredToken = function getStoredToken() {
                    var storage = this.getTokenStorage();
                    if (!storage) {
                        var err = new AuthenticationFailedException('Credentials error');
                        return Promise.reject(err);
                    }
                    return storage.getStoredToken().then(function (token) {

                        if (token && !(token instanceof Token)) {
                            return Token.create(token);
                        }

                        return token;
                    });
                };

                Auth.prototype.retrieveNewToken = function retrieveNewToken() {

                    var storage = this.getTokenStorage();
                    if (!storage) {
                        var err = new AuthenticationFailedException('Credentials error');
                        return Promise.reject(err);
                    }

                    return storage.retrieveNewToken();
                };

                Auth.prototype._tokenRequest = function _tokenRequest(credentials, channel) {
                    var m = channel.createMessage().setBaseUrl(this.oAuthUrl()).setUrl('token').setHeaders(this.baseHeaders).setMethod(POST).setBody(credentials);
                    minilog('secucard.auth').debug('token request', m);
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

            _export('Auth', Auth);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvYXV0aC9hdXRoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztnR0FpQmEsSUFBSTs7Ozs7Ozs7K0JBTFQsSUFBSTs7NEJBQ0osS0FBSzs7dURBQ0wsNkJBQTZCO3dEQUFFLDhCQUE4Qjs7Ozs7QUFHeEQsZ0JBQUk7QUFLRix5QkFMRixJQUFJLEdBS0M7MENBTEwsSUFBSTs7eUJBRWIsbUJBQW1CLEdBQUcsQ0FBQyxXQUFXLEVBQUUsZUFBZSxDQUFDO3lCQUNwRCxXQUFXLEdBQUcsRUFBQyxjQUFjLEVBQUUsbUNBQW1DLEVBQUM7aUJBSWxFOztBQVBRLG9CQUFJLFdBU2Isb0JBQW9CLEdBQUEsOEJBQUMsT0FBTyxFQUFFOztBQUUxQix3QkFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzs7QUFFdkMsd0JBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDdkQsd0JBQUksQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDM0Qsd0JBQUksQ0FBQyxlQUFlLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7O0FBRTdELHdCQUFJLENBQUMsUUFBUSxHQUFHLFlBQU07O0FBRWxCLCtCQUFPLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztxQkFFNUMsQ0FBQzs7QUFFRix3QkFBSSxDQUFDLGFBQWEsR0FBRyxZQUFNO0FBQ3ZCLCtCQUFPLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztxQkFDOUMsQ0FBQztpQkFFTDs7QUEzQlEsb0JBQUksV0E2QmIsSUFBSSxHQUFBLGNBQUMsTUFBTSxFQUFFLElBQUksRUFBRTs7QUFFZiwyQkFBTyxJ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LENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBQzFELHNCQUFFLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUMsVUFBVSxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFDLENBQUMsQ0FBQztBQUN4RiwyQkFBTyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztpQkFDMUM7O0FBOVBRLG9CQUFJLFdBZ1FiLHVCQUF1QixHQUFBLGlDQUFDLFdBQVcsRUFBRSxPQUFPLEVBQUU7QUFDMUMsd0JBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDM0Usc0JBQUUsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBQyxVQUFVLEVBQUUsUUFBUSxFQUFDLENBQUMsQ0FBQztBQUNuRCwyQkFBTyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztpQkFDMUM7O0FBcFFRLG9CQUFJLFdBc1FiLG1CQUFtQixHQUFBLDZCQUFDLFdBQVcsRUFBRSxPQUFPLEVBQUU7QUFDdEMsd0JBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDM0Usc0JBQUUsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBQyxVQUFVLEVBQUUsUUFBUSxFQUFDLENBQUMsQ0FBQztBQUNuRCwyQkFBTyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztpQkFDMUM7O0FBMVFRLG9CQUFJLFdBNFFiLG9CQUFvQixHQUFBLDhCQUFDLFdBQVcsRUFBRSxPQUFPLEVBQUU7QUFDdkMsd0JBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxVQUFVLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbkgsc0JBQUUsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBQyxVQUFVLEVBQUUsU0FBUyxFQUFDLENBQUMsQ0FBQztBQUNwRCwyQkFBTyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztpQkFDMUM7O3VCQWhSUSxJQUFJIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvYXV0aC9hdXRoLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==
