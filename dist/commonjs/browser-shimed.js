'use strict';

exports.__esModule = true;
exports.SecucardConnect = exports.MiniLog = exports.Channel = exports.Services = undefined;

var _clientBrowserEnvironment = require('./de.secucard.connect/client-browser-environment');

Object.defineProperty(exports, 'Services', {
  enumerable: true,
  get: function get() {
    return _clientBrowserEnvironment.ServiceMap;
  }
});

var _channel = require('./de.secucard.connect/net/channel');

Object.defineProperty(exports, 'Channel', {
  enumerable: true,
  get: function get() {
    return _channel.Channel;
  }
});

var _client = require('./de.secucard.connect/client');

var _minilog = require('minilog');

var _minilog2 = _interopRequireDefault(_minilog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MiniLog = exports.MiniLog = _minilog2.default;
_minilog2.default.suggest.deny(/secucard\..*/, 'warn');

var SecucardConnect = exports.SecucardConnect = {
  description: 'SecucardConnect for browser'
};

SecucardConnect.create = function (config) {
  return _client.Client.create(config, _clientBrowserEnvironment.ClientBrowserEnvironment);
};