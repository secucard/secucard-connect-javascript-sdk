"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Account = function Account(username, password, role, contact, assignment) {
	_classCallCheck(this, Account);

	this.username = username;
	this.password = password;
	this.role = role;
	this.contact = contact;
	this.assignment = assignment;
};

exports.Account = Account;