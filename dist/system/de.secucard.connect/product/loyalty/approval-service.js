System.register(['../product-service'], function (_export) {
  'use strict';

  var ProductService, ApprovalService;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  return {
    setters: [function (_productService) {
      ProductService = _productService.ProductService;
    }],
    execute: function () {
      ApprovalService = (function (_ProductService) {
        _inherits(ApprovalService, _ProductService);

        function ApprovalService() {
          _classCallCheck(this, ApprovalService);

          _ProductService.call(this);
        }

        ApprovalService.prototype.getEndpoint = function getEndpoint() {
          return ['loyalty', 'approvals'];
        };

        ApprovalService.prototype.getEventTargets = function getEventTargets() {
          return [];
        };

        return ApprovalService;
      })(ProductService);

      _export('ApprovalService', ApprovalService);

      ApprovalService.Uid = ['loyalty', 'approvals'].join('.');
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L2FwcHJvdmFsLXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3NCQWFhLGVBQWU7Ozs7Ozs7O3VDQUZwQixjQUFjOzs7QUFFVCxxQkFBZTtrQkFBZixlQUFlOztBQUVoQixpQkFGQyxlQUFlLEdBRWI7Z0NBRkYsZUFBZTs7QUFHMUIsb0NBQU8sQ0FBQTtTQUNQOztBQUpXLHVCQUFlLFdBTTNCLFdBQVcsR0FBQSx1QkFBRztBQUNiLGlCQUFPLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDO1NBQ2hDOztBQVJXLHVCQUFlLFdBVTNCLGVBQWUsR0FBQSwyQkFBRztBQUNqQixpQkFBTyxFQUFFLENBQUM7U0FDVjs7ZUFaVyxlQUFlO1NBQVMsY0FBYzs7OztBQWdCbkQscUJBQWUsQ0FBQyxHQUFHLEdBQUcsQUFBQyxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L2xveWFsdHkvYXBwcm92YWwtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=
