"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Token = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Token = function () {
  function Token() {
    _classCallCheck(this, Token);
    this.access_token = null;
    this.refresh_token = null;
    this.token_type = 'bearer';
    this.expires_in = 1200;
    this.scope = null;
  }
  _createClass(Token, [{
    key: "getRefreshToken",
    value: function getRefreshToken() {
      return this.refresh_token;
    }
  }, {
    key: "getAccessToken",
    value: function getAccessToken() {
      return this.access_token;
    }
  }, {
    key: "isExpired",
    value: function isExpired() {
      return !this.expireTime || new Date().getTime() > this.expireTime;
    }
  }, {
    key: "setExpireTime",
    value: function setExpireTime() {
      this.expireTime = parseInt(this.expires_in) * 1000 + new Date().getTime();
    }
  }, {
    key: "getExpireTime",
    value: function getExpireTime() {
      return this.expireTime;
    }
  }, {
    key: "update",
    value: function update(data) {
      return Object.assign(this, data);
    }
  }]);
  return Token;
}();
exports.Token = Token;
Token.create = function (data) {
  var token = new Token();
  token = Object.assign(token, data);
  return token;
};
Token.isValid = function (data) {
  return data && data.hasOwnProperty('access_token') && data.hasOwnProperty('expireTime');
};