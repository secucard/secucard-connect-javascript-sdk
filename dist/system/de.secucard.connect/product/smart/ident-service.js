'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.IdentService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _productService = require('../product-service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IdentService = exports.IdentService = function (_ProductService) {
    _inherits(IdentService, _ProductService);

    function IdentService() {
        _classCallCheck(this, IdentService);

        return _possibleConstructorReturn(this, (IdentService.__proto__ || Object.getPrototypeOf(IdentService)).call(this));
    }

    _createClass(IdentService, [{
        key: 'getEndpoint',
        value: function getEndpoint() {
            return ['smart', 'idents'];
        }
    }, {
        key: 'getEventTargets',
        value: function getEventTargets() {
            return [];
        }
    }, {
        key: 'validate',
        value: function validate(id) {
            return this.execute(id, "validate");
        }
    }, {
        key: 'read',
        value: function read(id) {
            return this.execute(id, "read");
        }
    }]);

    return IdentService;
}(_productService.ProductService);

IdentService.Uid = ['smart', 'idents'].join('.');
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zbWFydC9pZGVudC1zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbIklkZW50U2VydmljZSIsImlkIiwiZXhlY3V0ZSIsIlByb2R1Y3RTZXJ2aWNlIiwiVWlkIiwiam9pbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBV0E7Ozs7Ozs7O0lBRWFBLFksV0FBQUEsWTs7O0FBRVQsNEJBQWM7QUFBQTs7QUFBQTtBQUViOzs7O3NDQUVhO0FBQ1YsbUJBQU8sQ0FBQyxPQUFELEVBQVUsUUFBVixDQUFQO0FBQ0g7OzswQ0FFaUI7QUFDZCxtQkFBTyxFQUFQO0FBQ0g7OztpQ0FFUUMsRSxFQUFJO0FBQ1QsbUJBQU8sS0FBS0MsT0FBTCxDQUFhRCxFQUFiLEVBQWlCLFVBQWpCLENBQVA7QUFDSDs7OzZCQUVJQSxFLEVBQUk7QUFDTCxtQkFBTyxLQUFLQyxPQUFMLENBQWFELEVBQWIsRUFBaUIsTUFBakIsQ0FBUDtBQUNIOzs7O0VBcEI2QkUsOEI7O0FBd0JsQ0gsYUFBYUksR0FBYixHQUFvQixDQUFDLE9BQUQsRUFBVSxRQUFWLENBQUQsQ0FBc0JDLElBQXRCLENBQTJCLEdBQTNCLENBQW5CIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zbWFydC9pZGVudC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==
