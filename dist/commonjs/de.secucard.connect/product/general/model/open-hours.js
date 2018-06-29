"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OpenHours = exports.OpenHours = function OpenHours(open, close) {
    _classCallCheck(this, OpenHours);

    this.open = open;
    this.close = close;
};

var OpenHoursDate = exports.OpenHoursDate = function OpenHoursDate(day, time) {
    _classCallCheck(this, OpenHoursDate);

    this.day = day;
    this.time = time;
};