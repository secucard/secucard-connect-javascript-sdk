'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _token = require('./token');

var TokenStorageInMem = (function () {
	function TokenStorageInMem(credentials) {
		_classCallCheck(this, TokenStorageInMem);

		this.credentials = credentials;

		var token = null;

		if (credentials.token) {
			token = _token.Token.create(credentials.token);
			token.setExpireTime();
			delete credentials.token;
		}

		this.storeToken(token);
	}

	TokenStorageInMem.prototype.removeToken = function removeToken() {

		this.token = null;
	};

	TokenStorageInMem.prototype.storeToken = function storeToken(token) {

		this.token = token ? token : null;
	};

	TokenStorageInMem.prototype.getStoredToken = function getStoredToken() {

		return this.token;
	};

	return TokenStorageInMem;
})();

exports.TokenStorageInMem = TokenStorageInMem;