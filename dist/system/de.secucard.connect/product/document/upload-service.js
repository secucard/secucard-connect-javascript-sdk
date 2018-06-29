'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UploadService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _productService = require('../product-service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UploadService = exports.UploadService = function (_ProductService) {
    _inherits(UploadService, _ProductService);

    function UploadService() {
        _classCallCheck(this, UploadService);

        return _possibleConstructorReturn(this, (UploadService.__proto__ || Object.getPrototypeOf(UploadService)).call(this));
    }

    _createClass(UploadService, [{
        key: 'getEndpoint',
        value: function getEndpoint() {
            return ['document', 'uploads'];
        }
    }, {
        key: 'getEventTargets',
        value: function getEventTargets() {
            return [];
        }
    }, {
        key: 'upload',
        value: function upload(base64str) {
            return _get(UploadService.prototype.__proto__ || Object.getPrototypeOf(UploadService.prototype), 'execute', this).call(this, null, null, null, { content: base64str }, {
                channelConfig: ['rest'],
                useAuth: false });
        }
    }, {
        key: 'uploadMultiForm',
        value: function uploadMultiForm(files) {
            return _get(UploadService.prototype.__proto__ || Object.getPrototypeOf(UploadService.prototype), 'create', this).call(this, null, {
                channelConfig: ['rest'],
                useAuth: false }, { files: files });
        }
    }]);

    return UploadService;
}(_productService.ProductService);

UploadService.Uid = ['document', 'uploads'].join('.');
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9kb2N1bWVudC91cGxvYWQtc2VydmljZS5qcyJdLCJuYW1lcyI6WyJVcGxvYWRTZXJ2aWNlIiwiYmFzZTY0c3RyIiwiY29udGVudCIsImNoYW5uZWxDb25maWciLCJ1c2VBdXRoIiwiZmlsZXMiLCJQcm9kdWN0U2VydmljZSIsIlVpZCIsImpvaW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBV0E7Ozs7Ozs7O0lBRWFBLGEsV0FBQUEsYTs7O0FBRVQsNkJBQWM7QUFBQTs7QUFBQTtBQUViOzs7O3NDQUVhO0FBQ1YsbUJBQU8sQ0FBQyxVQUFELEVBQWEsU0FBYixDQUFQO0FBQ0g7OzswQ0FFaUI7QUFDZCxtQkFBTyxFQUFQO0FBQ0g7OzsrQkFFTUMsUyxFQUFXO0FBQ2QseUlBQXFCLElBQXJCLEVBQTJCLElBQTNCLEVBQWlDLElBQWpDLEVBQXVDLEVBQUNDLFNBQVNELFNBQVYsRUFBdkMsRUFBNkQ7QUFDekRFLCtCQUFlLENBQUMsTUFBRCxDQUQwQztBQUV6REMseUJBQVMsS0FGZ0QsRUFBN0Q7QUFJSDs7O3dDQUVlQyxLLEVBQU87QUFDbkIsd0lBQW9CLElBQXBCLEVBQTBCO0FBQ3RCRiwrQkFBZSxDQUFDLE1BQUQsQ0FETztBQUV0QkMseUJBQVMsS0FGYSxFQUExQixFQUdHLEVBQUNDLE9BQU9BLEtBQVIsRUFISDtBQUlIOzs7O0VBMUI4QkMsOEI7O0FBOEJuQ04sY0FBY08sR0FBZCxHQUFxQixDQUFDLFVBQUQsRUFBYSxTQUFiLENBQUQsQ0FBMEJDLElBQTFCLENBQStCLEdBQS9CLENBQXBCIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9kb2N1bWVudC91cGxvYWQtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=
