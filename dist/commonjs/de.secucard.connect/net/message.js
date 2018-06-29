'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HEAD = exports.HEAD = 'HEAD';
var GET = exports.GET = 'GET';
var POST = exports.POST = 'POST';
var PUT = exports.PUT = 'PUT';
var DELETE = exports.DELETE = 'DELETE';

var Message = exports.Message = function () {
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

    Message.prototype.setMultipart = function setMultipart(value) {
        this.multipart = value;
    };

    return Message;
}();