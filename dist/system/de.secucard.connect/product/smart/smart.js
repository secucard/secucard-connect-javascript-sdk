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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zbWFydC9zbWFydC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7dUZBbUJhLEtBQUs7Ozt1Q0FQVixjQUFjOztxQ0FDZCxhQUFhOzttQ0FDYixZQUFZOzt1Q0FDWixjQUFjOzsrQ0FDZCxrQkFBa0I7OztBQUdiLFdBQUssR0FBRyxFQUFFOzt1QkFBVixLQUFLOztBQUNsQixXQUFLLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztBQUN0QyxXQUFLLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztBQUNwQyxXQUFLLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztBQUNsQyxXQUFLLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztBQUN0QyxXQUFLLENBQUMsa0JBQWtCLEdBQUcsa0JBQWtCLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L3NtYXJ0L3NtYXJ0LmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==