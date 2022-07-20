System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, TransactionService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            TransactionService = (function (_ProductService) {
                _inherits(TransactionService, _ProductService);

                function TransactionService() {
                    _classCallCheck(this, TransactionService);

                    _ProductService.call(this);
                }

                TransactionService.prototype.getShippingUrl = function getShippingUrl(id) {
                    return this.retrieveWithAction(id, 'shippingUrl');
                };

                TransactionService.prototype.cancel = function cancel(id, data) {
                    return this.execute(id, 'cancel', null, data);
                };

                TransactionService.prototype.increaseAmount = function increaseAmount(id, data) {
                    return this.execute(id, 'increaseAmount', null, data);
                };

                TransactionService.prototype.getEndpoint = function getEndpoint() {
                    return ['payment', 'transactions'];
                };

                TransactionService.prototype.getEventTargets = function getEventTargets() {
                    return [];
                };

                TransactionService.prototype.getCrowdfundingData = function getCrowdfundingData(id) {
                    return this.retrieveWithAction('me', 'CrowdFundingData', id);
                };

                TransactionService.prototype.getShippingUrl = function getShippingUrl(id) {
                    return this.retrieveWithAction(id, 'checkStatus');
                };

                return TransactionService;
            })(ProductService);

            _export('TransactionService', TransactionService);

            TransactionService.Uid = ['payment', 'transactions'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wYXltZW50L3RyYW5zYWN0aW9uLXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3dCQWFhLGtCQUFrQjs7Ozs7Ozs7NkNBRnZCLGNBQWM7OztBQUVULDhCQUFrQjswQkFBbEIsa0JBQWtCOztBQUVoQix5QkFGRixrQkFBa0IsR0FFYjswQ0FGTCxrQkFBa0I7O0FBR3ZCLDhDQUFPLENBQUE7aUJBQ1Y7O0FBSlEsa0NBQWtCLFdBTTNCLGNBQWMsR0FBQSx3QkFBQyxFQUFFLEVBQUU7QUFDZiwyQkFBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsRUFBRSxFQUFFLGFBQWEsQ0FBQyxDQUFDO2lCQUNyRDs7QUFSUSxrQ0FBa0IsV0FVM0IsTUFBTSxHQUFBLGdCQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUU7QUFDYiwyQkFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO2lCQUNqRDs7QUFaUSxrQ0FBa0IsV0FjM0IsY0FBYyxHQUFBLHdCQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUU7QUFDckIsMkJBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO2lCQUN6RDs7QUFoQlEsa0NBQWtCLFdBa0IzQixXQUFXLEdBQUEsdUJBQUc7QUFDViwyQkFBTyxDQUFDLFNBQVMsRUFBRSxjQUFjLENBQUMsQ0FBQztpQkFDdEM7O0FBcEJRLGtDQUFrQixXQXNCM0IsZUFBZSxHQUFBLDJCQUFHO0FBQ2QsMkJBQU8sRUFBRSxDQUFDO2lCQUNiOztBQXhCUSxrQ0FBa0IsV0ErQjNCLG1CQUFtQixHQUFBLDZCQUFDLEVBQUUsRUFBRTtBQUNwQiwyQkFBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLGtCQUFrQixFQUFFLEVBQUUsQ0FBQyxDQUFDO2lCQUNoRTs7dUJBakNRLGtCQUFrQjtlQUFTLGNBQWM7Ozs7QUFxQ3RELDhCQUFrQixDQUFDLEdBQUcsR0FBRyxBQUFDLENBQUMsU0FBUyxFQUFFLGNBQWMsQ0FBQyxDQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3QvcGF5bWVudC90cmFuc2FjdGlvbi1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==
