System.register(['lodash', '../net/message', './token', './exception'], function (_export) {
	'use strict';

	var _, POST, Token, AuthenticationFailedException, AuthenticationTimeoutException, Auth;

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

					this.oAuthUrl = function () {

						return context.getConfig().getOAuthUrl();
					};
				};

				Auth.prototype.getToken = function getToken(extend) {
					var _this = this;

					var token = this.getStoredToken();

					if (token != null && !token.isExpired()) {
						if (extend) {
							token.setExpireTime();
							this.storeToken(token);
						}

						return Promise.resolve(token);
					}

					var cr = this.getCredentials();
					var ch = this.getChannel();

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

						req = this._tokenRefreshRequest(cr, token.getRefreshToken(), ch);
					} else {

						req = this.isDeviceAuth(cr) ? this.getDeviceToken(cr, ch) : this._tokenClientCredentialsRequest(cr, ch);
					}

					return req.then(tokenSuccess)['catch'](tokenError);
				};

				Auth.prototype.isDeviceAuth = function isDeviceAuth(credentials) {
					return credentials.uuid != undefined && credentials.uuid != null;
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

								console.log(data.user_code);
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

					var cr = this.getCredentials();
					if (!cr) {
						var err = new AuthenticationFailedException('Credentials error');
						throw err;
					}
					cr.token = null;
				};

				Auth.prototype.storeToken = function storeToken(token) {

					var cr = this.getCredentials();
					if (!cr) {
						var err = new AuthenticationFailedException('Credentials error');
						throw err;
					}
					cr.token = token;
				};

				Auth.prototype.getStoredToken = function getStoredToken() {
					var cr = this.getCredentials();
					if (!cr) {
						var err = new AuthenticationFailedException('Credentials error');
						throw err;
					}
					return cr.token;
				};

				Auth.prototype._tokenRequest = function _tokenRequest(credentials, channel) {
					var m = channel.createMessage().setBaseUrl(this.oAuthUrl()).setUrl('token').setHeaders(this.baseHeaders).setMethod(POST).setBody(credentials);
					console.log('token request', m);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvYXV0aC9hdXRoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztvRkFlYSxJQUFJOzs7Ozs7OztzQkFIVCxJQUFJOzttQkFDSixLQUFLOzs4Q0FDTCw2QkFBNkI7K0NBQUUsOEJBQThCOzs7QUFDeEQsT0FBSTtBQUtMLGFBTEMsSUFBSSxHQUtGOzJCQUxGLElBQUk7O1VBRWhCLG1CQUFtQixHQUFHLENBQUMsV0FBVyxFQUFFLGVBQWUsQ0FBQztVQUNwRCxXQUFXLEdBQUcsRUFBQyxjQUFjLEVBQUUsbUNBQW1DLEVBQUM7S0FJbEU7O0FBUFcsUUFBSSxXQVNoQixvQkFBb0IsR0FBQSw4QkFBQyxPQUFPLEVBQUU7O0FBRTdCLFNBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7O0FBRXZDLFNBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDdkQsU0FBSSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzs7QUFFM0QsU0FBSSxDQUFDLFFBQVEsR0FBRyxZQUFNOztBQUVyQixhQUFPLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztNQUV6QyxDQUFDO0tBRUY7O0FBdEJXLFFBQUksV0F3QmhCLFFBQVEsR0FBQSxrQkFBQyxNQUFNLEVBQUM7OztBQUVmLFNBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQzs7QUFFbEMsU0FBRyxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxFQUFDO0FBQ3RDLFVBQUcsTUFBTSxFQUFDO0FBRVQsWUFBSyxDQUFDLGFBQWEsRUFBRSxDQUFDO0FBQ2hCLFdBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7T0FD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RUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDeEUsT0FBRSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFDLFVBQVUsRUFBRSxRQUFRLEVBQUMsQ0FBQyxDQUFDO0FBQzlDLFlBQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDdkM7O0FBL01XLFFBQUksV0FpTmhCLG9CQUFvQixHQUFBLDhCQUFDLFdBQVcsRUFBRSxPQUFPLEVBQUU7QUFDMUMsU0FBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNoSCxPQUFFLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUMsVUFBVSxFQUFFLFNBQVMsRUFBQyxDQUFDLENBQUM7QUFDL0MsWUFBTyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztLQUN2Qzs7V0FyTlcsSUFBSTs7O21CQUFKLElBQUkiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9hdXRoL2F1dGguanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9