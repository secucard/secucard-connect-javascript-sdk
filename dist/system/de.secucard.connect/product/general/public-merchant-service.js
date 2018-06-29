'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PublicMerchantService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _productService = require('../product-service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PublicMerchantService = exports.PublicMerchantService = function (_ProductService) {
    _inherits(PublicMerchantService, _ProductService);

    function PublicMerchantService() {
        _classCallCheck(this, PublicMerchantService);

        return _possibleConstructorReturn(this, (PublicMerchantService.__proto__ || Object.getPrototypeOf(PublicMerchantService)).call(this));
    }

    _createClass(PublicMerchantService, [{
        key: 'getEndpoint',
        value: function getEndpoint() {
            return ['general', 'publicmerchants'];
        }
    }, {
        key: 'getEventTargets',
        value: function getEventTargets() {
            return [];
        }
    }]);

    return PublicMerchantService;
}(_productService.ProductService);

PublicMerchantService.Uid = ['general', 'publicmerchants'].join('.');
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9nZW5lcmFsL3B1YmxpYy1tZXJjaGFudC1zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbIlB1YmxpY01lcmNoYW50U2VydmljZSIsIlByb2R1Y3RTZXJ2aWNlIiwiVWlkIiwiam9pbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBV0E7Ozs7Ozs7O0lBRWFBLHFCLFdBQUFBLHFCOzs7QUFFVCxxQ0FBYztBQUFBOztBQUFBO0FBRWI7Ozs7c0NBRWE7QUFDVixtQkFBTyxDQUFDLFNBQUQsRUFBWSxpQkFBWixDQUFQO0FBQ0g7OzswQ0FFaUI7QUFDZCxtQkFBTyxFQUFQO0FBQ0g7Ozs7RUFac0NDLDhCOztBQWdCM0NELHNCQUFzQkUsR0FBdEIsR0FBNkIsQ0FBQyxTQUFELEVBQVksaUJBQVosQ0FBRCxDQUFpQ0MsSUFBakMsQ0FBc0MsR0FBdEMsQ0FBNUIiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L2dlbmVyYWwvcHVibGljLW1lcmNoYW50LXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9
