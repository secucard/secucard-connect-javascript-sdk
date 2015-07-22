System.register(['lodash', '../net/message', './token'], function (_export) {
	'use strict';

	var _, POST, Token, Auth;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	return {
		setters: [function (_lodash) {
			_ = _lodash['default'];
		}, function (_netMessage) {
			POST = _netMessage.POST;
		}, function (_token2) {
			Token = _token2.Token;
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

						var error = new Error('Authorization error');
						error.data = err.response.body;
						throw error;
					};

					if (token != null && token.getRefreshToken() != null) {

						return this._tokenRefreshRequest(cr, token.getRefreshToken(), ch).then(tokenSuccess)['catch'](tokenError);
					}

					return this._tokenClientCredentialsRequest(cr, ch).then(tokenSuccess)['catch'](tokenError);
				};

				Auth.prototype.removeToken = function removeToken() {

					var cr = this.getCredentials();
					cr.token = null;
				};

				Auth.prototype.storeToken = function storeToken(token) {

					var cr = this.getCredentials();
					cr.token = token;
				};

				Auth.prototype.getStoredToken = function getStoredToken() {
					var cr = this.getCredentials();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvYXV0aC9hdXRoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztxQkFLYSxJQUFJOzs7Ozs7OztzQkFIVCxJQUFJOzttQkFDSixLQUFLOzs7QUFFQSxPQUFJO0FBS0wsYUFMQyxJQUFJLEdBS0Y7MkJBTEYsSUFBSTs7VUFFaEIsbUJBQW1CLEdBQUcsQ0FBQyxXQUFXLEVBQUUsZUFBZSxDQUFDO1VBQ3BELFdBQVcsR0FBRyxFQUFDLGNBQWMsRUFBRSxtQ0FBbUMsRUFBQztLQUlsRTs7QUFQVyxRQUFJLFdBU2hCLG9CQUFvQixHQUFBLDhCQUFDLE9BQU8sRUFBRTs7QUFFN0IsU0FBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN2RCxTQUFJLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDOztBQUUzRCxTQUFJLENBQUMsUUFBUSxHQUFHLFlBQU07O0FBRXJCLGFBQU8sT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO01BRXpDLENBQUM7S0FFRjs7QUFwQlcsUUFBSSxXQXNCaEIsUUFBUSxHQUFBLGtCQUFDLE1BQU0sRUFBQzs7O0FBSWYsU0FBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDOztBQUVsQyxTQUFHLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLEVBQUM7QUFDdEMsVUFBRyxNQUFNLEVBQUM7QUFFVCxZQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7QUFDaEIsV0FBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztPQUM3Qjs7QUFFRCxhQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7TUFFOUI7O0FBRUQsU0FBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFD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QU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUMsVUFBVSxFQUFFLFFBQVEsRUFBQyxDQUFDLENBQUM7QUFDOUMsWUFBTyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztLQUN2Qzs7QUE5SFcsUUFBSSxXQWdJaEIsb0JBQW9CLEdBQUEsOEJBQUMsV0FBVyxFQUFFLE9BQU8sRUFBRTtBQUMxQyxTQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2hILE9BQUUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBQyxVQUFVLEVBQUUsU0FBUyxFQUFDLENBQUMsQ0FBQztBQUMvQyxZQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQ3ZDOztXQXBJVyxJQUFJOzs7bUJBQUosSUFBSSIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L2F1dGgvYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=