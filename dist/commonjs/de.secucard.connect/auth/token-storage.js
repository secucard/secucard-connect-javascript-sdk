"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TokenStorageInMem = void 0;
var _token = require("./token");
var _mixins = _interopRequireDefault(require("../util/mixins"));
var _superagent = _interopRequireDefault(require("superagent"));
var _minilog = _interopRequireDefault(require("minilog"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var TokenStorageInMem = function () {
  function TokenStorageInMem() {
    _classCallCheck(this, TokenStorageInMem);
  }
  _createClass(TokenStorageInMem, [{
    key: "setCredentials",
    value: function setCredentials(credentials) {
      this.credentials = credentials;
      var token = null;
      if (credentials.token) {
        token = _token.Token.create(credentials.token);
        delete credentials.token;
      }
      return this.storeToken(token).then();
    }
  }, {
    key: "removeToken",
    value: function removeToken() {
      this.token = null;
      return Promise.resolve(this.token);
    }
  }, {
    key: "storeToken",
    value: function storeToken(token) {
      this.token = token ? token : null;
      return Promise.resolve(this.token);
    }
  }, {
    key: "getStoredToken",
    value: function getStoredToken() {
      return Promise.resolve(this.token);
    }
  }, {
    key: "retrieveNewToken",
    value: function retrieveNewToken() {
      var _this = this;
      var retrieveToken = this.getRetrieveToken();
      if (typeof retrieveToken === 'string') {
        if (this.retrievingToken) {
          return this.retrievingToken;
        }
        this.retrievingToken = new Promise(function (resolve, reject) {
          var url = retrieveToken;
          var request = _superagent["default"].get(url);
          request.end(function (err, res) {
            if (err) {
              reject(err, res);
            } else {
              resolve(res);
            }
          });
        }).then(function (response) {
          delete _this.retrievingToken;
          (0, _minilog["default"])('secucard.TokenStorageInMem').debug(response.text);
          if (!_token.Token.isValid(response.body)) {
            var err = "Retrieved token from ".concat(retrieveToken, " is not valid: ").concat(response.text);
            (0, _minilog["default"])('secucard.TokenStorageInMem').error("".concat(err, ". Please check if 'Content-type' header set to 'application/json'"));
            throw new Error(err);
          }
          return _this.storeToken(response.body);
        })["catch"](function (err) {
          delete _this.retrievingToken;
          throw err;
        });
        return this.retrievingToken;
      } else if (typeof retrieveToken === 'function') {
        if (this.retrievingToken) {
          return this.retrievingToken;
        }
        this.retrievingToken = retrieveToken().then(function (token) {
          delete _this.retrievingToken;
          if (!_token.Token.isValid(token)) {
            var err = "Retrieved token from ".concat(JSON.stringify(token), " is not valid");
            (0, _minilog["default"])('secucard.TokenStorageInMem').error("".concat(err));
            throw new Error(err);
          }
          return _this.storeToken(token);
        })["catch"](function (err) {
          console.log(err);
          delete _this.retrievingToken;
          throw err;
        });
        return this.retrievingToken;
      } else {
        return Promise.reject(new Error('retrieveToken is not defined'));
      }
    }
  }]);
  return TokenStorageInMem;
}();
exports.TokenStorageInMem = TokenStorageInMem;
TokenStorageInMem.createWithMixin = function (TokenStorageMixin) {
  var Mixed = (0, _mixins["default"])(TokenStorageInMem, TokenStorageMixin);
  return new Mixed();
};