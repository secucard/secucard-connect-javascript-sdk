System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, NewsService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            NewsService = (function (_ProductService) {
                _inherits(NewsService, _ProductService);

                function NewsService() {
                    _classCallCheck(this, NewsService);

                    _ProductService.call(this);
                }

                NewsService.prototype.getEndpoint = function getEndpoint() {
                    return ['general', 'news'];
                };

                NewsService.prototype.getEventTargets = function getEventTargets() {
                    return [];
                };

                NewsService.prototype.markRead = function markRead(newsId) {
                    return this.updateWithAction(newsId, 'markRead');
                };

                return NewsService;
            })(ProductService);

            _export('NewsService', NewsService);

            NewsService.Uid = ['general', 'news'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9nZW5lcmFsL25ld3Mtc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7d0JBYWEsV0FBVzs7Ozs7Ozs7NkNBRmhCLGNBQWM7OztBQUVULHVCQUFXOzBCQUFYLFdBQVc7O0FBRVQseUJBRkYsV0FBVyxHQUVOOzBDQUZMLFdBQVc7O0FBR2hCLDhDQUFPLENBQUE7aUJBQ1Y7O0FBSlEsMkJBQVcsV0FNcEIsV0FBVyxHQUFBLHVCQUFHO0FBQ1YsMkJBQU8sQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7aUJBQzlCOztBQVJRLDJCQUFXLFdBVXBCLGVBQWUsR0FBQSwyQkFBRztBQUNkLDJCQUFPLEVBQUUsQ0FBQztpQkFDYjs7QUFaUSwyQkFBVyxXQWNwQixRQUFRLEdBQUEsa0JBQUMsTUFBTSxFQUFFO0FBQ2IsMkJBQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQztpQkFDcEQ7O3VCQWhCUSxXQUFXO2VBQVMsY0FBYzs7OztBQW9CL0MsdUJBQVcsQ0FBQyxHQUFHLEdBQUcsQUFBQyxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L2dlbmVyYWwvbmV3cy1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==