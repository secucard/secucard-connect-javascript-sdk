'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _qs = require('qs');

var _qs2 = _interopRequireDefault(_qs);

var _eventemitter3 = require('eventemitter3');

var _eventemitter32 = _interopRequireDefault(_eventemitter3);

var _channel = require('./channel');

var _stompImplStomp = require('./stomp-impl/stomp');

var utils = {};
utils.really_defined = function (var_to_test) {
	return !(var_to_test == null || var_to_test == undefined);
};

utils.queryToString = function (queryObject) {
	return _qs2['default'].stringify(queryObject);
};

utils.sizeOfUTF8 = function (str) {
	var size = 0;
	if (str) {
		size = encodeURI(str).match(/%..|./g).length;
	}
	return size;
};

var Stomp = (function () {
	function Stomp(SocketImpl) {
		_classCallCheck(this, Stomp);

		Object.assign(this, _eventemitter32['default'].prototype);

		this.connection = null;
		this.messages = {};

		this.skipSessionRefresh = false;
		this.sessionTimer = null;

		this.connectAccessToken = null;

		this.stompCommands = {};
		this.stompCommands[_channel.Channel.METHOD.GET] = 'get';
		this.stompCommands[_channel.Channel.METHOD.CREATE] = 'add';
		this.stompCommands[_channel.Channel.METHOD.EXECUTE] = 'exec';
		this.stompCommands[_channel.Channel.METHOD.UPDATE] = 'update';
		this.stompCommands[_channel.Channel.METHOD.DELETE] = 'delete';

		this.connection = new _stompImplStomp.Stomp(SocketImpl);
		this.connection.on('message', this._handleStompMessage.bind(this));
	}

	Stomp.prototype.configureWithContext = function configureWithContext(context) {

		this.emitServiceEvent = context.emitServiceEvent.bind(context);

		this.getToken = function () {
			return context.getAuth().getToken();
		};

		this.getStompHost = function () {
			return context.getConfig().getStompHost();
		};

		this.getStompPort = function () {
			return context.getConfig().getStompPort();
		};

		this.getStompSslEnabled = function () {
			return context.getConfig().getStompSslEnabled();
		};

		this.getStompVHost = function () {
			return context.getConfig().getStompVHost();
		};

		this.getStompQueue = function () {
			return context.getConfig().getStompQueue();
		};

		this.getStompDestination = function () {
			return context.getConfig().getStompDestination();
		};

		this.getStompEndpoint = function () {
			return context.getConfig().getStompEndpoint();
		};

		this.isDevice = function () {
			return context.getConfig().isDevice();
		};

		this.getStompHeartbeatMs = function () {
			return context.getConfig().getStompHeartbeatMs();
		};
	};

	Stomp.prototype.getStompConfig = function getStompConfig() {

		return {

			host: this.getStompHost(),
			port: this.getStompPort(),
			ssl: this.getStompSslEnabled(),
			vhost: this.getStompVHost(),
			heartbeatMs: this.getStompHeartbeatMs(),
			endpoint: this.getStompEndpoint(),
			login: '',
			passcode: ''
		};
	};

	Stomp.prototype.open = function open() {

		return this._startSessionRefresh();
	};

	Stomp.prototype.connect = function connect() {
		var _this = this;

		console.log('stomp start connection');

		return this.getToken().then(function (token) {

			console.log('Got token', token);
			return _this._connect(token.access_token);
		});
	};

	Stomp.prototype.close = function close() {

		clearInterval(this.sessionTimer);
		return this._disconnect();
	};

	Stomp.prototype._disconnect = function _disconnect() {
		var _this2 = this;

		return new Promise(function (resolve, reject) {

			if (!_this2.connection.isConnected()) {
				resolve();
				return;
			}

			if (_this2.connection && _this2.connection.disconnect) {
				_this2.connection.disconnect();
			}

			_this2._stompOnDisconnected = function () {
				console.log('stomp disconnected');
				_this2.connection.removeListener('connected', _this2._stompOnDisconnected);
				delete _this2._stompOnDisconnected;
				resolve();
			};

			_this2.connection.on('disconnected', _this2._stompOnDisconnected);
		});
	};

	Stomp.prototype.request = function request(method, params) {

		var destination = this.buildDestination(method, params);
		var message = this.createMessage(params);
		return this._sendMessage(destination, message);
	};

	Stomp.prototype.buildDestination = function buildDestination(method, params) {

		var destination = {};

		if (params.endpoint != null) {
			destination.endpoint = params.endpoint;
		} else if (params.appId != null) {
			destination.appId = params.appId;
		} else {
			throw new Error('Missing object spec or app id');
		}

		destination.command = this.stompCommands[method];

		if (!destination.command) {
			throw new Error('Invalid method arg');
		}

		destination.action = params.action;

		return destination;
	};

	Stomp.prototype.createMessage = function createMessage(params) {

		var message = {};

		if (utils.really_defined(params.objectId)) {
			message.pid = params.objectId;
		}

		if (utils.really_defined(params.actionArg)) {
			message.sid = params.actionArg;
		}

		if (utils.really_defined(params.queryParams)) {
			message.query = utils.queryToString(params.queryParams);
		}

		if (utils.really_defined(params.data)) {
			message.data = params.data;
		}

		return message;
	};

	Stomp.prototype._connect = function _connect(accessToken) {
		var _this3 = this;

		this.connectAccessToken = accessToken;

		var stompCredentials = {
			login: accessToken,
			passcode: accessToken
		};

		this.connection.configure(this.getStompConfig());
		this.connection.connect(stompCredentials);

		return new Promise(function (resolve, reject) {

			_this3._stompOnConnected = function () {
				console.log('stomp connected');
				_this3._stompClearListeners();
				resolve();
			};

			_this3._stompOnError = function (body) {
				console.log('stomp error', body);
				_this3._stompClearListeners();
				reject(body);
			};

			_this3._stompClearListeners = function () {
				_this3.connection.removeListener('connected', _this3._stompOnConnected);
				_this3.connection.removeListener('error', _this3._stompOnError);
				delete _this3._stompOnConnected;
				delete _this3._stompOnError;
				delete _this3._stompClearListeners;
			};

			_this3.connection.on('connected', _this3._stompOnConnected);
			_this3.connection.on('error', _this3._stompOnError);
		});
	};

	Stomp.prototype._sendMessage = function _sendMessage(destinationObj, message) {
		var _this4 = this;

		console.log('_sendMessage', destinationObj, message);

		return this.getToken().then(function (token) {

			var accessToken = token.access_token;
			var correlationId = _this4.createCorrelationId();

			var headers = {};
			headers['reply-to'] = _this4.getStompQueue();
			headers['content-type'] = 'application/json';
			headers['user-id'] = accessToken;
			headers['correlation-id'] = correlationId;

			if (destinationObj.appId) {
				headers['app-id'] = destinationObj.appId;
			}

			var body = JSON.stringify(message);
			headers['content-length'] = utils.sizeOfUTF8(body);

			var destination = _this4.getStompDestination();
			if (destinationObj.appId) {

				destination += 'app:' + destinationObj.action;
			} else {

				destination += 'api:' + destinationObj.command + ':';

				var endpoint = [];
				if (destinationObj.endpoint) {
					endpoint = endpoint.concat(destinationObj.endpoint);
				}
				if (destinationObj.action) {
					endpoint.push(destinationObj.action);
				}

				destination += endpoint.join('.');
			}

			var sendWithStomp = function sendWithStomp() {

				return new Promise(function (resolve, reject) {

					_this4.messages[correlationId] = { resolve: resolve, reject: reject };
					_this4.connection.send(destination, headers, body);
				});
			};

			if (!_this4.connection.isConnected() || token && token.access_token != _this4.connectAccessToken) {

				if (_this4.connection.isConnected()) {
					console.log('Reconnect due token change.');
				}

				return _this4._disconnect().then(function () {

					return _this4._connect(accessToken).then(sendWithStomp);
				});
			}

			return sendWithStomp();
		});
	};

	Stomp.prototype._startSessionRefresh = function _startSessionRefresh() {
		var _this5 = this;

		console.log('Stomp session refresh loop started');
		var initial = true;

		var sessionInterval = this.getStompHeartbeatMs() > 0 ? this.getStompHeartbeatMs() - 500 : 25 * 1000;

		this.sessionTimer = setInterval(function () {

			if (_this5.skipSessionRefresh) {
				_this5.skipSessionRefresh = false;
			} else {
				_this5._runSessionRefresh(false);
			}
		}, sessionInterval);

		return this._runSessionRefresh(initial);
	};

	Stomp.prototype._runSessionRefresh = function _runSessionRefresh(initial) {
		var _this6 = this;

		return this.request(_channel.Channel.METHOD.EXECUTE, {
			endpoint: ['auth', 'sessions'],
			objectId: 'me',
			action: 'refresh'
		}).then(function (res) {

			_this6.emit('sessionRefresh');
			console.log('Session refresh sent');
			_this6.skipSessionRefresh = false;
			return res;
		})['catch'](function (err) {

			_this6.emit('sessionRefreshError');
			console.log('Session refresh failed');
			if (initial) {
				throw err;
			}
		});
	};

	Stomp.prototype._handleStompMessage = function _handleStompMessage(frame) {
		this.skipSessionRefresh = true;

		console.log('_handleStompMessage', frame);
		var body = undefined;

		if (frame && frame.headers && frame.headers['correlation-id']) {

			var correlationId = frame.headers['correlation-id'];
			body = JSON.parse(frame.body[0]);

			if (body.status == 'ok') {
				this.messages[correlationId].resolve(body.data);
			} else {
				var error = new Error('Api request error');
				error.data = body;
				this.messages[correlationId].reject(error);
			}

			delete this.messages[correlationId];
		} else if (frame) {

			body = JSON.parse(frame.body[0]);
			this.emitServiceEvent(body.target, body.type, body.data);
		}
	};

	Stomp.prototype.createCorrelationId = function createCorrelationId() {
		return _uuid2['default'].v1();
	};

	return Stomp;
})();

exports.Stomp = Stomp;