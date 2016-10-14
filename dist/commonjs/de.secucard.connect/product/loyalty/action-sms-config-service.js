'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var ActionSmsConfigService = (function (_ProductService) {
    function ActionSmsConfigService() {
        _classCallCheck(this, ActionSmsConfigService);

        _ProductService.call(this);
    }

    _inherits(ActionSmsConfigService, _ProductService);

    ActionSmsConfigService.prototype.getEndpoint = function getEndpoint() {
        return ['loyalty', 'actionsmsconfigs'];
    };

    ActionSmsConfigService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return ActionSmsConfigService;
})(_productService.ProductService);

exports.ActionSmsConfigService = ActionSmsConfigService;

ActionSmsConfigService.Uid = ['loyalty', 'actionsmsconfigs'].join('.');