'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DeviceHistoriesService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _productService = require('../product-service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DeviceHistoriesService = exports.DeviceHistoriesService = function (_ProductService) {
    _inherits(DeviceHistoriesService, _ProductService);

    function DeviceHistoriesService() {
        _classCallCheck(this, DeviceHistoriesService);

        return _possibleConstructorReturn(this, (DeviceHistoriesService.__proto__ || Object.getPrototypeOf(DeviceHistoriesService)).call(this));
    }

    _createClass(DeviceHistoriesService, [{
        key: 'getEndpoint',
        value: function getEndpoint() {
            return ['smart', 'devicehistories'];
        }
    }, {
        key: 'getEventTargets',
        value: function getEventTargets() {
            return [];
        }
    }]);

    return DeviceHistoriesService;
}(_productService.ProductService);

DeviceHistoriesService.Uid = ['smart', 'devicehistories'].join('.');
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zbWFydC9kZXZpY2UtaGlzdG9yaWVzLmpzIl0sIm5hbWVzIjpbIkRldmljZUhpc3Rvcmllc1NlcnZpY2UiLCJQcm9kdWN0U2VydmljZSIsIlVpZCIsImpvaW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7Ozs7OztJQUVhQSxzQixXQUFBQSxzQjs7O0FBRVQsc0NBQWM7QUFBQTs7QUFBQTtBQUViOzs7O3NDQUVhO0FBQ1YsbUJBQU8sQ0FBQyxPQUFELEVBQVUsaUJBQVYsQ0FBUDtBQUNIOzs7MENBRWlCO0FBQ2QsbUJBQU8sRUFBUDtBQUNIOzs7O0VBWnVDQyw4Qjs7QUFnQjVDRCx1QkFBdUJFLEdBQXZCLEdBQThCLENBQUMsT0FBRCxFQUFVLGlCQUFWLENBQUQsQ0FBK0JDLElBQS9CLENBQW9DLEdBQXBDLENBQTdCIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zbWFydC9kZXZpY2UtaGlzdG9yaWVzLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==
