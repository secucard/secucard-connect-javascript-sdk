System.register(['../product-service'], function (_export) {
    'use strict';

    var ProductService, ClearingSepaoutbatchsService;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

    return {
        setters: [function (_productService) {
            ProductService = _productService.ProductService;
        }],
        execute: function () {
            ClearingSepaoutbatchsService = (function (_ProductService) {
                _inherits(ClearingSepaoutbatchsService, _ProductService);

                function ClearingSepaoutbatchsService() {
                    _classCallCheck(this, ClearingSepaoutbatchsService);

                    _ProductService.call(this);
                }

                ClearingSepaoutbatchsService.prototype.getEndpoint = function getEndpoint() {
                    return ['clearing', 'sepaoutbatchs'];
                };

                ClearingSepaoutbatchsService.prototype.getEventTargets = function getEventTargets() {
                    return [];
                };

                return ClearingSepaoutbatchsService;
            })(ProductService);

            _export('ClearingSepaoutbatchsService', ClearingSepaoutbatchsService);

            ClearingSepaoutbatchsService.Uid = ['clearing', 'sepaoutbatchs'].join('.');
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9jbGVhcmluZy9jbGVhcmluZy1zZXBhLW91dGJhdGNocy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7d0JBYWEsNEJBQTRCOzs7Ozs7Ozs2Q0FGakMsY0FBYzs7O0FBRVQsd0NBQTRCOzBCQUE1Qiw0QkFBNEI7O0FBRTFCLHlCQUZGLDRCQUE0QixHQUV2QjswQ0FGTCw0QkFBNEI7O0FBR2pDLDhDQUFPLENBQUE7aUJBQ1Y7O0FBSlEsNENBQTRCLFdBTXJDLFdBQVcsR0FBQSx1QkFBRztBQUNWLDJCQUFPLENBQUMsVUFBVSxFQUFFLGVBQWUsQ0FBQyxDQUFDO2lCQUN4Qzs7QUFSUSw0Q0FBNEIsV0FVckMsZUFBZSxHQUFBLDJCQUFHO0FBQ2QsMkJBQU8sRUFBRSxDQUFDO2lCQUNiOzt1QkFaUSw0QkFBNEI7ZUFBUyxjQUFjOzs7O0FBZ0JoRSx3Q0FBNEIsQ0FBQyxHQUFHLEdBQUcsQUFBQyxDQUFDLFVBQVUsRUFBRSxlQUFlLENBQUMsQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L2NsZWFyaW5nL2NsZWFyaW5nLXNlcGEtb3V0YmF0Y2hzLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==
