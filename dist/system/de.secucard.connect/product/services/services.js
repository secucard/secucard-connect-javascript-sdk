System.register(['./ident-contract-service', './ident-request-service', './ident-result-service'], function (_export) {
  'use strict';

  var IdentContractService, IdentRequestService, IdentResultService, Services;
  return {
    setters: [function (_identContractService) {
      IdentContractService = _identContractService.IdentContractService;
    }, function (_identRequestService) {
      IdentRequestService = _identRequestService.IdentRequestService;
    }, function (_identResultService) {
      IdentResultService = _identResultService.IdentResultService;
    }],
    execute: function () {
      Services = {};

      _export('Services', Services);

      Services.IdentContractService = IdentContractService;
      Services.IdentRequestService = IdentRequestService;
      Services.IdentResultService = IdentResultService;
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zZXJ2aWNlcy9zZXJ2aWNlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7cUVBSWEsUUFBUTs7O21EQUpiLG9CQUFvQjs7aURBQ3BCLG1CQUFtQjs7K0NBQ25CLGtCQUFrQjs7O0FBRWIsY0FBUSxHQUFHLEVBQUU7OzBCQUFiLFFBQVE7O0FBQ3JCLGNBQVEsQ0FBQyxvQkFBb0IsR0FBRyxvQkFBb0IsQ0FBQztBQUNyRCxjQUFRLENBQUMsbUJBQW1CLEdBQUcsbUJBQW1CLENBQUM7QUFDbkQsY0FBUSxDQUFDLGtCQUFrQixHQUFHLGtCQUFrQixDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zZXJ2aWNlcy9zZXJ2aWNlcy5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=