'use strict';

exports.__esModule = true;
exports.SocketAtNode = undefined;

var _net = require('net');

var _net2 = _interopRequireDefault(_net);

var _tls = require('tls');

var _tls2 = _interopRequireDefault(_tls);

var _minilog = require('minilog');

var _minilog2 = _interopRequireDefault(_minilog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SocketAtNode = exports.SocketAtNode = {};

SocketAtNode.connect = function (host, port, endpoint, sslEnabled, ssl_options, ssl_validate, onInit, onError) {

    var socket = null;

    if (sslEnabled) {

        (0, _minilog2.default)('secucard.socket.node').debug('Connecting to ' + host + ':' + port + ' using SSL');

        socket = _tls2.default.connect(port, host, ssl_options, function () {
            (0, _minilog2.default)('secucard.socket.node').debug('SSL connection complete');

            if (!socket.authorized) {
                (0, _minilog2.default)('secucard.socket.node').error('SSL is not authorized:', socket.authorizationError);
                if (ssl_validate) {
                    onError(socket.authorizationError);
                    SocketNode.disconnect(socket);
                    return;
                }
            }

            onInit(socket, true);
        }).on('error', function (err, obj) {
            (0, _minilog2.default)('secucard.socket.node').error(err, obj);
            onError(err);
        });
    } else {
        (0, _minilog2.default)('secucard.socket.node').debug('Connecting to ' + host + ':' + port);

        socket = new _net2.default.Socket();
        socket.connect(port, host);
        onInit(socket, false);
    }
};

SocketAtNode.disconnect = function (socket) {

    socket.end();
    if (socket.readyState == 'readOnly') {
        socket.destroy();
    }

    (0, _minilog2.default)('secucard.socket.node').debug('disconnect called');
};