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

            SecupayDebitService.Uid = ['payment', 'eterminaltransactions'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wYXltZW50L2V0ZXJtaW5hbC10cmFuc2FjdGlvbnMtc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7d0JBYWEsMkJBQTJCOzs7Ozs7Ozs2Q0FGaEMsY0FBYzs7O0FBRVQsdUNBQTJCOzBCQUEzQiwyQkFBMkI7O0FBRXpCLHlCQUZGLDJCQUEyQixHQUV0QjswQ0FGTCwyQkFBMkI7O0FBR2hDLDhDQUFPLENBQUE7aUJBQ1Y7O0FBSlEsMkNBQTJCLFdBTXBDLFdBQVcsR0FBQSx1QkFBRztBQUNWLDJCQUFPLENBQUMsU0FBUyxFQUFFLHVCQUF1QixDQUFDLENBQUM7aUJBQy9DOztBQVJRLDJDQUEyQixXQVVwQyxlQUFlLEdBQUEsMkJBQUc7QUFDZCwyQkFBTyxFQUFFLENBQUM7aUJBQ2I7O3VCQVpRLDJCQUEyQjtlQUFTLGNBQWM7Ozs7QUFnQi9ELCtCQUFtQixDQUFDLEdBQUcsR0FBRyxBQUFDLENBQUMsU0FBUyxFQUFFLHVCQUF1QixDQUFDLENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wYXltZW50L2V0ZXJtaW5hbC10cmFuc2FjdGlvbnMtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=
