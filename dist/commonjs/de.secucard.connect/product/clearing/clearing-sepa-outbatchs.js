'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var ClearingSepaoutbatchsService = (function (_ProductService) {
    _inherits(ClearingSepaoutbatchsService, _ProductService);

    function ClearingSepaoutbatchsService() {
        _classCallCheck(this, ClearingSepaoutbatchsService);

        _ProductService.call(this);
    }

    ClearingSepaoutbatchsService.prototype.getEndpoint = function getEndpoint() {
        return ['clearing', 'sepaoutbatchs'];
    };

    ClearingSepaoutbatchsService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return ClearingSepaoutbatchsService;
})(_productService.ProductService);

exports.ClearingSepaoutbatchsService = ClearingSepaoutbatchsService;

ClearingSepaoutbatchsService.Uid = ['clearing', 'sepaoutbatchs'].join('.');