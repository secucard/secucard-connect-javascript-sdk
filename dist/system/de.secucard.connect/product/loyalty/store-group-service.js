'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StoreGroupService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _productService = require('../product-service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StoreGroupService = exports.StoreGroupService = function (_ProductService) {
    _inherits(StoreGroupService, _ProductService);

    function StoreGroupService() {
        _classCallCheck(this, StoreGroupService);

        return _possibleConstructorReturn(this, (StoreGroupService.__proto__ || Object.getPrototypeOf(StoreGroupService)).call(this));
    }

    _createClass(StoreGroupService, [{
        key: 'getEndpoint',
        value: function getEndpoint() {
            return ['loyalty', 'storegroups'];
        }
    }, {
        key: 'getEventTargets',
        value: function getEventTargets() {
            return [];
        }
    }]);

    return StoreGroupService;
}(_productService.ProductService);

StoreGroupService.Uid = ['loyalty', 'storegroups'].join('.');
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L3N0b3JlLWdyb3VwLXNlcnZpY2UuanMiXSwibmFtZXMiOlsiU3RvcmVHcm91cFNlcnZpY2UiLCJQcm9kdWN0U2VydmljZSIsIlVpZCIsImpvaW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQVdBOzs7Ozs7OztJQUVhQSxpQixXQUFBQSxpQjs7O0FBRVQsaUNBQWM7QUFBQTs7QUFBQTtBQUViOzs7O3NDQUVhO0FBQ1YsbUJBQU8sQ0FBQyxTQUFELEVBQVksYUFBWixDQUFQO0FBQ0g7OzswQ0FFaUI7QUFDZCxtQkFBTyxFQUFQO0FBQ0g7Ozs7RUFaa0NDLDhCOztBQWdCdkNELGtCQUFrQkUsR0FBbEIsR0FBeUIsQ0FBQyxTQUFELEVBQVksYUFBWixDQUFELENBQTZCQyxJQUE3QixDQUFrQyxHQUFsQyxDQUF4QiIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3QvbG95YWx0eS9zdG9yZS1ncm91cC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==
