'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var SepaInbatchsService = (function (_ProductService) {
    _inherits(SepaInbatchsService, _ProductService);

    function SepaInbatchsService() {
        _classCallCheck(this, SepaInbatchsService);

        _ProductService.call(this);
    }

    SepaInbatchsService.prototype.getEndpoint = function getEndpoint() {
        return ['clearing', 'sepainbatchs'];
    };

    SepaInbatchsService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return SepaInbatchsService;
})(_productService.ProductService);

exports.SepaInbatchsService = SepaInbatchsService;

SepaInbatchsService.Uid = ['clearing', 'sepainbatchs'].join('.');