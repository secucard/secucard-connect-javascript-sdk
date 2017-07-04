System.register(['../product-service'], function (_export) {
  'use strict';

  var ProductService, SecupayPrepayService;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  return {
    setters: [function (_productService) {
      ProductService = _productService.ProductService;
    }],
    execute: function () {
      SecupayPrepayService = (function (_ProductService) {
        _inherits(SecupayPrepayService, _ProductService);

        function SecupayPrepayService() {
          _classCallCheck(this, SecupayPrepayService);

          _ProductService.call(this);
        }

        SecupayPrepayService.prototype.getEndpoint = function getEndpoint() {
          return ['payment', 'secupayprepays'];
        };

        SecupayPrepayService.prototype.getEventTargets = function getEventTargets() {
          return ['payment.secupayprepays'];
        };

        SecupayPrepayService.prototype.cancel = function cancel(id) {
          return this.execute(id, 'cancel');
        };

        return SecupayPrepayService;
      })(ProductService);

      _export('SecupayPrepayService', SecupayPrepayService);

      SecupayPrepayService.Uid = ['payment', 'secupayprepays'].join('.');
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wYXltZW50L3NlY3VwYXktcHJlcGF5LXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3NCQUVhLG9CQUFvQjs7Ozs7Ozs7dUNBRnpCLGNBQWM7OztBQUVULDBCQUFvQjtrQkFBcEIsb0JBQW9COztBQUVwQixpQkFGQSxvQkFBb0IsR0FFakI7Z0NBRkgsb0JBQW9COztBQUc3QixvQ0FBTyxDQUFDO1NBQ1Q7O0FBSlUsNEJBQW9CLFdBTS9CLFdBQVcsR0FBQSx1QkFBRztBQUNaLGlCQUFPLENBQUMsU0FBUyxFQUFFLGdCQUFnQixDQUFDLENBQUM7U0FDdEM7O0FBUlUsNEJBQW9CLFdBVS9CLGVBQWUsR0FBQSwyQkFBRztBQUNoQixpQkFBTyxDQUFDLHdCQUF3QixDQUFDLENBQUM7U0FDbkM7O0FBWlUsNEJBQW9CLFdBYy9CLE1BQU0sR0FBQSxnQkFBQyxFQUFFLEVBQUU7QUFDVCxpQkFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztTQUNuQzs7ZUFoQlUsb0JBQW9CO1NBQVMsY0FBYzs7OztBQW9CeEQsMEJBQW9CLENBQUMsR0FBRyxHQUFHLEFBQUMsQ0FBQyxTQUFTLEVBQUUsZ0JBQWdCLENBQUMsQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L3BheW1lbnQvc2VjdXBheS1wcmVwYXktc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=
