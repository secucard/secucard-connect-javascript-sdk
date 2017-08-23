'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var ActionCampaignService = (function (_ProductService) {
    _inherits(ActionCampaignService, _ProductService);

    function ActionCampaignService() {
        _classCallCheck(this, ActionCampaignService);

        _ProductService.call(this);
    }

    ActionCampaignService.prototype.getCampaignRemoveAllowed = function getCampaignRemoveAllowed(id) {
        return this.retrieveWithAction(id, 'campaignRemoveAllowed');
    };

    ActionCampaignService.prototype.getEndpoint = function getEndpoint() {
        return ['loyalty', 'actioncampaigns'];
    };

    ActionCampaignService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    return ActionCampaignService;
})(_productService.ProductService);

exports.ActionCampaignService = ActionCampaignService;

ActionCampaignService.Uid = ['loyalty', 'actioncampaigns'].join('.');