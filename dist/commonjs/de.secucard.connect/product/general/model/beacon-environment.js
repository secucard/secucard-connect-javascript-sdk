"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BeaconEnvironment = exports.BeaconEnvironment = function BeaconEnvironment(name, proximityUUID, macAddress, major, minor, measuredPower, rssi, accuracy, proximity) {
    _classCallCheck(this, BeaconEnvironment);

    this.name = name;
    this.proximityUUID = proximityUUID;
    this.macAddress = macAddress;
    this.major = major;
    this.minor = minor;
    this.measuredPower = measuredPower;
    this.rssi = rssi;
    this.accuracy = accuracy;
    this.proximity = proximity;
};