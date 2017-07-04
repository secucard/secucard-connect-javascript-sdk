System.register(['./contract-service', './item-group-service', './item-service', './sale-service', './stock-service'], function (_export) {
  'use strict';

  var ContractService, ItemGroupService, ItemService, SaleService, StockService, Prepaid;
  return {
    setters: [function (_contractService) {
      ContractService = _contractService.ContractService;
    }, function (_itemGroupService) {
      ItemGroupService = _itemGroupService.ItemGroupService;
    }, function (_itemService) {
      ItemService = _itemService.ItemService;
    }, function (_saleService) {
      SaleService = _saleService.SaleService;
    }, function (_stockService) {
      StockService = _stockService.StockService;
    }],
    execute: function () {
      Prepaid = {};

      _export('Prepaid', Prepaid);

      Prepaid.ContractService = ContractService;
      Prepaid.ItemGroupService = ItemGroupService;
      Prepaid.ItemService = ItemService;
      Prepaid.SaleService = SaleService;
      Prepaid.StockService = StockService;
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wcmVwYWlkL3ByZXBhaWQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2lGQWlCYSxPQUFPOzs7eUNBTlosZUFBZTs7MkNBQ2YsZ0JBQWdCOztpQ0FDaEIsV0FBVzs7aUNBQ1gsV0FBVzs7bUNBQ1gsWUFBWTs7O0FBRVAsYUFBTyxHQUFHLEVBQUU7O3lCQUFaLE9BQU87O0FBQ3BCLGFBQU8sQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO0FBQzFDLGFBQU8sQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztBQUM1QyxhQUFPLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztBQUNsQyxhQUFPLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztBQUNsQyxhQUFPLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3QvcHJlcGFpZC9wcmVwYWlkLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==