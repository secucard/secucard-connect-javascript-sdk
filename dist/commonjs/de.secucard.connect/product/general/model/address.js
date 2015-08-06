"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Address = function Address(street, street_number, postal_code, city, country) {
  _classCallCheck(this, Address);

  this.street = street;
  this.street_number = street_number;
  this.postal_code = postal_code;
  this.city = city;
  this.country = country;
};

exports.Address = Address;