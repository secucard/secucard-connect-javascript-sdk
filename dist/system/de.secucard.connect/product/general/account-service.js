System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, AccountService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            AccountService = (function (_ProductService) {
                _inherits(AccountService, _ProductService);

                function AccountService() {
                    _classCallCheck(this, AccountService);

                    _ProductService.call(this);
                }

                AccountService.prototype.getEndpoint = function getEndpoint() {
                    return ['general', 'accounts'];
                };

                AccountService.prototype.getEventTargets = function getEventTargets() {
                    return ['general.accounts'];
                };

                AccountService.prototype.create = function create(data, options) {

                    options = Object.assign({}, options, {
                        channelConfig: ['rest'],
                        useAuth: false });

                    return _ProductService.prototype.create.call(this, data, options);
                };

                AccountService.prototype.updateLocation = function updateLocation(accountId, location) {
                    return this.updateWithAction(accountId, 'location', null, location);
                };

                AccountService.prototype.updateBeacons = function updateBeacons(beaconList) {
                    return this.updateWithAction("me", 'beaconEnvironment', null, beaconList);
                };

                AccountService.prototype.updateGCM = function updateGCM(accountId, gcm) {
                    return this.updateWithAction(accountId, 'gcm', null, gcm);
                };

                return AccountService;
            })(ProductService);

            _export('AccountService', AccountService);

            AccountService.Uid = ['general', 'accounts'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9nZW5lcmFsL2FjY291bnQtc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7d0JBYWEsY0FBYzs7Ozs7Ozs7NkNBRm5CLGNBQWM7OztBQUVULDBCQUFjOzBCQUFkLGNBQWM7O0FBRVoseUJBRkYsY0FBYyxHQUVUOzBDQUZMLGNBQWM7O0FBR25CLDhDQUFPLENBQUE7aUJBQ1Y7O0FBSlEsOEJBQWMsV0FNdkIsV0FBVyxHQUFBLHVCQUFHO0FBQ1YsMkJBQU8sQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7aUJBQ2xDOztBQVJRLDhCQUFjLFdBVXZCLGVBQWUsR0FBQSwyQkFBRztBQUNkLDJCQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQztpQkFDL0I7O0FBWlEsOEJBQWMsV0FjdkIsTUFBTSxHQUFBLGdCQUFDLElBQUksRUFBRSxPQUFPLEVBQUU7O0FBRWxCLDJCQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFO0FBQ2pDLHFDQUFhLEVBQUUsQ0FBQyxNQUFNLENBQUM7QUFDdkIsK0JBQU8sRUFBRSxLQUFLLEVBQ2pCLENBQUMsQ0FBQzs7QUFFSCwyQkFBTywwQkFBTSxNQUFNLEtBQUEsT0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7aUJBRXRDOztBQXZCUSw4QkFBYyxXQXlCdkIsY0FBYyxHQUFBLHdCQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUU7QUFDaEMsMkJBQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2lCQUN2RTs7QUEzQlEsOEJBQWMsV0E2QnZCLGFBQWEsR0FBQSx1QkFBQyxVQUFVLEVBQUU7QUFDdEIsMkJBQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7aUJBQzdFOztBQS9CUSw4QkFBYyxXQWlDdkIsU0FBUyxHQUFBLG1CQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUU7QUFDdEIsMkJBQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2lCQUM3RDs7dUJBbkNRLGNBQWM7ZUFBUyxjQUFjOzs7O0FBdUNsRCwwQkFBYyxDQUFDLEdBQUcsR0FBRyxBQUFDLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3QvZ2VuZXJhbC9hY2NvdW50LXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9