System.register(['./container-service', './contract-service', './customer-service', './secupay-debit-service', './secupay-prepay-service'], function (_export) {
  'use strict';

  var ContainerService, ContractService, CustomerService, SecupayDebitService, SecupayPrepayService, Payment;
  return {
    setters: [function (_containerService) {
      ContainerService = _containerService.ContainerService;
    }, function (_contractService) {
      ContractService = _contractService.ContractService;
    }, function (_customerService) {
      CustomerService = _customerService.CustomerService;
    }, function (_secupayDebitService) {
      SecupayDebitService = _secupayDebitService.SecupayDebitService;
    }, function (_secupayPrepayService) {
      SecupayPrepayService = _secupayPrepayService.SecupayPrepayService;
    }],
    execute: function () {
      Payment = {};

      _export('Payment', Payment);

      Payment.ContainerService = ContainerService;
      Payment.ContractService = ContractService;
      Payment.CustomerService = CustomerService;
      Payment.SecupayDebitService = SecupayDebitService;
      Payment.SecupayPrepayService = SecupayPrepayService;
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wYXltZW50L3BheW1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3FHQU1hLE9BQU87OzsyQ0FOWixnQkFBZ0I7O3lDQUNoQixlQUFlOzt5Q0FDZixlQUFlOztpREFDZixtQkFBbUI7O21EQUNuQixvQkFBb0I7OztBQUVmLGFBQU8sR0FBRyxFQUFFOzt5QkFBWixPQUFPOztBQUNwQixhQUFPLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7QUFDNUMsYUFBTyxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7QUFDMUMsYUFBTyxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7QUFDMUMsYUFBTyxDQUFDLG1CQUFtQixHQUFHLG1CQUFtQixDQUFDO0FBQ2xELGFBQU8sQ0FBQyxvQkFBb0IsR0FBRyxvQkFBb0IsQ0FBQyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3QvcGF5bWVudC9wYXltZW50LmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==