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

					if (token != null && token.getRefreshToken() != null) {

						return this._tokenRefreshRequest(cr, token.getRefreshToken(), ch).then(tokenSuccess)['catch'](tokenError);
					}

					return this._tokenClientCredentialsRequest(cr, ch).then(tokenSuccess)['catch'](tokenError);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvYXV0aC9hdXRoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztvREFJYSxJQUFJOzs7Ozs7OztzQkFIVCxJQUFJOzttQkFDSixLQUFLOzs4Q0FDTCw2QkFBNkI7OztBQUN4QixPQUFJO0FBS0wsYUFMQyxJQUFJLEdBS0Y7MkJBTEYsSUFBSTs7VUFFaEIsbUJBQW1CLEdBQUcsQ0FBQyxXQUFXLEVBQUUsZUFBZSxDQUFDO1VBQ3BELFdBQVcsR0FBRyxFQUFDLGNBQWMsRUFBRSxtQ0FBbUMsRUFBQztLQUlsRTs7QUFQVyxRQUFJLFdBU2hCLG9CQUFvQixHQUFBLDhCQUFDLE9BQU8sRUFBRTs7QUFFN0IsU0FBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN2RCxTQUFJLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDOztBQUUzRCxTQUFJLENBQUMsUUFBUSxHQUFHLFlBQU07O0FBRXJCLGFBQU8sT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO01BRXpDLENBQUM7S0FFRjs7QUFwQlcsUUFBSSxXQXNCaEIsUUFBUSxHQUFBLGtCQUFDLE1BQU0sRUFBQzs7O0FBSWYsU0FBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDOztBQUVsQyxTQUFHLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLEVBQUM7QUFDdEMsVUFBRyxNQUFNLEVBQUM7QUFFVCxZQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7QUFDaEIsV0FBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztPQUM3Qjs7QUFFRCxhQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7TUFFOUI7O0FBRUQsU0FBSSxFQUFFLEdBQUcsSUFBSSxDQUFD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