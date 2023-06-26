"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Customer = void 0;
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
var Customer = _createClass(function Customer(merchant, forename, surname, company, display_name, salutation, title, street, zipcode, city, email, fax, mobile, note, phone, age, days_until_birthday, additional_data, customernumber, dob, picture) {
  _classCallCheck(this, Customer);
  this.merchant = merchant;
  this.forename = forename;
  this.surname = surname;
  this.company = company;
  this.display_name = display_name;
  this.salutation = salutation;
  this.title = title;
  this.street = street;
  this.zipcode = zipcode;
  this.city = city;
  this.email = email;
  this.fax = fax;
  this.mobile = mobile;
  this.note = note;
  this.phone = phone;
  this.age = age;
  this.days_until_birthday = days_until_birthday;
  this.additional_data = additional_data;
  this.customernumber = customernumber;
  this.dob = dob;
  this.picture = picture;
});
exports.Customer = Customer;