System.register(['../product-service'], function (_export) {
  'use strict';

  var ProductService, SecupayCreditcardService;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  return {
    setters: [function (_productService) {
      ProductService = _productService.ProductService;
    }],
    execute: function () {
      SecupayCreditcardService = (function (_ProductService) {
        _inherits(SecupayCreditcardService, _ProductService);

        function SecupayCreditcardService() {
          _classCallCheck(this, SecupayCreditcardService);

          _ProductService.call(this);
        }

        SecupayCreditcardService.prototype.getEndpoint = function getEndpoint() {
          return ['payment', 'secupaycreditcards'];
        };

        SecupayCreditcardService.prototype.getEventTargets = function getEventTargets() {
          return ['payment.secupaycreditcards'];
        };

        SecupayCreditcardService.prototype.cancel = function cancel(id) {
          return this.execute(id, 'cancel');
        };

        return SecupayCreditcardService;
      })(ProductService);

      _export('SecupayCreditcardService', SecupayCreditcardService);

      SecupayCreditcardService.Uid = ['payment', 'secupaycreditcards'].join('.');
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wYXltZW50L3NlY3VwYXktY3JlZGl0Y2FyZC1zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztzQkFFYSx3QkFBd0I7Ozs7Ozs7O3VDQUY3QixjQUFjOzs7QUFFVCw4QkFBd0I7a0JBQXhCLHdCQUF3Qjs7QUFFeEIsaUJBRkEsd0JBQXdCLEdBRXJCO2dDQUZILHdCQUF3Qjs7QUFHakMsb0NBQU8sQ0FBQztTQUNUOztBQUpVLGdDQUF3QixXQU1uQyxXQUFXLEdBQUEsdUJBQUc7QUFDWixpQkFBTyxDQUFDLFNBQVMsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1NBQzFDOztBQVJVLGdDQUF3QixXQVVuQyxlQUFlLEdBQUEsMkJBQUc7QUFDaEIsaUJBQU8sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1NBQ3ZDOztBQVpVLGdDQUF3QixXQWNuQyxNQUFNLEdBQUEsZ0JBQUMsRUFBRSxFQUFFO0FBQ1QsaUJBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDbkM7O2VBaEJVLHdCQUF3QjtTQUFTLGNBQWM7Ozs7QUFvQjVELDhCQUF3QixDQUFDLEdBQUcsR0FBRyxBQUFDLENBQUMsU0FBUyxFQUFFLG9CQUFvQixDQUFDLENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wYXltZW50L3NlY3VwYXktY3JlZGl0Y2FyZC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==
