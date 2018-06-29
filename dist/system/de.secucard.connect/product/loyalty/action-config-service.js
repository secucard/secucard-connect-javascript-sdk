'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ActionConfigService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _productService = require('../product-service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ActionConfigService = exports.ActionConfigService = function (_ProductService) {
    _inherits(ActionConfigService, _ProductService);

    function ActionConfigService() {
        _classCallCheck(this, ActionConfigService);

        return _possibleConstructorReturn(this, (ActionConfigService.__proto__ || Object.getPrototypeOf(ActionConfigService)).call(this));
    }

    _createClass(ActionConfigService, [{
        key: 'getEndpoint',
        value: function getEndpoint() {
            return ['loyalty', 'actionconfigs'];
        }
    }, {
        key: 'getEventTargets',
        value: function getEventTargets() {
            return [];
        }
    }, {
        key: 'checkConfirmationCode',
        value: function checkConfirmationCode(id, code) {
            return this.execute(id, 'checkConfirmationCode', code);
        }
    }, {
        key: 'processConfirmationCode',
        value: function processConfirmationCode(id) {
            return this.execute(id, 'processConfirmationCode');
        }
    }, {
        key: 'cancelConfirmationCode',
        value: function cancelConfirmationCode(id) {
            return this.execute(id, 'cancelConfirmationCode');
        }
    }]);

    return ActionConfigService;
}(_productService.ProductService);

ActionConfigService.Uid = ['loyalty', 'actionconfigs'].join('.');
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L2FjdGlvbi1jb25maWctc2VydmljZS5qcyJdLCJuYW1lcyI6WyJBY3Rpb25Db25maWdTZXJ2aWNlIiwiaWQiLCJjb2RlIiwiZXhlY3V0ZSIsIlByb2R1Y3RTZXJ2aWNlIiwiVWlkIiwiam9pbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBV0E7Ozs7Ozs7O0lBRWFBLG1CLFdBQUFBLG1COzs7QUFFVCxtQ0FBYztBQUFBOztBQUFBO0FBRWI7Ozs7c0NBRWE7QUFDVixtQkFBTyxDQUFDLFNBQUQsRUFBWSxlQUFaLENBQVA7QUFDSDs7OzBDQUVpQjtBQUNkLG1CQUFPLEVBQVA7QUFDSDs7OzhDQUVxQkMsRSxFQUFJQyxJLEVBQU07QUFDNUIsbUJBQU8sS0FBS0MsT0FBTCxDQUFhRixFQUFiLEVBQWlCLHVCQUFqQixFQUEwQ0MsSUFBMUMsQ0FBUDtBQUNIOzs7Z0RBRXVCRCxFLEVBQUk7QUFDeEIsbUJBQU8sS0FBS0UsT0FBTCxDQUFhRixFQUFiLEVBQWlCLHlCQUFqQixDQUFQO0FBQ0g7OzsrQ0FFc0JBLEUsRUFBSTtBQUN2QixtQkFBTyxLQUFLRSxPQUFMLENBQWFGLEVBQWIsRUFBaUIsd0JBQWpCLENBQVA7QUFDSDs7OztFQXhCb0NHLDhCOztBQTRCekNKLG9CQUFvQkssR0FBcEIsR0FBMkIsQ0FBQyxTQUFELEVBQVksZUFBWixDQUFELENBQStCQyxJQUEvQixDQUFvQyxHQUFwQyxDQUExQiIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3QvbG95YWx0eS9hY3Rpb24tY29uZmlnLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9
