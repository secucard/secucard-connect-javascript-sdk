System.register(['../product-service'], function (_export) {
  'use strict';

  var ProductService, AccountInvitationService;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  return {
    setters: [function (_productService) {
      ProductService = _productService.ProductService;
    }],
    execute: function () {
      AccountInvitationService = (function (_ProductService) {
        _inherits(AccountInvitationService, _ProductService);

        function AccountInvitationService() {
          _classCallCheck(this, AccountInvitationService);

          _ProductService.call(this);
        }

        AccountInvitationService.prototype.getEndpoint = function getEndpoint() {
          return ['general', 'accountinvitations'];
        };

        AccountInvitationService.prototype.getEventTargets = function getEventTargets() {
          return ['general.accountinvitations'];
        };

        return AccountInvitationService;
      })(ProductService);

      _export('AccountInvitationService', AccountInvitationService);

      AccountInvitationService.Uid = ['general', 'accountinvitations'].join('.');
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9nZW5lcmFsL2FjY291bnQtaW52aXRhdGlvbi1zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztzQkFhYSx3QkFBd0I7Ozs7Ozs7O3VDQUY3QixjQUFjOzs7QUFFVCw4QkFBd0I7a0JBQXhCLHdCQUF3Qjs7QUFFekIsaUJBRkMsd0JBQXdCLEdBRXRCO2dDQUZGLHdCQUF3Qjs7QUFHbkMsb0NBQU8sQ0FBQTtTQUNQOztBQUpXLGdDQUF3QixXQU1wQyxXQUFXLEdBQUEsdUJBQUc7QUFDYixpQkFBTyxDQUFDLFNBQVMsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1NBQ3pDOztBQVJXLGdDQUF3QixXQVVwQyxlQUFlLEdBQUEsMkJBQUc7QUFDakIsaUJBQU8sQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1NBQ3RDOztlQVpXLHdCQUF3QjtTQUFTLGNBQWM7Ozs7QUFnQjVELDhCQUF3QixDQUFDLEdBQUcsR0FBRyxBQUFDLENBQUMsU0FBUyxFQUFFLG9CQUFvQixDQUFDLENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9nZW5lcmFsL2FjY291bnQtaW52aXRhdGlvbi1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==
