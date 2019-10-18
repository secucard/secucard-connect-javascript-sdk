System.register(['../product-service'], function (_export) {
  'use strict';

  var ProductService, ArticleService;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

  return {
    setters: [function (_productService) {
      ProductService = _productService.ProductService;
    }],
    execute: function () {
      ArticleService = (function (_ProductService) {
        _inherits(ArticleService, _ProductService);

        function ArticleService() {
          _classCallCheck(this, ArticleService);

          _ProductService.call(this);
        }

        ArticleService.prototype.getEndpoint = function getEndpoint() {
          return ['smart', 'articles'];
        };

        ArticleService.prototype.getEventTargets = function getEventTargets() {
          return [];
        };

        return ArticleService;
      })(ProductService);

      _export('ArticleService', ArticleService);

      ArticleService.Uid = ['smart', 'articles'].join('.');
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zbWFydC9hcnRpY2xlLXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3NCQWFhLGNBQWM7Ozs7Ozs7O3VDQUZuQixjQUFjOzs7QUFFVCxvQkFBYztrQkFBZCxjQUFjOztBQUVmLGlCQUZDLGNBQWMsR0FFWjtnQ0FGRixjQUFjOztBQUd6QixvQ0FBTyxDQUFBO1NBQ1A7O0FBSlcsc0JBQWMsV0FNMUIsV0FBVyxHQUFBLHVCQUFHO0FBQ2IsaUJBQU8sQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7U0FDN0I7O0FBUlcsc0JBQWMsV0FVMUIsZUFBZSxHQUFBLDJCQUFHO0FBQ2pCLGlCQUFPLEVBQUUsQ0FBQztTQUNWOztlQVpXLGNBQWM7U0FBUyxjQUFjOzs7O0FBZ0JsRCxvQkFBYyxDQUFDLEdBQUcsR0FBRyxBQUFDLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3Qvc21hcnQvYXJ0aWNsZS1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==
