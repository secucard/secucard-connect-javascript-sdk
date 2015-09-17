System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, SkeletonService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            SkeletonService = (function (_ProductService) {
                function SkeletonService() {
                    _classCallCheck(this, SkeletonService);

                    _ProductService.call(this);
                }

                _inherits(SkeletonService, _ProductService);

                SkeletonService.prototype.getEndpoint = function getEndpoint() {
                    return ['general', 'skeletons'];
                };

                SkeletonService.prototype.getEventTargets = function getEventTargets() {
                    return ['general.skeletons'];
                };

                SkeletonService.prototype.demoEvent = function demoEvent() {
                    return this.execute(1, 'demoevent');
                };

                return SkeletonService;
            })(ProductService);

            _export('SkeletonService', SkeletonService);

            SkeletonService.Uid = ['general', 'skeletons'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9nZW5lcmFsL3NrZWxldG9uLXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3dCQWFhLGVBQWU7Ozs7Ozs7OzZDQUZwQixjQUFjOzs7QUFFVCwyQkFBZTtBQUViLHlCQUZGLGVBQWUsR0FFVjswQ0FGTCxlQUFlOztBQUdwQiw4Q0FBTyxDQUFBO2lCQUNWOzswQkFKUSxlQUFlOztBQUFmLCtCQUFlLFdBTXhCLFdBQVcsR0FBQSx1QkFBRztBQUNWLDJCQUFPLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDO2lCQUNuQzs7QUFSUSwrQkFBZSxXQVV4QixlQUFlLEdBQUEsMkJBQUc7QUFDZCwyQkFBTyxDQUFDLG1CQUFtQixDQUFDLENBQUM7aUJBQ2hDOztBQVpRLCtCQUFlLFdBY3hCLFNBQVMsR0FBQSxxQkFBRztBQUdSLDJCQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDO2lCQUV2Qzs7dUJBbkJRLGVBQWU7ZUFBUyxjQUFjOzt1Q0FBdEMsZUFBZTs7QUF1QjVCLDJCQUFlLENBQUMsR0FBRyxHQUFHLEFBQUMsQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLENBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9nZW5lcmFsL3NrZWxldG9uLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9