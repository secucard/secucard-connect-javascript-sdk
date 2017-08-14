'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Data = function Data(owner, iban, bic, bankname) {
  _classCallCheck(this, Data);

  this['owner'] = owner;
  this['iban'] = iban;
  this['bic'] = bic;
  this['bankname'] = bankname;
};

exports.Data = Data;