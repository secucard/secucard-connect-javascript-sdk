System.register(['./invoice-service', './transaction-service'], function (_export) {
  'use strict';

  var InvoiceService, TransactionService, Cardprocessing;
  return {
    setters: [function (_invoiceService) {
      InvoiceService = _invoiceService.InvoiceService;
    }, function (_transactionService) {
      TransactionService = _transactionService.TransactionService;
    }],
    execute: function () {
      Cardprocessing = {};

      _export('Cardprocessing', Cardprocessing);

      Cardprocessing.InvoiceService = InvoiceService;
      Cardprocessing.TransactionService = TransactionService;
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9jYXJkcHJvY2Vzc2luZy9jYXJkcHJvY2Vzc2luZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7MENBY2EsY0FBYzs7O3VDQUhuQixjQUFjOzsrQ0FDZCxrQkFBa0I7OztBQUViLG9CQUFjLEdBQUcsRUFBRTs7OztBQUNoQyxvQkFBYyxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7QUFDL0Msb0JBQWMsQ0FBQyxrQkFBa0IsR0FBRyxrQkFBa0IsQ0FBQyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3QvY2FyZHByb2Nlc3NpbmcvY2FyZHByb2Nlc3NpbmcuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9
