'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var ApprovalService = (function (_ProductService) {
  _inherits(ApprovalService, _ProductService);

  function ApprovalService() {
    _classCallCheck(this, ApprovalService);

    _ProductService.call(this);
  }

  ApprovalService.prototype.getEndpoint = function getEndpoint() {
    return ['loyalty', 'approvals'];
  };

  ApprovalService.prototype.getEventTargets = function getEventTargets() {
    return [];
  };

  return ApprovalService;
})(_productService.ProductService);

exports.ApprovalService = ApprovalService;

ApprovalService.Uid = ['loyalty', 'approvals'].join('.');