'use strict';

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Object$assign = require('babel-runtime/core-js/object/assign')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _eventemitter3 = require('eventemitter3');

var _eventemitter32 = _interopRequireDefault(_eventemitter3);

var SocketAtBrowser = (function () {
	function SocketAtBrowser(url) {
		var _this = this;

		_classCallCheck(this, SocketAtBrowser);

		_Object$assign(this, _eventemitter32['default'].prototype);

		var ws = new WebSocket(url);
		ws.binaryType = 'arraybuffer';

		ws.onopen = function () {

			console.log('ws.onopen');
			_this.emit('connect');
		};

		ws.onmessage = function (event) {

			console.log('ws.onmessage', event);
			_this.emit('data', event.data);
		};

		ws.onclose = function (event) {

			if (event.code == 1000) {
				_this.emit('close');
			} else {
				_this.emit('close', event.reason);
			}
		};

		this.ws = ws;
	}

	SocketAtBrowser.prototype.close = function close() {

		this.ws.close();
	};

	SocketAtBrowser.prototype.write = function write(chunk) {

		this.ws.send(chunk);
		return true;
	};

	return SocketAtBrowser;
})();

exports.SocketAtBrowser = SocketAtBrowser;

SocketAtBrowser.connect = function (host, port, endpoint, sslEnabled, ssl_options, ssl_validate, onInit, onError) {

	var url = host + ':' + port + endpoint;
	if (sslEnabled) {
		url = 'wss://' + url;
	} else {
		url = 'ws://' + url;
	}

	var socket = new SocketAtBrowser(url);
	onInit(socket, false);
};

SocketAtBrowser.disconnect = function (socket) {

	console.log('SocketNode', 'disconnect called');
	socket.close();
};