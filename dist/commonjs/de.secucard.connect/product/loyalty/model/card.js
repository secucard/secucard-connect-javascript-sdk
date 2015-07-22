"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Card = function Card(cardnumber, created, account) {
	_classCallCheck(this, Card);

	this.cardnumber = cardnumber;
	this.created = created;
	this.account = account;
};

exports.Card = Card;