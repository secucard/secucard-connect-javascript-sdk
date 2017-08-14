'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var CloneParams = function CloneParams(allowTransactions, urlPush, paymentData, project) {
  _classCallCheck(this, CloneParams);

  this['allow_transactions'] = allowTransactions;
  this['url_push'] = urlPush;
  this['payment_data'] = paymentData;
  this['project'] = project;
};

exports.CloneParams = CloneParams;