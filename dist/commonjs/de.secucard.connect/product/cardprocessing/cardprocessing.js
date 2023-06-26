"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Cardprocessing = void 0;
var _invoiceService = require("./invoice-service");
var _transactionService = require("./transaction-service");
var Cardprocessing = {};
exports.Cardprocessing = Cardprocessing;
Cardprocessing.InvoiceService = _invoiceService.InvoiceService;
Cardprocessing.TransactionService = _transactionService.TransactionService;