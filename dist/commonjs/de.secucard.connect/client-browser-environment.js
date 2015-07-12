'use strict';

exports.__esModule = true;

var _netStomp = require('./net/stomp');

var _netStompBrowserStomp = require('./net/stomp-browser/stomp');

var ClientBrowserEnvironment = {};
exports.ClientBrowserEnvironment = ClientBrowserEnvironment;
ClientBrowserEnvironment.StompChannel = {
	create: function create() {
		return new _netStomp.Stomp(_netStompBrowserStomp.Stomp);
	}
};