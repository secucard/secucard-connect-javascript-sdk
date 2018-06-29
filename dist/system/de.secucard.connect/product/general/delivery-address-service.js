'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DeliveryAddressService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _productService = require('../product-service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DeliveryAddressService = exports.DeliveryAddressService = function (_ProductService) {
    _inherits(DeliveryAddressService, _ProductService);

    function DeliveryAddressService() {
        _classCallCheck(this, DeliveryAddressService);

        return _possibleConstructorReturn(this, (DeliveryAddressService.__proto__ || Object.getPrototypeOf(DeliveryAddressService)).call(this));
    }

    _createClass(DeliveryAddressService, [{
        key: 'getEndpoint',
        value: function getEndpoint() {
            return ['general', 'deliveryaddresses'];
        }
    }, {
        key: 'getEventTargets',
        value: function getEventTargets() {
            return [];
        }
    }]);

    return DeliveryAddressService;
}(_productService.ProductService);

DeliveryAddressService.Uid = ['general', 'deliveryaddresses'].join('.');
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9nZW5lcmFsL2RlbGl2ZXJ5LWFkZHJlc3Mtc2VydmljZS5qcyJdLCJuYW1lcyI6WyJEZWxpdmVyeUFkZHJlc3NTZXJ2aWNlIiwiUHJvZHVjdFNlcnZpY2UiLCJVaWQiLCJqb2luIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFXQTs7Ozs7Ozs7SUFFYUEsc0IsV0FBQUEsc0I7OztBQUVULHNDQUFjO0FBQUE7O0FBQUE7QUFFYjs7OztzQ0FFYTtBQUNWLG1CQUFPLENBQUMsU0FBRCxFQUFZLG1CQUFaLENBQVA7QUFDSDs7OzBDQUVpQjtBQUNkLG1CQUFPLEVBQVA7QUFDSDs7OztFQVp1Q0MsOEI7O0FBZ0I1Q0QsdUJBQXVCRSxHQUF2QixHQUE4QixDQUFDLFNBQUQsRUFBWSxtQkFBWixDQUFELENBQW1DQyxJQUFuQyxDQUF3QyxHQUF4QyxDQUE3QiIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3QvZ2VuZXJhbC9kZWxpdmVyeS1hZGRyZXNzLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9
