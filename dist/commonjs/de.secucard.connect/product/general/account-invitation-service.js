'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var AccountInvitationService = (function (_ProductService) {
  _inherits(AccountInvitationService, _ProductService);

  function AccountInvitationService() {
    _classCallCheck(this, AccountInvitationService);

    _ProductService.call(this);
  }

  AccountInvitationService.prototype.getEndpoint = function getEndpoint() {
    return ['general', 'accountinvitations'];
  };

  AccountInvitationService.prototype.getEventTargets = function getEventTargets() {
    return ['general.accountinvitations'];
  };

  return AccountInvitationService;
})(_productService.ProductService);

exports.AccountInvitationService = AccountInvitationService;

AccountInvitationService.Uid = ['general', 'accountinvitations'].join('.');