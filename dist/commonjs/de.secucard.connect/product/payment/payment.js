'use strict';

exports.__esModule = true;

var _containerService = require('./container-service');

var _contractService = require('./contract-service');

var _customerService = require('./customer-service');

var _secupayCreditcardService = require('./secupay-creditcard-service');

var _secupayDebitService = require('./secupay-debit-service');

var _secupayInvoiceService = require('./secupay-invoice-service');

var _secupayPrepayService = require('./secupay-prepay-service');

var _transactionService = require('./transaction-service');

var Payment = {};
exports.Payment = Payment;
Payment.ContainerService = _containerService.ContainerService;
Payment.ContractService = _contractService.ContractService;
Payment.CustomerService = _customerService.CustomerService;
Payment.SecupayCreditcardService = _secupayCreditcardService.SecupayCreditcardService;
Payment.SecupayDebitService = _secupayDebitService.SecupayDebitService;
Payment.SecupayInvoiceService = _secupayInvoiceService.SecupayInvoiceService;
Payment.SecupayPrepayService = _secupayPrepayService.SecupayPrepayService;
Payment.TransactionService = _transactionService.TransactionService;