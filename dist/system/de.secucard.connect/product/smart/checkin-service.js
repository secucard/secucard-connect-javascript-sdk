'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CheckinService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _productService = require('../product-service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CheckinService = exports.CheckinService = function (_ProductService) {
    _inherits(CheckinService, _ProductService);

    function CheckinService() {
        _classCallCheck(this, CheckinService);

        return _possibleConstructorReturn(this, (CheckinService.__proto__ || Object.getPrototypeOf(CheckinService)).call(this));
    }

    _createClass(CheckinService, [{
        key: 'getEndpoint',
        value: function getEndpoint() {
            return ['smart', 'checkins'];
        }
    }, {
        key: 'getEventTargets',
        value: function getEventTargets() {
            return ['smart.checkins'];
        }
    }]);

    return CheckinService;
}(_productService.ProductService);

CheckinService.Uid = ['smart', 'checkins'].join('.');
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zbWFydC9jaGVja2luLXNlcnZpY2UuanMiXSwibmFtZXMiOlsiQ2hlY2tpblNlcnZpY2UiLCJQcm9kdWN0U2VydmljZSIsIlVpZCIsImpvaW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQVdBOzs7Ozs7OztJQUVhQSxjLFdBQUFBLGM7OztBQUVULDhCQUFjO0FBQUE7O0FBQUE7QUFFYjs7OztzQ0FFYTtBQUNWLG1CQUFPLENBQUMsT0FBRCxFQUFVLFVBQVYsQ0FBUDtBQUNIOzs7MENBRWlCO0FBQ2QsbUJBQU8sQ0FBQyxnQkFBRCxDQUFQO0FBQ0g7Ozs7RUFaK0JDLDhCOztBQWlCcENELGVBQWVFLEdBQWYsR0FBc0IsQ0FBQyxPQUFELEVBQVUsVUFBVixDQUFELENBQXdCQyxJQUF4QixDQUE2QixHQUE3QixDQUFyQiIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3Qvc21hcnQvY2hlY2tpbi1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==
