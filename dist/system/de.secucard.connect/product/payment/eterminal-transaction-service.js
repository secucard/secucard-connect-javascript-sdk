System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, EterminalTransactionService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            EterminalTransactionService = (function (_ProductService) {
                _inherits(EterminalTransactionService, _ProductService);

                function EterminalTransactionService() {
                    _classCallCheck(this, EterminalTransactionService);

                    _ProductService.call(this);
                }

                EterminalTransactionService.prototype.getEndpoint = function getEndpoint() {
                    return ['payment', 'eterminaltransactions'];
                };

                EterminalTransactionService.prototype.getEventTargets = function getEventTargets() {
                    return [];
                };

                return EterminalTransactionService;
            })(ProductService);

            _export('EterminalTransactionService', EterminalTransactionService);

            EterminalTransactionService.Uid = ['payment', 'eterminaltransactions'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wYXltZW50L2V0ZXJtaW5hbC10cmFuc2FjdGlvbi1zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozt3QkFhYSwyQkFBMkI7Ozs7Ozs7OzZDQUZoQyxjQUFjOzs7QUFFVCx1Q0FBMkI7MEJBQTNCLDJCQUEyQjs7QUFFekIseUJBRkYsMkJBQTJCLEdBRXRCOzBDQUZMLDJCQUEyQjs7QUFHaEMsOENBQU8sQ0FBQTtpQkFDVjs7QUFKUSwyQ0FBMkIsV0FNcEMsV0FBVyxHQUFBLHVCQUFHO0FBQ1YsMkJBQU8sQ0FBQyxTQUFTLEVBQUUsdUJBQXVCLENBQUMsQ0FBQztpQkFDL0M7O0FBUlEsMkNBQTJCLFdBVXBDLGVBQWUsR0FBQSwyQkFBRztBQUNkLDJCQUFPLEVBQUUsQ0FBQztpQkFDYjs7dUJBWlEsMkJBQTJCO2VBQVMsY0FBYzs7OztBQWdCL0QsdUNBQTJCLENBQUMsR0FBRyxHQUFHLEFBQUMsQ0FBQyxTQUFTLEVBQUUsdUJBQXVCLENBQUMsQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L3BheW1lbnQvZXRlcm1pbmFsLXRyYW5zYWN0aW9uLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9
