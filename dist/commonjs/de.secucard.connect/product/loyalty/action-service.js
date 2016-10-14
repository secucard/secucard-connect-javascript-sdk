'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var ActionService = (function (_ProductService) {
    function ActionService() {
        _classCallCheck(this, ActionService);

        _ProductService.call(this);
    }

    _inherits(ActionService, _ProductService);

    ActionService.prototype.getEndpoint = function getEndpoint() {
        return ['loyalty', 'actions'];
    };

    ActionService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return ActionService;
})(_productService.ProductService);

exports.ActionService = ActionService;

ActionService.Uid = ['loyalty', 'actions'].join('.');