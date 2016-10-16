System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, MerchantCardService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            MerchantCardService = (function (_ProductService) {
                function MerchantCardService() {
                    _classCallCheck(this, MerchantCardService);

                    _ProductService.call(this);
                }

                _inherits(MerchantCardService, _ProductService);

                MerchantCardService.prototype.charge = function charge(merchantCardId, tid, cardnumber, action, amount, bonusAmount) {
                    return this.execute(merchantCardId, 'charge', null, { tid: tid, cardnumber: cardnumber, action: action, amount: amount, bonus_amount: bonusAmount });
                };

                MerchantCardService.prototype.lock = function lock(merchantCardId, reasonId, note) {
                    return this.execute(merchantCardId, 'lock', null, { reason: reasonId, note: note });
                };

                MerchantCardService.prototype.unlock = function unlock(merchantCardId, note) {
                    return this.execute(merchantCardId, 'unlock', null, { note: note });
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
                    return this.updateWithAction(merchantCardId, 'cardgroup', groupId);
                };

                MerchantCardService.prototype.retrieveVirtualTerminalData = function retrieveVirtualTerminalData(merchantId) {
                    return this.retrieveWithAction('me', 'virtualTerminalData', merchantId);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L21lcmNoYW50LWNhcmQtc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7d0JBYWEsbUJBQW1COzs7Ozs7Ozs2Q0FGeEIsY0FBYzs7O0FBRVQsK0JBQW1CO0FBRWpCLHlCQUZGLG1CQUFtQixHQUVkOzBDQUZMLG1CQUFtQjs7QUFHeEIsOENBQU8sQ0FBQTtpQkFDVjs7MEJBSlEsbUJBQW1COztBQUFuQixtQ0FBbUIsV0FNNUIsTUFBTSxHQUFBLGdCQUFDLGNBQWMsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFO0FBQ2pFLDJCQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQzlDLEVBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFDLENBQUMsQ0FBQztpQkFDdEc7O0FBVFEsbUNBQW1CLFdBVzVCLElBQUksR0FBQSxjQUFDLGNBQWMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO0FBQ2pDLDJCQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO2lCQUNyRjs7QUFiUSxtQ0FBbUIsV0FlNUIsTUFBTSxHQUFBLGdCQUFDLGNBQWMsRUFBRSxJQUFJLEVBQUU7QUFDekIsMkJBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO2lCQUNyRTs7QUFqQlEsbUNBQW1CLFdBbUI1QixnQkFBZ0IsR0FBQSwwQkFBQyxjQUFjLEVBQUUsSUFBSSxFQUFFO0FBQ25DLDJCQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLGtCQUFrQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztpQkFDdkU7O0FBckJRLG1DQUFtQixXQXVCNUIsWUFBWSxHQUFBLHNCQUFDLGNBQWMsRUFBRTtBQUN6QiwyQkFBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsY0FBYyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztpQkFDaEU7O0FBekJRLG1DQUFtQixXQTJCNUIsbUJBQW1CLEdBQUEsNkJBQUMsY0FBYyxFQUFFO0FBQ2hDLDJCQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLEVBQUUsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO2lCQUN2RTs7QUE3QlEsbUNBQW1CLFdBK0I1QixXQUFXLEdBQUEscUJBQUMsY0FBYyxFQUFFLE9BQU8sRUFBRTtBQUNqQywyQkFBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxFQUFFLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQztpQkFDdEU7O0FBakNRLG1DQUFtQixXQW1DNUIsMkJBQTJCLEdBQUEscUNBQUMsVUFBVSxFQUFFO0FBQ3BDLDJCQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUscUJBQXFCLEVBQUUsVUFBVSxDQUFDLENBQUM7aUJBQzNFOztBQXJDUSxtQ0FBbUIsV0F1QzVCLFdBQVcsR0FBQSx1QkFBRztBQUNWLDJCQUFPLENBQUMsU0FBUyxFQUFFLGVBQWUsQ0FBQyxDQUFDO2lCQUN2Qzs7QUF6Q1EsbUNBQW1CLFdBMkM1QixlQUFlLEdBQUEsMkJBQUc7QUFDZCwyQkFBTyxFQUFFLENBQUM7aUJBQ2I7O3VCQTdDUSxtQkFBbUI7ZUFBUyxjQUFjOzsyQ0FBMUMsbUJBQW1COztBQWlEaEMsK0JBQW1CLENBQUMsR0FBRyxHQUFHLEFBQUMsQ0FBQyxTQUFTLEVBQUUsZUFBZSxDQUFDLENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L21lcmNoYW50LWNhcmQtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=