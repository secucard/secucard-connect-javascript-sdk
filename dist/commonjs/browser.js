'use strict';

exports.__esModule = true;

var _deSecucardConnectClientBrowserEnvironment = require('./de.secucard.connect/client-browser-environment');

var _deSecucardConnectClient = require('./de.secucard.connect/client');

var SecucardConnect = {};
exports.SecucardConnect = SecucardConnect;
SecucardConnect.create = function (config) {

	return _deSecucardConnectClient.Client.create(_deSecucardConnectClientBrowserEnvironment.ClientBrowserEnvironment, config);
};