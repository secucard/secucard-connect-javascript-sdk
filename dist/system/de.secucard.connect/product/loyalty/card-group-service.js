'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CardGroupService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _productService = require('../product-service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CardGroupService = exports.CardGroupService = function (_ProductService) {
    _inherits(CardGroupService, _ProductService);

    function CardGroupService() {
        _classCallCheck(this, CardGroupService);

        return _possibleConstructorReturn(this, (CardGroupService.__proto__ || Object.getPrototypeOf(CardGroupService)).call(this));
    }

    _createClass(CardGroupService, [{
        key: 'getEndpoint',
        value: function getEndpoint() {
            return ['loyalty', 'cardgroups'];
        }
    }, {
        key: 'getEventTargets',
        value: function getEventTargets() {
            return [];
        }
    }]);

    return CardGroupService;
}(_productService.ProductService);

CardGroupService.Uid = ['loyalty', 'cardgroups'].join('.');
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L2NhcmQtZ3JvdXAtc2VydmljZS5qcyJdLCJuYW1lcyI6WyJDYXJkR3JvdXBTZXJ2aWNlIiwiUHJvZHVjdFNlcnZpY2UiLCJVaWQiLCJqb2luIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFXQTs7Ozs7Ozs7SUFFYUEsZ0IsV0FBQUEsZ0I7OztBQUVULGdDQUFjO0FBQUE7O0FBQUE7QUFFYjs7OztzQ0FFYTtBQUNWLG1CQUFPLENBQUMsU0FBRCxFQUFZLFlBQVosQ0FBUDtBQUNIOzs7MENBRWlCO0FBQ2QsbUJBQU8sRUFBUDtBQUNIOzs7O0VBWmlDQyw4Qjs7QUFnQnRDRCxpQkFBaUJFLEdBQWpCLEdBQXdCLENBQUMsU0FBRCxFQUFZLFlBQVosQ0FBRCxDQUE0QkMsSUFBNUIsQ0FBaUMsR0FBakMsQ0FBdkIiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L2xveWFsdHkvY2FyZC1ncm91cC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==
