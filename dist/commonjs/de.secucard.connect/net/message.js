'use strict';

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

exports.__esModule = true;
var HEAD = 'HEAD';
exports.HEAD = HEAD;
var GET = 'GET';
exports.GET = GET;
var POST = 'POST';
exports.POST = POST;
var PUT = 'PUT';
exports.PUT = PUT;
var DELETE = 'DELETE';

exports.DELETE = DELETE;

var Message = (function () {
	function Message() {
		_classCallCheck(this, Message);
	}

	Message.prototype.setBaseUrl = function setBaseUrl(value) {
		this.baseUrl = value;
		return this;
	};

	Message.prototype.setUrl = function setUrl(value) {
		this.url = value;
		return this;
	};

	Message.prototype.setMethod = function setMethod(value) {
		this.method = value;
		return this;
	};

	Message.prototype.setHeaders = function setHeaders(value) {
		this.headers = value;
		return this;
	};

	Message.prototype.setQuery = function setQuery(value) {
		this.query = value;
		return this;
	};

	Message.prototype.setBody = function setBody(value) {
		this.body = value;
		return this;
	};

	Message.prototype.setAccept = function setAccept(value) {
		this.accept = value;
		return this;
	};

	return Message;
})();

exports.Message = Message;