'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var ReportService = (function (_ProductService) {
    function ReportService() {
        _classCallCheck(this, ReportService);

        _ProductService.call(this);
    }

    _inherits(ReportService, _ProductService);

    ReportService.prototype.getEndpoint = function getEndpoint() {
        return ['loyalty', 'reports'];
    };

    ReportService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return ReportService;
})(_productService.ProductService);

exports.ReportService = ReportService;

ReportService.Uid = ['loyalty', 'reports'].join('.');