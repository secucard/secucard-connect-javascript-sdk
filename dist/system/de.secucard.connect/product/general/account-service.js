System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, AccountService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            AccountService = (function (_ProductService) {
                function AccountService() {
                    _classCallCheck(this, AccountService);

                    _ProductService.call(this);
                }

                _inherits(AccountService, _ProductService);

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
                    return this.updateWithAction('me', 'beaconEnvironment', null, beaconList);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9nZW5lcmFsL2FjY291bnQtc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7d0JBYWEsY0FBYzs7Ozs7Ozs7NkNBRm5CLGNBQWM7OztBQUVULDBCQUFjO0FBRVoseUJBRkYsY0FBYyxHQUVUOzBDQUZMLGNBQWM7O0FBR25CLDhDQUFPLENBQUE7aUJBQ1Y7OzBCQUpRLGNBQWM7O0FBQWQsOEJBQWMsV0FNdkIsV0FBVyxHQUFBLHVCQUFHO0FBQ1YsMkJBQU8sQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7aUJBQ2xDOztBQVJRLDhCQUFjLFdBVXZCLGVBQWUsR0FBQSwyQkFBRztBQUNkLDJCQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQztpQkFDL0I7O0FBWlEsOEJBQWMsV0FjdkIsTUFBTSxHQUFBLGdCQUFDLElBQUksRUFBRSxPQUFPLEVBQUU7O0FBRWxCLDJCQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFO0FBQ2pDLHFDQUFhLEVBQUUsQ0FBQyxNQUFNLENBQUM7QUFDdkIsK0JBQU8sRUFBRSxLQUFLLEVBQ2pCLENBQUMsQ0FBQzs7QUFFSCwyQkFBTywwQkFBTSxNQUFNLEtBQUEsT0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7aUJBRXRDOztBQXZCUSw4QkFBYyxXQXlCdkIsY0FBYyxHQUFBLHdCQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUU7QUFDaEMsMkJBQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2lCQUN2RTs7QUEzQlEsOEJBQWMsV0E2QnZCLGFBQWEsR0FBQSx1QkFBQyxVQUFVLEVBQUU7QUFDdEIsMkJBQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxtQkFBbUIsRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUM7aUJBQzdFOztBQS9CUSw4QkFBYyxXQWlDdkIsU0FBUyxHQUFBLG1CQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUU7QUFDdEIsMkJBQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2lCQUM3RDs7dUJBbkNRLGNBQWM7ZUFBUyxjQUFjOztzQ0FBckMsY0FBYzs7QUF1QzNCLDBCQUFjLENBQUMsR0FBRyxHQUFHLEFBQUMsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9nZW5lcmFsL2FjY291bnQtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=