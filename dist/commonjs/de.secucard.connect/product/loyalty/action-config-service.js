'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var ActionConfigService = (function (_ProductService) {
    function ActionConfigService() {
        _classCallCheck(this, ActionConfigService);

        _ProductService.call(this);
    }

    _inherits(ActionConfigService, _ProductService);

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
})(_productService.ProductService);

exports.ActionConfigService = ActionConfigService;

ActionConfigService.Uid = ['loyalty', 'actionconfigs'].join('.');