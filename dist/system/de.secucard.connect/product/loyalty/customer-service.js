System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, CustomerService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            CustomerService = (function (_ProductService) {
                _inherits(CustomerService, _ProductService);

                function CustomerService() {
                    _classCallCheck(this, CustomerService);

                    _ProductService.call(this);
                }

                CustomerService.prototype.retrieveTemplates = function retrieveTemplates(merchantId) {
                    return this.retrieveWithAction('me', 'templateList', merchantId);
                };

                CustomerService.prototype.getEndpoint = function getEndpoint() {
                    return ['loyalty', 'customers'];
                };

                CustomerService.prototype.getEventTargets = function getEventTargets() {
                    return [];
                };

                CustomerService.prototype.assignPaymentContainer = function assignPaymentContainer(customerId, paymentContainerId) {
                    return this.execute(customerId, 'assignPaymentcontainer', paymentContainerId);
                };

                CustomerService.prototype.removePaymentContainer = function removePaymentContainer(customerId, paymentContainerId) {
                    return this.removeWithAction(customerId, 'assignPaymentcontainer', paymentContainerId);
                };

                return CustomerService;
            })(ProductService);

            _export('CustomerService', CustomerService);

            CustomerService.Uid = ['loyalty', 'customers'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L2N1c3RvbWVyLXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3dCQWFhLGVBQWU7Ozs7Ozs7OzZDQUZwQixjQUFjOzs7QUFFVCwyQkFBZTswQkFBZixlQUFlOztBQUViLHlCQUZGLGVBQWUsR0FFVjswQ0FGTCxlQUFlOztBQUdwQiw4Q0FBTyxDQUFBO2lCQUNWOztBQUpRLCtCQUFlLFdBTXhCLGlCQUFpQixHQUFBLDJCQUFDLFVBQVUsRUFBRTtBQUMxQiwyQkFBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxFQUFFLGNBQWMsRUFBRSxVQUFVLENBQUMsQ0FBQztpQkFDcEU7O0FBUlEsK0JBQWUsV0FVeEIsV0FBVyxHQUFBLHVCQUFHO0FBQ1YsMkJBQU8sQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLENBQUM7aUJBQ25DOztBQVpRLCtCQUFlLFdBY3hCLGVBQWUsR0FBQSwyQkFBRztBQUNkLDJCQUFPLEVBQUUsQ0FBQztpQkFDYjs7QUFoQlEsK0JBQWUsV0F3QnhCLHNCQUFzQixHQUFBLGdDQUFDLFVBQVUsRUFBRSxrQkFBa0IsRUFBRTtBQUNuRCwyQkFBTyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSx3QkFBd0IsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO2lCQUNqRjs7QUExQlEsK0JBQWUsV0FrQ3hCLHNCQUFzQixHQUFBLGdDQUFDLFVBQVUsRUFBRSxrQkFBa0IsRUFBRTtBQUNuRCwyQkFBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLHdCQUF3QixFQUFFLGtCQUFrQixDQUFDLENBQUM7aUJBQzFGOzt1QkFwQ1EsZUFBZTtlQUFTLGNBQWM7Ozs7QUF1Q25ELDJCQUFlLENBQUMsR0FBRyxHQUFHLEFBQUMsQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L2N1c3RvbWVyLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9
