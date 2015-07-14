"use strict";

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

var _Object$assign = require("babel-runtime/core-js/object/assign")["default"];

exports.__esModule = true;

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

	return Token;
})();

exports.Token = Token;

Token.create = function (data) {

	var token = new Token();
	token = _Object$assign(token, data);
	return token;
};