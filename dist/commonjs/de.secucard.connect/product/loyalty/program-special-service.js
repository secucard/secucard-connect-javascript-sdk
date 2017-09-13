'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var ProgramSpecialService = (function (_ProductService) {
    function ProgramSpecialService() {
        _classCallCheck(this, ProgramSpecialService);

        _ProductService.call(this);
    }

    _inherits(ProgramSpecialService, _ProductService);

    ProgramSpecialService.prototype.getEndpoint = function getEndpoint() {
        return ['loyalty', 'programspecials'];
    };

    ProgramSpecialService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return ProgramSpecialService;
})(_productService.ProductService);

exports.ProgramSpecialService = ProgramSpecialService;

ProgramSpecialService.Uid = ['loyalty', 'programspecials'].join('.');