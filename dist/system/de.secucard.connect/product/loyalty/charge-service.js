'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ChargeService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _productService = require('../product-service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChargeService = exports.ChargeService = function (_ProductService) {
    _inherits(ChargeService, _ProductService);

    function ChargeService() {
        _classCallCheck(this, ChargeService);

        return _possibleConstructorReturn(this, (ChargeService.__proto__ || Object.getPrototypeOf(ChargeService)).call(this));
    }

    _createClass(ChargeService, [{
        key: 'getEndpoint',
        value: function getEndpoint() {
            return ['loyalty', 'charges'];
        }
    }, {
        key: 'getEventTargets',
        value: function getEventTargets() {
            return [];
        }
    }]);

    return ChargeService;
}(_productService.ProductService);

ChargeService.Uid = ['loyalty', 'charges'].join('.');
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L2NoYXJnZS1zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbIkNoYXJnZVNlcnZpY2UiLCJQcm9kdWN0U2VydmljZSIsIlVpZCIsImpvaW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQVdBOzs7Ozs7OztJQUVhQSxhLFdBQUFBLGE7OztBQUVULDZCQUFjO0FBQUE7O0FBQUE7QUFFYjs7OztzQ0FFYTtBQUNWLG1CQUFPLENBQUMsU0FBRCxFQUFZLFNBQVosQ0FBUDtBQUNIOzs7MENBRWlCO0FBQ2QsbUJBQU8sRUFBUDtBQUNIOzs7O0VBWjhCQyw4Qjs7QUFnQm5DRCxjQUFjRSxHQUFkLEdBQXFCLENBQUMsU0FBRCxFQUFZLFNBQVosQ0FBRCxDQUF5QkMsSUFBekIsQ0FBOEIsR0FBOUIsQ0FBcEIiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L2xveWFsdHkvY2hhcmdlLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9
