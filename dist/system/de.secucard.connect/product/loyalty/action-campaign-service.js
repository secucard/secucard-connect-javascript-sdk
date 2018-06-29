'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ActionCampaignService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _productService = require('../product-service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ActionCampaignService = exports.ActionCampaignService = function (_ProductService) {
    _inherits(ActionCampaignService, _ProductService);

    function ActionCampaignService() {
        _classCallCheck(this, ActionCampaignService);

        return _possibleConstructorReturn(this, (ActionCampaignService.__proto__ || Object.getPrototypeOf(ActionCampaignService)).call(this));
    }

    _createClass(ActionCampaignService, [{
        key: 'getCampaignRemoveAllowed',
        value: function getCampaignRemoveAllowed(id) {
            return this.retrieveWithAction(id, 'campaignRemoveAllowed');
        }
    }, {
        key: 'getEndpoint',
        value: function getEndpoint() {
            return ['loyalty', 'actioncampaigns'];
        }
    }, {
        key: 'getEventTargets',
        value: function getEventTargets() {
            return [];
        }
    }]);

    return ActionCampaignService;
}(_productService.ProductService);

ActionCampaignService.Uid = ['loyalty', 'actioncampaigns'].join('.');
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L2FjdGlvbi1jYW1wYWlnbi1zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbIkFjdGlvbkNhbXBhaWduU2VydmljZSIsImlkIiwicmV0cmlldmVXaXRoQWN0aW9uIiwiUHJvZHVjdFNlcnZpY2UiLCJVaWQiLCJqb2luIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFXQTs7Ozs7Ozs7SUFFYUEscUIsV0FBQUEscUI7OztBQUVULHFDQUFjO0FBQUE7O0FBQUE7QUFFYjs7OztpREFFd0JDLEUsRUFBSTtBQUN6QixtQkFBTyxLQUFLQyxrQkFBTCxDQUF3QkQsRUFBeEIsRUFBNEIsdUJBQTVCLENBQVA7QUFDSDs7O3NDQUVhO0FBQ1YsbUJBQU8sQ0FBQyxTQUFELEVBQVksaUJBQVosQ0FBUDtBQUNIOzs7MENBRWlCO0FBQ2QsbUJBQU8sRUFBUDtBQUNIOzs7O0VBaEJzQ0UsOEI7O0FBb0IzQ0gsc0JBQXNCSSxHQUF0QixHQUE2QixDQUFDLFNBQUQsRUFBWSxpQkFBWixDQUFELENBQWlDQyxJQUFqQyxDQUFzQyxHQUF0QyxDQUE1QiIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3QvbG95YWx0eS9hY3Rpb24tY2FtcGFpZ24tc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=
