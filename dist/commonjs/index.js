'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _es6Shim = require('es6-shim');

var _es6Shim2 = _interopRequireDefault(_es6Shim);

var _deSecucardConnectClientNodeEnvironment = require('./de.secucard.connect/client-node-environment');

var _deSecucardConnectClient = require('./de.secucard.connect/client');

var SecucardConnect = {};
exports.SecucardConnect = SecucardConnect;
SecucardConnect.create = function (config) {

	return _deSecucardConnectClient.Client.create(_deSecucardConnectClientNodeEnvironment.ClientNodeEnvironment, config);
};