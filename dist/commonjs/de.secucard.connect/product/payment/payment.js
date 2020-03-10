'use strict';

exports.__esModule = true;

var _containerService = require('./container-service');

var _contractService = require('./contract-service');

var _customerService = require('./customer-service');

var _invoiceService = require('./invoice-service');

var _payoutService = require('./payout-service');

var _secupayDebitService = require('./secupay-debit-service');

var _secupayPrepayService = require('./secupay-prepay-service');

var _transactionService = require('./transaction-service');

var _transactionHistoriesService = require('./transaction-histories-service');

var _eterminalTransactionsService = require('./eterminal-transactions-service');

var Payment = {};
exports.Payment = Payment;
Payment.ContainerService = _containerService.ContainerService;
Payment.ContractService = _contractService.ContractService;
Payment.CustomerService = _customerService.CustomerService;
Payment.InvoiceService = _invoiceService.InvoiceService;
Payment.PayoutService = _payoutService.PayoutService;
Payment.SecupayDebitService = _secupayDebitService.SecupayDebitService;
Payment.SecupayPrepayService = _secupayPrepayService.SecupayPrepayService;
Payment.TransactionService = _transactionService.TransactionService;
Payment.TransactionHistoriesService = _transactionHistoriesService.TransactionHistoriesService;
Payment.EterminalTransactionService = _eterminalTransactionsService.EterminalTransactionService;