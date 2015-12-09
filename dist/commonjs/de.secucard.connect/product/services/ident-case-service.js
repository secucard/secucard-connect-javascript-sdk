'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var IdentCaseService = (function (_ProductService) {
    function IdentCaseService() {
        _classCallCheck(this, IdentCaseService);

        _ProductService.call(this);
    }

    _inherits(IdentCaseService, _ProductService);

    IdentCaseService.prototype.getEndpoint = function getEndpoint() {
        return ['services', 'identcases'];
    };

    IdentCaseService.prototype.getEventTargets = function getEventTargets() {
        return ['services.identcases'];
    };

    return IdentCaseService;
})(_productService.ProductService);

exports.IdentCaseService = IdentCaseService;

IdentCaseService.Uid = ['services', 'identcases'].join('.');