'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ConfigurationService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _productService = require('../product-service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ConfigurationService = exports.ConfigurationService = function (_ProductService) {
    _inherits(ConfigurationService, _ProductService);

    function ConfigurationService() {
        _classCallCheck(this, ConfigurationService);

        return _possibleConstructorReturn(this, (ConfigurationService.__proto__ || Object.getPrototypeOf(ConfigurationService)).call(this));
    }

    _createClass(ConfigurationService, [{
        key: 'getEndpoint',
        value: function getEndpoint() {
            return ['smart', 'configurations'];
        }
    }, {
        key: 'getEventTargets',
        value: function getEventTargets() {
            return [];
        }
    }, {
        key: 'importConfiguration',
        value: function importConfiguration(id, data) {
            return this.execute(id, "importConfiguration", null, data, null);
        }
    }]);

    return ConfigurationService;
}(_productService.ProductService);

ConfigurationService.Uid = ['smart', 'configurations'].join('.');
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zbWFydC9jb25maWd1cmF0aW9uLXNlcnZpY2UuanMiXSwibmFtZXMiOlsiQ29uZmlndXJhdGlvblNlcnZpY2UiLCJpZCIsImRhdGEiLCJleGVjdXRlIiwiUHJvZHVjdFNlcnZpY2UiLCJVaWQiLCJqb2luIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFXQTs7Ozs7Ozs7SUFFYUEsb0IsV0FBQUEsb0I7OztBQUVULG9DQUFjO0FBQUE7O0FBQUE7QUFFYjs7OztzQ0FFYTtBQUNWLG1CQUFPLENBQUMsT0FBRCxFQUFVLGdCQUFWLENBQVA7QUFDSDs7OzBDQUVpQjtBQUNkLG1CQUFPLEVBQVA7QUFDSDs7OzRDQVdtQkMsRSxFQUFJQyxJLEVBQU07QUFDMUIsbUJBQU8sS0FBS0MsT0FBTCxDQUFhRixFQUFiLEVBQWlCLHFCQUFqQixFQUF3QyxJQUF4QyxFQUE4Q0MsSUFBOUMsRUFBb0QsSUFBcEQsQ0FBUDtBQUNIOzs7O0VBekJxQ0UsOEI7O0FBNkIxQ0oscUJBQXFCSyxHQUFyQixHQUE0QixDQUFDLE9BQUQsRUFBVSxnQkFBVixDQUFELENBQThCQyxJQUE5QixDQUFtQyxHQUFuQyxDQUEzQiIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3Qvc21hcnQvY29uZmlndXJhdGlvbi1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==
