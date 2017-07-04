'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Basket = function Basket(ean, tax, price, articleNumber, name, total, quantity, itemType, contractId, model, apikey) {
  _classCallCheck(this, Basket);

  this['ean'] = ean;
  this['tax'] = tax;
  this['price'] = price;
  this['article_number'] = articleNumber;
  this['name'] = name;
  this['total'] = total;
  this['quantity'] = quantity;
  this['item_type'] = itemType;
  this['contract_id'] = contractId;
  this['model'] = model;
  this['apikey'] = apikey;
};

exports.Basket = Basket;