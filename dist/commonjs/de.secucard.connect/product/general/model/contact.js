"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Contact = function Contact(name, forename, surname, title, gender, salutation, nationality, dob, birthplace, companyname, email, phone, mobile, address, urlWebsite, picture) {
	_classCallCheck(this, Contact);

	this.name = name;
	this.forename = forename;
	this.surname = surname;
	this.title = title;
	this.gender = gender;
	this.salutation = salutation;
	this.nationality = nationality;
	this.dob = dob;
	this.birthplace = birthplace;
	this.companyname = companyname;
	this.email = email;
	this.phone = phone;
	this.mobile = mobile;
	this.address = address;
	this.urlWebsite = urlWebsite;
	this.picture = picture;
};

exports.Contact = Contact;