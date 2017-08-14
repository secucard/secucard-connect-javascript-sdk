System.register(['../product-service'], function (_export) {
  'use strict';

  var ProductService, SecupayInvoiceService;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  return {
    setters: [function (_productService) {
      ProductService = _productService.ProductService;
    }],
    execute: function () {
      SecupayInvoiceService = (function (_ProductService) {
        _inherits(SecupayInvoiceService, _ProductService);

        function SecupayInvoiceService() {
          _classCallCheck(this, SecupayInvoiceService);

          _ProductService.call(this);
        }

        SecupayInvoiceService.prototype.getEndpoint = function getEndpoint() {
          return ['payment', 'secupayinvoices'];
        };

        SecupayInvoiceService.prototype.getEventTargets = function getEventTargets() {
          return ['payment.secupayinvoices'];
        };

        SecupayInvoiceService.prototype.cancel = function cancel(id) {
          return this.execute(id, 'cancel');
        };

        return SecupayInvoiceService;
      })(ProductService);

      _export('SecupayInvoiceService', SecupayInvoiceService);

      SecupayInvoiceService.Uid = ['payment', 'secupayinvoices'].join('.');
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wYXltZW50L3NlY3VwYXktaW52b2ljZS1zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztzQkFFYSxxQkFBcUI7Ozs7Ozs7O3VDQUYxQixjQUFjOzs7QUFFVCwyQkFBcUI7a0JBQXJCLHFCQUFxQjs7QUFFckIsaUJBRkEscUJBQXFCLEdBRWxCO2dDQUZILHFCQUFxQjs7QUFHOUIsb0NBQU8sQ0FBQztTQUNUOztBQUpVLDZCQUFxQixXQU1oQyxXQUFXLEdBQUEsdUJBQUc7QUFDWixpQkFBTyxDQUFDLFNBQVMsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1NBQ3ZDOztBQVJVLDZCQUFxQixXQVVoQyxlQUFlLEdBQUEsMkJBQUc7QUFDaEIsaUJBQU8sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO1NBQ3BDOztBQVpVLDZCQUFxQixXQWNoQyxNQUFNLEdBQUEsZ0JBQUMsRUFBRSxFQUFFO0FBQ1QsaUJBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDbkM7O2VBaEJVLHFCQUFxQjtTQUFTLGNBQWM7Ozs7QUFvQnpELDJCQUFxQixDQUFDLEdBQUcsR0FBRyxBQUFDLENBQUMsU0FBUyxFQUFFLGlCQUFpQixDQUFDLENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wYXltZW50L3NlY3VwYXktaW52b2ljZS1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==
