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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L21lcmNoYW50LWNhcmQtc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7d0JBYWEsbUJBQW1COzs7Ozs7Ozs2Q0FGeEIsY0FBYzs7O0FBRVQsK0JBQW1COzBCQUFuQixtQkFBbUI7O0FBRWpCLHlCQUZGLG1CQUFtQixHQUVkOzBDQUZMLG1CQUFtQjs7QUFHeEIsOENBQU8sQ0FBQTtpQkFDVjs7QUFKUSxtQ0FBbUIsV0FNNUIsUUFBUSxHQUFBLGtCQUFDLGNBQWMsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLGtCQUFrQixFQUFFLGNBQWMsRUFBRTs7QUFFdkcsd0JBQUcsTUFBTSxJQUFJLFlBQVksRUFBRTtBQUN2QiwrQkFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLEVBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQztxQkFDeEY7O0FBRUQsMkJBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsYUFBYSxFQUFFLElBQUksRUFDbkQsRUFBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxXQUFXO0FBQ3hGLDRDQUFvQixFQUFFLGtCQUFrQixFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUMsQ0FBQyxDQUFDO2lCQUN2Rjs7QUFmUSxtQ0FBbUIsV0FpQjVCLElBQUksR0FBQSxjQUFDLGNBQWMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO0FBQ2pDLDJCQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO2lCQUNyRjs7QUFuQlEsbUNBQW1CLFdBcUI1QixNQUFNLEdBQUEsZ0JBQUMsY0FBYyxFQUFFLElBQUksRUFBRTtBQUN6QiwyQkFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7aUJBQ3JFOztBQXZCUSxtQ0FBbUIsV0F5QjVCLGdCQUFnQixHQUFBLDBCQUFDLGNBQWMsRUFBRSxJQUFJLEVBQUU7QUFDbkMsMkJBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO2lCQUN2RTs7QUEzQlEsbUNBQW1CLFdBNkI1QixZQUFZLEdBQUEsc0JBQUMsY0FBYyxFQUFFO0FBQ3pCLDJCQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO2lCQUNoRTs7QUEvQlEsbUNBQW1CLFdBaUM1QixtQkFBbUIsR0FBQSw2QkFBQyxjQUFjLEVBQUU7QUFDaEMsMkJBQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLGNBQWMsRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7aUJBQ3ZFOztBQW5DUSxtQ0FBbUIsV0FxQzVCLFdBQVcsR0FBQSxxQkFBQyxjQUFjLEVBQUUsT0FBTyxFQUFFO0FBQ2pDLDJCQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLEVBQUUsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2lCQUN0RTs7QUF2Q1EsbUNBQW1CLFdBeUM1QiwyQkFBMkIsR0FBQSxxQ0FBQyxVQUFVLEVBQUU7QUFDcEMsMkJBQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxxQkFBcUIsRUFBRSxVQUFVLENBQUMsQ0FBQztpQkFDM0U7O0FBM0NRLG1DQUFtQixXQTZDNUIsV0FBVyxHQUFBLHVCQUFHO0FBQ1YsMkJBQU8sQ0FBQyxTQUFTLEVBQUUsZUFBZSxDQUFDLENBQUM7aUJBQ3ZDOztBQS9DUSxtQ0FBbUIsV0FpRDVCLGVBQWUsR0FBQSwyQkFBRztBQUNkLDJCQUFPLEVBQUUsQ0FBQztpQkFDYjs7dUJBbkRRLG1CQUFtQjtlQUFTLGNBQWM7Ozs7QUF1RHZELCtCQUFtQixDQUFDLEdBQUcsR0FBRyxBQUFDLENBQUMsU0FBUyxFQUFFLGVBQWUsQ0FBQyxDQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3QvbG95YWx0eS9tZXJjaGFudC1jYXJkLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9
