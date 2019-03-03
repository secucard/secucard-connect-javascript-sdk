System.register(['../net/message', './token', './exception', 'minilog'], function (_export) {
    'use strict';

    var POST, Token, AuthenticationFailedException, AuthenticationTimeoutException, minilog, Auth;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    return {
        setters: [function (_netMessage) {
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
                    var cr = _.pick(credentials, this.baseCredentialNames);
                    cr = Object.assign({}, cr, { grant_type: 'client_credentials' });
                    return this._tokenRequest(cr, channel);
                };

                Auth.prototype._tokenRefreshRequest = function _tokenRefreshRequest(credentials, refresh_token, channel) {
                    var cr = _.pick(credentials, this.baseCredentialNames);
                    cr = Object.assign({}, cr, { grant_type: 'refresh_token', refresh_token: refresh_token });
                    return this._tokenRequest(cr, channel);
                };

                Auth.prototype._tokenDeviceCodeRequest = function _tokenDeviceCodeRequest(credentials, channel) {
                    var cr = _.pick(credentials, this.baseCredentialNames.concat(['uuid']));
                    cr = Object.assign({}, cr, { grant_type: 'device' });
                    return this._tokenRequest(cr, channel);
                };

                Auth.prototype._tokenDeviceRequest = function _tokenDeviceRequest(credentials, channel) {
                    var cr = _.pick(credentials, this.baseCredentialNames.concat(['code']));
                    cr = Object.assign({}, cr, { grant_type: 'device' });
                    return this._tokenRequest(cr, channel);
                };

                Auth.prototype._tokenAppUserRequest = function _tokenAppUserRequest(credentials, channel) {
                    var cr = _.pick(credentials, this.baseCredentialNames.concat(['username', 'password', 'device', 'deviceinfo']));
                    cr = Object.assign({}, cr, { grant_type: 'appuser' });
                    return this._tokenRequest(cr, channel);
                };

                return Auth;
            })();

            _export('Auth', Auth);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvYXV0aC9hdXRoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs2RkFnQmEsSUFBSTs7Ozs7OytCQUxULElBQUk7OzRCQUNKLEtBQUs7O3VEQUNMLDZCQUE2Qjt3REFBRSw4QkFBOEI7Ozs7O0FBR3hELGdCQUFJO0FBS0YseUJBTEYsSUFBSSxHQUtDOzBDQUxMLElBQUk7O3lCQUViLG1CQUFtQixHQUFHLENBQUMsV0FBVyxFQUFFLGVBQWUsQ0FBQzt5QkFDcEQsV0FBVyxHQUFHLEVBQUMsY0FBYyxFQUFFLG1DQUFtQyxFQUFDO2lCQUlsRTs7QUFQUSxvQkFBSSxXQVNiLG9CQUFvQixHQUFBLDhCQUFDLE9BQU8sRUFBRTs7QUFFMUIsd0JBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7O0FBRXZDLHdCQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3ZELHdCQUFJLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzNELHdCQUFJLENBQUMsZUFBZSxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDOztBQUU3RCx3QkFBSSxDQUFDLFFBQVEsR0FBRyxZQUFNOztBQUVsQiwrQkFBTyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7cUJBRTVDLENBQUM7O0FBRUYsd0JBQUksQ0FBQyxhQUFhLEdBQUcsWUFBTTtBQUN2QiwrQkFBTyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUMsYUFBYSxFQUFFLENBQUM7cUJBQzlDLENBQUM7aUJBRUw7O0FBM0JRLG9CQUFJLFdBNkJiLElBQUksR0FBQSxjQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUU7O0FBRWYsMkJBQU8sSUFB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QUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUN2RCxzQkFBRSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFDLFVBQVUsRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBQyxDQUFDLENBQUM7QUFDeEYsMkJBQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7aUJBQzFDOztBQWhRUSxvQkFBSSxXQWtRYix1QkFBdUIsR0FBQSxpQ0FBQyxXQUFXLEVBQUUsT0FBTyxFQUFFO0FBRTFDLHdCQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hFLHNCQUFFLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUMsVUFBVSxFQUFFLFFBQVEsRUFBQyxDQUFDLENBQUM7QUFDbkQsMkJBQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7aUJBQzFDOztBQXZRUSxvQkFBSSxXQXlRYixtQkFBbUIsR0FBQSw2QkFBQyxXQUFXLEVBQUUsT0FBTyxFQUFFO0FBRXRDLHdCQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hFLHNCQUFFLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUMsVUFBVSxFQUFFLFFBQVEsRUFBQyxDQUFDLENBQUM7QUFDbkQsMkJBQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7aUJBQzFDOztBQTlRUSxvQkFBSSxXQWdSYixvQkFBb0IsR0FBQSw4QkFBQyxXQUFXLEVBQUUsT0FBTyxFQUFFO0FBRXZDLHdCQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2hILHNCQUFFLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUMsVUFBVSxFQUFFLFNBQVMsRUFBQyxDQUFDLENBQUM7QUFDcEQsMkJBQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7aUJBQzFDOzt1QkFyUlEsSUFBSSIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L2F1dGgvYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=
