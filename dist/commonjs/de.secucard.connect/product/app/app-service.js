'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var _utilMixins = require('../../util/mixins');

var _utilMixins2 = _interopRequireDefault(_utilMixins);

var AppService = (function (_ProductService) {
    _inherits(AppService, _ProductService);

    function AppService() {
        _classCallCheck(this, AppService);

        _ProductService.call(this);
        this.isApp = true;
        this.init();
    }

    AppService.prototype.init = function init() {};

    AppService.prototype.getEndpoint = function getEndpoint() {
        return ['general', 'apps'];
    };

    AppService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    AppService.prototype.getUid = function getUid() {
        return _ProductService.prototype.getUid.call(this) + '.' + this.getAppId();
    };

    return AppService;
})(_productService.ProductService);

exports.AppService = AppService;

AppService.createWithMixin = function (ServiceMixin) {

    var Mixed = _utilMixins2['default'](AppService, ServiceMixin);
    return new Mixed();
};