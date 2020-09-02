System.register(['./transaction-service'], function (_export) {
  'use strict';

  var TransactionService, Easycredit;
  return {
    setters: [function (_transactionService) {
      TransactionService = _transactionService.TransactionService;
    }],
    execute: function () {
      Easycredit = {};

      _export('Easycredit', Easycredit);

      Easycredit.TransactionService = TransactionService;
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9lYXN5Y3JlZGl0L2Vhc3ljcmVkaXQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OzBCQWFhLFVBQVU7OzsrQ0FGZixrQkFBa0I7OztBQUViLGdCQUFVLEdBQUcsRUFBRTs7OztBQUM1QixnQkFBVSxDQUFDLGtCQUFrQixHQUFHLGtCQUFrQixDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9lYXN5Y3JlZGl0L2Vhc3ljcmVkaXQuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9
