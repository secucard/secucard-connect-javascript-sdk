"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Location = function Location(lat, lon, accuracy) {
  _classCallCheck(this, Location);

  this.lat = lat;
  this.lon = lon;
  this.accuracy = accuracy;
};

exports.Location = Location;