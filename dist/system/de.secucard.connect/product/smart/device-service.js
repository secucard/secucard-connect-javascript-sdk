'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DeviceService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _productService = require('../product-service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DeviceService = exports.DeviceService = function (_ProductService) {
    _inherits(DeviceService, _ProductService);

    function DeviceService() {
        _classCallCheck(this, DeviceService);

        return _possibleConstructorReturn(this, (DeviceService.__proto__ || Object.getPrototypeOf(DeviceService)).call(this));
    }

    _createClass(DeviceService, [{
        key: 'getEndpoint',
        value: function getEndpoint() {
            return ['smart', 'devices'];
        }
    }, {
        key: 'getEventTargets',
        value: function getEventTargets() {
            return [];
        }
    }]);

    return DeviceService;
}(_productService.ProductService);

DeviceService.Uid = ['smart', 'devices'].join('.');
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zbWFydC9kZXZpY2Utc2VydmljZS5qcyJdLCJuYW1lcyI6WyJEZXZpY2VTZXJ2aWNlIiwiUHJvZHVjdFNlcnZpY2UiLCJVaWQiLCJqb2luIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFXQTs7Ozs7Ozs7SUFFYUEsYSxXQUFBQSxhOzs7QUFFVCw2QkFBYztBQUFBOztBQUFBO0FBRWI7Ozs7c0NBRWE7QUFDVixtQkFBTyxDQUFDLE9BQUQsRUFBVSxTQUFWLENBQVA7QUFDSDs7OzBDQUVpQjtBQUNkLG1CQUFPLEVBQVA7QUFDSDs7OztFQVo4QkMsOEI7O0FBZ0JuQ0QsY0FBY0UsR0FBZCxHQUFxQixDQUFDLE9BQUQsRUFBVSxTQUFWLENBQUQsQ0FBdUJDLElBQXZCLENBQTRCLEdBQTVCLENBQXBCIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zbWFydC9kZXZpY2Utc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=
