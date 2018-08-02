System.register(['./container-service', './contract-service', './customer-service', './invoice-service', './payout-service', './secupay-debit-service', './secupay-prepay-service', './transaction-service'], function (_export) {
  'use strict';

  var ContainerService, ContractService, CustomerService, InvoiceService, PayoutService, SecupayDebitService, SecupayPrepayService, TransactionService, Payment;
  return {
    setters: [function (_containerService) {
      ContainerService = _containerService.ContainerService;
    }, function (_contractService) {
      ContractService = _contractService.ContractService;
    }, function (_customerService) {
      CustomerService = _customerService.CustomerService;
    }, function (_invoiceService) {
      InvoiceService = _invoiceService.InvoiceService;
    }, function (_payoutService) {
      PayoutService = _payoutService.PayoutService;
    }, function (_secupayDebitService) {
      SecupayDebitService = _secupayDebitService.SecupayDebitService;
    }, function (_secupayPrepayService) {
      SecupayPrepayService = _secupayPrepayService.SecupayPrepayService;
    }, function (_transactionService) {
      TransactionService = _transactionService.TransactionService;
    }],
    execute: function () {
      Payment = {};

      _export('Payment', Payment);

      Payment.ContainerService = ContainerService;
      Payment.ContractService = ContractService;
      Payment.CustomerService = CustomerService;
      Payment.InvoiceService = InvoiceService;
      Payment.PayoutService = PayoutService;
      Payment.SecupayDebitService = SecupayDebitService;
      Payment.SecupayPrepayService = SecupayPrepayService;
      Payment.TransactionService = TransactionService;
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wYXltZW50L3BheW1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3dKQW9CYSxPQUFPOzs7MkNBVFosZ0JBQWdCOzt5Q0FDaEIsZUFBZTs7eUNBQ2YsZUFBZTs7dUNBQ2YsY0FBYzs7cUNBQ2QsYUFBYTs7aURBQ2IsbUJBQW1COzttREFDbkIsb0JBQW9COzsrQ0FDcEIsa0JBQWtCOzs7QUFFYixhQUFPLEdBQUcsRUFBRTs7OztBQUN6QixhQUFPLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7QUFDNUMsYUFBTyxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7QUFDMUMsYUFBTyxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7QUFDMUMsYUFBTyxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7QUFDeEMsYUFBTyxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7QUFDdEMsYUFBTyxDQUFDLG1CQUFtQixHQUFHLG1CQUFtQixDQUFDO0FBQ2xELGFBQU8sQ0FBQyxvQkFBb0IsR0FBRyxvQkFBb0IsQ0FBQztBQUNwRCxhQUFPLENBQUMsa0JBQWtCLEdBQUcsa0JBQWtCLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L3BheW1lbnQvcGF5bWVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=
