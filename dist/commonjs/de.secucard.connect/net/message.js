"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PUT = exports.POST = exports.PATCH = exports.Message = exports.HEAD = exports.GET = exports.DELETE = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var HEAD = 'HEAD';
exports.HEAD = HEAD;
var GET = 'GET';
exports.GET = GET;
var POST = 'POST';
exports.POST = POST;
var PUT = 'PUT';
exports.PUT = PUT;
var PATCH = 'PATCH';
exports.PATCH = PATCH;
var DELETE = 'DELETE';
exports.DELETE = DELETE;
var Message = function () {
  function Message() {
    _classCallCheck(this, Message);
  }
  _createClass(Message, [{
    key: "setBaseUrl",
    value: function setBaseUrl(value) {
      this.baseUrl = value;
      return this;
    }
  }, {
    key: "setUrl",
    value: function setUrl(value) {
      this.url = value;
      return this;
    }
  }, {
    key: "setMethod",
    value: function setMethod(value) {
      this.method = value;
      return this;
    }
  }, {
    key: "setHeaders",
    value: function setHeaders(value) {
      this.headers = value;
      return this;
    }
  }, {
    key: "setQuery",
    value: function setQuery(value) {
      this.query = value;
      return this;
    }
  }, {
    key: "setBody",
    value: function setBody(value) {
      this.body = value;
      return this;
    }
  }, {
    key: "setAccept",
    value: function setAccept(value) {
      this.accept = value;
      return this;
    }
  }, {
    key: "setMultipart",
    value: function setMultipart(value) {
      this.multipart = value;
    }
  }]);
  return Message;
}();
exports.Message = Message;