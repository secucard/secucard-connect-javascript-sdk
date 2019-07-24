System.register(['./invoices-service', './transactions-service'], function (_export) {
  'use strict';

  var InvoicesService, TransactionsService, Pos;
  return {
    setters: [function (_invoicesService) {
      InvoicesService = _invoicesService.InvoicesService;
    }, function (_transactionsService) {
      TransactionsService = _transactionsService.TransactionsService;
    }],
    execute: function () {
      Pos = {};

      _export('Pos', Pos);

      Pos.InvoicesService = InvoicesService;
      Pos.TransactionsService = TransactionsService;
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wb3MvcG9zLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs0Q0FjYSxHQUFHOzs7eUNBSFIsZUFBZTs7aURBQ2YsbUJBQW1COzs7QUFFZCxTQUFHLEdBQUcsRUFBRTs7OztBQUNyQixTQUFHLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztBQUN0QyxTQUFHLENBQUMsbUJBQW1CLEdBQUcsbUJBQW1CLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L3Bvcy9wb3MuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9
