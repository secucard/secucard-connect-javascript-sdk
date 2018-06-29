'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ContainerService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _productService = require('../product-service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContainerService = exports.ContainerService = function (_ProductService) {
    _inherits(ContainerService, _ProductService);

    function ContainerService() {
        _classCallCheck(this, ContainerService);

        return _possibleConstructorReturn(this, (ContainerService.__proto__ || Object.getPrototypeOf(ContainerService)).call(this));
    }

    _createClass(ContainerService, [{
        key: 'getEndpoint',
        value: function getEndpoint() {
            return ['payment', 'containers'];
        }
    }, {
        key: 'getEventTargets',
        value: function getEventTargets() {
            return [];
        }
    }, {
        key: 'assignCustomer',
        value: function assignCustomer(containerId, customerId) {
            return this.execute(containerId, 'assign', customerId);
        }
    }, {
        key: 'removeCustomer',
        value: function removeCustomer(containerId) {
            return this.removeWithAction(containerId, 'assign');
        }
    }]);

    return ContainerService;
}(_productService.ProductService);

ContainerService.Uid = ['payment', 'containers'].join('.');
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wYXltZW50L2NvbnRhaW5lci1zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbIkNvbnRhaW5lclNlcnZpY2UiLCJjb250YWluZXJJZCIsImN1c3RvbWVySWQiLCJleGVjdXRlIiwicmVtb3ZlV2l0aEFjdGlvbiIsIlByb2R1Y3RTZXJ2aWNlIiwiVWlkIiwiam9pbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBV0E7Ozs7Ozs7O0lBRWFBLGdCLFdBQUFBLGdCOzs7QUFFVCxnQ0FBYztBQUFBOztBQUFBO0FBRWI7Ozs7c0NBRWE7QUFDVixtQkFBTyxDQUFDLFNBQUQsRUFBWSxZQUFaLENBQVA7QUFDSDs7OzBDQUVpQjtBQUNkLG1CQUFPLEVBQVA7QUFDSDs7O3VDQUVjQyxXLEVBQWFDLFUsRUFBWTtBQUNwQyxtQkFBTyxLQUFLQyxPQUFMLENBQWFGLFdBQWIsRUFBMEIsUUFBMUIsRUFBb0NDLFVBQXBDLENBQVA7QUFDSDs7O3VDQUVjRCxXLEVBQWE7QUFDeEIsbUJBQU8sS0FBS0csZ0JBQUwsQ0FBc0JILFdBQXRCLEVBQW1DLFFBQW5DLENBQVA7QUFDSDs7OztFQXBCaUNJLDhCOztBQXdCdENMLGlCQUFpQk0sR0FBakIsR0FBd0IsQ0FBQyxTQUFELEVBQVksWUFBWixDQUFELENBQTRCQyxJQUE1QixDQUFpQyxHQUFqQyxDQUF2QiIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3QvcGF5bWVudC9jb250YWluZXItc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=
