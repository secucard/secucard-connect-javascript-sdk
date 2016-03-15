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
                                minilog('secucard.auth').error('Token is expired');
                                throw new AuthenticationFailedException('Token is expired');
                            } else {
                                minilog('secucard.auth').error('Credentials error');
                                throw new AuthenticationFailedException('Credentials error');
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

                Auth.prototype._tokenRequest = function _tokenRequest(credentials, channel) {
                    var m = channel.createMessage().setBaseUrl(this.oAuthUrl()).setUrl('token').setHeaders(this.baseHeaders).setMethod(POST).setBody(credentials);
                    minilog('secucard.auth').debug('token request', m);
                    return channel.send(m);
                };

                Auth.prototype._tokenClientCredentialsRequest = function _tokenClientCredentialsRequest(credentials, channel) {
                    var cr = _.pick(credentials, this.baseCredentialNames);
                    cr = _.assign({}, cr, { grant_type: 'client_credentials' });
                    return this._tokenRequest(cr, channel);
                };

                Auth.prototype._tokenRefreshRequest = function _tokenRefreshRequest(credentials, refresh_token, channel) {
                    var cr = _.pick(credentials, this.baseCredentialNames);
                    cr = _.assign({}, cr, { grant_type: 'refresh_token', refresh_token: refresh_token });
                    return this._tokenRequest(cr, channel);
                };

                Auth.prototype._tokenDeviceCodeRequest = function _tokenDeviceCodeRequest(credentials, channel) {
                    var cr = _.pick(credentials, this.baseCredentialNames.concat(['uuid']));
                    cr = _.assign({}, cr, { grant_type: 'device' });
                    return this._tokenRequest(cr, channel);
                };

                Auth.prototype._tokenDeviceRequest = function _tokenDeviceRequest(credentials, channel) {
                    var cr = _.pick(credentials, this.baseCredentialNames.concat(['code']));
                    cr = _.assign({}, cr, { grant_type: 'device' });
                    return this._tokenRequest(cr, channel);
                };

                Auth.prototype._tokenAppUserRequest = function _tokenAppUserRequest(credentials, channel) {
                    var cr = _.pick(credentials, this.baseCredentialNames.concat(['username', 'password', 'device', 'deviceinfo']));
                    cr = _.assign({}, cr, { grant_type: 'appuser' });
                    return this._tokenRequest(cr, channel);
                };

                return Auth;
            })();

            _export('Auth', Auth);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvYXV0aC9hdXRoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztnR0FpQmEsSUFBSTs7Ozs7Ozs7K0JBTFQsSUFBSTs7NEJBQ0osS0FBSzs7dURBQ0wsNkJBQTZCO3dEQUFFLDhCQUE4Qjs7Ozs7QUFHeEQsZ0JBQUk7QUFLRix5QkFMRixJQUFJLEdBS0M7MENBTEwsSUFBSTs7eUJBRWIsbUJBQW1CLEdBQUcsQ0FBQyxXQUFXLEVBQUUsZUFBZSxDQUFDO3lCQUNwRCxXQUFXLEdBQUcsRUFBQyxjQUFjLEVBQUUsbUNBQW1DLEVBQUM7aUJBSWxFOztBQVBRLG9CQUFJLFdBU2Isb0JBQW9CLEdBQUEsOEJBQUMsT0FBTyxFQUFFOztBQUUxQix3QkFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzs7QUFFdkMsd0JBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDdkQsd0JBQUksQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDM0Qsd0JBQUksQ0FBQyxlQUFlLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7O0FBRTdELHdCQUFJLENBQUMsUUFBUSxHQUFHLFlBQU07O0FBRWxCLCtCQUFPLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztxQkFFNUMsQ0FBQzs7QUFFRix3QkFBSSxDQUFDLGFBQWEsR0FBRyxZQUFNO0FBQ3ZCLCtCQUFPLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztxQkFDOUMsQ0FBQztpQkFFTDs7QUEzQlEsb0JBQUksV0E2QmIsUUFBUSxHQUFBLGtCQUFDLE1BQU0sRUFBRTs7O0FBRWIsMkJBQU8sSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLEtBQUssRUFBSzs7QUFFekMsNEJBQUksS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsRUFBRTtBQUNyQyxnQ0FBSSxNQUFNLEVBQUU7QUFFUixxQ0FBSyxDQUFDLGFBQWEsRUFBRSxDQUFDO0FBQ3RCLHNDQUFLLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQzs2QkFDMUI7O0FBRUQsbUNBQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQzt5QkFFakM7O0FBRUQsNEJBQUksRUFBRSxHQUFHLE1BQUssY0FBYyxFQUFFLENBQUM7QUFDL0IsNEJBQUksRUFBRSxHQUFHLE1BQUssVUFBVSxFQUFFLENBQUM7O0FBRTNCLDRCQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFOztBQUVmLGdDQUFJLEtBQUssSUFBSSxJQUFJLElBQUksS0FBSyxDQUFDLFNBQVMsRUFBRSxFQUFFO0FBQ3BDLHVDQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFDbkQsc0NBQU0sSUFBSSw2QkFBNkIsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDOzZCQUMvRCxNQUFNO0FBQ0gsdUNBQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUNwRCxzQ0FBTSxJQUFJLDZCQUE2QixDQUFDLG1CQUFtQixDQUFDLENBQUM7NkJBQ2hFO3lCQUVKOztBQUVELDRCQUFJLFlBQVksR0FBRyxTQUFmLFlBQVksQ0FBSSxHQUFHLEVBQUs7O0FBRXhCLGdDQUFJLE1BQU0sR0FBRyxLQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDckUsa0NBQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQztBQUN2QixrQ0FBSyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDeEIsbUNBQU8sTUFBTSxDQUFDO3lCQUVqQixDQUFDOztBQUVGLDRCQUFJLFVBQVUsR0FBRyxTQUFiLFVBQVUsQ0FBSSxHQUFHLEVBQUs7QUFHdEIsa0NBQUssV0FBVyxFQUFFLENBQUM7O0FBRW5CLGdDQUFJLEtBQUssWUFBQSxDQUFDO0FBQ1YsZ0NBQUksR0FBRyxZQUFZLDhCQUE4QixFQUFFO0FBQy9DLHFDQUFLLEdBQUcsR0FBRyxDQUFDOzZCQUNmLE1BQU07QUFDSCxxQ0FBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSw2QkFBNkIsRUFBRSxFQUFFLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7NkJBQ2pGOztBQUVELGtDQUFNLEtBQUssQ0FBQzt5QkFDZixDQUFDOztBQUVGLDRCQUFJLEdBQUcsWUFBQSxDQUFDOztBQUVSLDRCQUFJLEtBQUssSUFBSSxJQUFJLElBQUksS0FBSyxDQUFDLGVBQWUsRUFBRSxJQUFJLElBQUksRUFBRTs7QUFFbEQsK0JBQUcsR0FBRyxNQUFLLG9CQUFvQixDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsZUFBZSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7eUJBRXBFLE1BQU07O0FBRUgsK0JBQUcsR0FBRyxNQUFLLFlBQVksRUFBRSxHQUFHLE1BQUssY0FBYyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFDLElBQUksRUFBRSxNQUFLLGFBQWEsRUFBRSxFQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxNQUFLLDhCQUE4QixDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQzt5QkFFMUo7O0FBRUQsK0JBQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO3FCQUVuRCxDQUFDLENBQUM7aUJBRU47O0FBbkdRLG9CQUFJLFdBcUdiLFlBQVksR0FBQSx3QkFBRztBQUNYLDJCQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQztpQkFDeEM7O0FBdkdRLG9CQUFJLFdBeUdiLGNBQWMsR0FBQSx3QkFBQyxXQUFXLEVBQUUsT0FBTyxFQUFFOzs7QUFFakMsMkJBQU8sSUFBSSxDQUFDLHVCQUF1QixDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxHQUFHLEVBQUs7O0FBRXBFLDRCQUFJLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO0FBQ3BCLCtCQUFLLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7O0FBVTlCLDRCQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztBQUM1RCw0QkFBSSxjQUFjLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLEdBQUcsQUFBQyxJQUFJLElBQUksRUFBRSxDQUFFLE9BQU8sRUFBRSxDQUFDO0FBQy9FLDRCQUFJLGVBQWUsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxXQUFXLEVBQUUsRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBQyxDQUFDLENBQUM7O0FBRS9FLCtCQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU0sRUFBSzs7QUFFcEMsbUNBQUssU0FBUyxHQUFHLFdBQVcsQ0FBQyxZQUFNOztBQUUvQixvQ0FBSSxBQUFDLElBQUksSUFBSSxFQUFFLENBQUUsT0FBTyxFQUFFLEdBQUcsY0FBYyxFQUFFOztBQUV6QywyQ0FBSyxtQkFBbUIsQ0FBQyxlQUFlLEVBQUUsT0FBTyxDQUFDLENBQzdDLElBQUksQ0FBQyxVQUFDLEdBQUcsRUFBSztBQUVYLHFEQUFhLENBQUMsT0FBSyxTQUFTLENBQUMsQ0FBQztBQUM5QiwrQ0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3FDQUNoQixDQUFDLFNBQ0ksQ0FBQyxVQUFDLEdBQUcsRUFBSzs7QUFFWiw0Q0FBSSxHQUFHLENBQUMsTUFBTSxJQUFJLEdBQUcsRUFBRSxFQUV0QixNQUFNO0FBQ0gsNkRBQWEsQ0FBQyxPQUFLLFNBQVMsQ0FBQyxDQUFDO0FBQzlCLHNEQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7NkNBQ2Y7cUNBRUosQ0FBQyxDQUFDO2lDQUVWLE1BQU07QUFFSCxpREFBYSxDQUFDLE9BQUssU0FBUyxDQUFDLENBQUM7QUFDOUIsMENBQU0sQ0FBQyxJQUFJLDhCQUE4QixFQUFFLENBQUMsQ0FBQztpQ0FDaEQ7NkJBRUosRUFBRSxlQUFlLEdBQUcsSUFBSSxDQUFDLENBQUM7eUJBRTlCLENBQUMsQ0FBQztxQkFFTixDQUFDLENBQUM7aUJBRU47O0FBL0pRLG9CQUFJLFdBaUtiLFdBQVcsR0FBQSx1QkFBRzs7QUFFVix3QkFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0FBQ3JDLHdCQUFJLENBQUMsT0FBTyxFQUFFO0FBQ1YsNEJBQUksR0FBRyxHQUFHLElBQUksNkJBQTZCLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUNqRSwrQkFBTyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3FCQUM5QjtBQUNELDJCQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7aUJBQ3pCOztBQXpLUSxvQkFBSSxXQTJLYixVQUFVLEdBQUEsb0JBQUMsS0FBSyxFQUFFOztBQUVkLHdCQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7QUFDckMsd0JBQUksQ0FBQyxPQUFPLEVBQUU7QUFDViw0QkFBSSxHQUFHLEdBQUcsSUFBSSw2QkFBNkIsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBQ2pFLCtCQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7cUJBQzlCO0FBQ0QsMkJBQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBRTdCOztBQXBMUSxvQkFBSSxXQXNMYixjQUFjLEdBQUEsMEJBQUc7QUFDYix3QkFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0FBQ3JDLHdCQUFJLENBQUMsT0FBTyxFQUFFO0FBQ1YsNEJBQUksR0FBRyxHQUFHLElBQUksNkJBQTZCLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUNqRSwrQkFBTyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3FCQUM5QjtBQUNELDJCQUFPLE9BQU8sQ0FBQyxjQUFjLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxLQUFLLEVBQUs7O0FBRTVDLDRCQUFJLEtBQUssSUFBSSxFQUFFLEtBQUssWUFBWSxLQUFLLENBQUEsQUFBQyxFQUFFO0FBQ3BDLG1DQUFPLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7eUJBQzlCOztBQUVELCtCQUFPLEtBQUssQ0FBQztxQkFFaEIsQ0FBQyxDQUFDO2lCQUNOOztBQXJNUSxvQkFBSSxXQXVNYixhQUFhLEdBQUEsdUJBQUMsV0FBVyxFQUFFLE9BQU8sRUFBRTtBQUNoQyx3QkFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLGFBQWEsRUFBRSxDQUMxQixVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQzNCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FDZixVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUM1QixTQUFTLENBQUMsSUFBSSxDQUFDLENBQ2YsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQzFCLDJCQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNuRCwyQkFBTyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUMxQjs7QUFoTlEsb0JBQUksV0FrTmIsOEJBQThCLEdBQUEsd0NBQUMsV0FBVyxFQUFFLE9BQU8sRUFBRTtBQUNqRCx3QkFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFDdkQsc0JBQUUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBQyxVQUFVLEVBQUUsb0JBQW9CLEVBQUMsQ0FBQyxDQUFDO0FBQzFELDJCQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2lCQUMxQzs7QUF0TlEsb0JBQUksV0F3TmIsb0JBQW9CLEdBQUEsOEJBQUMsV0FBVyxFQUFFLGFBQWEsRUFBRSxPQUFPLEVBQUU7QUFDdEQsd0JBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBQ3ZELHNCQUFFLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUMsVUFBVSxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFDLENBQUMsQ0FBQztBQUNuRiwyQkFBTyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztpQkFDMUM7O0FBNU5RLG9CQUFJLFdBOE5iLHVCQUF1QixHQUFBLGlDQUFDLFdBQVcsRUFBRSxPQUFPLEVBQUU7QUFDMUMsd0JBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDeEUsc0JBQUUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBQyxVQUFVLEVBQUUsUUFBUSxFQUFDLENBQUMsQ0FBQztBQUM5QywyQkFBTyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztpQkFDMUM7O0FBbE9RLG9CQUFJLFdBb09iLG1CQUFtQixHQUFBLDZCQUFDLFdBQVcsRUFBRSxPQUFPLEVBQUU7QUFDdEMsd0JBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDeEUsc0JBQUUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBQyxVQUFVLEVBQUUsUUFBUSxFQUFDLENBQUMsQ0FBQztBQUM5QywyQkFBTyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztpQkFDMUM7O0FBeE9RLG9CQUFJLFdBME9iLG9CQUFvQixHQUFBLDhCQUFDLFdBQVcsRUFBRSxPQUFPLEVBQUU7QUFDdkMsd0JBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxVQUFVLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDaEgsc0JBQUUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBQyxVQUFVLEVBQUUsU0FBUyxFQUFDLENBQUMsQ0FBQztBQUMvQywyQkFBTyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztpQkFDMUM7O3VCQTlPUSxJQUFJIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvYXV0aC9hdXRoLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==