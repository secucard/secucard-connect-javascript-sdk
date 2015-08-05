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

						req = this.isDeviceAuth() ? this.getDeviceToken(Object.assign({}, cr, { uuid: this.getDeviceUUID() }), ch) : this._tokenClientCredentialsRequest(cr, ch);
					}

					return req.then(tokenSuccess)['catch'](tokenError);
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
					return storage.getStoredToken();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvYXV0aC9hdXRoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs2RkFpQmEsSUFBSTs7Ozs7Ozs7c0JBTFQsSUFBSTs7bUJBQ0osS0FBSzs7OENBQ0wsNkJBQTZCOytDQUFFLDhCQUE4Qjs7Ozs7QUFHeEQsT0FBSTtBQUtMLGFBTEMsSUFBSSxHQUtGOzJCQUxGLElBQUk7O1VBRWhCLG1CQUFtQixHQUFHLENBQUMsV0FBVyxFQUFFLGVBQWUsQ0FBQztVQUNwRCxXQUFXLEdBQUcsRUFBQyxjQUFjLEVBQUUsbUNBQW1DLEVBQUM7S0FJbEU7O0FBUFcsUUFBSSxXQVNoQixvQkFBb0IsR0FBQSw4QkFBQyxPQUFPLEVBQUU7O0FBRTdCLFNBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7O0FBRXZDLFNBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDdkQsU0FBSSxDQUFDLGNBQWMsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUMzRCxTQUFJLENBQUMsZUFBZSxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDOztBQUU3RCxTQUFJLENBQUMsUUFBUSxHQUFHLFlBQU07O0FBRXJCLGFBQU8sT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO01BRXpDLENBQUM7O0FBRUYsU0FBSSxDQUFDLGFBQWEsR0FBRyxZQUFNO0FBQzFCLGFBQU8sT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUFDO01BQzNDLENBQUM7S0FFRjs7QUEzQlcsUUFBSSxXQTZCaEIsUUFBUSxHQUFBLGtCQUFDLE1BQU0sRUFBQzs7O0FBRWYsU0FBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDOztBQUVsQyxTQUFHLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLEVBQUM7QUFDdEMsVUFBRyxNQUFNLEVBQUM7QUFFVCxZQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7QUFDaEIsV0FBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztPQUM3Qjs7QUFFRCxhQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7TUFFOUI7O0FBRUQsU0FBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQy9CLFNBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQzs7QUFFM0IsU0FBSSxZQUFZLEdBQUcsU0FBZixZQUFZLENBQUksR0FBRyxFQUFLOztBQUUzQixVQUFJLE1BQU0sR0FBRyxLQUFLLEdBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEUsWUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDO0FBQ3ZCLFlBQUssVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3hCLGFBQU8sTUFBTSxDQUFDO01BRWQsQ0FBQzs7QUFFRixTQUFJLFVBQVUsR0FBRyxTQUFiLFVBQVUsQ0FBSSxHQUFHLEVBQUs7QUFHekIsWUFBSyxXQUFXLEVBQUUsQ0FBQzs7QUFFbkIsVUFBSSxLQUFLLFlBQUEsQ0FBQztBQUNWLFVBQUcsR0FBRyxZQUFZLDhCQUE4QixFQUFFO0FBQ2pELFlBQUssR0FBRyxHQUFHLENBQUM7T0FDWixNQUFNO0FBQ04sWUFBSyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSw2QkFBNkIsRUFBRSxFQUFFLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7T0FDOUU7O0FBRUQsWUFBTSxLQUFLLENBQUM7TUFDWixDQUFDOztBQUVGLFNBQUksR0FBRyxZQUFBLENBQUM7O0FBRVIsU0FBRyxLQUFLLElBQUksSUFBSSxJQUFJLEtBQUssQ0FBQyxlQUFlLEVBQUUsSUFBSSxJQUFJLEVBQUU7O0FBRXBELFNBQUcsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxlQUFlLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztNQUVqRSxNQUFNOztBQUVOLFNBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLEdBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsOEJBQThCLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO01BRXRKOztBQUVELFlBQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBRWhEOztBQXJGVyxRQUFJLFdBdUZoQixZQUFZLEdBQUEsd0JBQUc7QUFDZCxZQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQztLQUNyQzs7QUF6RlcsUUFBSSxXQTJGaEIsY0FBYyxHQUFBLHdCQUFDLFdBQVcsRUFBRSxPQUFPLEVBQUU7OztBQUVwQyxZQUFPLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUMsR0FBRyxFQUFLOztBQUV2RSxVQUFJLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDO0FBQ3BCLGFBQUssSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQzs7QUFVOUIsVUFBSSxlQUFlLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLEdBQUUsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7QUFDM0QsVUFBSSxjQUFjLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLEdBQUcsQUFBQyxJQUFJLElBQUksRUFBRSxDQUFFLE9BQU8sRUFBRSxDQUFDO0FBQy9FLFVBQUksZUFBZSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFdBQVcsRUFBRSxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFDLENBQUMsQ0FBQzs7QUFFL0UsYUFBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUs7O0FBRXZDLGNBQUssU0FBUyxHQUFHLFdBQVcsQ0FBQyxZQUFNOztBQUVsQyxZQUFJLEFBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBRSxPQUFPLEVBQUUsR0FBRyxjQUFjLEVBQUU7O0FBRTVDLGdCQUFLLG1CQUFtQixDQUFDLGVBQWUsRUFBRSxPQUFPLENBQUMsQ0FDaEQsSUFBSSxDQUFDLFVBQUMsR0FBRyxFQUFLO0FBRWQsdUJBQWEsQ0FBQyxPQUFLLFNBQVMsQ0FBQyxDQUFDO0FBQzlCLGlCQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7VUFDYixDQUFDLFNBQ0ksQ0FBQyxVQUFDLEdBQUcsRUFBSzs7QUFFZixjQUFHLEdBQUcsQ0FBQyxNQUFNLElBQUksR0FBRyxFQUFFLEVBRXJCLE1BQU07QUFDTix3QkFBYSxDQUFDLE9BQUssU0FBUyxDQUFDLENBQUM7QUFDOUIsaUJBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztXQUNaO1VBRUQsQ0FBQyxDQUFDO1NBRUosTUFBTTtBQUVOLHNCQUFhLENBQUMsT0FBSyxTQUFTLENBQUMsQ0FBQztBQUM5QixlQUFNLENBQUMsSUFBSSw4QkFBOEIsRUFBRSxDQUFDLENBQUM7U0FDN0M7UUFFRCxFQUFFLGVBQWUsR0FBQyxJQUFJLENBQUMsQ0FBQztPQUV6QixDQUFDLENBQUM7TUFFSCxDQUFDLENBQUM7S0FFSDs7QUFqSlcsUUFBSSxXQW1KaEIsV0FBVyxHQUFBLHVCQUFHOztBQUViLFNBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztBQUNyQyxTQUFHLENBQUMsT0FBTyxFQUFFO0FBQ1osVUFBSSxHQUFHLEdBQUcsSUFBSSw2QkFBNkIsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBQ2pFLFlBQU0sR0FBRyxDQUFDO01BQ1Y7QUFDRCxZQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDdEI7O0FBM0pXLFFBQUksV0E2SmhCLFVBQVUsR0FBQSxvQkFBQyxLQUFLLEVBQUU7O0FBRWpCLFNBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztBQUNyQyxTQUFHLENBQUMsT0FBTyxFQUFFO0FBQ1osVUFBSSxHQUFHLEdBQUcsSUFBSSw2QkFBNkIsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBQ2pFLFlBQU0sR0FBRyxDQUFDO01BQ1Y7QUFDRCxZQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBRTFCOztBQXRLVyxRQUFJLFdBd0toQixjQUFjLEdBQUEsMEJBQUc7QUFDaEIsU0FBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0FBQ3JDLFNBQUcsQ0FBQyxPQUFPLEVBQUU7QUFDWixVQUFJLEdBQUcsR0FBRyxJQUFJLDZCQUE2QixDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFDakUsWUFBTSxHQUFHLENBQUM7TUFDVjtBQUNELFlBQU8sT0FBTyxDQUFDLGNBQWMsRUFBRSxDQUFDO0tBQ2hDOztBQS9LVyxRQUFJLFdBaUxoQixhQUFhLEdBQUEsdUJBQUMsV0FBVyxFQUFFLE9BQU8sRUFBRTtBQUNuQyxTQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQzdCLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FDM0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUNmLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQzVCLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FDZixPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDdkIsWUFBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDbkQsWUFBTyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3ZCOztBQTFMVyxRQUFJLFdBNExoQiw4QkFBOEIsR0FBQSx3Q0FBQyxXQUFXLEVBQUUsT0FBTyxFQUFFO0FBQ3BELFNBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBQ3ZELE9BQUUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBQyxVQUFVLEVBQUUsb0JBQW9CLEVBQUMsQ0FBQyxDQUFDO0FBQzFELFlBQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDdkM7O0FBaE1XLFFBQUksV0FrTWhCLG9CQUFvQixHQUFBLDhCQUFDLFdBQVcsRUFBRSxhQUFhLEVBQUUsT0FBTyxFQUFFO0FBQ3pELFNBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBQ3ZELE9BQUUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBQyxVQUFVLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBRSxhQUFhLEVBQUMsQ0FBQyxDQUFDO0FBQ25GLFlBQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDdkM7O0FBdE1XLFFBQUksV0F3TWhCLHVCQUF1QixHQUFBLGlDQUFDLFdBQVcsRUFBRSxPQUFPLEVBQUU7QUFDN0MsU0FBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN4RSxPQUFFLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUMsVUFBVSxFQUFFLFFBQVEsRUFBQyxDQUFDLENBQUM7QUFDOUMsWUFBTyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztLQUN2Qzs7QUE1TVcsUUFBSSxXQThNaEIsbUJBQW1CLEdBQUEsNkJBQUMsV0FBVyxFQUFFLE9BQU8sRUFBRTtBQUN6QyxTQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hFLE9BQUUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBQyxVQUFVLEVBQUUsUUFBUSxFQUFDLENBQUMsQ0FBQztBQUM5QyxZQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQ3ZDOztBQWxOVyxRQUFJLFdBb05oQixvQkFBb0IsR0FBQSw4QkFBQyxXQUFXLEVBQUUsT0FBTyxFQUFFO0FBQzFDLFNBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxVQUFVLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDaEgsT0FBRSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUMsQ0FBQyxDQUFDO0FBQy9DLFlBQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDdkM7O1dBeE5XLElBQUk7OzttQkFBSixJQUFJIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvYXV0aC9hdXRoLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==