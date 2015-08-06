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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wYXltZW50L3BheW1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3FHQWlCYSxPQUFPOzs7MkNBTlosZ0JBQWdCOzt5Q0FDaEIsZUFBZTs7eUNBQ2YsZUFBZTs7aURBQ2YsbUJBQW1COzttREFDbkIsb0JBQW9COzs7QUFFZixhQUFPLEdBQUcsRUFBRTs7eUJBQVosT0FBTzs7QUFDcEIsYUFBTyxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDO0FBQzVDLGFBQU8sQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO0FBQzFDLGFBQU8sQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO0FBQzFDLGFBQU8sQ0FBQyxtQkFBbUIsR0FBRyxtQkFBbUIsQ0FBQztBQUNsRCxhQUFPLENBQUMsb0JBQW9CLEdBQUcsb0JBQW9CLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L3BheW1lbnQvcGF5bWVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=