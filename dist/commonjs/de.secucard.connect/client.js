'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

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
		config = Object.create(null);
	}

	config = Object.assign(_clientConfig.ClientConfig.defaults(), environment.config, config);

	return new Client(config, environment);
};