'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MerchantService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _productService = require('../product-service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MerchantService = exports.MerchantService = function (_ProductService) {
    _inherits(MerchantService, _ProductService);

    function MerchantService() {
        _classCallCheck(this, MerchantService);

        return _possibleConstructorReturn(this, (MerchantService.__proto__ || Object.getPrototypeOf(MerchantService)).call(this));
    }

    _createClass(MerchantService, [{
        key: 'getEndpoint',
        value: function getEndpoint() {
            return ['general', 'merchants'];
        }
    }, {
        key: 'getEventTargets',
        value: function getEventTargets() {
            return [];
        }
    }]);

    return MerchantService;
}(_productService.ProductService);

MerchantService.Uid = ['general', 'merchants'].join('.');
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9nZW5lcmFsL21lcmNoYW50LXNlcnZpY2UuanMiXSwibmFtZXMiOlsiTWVyY2hhbnRTZXJ2aWNlIiwiUHJvZHVjdFNlcnZpY2UiLCJVaWQiLCJqb2luIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFXQTs7Ozs7Ozs7SUFFYUEsZSxXQUFBQSxlOzs7QUFFVCwrQkFBYztBQUFBOztBQUFBO0FBRWI7Ozs7c0NBRWE7QUFDVixtQkFBTyxDQUFDLFNBQUQsRUFBWSxXQUFaLENBQVA7QUFDSDs7OzBDQUVpQjtBQUNkLG1CQUFPLEVBQVA7QUFDSDs7OztFQVpnQ0MsOEI7O0FBZXJDRCxnQkFBZ0JFLEdBQWhCLEdBQXVCLENBQUMsU0FBRCxFQUFZLFdBQVosQ0FBRCxDQUEyQkMsSUFBM0IsQ0FBZ0MsR0FBaEMsQ0FBdEIiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L2dlbmVyYWwvbWVyY2hhbnQtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=
