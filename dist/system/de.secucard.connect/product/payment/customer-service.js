'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CustomerService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _productService = require('../product-service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CustomerService = exports.CustomerService = function (_ProductService) {
    _inherits(CustomerService, _ProductService);

    function CustomerService() {
        _classCallCheck(this, CustomerService);

        return _possibleConstructorReturn(this, (CustomerService.__proto__ || Object.getPrototypeOf(CustomerService)).call(this));
    }

    _createClass(CustomerService, [{
        key: 'getEndpoint',
        value: function getEndpoint() {
            return ['payment', 'customers'];
        }
    }, {
        key: 'getEventTargets',
        value: function getEventTargets() {
            return [];
        }
    }]);

    return CustomerService;
}(_productService.ProductService);

CustomerService.Uid = ['payment', 'customers'].join('.');
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wYXltZW50L2N1c3RvbWVyLXNlcnZpY2UuanMiXSwibmFtZXMiOlsiQ3VzdG9tZXJTZXJ2aWNlIiwiUHJvZHVjdFNlcnZpY2UiLCJVaWQiLCJqb2luIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFXQTs7Ozs7Ozs7SUFFYUEsZSxXQUFBQSxlOzs7QUFFVCwrQkFBYztBQUFBOztBQUFBO0FBRWI7Ozs7c0NBRWE7QUFDVixtQkFBTyxDQUFDLFNBQUQsRUFBWSxXQUFaLENBQVA7QUFDSDs7OzBDQUVpQjtBQUNkLG1CQUFPLEVBQVA7QUFDSDs7OztFQVpnQ0MsOEI7O0FBZ0JyQ0QsZ0JBQWdCRSxHQUFoQixHQUF1QixDQUFDLFNBQUQsRUFBWSxXQUFaLENBQUQsQ0FBMkJDLElBQTNCLENBQWdDLEdBQWhDLENBQXRCIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wYXltZW50L2N1c3RvbWVyLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9
