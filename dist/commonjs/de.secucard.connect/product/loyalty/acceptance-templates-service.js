'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var AcceptancePointTemplatesService = (function (_ProductService) {
    _inherits(AcceptancePointTemplatesService, _ProductService);

    function AcceptancePointTemplatesService() {
        _classCallCheck(this, AcceptancePointTemplatesService);

        _ProductService.call(this);
    }

    AcceptancePointTemplatesService.prototype.getEndpoint = function getEndpoint() {
        return ['loyalty', 'acceptancepointtemplates'];
    };

    AcceptancePointTemplatesService.prototype.getEventTargets = function getEventTargets() {
        return ['loyalty.acceptancepointtemplates'];
    };

    return AcceptancePointTemplatesService;
})(_productService.ProductService);

exports.AcceptancePointTemplatesService = AcceptancePointTemplatesService;

AcceptancePointTemplatesService.Uid = ['loyalty', 'acceptancepointtemplates'].join('.');