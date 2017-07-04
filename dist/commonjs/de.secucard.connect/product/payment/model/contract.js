'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Contract = function Contract(created, updated, parent, allowCloning) {
  _classCallCheck(this, Contract);

  this['created'] = created;
  this['updated'] = updated;
  this['parent'] = parent;
  this['allow_cloning'] = allowCloning;
};

exports.Contract = Contract;