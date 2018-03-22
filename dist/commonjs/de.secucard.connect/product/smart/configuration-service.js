'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var ConfigurationService = (function (_ProductService) {
    _inherits(ConfigurationService, _ProductService);

    function ConfigurationService() {
        _classCallCheck(this, ConfigurationService);

        _ProductService.call(this);
    }

    ConfigurationService.prototype.getEndpoint = function getEndpoint() {
        return ['smart', 'configurations'];
    };

    ConfigurationService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    ConfigurationService.prototype.importConfiguration = function importConfiguration(id, data) {
        return this.execute(id, "importConfiguration", null, data, null);
    };

    return ConfigurationService;
})(_productService.ProductService);

exports.ConfigurationService = ConfigurationService;

ConfigurationService.Uid = ['smart', 'configurations'].join('.');