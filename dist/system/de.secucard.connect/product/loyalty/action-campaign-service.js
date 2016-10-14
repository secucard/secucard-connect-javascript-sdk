System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, ActionCampaignService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            ActionCampaignService = (function (_ProductService) {
                function ActionCampaignService() {
                    _classCallCheck(this, ActionCampaignService);

                    _ProductService.call(this);
                }

                _inherits(ActionCampaignService, _ProductService);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L2FjdGlvbi1jYW1wYWlnbi1zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozt3QkFhYSxxQkFBcUI7Ozs7Ozs7OzZDQUYxQixjQUFjOzs7QUFFVCxpQ0FBcUI7QUFFbkIseUJBRkYscUJBQXFCLEdBRWhCOzBDQUZMLHFCQUFxQjs7QUFHMUIsOENBQU8sQ0FBQTtpQkFDVjs7MEJBSlEscUJBQXFCOztBQUFyQixxQ0FBcUIsV0FNOUIsV0FBVyxHQUFBLHVCQUFHO0FBQ1YsMkJBQU8sQ0FBQyxTQUFTLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztpQkFDekM7O0FBUlEscUNBQXFCLFdBVTlCLGVBQWUsR0FBQSwyQkFBRztBQUNkLDJCQUFPLEVBQUUsQ0FBQztpQkFDYjs7dUJBWlEscUJBQXFCO2VBQVMsY0FBYzs7NkNBQTVDLHFCQUFxQjs7QUFnQmxDLGlDQUFxQixDQUFDLEdBQUcsR0FBRyxBQUFDLENBQUMsU0FBUyxFQUFFLGlCQUFpQixDQUFDLENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L2FjdGlvbi1jYW1wYWlnbi1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==