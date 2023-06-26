"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Auth = void 0;
var _message = require("../net/message");
var _token2 = require("./token");
var _exception = require("./exception");
var _minilog = _interopRequireDefault(require("minilog"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Auth = function () {
  function Auth() {
    _classCallCheck(this, Auth);
    _defineProperty(this, "baseCredentialNames", ['client_id', 'client_secret']);
    _defineProperty(this, "baseHeaders", {
      'Content-Type': 'application/x-www-form-urlencoded'
    });
  }
  _createClass(Auth, [{
    key: "configureWithContext",
    value: function configureWithContext(context) {
      this.emit = context.emit.bind(context);
      this.getChannel = context.getRestChannel.bind(context);
      this.getCredentials = context.getCredentials.bind(context);
      this.getTokenStorage = context.getTokenStorage.bind(context);
      this.oAuthUrl = function () {
        return context.getConfig().getOAuthUrl();
      };
      this.getDeviceUUID = function () {
        return context.getConfig().getDeviceUUID();
      };
    }
  }, {
    key: "pick",
    value: function pick(object, keys) {
      return keys.reduce(function (obj, key) {
        if (object[key]) {
          obj[key] = object[key];
        }
        return obj;
      }, {});
    }
  }, {
    key: "getToken",
    value: function getToken(extend) {
      var _this = this;
      return this.getStoredToken().then(function (token) {
        if (token != null && !token.isExpired()) {
          if (extend) {
            token.setExpireTime();
            _this.storeToken(token);
          }
          return Promise.resolve(token);
        }
        var cr = _this.getCredentials();
        var ch = _this.getChannel();
        if (!cr.isValid()) {
          if (token != null && token.isExpired()) {
            return _this.retrieveNewToken()["catch"](function () {
              (0, _minilog["default"])('secucard.auth').error('Token is expired');
              throw new _exception.AuthenticationFailedException('Token is expired');
            });
          } else {
            return _this.retrieveNewToken()["catch"](function () {
              (0, _minilog["default"])('secucard.auth').error('Credentials error');
              throw new _exception.AuthenticationFailedException('Credentials error');
            });
          }
        }
        var tokenSuccess = function tokenSuccess(res) {
          var _token = token ? token.update(res.body) : _token2.Token.create(res.body);
          _token.setExpireTime();
          _this.storeToken(_token);
          return _token;
        };
        var tokenError = function tokenError(err) {
          _this.removeToken();
          var error;
          if (err instanceof _exception.AuthenticationTimeoutException) {
            error = err;
          } else {
            error = Object.assign(new _exception.AuthenticationFailedException(), err.response.body);
          }
          throw error;
        };
        var req;
        if (token != null && token.getRefreshToken() != null) {
          req = _this._tokenRefreshRequest(cr, token.getRefreshToken(), ch);
        } else {
          req = _this.isDeviceAuth() ? _this.getDeviceToken(Object.assign({}, cr, {
            uuid: _this.getDeviceUUID()
          }), ch) : _this._tokenClientCredentialsRequest(cr, ch);
        }
        return req.then(tokenSuccess)["catch"](tokenError);
      });
    }
  }, {
    key: "isDeviceAuth",
    value: function isDeviceAuth() {
      return Boolean(this.getDeviceUUID());
    }
  }, {
    key: "getDeviceToken",
    value: function getDeviceToken(credentials, channel) {
      var _this2 = this;
      return this._tokenDeviceCodeRequest(credentials, channel).then(function (res) {
        var data = res.body;
        _this2.emit('deviceCode', data);
        var pollIntervalSec = data.interval > 0 ? data.interval : 5;
        var pollExpireTime = parseInt(data.expires_in) * 1000 + new Date().getTime();
        var codeCredentials = Object.assign({}, credentials, {
          code: data.device_code
        });
        return new Promise(function (resolve, reject) {
          _this2.pollTimer = setInterval(function () {
            if (new Date().getTime() < pollExpireTime) {
              _this2._tokenDeviceRequest(codeCredentials, channel).then(function (res) {
                clearInterval(_this2.pollTimer);
                resolve(res);
              })["catch"](function (err) {
                if (err.status == 401) {} else {
                  clearInterval(_this2.pollTimer);
                  reject(err);
                }
              });
            } else {
              clearInterval(_this2.pollTimer);
              reject(new _exception.AuthenticationTimeoutException());
            }
          }, pollIntervalSec * 1000);
        });
      });
    }
  }, {
    key: "removeToken",
    value: function removeToken() {
      var storage = this.getTokenStorage();
      if (!storage) {
        var err = new _exception.AuthenticationFailedException('Credentials error');
        return Promise.reject(err);
      }
      storage.removeToken();
    }
  }, {
    key: "storeToken",
    value: function storeToken(token) {
      var storage = this.getTokenStorage();
      if (!storage) {
        var err = new _exception.AuthenticationFailedException('Credentials error');
        return Promise.reject(err);
      }
      storage.storeToken(token);
    }
  }, {
    key: "getStoredToken",
    value: function getStoredToken() {
      var storage = this.getTokenStorage();
      if (!storage) {
        var err = new _exception.AuthenticationFailedException('Credentials error');
        return Promise.reject(err);
      }
      return storage.getStoredToken().then(function (token) {
        if (token && !(token instanceof _token2.Token)) {
          return _token2.Token.create(token);
        }
        return token;
      });
    }
  }, {
    key: "retrieveNewToken",
    value: function retrieveNewToken() {
      var storage = this.getTokenStorage();
      if (!storage) {
        var err = new _exception.AuthenticationFailedException('Credentials error');
        return Promise.reject(err);
      }
      return storage.retrieveNewToken();
    }
  }, {
    key: "_tokenRequest",
    value: function _tokenRequest(credentials, channel) {
      var m = channel.createMessage().setBaseUrl(this.oAuthUrl()).setUrl('token').setHeaders(this.baseHeaders).setMethod(_message.POST).setBody(credentials);
      (0, _minilog["default"])('secucard.auth').debug('token request', m);
      return channel.send(m);
    }
  }, {
    key: "_tokenClientCredentialsRequest",
    value: function _tokenClientCredentialsRequest(credentials, channel) {
      var tmpcr = this.pick(credentials, this.baseCredentialNames);
      var cr = Object.assign({}, tmpcr, {
        grant_type: 'client_credentials'
      });
      return this._tokenRequest(cr, channel);
    }
  }, {
    key: "_tokenRefreshRequest",
    value: function _tokenRefreshRequest(credentials, refresh_token, channel) {
      var tmpcr = this.pick(credentials, this.baseCredentialNames);
      var cr = Object.assign({}, tmpcr, {
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      });
      return this._tokenRequest(cr, channel);
    }
  }, {
    key: "_tokenDeviceCodeRequest",
    value: function _tokenDeviceCodeRequest(credentials, channel) {
      var tmpcr = this.pick(credentials, this.baseCredentialNames.concat(['uuid']));
      var cr = Object.assign({}, tmpcr, {
        grant_type: 'device'
      });
      return this._tokenRequest(cr, channel);
    }
  }, {
    key: "_tokenDeviceRequest",
    value: function _tokenDeviceRequest(credentials, channel) {
      var tmpcr = this.pick(credentials, this.baseCredentialNames.concat(['code']));
      var cr = Object.assign({}, tmpcr, {
        grant_type: 'device'
      });
      return this._tokenRequest(cr, channel);
    }
  }, {
    key: "_tokenAppUserRequest",
    value: function _tokenAppUserRequest(credentials, channel) {
      var tmpcr = this.pick(credentials, this.baseCredentialNames.concat(['username', 'password', 'device', 'deviceinfo']));
      var cr = Object.assign({}, tmpcr, {
        grant_type: 'appuser'
      });
      return this._tokenRequest(cr, channel);
    }
  }]);
  return Auth;
}();
exports.Auth = Auth;