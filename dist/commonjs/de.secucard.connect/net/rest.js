"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Rest = void 0;
var _superagent = _interopRequireDefault(require("superagent"));
var _message = require("./message");
var _channel = require("./channel");
var _exception = require("../auth/exception");
var _exception2 = require("./exception");
var _minilog = _interopRequireDefault(require("minilog"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Rest = function () {
  function Rest() {
    _classCallCheck(this, Rest);
    this.methodFuns = {};
    this.methodFuns[_message.GET] = _superagent["default"].get;
    this.methodFuns[_message.POST] = _superagent["default"].post;
    this.methodFuns[_message.PUT] = _superagent["default"].put;
    this.methodFuns[_message.PATCH] = _superagent["default"].patch;
    this.methodFuns[_message.HEAD] = _superagent["default"].head;
    this.methodFuns[_message.DELETE] = _superagent["default"].del;
    this.methodFuns[_channel.Channel.METHOD.GET] = _superagent["default"].get;
    this.methodFuns[_channel.Channel.METHOD.CREATE] = _superagent["default"].post;
    this.methodFuns[_channel.Channel.METHOD.EXECUTE] = _superagent["default"].post;
    this.methodFuns[_channel.Channel.METHOD.UPDATE] = _superagent["default"].put;
    this.methodFuns[_channel.Channel.METHOD.PATCH] = _superagent["default"].patch;
    this.methodFuns[_channel.Channel.METHOD.DELETE] = _superagent["default"].del;
  }
  _createClass(Rest, [{
    key: "configureWithContext",
    value: function configureWithContext(context) {
      this.restUrl = function () {
        return context.getConfig().getRestUrl();
      };
      this.getToken = function (extend) {
        return context.getAuth().getToken(extend);
      };
      this.withCredentials = function () {
        return context.getConfig().getWithCredentials();
      };
      this.isRequestWithToken = context.isRequestWithToken.bind(context);
      this.getLanguage = function () {
        return context.getConfig().getLanguage();
      };
    }
  }, {
    key: "open",
    value: function open() {
      return Promise.resolve(true);
    }
  }, {
    key: "createMessage",
    value: function createMessage() {
      var message = new _message.Message();
      return message.setBaseUrl(this.restUrl());
    }
  }, {
    key: "r",
    value: function r(url, method) {
      return this.methodFuns[method](url);
    }
  }, {
    key: "send",
    value: function send(message) {
      var _this = this;
      return new Promise(function (resolve, reject) {
        _this.createRequestFromMessage(message).end(function (err, res) {
          if (err) {
            reject(err, res);
          } else {
            resolve(res);
          }
        });
      });
    }
  }, {
    key: "createRequestFromMessage",
    value: function createRequestFromMessage(message) {
      var url = message.baseUrl ? message.baseUrl + message.url : message.url;
      var request = this.r(url, message.method);
      if (this.withCredentials()) {
        request.withCredentials();
      }
      if (message.headers) {
        request.set(message.headers);
      }
      if (message.query) {
        request.query(message.query);
      }
      if (message.body) {
        request.send(message.body);
      }
      if (message.accept) {
        request.accept(message.accept);
      }
      if (message.multipart && message.multipart.files) {
        message.multipart.files.forEach(function (item) {
          request.attach(item.field, item.path, item.filename);
        });
      }
      if (message.multipart && message.multipart.fields) {
        message.multipart.fields.forEach(function (item) {
          request.field(item.name, item.value);
        });
      }
      return request;
    }
  }, {
    key: "getAuthHeader",
    value: function getAuthHeader(token) {
      return {
        'Authorization': 'Bearer ' + token.access_token
      };
    }
  }, {
    key: "getLanguageHeader",
    value: function getLanguageHeader() {
      return {
        'Accept-Language': this.getLanguage()
      };
    }
  }, {
    key: "sendWithToken",
    value: function sendWithToken(message) {
      var _this2 = this;
      return this.getToken(true).then(function (token) {
        var headers = Object.assign({}, message.headers, _this2.getAuthHeader(token), _this2.getLanguageHeader());
        message.setHeaders(headers);
        return _this2.send(message);
      });
    }
  }, {
    key: "request",
    value: function request(method, params) {
      var requestSuccess = function requestSuccess(res) {
        (0, _minilog["default"])('secucard.rest').debug('requestSuccess', res.req.path);
        return res.body;
      };
      var requestError = function requestError(err) {
        var error = err;
        var request = JSON.stringify({
          method: method,
          params: params
        });
        if (err.response) {
          error = _exception2.SecucardConnectException.create(err.response.body);
        }
        error.request = request;
        throw error;
      };
      var message = this.createMessageForRequest(method, params);
      var pr = !this.isRequestWithToken || this.isRequestWithToken(params.options) ? this.sendWithToken(message) : this.send(message);
      return pr.then(requestSuccess)["catch"](requestError);
    }
  }, {
    key: "generateUrl",
    value: function generateUrl(method, params) {
      var message = this.createMessageForRequest(method, params);
      var req = this.createRequestFromMessage(message);
      var query = req._query ? req._query.join('&') : '';
      var url = req.url;
      if (query) {
        url += (url.indexOf('?') >= 0 ? '&' : '?') + query;
      }
      return url;
    }
  }, {
    key: "createMessageForRequest",
    value: function createMessageForRequest(method, params) {
      var message = this.createMessage();
      var headers = Object.assign({}, {
        'Content-Type': 'application/json'
      }, this.getLanguageHeader());
      if (params.headers) {
        Object.assign(headers, params.headers);
      }
      if (!params.multipart) {
        message.setHeaders(headers);
      }
      message.setMethod(method);
      var endPointSpec = [];
      if (params.appId) {
        endPointSpec = ['General', 'Apps', params.appId, 'callBackend'];
      } else if (params.endpoint) {
        endPointSpec = params.endpoint;
      } else {
        throw new Error('Missing endpoint spec or app id.');
      }
      if (params.objectId != null) {
        endPointSpec.push(params.objectId);
      }
      if (params.action) {
        endPointSpec.push(params.action);
      }
      if (params.actionArg) {
        endPointSpec.push(params.actionArg);
      }
      message.setUrl(this.buildEndpoint(endPointSpec));
      if (params.queryParams) {
        message.setQuery(params.queryParams);
      }
      if (params.data) {
        message.setBody(params.data);
      }
      if (params.multipart) {
        message.setMultipart(params.multipart);
      }
      (0, _minilog["default"])('secucard.rest').debug('message', message);
      return message;
    }
  }, {
    key: "buildEndpoint",
    value: function buildEndpoint(endpoint) {
      if (!endpoint || endpoint.length < 2) {
        throw new Error('Invalid endpoint specification.');
      }
      return endpoint.join('/');
    }
  }]);
  return Rest;
}();
exports.Rest = Rest;