"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Channel", {
  enumerable: true,
  get: function get() {
    return _channel.Channel;
  }
});
exports.SecucardConnect = exports.MiniLog = void 0;
Object.defineProperty(exports, "Services", {
  enumerable: true,
  get: function get() {
    return _clientBrowserEnvironment.ServiceMap;
  }
});
var _clientBrowserEnvironment = require("./de.secucard.connect/client-browser-environment");
var _client = require("./de.secucard.connect/client");
var _channel = require("./de.secucard.connect/net/channel");
var _minilog = _interopRequireDefault(require("minilog"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var MiniLog = _minilog["default"];
exports.MiniLog = MiniLog;
_minilog["default"].suggest.deny(/secucard\..*/, 'warn');
var SecucardConnect = {
  description: 'SecucardConnect for browser'
};
exports.SecucardConnect = SecucardConnect;
SecucardConnect.create = function (config) {
  return _client.Client.create(config, _clientBrowserEnvironment.ClientBrowserEnvironment);
};