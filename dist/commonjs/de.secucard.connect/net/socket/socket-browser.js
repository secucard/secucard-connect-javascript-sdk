'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _eventemitter3 = require('eventemitter3');

var _eventemitter32 = _interopRequireDefault(_eventemitter3);

var _minilog = require('minilog');

var _minilog2 = _interopRequireDefault(_minilog);

var SocketAtBrowser = (function () {
    function SocketAtBrowser(url) {
        var _this = this;

        _classCallCheck(this, SocketAtBrowser);

        Object.assign(this, _eventemitter32['default'].prototype);

        var ws = new WebSocket(url);
        ws.binaryType = "arraybuffer";

        ws.onopen = function () {

            _minilog2['default']('secucard.socket.browser').debug('onopen');
            _this.emit('connect');
        };

        ws.onmessage = function (event) {

            _minilog2['default']('secucard.socket.browser').debug('onmessage', event);
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

    _minilog2['default']('secucard.socket.browser').debug('disconnect called');
    socket.close();
};