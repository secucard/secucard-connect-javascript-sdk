System.register(['./model/basket-info', './model/basket', './model/ident', './model/product', './model/product-group', './model/transaction'], function (_export) {
  'use strict';

  var BasketInfo, Basket, Ident, Product, ProductGroup, Transaction, SmartModel;
  return {
    setters: [function (_modelBasketInfo) {
      BasketInfo = _modelBasketInfo.BasketInfo;
    }, function (_modelBasket) {
      Basket = _modelBasket.Basket;
    }, function (_modelIdent) {
      Ident = _modelIdent.Ident;
    }, function (_modelProduct) {
      Product = _modelProduct.Product;
    }, function (_modelProductGroup) {
      ProductGroup = _modelProductGroup.ProductGroup;
    }, function (_modelTransaction) {
      Transaction = _modelTransaction.Transaction;
    }],
    execute: function () {
      SmartModel = {};

      _export('SmartModel', SmartModel);

      SmartModel.BasketInfo = BasketInfo;
      SmartModel.Basket = Basket;
      SmartModel.Ident = Ident;
      SmartModel.Product = Product;
      SmartModel.ProductGroup = ProductGroup;
      SmartModel.Transaction = Transaction;
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zbWFydC9zbWFydC1tb2RlbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3FFQWtCYSxVQUFVOzs7b0NBUGYsVUFBVTs7NEJBQ1YsTUFBTTs7MEJBQ04sS0FBSzs7OEJBQ0wsT0FBTzs7d0NBQ1AsWUFBWTs7c0NBQ1osV0FBVzs7O0FBRU4sZ0JBQVUsR0FBRyxFQUFFOzs0QkFBZixVQUFVOztBQUN2QixnQkFBVSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7QUFDbkMsZ0JBQVUsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBQzNCLGdCQUFVLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztBQUN6QixnQkFBVSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7QUFDN0IsZ0JBQVUsQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO0FBQ3ZDLGdCQUFVLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3Qvc21hcnQvc21hcnQtbW9kZWxzLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==