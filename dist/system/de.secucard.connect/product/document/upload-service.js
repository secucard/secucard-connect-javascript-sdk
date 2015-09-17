System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, UploadService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            UploadService = (function (_ProductService) {
                function UploadService() {
                    _classCallCheck(this, UploadService);

                    _ProductService.call(this);
                }

                _inherits(UploadService, _ProductService);

                UploadService.prototype.getEndpoint = function getEndpoint() {
                    return ['document', 'uploads'];
                };

                UploadService.prototype.getEventTargets = function getEventTargets() {
                    return [];
                };

                UploadService.prototype.upload = function upload(base64str) {
                    return _ProductService.prototype.execute.call(this, null, null, null, { content: base64str }, {
                        channelConfig: ['rest'],
                        useAuth: false });
                };

                return UploadService;
            })(ProductService);

            _export('UploadService', UploadService);

            UploadService.Uid = ['document', 'uploads'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9kb2N1bWVudC91cGxvYWQtc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7d0JBYWEsYUFBYTs7Ozs7Ozs7NkNBRmxCLGNBQWM7OztBQUVULHlCQUFhO0FBRVgseUJBRkYsYUFBYSxHQUVSOzBDQUZMLGFBQWE7O0FBR2xCLDhDQUFPLENBQUE7aUJBQ1Y7OzBCQUpRLGFBQWE7O0FBQWIsNkJBQWEsV0FNdEIsV0FBVyxHQUFBLHVCQUFHO0FBQ1YsMkJBQU8sQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUM7aUJBQ2xDOztBQVJRLDZCQUFhLFdBVXRCLGVBQWUsR0FBQSwyQkFBRztBQUNkLDJCQUFPLEVBQUUsQ0FBQztpQkFDYjs7QUFaUSw2QkFBYSxXQWN0QixNQUFNLEdBQUEsZ0JBQUMsU0FBUyxFQUFFO0FBQ2QsMkJBQU8sMEJBQU0sT0FBTyxLQUFBLE9BQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsU0FBUyxFQUFDLEVBQUU7QUFDekQscUNBQWEsRUFBRSxDQUFDLE1BQU0sQ0FBQztBQUN2QiwrQkFBTyxFQUFFLEtBQUssRUFDakIsQ0FBQyxDQUFDO2lCQUNOOzt1QkFuQlEsYUFBYTtlQUFTLGNBQWM7O3FDQUFwQyxhQUFhOztBQXVCMUIseUJBQWEsQ0FBQyxHQUFHLEdBQUcsQUFBQyxDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L2RvY3VtZW50L3VwbG9hZC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==