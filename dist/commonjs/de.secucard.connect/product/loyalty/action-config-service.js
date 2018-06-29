'use strict';

exports.__esModule = true;
exports.ActionConfigService = undefined;

var _productService = require('../product-service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ActionConfigService = exports.ActionConfigService = function (_ProductService) {
    _inherits(ActionConfigService, _ProductService);

    function ActionConfigService() {
        _classCallCheck(this, ActionConfigService);

        return _possibleConstructorReturn(this, _ProductService.call(this));
    }

    ActionConfigService.prototype.getEndpoint = function getEndpoint() {
        return ['loyalty', 'actionconfigs'];
    };

    ActionConfigService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    ActionConfigService.prototype.checkConfirmationCode = function checkConfirmationCode(id, code) {
        return this.execute(id, 'checkConfirmationCode', code);
    };

    ActionConfigService.prototype.processConfirmationCode = function processConfirmationCode(id) {
        return this.execute(id, 'processConfirmationCode');
    };

    ActionConfigService.prototype.cancelConfirmationCode = function cancelConfirmationCode(id) {
        return this.execute(id, 'cancelConfirmationCode');
    };

    return ActionConfigService;
}(_productService.ProductService);

ActionConfigService.Uid = ['loyalty', 'actionconfigs'].join('.');