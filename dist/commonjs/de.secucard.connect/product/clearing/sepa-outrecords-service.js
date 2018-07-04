'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var SepaOutrecordsService = (function (_ProductService) {
    _inherits(SepaOutrecordsService, _ProductService);

    function SepaOutrecordsService() {
        _classCallCheck(this, SepaOutrecordsService);

        _ProductService.call(this);
    }

    SepaOutrecordsService.prototype.getEndpoint = function getEndpoint() {
        return ['clearing', 'sepaoutrecords'];
    };

    SepaOutrecordsService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return SepaOutrecordsService;
})(_productService.ProductService);

exports.SepaOutrecordsService = SepaOutrecordsService;

SepaOutrecordsService.Uid = ['clearing', 'sepaoutrecords'].join('.');