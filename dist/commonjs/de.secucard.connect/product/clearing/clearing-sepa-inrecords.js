'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var ClearingSepainrecordsService = (function (_ProductService) {
    _inherits(ClearingSepainrecordsService, _ProductService);

    function ClearingSepainrecordsService() {
        _classCallCheck(this, ClearingSepainrecordsService);

        _ProductService.call(this);
    }

    ClearingSepainrecordsService.prototype.getEndpoint = function getEndpoint() {
        return ['clearing', 'sepainrecords'];
    };

    ClearingSepainrecordsService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return ClearingSepainrecordsService;
})(_productService.ProductService);

exports.ClearingSepainrecordsService = ClearingSepainrecordsService;

ClearingSepainrecordsService.Uid = ['clearing', 'sepainrecords'].join('.');