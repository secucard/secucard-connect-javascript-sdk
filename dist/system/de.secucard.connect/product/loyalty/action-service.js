'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ActionService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _productService = require('../product-service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ActionService = exports.ActionService = function (_ProductService) {
    _inherits(ActionService, _ProductService);

    function ActionService() {
        _classCallCheck(this, ActionService);

        return _possibleConstructorReturn(this, (ActionService.__proto__ || Object.getPrototypeOf(ActionService)).call(this));
    }

    _createClass(ActionService, [{
        key: 'getEndpoint',
        value: function getEndpoint() {
            return ['loyalty', 'actions'];
        }
    }, {
        key: 'getEventTargets',
        value: function getEventTargets() {
            return [];
        }
    }]);

    return ActionService;
}(_productService.ProductService);

ActionService.Uid = ['loyalty', 'actions'].join('.');
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L2FjdGlvbi1zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbIkFjdGlvblNlcnZpY2UiLCJQcm9kdWN0U2VydmljZSIsIlVpZCIsImpvaW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQVdBOzs7Ozs7OztJQUVhQSxhLFdBQUFBLGE7OztBQUVULDZCQUFjO0FBQUE7O0FBQUE7QUFFYjs7OztzQ0FFYTtBQUNWLG1CQUFPLENBQUMsU0FBRCxFQUFZLFNBQVosQ0FBUDtBQUNIOzs7MENBRWlCO0FBQ2QsbUJBQU8sRUFBUDtBQUNIOzs7O0VBWjhCQyw4Qjs7QUFnQm5DRCxjQUFjRSxHQUFkLEdBQXFCLENBQUMsU0FBRCxFQUFZLFNBQVosQ0FBRCxDQUF5QkMsSUFBekIsQ0FBOEIsR0FBOUIsQ0FBcEIiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L2xveWFsdHkvYWN0aW9uLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9
