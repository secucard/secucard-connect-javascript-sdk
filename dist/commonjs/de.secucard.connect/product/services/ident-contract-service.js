'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var IdentContractService = (function (_ProductService) {
    function IdentContractService() {
        _classCallCheck(this, IdentContractService);

        _ProductService.call(this);
    }

    _inherits(IdentContractService, _ProductService);

    IdentContractService.prototype.getEndpoint = function getEndpoint() {
        return ['services', 'identcontracts'];
    };

    IdentContractService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return IdentContractService;
})(_productService.ProductService);

exports.IdentContractService = IdentContractService;

IdentContractService.Uid = ['services', 'identcontracts'].join('.');