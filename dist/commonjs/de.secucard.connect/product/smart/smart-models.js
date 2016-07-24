'use strict';

exports.__esModule = true;

var _modelBasketInfo = require('./model/basket-info');

var _modelBasket = require('./model/basket');

var _modelIdent = require('./model/ident');

var _modelProduct = require('./model/product');

var _modelProductGroup = require('./model/product-group');

var _modelTransaction = require('./model/transaction');

var SmartModel = {};
exports.SmartModel = SmartModel;
SmartModel.BasketInfo = _modelBasketInfo.BasketInfo;
SmartModel.Basket = _modelBasket.Basket;
SmartModel.Ident = _modelIdent.Ident;
SmartModel.Product = _modelProduct.Product;
SmartModel.ProductGroup = _modelProductGroup.ProductGroup;
SmartModel.Transaction = _modelTransaction.Transaction;