"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Client = void 0;
var _message = require("./net/message");
var _clientConfig = require("./client-config");
var _clientContext = require("./client-context");
var _clientVersion = require("./client-version");
var _minilog = _interopRequireDefault(require("minilog"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Client = function () {
  function Client(config, environment) {
    _classCallCheck(this, Client);
    this.config = config;
    this.context = new _clientContext.ClientContext(config, environment);
    this.getService = this.context.getService.bind(this.context);
    this.addAppService = this.context.addAppService.bind(this.context);
    this.removeAppService = this.context.removeAppService.bind(this.context);
    this.emitServiceEvent = this.context.emitServiceEvent.bind(this.context);
    this.on = this.context.on.bind(this.context);
    this.setCredentials = this.context.setCredentials.bind(this.context);
    this.getStoredToken = this.context.getStoredToken.bind(this.context);
    this.exportToken = this.context.exportToken.bind(this.context);
    this.connected = false;
    this.setLanguage = this.context.setLanguage.bind(this.context);
    (0, _minilog["default"])('secucard.client').debug(config);
  }
  _createClass(Client, [{
    key: "open",
    value: function open() {
      var _this = this;
      if (this.connected) {
        return Promise.resolve(this.connected);
      }
      return this.context.open().then(function () {
        _this.connected = true;
        return _this.connected;
      });
    }
  }, {
    key: "getVersion",
    value: function getVersion() {
      return _clientVersion.Version.name;
    }
  }]);
  return Client;
}();
exports.Client = Client;
Client.create = function (config, environment) {
  if (!config) {
    config = Object.create(null);
  }
  config = Object.assign(_clientConfig.ClientConfig.defaults(), environment.config, config);
  return new Client(config, environment);
};