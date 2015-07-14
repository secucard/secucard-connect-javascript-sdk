'use strict';

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Object$create = require('babel-runtime/core-js/object/create')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

exports.__esModule = true;

var _netMessage = require('./net/message');

var _clientConfig = require('./client-config');

var _clientContext = require('./client-context');

var Client = (function () {
	function Client(config, environment) {
		_classCallCheck(this, Client);

		this.config = config;
		this.context = new _clientContext.ClientContext(config, environment);
	}

	Client.prototype.setCredentials = function setCredentials(credentials) {
		this.context.setCredentials(credentials);
	};

	Client.prototype.connect = function connect() {

		return this.context.getAuth().getToken();
	};

	return Client;
})();

exports.Client = Client;

Client.create = function (environment, config) {

	if (!config) {
		config = _Object$create(null);
	}

	config = _Object$assign(_clientConfig.ClientConfig.defaults(), environment.config, config);

	return new Client(config, environment);
};