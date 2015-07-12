'use strict';

exports.__esModule = true;

var _netStomp = require('./net/stomp');

var _netStompNodeStomp = require('./net/stomp-node/stomp');

var ClientNodeEnvironment = {};
exports.ClientNodeEnvironment = ClientNodeEnvironment;
ClientNodeEnvironment.StompChannel = {
	create: function create() {
		return new _netStomp.Stomp(_netStompNodeStomp.Stomp);
	}
};