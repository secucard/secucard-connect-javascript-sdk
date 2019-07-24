'use strict';

exports.__esModule = true;

var _invoicesService = require('./invoices-service');

var _transactionsService = require('./transactions-service');

var Pos = {};
exports.Pos = Pos;
Pos.InvoicesService = _invoicesService.InvoicesService;
Pos.TransactionsService = _transactionsService.TransactionsService;