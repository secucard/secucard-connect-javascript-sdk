'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ActionProfileService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _productService = require('../product-service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ActionProfileService = exports.ActionProfileService = function (_ProductService) {
    _inherits(ActionProfileService, _ProductService);

    function ActionProfileService() {
        _classCallCheck(this, ActionProfileService);

        return _possibleConstructorReturn(this, (ActionProfileService.__proto__ || Object.getPrototypeOf(ActionProfileService)).call(this));
    }

    _createClass(ActionProfileService, [{
        key: 'getEndpoint',
        value: function getEndpoint() {
            return ['loyalty', 'actionprofiles'];
        }
    }, {
        key: 'getEventTargets',
        value: function getEventTargets() {
            return [];
        }
    }]);

    return ActionProfileService;
}(_productService.ProductService);

ActionProfileService.Uid = ['loyalty', 'actionprofiles'].join('.');
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L2FjdGlvbi1wcm9maWxlLXNlcnZpY2UuanMiXSwibmFtZXMiOlsiQWN0aW9uUHJvZmlsZVNlcnZpY2UiLCJQcm9kdWN0U2VydmljZSIsIlVpZCIsImpvaW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQVdBOzs7Ozs7OztJQUVhQSxvQixXQUFBQSxvQjs7O0FBRVQsb0NBQWM7QUFBQTs7QUFBQTtBQUViOzs7O3NDQUVhO0FBQ1YsbUJBQU8sQ0FBQyxTQUFELEVBQVksZ0JBQVosQ0FBUDtBQUNIOzs7MENBRWlCO0FBQ2QsbUJBQU8sRUFBUDtBQUNIOzs7O0VBWnFDQyw4Qjs7QUFnQjFDRCxxQkFBcUJFLEdBQXJCLEdBQTRCLENBQUMsU0FBRCxFQUFZLGdCQUFaLENBQUQsQ0FBZ0NDLElBQWhDLENBQXFDLEdBQXJDLENBQTNCIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L2FjdGlvbi1wcm9maWxlLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9
