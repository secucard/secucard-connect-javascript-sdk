'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var CreateSubContractRequest = function CreateSubContractRequest(contact, project, payoutAccount, iframeOpts, payinAccount) {
  _classCallCheck(this, CreateSubContractRequest);

  this['contact'] = contact;
  this['project'] = project;
  this['payout_account'] = payoutAccount;
  this['iframe_opts'] = iframeOpts;
  this['payin_account'] = payinAccount;
};

exports.CreateSubContractRequest = CreateSubContractRequest;