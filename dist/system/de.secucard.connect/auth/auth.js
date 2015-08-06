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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvYXV0aC9hdXRoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs2RkFpQmEsSUFBSTs7Ozs7Ozs7c0JBTFQsSUFBSTs7bUJBQ0osS0FBSzs7OENBQ0wsNkJBQTZCOytDQUFFLDhCQUE4Qjs7Ozs7QUFHeEQsT0FBSTtBQUtMLGFBTEMsSUFBSSxHQUtGOzJCQUxGLElBQUk7O1VBRWhCLG1CQUFtQixHQUFHLENBQUMsV0FBVyxFQUFFLGVBQWUsQ0FBQztVQUNwRCxXQUFXLEdBQUcsRUFBQyxjQUFjLEVBQUUsbUNBQW1DLEVBQUM7S0FJbEU7O0FBUFcsUUFBSSxXQVNoQixvQkFBb0IsR0FBQSw4QkFBQyxPQUFPLEVBQUU7O0FBRTdCLFNBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7O0FBRXZDLFNBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDdkQsU0FBSSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMzRCxTQUFJLENBQUMsZUFBZSxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDOztBQUU3RCxTQUFJLENBQUMsUUFBUSxHQUFHLFlBQU07O0FBRXJCLGFBQU8sT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO01BRXpDLENBQUM7O0FBRUYsU0FBSSxDQUFDLGFBQWEsR0FBRyxZQUFNO0FBQzFCLGFBQU8sT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUFDO01BQzNDLENBQUM7S0FFRjs7QUEzQlcsUUFBSSxXQTZCaEIsUUFBUSxHQUFBLGtCQUFDLE1BQU0sRUFBQzs7O0FBRWYsWUFBTyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsS0FBSyxFQUFLOztBQUU1QyxVQUFJLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLEVBQUU7QUFDeEMsV0FBSSxNQUFNLEVBQUU7QUFFWCxhQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7QUFDdEIsY0FBSyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkI7O0FBRUQsY0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO09BRTlCOztBQUVELFVBQUksRUFBRSxHQUFHLE1BQUssY0FBYyxFQUFFLENBQUM7QUFDL0IsVUFBSSxFQUFFLEdBQUcsTUFBSyxVQUFVLEVBQUUsQ0FBQzs7QUFFM0IsVUFBSSxZQUFZLEdBQUcsU0FBZixZQUFZLENBQUksR0FBRyxFQUFLOztBQUUzQixXQUFJLE1BQU0sR0FBRyxLQUFLLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDckUsYUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDO0FBQ3ZCLGFBQUssVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3hCLGNBQU8sTUFBTSxDQUFDO09BRWQsQ0FBQzs7QUFFRixVQUFJLFVBQVUsR0FBRyxTQUFiLFVBQVUsQ0FBSSxHQUFHLEVBQUs7QUFHekIsYUFBSyxXQUFXLEVBQUUsQ0FBQzs7QUFFbkIsV0FBSSxLQUFLLFlBQUEsQ0FBQztBQUNWLFdBQUksR0FBRyxZQUFZLDhCQUE4QixFQUFFO0FBQ2xELGFBQUssR0FBRyxHQUFHLENBQUM7UUFDWixNQUFNO0FBQ04sYUFBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSw2QkFBNkIsRUFBRSxFQUFFLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUU7O0FBRUQsYUFBTSxLQUFLLENBQUM7T0FDWixDQUFDOztBQUVGLFVBQUksR0FBRyxZQUFBLENBQUM7O0FBRVIsVUFBSSxLQUFLLElBQUksSUFBSSxJQUFJLEtBQUssQ0FBQyxlQUFlLEVBQUUsSUFBSSxJQUFJLEVBQUU7O0FBRXJELFVBQUcsR0FBRyxNQUFLLG9CQUFvQixDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsZUFBZSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7T0FFakUsTUFBTTs7QUFFTixVQUFHLEdBQUcsTUFBSyxZQUFZLEVBQUUsR0FBRyxNQUFLLGNBQWMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBQyxJQUFJLEVBQUUsTUFBSyxhQUFhLEVBQUUsRUFBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsTUFBSyw4QkFBOEIsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7T0FFdko7O0FBRUQsYUFBTyxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7TUFFaEQsQ0FBQyxDQUFDO0tBRUg7O0FBdkZXLFFBQUksV0F5RmhCLFlBQVksR0FBQSx3QkFBRztBQUNkLFlBQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDO0tBQ3JDOztBQTNGVyxRQUFJLFdBNkZoQixjQUFjLEdBQUEsd0JBQUMsV0FBVyxFQUFFLE9BQU8sRUFBRTs7O0FBRXBDLFlBQU8sSUFBSSxDQUFDLHVCQUF1QixDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxHQUFHLEVBQUs7O0FBRXZFLFVBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7QUFDcEIsYUFBSyxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDOztBQVU5QixVQUFJLGVBQWUsR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsR0FBRSxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQztBQUMzRCxVQUFJLGNBQWMsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUksR0FBRyxBQUFDLElBQUksSUFBSSxFQUFFLENBQUUsT0FBTyxFQUFFLENBQUM7QUFDL0UsVUFBSSxlQUFlLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsV0FBVyxFQUFFLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUMsQ0FBQyxDQUFDOztBQUUvRSxhQUFPLElBQUksT0FBTyxDQUFDLFVBQUMsT0FBTyxFQUFFLE1BQU0sRUFBSzs7QUFFdkMsY0FBSyxTQUFTLEdBQUcsV0FBVyxDQUFDLFlBQU07O0FBRWxDLFlBQUksQUFBQyxJQUFJLElBQUksRUFBRSxDQUFFLE9BQU8sRUFBRSxHQUFHLGNBQWMsRUFBRTs7QUFFNUMsZ0JBQUssbUJBQW1CLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxDQUNoRCxJQUFJLENBQUMsVUFBQyxHQUFHLEVBQUs7QUFFZCx1QkFBYSxDQUFDLE9BQUssU0FBUyxDQUFDLENBQUM7QUFDOUIsaUJBQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztVQUNiLENBQUMsU0FDSSxDQUFDLFVBQUMsR0FBRyxFQUFLOztBQUVmLGNBQUcsR0FBRyxDQUFDLE1BQU0sSUFBSSxHQUFHLEVBQUUsRUFFckIsTUFBTTtBQUNOLHdCQUFhLENBQUMsT0FBSyxTQUFTLENBQUMsQ0FBQztBQUM5QixpQkFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1dBQ1o7VUFFRCxDQUFDLENBQUM7U0FFSixNQUFNO0FBRU4sc0JBQWEsQ0FBQyxPQUFLLFNBQVMsQ0FBQyxDQUFDO0FBQzlCLGVBQU0sQ0FBQyxJQUFJLDhCQUE4QixFQUFFLENBQUMsQ0FBQztTQUM3QztRQUVELEVBQUUsZUFBZSxHQUFDLElBQUksQ0FBQyxDQUFDO09BRXpCLENBQUMsQ0FBQztNQUVILENBQUMsQ0FBQztLQUVIOztBQW5KVyxRQUFJLFdBcUpoQixXQUFXLEdBQUEsdUJBQUc7O0FBRWIsU0FBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0FBQ3JDLFNBQUcsQ0FBQyxPQUFPLEVBQUU7QUFDWixVQUFJLEdBQUcsR0FBRyxJQUFJLDZCQUE2QixDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFDakUsWUFBTSxHQUFHLENBQUM7TUFDVjtBQUNELFlBQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUN0Qjs7QUE3SlcsUUFBSSxXQStKaEIsVUFBVSxHQUFBLG9CQUFDLEtBQUssRUFBRTs7QUFFakIsU0FBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0FBQ3JDLFNBQUcsQ0FBQyxPQUFPLEVBQUU7QUFDWixVQUFJLEdBQUcsR0FBRyxJQUFJLDZCQUE2QixDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFDakUsWUFBTSxHQUFHLENBQUM7TUFDVjtBQUNELFlBQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7S0FFMUI7O0FBeEtXLFFBQUksV0EwS2hCLGNBQWMsR0FBQSwwQkFBRztBQUNoQixTQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7QUFDckMsU0FBRyxDQUFDLE9BQU8sRUFBRTtBQUNaLFVBQUksR0FBRyxHQUFHLElBQUksNkJBQTZCLENBQUMsbUJBQW1CLENBQUMsQ0FBQztBQUNqRSxZQUFNLEdBQUcsQ0FBQztNQUNWO0FBQ0QsWUFBTyxPQUFPLENBQUMsY0FBYyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQUMsS0FBSyxFQUFLOztBQUUvQyxVQUFHLEtBQUssSUFBSSxFQUFFLEtBQUssWUFBWSxLQUFLLENBQUEsQUFBQyxFQUFFO0FBQ3RDLGNBQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztPQUMzQjs7QUFFRCxhQUFPLEtBQUssQ0FBQztNQUViLENBQUMsQ0FBQztLQUNIOztBQXpMVyxRQUFJLFdBMkxoQixhQUFhLEdBQUEsdUJBQUMsV0FBVyxFQUFFLE9BQU8sRUFBRTtBQUNuQyxTQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQzdCLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FDM0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUNmLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQzVCLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FDZixPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDdkIsWUFBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDbkQsWUFBTyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3ZCOztBQXBNVyxRQUFJLFdBc01oQiw4QkFBOEIsR0FBQSx3Q0FBQyxXQUFXLEVBQUUsT0FBTyxFQUFFO0FBQ3BELFNBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBQ3ZELE9BQUUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBQyxVQUFVLEVBQUUsb0JBQW9CLEVBQUMsQ0FBQyxDQUFDO0FBQzFELFlBQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDdkM7O0FBMU1XLFFBQUksV0E0TWhCLG9CQUFvQixHQUFBLDhCQUFDLFdBQVcsRUFBRSxhQUFhLEVBQUUsT0FBTyxFQUFFO0FBQ3pELFNBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBQ3ZELE9BQUUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBQyxVQUFVLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUMsQ0FBQyxDQUFDO0FBQ25GLFlBQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDdkM7O0FBaE5XLFFBQUksV0FrTmhCLHVCQUF1QixHQUFBLGlDQUFDLFdBQVcsRUFBRSxPQUFPLEVBQUU7QUFDN0MsU0FBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN4RSxPQUFFLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUMsVUFBVSxFQUFFLFFBQVEsRUFBQyxDQUFDLENBQUM7QUFDOUMsWUFBTyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztLQUN2Qzs7QUF0TlcsUUFBSSxXQXdOaEIsbUJBQW1CLEdBQUEsNkJBQUMsV0FBVyxFQUFFLE9BQU8sRUFBRTtBQUN6QyxTQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hFLE9BQUUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBQyxVQUFVLEVBQUUsUUFBUSxFQUFDLENBQUMsQ0FBQztBQUM5QyxZQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQ3ZDOztBQTVOVyxRQUFJLFdBOE5oQixvQkFBb0IsR0FBQSw4QkFBQyxXQUFXLEVBQUUsT0FBTyxFQUFFO0FBQzFDLFNBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxVQUFVLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDaEgsT0FBRSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUMsQ0FBQyxDQUFDO0FBQy9DLFlBQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDdkM7O1dBbE9XLElBQUk7OzttQkFBSixJQUFJIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvYXV0aC9hdXRoLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==