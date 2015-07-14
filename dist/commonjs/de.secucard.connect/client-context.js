'use strict';

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

exports.__esModule = true;

var _netRest = require('./net/rest');

var _authAuth = require('./auth/auth');

var _authCredentials = require('./auth/credentials');

var ClientContext = (function () {
	function ClientContext(config, environment) {
		_classCallCheck(this, ClientContext);

		var auth = new _authAuth.Auth();
		auth.configureWithContext(this);
		this.auth = auth;

		var restChannel = new _netRest.Rest();
		restChannel.configureWithContext(this);
		this.restChannel = restChannel;

		var stompChannel = environment.StompChannel.create();
		stompChannel.configureWithContext(this);
		this.stompChannel = stompChannel;

		this.config = config;
	}

	ClientContext.prototype.setCredentials = function setCredentials(credentials) {
		this.credentials = _authCredentials.Credentials.create(credentials);
	};

	ClientContext.prototype.getCredentials = function getCredentials() {
		return this.credentials;
	};

	ClientContext.prototype.getConfig = function getConfig() {
		return this.config;
	};

	ClientContext.prototype.getAuth = function getAuth() {
		return this.auth;
	};

	ClientContext.prototype.getChannel = function getChannel() {
		return null;
	};

	ClientContext.prototype.getRestChannel = function getRestChannel() {
		return this.restChannel;
	};

	ClientContext.prototype.getStompChannel = function getStompChannel() {
		return this.stompChannel;
	};

	ClientContext.prototype.getServiceDefaultOptions = function getServiceDefaultOptions() {};

	return ClientContext;
})();

exports.ClientContext = ClientContext;