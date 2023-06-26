"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SmartModel = void 0;
var _basketInfo = require("./model/basket-info");
var _basket = require("./model/basket");
var _ident = require("./model/ident");
var _product = require("./model/product");
var _productGroup = require("./model/product-group");
var _transaction = require("./model/transaction");
var SmartModel = {};
exports.SmartModel = SmartModel;
SmartModel.BasketInfo = _basketInfo.BasketInfo;
SmartModel.Basket = _basket.Basket;
SmartModel.Ident = _ident.Ident;
SmartModel.Product = _product.Product;
SmartModel.ProductGroup = _productGroup.ProductGroup;
SmartModel.Transaction = _transaction.Transaction;