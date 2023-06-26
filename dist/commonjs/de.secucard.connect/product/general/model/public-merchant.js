"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PublicMerchant = void 0;
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
var PublicMerchant = _createClass(function PublicMerchant(source, key, hash, address_components, address_formatted, phone_number_formatted, geometry, name, photo, photo_main, category, category_main, url_googleplus, url_website, utc_offset, open_now, open_time, open_hours, _geometry, checkedIn) {
  _classCallCheck(this, PublicMerchant);
  this.source = source;
  this.key = key;
  this.hash = hash;
  this.address_components = address_components;
  this.address_formatted = address_formatted;
  this.phone_number_formatted = phone_number_formatted;
  this.geometry = geometry;
  this.name = name;
  this.photo = photo;
  this.photo_main = photo_main;
  this.category = category;
  this.category_main = category_main;
  this.url_googleplus = url_googleplus;
  this.url_website = url_website;
  this.utc_offset = utc_offset;
  this.open_now = open_now;
  this.open_time = open_time;
  this.open_hours = open_hours;
  this._geometry = _geometry;
  this.checkedIn = checkedIn;
});
exports.PublicMerchant = PublicMerchant;