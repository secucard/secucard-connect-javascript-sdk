System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, ContactService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            ContactService = (function (_ProductService) {
                function ContactService() {
                    _classCallCheck(this, ContactService);

                    _ProductService.call(this);
                }

                _inherits(ContactService, _ProductService);

                ContactService.prototype.getEndpoint = function getEndpoint() {
                    return ['general', 'contacts'];
                };

                ContactService.prototype.getEventTargets = function getEventTargets() {
                    return [];
                };

                return ContactService;
            })(ProductService);

            _export('ContactService', ContactService);

            ContactService.Uid = ['general', 'contacts'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9nZW5lcmFsL2NvbnRhY3Qtc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7d0JBYWEsY0FBYzs7Ozs7Ozs7NkNBRm5CLGNBQWM7OztBQUVULDBCQUFjO0FBRVoseUJBRkYsY0FBYyxHQUVUOzBDQUZMLGNBQWM7O0FBR25CLDhDQUFPLENBQUE7aUJBQ1Y7OzBCQUpRLGNBQWM7O0FBQWQsOEJBQWMsV0FNdkIsV0FBVyxHQUFBLHVCQUFHO0FBQ1YsMkJBQU8sQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7aUJBQ2xDOztBQVJRLDhCQUFjLFdBVXZCLGVBQWUsR0FBQSwyQkFBRztBQUNkLDJCQUFPLEVBQUUsQ0FBQztpQkFDYjs7dUJBWlEsY0FBYztlQUFTLGNBQWM7O3NDQUFyQyxjQUFjOztBQWdCM0IsMEJBQWMsQ0FBQyxHQUFHLEdBQUcsQUFBQyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L2dlbmVyYWwvY29udGFjdC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==