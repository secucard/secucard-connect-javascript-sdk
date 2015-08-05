'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _es6Shim = require('es6-shim');

var _es6Shim2 = _interopRequireDefault(_es6Shim);

var _deSecucardConnectClientBrowserEnvironment = require('./de.secucard.connect/client-browser-environment');

var _deSecucardConnectClient = require('./de.secucard.connect/client');

var _minilog = require('minilog');

var _minilog2 = _interopRequireDefault(_minilog);

exports.Services = _deSecucardConnectClientBrowserEnvironment.ServiceMap;

var _deSecucardConnectNetChannel = require('./de.secucard.connect/net/channel');

exports.Channel = _deSecucardConnectNetChannel.Channel;
var MiniLog = _minilog2['default'];
exports.MiniLog = MiniLog;
_minilog2['default'].suggest.deny(/secucard\..*/, 'warn');

var SecucardConnect = {
  description: 'SecucardConnect for browser'
};

exports.SecucardConnect = SecucardConnect;
SecucardConnect.create = function (config) {

  return _deSecucardConnectClient.Client.create(_deSecucardConnectClientBrowserEnvironment.ClientBrowserEnvironment, config);
};