"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ClientContext = void 0;
var _rest = require("./net/rest");
var _auth = require("./auth/auth");
var _credentials = require("./auth/credentials");
var _appService = require("./product/app/app-service");
var _channel = require("./net/channel");
var _eventemitter = _interopRequireDefault(require("eventemitter3"));
var _tokenStorage = require("./auth/token-storage");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var ClientContext = function () {
  function ClientContext(config, environment) {
    _classCallCheck(this, ClientContext);
    Object.assign(this, _eventemitter["default"].prototype);
    this.tokenStorageCreate = environment.TokenStorage.create;
    var auth = new _auth.Auth();
    auth.configureWithContext(this);
    this.auth = auth;
    var restChannel = new _rest.Rest();
    restChannel.configureWithContext(this);
    this.restChannel = restChannel;
    if (config.stompEnabled) {
      var stompChannel = environment.StompChannel.create();
      stompChannel.configureWithContext(this);
      this.stompChannel = stompChannel;
    }
    this.channels = {
      stomp: this.stompChannel,
      rest: this.restChannel
    };
    this.serviceEventTargets = Object.create(null);
    this.createServices(environment.services);
    this.config = config;
  }
  _createClass(ClientContext, [{
    key: "open",
    value: function open() {
      var _this = this;
      return this.getAuth().getToken().then(function () {
        if (!_this.config.stompEnabled) {
          return true;
        }
        var channelValues = Object.values(_this.channels);
        return Promise.all(channelValues.map(function (channel) {
          return channel.open();
        }));
      });
    }
  }, {
    key: "createServices",
    value: function createServices(classList) {
      var services = Object.create(null);
      var ServiceClass;
      var service;
      var uid;
      for (var i = 0; i < classList.length; i++) {
        ServiceClass = classList[i];
        service = new ServiceClass();
        service.configureWithContext(this);
        uid = service.getUid();
        services[uid] = service;
        this.registerServiceEventTargets(service, service.getEventTargets());
      }
      this.services = services;
    }
  }, {
    key: "getService",
    value: function getService(uid) {
      return this.services[uid.toLowerCase()];
    }
  }, {
    key: "addAppService",
    value: function addAppService(AppMixin) {
      var appService = _appService.AppService.createWithMixin(AppMixin);
      appService.configureWithContext(this);
      this.services[appService.getUid()] = appService;
      this.registerServiceEventTargets(appService, appService.getEventTargets());
      return appService;
    }
  }, {
    key: "removeAppService",
    value: function removeAppService(uid) {
      var appService = this.services[uid];
      if (appService && appService.isApp) {
        this.unregisterServiceEventTargets(appService.getEventTargets());
        delete this.services[uid];
      } else {
        throw new Error('Service not found: ' + uid);
      }
    }
  }, {
    key: "setCredentials",
    value: function setCredentials(credentials, TokenStorageMixin) {
      this.credentials = _credentials.Credentials.create(credentials);
      if (TokenStorageMixin) {
        this.tokenStorage = _tokenStorage.TokenStorageInMem.createWithMixin(TokenStorageMixin);
      } else {
        this.tokenStorage = this.tokenStorageCreate();
      }
      this.tokenStorage.getRetrieveToken = this.config.getRetrieveToken.bind(this.config);
      return this.tokenStorage.setCredentials(Object.assign({}, credentials));
    }
  }, {
    key: "setLanguage",
    value: function setLanguage(lang) {
      this.config.setLanguage(lang);
    }
  }, {
    key: "getCredentials",
    value: function getCredentials() {
      return this.credentials;
    }
  }, {
    key: "getTokenStorage",
    value: function getTokenStorage() {
      return this.tokenStorage;
    }
  }, {
    key: "getStoredToken",
    value: function getStoredToken() {
      return this.tokenStorage ? this.tokenStorage.getStoredToken() : Promise.resolve(null);
    }
  }, {
    key: "exportToken",
    value: function exportToken(isRaw) {
      return this.getAuth().getToken().then(function (token) {
        var access_token = token.access_token,
          expireTime = token.expireTime,
          scope = token.scope,
          expires_in = token.expires_in;
        return token ? !isRaw ? {
          access_token: access_token,
          expireTime: expireTime,
          scope: scope,
          expires_in: expires_in
        } : token : null;
      });
    }
  }, {
    key: "getConfig",
    value: function getConfig() {
      return this.config;
    }
  }, {
    key: "getAuth",
    value: function getAuth() {
      return this.auth;
    }
  }, {
    key: "getChannel",
    value: function getChannel(channelConfig) {
      var _this2 = this;
      var ch = null;
      var channelConfReverted = channelConfig.reverse();
      channelConfReverted.map(function (type) {
        if (_this2.getChannelByType(type)) {
          ch = _this2.getChannelByType(type);
        }
      });
      if (!ch) {
        throw new Error('Channel not found, please, check channel config for the service: ' + JSON.stringify(channelConfig));
      }
      return ch;
    }
  }, {
    key: "getChannelByType",
    value: function getChannelByType(type) {
      return this.channels[type];
    }
  }, {
    key: "getRestChannel",
    value: function getRestChannel() {
      return this.restChannel;
    }
  }, {
    key: "getStompChannel",
    value: function getStompChannel() {
      return this.stompChannel;
    }
  }, {
    key: "getServiceDefaultOptions",
    value: function getServiceDefaultOptions() {
      return {
        channelConfig: [_channel.Channel.STOMP, _channel.Channel.REST],
        useAuth: true
      };
    }
  }, {
    key: "isRequestWithToken",
    value: function isRequestWithToken(options) {
      return !options || options && (!options.hasOwnProperty('useAuth') || options.useAuth);
    }
  }, {
    key: "registerServiceEventTargets",
    value: function registerServiceEventTargets(service, targets) {
      var _this3 = this;
      targets.map(function (target) {
        if (_this3.serviceEventTargets[target.toLowerCase()]) {
          throw new Error('Provided event target is registered already: ' + target.toLowerCase());
        }
        _this3.serviceEventTargets[target.toLowerCase()] = service;
      });
    }
  }, {
    key: "unregisterServiceEventTargets",
    value: function unregisterServiceEventTargets(targets) {
      var _this4 = this;
      targets.map(function (target) {
        delete _this4.serviceEventTargets[target.toLowerCase()];
      });
    }
  }, {
    key: "emitServiceEvent",
    value: function emitServiceEvent(event, target, type, data) {
      if (event) {
        target = event.target || target;
        type = event.type || type;
        data = event.data || data;
      }
      target = target.toLowerCase();
      var service = this.serviceEventTargets[target];
      service.emit(type, data);
    }
  }]);
  return ClientContext;
}();
exports.ClientContext = ClientContext;