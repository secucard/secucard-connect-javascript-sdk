'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AppService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

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

        var _this = _possibleConstructorReturn(this, (AppService.__proto__ || Object.getPrototypeOf(AppService)).call(this));

        _this.isApp = true;

        _this.init();
        return _this;
    }

    _createClass(AppService, [{
        key: 'init',
        value: function init() {}
    }, {
        key: 'getEndpoint',
        value: function getEndpoint() {
            return ['general', 'apps'];
        }
    }, {
        key: 'getEventTargets',
        value: function getEventTargets() {
            return [];
        }
    }, {
        key: 'getUid',
        value: function getUid() {
            return _get(AppService.prototype.__proto__ || Object.getPrototypeOf(AppService.prototype), 'getUid', this).call(this) + '.' + this.getAppId();
        }
    }]);

    return AppService;
}(_productService.ProductService);

AppService.createWithMixin = function (ServiceMixin) {

    var Mixed = (0, _mixins2.default)(AppService, ServiceMixin);
    return new Mixed();
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9hcHAvYXBwLXNlcnZpY2UuanMiXSwibmFtZXMiOlsiQXBwU2VydmljZSIsImlzQXBwIiwiaW5pdCIsImdldEFwcElkIiwiUHJvZHVjdFNlcnZpY2UiLCJjcmVhdGVXaXRoTWl4aW4iLCJTZXJ2aWNlTWl4aW4iLCJNaXhlZCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFXQTs7QUFDQTs7Ozs7Ozs7Ozs7O0lBQ2FBLFUsV0FBQUEsVTs7O0FBSVQsMEJBQWM7QUFBQTs7QUFBQTs7QUFBQSxjQUZkQyxLQUVjLEdBRk4sSUFFTTs7QUFFVixjQUFLQyxJQUFMO0FBRlU7QUFHYjs7OzsrQkFFTSxDQUVOOzs7c0NBRWE7QUFDVixtQkFBTyxDQUFDLFNBQUQsRUFBWSxNQUFaLENBQVA7QUFDSDs7OzBDQUlpQjtBQUNkLG1CQUFPLEVBQVA7QUFDSDs7O2lDQUVRO0FBQ0wsbUJBQU8saUhBQWlCLEdBQWpCLEdBQXVCLEtBQUtDLFFBQUwsRUFBOUI7QUFDSDs7OztFQXpCMkJDLDhCOztBQTZCaENKLFdBQVdLLGVBQVgsR0FBNkIsVUFBQ0MsWUFBRCxFQUFrQjs7QUFFM0MsUUFBSUMsUUFBUSxzQkFBT1AsVUFBUCxFQUFtQk0sWUFBbkIsQ0FBWjtBQUNBLFdBQU8sSUFBSUMsS0FBSixFQUFQO0FBRUgsQ0FMRCIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3QvYXBwL2FwcC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==
