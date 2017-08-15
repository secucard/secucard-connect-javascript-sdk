System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, ActionCampaignService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            ActionCampaignService = (function (_ProductService) {
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
            })(ProductService);

            _export('ActionCampaignService', ActionCampaignService);

            ActionCampaignService.Uid = ['loyalty', 'actioncampaigns'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L2FjdGlvbi1jYW1wYWlnbi1zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozt3QkFhYSxxQkFBcUI7Ozs7Ozs7OzZDQUYxQixjQUFjOzs7QUFFVCxpQ0FBcUI7MEJBQXJCLHFCQUFxQjs7QUFFbkIseUJBRkYscUJBQXFCLEdBRWhCOzBDQUZMLHFCQUFxQjs7QUFHMUIsOENBQU8sQ0FBQTtpQkFDVjs7QUFKUSxxQ0FBcUIsV0FNOUIsd0JBQXdCLEdBQUEsa0NBQUMsRUFBRSxFQUFFO0FBQ3pCLDJCQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLEVBQUUsdUJBQXVCLENBQUMsQ0FBQztpQkFDL0Q7O0FBUlEscUNBQXFCLFdBVTlCLFdBQVcsR0FBQSx1QkFBRztBQUNWLDJCQUFPLENBQUMsU0FBUyxFQUFFLGlCQUFpQixDQUFDLENBQUM7aUJBQ3pDOztBQVpRLHFDQUFxQixXQWM5QixlQUFlLEdBQUEsMkJBQUc7QUFDZCwyQkFBTyxFQUFFLENBQUM7aUJBQ2I7O3VCQWhCUSxxQkFBcUI7ZUFBUyxjQUFjOzs7O0FBb0J6RCxpQ0FBcUIsQ0FBQyxHQUFHLEdBQUcsQUFBQyxDQUFDLFNBQVMsRUFBRSxpQkFBaUIsQ0FBQyxDQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3QvbG95YWx0eS9hY3Rpb24tY2FtcGFpZ24tc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=
