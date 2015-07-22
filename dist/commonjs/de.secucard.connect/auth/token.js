"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Token = (function () {
	function Token() {
		_classCallCheck(this, Token);

		this.access_token = null;
		this.refresh_token = null;
		this.token_type = null;
		this.expires_in = null;
		this.scope = null;
	}

	Token.prototype.getRefreshToken = function getRefreshToken() {

		return this.refresh_token;
	};

	Token.prototype.getAccessToken = function getAccessToken() {

		return this.access_token;
	};

	Token.prototype.isExpired = function isExpired() {

		return !this.expireTime || new Date().getTime() > this.expireTime;
	};

	Token.prototype.setExpireTime = function setExpireTime() {

		this.expireTime = parseInt(this.expires_in) * 1000 + new Date().getTime();
	};

	Token.prototype.getExpireTime = function getExpireTime() {

		return this.expireTime;
	};

	Token.prototype.update = function update(data) {
		return Object.assign(this, data);
	};

	return Token;
})();

exports.Token = Token;

Token.create = function (data) {

	var token = new Token();
	token = Object.assign(token, data);
	return token;
};