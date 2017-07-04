System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, ActionConfigService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            ActionConfigService = (function (_ProductService) {
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
            })(ProductService);

            _export('ActionConfigService', ActionConfigService);

            ActionConfigService.Uid = ['loyalty', 'actionconfigs'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L2FjdGlvbi1jb25maWctc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7d0JBYWEsbUJBQW1COzs7Ozs7Ozs2Q0FGeEIsY0FBYzs7O0FBRVQsK0JBQW1CO0FBRWpCLHlCQUZGLG1CQUFtQixHQUVkOzBDQUZMLG1CQUFtQjs7QUFHeEIsOENBQU8sQ0FBQTtpQkFDVjs7MEJBSlEsbUJBQW1COztBQUFuQixtQ0FBbUIsV0FNNUIsV0FBVyxHQUFBLHVCQUFHO0FBQ1YsMkJBQU8sQ0FBQyxTQUFTLEVBQUUsZUFBZSxDQUFDLENBQUM7aUJBQ3ZDOztBQVJRLG1DQUFtQixXQVU1QixlQUFlLEdBQUEsMkJBQUc7QUFDZCwyQkFBTyxFQUFFLENBQUM7aUJBQ2I7O0FBWlEsbUNBQW1CLFdBYzVCLHFCQUFxQixHQUFBLCtCQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUU7QUFDNUIsMkJBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsdUJBQXVCLEVBQUUsSUFBSSxDQUFDLENBQUM7aUJBQzFEOztBQWhCUSxtQ0FBbUIsV0FrQjVCLHVCQUF1QixHQUFBLGlDQUFDLEVBQUUsRUFBRTtBQUN4QiwyQkFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDO2lCQUN0RDs7QUFwQlEsbUNBQW1CLFdBc0I1QixzQkFBc0IsR0FBQSxnQ0FBQyxFQUFFLEVBQUU7QUFDdkIsMkJBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsd0JBQXdCLENBQUMsQ0FBQztpQkFDckQ7O3VCQXhCUSxtQkFBbUI7ZUFBUyxjQUFjOzsyQ0FBMUMsbUJBQW1COztBQTRCaEMsK0JBQW1CLENBQUMsR0FBRyxHQUFHLEFBQUMsQ0FBQyxTQUFTLEVBQUUsZUFBZSxDQUFDLENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L2FjdGlvbi1jb25maWctc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=