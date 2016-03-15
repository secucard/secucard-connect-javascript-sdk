"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OpenHours = function OpenHours(open, close) {
    _classCallCheck(this, OpenHours);

    this.open = open;
    this.close = close;
};

exports.OpenHours = OpenHours;

var OpenHoursDate = function OpenHoursDate(day, time) {
    _classCallCheck(this, OpenHoursDate);

    this.day = day;
    this.time = time;
};

exports.OpenHoursDate = OpenHoursDate;