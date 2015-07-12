'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _netMessage = require('../net/message');

var _token = require('./token');

var Auth = (function () {
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

			var token = _token.Token.create(res.body);
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
		var m = channel.createMessage().setBaseUrl(this.oAuthUrl()).setUrl('token').setHeaders(this.baseHeaders).setMethod(_netMessage.POST).setBody(credentials);
		return channel.send(m);
	};

	Auth.prototype._tokenClientCredentialsRequest = function _tokenClientCredentialsRequest(credentials, channel) {
		var cr = _lodash2['default'].pick(credentials, this.baseCredentialNames);
		cr = _lodash2['default'].assign({}, cr, { grant_type: 'client_credentials' });
		return this._tokenRequest(cr, channel);
	};

	Auth.prototype._tokenAppUserRequest = function _tokenAppUserRequest(credentials, channel) {
		var cr = _lodash2['default'].pick(credentials, this.baseCredentialNames.concat(['username', 'password', 'device', 'deviceinfo']));
		cr = _lodash2['default'].assign({}, cr, { grant_type: 'appuser' });
		return this._tokenRequest(cr, channel);
	};

	Auth.prototype._tokenRefreshRequest = function _tokenRefreshRequest(credentials, channel) {
		var cr = _lodash2['default'].pick(credentials, this.baseCredentialNames.concat(['refresh_token']));
		cr = _lodash2['default'].assign({}, cr, { grant_type: 'refresh_token' });
		return this._tokenRequest(cr, channel);
	};

	Auth.prototype._tokenReviceCodeRequest = function _tokenReviceCodeRequest(credentials, channel) {
		var cr = _lodash2['default'].pick(credentials, this.baseCredentialNames.concat(['uuid']));
		cr = _lodash2['default'].assign({}, cr, { grant_type: 'device' });
		return this._tokenRequest(cr, channel);
	};

	Auth.prototype._tokenDeviceRequest = function _tokenDeviceRequest(credentials, channel) {
		var cr = _lodash2['default'].pick(credentials, this.baseCredentialNames.concat(['code']));
		cr = _lodash2['default'].assign({}, cr, { grant_type: 'device' });
		return this._tokenRequest(cr, channel);
	};

	return Auth;
})();

exports.Auth = Auth;