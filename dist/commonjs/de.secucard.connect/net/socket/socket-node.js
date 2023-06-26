"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SocketAtNode = void 0;
var _net = _interopRequireDefault(require("net"));
var _tls = _interopRequireDefault(require("tls"));
var _minilog = _interopRequireDefault(require("minilog"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var SocketAtNode = {};
exports.SocketAtNode = SocketAtNode;
SocketAtNode.connect = function (host, port, endpoint, sslEnabled, ssl_options, ssl_validate, onInit, onError) {
  var socket = null;
  if (sslEnabled) {
    (0, _minilog["default"])('secucard.socket.node').debug('Connecting to ' + host + ':' + port + ' using SSL');
    socket = _tls["default"].connect(port, host, ssl_options, function () {
      (0, _minilog["default"])('secucard.socket.node').debug('SSL connection complete');
      if (!socket.authorized) {
        (0, _minilog["default"])('secucard.socket.node').error('SSL is not authorized:', socket.authorizationError);
        if (ssl_validate) {
          onError(socket.authorizationError);
          SocketNode.disconnect(socket);
          return;
        }
      }
      onInit(socket, true);
    }).on('error', function (err, obj) {
      (0, _minilog["default"])('secucard.socket.node').error(err, obj);
      onError(err);
    });
  } else {
    (0, _minilog["default"])('secucard.socket.node').debug('Connecting to ' + host + ':' + port);
    socket = new _net["default"].Socket();
    socket.connect(port, host);
    onInit(socket, false);
  }
};
SocketAtNode.disconnect = function (socket) {
  socket.end();
  if (socket.readyState == 'readOnly') {
    socket.destroy();
  }
  (0, _minilog["default"])('secucard.socket.node').debug('disconnect called');
};