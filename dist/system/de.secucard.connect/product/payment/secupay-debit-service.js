System.register(['../product-service'], function (_export) {
  'use strict';

  var ProductService, SecupayDebitService;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  return {
    setters: [function (_productService) {
      ProductService = _productService.ProductService;
    }],
    execute: function () {
      SecupayDebitService = (function (_ProductService) {
        _inherits(SecupayDebitService, _ProductService);

        function SecupayDebitService() {
          _classCallCheck(this, SecupayDebitService);

          _ProductService.call(this);
        }

        SecupayDebitService.prototype.getEndpoint = function getEndpoint() {
          return ['payment', 'secupaydebits'];
        };

        SecupayDebitService.prototype.getEventTargets = function getEventTargets() {
          return ['payment.secupaydebits'];
        };

        SecupayDebitService.prototype.cancel = function cancel(id) {
          return this.execute(id, 'cancel');
        };

        return SecupayDebitService;
      })(ProductService);

      _export('SecupayDebitService', SecupayDebitService);

      SecupayDebitService.Uid = ['payment', 'secupaydebits'].join('.');
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wYXltZW50L3NlY3VwYXktZGViaXQtc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7c0JBRWEsbUJBQW1COzs7Ozs7Ozt1Q0FGeEIsY0FBYzs7O0FBRVQseUJBQW1CO2tCQUFuQixtQkFBbUI7O0FBRW5CLGlCQUZBLG1CQUFtQixHQUVoQjtnQ0FGSCxtQkFBbUI7O0FBRzVCLG9DQUFPLENBQUM7U0FDVDs7QUFKVSwyQkFBbUIsV0FNOUIsV0FBVyxHQUFBLHVCQUFHO0FBQ1osaUJBQU8sQ0FBQyxTQUFTLEVBQUUsZUFBZSxDQUFDLENBQUM7U0FDckM7O0FBUlUsMkJBQW1CLFdBVTlCLGVBQWUsR0FBQSwyQkFBRztBQUNoQixpQkFBTyxDQUFDLHVCQUF1QixDQUFDLENBQUM7U0FDbEM7O0FBWlUsMkJBQW1CLFdBYzlCLE1BQU0sR0FBQSxnQkFBQyxFQUFFLEVBQUU7QUFDVCxpQkFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztTQUNuQzs7ZUFoQlUsbUJBQW1CO1NBQVMsY0FBYzs7OztBQW9CdkQseUJBQW1CLENBQUMsR0FBRyxHQUFHLEFBQUMsQ0FBQyxTQUFTLEVBQUUsZUFBZSxDQUFDLENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wYXltZW50L3NlY3VwYXktZGViaXQtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=
