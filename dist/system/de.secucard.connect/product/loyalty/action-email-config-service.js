System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, ActionEmailConfigService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            ActionEmailConfigService = (function (_ProductService) {
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

                return ActionEmailConfigService;
            })(ProductService);

            _export('ActionEmailConfigService', ActionEmailConfigService);

            ActionEmailConfigService.Uid = ['loyalty', 'actionemailconfigs'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L2FjdGlvbi1lbWFpbC1jb25maWctc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7d0JBYWEsd0JBQXdCOzs7Ozs7Ozs2Q0FGN0IsY0FBYzs7O0FBRVQsb0NBQXdCO0FBRXRCLHlCQUZGLHdCQUF3QixHQUVuQjswQ0FGTCx3QkFBd0I7O0FBRzdCLDhDQUFPLENBQUE7aUJBQ1Y7OzBCQUpRLHdCQUF3Qjs7QUFBeEIsd0NBQXdCLFdBTWpDLFdBQVcsR0FBQSx1QkFBRztBQUNWLDJCQUFPLENBQUMsU0FBUyxFQUFFLG9CQUFvQixDQUFDLENBQUM7aUJBQzVDOztBQVJRLHdDQUF3QixXQVVqQyxlQUFlLEdBQUEsMkJBQUc7QUFDZCwyQkFBTyxFQUFFLENBQUM7aUJBQ2I7O3VCQVpRLHdCQUF3QjtlQUFTLGNBQWM7O2dEQUEvQyx3QkFBd0I7O0FBZ0JyQyxvQ0FBd0IsQ0FBQyxHQUFHLEdBQUcsQUFBQyxDQUFDLFNBQVMsRUFBRSxvQkFBb0IsQ0FBQyxDQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3QvbG95YWx0eS9hY3Rpb24tZW1haWwtY29uZmlnLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9