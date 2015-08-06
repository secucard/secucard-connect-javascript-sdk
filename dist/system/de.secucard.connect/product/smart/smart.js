System.register(['./transaction-service', './ident-service', './checkin-service'], function (_export) {
  'use strict';

  var TransactionService, IdentService, CheckinService, Smart;
  return {
    setters: [function (_transactionService) {
      TransactionService = _transactionService.TransactionService;
    }, function (_identService) {
      IdentService = _identService.IdentService;
    }, function (_checkinService) {
      CheckinService = _checkinService.CheckinService;
    }],
    execute: function () {
      Smart = {};

      _export('Smart', Smart);

      Smart.TransactionService = TransactionService;
      Smart.IdentService = IdentService;
      Smart.CheckinService = CheckinService;
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zbWFydC9zbWFydC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7d0RBZWEsS0FBSzs7OytDQUpWLGtCQUFrQjs7bUNBQ2xCLFlBQVk7O3VDQUNaLGNBQWM7OztBQUVULFdBQUssR0FBRyxFQUFFOzt1QkFBVixLQUFLOztBQUNsQixXQUFLLENBQUMsa0JBQWtCLEdBQUcsa0JBQWtCLENBQUM7QUFDOUMsV0FBSyxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7QUFDbEMsV0FBSyxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L3NtYXJ0L3NtYXJ0LmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==