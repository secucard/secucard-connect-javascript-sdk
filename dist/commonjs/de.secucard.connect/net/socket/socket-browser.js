"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SocketAtBrowser = void 0;
var _eventemitter = _interopRequireDefault(require("eventemitter3"));
var _minilog = _interopRequireDefault(require("minilog"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var SocketAtBrowser = function () {
  function SocketAtBrowser(url) {
    var _this = this;
    _classCallCheck(this, SocketAtBrowser);
    Object.assign(this, _eventemitter["default"].prototype);
    var ws = new WebSocket(url);
    ws.binaryType = "arraybuffer";
    ws.onopen = function () {
      (0, _minilog["default"])('secucard.socket.browser').debug('onopen');
      _this.emit('connect');
    };
    ws.onmessage = function (event) {
      (0, _minilog["default"])('secucard.socket.browser').debug('onmessage', event);
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
  _createClass(SocketAtBrowser, [{
    key: "close",
    value: function close() {
      this.ws.close();
    }
  }, {
    key: "write",
    value: function write(chunk) {
      this.ws.send(chunk);
      return true;
    }
  }]);
  return SocketAtBrowser;
}();
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
  (0, _minilog["default"])('secucard.socket.browser').debug('disconnect called');
  socket.close();
};