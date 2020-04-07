System.register(['./container-service', './contract-service', './customer-service', './invoice-service', './payout-service', './secupay-debit-service', './secupay-payout-service', './secupay-prepay-service', './transaction-service', './transaction-histories-service', './eterminal-transaction-service'], function (_export) {
  'use strict';

  var ContainerService, ContractService, CustomerService, InvoiceService, PayoutService, SecupayDebitService, SecupayPayoutService, SecupayPrepayService, TransactionService, TransactionHistoriesService, EterminalTransactionService, Payment;
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
    }, function (_secupayPayoutService) {
      SecupayPayoutService = _secupayPayoutService.SecupayPayoutService;
    }, function (_secupayPrepayService) {
      SecupayPrepayService = _secupayPrepayService.SecupayPrepayService;
    }, function (_transactionService) {
      TransactionService = _transactionService.TransactionService;
    }, function (_transactionHistoriesService) {
      TransactionHistoriesService = _transactionHistoriesService.TransactionHistoriesService;
    }, function (_eterminalTransactionService) {
      EterminalTransactionService = _eterminalTransactionService.EterminalTransactionService;
    }],
    execute: function () {
      Payment = {};

      _export('Payment', Payment);

      Payment.ContainerService = ContainerService;
      Payment.ContractService = ContractService;
      Payment.CustomerService = CustomerService;
      Payment.EterminalTransactionService = EterminalTransactionService;
      Payment.InvoiceService = InvoiceService;
      Payment.PayoutService = PayoutService;
      Payment.SecupayDebitService = SecupayDebitService;
      Payment.SecupayPayoutService = SecupayPayoutService;
      Payment.SecupayPrepayService = SecupayPrepayService;
      Payment.TransactionService = TransactionService;
      Payment.TransactionHistoriesService = TransactionHistoriesService;
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wYXltZW50L3BheW1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3dPQXVCYSxPQUFPOzs7MkNBWlosZ0JBQWdCOzt5Q0FDaEIsZUFBZTs7eUNBQ2YsZUFBZTs7dUNBQ2YsY0FBYzs7cUNBQ2QsYUFBYTs7aURBQ2IsbUJBQW1COzttREFDbkIsb0JBQW9COzttREFDcEIsb0JBQW9COzsrQ0FDcEIsa0JBQWtCOztpRUFDbEIsMkJBQTJCOztpRUFDM0IsMkJBQTJCOzs7QUFFdEIsYUFBTyxHQUFHLEVBQUU7Ozs7QUFDekIsYUFBTyxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDO0FBQzVDLGFBQU8sQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO0FBQzFDLGFBQU8sQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO0FBQzFDLGFBQU8sQ0FBQywyQkFBMkIsR0FBRywyQkFBMkIsQ0FBQztBQUNsRSxhQUFPLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztBQUN4QyxhQUFPLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztBQUN0QyxhQUFPLENBQUMsbUJBQW1CLEdBQUcsbUJBQW1CLENBQUM7QUFDbEQsYUFBTyxDQUFDLG9CQUFvQixHQUFHLG9CQUFvQixDQUFDO0FBQ3BELGFBQU8sQ0FBQyxvQkFBb0IsR0FBRyxvQkFBb0IsQ0FBQztBQUNwRCxhQUFPLENBQUMsa0JBQWtCLEdBQUcsa0JBQWtCLENBQUM7QUFDaEQsYUFBTyxDQUFDLDJCQUEyQixHQUFHLDJCQUEyQixDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wYXltZW50L3BheW1lbnQuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9
