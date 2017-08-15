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

                MerchantCardService.prototype.transact = function transact(merchantCardId, tid, cardnumber, action, amount, bonusAmount, amountSplitAllowed) {

                    if (action == 'cashreport') {
                        return this.execute(merchantCardId, 'transaction', null, { tid: tid, action: action });
                    }

                    return this.execute(merchantCardId, 'transaction', null, { tid: tid, cardnumber: cardnumber, action: action, amount: amount, bonus_amount: bonusAmount, amount_split_allowed: amountSplitAllowed });
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L21lcmNoYW50LWNhcmQtc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7d0JBYWEsbUJBQW1COzs7Ozs7Ozs2Q0FGeEIsY0FBYzs7O0FBRVQsK0JBQW1COzBCQUFuQixtQkFBbUI7O0FBRWpCLHlCQUZGLG1CQUFtQixHQUVkOzBDQUZMLG1CQUFtQjs7QUFHeEIsOENBQU8sQ0FBQTtpQkFDVjs7QUFKUSxtQ0FBbUIsV0FNNUIsUUFBUSxHQUFBLGtCQUFDLGNBQWMsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLGtCQUFrQixFQUFFOztBQUV2Rix3QkFBRyxNQUFNLElBQUksWUFBWSxFQUFFO0FBQ3ZCLCtCQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLGFBQWEsRUFBRSxJQUFJLEVBQUUsRUFBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFDO3FCQUN4Rjs7QUFFRCwyQkFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUNuRCxFQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFdBQVcsRUFBRSxvQkFBb0IsRUFBRSxrQkFBa0IsRUFBQyxDQUFDLENBQUM7aUJBQ2hKOztBQWRRLG1DQUFtQixXQWdCNUIsSUFBSSxHQUFBLGNBQUMsY0FBYyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7QUFDakMsMkJBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7aUJBQ3JGOztBQWxCUSxtQ0FBbUIsV0FvQjVCLE1BQU0sR0FBQSxnQkFBQyxjQUFjLEVBQUUsSUFBSSxFQUFFO0FBQ3pCLDJCQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztpQkFDckU7O0FBdEJRLG1DQUFtQixXQXdCNUIsZ0JBQWdCLEdBQUEsMEJBQUMsY0FBYyxFQUFFLElBQUksRUFBRTtBQUNuQywyQkFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxrQkFBa0IsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7aUJBQ3ZFOztBQTFCUSxtQ0FBbUIsV0E0QjVCLFlBQVksR0FBQSxzQkFBQyxjQUFjLEVBQUU7QUFDekIsMkJBQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLGNBQWMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7aUJBQ2hFOztBQTlCUSxtQ0FBbUIsV0FnQzVCLG1CQUFtQixHQUFBLDZCQUFDLGNBQWMsRUFBRTtBQUNoQywyQkFBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsY0FBYyxFQUFFLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztpQkFDdkU7O0FBbENRLG1DQUFtQixXQW9DNUIsV0FBVyxHQUFBLHFCQUFDLGNBQWMsRUFBRSxPQUFPLEVBQUU7QUFDakMsMkJBQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLGNBQWMsRUFBRSxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7aUJBQ3RFOztBQXRDUSxtQ0FBbUIsV0F3QzVCLDJCQUEyQixHQUFBLHFDQUFDLFVBQVUsRUFBRTtBQUNwQywyQkFBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLHFCQUFxQixFQUFFLFVBQVUsQ0FBQyxDQUFDO2lCQUMzRTs7QUExQ1EsbUNBQW1CLFdBNEM1QixXQUFXLEdBQUEsdUJBQUc7QUFDViwyQkFBTyxDQUFDLFNBQVMsRUFBRSxlQUFlLENBQUMsQ0FBQztpQkFDdkM7O0FBOUNRLG1DQUFtQixXQWdENUIsZUFBZSxHQUFBLDJCQUFHO0FBQ2QsMkJBQU8sRUFBRSxDQUFDO2lCQUNiOzt1QkFsRFEsbUJBQW1CO2VBQVMsY0FBYzs7OztBQXNEdkQsK0JBQW1CLENBQUMsR0FBRyxHQUFHLEFBQUMsQ0FBQyxTQUFTLEVBQUUsZUFBZSxDQUFDLENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L21lcmNoYW50LWNhcmQtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=
