'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.IdentContractService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _productService = require('../product-service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IdentContractService = exports.IdentContractService = function (_ProductService) {
    _inherits(IdentContractService, _ProductService);

    function IdentContractService() {
        _classCallCheck(this, IdentContractService);

        return _possibleConstructorReturn(this, (IdentContractService.__proto__ || Object.getPrototypeOf(IdentContractService)).call(this));
    }

    _createClass(IdentContractService, [{
        key: 'getEndpoint',
        value: function getEndpoint() {
            return ['services', 'identcontracts'];
        }
    }, {
        key: 'getEventTargets',
        value: function getEventTargets() {
            return [];
        }
    }]);

    return IdentContractService;
}(_productService.ProductService);

IdentContractService.Uid = ['services', 'identcontracts'].join('.');
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zZXJ2aWNlcy9pZGVudC1jb250cmFjdC1zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbIklkZW50Q29udHJhY3RTZXJ2aWNlIiwiUHJvZHVjdFNlcnZpY2UiLCJVaWQiLCJqb2luIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFXQTs7Ozs7Ozs7SUFFYUEsb0IsV0FBQUEsb0I7OztBQUVULG9DQUFjO0FBQUE7O0FBQUE7QUFFYjs7OztzQ0FFYTtBQUNWLG1CQUFPLENBQUMsVUFBRCxFQUFhLGdCQUFiLENBQVA7QUFDSDs7OzBDQUVpQjtBQUNkLG1CQUFPLEVBQVA7QUFDSDs7OztFQVpxQ0MsOEI7O0FBZ0IxQ0QscUJBQXFCRSxHQUFyQixHQUE0QixDQUFDLFVBQUQsRUFBYSxnQkFBYixDQUFELENBQWlDQyxJQUFqQyxDQUFzQyxHQUF0QyxDQUEzQiIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3Qvc2VydmljZXMvaWRlbnQtY29udHJhY3Qtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=
