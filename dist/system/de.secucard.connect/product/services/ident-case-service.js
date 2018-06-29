'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.IdentCaseService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _productService = require('../product-service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IdentCaseService = exports.IdentCaseService = function (_ProductService) {
    _inherits(IdentCaseService, _ProductService);

    function IdentCaseService() {
        _classCallCheck(this, IdentCaseService);

        return _possibleConstructorReturn(this, (IdentCaseService.__proto__ || Object.getPrototypeOf(IdentCaseService)).call(this));
    }

    _createClass(IdentCaseService, [{
        key: 'getEndpoint',
        value: function getEndpoint() {
            return ['services', 'identcases'];
        }
    }, {
        key: 'getEventTargets',
        value: function getEventTargets() {
            return ['services.identcases'];
        }
    }, {
        key: 'start',
        value: function start(id) {
            return this.execute(id, "start");
        }
    }, {
        key: 'task',
        value: function task(id, taskId, data) {
            return this.updateWithAction(id, "task", taskId, data);
        }
    }, {
        key: 'close',
        value: function close(id) {
            return this.execute(id, "close");
        }
    }]);

    return IdentCaseService;
}(_productService.ProductService);

IdentCaseService.Uid = ['services', 'identcases'].join('.');
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zZXJ2aWNlcy9pZGVudC1jYXNlLXNlcnZpY2UuanMiXSwibmFtZXMiOlsiSWRlbnRDYXNlU2VydmljZSIsImlkIiwiZXhlY3V0ZSIsInRhc2tJZCIsImRhdGEiLCJ1cGRhdGVXaXRoQWN0aW9uIiwiUHJvZHVjdFNlcnZpY2UiLCJVaWQiLCJqb2luIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFXQTs7Ozs7Ozs7SUFFYUEsZ0IsV0FBQUEsZ0I7OztBQUVULGdDQUFjO0FBQUE7O0FBQUE7QUFFYjs7OztzQ0FFYTtBQUNWLG1CQUFPLENBQUMsVUFBRCxFQUFhLFlBQWIsQ0FBUDtBQUNIOzs7MENBRWlCO0FBQ2QsbUJBQU8sQ0FBQyxxQkFBRCxDQUFQO0FBQ0g7Ozs4QkFFS0MsRSxFQUFJO0FBQ04sbUJBQU8sS0FBS0MsT0FBTCxDQUFhRCxFQUFiLEVBQWlCLE9BQWpCLENBQVA7QUFDSDs7OzZCQUVJQSxFLEVBQUlFLE0sRUFBUUMsSSxFQUFNO0FBQ25CLG1CQUFPLEtBQUtDLGdCQUFMLENBQXNCSixFQUF0QixFQUEwQixNQUExQixFQUFrQ0UsTUFBbEMsRUFBMENDLElBQTFDLENBQVA7QUFDSDs7OzhCQUVLSCxFLEVBQUk7QUFDTixtQkFBTyxLQUFLQyxPQUFMLENBQWFELEVBQWIsRUFBaUIsT0FBakIsQ0FBUDtBQUNIOzs7O0VBeEJpQ0ssOEI7O0FBNEJ0Q04saUJBQWlCTyxHQUFqQixHQUF3QixDQUFDLFVBQUQsRUFBYSxZQUFiLENBQUQsQ0FBNkJDLElBQTdCLENBQWtDLEdBQWxDLENBQXZCIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zZXJ2aWNlcy9pZGVudC1jYXNlLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9
