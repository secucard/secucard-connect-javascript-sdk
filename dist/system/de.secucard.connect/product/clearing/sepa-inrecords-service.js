System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, SepaInrecordsService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            SepaInrecordsService = (function (_ProductService) {
                _inherits(SepaInrecordsService, _ProductService);

                function SepaInrecordsService() {
                    _classCallCheck(this, SepaInrecordsService);

                    _ProductService.call(this);
                }

                SepaInrecordsService.prototype.getEndpoint = function getEndpoint() {
                    return ['clearing', 'sepainrecords'];
                };

                SepaInrecordsService.prototype.getEventTargets = function getEventTargets() {
                    return [];
                };

                return SepaInrecordsService;
            })(ProductService);

            _export('SepaInrecordsService', SepaInrecordsService);

            SepaInrecordsService.Uid = ['clearing', 'sepainrecords'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9jbGVhcmluZy9zZXBhLWlucmVjb3Jkcy1zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozt3QkFhYSxvQkFBb0I7Ozs7Ozs7OzZDQUZ6QixjQUFjOzs7QUFFVCxnQ0FBb0I7MEJBQXBCLG9CQUFvQjs7QUFFbEIseUJBRkYsb0JBQW9CLEdBRWY7MENBRkwsb0JBQW9COztBQUd6Qiw4Q0FBTyxDQUFBO2lCQUNWOztBQUpRLG9DQUFvQixXQU03QixXQUFXLEdBQUEsdUJBQUc7QUFDViwyQkFBTyxDQUFDLFVBQVUsRUFBRSxlQUFlLENBQUMsQ0FBQztpQkFDeEM7O0FBUlEsb0NBQW9CLFdBVTdCLGVBQWUsR0FBQSwyQkFBRztBQUNkLDJCQUFPLEVBQUUsQ0FBQztpQkFDYjs7dUJBWlEsb0JBQW9CO2VBQVMsY0FBYzs7OztBQWdCeEQsZ0NBQW9CLENBQUMsR0FBRyxHQUFHLEFBQUMsQ0FBQyxVQUFVLEVBQUUsZUFBZSxDQUFDLENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9jbGVhcmluZy9zZXBhLWlucmVjb3Jkcy1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==
