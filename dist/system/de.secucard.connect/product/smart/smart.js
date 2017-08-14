System.register(['./checkin-service', './device-service', './ident-service', './routing-service', './transaction-service'], function (_export) {
  'use strict';

  var CheckinService, DeviceService, IdentService, RoutingService, TransactionService, Smart;
  return {
    setters: [function (_checkinService) {
      CheckinService = _checkinService.CheckinService;
    }, function (_deviceService) {
      DeviceService = _deviceService.DeviceService;
    }, function (_identService) {
      IdentService = _identService.IdentService;
    }, function (_routingService) {
      RoutingService = _routingService.RoutingService;
    }, function (_transactionService) {
      TransactionService = _transactionService.TransactionService;
    }],
    execute: function () {
      Smart = {};

      _export('Smart', Smart);

      Smart.CheckinService = CheckinService;
      Smart.DeviceService = DeviceService;
      Smart.IdentService = IdentService;
      Smart.RoutingService = RoutingService;
      Smart.TransactionService = TransactionService;
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zbWFydC9zbWFydC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7dUZBbUJhLEtBQUs7Ozt1Q0FQVixjQUFjOztxQ0FDZCxhQUFhOzttQ0FDYixZQUFZOzt1Q0FDWixjQUFjOzsrQ0FDZCxrQkFBa0I7OztBQUdiLFdBQUssR0FBRyxFQUFFOzs7O0FBQ3ZCLFdBQUssQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO0FBQ3RDLFdBQUssQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO0FBQ3BDLFdBQUssQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO0FBQ2xDLFdBQUssQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO0FBQ3RDLFdBQUssQ0FBQyxrQkFBa0IsR0FBRyxrQkFBa0IsQ0FBQyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3Qvc21hcnQvc21hcnQuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9
