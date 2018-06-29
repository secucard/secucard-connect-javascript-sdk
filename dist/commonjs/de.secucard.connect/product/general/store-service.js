'use strict';

exports.__esModule = true;
exports.StoreService = undefined;

var _productService = require('../product-service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StoreService = exports.StoreService = function (_ProductService) {
    _inherits(StoreService, _ProductService);

    function StoreService() {
        _classCallCheck(this, StoreService);

        return _possibleConstructorReturn(this, _ProductService.call(this));
    }

    StoreService.prototype.getEndpoint = function getEndpoint() {
        return ['general', 'stores'];
    };

    StoreService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    StoreService.prototype.checkIn = function checkIn(storeId, checkInState) {
        return this.updateWithAction(storeId, 'checkin', checkInState);
    };

    StoreService.prototype.setDefault = function setDefault(storeId) {
        return this.updateWithAction(storeId, 'setDefault');
    };

    return StoreService;
}(_productService.ProductService);

StoreService.Uid = ['general', 'stores'].join('.');