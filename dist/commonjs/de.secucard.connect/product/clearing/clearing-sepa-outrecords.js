'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var ClearingSepaoutrecordsService = (function (_ProductService) {
    _inherits(ClearingSepaoutrecordsService, _ProductService);

    function ClearingSepaoutrecordsService() {
        _classCallCheck(this, ClearingSepaoutrecordsService);

        _ProductService.call(this);
    }

    ClearingSepaoutrecordsService.prototype.getEndpoint = function getEndpoint() {
        return ['clearing', 'sepaoutrecords'];
    };

    ClearingSepaoutrecordsService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return ClearingSepaoutrecordsService;
})(_productService.ProductService);

exports.ClearingSepaoutrecordsService = ClearingSepaoutrecordsService;

ClearingSepaoutrecordsService.Uid = ['clearing', 'sepaoutrecords'].join('.');