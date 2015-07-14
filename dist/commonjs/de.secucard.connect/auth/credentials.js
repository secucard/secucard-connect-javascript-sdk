'use strict';

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

exports.__esModule = true;

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
	return _Object$assign(cr, credentials);
};