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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zZXJ2aWNlcy9zZXJ2aWNlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7dUZBZ0JhLFFBQVE7OzsyQ0FMYixnQkFBZ0I7O21EQUNoQixvQkFBb0I7O2lEQUNwQixtQkFBbUI7OytDQUNuQixrQkFBa0I7OztBQUViLGNBQVEsR0FBRyxFQUFFOzswQkFBYixRQUFROztBQUNyQixjQUFRLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7QUFDN0MsY0FBUSxDQUFDLG9CQUFvQixHQUFHLG9CQUFvQixDQUFDO0FBQ3JELGNBQVEsQ0FBQyxtQkFBbUIsR0FBRyxtQkFBbUIsQ0FBQztBQUNuRCxjQUFRLENBQUMsa0JBQWtCLEdBQUcsa0JBQWtCLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L3NlcnZpY2VzL3NlcnZpY2VzLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==