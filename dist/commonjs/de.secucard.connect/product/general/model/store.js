"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Store = void 0;
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
var Store = _createClass(function Store(source, key, hash, name, name_raw, merchant, _news_status, _news, open_now, open_time, open_hours, geometry, _geometry, _checkin_status, address_formatted, address_components, category, category_main, phone_number_formatted, url_website, _balance, _points, _program, _isDefault, facebook_id, photo, photo_main, has_beacon) {
  _classCallCheck(this, Store);
  this.source = source;
  this.key = key;
  this.hash = hash;
  this.name = name;
  this.name_raw = name_raw;
  this.merchant = merchant;
  this._news_status = _news_status;
  this._news = _news;
  this.open_now = open_now;
  this.open_time = open_time;
  this.open_hours = open_hours;
  this.geometry = geometry;
  this._geometry = _geometry;
  this._checkin_status = _checkin_status;
  this.address_formatted = address_formatted;
  this.address_components = address_components;
  this.category = category;
  this.category_main = category_main;
  this.phone_number_formatted = phone_number_formatted;
  this.url_website = url_website;
  this._balance = _balance;
  this._points = _points;
  this._program = _program;
  this._isDefault = _isDefault;
  this.facebook_id = facebook_id;
  this.photo = photo;
  this.photo_main = photo_main;
  this.has_beacon = has_beacon;
});
exports.Store = Store;