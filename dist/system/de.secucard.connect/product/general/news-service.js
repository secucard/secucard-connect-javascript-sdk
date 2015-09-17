System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, NewsService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            NewsService = (function (_ProductService) {
                function NewsService() {
                    _classCallCheck(this, NewsService);

                    _ProductService.call(this);
                }

                _inherits(NewsService, _ProductService);

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9nZW5lcmFsL25ld3Mtc2VydmljZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7d0JBYWEsV0FBVzs7Ozs7Ozs7NkNBRmhCLGNBQWM7OztBQUVULHVCQUFXO0FBRVQseUJBRkYsV0FBVyxHQUVOOzBDQUZMLFdBQVc7O0FBR2hCLDhDQUFPLENBQUE7aUJBQ1Y7OzBCQUpRLFdBQVc7O0FBQVgsMkJBQVcsV0FNcEIsV0FBVyxHQUFBLHVCQUFHO0FBQ1YsMkJBQU8sQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLENBQUM7aUJBQzlCOztBQVJRLDJCQUFXLFdBVXBCLGVBQWUsR0FBQSwyQkFBRztBQUNkLDJCQUFPLEVBQUUsQ0FBQztpQkFDYjs7QUFaUSwyQkFBVyxXQWNwQixRQUFRLEdBQUEsa0JBQUMsTUFBTSxFQUFFO0FBQ2IsMkJBQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsQ0FBQztpQkFDcEQ7O3VCQWhCUSxXQUFXO2VBQVMsY0FBYzs7bUNBQWxDLFdBQVc7O0FBb0J4Qix1QkFBVyxDQUFDLEdBQUcsR0FBRyxBQUFDLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3QvZ2VuZXJhbC9uZXdzLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9