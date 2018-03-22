System.register(['./checkin-service', './configuration-service', './device-service', './device-histories', './ident-service', './routing-service', './transaction-service'], function (_export) {
  'use strict';

  var CheckinService, ConfigurationService, DeviceService, DeviceHistoriesService, IdentService, RoutingService, TransactionService, Smart;
  return {
    setters: [function (_checkinService) {
      CheckinService = _checkinService.CheckinService;
    }, function (_configurationService) {
      ConfigurationService = _configurationService.ConfigurationService;
    }, function (_deviceService) {
      DeviceService = _deviceService.DeviceService;
    }, function (_deviceHistories) {
      DeviceHistoriesService = _deviceHistories.DeviceHistoriesService;
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
      Smart.ConfigurationService = ConfigurationService;
      Smart.DeviceService = DeviceService;
      Smart.DeviceHistoriesService = DeviceHistoriesService;
      Smart.IdentService = IdentService;
      Smart.RoutingService = RoutingService;
      Smart.TransactionService = TransactionService;
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zbWFydC9zbWFydC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7cUlBcUJhLEtBQUs7Ozt1Q0FUVixjQUFjOzttREFDZCxvQkFBb0I7O3FDQUNwQixhQUFhOztnREFDYixzQkFBc0I7O21DQUN0QixZQUFZOzt1Q0FDWixjQUFjOzsrQ0FDZCxrQkFBa0I7OztBQUdiLFdBQUssR0FBRyxFQUFFOzs7O0FBQ3ZCLFdBQUssQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO0FBQ3RDLFdBQUssQ0FBQyxvQkFBb0IsR0FBRyxvQkFBb0IsQ0FBQztBQUNsRCxXQUFLLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztBQUNwQyxXQUFLLENBQUMsc0JBQXNCLEdBQUcsc0JBQXNCLENBQUM7QUFDdEQsV0FBSyxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7QUFDbEMsV0FBSyxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7QUFDdEMsV0FBSyxDQUFDLGtCQUFrQixHQUFHLGtCQUFrQixDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zbWFydC9zbWFydC5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=
