'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ActionMessageService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _productService = require('../product-service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ActionMessageService = exports.ActionMessageService = function (_ProductService) {
    _inherits(ActionMessageService, _ProductService);

    function ActionMessageService() {
        _classCallCheck(this, ActionMessageService);

        return _possibleConstructorReturn(this, (ActionMessageService.__proto__ || Object.getPrototypeOf(ActionMessageService)).call(this));
    }

    _createClass(ActionMessageService, [{
        key: 'getEndpoint',
        value: function getEndpoint() {
            return ['loyalty', 'actionmessages'];
        }
    }, {
        key: 'getEventTargets',
        value: function getEventTargets() {
            return [];
        }
    }]);

    return ActionMessageService;
}(_productService.ProductService);

ActionMessageService.Uid = ['loyalty', 'actionmessages'].join('.');
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L2FjdGlvbi1tZXNzYWdlLXNlcnZpY2UuanMiXSwibmFtZXMiOlsiQWN0aW9uTWVzc2FnZVNlcnZpY2UiLCJQcm9kdWN0U2VydmljZSIsIlVpZCIsImpvaW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQVdBOzs7Ozs7OztJQUVhQSxvQixXQUFBQSxvQjs7O0FBRVQsb0NBQWM7QUFBQTs7QUFBQTtBQUViOzs7O3NDQUVhO0FBQ1YsbUJBQU8sQ0FBQyxTQUFELEVBQVksZ0JBQVosQ0FBUDtBQUNIOzs7MENBRWlCO0FBQ2QsbUJBQU8sRUFBUDtBQUNIOzs7O0VBWnFDQyw4Qjs7QUFnQjFDRCxxQkFBcUJFLEdBQXJCLEdBQTRCLENBQUMsU0FBRCxFQUFZLGdCQUFaLENBQUQsQ0FBZ0NDLElBQWhDLENBQXFDLEdBQXJDLENBQTNCIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L2FjdGlvbi1tZXNzYWdlLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9
