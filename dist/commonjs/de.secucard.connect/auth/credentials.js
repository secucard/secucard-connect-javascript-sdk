"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Credentials = void 0;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var Credentials = function () {
  function Credentials() {
    _classCallCheck(this, Credentials);
    this.client_id = null;
    this.client_secret = null;
    this.uuid = null;
    this.code = null;
    this.username = null;
    this.password = null;
    this.device = null;
    this.deviveinfo = {
      name: null
    };
  }
  _createClass(Credentials, [{
    key: "isValid",
    value: function isValid() {
      return this.client_id && this.client_secret;
    }
  }]);
  return Credentials;
}();
exports.Credentials = Credentials;
Credentials.create = function (credentials) {
  var cr = new Credentials();
  return Object.assign(cr, credentials);
};