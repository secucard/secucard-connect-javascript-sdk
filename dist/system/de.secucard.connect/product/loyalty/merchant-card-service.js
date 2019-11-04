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

                MerchantCardService.prototype.retrieveTemplates = function retrieveTemplates(merchantId) {
                    return this.retrieveWithAction('me', 'templateList', merchantId);
                };

                MerchantCardService.prototype.transact = function transact(merchantCardId, tid, cardnumber, action, amount, bonusAmount, amountSplitAllowed, additionalData) {

                    if (action == 'cashreport') {
                        return this.execute(merchantCardId, 'transaction', null, { tid: tid, action: action });
                    }

                    return this.execute(merchantCardId, 'transaction', null, { tid: tid, cardnumber: cardnumber, action: action, amount: amount, bonus_amount: bonusAmount,
                        amount_split_allowed: amountSplitAllowed, additional_data: additionalData });
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L21lcmNoYW50LWNhcmQtc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7d0JBYWEsbUJBQW1COzs7Ozs7Ozs2Q0FGeEIsY0FBYzs7O0FBRVQsK0JBQW1COzBCQUFuQixtQkFBbUI7O0FBRWpCLHlCQUZGLG1CQUFtQixHQUVkOzBDQUZMLG1CQUFtQjs7QUFHeEIsOENBQU8sQ0FBQTtpQkFDVjs7QUFKUSxtQ0FBbUIsV0FNNUIsaUJBQWlCLEdBQUEsMkJBQUMsVUFBVSxFQUFFO0FBQzFCLDJCQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsY0FBYyxFQUFFLFVBQVUsQ0FBQyxDQUFDO2lCQUNwRTs7QUFSUSxtQ0FBbUIsV0FVNUIsUUFBUSxHQUFBLGtCQUFDLGNBQWMsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLGtCQUFrQixFQUFFLGNBQWMsRUFBRTs7QUFFdkcsd0JBQUcsTUFBTSxJQUFJLFlBQVksRUFBRTtBQUN2QiwrQkFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLEVBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQztxQkFDeEY7O0FBRUQsMkJBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsYUFBYSxFQUFFLElBQUksRUFDbkQsRUFBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxXQUFXO0FBQ3hGLDRDQUFvQixFQUFFLGtCQUFrQixFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUMsQ0FBQyxDQUFDO2lCQUN2Rjs7QUFuQlEsbUNBQW1CLFdBcUI1QixJQUFJLEdBQUEsY0FBQyxjQUFjLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtBQUNqQywyQkFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztpQkFDckY7O0FBdkJRLG1DQUFtQixXQXlCNUIsTUFBTSxHQUFBLGdCQUFDLGNBQWMsRUFBRSxJQUFJLEVBQUU7QUFDekIsMkJBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO2lCQUNyRTs7QUEzQlEsbUNBQW1CLFdBNkI1QixnQkFBZ0IsR0FBQSwwQkFBQyxjQUFjLEVBQUUsSUFBSSxFQUFFO0FBQ25DLDJCQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLGtCQUFrQixFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztpQkFDdkU7O0FBL0JRLG1DQUFtQixXQWlDNUIsWUFBWSxHQUFBLHNCQUFDLGNBQWMsRUFBRTtBQUN6QiwyQkFBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsY0FBYyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztpQkFDaEU7O0FBbkNRLG1DQUFtQixXQXFDNUIsbUJBQW1CLEdBQUEsNkJBQUMsY0FBYyxFQUFFO0FBQ2hDLDJCQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLEVBQUUsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO2lCQUN2RTs7QUF2Q1EsbUNBQW1CLFdBeUM1QixXQUFXLEdBQUEscUJBQUMsY0FBYyxFQUFFLE9BQU8sRUFBRTtBQUNqQywyQkFBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxFQUFFLFdBQVcsRUFBRSxPQUFPLENBQUMsQ0FBQztpQkFDdEU7O0FBM0NRLG1DQUFtQixXQTZDNUIsMkJBQTJCLEdBQUEscUNBQUMsVUFBVSxFQUFFO0FBQ3BDLDJCQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUscUJBQXFCLEVBQUUsVUFBVSxDQUFDLENBQUM7aUJBQzNFOztBQS9DUSxtQ0FBbUIsV0FpRDVCLFdBQVcsR0FBQSx1QkFBRztBQUNWLDJCQUFPLENBQUMsU0FBUyxFQUFFLGVBQWUsQ0FBQyxDQUFDO2lCQUN2Qzs7QUFuRFEsbUNBQW1CLFdBcUQ1QixlQUFlLEdBQUEsMkJBQUc7QUFDZCwyQkFBTyxFQUFFLENBQUM7aUJBQ2I7O3VCQXZEUSxtQkFBbUI7ZUFBUyxjQUFjOzs7O0FBMkR2RCwrQkFBbUIsQ0FBQyxHQUFHLEdBQUcsQUFBQyxDQUFDLFNBQVMsRUFBRSxlQUFlLENBQUMsQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L2xveWFsdHkvbWVyY2hhbnQtY2FyZC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==
