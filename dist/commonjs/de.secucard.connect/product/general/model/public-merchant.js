"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PublicMerchant = function PublicMerchant(source, key, hash, address_components, address_formatted, phone_number_formatted, geometry, name, photo, photo_main, category, category_main, url_googleplus, url_website, utc_offset, open_now, open_time, open_hours, _geometry, checkedIn) {
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
};

exports.PublicMerchant = PublicMerchant;