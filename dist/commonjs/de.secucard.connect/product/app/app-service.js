'use strict';

exports.__esModule = true;
exports.AppService = undefined;

var _productService = require('../product-service');

var _mixins = require('../../util/mixins');

var _mixins2 = _interopRequireDefault(_mixins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AppService = exports.AppService = function (_ProductService) {
    _inherits(AppService, _ProductService);

    function AppService() {
        _classCallCheck(this, AppService);

        var _this = _possibleConstructorReturn(this, _ProductService.call(this));

        _this.isApp = true;

        _this.init();
        return _this;
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
}(_productService.ProductService);

AppService.createWithMixin = function (ServiceMixin) {

    var Mixed = (0, _mixins2.default)(AppService, ServiceMixin);
    return new Mixed();
};