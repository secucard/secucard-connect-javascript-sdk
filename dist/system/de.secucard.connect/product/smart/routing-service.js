'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RoutingService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _productService = require('../product-service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RoutingService = exports.RoutingService = function (_ProductService) {
    _inherits(RoutingService, _ProductService);

    function RoutingService() {
        _classCallCheck(this, RoutingService);

        return _possibleConstructorReturn(this, (RoutingService.__proto__ || Object.getPrototypeOf(RoutingService)).call(this));
    }

    _createClass(RoutingService, [{
        key: 'getEndpoint',
        value: function getEndpoint() {
            return ['smart', 'routings'];
        }
    }, {
        key: 'getEventTargets',
        value: function getEventTargets() {
            return [];
        }
    }, {
        key: 'assignDevice',
        value: function assignDevice(id, deviceId) {
            return this.execute(id, 'assign', deviceId);
        }
    }, {
        key: 'removeDevice',
        value: function removeDevice(id, deviceId) {
            return this.removeWithAction(id, 'assign', deviceId);
        }
    }]);

    return RoutingService;
}(_productService.ProductService);

RoutingService.Uid = ['smart', 'routings'].join('.');
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zbWFydC9yb3V0aW5nLXNlcnZpY2UuanMiXSwibmFtZXMiOlsiUm91dGluZ1NlcnZpY2UiLCJpZCIsImRldmljZUlkIiwiZXhlY3V0ZSIsInJlbW92ZVdpdGhBY3Rpb24iLCJQcm9kdWN0U2VydmljZSIsIlVpZCIsImpvaW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQVdBOzs7Ozs7OztJQUVhQSxjLFdBQUFBLGM7OztBQUVULDhCQUFjO0FBQUE7O0FBQUE7QUFFYjs7OztzQ0FFYTtBQUNWLG1CQUFPLENBQUMsT0FBRCxFQUFVLFVBQVYsQ0FBUDtBQUNIOzs7MENBRWlCO0FBQ2QsbUJBQU8sRUFBUDtBQUNIOzs7cUNBRVlDLEUsRUFBSUMsUSxFQUFVO0FBQ3ZCLG1CQUFPLEtBQUtDLE9BQUwsQ0FBYUYsRUFBYixFQUFpQixRQUFqQixFQUEyQkMsUUFBM0IsQ0FBUDtBQUNIOzs7cUNBRVlELEUsRUFBSUMsUSxFQUFVO0FBQ3ZCLG1CQUFPLEtBQUtFLGdCQUFMLENBQXNCSCxFQUF0QixFQUEwQixRQUExQixFQUFvQ0MsUUFBcEMsQ0FBUDtBQUNIOzs7O0VBcEIrQkcsOEI7O0FBd0JwQ0wsZUFBZU0sR0FBZixHQUFzQixDQUFDLE9BQUQsRUFBVSxVQUFWLENBQUQsQ0FBd0JDLElBQXhCLENBQTZCLEdBQTdCLENBQXJCIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zbWFydC9yb3V0aW5nLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9
