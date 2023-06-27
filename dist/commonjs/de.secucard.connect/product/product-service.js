"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProductService = void 0;
var _channel = require("../net/channel");
var _eventemitter = _interopRequireDefault(require("eventemitter3"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var ProductService = function () {
  function ProductService() {
    _classCallCheck(this, ProductService);
    _defineProperty(this, "_meta", void 0);
    Object.assign(this, _eventemitter["default"].prototype);
  }
  _createClass(ProductService, [{
    key: "configureWithContext",
    value: function configureWithContext(context) {
      this.getChannel = context.getChannel.bind(context);
      this.getServiceDefaultOptions = context.getServiceDefaultOptions.bind(context);
    }
  }, {
    key: "getEndpoint",
    value: function getEndpoint() {}
  }, {
    key: "getEventTargets",
    value: function getEventTargets() {}
  }, {
    key: "getUid",
    value: function getUid() {
      return this.getEndpoint().join('.').toLowerCase();
    }
  }, {
    key: "_parseMeta",
    value: function _parseMeta(data) {
      if (!data) {
        return data;
      }
      data.describe = function (property) {
        var _this = this;
        var res = property.split('.').reduce(function (collector, item) {
          return collector.properties[item];
        }, _this);
        if (res.type == 'object') {
          res.describe = this.describe;
        }
        return res;
      };
      return data;
    }
  }, {
    key: "getMeta",
    value: function getMeta(options) {
      var _this2 = this;
      return this._meta && !options ? Promise.resolve(this._meta) : this.retrieveMeta(options).then(function (res) {
        _this2._meta = _this2._parseMeta(res.meta);
        return _this2._meta;
      });
    }
  }, {
    key: "retrieveMeta",
    value: function retrieveMeta(options) {
      var params = {
        endpoint: this.getEndpoint(),
        queryParams: {
          meta: 'only'
        },
        options: options
      };
      return this._request(_channel.Channel.METHOD.GET, params, options);
    }
  }, {
    key: "retrieve",
    value: function retrieve(id, queryParams, options) {
      var params = {
        endpoint: this.getEndpoint(),
        objectId: id,
        queryParams: queryParams,
        options: options
      };
      return this._request(_channel.Channel.METHOD.GET, params, options);
    }
  }, {
    key: "generateRetrieveUrl",
    value: function generateRetrieveUrl(id, queryParams, options) {
      var params = {
        endpoint: this.getEndpoint(),
        objectId: id,
        queryParams: queryParams,
        options: options
      };
      return this._generateUrl(_channel.Channel.METHOD.GET, params, options);
    }
  }, {
    key: "retrieveWithAction",
    value: function retrieveWithAction(id, action, actionArg, options) {
      var params = {
        endpoint: this.getEndpoint(),
        objectId: id,
        action: action,
        actionArg: actionArg,
        options: options
      };
      return this._request(_channel.Channel.METHOD.GET, params, options);
    }
  }, {
    key: "generateRetrieveWithActionUrl",
    value: function generateRetrieveWithActionUrl(id, action, actionArg, options) {
      var params = {
        endpoint: this.getEndpoint(),
        objectId: id,
        action: action,
        actionArg: actionArg,
        options: options
      };
      return this._generateUrl(_channel.Channel.METHOD.GET, params, options);
    }
  }, {
    key: "retrieveList",
    value: function retrieveList(queryParams, options) {
      var params = {
        endpoint: this.getEndpoint(),
        queryParams: queryParams,
        options: options
      };
      return this._request(_channel.Channel.METHOD.GET, params, options);
    }
  }, {
    key: "generateRetrieveListUrl",
    value: function generateRetrieveListUrl(queryParams, options) {
      var params = {
        endpoint: this.getEndpoint(),
        queryParams: queryParams,
        options: options
      };
      return this._generateUrl(_channel.Channel.METHOD.GET, params, options);
    }
  }, {
    key: "create",
    value: function create(data, options, multipart) {
      var params = {
        endpoint: this.getEndpoint(),
        data: data,
        options: options,
        multipart: multipart
      };
      return this._request(_channel.Channel.METHOD.CREATE, params, options);
    }
  }, {
    key: "update",
    value: function update(data, options, multipart) {
      var params = {
        endpoint: this.getEndpoint(),
        objectId: data.id,
        data: data,
        options: options,
        multipart: multipart
      };
      return this._request(_channel.Channel.METHOD.UPDATE, params, options);
    }
  }, {
    key: "updateWithAction",
    value: function updateWithAction(id, action, actionArg, data, options, multipart) {
      var params = {
        endpoint: this.getEndpoint(),
        objectId: id,
        data: data,
        action: action,
        actionArg: actionArg,
        options: options,
        multipart: multipart
      };
      return this._request(_channel.Channel.METHOD.UPDATE, params, options);
    }
  }, {
    key: "patch",
    value: function patch(data, options, multipart) {
      var params = {
        endpoint: this.getEndpoint(),
        objectId: data.id,
        data: data,
        options: options,
        multipart: multipart
      };
      return this._request(_channel.Channel.METHOD.PATCH, params, options);
    }
  }, {
    key: "patchWithAction",
    value: function patchWithAction(id, action, actionArg, data, options, multipart) {
      var params = {
        endpoint: this.getEndpoint(),
        objectId: id,
        data: data,
        action: action,
        actionArg: actionArg,
        options: options,
        multipart: multipart
      };
      return this._request(_channel.Channel.METHOD.PATCH, params, options);
    }
  }, {
    key: "remove",
    value: function remove(id, options) {
      var params = {
        endpoint: this.getEndpoint(),
        objectId: id,
        options: options
      };
      return this._request(_channel.Channel.METHOD.DELETE, params, options);
    }
  }, {
    key: "removeWithAction",
    value: function removeWithAction(id, action, actionArg, options) {
      var params = {
        endpoint: this.getEndpoint(),
        objectId: id,
        action: action,
        actionArg: actionArg,
        options: options
      };
      return this._request(_channel.Channel.METHOD.DELETE, params, options);
    }
  }, {
    key: "execute",
    value: function execute(id, action, actionArg, data, options) {
      var params = {
        endpoint: this.getEndpoint(),
        objectId: id,
        action: action,
        actionArg: actionArg,
        data: data,
        options: options
      };
      return this._request(_channel.Channel.METHOD.EXECUTE, params, options);
    }
  }, {
    key: "executeAppAction",
    value: function executeAppAction(appId, action, data, options) {
      var params = {
        appId: appId,
        action: action,
        data: data,
        options: options
      };
      return this._request(_channel.Channel.METHOD.EXECUTE, params, options);
    }
  }, {
    key: "_request",
    value: function _request(method, params, options) {
      if (options == null) {
        options = this.getServiceDefaultOptions();
      }
      if (params.options == null) {
        params.options = options;
      }
      return this.getChannel(options.channelConfig).request(method, params);
    }
  }, {
    key: "_generateUrl",
    value: function _generateUrl(method, params, options) {
      if (options == null) {
        options = this.getServiceDefaultOptions();
      }
      if (params.options == null) {
        params.options = options;
      }
      return this.getChannel([_channel.Channel.REST]).generateUrl(method, params);
    }
  }]);
  return ProductService;
}();
exports.ProductService = ProductService;