'use strict';

exports.__esModule = true;

var _transactionService = require('./transaction-service');

var _identService = require('./ident-service');

var _checkinService = require('./checkin-service');

var Smart = {};
exports.Smart = Smart;
Smart.TransactionService = _transactionService.TransactionService;
Smart.IdentService = _identService.IdentService;
Smart.CheckinService = _checkinService.CheckinService;