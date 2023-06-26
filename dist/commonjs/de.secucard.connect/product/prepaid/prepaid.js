"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Prepaid = void 0;
var _contractService = require("./contract-service");
var _itemGroupService = require("./item-group-service");
var _itemService = require("./item-service");
var _saleService = require("./sale-service");
var _stockService = require("./stock-service");
var _reportService = require("./report-service");
var Prepaid = {};
exports.Prepaid = Prepaid;
Prepaid.ContractService = _contractService.ContractService;
Prepaid.ItemGroupService = _itemGroupService.ItemGroupService;
Prepaid.ItemService = _itemService.ItemService;
Prepaid.ReportService = _reportService.ReportService;
Prepaid.SaleService = _saleService.SaleService;
Prepaid.StockService = _stockService.StockService;