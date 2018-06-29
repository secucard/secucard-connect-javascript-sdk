'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CardService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _productService = require('../product-service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CardService = exports.CardService = function (_ProductService) {
    _inherits(CardService, _ProductService);

    function CardService() {
        _classCallCheck(this, CardService);

        return _possibleConstructorReturn(this, (CardService.__proto__ || Object.getPrototypeOf(CardService)).call(this));
    }

    _createClass(CardService, [{
        key: 'getEndpoint',
        value: function getEndpoint() {
            return ['loyalty', 'cards'];
        }
    }, {
        key: 'getEventTargets',
        value: function getEventTargets() {
            return [];
        }
    }, {
        key: 'assignUser',
        value: function assignUser(cardNumber, pin) {
            return this.execute(cardNumber, 'assignUser', 'me', pin);
        }
    }, {
        key: 'removeUser',
        value: function removeUser(cardNumber) {
            return this.removeWithAction(cardNumber, 'assignUser', 'me');
        }
    }]);

    return CardService;
}(_productService.ProductService);

CardService.Uid = ['loyalty', 'cards'].join('.');
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L2NhcmQtc2VydmljZS5qcyJdLCJuYW1lcyI6WyJDYXJkU2VydmljZSIsImNhcmROdW1iZXIiLCJwaW4iLCJleGVjdXRlIiwicmVtb3ZlV2l0aEFjdGlvbiIsIlByb2R1Y3RTZXJ2aWNlIiwiVWlkIiwiam9pbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBV0E7Ozs7Ozs7O0lBRWFBLFcsV0FBQUEsVzs7O0FBRVQsMkJBQWM7QUFBQTs7QUFBQTtBQUViOzs7O3NDQUVhO0FBQ1YsbUJBQU8sQ0FBQyxTQUFELEVBQVksT0FBWixDQUFQO0FBQ0g7OzswQ0FFaUI7QUFDZCxtQkFBTyxFQUFQO0FBQ0g7OzttQ0FFVUMsVSxFQUFZQyxHLEVBQUs7QUFDeEIsbUJBQU8sS0FBS0MsT0FBTCxDQUFhRixVQUFiLEVBQXlCLFlBQXpCLEVBQXVDLElBQXZDLEVBQTZDQyxHQUE3QyxDQUFQO0FBQ0g7OzttQ0FFVUQsVSxFQUFZO0FBQ25CLG1CQUFPLEtBQUtHLGdCQUFMLENBQXNCSCxVQUF0QixFQUFrQyxZQUFsQyxFQUFnRCxJQUFoRCxDQUFQO0FBQ0g7Ozs7RUFwQjRCSSw4Qjs7QUF3QmpDTCxZQUFZTSxHQUFaLEdBQW1CLENBQUMsU0FBRCxFQUFZLE9BQVosQ0FBRCxDQUF1QkMsSUFBdkIsQ0FBNEIsR0FBNUIsQ0FBbEIiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L2xveWFsdHkvY2FyZC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==
