'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _netMessage = require('./net/message');

var _clientConfig = require('./client-config');

var _clientContext = require('./client-context');

var _clientVersion = require('./client-version');

var Client = (function () {
	function Client(config, environment) {
		_classCallCheck(this, Client);

		this.config = config;
		this.context = new _clientContext.ClientContext(config, environment);
		this.getService = this.context.getService.bind(this.context);
		this.addAppService = this.context.addAppService.bind(this.context);
		this.removeAppService = this.context.removeAppService.bind(this.context);
		this.emitServiceEvent = this.context.emitServiceEvent.bind(this.context);
		this.on = this.context.on.bind(this.context);
		this.setCredentials = this.context.setCredentials.bind(this.context);
		this.getStoredToken = this.context.getStoredToken.bind(this.context);
		this.connected = false;
	}

	Client.prototype.open = function open() {
		var _this = this;

		if (this.connected) {
			return Promise.resolve(this.connected);
		}

		return this.context.open().then(function () {
			_this.connected = true;
			return _this.connected;
		});
	};

	Client.prototype.getVersion = function getVersion() {
		return _clientVersion.Version.name;
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