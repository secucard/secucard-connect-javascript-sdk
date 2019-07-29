'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var TransactionService = (function (_ProductService) {
    _inherits(TransactionService, _ProductService);

    function TransactionService() {
        _classCallCheck(this, TransactionService);

        _ProductService.call(this);
    }

    TransactionService.prototype.getEndpoint = function getEndpoint() {
        return ['cardprocessing', 'transactions'];
    };

    TransactionService.prototype.getEventTargets = function getEventTargets() {
        return ['cardprocessing.transactions'];
    };

    return TransactionService;
})(_productService.ProductService);

exports.TransactionService = TransactionService;

TransactionService.Uid = ['cardprocessing', 'transactions'].join('.');