'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var CreateSubContractResponse = function CreateSubContractResponse(apikey, contract, payinAccount, contractId) {
  _classCallCheck(this, CreateSubContractResponse);

  this['apikey'] = apikey;
  this['contract'] = contract;
  this['payin_account'] = payinAccount;
  this['contract_id'] = contractId;
};

exports.CreateSubContractResponse = CreateSubContractResponse;