System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, MerchantCardService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            MerchantCardService = (function (_ProductService) {
                _inherits(MerchantCardService, _ProductService);

                function MerchantCardService() {
                    _classCallCheck(this, MerchantCardService);

                    _ProductService.call(this);
                }

                MerchantCardService.prototype.charge = function charge(merchantCardId, amount, storeId) {
                    return this.execute(merchantCardId, 'charge', null, { amount: amount, store: storeId });
                };

                MerchantCardService.prototype.lock = function lock(merchantCardId, reasonId, note) {
                    return this.execute(merchantCardId, 'lock', null, { reasonId: reasonId, note: note });
                };

                MerchantCardService.prototype.registerCustomer = function registerCustomer(merchantCardId, data) {
                    return this.execute(merchantCardId, 'registerCustomer', null, data);
                };

                MerchantCardService.prototype.retrieveLock = function retrieveLock(merchantCardId) {
                    return this.retrieveWithAction(merchantCardId, 'lock', null);
                };

                MerchantCardService.prototype.retrieveLockReasons = function retrieveLockReasons(merchantCardId) {
                    return this.retrieveWithAction(merchantCardId, 'lockreasons', null);
                };

                MerchantCardService.prototype.updateGroup = function updateGroup(merchantCardId, groupId) {
                    return this.execute(merchantCardId, 'cardgroup', groupId);
                };

                MerchantCardService.prototype.getEndpoint = function getEndpoint() {
                    return ['loyalty', 'merchantcards'];
                };

                MerchantCardService.prototype.getEventTargets = function getEventTargets() {
                    return [];
                };

                return MerchantCardService;
            })(ProductService);

            _export('MerchantCardService', MerchantCardService);

            MerchantCardService.Uid = ['loyalty', 'merchantcards'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L21lcmNoYW50LWNhcmQtc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7d0JBYWEsbUJBQW1COzs7Ozs7Ozs2Q0FGeEIsY0FBYzs7O0FBRVQsK0JBQW1COzBCQUFuQixtQkFBbUI7O0FBRWpCLHlCQUZGLG1CQUFtQixHQUVkOzBDQUZMLG1CQUFtQjs7QUFHeEIsOENBQU8sQ0FBQTtpQkFDVjs7QUFKUSxtQ0FBbUIsV0FNNUIsTUFBTSxHQUFBLGdCQUFDLGNBQWMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFO0FBQ3BDLDJCQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUMsQ0FBQyxDQUFDO2lCQUN6Rjs7QUFSUSxtQ0FBbUIsV0FVNUIsSUFBSSxHQUFBLGNBQUMsY0FBYyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7QUFDakMsMkJBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7aUJBQ3ZGOztBQVpRLG1DQUFtQixXQWM1QixnQkFBZ0IsR0FBQSwwQkFBQyxjQUFjLEVBQUUsSUFBSSxFQUFFO0FBQ25DLDJCQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLGtCQUFrQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztpQkFDdkU7O0FBaEJRLG1DQUFtQixXQWtCNUIsWUFBWSxHQUFBLHNCQUFDLGNBQWMsRUFBRTtBQUN6QiwyQkFBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsY0FBYyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztpQkFDaEU7O0FBcEJRLG1DQUFtQixXQXNCNUIsbUJBQW1CLEdBQUEsNkJBQUMsY0FBYyxFQUFFO0FBQ2hDLDJCQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLEVBQUUsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO2lCQUN2RTs7QUF4QlEsbUNBQW1CLFdBMEI1QixXQUFXLEdBQUEscUJBQUMsY0FBYyxFQUFFLE9BQU8sRUFBRTtBQUNqQywyQkFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7aUJBQzdEOztBQTVCUSxtQ0FBbUIsV0E4QjVCLFdBQVcsR0FBQSx1QkFBRztBQUNWLDJCQUFPLENBQUMsU0FBUyxFQUFFLGVBQWUsQ0FBQyxDQUFDO2lCQUN2Qzs7QUFoQ1EsbUNBQW1CLFdBa0M1QixlQUFlLEdBQUEsMkJBQUc7QUFDZCwyQkFBTyxFQUFFLENBQUM7aUJBQ2I7O3VCQXBDUSxtQkFBbUI7ZUFBUyxjQUFjOzs7O0FBd0N2RCwrQkFBbUIsQ0FBQyxHQUFHLEdBQUcsQUFBQyxDQUFDLFNBQVMsRUFBRSxlQUFlLENBQUMsQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L2xveWFsdHkvbWVyY2hhbnQtY2FyZC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==