'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.IdentResultService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _productService = require('../product-service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IdentResultService = exports.IdentResultService = function (_ProductService) {
    _inherits(IdentResultService, _ProductService);

    function IdentResultService() {
        _classCallCheck(this, IdentResultService);

        return _possibleConstructorReturn(this, (IdentResultService.__proto__ || Object.getPrototypeOf(IdentResultService)).call(this));
    }

    _createClass(IdentResultService, [{
        key: 'getEndpoint',
        value: function getEndpoint() {
            return ['services', 'identresults'];
        }
    }, {
        key: 'getEventTargets',
        value: function getEventTargets() {
            return ['services.identresults'];
        }
    }]);

    return IdentResultService;
}(_productService.ProductService);

IdentResultService.Uid = ['services', 'identresults'].join('.');
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zZXJ2aWNlcy9pZGVudC1yZXN1bHQtc2VydmljZS5qcyJdLCJuYW1lcyI6WyJJZGVudFJlc3VsdFNlcnZpY2UiLCJQcm9kdWN0U2VydmljZSIsIlVpZCIsImpvaW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQVdBOzs7Ozs7OztJQUVhQSxrQixXQUFBQSxrQjs7O0FBRVQsa0NBQWM7QUFBQTs7QUFBQTtBQUViOzs7O3NDQUVhO0FBQ1YsbUJBQU8sQ0FBQyxVQUFELEVBQWEsY0FBYixDQUFQO0FBQ0g7OzswQ0FFaUI7QUFDZCxtQkFBTyxDQUFDLHVCQUFELENBQVA7QUFDSDs7OztFQVptQ0MsOEI7O0FBZ0J4Q0QsbUJBQW1CRSxHQUFuQixHQUEwQixDQUFDLFVBQUQsRUFBYSxjQUFiLENBQUQsQ0FBK0JDLElBQS9CLENBQW9DLEdBQXBDLENBQXpCIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zZXJ2aWNlcy9pZGVudC1yZXN1bHQtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=
