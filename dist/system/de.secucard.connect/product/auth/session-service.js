'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SessionService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _productService = require('../product-service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SessionService = exports.SessionService = function (_ProductService) {
    _inherits(SessionService, _ProductService);

    function SessionService() {
        _classCallCheck(this, SessionService);

        return _possibleConstructorReturn(this, (SessionService.__proto__ || Object.getPrototypeOf(SessionService)).call(this));
    }

    _createClass(SessionService, [{
        key: 'getEndpoint',
        value: function getEndpoint() {
            return ['auth', 'sessions'];
        }
    }, {
        key: 'getEventTargets',
        value: function getEventTargets() {
            return [];
        }
    }, {
        key: 'check',
        value: function check() {
            return this.retrieveWithAction('me', 'debug');
        }
    }]);

    return SessionService;
}(_productService.ProductService);

SessionService.Uid = ['auth', 'sessions'].join('.');
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9hdXRoL3Nlc3Npb24tc2VydmljZS5qcyJdLCJuYW1lcyI6WyJTZXNzaW9uU2VydmljZSIsInJldHJpZXZlV2l0aEFjdGlvbiIsIlByb2R1Y3RTZXJ2aWNlIiwiVWlkIiwiam9pbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBV0E7Ozs7Ozs7O0lBRWFBLGMsV0FBQUEsYzs7O0FBRVQsOEJBQWM7QUFBQTs7QUFBQTtBQUViOzs7O3NDQUVhO0FBQ1YsbUJBQU8sQ0FBQyxNQUFELEVBQVMsVUFBVCxDQUFQO0FBQ0g7OzswQ0FFaUI7QUFDZCxtQkFBTyxFQUFQO0FBQ0g7OztnQ0FFTztBQUNKLG1CQUFPLEtBQUtDLGtCQUFMLENBQXdCLElBQXhCLEVBQThCLE9BQTlCLENBQVA7QUFDSDs7OztFQWhCK0JDLDhCOztBQW9CcENGLGVBQWVHLEdBQWYsR0FBc0IsQ0FBQyxNQUFELEVBQVMsVUFBVCxDQUFELENBQXVCQyxJQUF2QixDQUE0QixHQUE1QixDQUFyQiIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3QvYXV0aC9zZXNzaW9uLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9
