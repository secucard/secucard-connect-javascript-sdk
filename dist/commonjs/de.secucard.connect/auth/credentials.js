"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Credentials = function Credentials() {
	_classCallCheck(this, Credentials);

	this.token = null;

	this.client_id = null;
	this.client_secret = null;

	this.uuid = null;

	this.code = null;

	this.username = null;
	this.password = null;
	this.device = null;
	this.deviveinfo = { name: null };
};

exports.Credentials = Credentials;

Credentials.create = function (credentials) {

	var cr = new Credentials();
	return Object.assign(cr, credentials);
};