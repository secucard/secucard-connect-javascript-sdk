'use strict';

exports.__esModule = true;
exports.MiniLog = exports.SecucardConnect = exports.Channel = exports.Services = undefined;

var _clientNodeEnvironment = require('./de.secucard.connect/client-node-environment');

Object.defineProperty(exports, 'Services', {
  enumerable: true,
  get: function get() {
    return _clientNodeEnvironment.ServiceMap;
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

var SecucardConnect = exports.SecucardConnect = {
  description: 'SecucardConnect for nodejs'
};

var MiniLog = exports.MiniLog = _minilog2.default;
_minilog2.default.suggest.deny(/secucard\..*/, 'warn');

SecucardConnect.create = function (config) {
  return _client.Client.create(config, _clientNodeEnvironment.ClientNodeEnvironment);
};