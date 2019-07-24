'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var TransactionsService = (function (_ProductService) {
    _inherits(TransactionsService, _ProductService);

    function TransactionsService() {
        _classCallCheck(this, TransactionsService);

        _ProductService.call(this);
    }

    TransactionsService.prototype.getEndpoint = function getEndpoint() {
        return ['pos', 'transactions'];
    };

    TransactionsService.prototype.getEventTargets = function getEventTargets() {
        return ['pos.transactions'];
    };

    return TransactionsService;
})(_productService.ProductService);

exports.TransactionsService = TransactionsService;

TransactionsService.Uid = ['pos', 'transactions'].join('.');