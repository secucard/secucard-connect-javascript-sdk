"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Product = function Product(articleNumber, ean, desc, quantity, priceOne, tax, group) {
	_classCallCheck(this, Product);

	this.articleNumber = articleNumber;
	this.ean = ean;
	this.desc = desc;
	this.quantity = quantity;
	this.priceOne = priceOne;
	this.tax = tax;
	this.group = group;
};

exports.Product = Product;