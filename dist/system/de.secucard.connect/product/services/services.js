System.register(['./ident-case-service', './ident-contract-service', './ident-request-service', './ident-result-service'], function (_export) {
  'use strict';

  var IdentCaseService, IdentContractService, IdentRequestService, IdentResultService, Services;
  return {
    setters: [function (_identCaseService) {
      IdentCaseService = _identCaseService.IdentCaseService;
    }, function (_identContractService) {
      IdentContractService = _identContractService.IdentContractService;
    }, function (_identRequestService) {
      IdentRequestService = _identRequestService.IdentRequestService;
    }, function (_identResultService) {
      IdentResultService = _identResultService.IdentResultService;
    }],
    execute: function () {
      Services = {};

      _export('Services', Services);

      Services.IdentCaseService = IdentCaseService;
      Services.IdentContractService = IdentContractService;
      Services.IdentRequestService = IdentRequestService;
      Services.IdentResultService = IdentResultService;
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zZXJ2aWNlcy9zZXJ2aWNlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7dUZBZ0JhLFFBQVE7OzsyQ0FMYixnQkFBZ0I7O21EQUNoQixvQkFBb0I7O2lEQUNwQixtQkFBbUI7OytDQUNuQixrQkFBa0I7OztBQUViLGNBQVEsR0FBRyxFQUFFOzs7O0FBQzFCLGNBQVEsQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztBQUM3QyxjQUFRLENBQUMsb0JBQW9CLEdBQUcsb0JBQW9CLENBQUM7QUFDckQsY0FBUSxDQUFDLG1CQUFtQixHQUFHLG1CQUFtQixDQUFDO0FBQ25ELGNBQVEsQ0FBQyxrQkFBa0IsR0FBRyxrQkFBa0IsQ0FBQyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3Qvc2VydmljZXMvc2VydmljZXMuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9