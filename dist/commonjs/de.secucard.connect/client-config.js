"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClientConfig = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var ClientConfig = function () {
  function ClientConfig() {
    _classCallCheck(this, ClientConfig);
  }
  _createClass(ClientConfig, [{
    key: "getOAuthUrl",
    value: function getOAuthUrl() {
      return this._getCompleteUrl(this.oAuthUrl);
    }
  }, {
    key: "getRestUrl",
    value: function getRestUrl() {
      return this._getCompleteUrl(this.restUrl);
    }
  }, {
    key: "getStompHost",
    value: function getStompHost() {
      var value = this.stompHost;
      if (value.endsWith('/')) {
        value = value.slice(0, value.length - 1);
      }
      return value;
    }
  }, {
    key: "getStompPort",
    value: function getStompPort() {
      return this.stompPort;
    }
  }, {
    key: "getStompSslEnabled",
    value: function getStompSslEnabled() {
      return this.stompSslEnabled;
    }
  }, {
    key: "getStompVHost",
    value: function getStompVHost() {
      return this.stompVHost;
    }
  }, {
    key: "getStompQueue",
    value: function getStompQueue() {
      return this.stompQueue;
    }
  }, {
    key: "getStompDestination",
    value: function getStompDestination() {
      return this._getCompleteUrl(this.stompDestination);
    }
  }, {
    key: "getStompEndpoint",
    value: function getStompEndpoint() {
      return this.stompEndpoint;
    }
  }, {
    key: "getStompHeartbeatMs",
    value: function getStompHeartbeatMs() {
      return this.stompHeartbeatSec * 1000;
    }
  }, {
    key: "isDevice",
    value: function isDevice() {
      return Boolean(this.deviceUUID);
    }
  }, {
    key: "getDeviceUUID",
    value: function getDeviceUUID() {
      return this.deviceUUID;
    }
  }, {
    key: "getRetrieveToken",
    value: function getRetrieveToken() {
      return this.retrieveToken;
    }
  }, {
    key: "getWithCredentials",
    value: function getWithCredentials() {
      return this.withCredentials;
    }
  }, {
    key: "_getCompleteUrl",
    value: function _getCompleteUrl(value) {
      var url = value;
      if (!url.endsWith('/')) {
        url += '/';
      }
      return url;
    }
  }, {
    key: "getLanguage",
    value: function getLanguage() {
      return this.language;
    }
  }, {
    key: "setLanguage",
    value: function setLanguage(lang) {
      this.language = lang;
    }
  }]);
  return ClientConfig;
}();
exports.ClientConfig = ClientConfig;
ClientConfig._defaults = {
  channelDefault: '',
  cacheDir: '',
  deviceUUID: null,
  oAuthUrl: 'https://connect.secucard.com/oauth/',
  authDeviceTimeout: 0,
  restUrl: 'https://connect.secucard.com/api/v2/',
  restTimeout: 0,
  stompEnabled: true,
  stompHeartbeatSec: 30,
  stompHost: 'connect.secucard.com',
  stompPort: 61614,
  stompVHost: null,
  stompEndpoint: '',
  stompDestination: '/exchange/connect.api',
  stompSslEnabled: true,
  stompQueue: '/temp-queue/main',
  stompConnectTimeoutSec: 0,
  stompMessageTimeoutSec: 0,
  stompMessageAge: 0,
  retrieveToken: null,
  withCredentials: false,
  language: 'de'
};
ClientConfig.defaults = function () {
  var config = new ClientConfig();
  Object.assign(config, ClientConfig._defaults);
  return config;
};