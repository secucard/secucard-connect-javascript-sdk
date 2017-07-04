System.register(['./container-service', './contract-service', './customer-service', './secupay-creditcard-service', './secupay-debit-service', './secupay-invoice-service', './secupay-prepay-service', './transaction-service'], function (_export) {
  'use strict';

  var ContainerService, ContractService, CustomerService, SecupayCreditcardService, SecupayDebitService, SecupayInvoiceService, SecupayPrepayService, TransactionService, Payment;
  return {
    setters: [function (_containerService) {
      ContainerService = _containerService.ContainerService;
    }, function (_contractService) {
      ContractService = _contractService.ContractService;
    }, function (_customerService) {
      CustomerService = _customerService.CustomerService;
    }, function (_secupayCreditcardService) {
      SecupayCreditcardService = _secupayCreditcardService.SecupayCreditcardService;
    }, function (_secupayDebitService) {
      SecupayDebitService = _secupayDebitService.SecupayDebitService;
    }, function (_secupayInvoiceService) {
      SecupayInvoiceService = _secupayInvoiceService.SecupayInvoiceService;
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
      Payment.SecupayCreditcardService = SecupayCreditcardService;
      Payment.SecupayDebitService = SecupayDebitService;
      Payment.SecupayInvoiceService = SecupayInvoiceService;
      Payment.SecupayPrepayService = SecupayPrepayService;
      Payment.TransactionService = TransactionService;
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wYXltZW50L3BheW1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OzBLQVNhLE9BQU87OzsyQ0FUWixnQkFBZ0I7O3lDQUNoQixlQUFlOzt5Q0FDZixlQUFlOzsyREFDZix3QkFBd0I7O2lEQUN4QixtQkFBbUI7O3FEQUNuQixxQkFBcUI7O21EQUNyQixvQkFBb0I7OytDQUNwQixrQkFBa0I7OztBQUViLGFBQU8sR0FBRyxFQUFFOzs7O0FBQ3pCLGFBQU8sQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztBQUM1QyxhQUFPLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztBQUMxQyxhQUFPLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztBQUMxQyxhQUFPLENBQUMsd0JBQXdCLEdBQUcsd0JBQXdCLENBQUM7QUFDNUQsYUFBTyxDQUFDLG1CQUFtQixHQUFHLG1CQUFtQixDQUFDO0FBQ2xELGFBQU8sQ0FBQyxxQkFBcUIsR0FBRyxxQkFBcUIsQ0FBQztBQUN0RCxhQUFPLENBQUMsb0JBQW9CLEdBQUcsb0JBQW9CLENBQUM7QUFDcEQsYUFBTyxDQUFDLGtCQUFrQixHQUFHLGtCQUFrQixDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wYXltZW50L3BheW1lbnQuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9
