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

                MerchantCardService.prototype.charge = function charge(merchantCardId, amount, storeId) {
                    return this.execute(merchantCardId, 'charge', null, { amount: amount, store: storeId });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L21lcmNoYW50LWNhcmQtc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7d0JBYWEsbUJBQW1COzs7Ozs7Ozs2Q0FGeEIsY0FBYzs7O0FBRVQsK0JBQW1CO0FBRWpCLHlCQUZGLG1CQUFtQixHQUVkOzBDQUZMLG1CQUFtQjs7QUFHeEIsOENBQU8sQ0FBQTtpQkFDVjs7MEJBSlEsbUJBQW1COztBQUFuQixtQ0FBbUIsV0FNNUIsTUFBTSxHQUFBLGdCQUFDLGNBQWMsRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFO0FBQ3BDLDJCQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsRUFBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUMsQ0FBQyxDQUFDO2lCQUN6Rjs7QUFSUSxtQ0FBbUIsV0FVNUIsSUFBSSxHQUFBLGNBQUMsY0FBYyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7QUFDakMsMkJBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7aUJBQ3JGOztBQVpRLG1DQUFtQixXQWM1QixNQUFNLEdBQUEsZ0JBQUMsY0FBYyxFQUFFLElBQUksRUFBRTtBQUN6QiwyQkFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7aUJBQ3JFOztBQWhCUSxtQ0FBbUIsV0FrQjVCLGdCQUFnQixHQUFBLDBCQUFDLGNBQWMsRUFBRSxJQUFJLEVBQUU7QUFDbkMsMkJBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsa0JBQWtCLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO2lCQUN2RTs7QUFwQlEsbUNBQW1CLFdBc0I1QixZQUFZLEdBQUEsc0JBQUMsY0FBYyxFQUFFO0FBQ3pCLDJCQUFPLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO2lCQUNoRTs7QUF4QlEsbUNBQW1CLFdBMEI1QixtQkFBbUIsR0FBQSw2QkFBQyxjQUFjLEVBQUU7QUFDaEMsMkJBQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLGNBQWMsRUFBRSxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7aUJBQ3ZFOztBQTVCUSxtQ0FBbUIsV0E4QjVCLFdBQVcsR0FBQSxxQkFBQyxjQUFjLEVBQUUsT0FBTyxFQUFFO0FBQ2pDLDJCQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLEVBQUUsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2lCQUN0RTs7QUFoQ1EsbUNBQW1CLFdBa0M1QiwyQkFBMkIsR0FBQSxxQ0FBQyxVQUFVLEVBQUU7QUFDcEMsMkJBQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksRUFBRSxxQkFBcUIsRUFBRSxVQUFVLENBQUMsQ0FBQztpQkFDM0U7O0FBcENRLG1DQUFtQixXQXNDNUIsV0FBVyxHQUFBLHVCQUFHO0FBQ1YsMkJBQU8sQ0FBQyxTQUFTLEVBQUUsZUFBZSxDQUFDLENBQUM7aUJBQ3ZDOztBQXhDUSxtQ0FBbUIsV0EwQzVCLGVBQWUsR0FBQSwyQkFBRztBQUNkLDJCQUFPLEVBQUUsQ0FBQztpQkFDYjs7dUJBNUNRLG1CQUFtQjtlQUFTLGNBQWM7OzJDQUExQyxtQkFBbUI7O0FBZ0RoQywrQkFBbUIsQ0FBQyxHQUFHLEdBQUcsQUFBQyxDQUFDLFNBQVMsRUFBRSxlQUFlLENBQUMsQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L2xveWFsdHkvbWVyY2hhbnQtY2FyZC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==