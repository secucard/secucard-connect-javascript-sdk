"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Services = void 0;
var _identCaseService = require("./ident-case-service");
var _identContractService = require("./ident-contract-service");
var _identRequestService = require("./ident-request-service");
var _identResultService = require("./ident-result-service");
var Services = {};
exports.Services = Services;
Services.IdentCaseService = _identCaseService.IdentCaseService;
Services.IdentContractService = _identContractService.IdentContractService;
Services.IdentRequestService = _identRequestService.IdentRequestService;
Services.IdentResultService = _identResultService.IdentResultService;