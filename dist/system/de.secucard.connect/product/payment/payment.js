System.register(['./container-service', './contract-service', './customer-service', './invoice-service', './payout-service', './secupay-debit-service', './secupay-prepay-service', './transaction-service', './transaction-histories-service', './eterminal-transaction-service'], function (_export) {
  'use strict';

  var ContainerService, ContractService, CustomerService, InvoiceService, PayoutService, SecupayDebitService, SecupayPrepayService, TransactionService, TransactionHistoriesService, EterminalTransactionService, Payment;
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
      Payment.InvoiceService = InvoiceService;
      Payment.PayoutService = PayoutService;
      Payment.SecupayDebitService = SecupayDebitService;
      Payment.SecupayPrepayService = SecupayPrepayService;
      Payment.TransactionService = TransactionService;
      Payment.TransactionHistoriesService = TransactionHistoriesService;
      Payment.EterminalTransactionService = EterminalTransactionService;
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wYXltZW50L3BheW1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2tOQXNCYSxPQUFPOzs7MkNBWFosZ0JBQWdCOzt5Q0FDaEIsZUFBZTs7eUNBQ2YsZUFBZTs7dUNBQ2YsY0FBYzs7cUNBQ2QsYUFBYTs7aURBQ2IsbUJBQW1COzttREFDbkIsb0JBQW9COzsrQ0FDcEIsa0JBQWtCOztpRUFDbEIsMkJBQTJCOztpRUFDM0IsMkJBQTJCOzs7QUFFdEIsYUFBTyxHQUFHLEVBQUU7Ozs7QUFDekIsYUFBTyxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDO0FBQzVDLGFBQU8sQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO0FBQzFDLGFBQU8sQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO0FBQzFDLGFBQU8sQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO0FBQ3hDLGFBQU8sQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO0FBQ3RDLGFBQU8sQ0FBQyxtQkFBbUIsR0FBRyxtQkFBbUIsQ0FBQztBQUNsRCxhQUFPLENBQUMsb0JBQW9CLEdBQUcsb0JBQW9CLENBQUM7QUFDcEQsYUFBTyxDQUFDLGtCQUFrQixHQUFHLGtCQUFrQixDQUFDO0FBQ2hELGFBQU8sQ0FBQywyQkFBMkIsR0FBRywyQkFBMkIsQ0FBQztBQUNsRSxhQUFPLENBQUMsMkJBQTJCLEdBQUcsMkJBQTJCLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L3BheW1lbnQvcGF5bWVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=
