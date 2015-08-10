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
						throw err;
					}
					storage.removeToken();
				};

				Auth.prototype.storeToken = function storeToken(token) {

					var storage = this.getTokenStorage();
					if (!storage) {
						var err = new AuthenticationFailedException('Credentials error');
						throw err;
					}
					storage.storeToken(token);
				};

				Auth.prototype.getStoredToken = function getStoredToken() {
					var storage = this.getTokenStorage();
					if (!storage) {
						var err = new AuthenticationFailedException('Credentials error');
						throw err;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvYXV0aC9hdXRoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs2RkFpQmEsSUFBSTs7Ozs7Ozs7c0JBTFQsSUFBSTs7bUJBQ0osS0FBSzs7OENBQ0wsNkJBQTZCOytDQUFFLDhCQUE4Qjs7Ozs7QUFHeEQsT0FBSTtBQUtMLGFBTEMsSUFBSSxHQUtGOzJCQUxGLElBQUk7O1VBRWhCLG1CQUFtQixHQUFHLENBQUMsV0FBVyxFQUFFLGVBQWUsQ0FBQztVQUNwRCxXQUFXLEdBQUcsRUFBQyxjQUFjLEVBQUUsbUNBQW1DLEVBQUM7S0FJbEU7O0FBUFcsUUFBSSxXQVNoQixvQkFBb0IsR0FBQSw4QkFBQyxPQUFPLEVBQUU7O0FBRTdCLFNBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7O0FBRXZDLFNBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDdkQsU0FBSSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMzRCxTQUFJLENBQUMsZUFBZSxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDOztBQUU3RCxTQUFJLENBQUMsUUFBUSxHQUFHLFlBQU07O0FBRXJCLGFBQU8sT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO01BRXpDLENBQUM7O0FBRUYsU0FBSSxDQUFDLGFBQWEsR0FBRyxZQUFNO0FBQzFCLGFBQU8sT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUFDO01BQzNDLENBQUM7S0FFRjs7QUEzQlcsUUFBSSxXQTZCaEIsUUFBUSxHQUFBLGtCQUFDLE1BQU0sRUFBQzs7O0FBRWYsWUFBTyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMs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QUMsQ0FBQztLQUN2Qzs7QUF4T1csUUFBSSxXQTBPaEIsb0JBQW9CLEdBQUEsOEJBQUMsV0FBVyxFQUFFLE9BQU8sRUFBRTtBQUMxQyxTQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2hILE9BQUUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBQyxVQUFVLEVBQUUsU0FBUyxFQUFDLENBQUMsQ0FBQztBQUMvQyxZQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQ3ZDOztXQTlPVyxJQUFJOzs7bUJBQUosSUFBSSIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L2F1dGgvYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=