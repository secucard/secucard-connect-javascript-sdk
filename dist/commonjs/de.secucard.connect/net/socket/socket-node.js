'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _net = require('net');

var _net2 = _interopRequireDefault(_net);

var _tls = require('tls');

var _tls2 = _interopRequireDefault(_tls);

var SocketAtNode = {};

exports.SocketAtNode = SocketAtNode;
SocketAtNode.connect = function (host, port, endpoint, sslEnabled, ssl_options, ssl_validate, onInit, onError) {

	var socket = null;

	if (sslEnabled) {
		console.log('SocketNode', 'ssl', 'Connecting to ' + host + ':' + port + ' using SSL');
		socket = _tls2['default'].connect(port, host, ssl_options, function () {
			console.log('SocketNode', 'SSL connection complete');

			if (!socket.authorized) {
				console.log('SocketNode', 'SSL is not authorized: ' + socket.authorizationError);
				if (ssl_validate) {
					onError(socket.authorizationError);
					SocketNode.disconnect(socket);
					return;
				}
			}

			onInit(socket, true);
		}).on('error', function (err, obj) {
			console.log(err);
			console.log(obj);
			onError(err);
		});
	} else {
		console.log('SocketNode', 'Connecting to ' + host + ':' + port);

		socket = new _net2['default'].Socket();
		socket.connect(port, host);
		onInit(socket, false);
	}
};

SocketAtNode.disconnect = function (socket) {

	socket.end();
	if (socket.readyState == 'readOnly') {
		socket.destroy();
	}

	console.log('SocketNode', 'disconnect called');
};