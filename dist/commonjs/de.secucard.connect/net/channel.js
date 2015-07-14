"use strict";

var _classCallCheck = require("babel-runtime/helpers/class-call-check")["default"];

exports.__esModule = true;

var Channel = (function () {
	function Channel() {
		_classCallCheck(this, Channel);
	}

	Channel.prototype.send = function send() {};

	Channel.prototype.request = function request(method, params) {};

	return Channel;
})();

exports.Channel = Channel;

Channel.METHOD = {
	GET: "GET",
	CREATE: "CREATE",
	UPDATE: "UPDATE",
	DELETE: "DELETE",
	EXECUTE: "EXECUTE"
};