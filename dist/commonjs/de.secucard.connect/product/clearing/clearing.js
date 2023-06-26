"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Clearing = void 0;
var _sepaInbatchsService = require("./sepa-inbatchs-service");
var _sepaInrecordsService = require("./sepa-inrecords-service");
var _sepaOutbatchsService = require("./sepa-outbatchs-service");
var _sepaOutrecordsService = require("./sepa-outrecords-service");
var Clearing = {};
exports.Clearing = Clearing;
Clearing.SepaInbatchsService = _sepaInbatchsService.SepaInbatchsService;
Clearing.SepaInrecordsService = _sepaInrecordsService.SepaInrecordsService;
Clearing.SepaOutbatchsService = _sepaOutbatchsService.SepaOutbatchsService;
Clearing.SepaOutrecordsService = _sepaOutrecordsService.SepaOutrecordsService;