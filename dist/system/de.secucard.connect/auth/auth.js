System.register(['lodash', '../net/message', './token'], function (_export) {
	'use strict';

	var _, POST, Token, Auth;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	return {
		setters: [function (_lodash) {
			_ = _lodash['default'];
		}, function (_netMessage) {
			POST = _netMessage.POST;
		}, function (_token) {
			Token = _token.Token;
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

						var token = Token.create(res.body);
						token.setExpireTime();
						_this.storeToken(token);
						return token;
					};

					var tokenError = function tokenError(err) {
						_this.removeToken();

						var error = new Error('Authorization error');
						error.data = err.response.body;
						throw error;
					};

					if (token != null && token.getRefreshToken() != null) {

						return this._tokenRefreshRequest(cr, ch).then(tokenSuccess)['catch'](tokenError);
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
					return channel.send(m);
				};

				Auth.prototype._tokenClientCredentialsRequest = function _tokenClientCredentialsRequest(credentials, channel) {
					var cr = _.pick(credentials, this.baseCredentialNames);
					cr = _.assign({}, cr, { grant_type: 'client_credentials' });
					return this._tokenRequest(cr, channel);
				};

				Auth.prototype._tokenAppUserRequest = function _tokenAppUserRequest(credentials, channel) {
					var cr = _.pick(credentials, this.baseCredentialNames.concat(['username', 'password', 'device', 'deviceinfo']));
					cr = _.assign({}, cr, { grant_type: 'appuser' });
					return this._tokenRequest(cr, channel);
				};

				Auth.prototype._tokenRefreshRequest = function _tokenRefreshRequest(credentials, channel) {
					var cr = _.pick(credentials, this.baseCredentialNames.concat(['refresh_token']));
					cr = _.assign({}, cr, { grant_type: 'refresh_token' });
					return this._tokenRequest(cr, channel);
				};

				Auth.prototype._tokenReviceCodeRequest = function _tokenReviceCodeRequest(credentials, channel) {
					var cr = _.pick(credentials, this.baseCredentialNames.concat(['uuid']));
					cr = _.assign({}, cr, { grant_type: 'device' });
					return this._tokenRequest(cr, channel);
				};

				Auth.prototype._tokenDeviceRequest = function _tokenDeviceRequest(credentials, channel) {
					var cr = _.pick(credentials, this.baseCredentialNames.concat(['code']));
					cr = _.assign({}, cr, { grant_type: 'device' });
					return this._tokenRequest(cr, channel);
				};

				return Auth;
			})();

			_export('Auth', Auth);
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvYXV0aC9hdXRoLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztxQkFLYSxJQUFJOzs7Ozs7OztzQkFIVCxJQUFJOztrQkFDSixLQUFLOzs7QUFFQSxPQUFJO0FBS0wsYUFMQyxJQUFJLEdBS0Y7MkJBTEYsSUFBSTs7VUFFaEIsbUJBQW1CLEdBQUcsQ0FBQyxXQUFXLEVBQUUsZUFBZSxDQUFDO1VBQ3BELFdBQVcsR0FBRyxFQUFDLGNBQWMsRUFBRSxtQ0FBbUMsRUFBQztLQUlsRTs7QUFQVyxRQUFJLFdBU2hCLG9CQUFvQixHQUFBLDhCQUFDLE9BQU8sRUFBRTs7QUFFN0IsU0FBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN2RCxTQUFJLENBQUMsY0FBYyxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDOztBQUUzRCxTQUFJLENBQUMsUUFBUSxHQUFHLFlBQU07O0FBRXJCLGFBQU8sT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO01BRXpDLENBQUM7S0FFRjs7QUFwQlcsUUFBSSxXQXNCaEIsUUFBUSxHQUFBLGtCQUFDLE1BQU0sRUFBQzs7O0FBRWYsU0FBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDOztBQUVsQyxTQUFHLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLEVBQUM7QUFDdEMsVUFBRyxNQUFNLEVBQUM7QUFFVCxZQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7QUFDaEIsV0FBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztPQUM3Qjs7QUFFRCxhQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7TUFFOUI7O0FBRUQsU0FBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFD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QUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2hILE9BQUUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBQyxVQUFVLEVBQUUsU0FBUyxFQUFDLENBQUMsQ0FBQztBQUMvQyxZQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQ3ZDOztBQS9HVyxRQUFJLFdBaUhoQixvQkFBb0IsR0FBQSw4QkFBQyxXQUFXLEVBQUUsT0FBTyxFQUFFO0FBQzFDLFNBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDakYsT0FBRSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFDLFVBQVUsRUFBRSxlQUFlLEVBQUMsQ0FBQyxDQUFDO0FBQ3JELFlBQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDdkM7O0FBckhXLFFBQUksV0F1SGhCLHVCQUF1QixHQUFBLGlDQUFDLFdBQVcsRUFBRSxPQUFPLEVBQUU7QUFDN0MsU0FBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN4RSxPQUFFLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUMsVUFBVSxFQUFFLFFBQVEsRUFBQyxDQUFDLENBQUM7QUFDOUMsWUFBTyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztLQUN2Qzs7QUEzSFcsUUFBSSxXQTZIaEIsbUJBQW1CLEdBQUEsNkJBQUMsV0FBVyxFQUFFLE9BQU8sRUFBRTtBQUN6QyxTQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hFLE9BQUUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBQyxVQUFVLEVBQUUsUUFBUSxFQUFDLENBQUMsQ0FBQztBQUM5QyxZQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQ3ZDOztXQWpJVyxJQUFJOzs7bUJBQUosSUFBSSIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L2F1dGgvYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=