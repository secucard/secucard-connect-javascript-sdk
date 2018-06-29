'use strict';

exports.__esModule = true;
exports.ProgramSpecialService = undefined;

var _productService = require('../product-service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProgramSpecialService = exports.ProgramSpecialService = function (_ProductService) {
    _inherits(ProgramSpecialService, _ProductService);

    function ProgramSpecialService() {
        _classCallCheck(this, ProgramSpecialService);

        return _possibleConstructorReturn(this, _ProductService.call(this));
    }

    ProgramSpecialService.prototype.getEndpoint = function getEndpoint() {
        return ['loyalty', 'programspecials'];
    };

    ProgramSpecialService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return ProgramSpecialService;
}(_productService.ProductService);

ProgramSpecialService.Uid = ['loyalty', 'programspecials'].join('.');