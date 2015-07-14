'use strict';

exports.__esModule = true;

var _netStomp = require('./net/stomp');

var _netSocketSocketNode = require('./net/socket/socket-node');

var ClientNodeEnvironment = {
	config: {
		stompPort: 61614
	}
};
exports.ClientNodeEnvironment = ClientNodeEnvironment;
ClientNodeEnvironment.StompChannel = {
	create: function create() {
		return new _netStomp.Stomp(_netSocketSocketNode.SocketAtNode);
	}
};