'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var ActionActionService = (function (_ProductService) {
    function ActionActionService() {
        _classCallCheck(this, ActionActionService);

        _ProductService.call(this);
    }

    _inherits(ActionActionService, _ProductService);

    ActionActionService.prototype.getEndpoint = function getEndpoint() {
        return ['loyalty', 'actionactions'];
    };

    ActionActionService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return ActionActionService;
})(_productService.ProductService);

exports.ActionActionService = ActionActionService;

ActionActionService.Uid = ['loyalty', 'actionactions'].join('.');