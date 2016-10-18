'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var ActionEmailConfigService = (function (_ProductService) {
    function ActionEmailConfigService() {
        _classCallCheck(this, ActionEmailConfigService);

        _ProductService.call(this);
    }

    _inherits(ActionEmailConfigService, _ProductService);

    ActionEmailConfigService.prototype.getEndpoint = function getEndpoint() {
        return ['loyalty', 'actionemailconfigs'];
    };

    ActionEmailConfigService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    ActionEmailConfigService.prototype.testConfiguration = function testConfiguration(config) {
        return this.execute('me', 'testConfiguration ', null, config);
    };

    return ActionEmailConfigService;
})(_productService.ProductService);

exports.ActionEmailConfigService = ActionEmailConfigService;

ActionEmailConfigService.Uid = ['loyalty', 'actionemailconfigs'].join('.');