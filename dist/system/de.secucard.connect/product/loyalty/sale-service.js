'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SaleService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _productService = require('../product-service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SaleService = exports.SaleService = function (_ProductService) {
    _inherits(SaleService, _ProductService);

    function SaleService() {
        _classCallCheck(this, SaleService);

        return _possibleConstructorReturn(this, (SaleService.__proto__ || Object.getPrototypeOf(SaleService)).call(this));
    }

    _createClass(SaleService, [{
        key: 'getEndpoint',
        value: function getEndpoint() {
            return ['loyalty', 'sales'];
        }
    }, {
        key: 'getEventTargets',
        value: function getEventTargets() {
            return [];
        }
    }]);

    return SaleService;
}(_productService.ProductService);

SaleService.Uid = ['loyalty', 'sales'].join('.');
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L3NhbGUtc2VydmljZS5qcyJdLCJuYW1lcyI6WyJTYWxlU2VydmljZSIsIlByb2R1Y3RTZXJ2aWNlIiwiVWlkIiwiam9pbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBV0E7Ozs7Ozs7O0lBRWFBLFcsV0FBQUEsVzs7O0FBRVQsMkJBQWM7QUFBQTs7QUFBQTtBQUViOzs7O3NDQUVhO0FBQ1YsbUJBQU8sQ0FBQyxTQUFELEVBQVksT0FBWixDQUFQO0FBQ0g7OzswQ0FFaUI7QUFDZCxtQkFBTyxFQUFQO0FBQ0g7Ozs7RUFaNEJDLDhCOztBQWdCakNELFlBQVlFLEdBQVosR0FBbUIsQ0FBQyxTQUFELEVBQVksT0FBWixDQUFELENBQXVCQyxJQUF2QixDQUE0QixHQUE1QixDQUFsQiIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3QvbG95YWx0eS9zYWxlLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9
