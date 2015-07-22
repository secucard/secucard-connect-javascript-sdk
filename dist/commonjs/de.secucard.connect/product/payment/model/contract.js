"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Contract = function Contract(created, updated, parent, allow_cloning) {
	_classCallCheck(this, Contract);

	this.created = created;
	this.updated = updated;
	this.parent = parent;
	this.allow_cloning = allow_cloning;
};

exports.Contract = Contract;

var ContractCloneParams = function ContractCloneParams(allow_transactions, url_push, payment_data, project) {
	_classCallCheck(this, ContractCloneParams);

	this.allow_transactions = allow_transactions;
	this.url_push = url_push;
	this.payment_data = payment_data;
	this.project = project;
};

exports.ContractCloneParams = ContractCloneParams;