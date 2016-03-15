'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Container = function Container(merchant, privateData, publicData, assign, type, created, updated, contract) {
    _classCallCheck(this, Container);

    this.merchant = merchant;
    this['private'] = privateData;
    this['public'] = publicData;
    this.assign = assign;
    this.type = type;
    this.created = created;
    this.updated = updated;
    this.contract = contract;
};

exports.Container = Container;