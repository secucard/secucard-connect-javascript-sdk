'use strict';

exports.__esModule = true;

var _netStomp = require('./net/stomp');

var _netSocketSocketBrowser = require('./net/socket/socket-browser');

var ClientBrowserEnvironment = {
	config: {
		stompPort: 15671,
		stompEndpoint: '/stomp/websocket'
	}
};
exports.ClientBrowserEnvironment = ClientBrowserEnvironment;
ClientBrowserEnvironment.StompChannel = {
	create: function create() {
		return new _netStomp.Stomp(_netSocketSocketBrowser.SocketAtBrowser);
	}
};