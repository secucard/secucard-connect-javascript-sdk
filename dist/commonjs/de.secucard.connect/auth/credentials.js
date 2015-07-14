'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _token = require('./token');

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
	if (credentials.token) {
		credentials.token = _token.Token.create(credentials.token);
	}
	return Object.assign(cr, credentials);
};