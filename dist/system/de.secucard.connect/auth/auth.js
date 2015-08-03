System.register(['lodash', '../net/message', './token', './exception'], function (_export) {
	'use strict';

	var _, POST, Token, AuthenticationFailedException, Auth;

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
						var error = Object.assign(new AuthenticationFailedException(), err.response.body);

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

						_this2.emit('deviceCode', res);

						var pollIntervalSec = res.interval > 0 ? res.interval : 5;

						return new Promise(function (resolve, reject) {

							resolve();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvYXV0aC9hdXRoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztvREFJYSxJQUFJOzs7Ozs7OztzQkFIVCxJQUFJOzttQkFDSixLQUFLOzs4Q0FDTCw2QkFBNkI7OztBQUN4QixPQUFJO0FBS0wsYUFMQyxJQUFJLEdBS0Y7MkJBTEYsSUFBSTs7VUFFaEIsbUJBQW1CLEdBQUcsQ0FBQyxXQUFXLEVBQUUsZUFBZSxDQUFDO1VBQ3BELFdBQVcsR0FBRyxFQUFDLGNBQWMsRUFBRSxtQ0FBbUMsRUFBQztLQUlsRTs7QUFQVyxRQUFJLFdBU2hCLG9CQUFvQixHQUFBLDhCQUFDLE9BQU8sRUFBRTs7QUFFN0IsU0FBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzs7QUFFdkMsU0FBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN2RCxTQUFJLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDOztBQUUzRCxTQUFJLENBQUMsUUFBUSxHQUFHLFlBQU07O0FBRXJCLGFBQU8sT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO01BRXpDLENBQUM7S0FFRjs7QUF0QlcsUUFBSSxXQXdCaEIsUUFBUSxHQUFBLGtCQUFDLE1BQU0sRUFBQzs7O0FBSWYsU0FBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDOztBQUVsQyxTQUFHLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLEVBQUM7QUFDdEMsVUFBRyxNQUFNLEVBQUM7QUFFVCxZQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7QUFDaEIsV0FBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztPQUM3Qjs7QUFFRCxhQUFP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RSxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hFLE9BQUUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBQyxVQUFVLEVBQUUsUUFBUSxFQUFDLENBQUMsQ0FBQztBQUM5QyxZQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQ3ZDOztBQTNLVyxRQUFJLFdBNktoQixvQkFBb0IsR0FBQSw4QkFBQyxXQUFXLEVBQUUsT0FBTyxFQUFFO0FBQzFDLFNBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxVQUFVLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDaEgsT0FBRSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUMsQ0FBQyxDQUFDO0FBQy9DLFlBQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDdkM7O1dBakxXLElBQUk7OzttQkFBSixJQUFJIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvYXV0aC9hdXRoLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==