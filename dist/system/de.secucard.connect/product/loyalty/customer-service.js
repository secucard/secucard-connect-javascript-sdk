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
        key: 'retrieveTemplates',
        value: function retrieveTemplates(merchantId) {
            return this.retrieveWithAction('me', 'templateList', merchantId);
        }
    }, {
        key: 'getEndpoint',
        value: function getEndpoint() {
            return ['loyalty', 'customers'];
        }
    }, {
        key: 'getEventTargets',
        value: function getEventTargets() {
            return [];
        }
    }, {
        key: 'assignPaymentContainer',
        value: function assignPaymentContainer(customerId, paymentContainerId) {
            return this.execute(customerId, 'assignPaymentcontainer', paymentContainerId);
        }
    }, {
        key: 'removePaymentContainer',
        value: function removePaymentContainer(customerId, paymentContainerId) {
            return this.removeWithAction(customerId, 'assignPaymentcontainer', paymentContainerId);
        }
    }]);

    return CustomerService;
}(_productService.ProductService);

CustomerService.Uid = ['loyalty', 'customers'].join('.');
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L2N1c3RvbWVyLXNlcnZpY2UuanMiXSwibmFtZXMiOlsiQ3VzdG9tZXJTZXJ2aWNlIiwibWVyY2hhbnRJZCIsInJldHJpZXZlV2l0aEFjdGlvbiIsImN1c3RvbWVySWQiLCJwYXltZW50Q29udGFpbmVySWQiLCJleGVjdXRlIiwicmVtb3ZlV2l0aEFjdGlvbiIsIlByb2R1Y3RTZXJ2aWNlIiwiVWlkIiwiam9pbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBV0E7Ozs7Ozs7O0lBRWFBLGUsV0FBQUEsZTs7O0FBRVQsK0JBQWM7QUFBQTs7QUFBQTtBQUViOzs7OzBDQUVpQkMsVSxFQUFZO0FBQzFCLG1CQUFPLEtBQUtDLGtCQUFMLENBQXdCLElBQXhCLEVBQThCLGNBQTlCLEVBQThDRCxVQUE5QyxDQUFQO0FBQ0g7OztzQ0FFYTtBQUNWLG1CQUFPLENBQUMsU0FBRCxFQUFZLFdBQVosQ0FBUDtBQUNIOzs7MENBRWlCO0FBQ2QsbUJBQU8sRUFBUDtBQUNIOzs7K0NBUXNCRSxVLEVBQVlDLGtCLEVBQW9CO0FBQ25ELG1CQUFPLEtBQUtDLE9BQUwsQ0FBYUYsVUFBYixFQUF5Qix3QkFBekIsRUFBbURDLGtCQUFuRCxDQUFQO0FBQ0g7OzsrQ0FRc0JELFUsRUFBWUMsa0IsRUFBb0I7QUFDbkQsbUJBQU8sS0FBS0UsZ0JBQUwsQ0FBc0JILFVBQXRCLEVBQWtDLHdCQUFsQyxFQUE0REMsa0JBQTVELENBQVA7QUFDSDs7OztFQXBDZ0NHLDhCOztBQXVDckNQLGdCQUFnQlEsR0FBaEIsR0FBdUIsQ0FBQyxTQUFELEVBQVksV0FBWixDQUFELENBQTJCQyxJQUEzQixDQUFnQyxHQUFoQyxDQUF0QiIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3QvbG95YWx0eS9jdXN0b21lci1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==
