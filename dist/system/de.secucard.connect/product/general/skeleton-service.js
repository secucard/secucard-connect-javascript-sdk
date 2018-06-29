'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SkeletonService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _productService = require('../product-service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SkeletonService = exports.SkeletonService = function (_ProductService) {
    _inherits(SkeletonService, _ProductService);

    function SkeletonService() {
        _classCallCheck(this, SkeletonService);

        return _possibleConstructorReturn(this, (SkeletonService.__proto__ || Object.getPrototypeOf(SkeletonService)).call(this));
    }

    _createClass(SkeletonService, [{
        key: 'getEndpoint',
        value: function getEndpoint() {
            return ['general', 'skeletons'];
        }
    }, {
        key: 'getEventTargets',
        value: function getEventTargets() {
            return ['general.skeletons'];
        }
    }, {
        key: 'demoEvent',
        value: function demoEvent() {
            return this.execute(1, 'demoevent');
        }
    }]);

    return SkeletonService;
}(_productService.ProductService);

SkeletonService.Uid = ['general', 'skeletons'].join('.');
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9nZW5lcmFsL3NrZWxldG9uLXNlcnZpY2UuanMiXSwibmFtZXMiOlsiU2tlbGV0b25TZXJ2aWNlIiwiZXhlY3V0ZSIsIlByb2R1Y3RTZXJ2aWNlIiwiVWlkIiwiam9pbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBV0E7Ozs7Ozs7O0lBRWFBLGUsV0FBQUEsZTs7O0FBRVQsK0JBQWM7QUFBQTs7QUFBQTtBQUViOzs7O3NDQUVhO0FBQ1YsbUJBQU8sQ0FBQyxTQUFELEVBQVksV0FBWixDQUFQO0FBQ0g7OzswQ0FFaUI7QUFDZCxtQkFBTyxDQUFDLG1CQUFELENBQVA7QUFDSDs7O29DQUVXO0FBR1IsbUJBQU8sS0FBS0MsT0FBTCxDQUFhLENBQWIsRUFBZ0IsV0FBaEIsQ0FBUDtBQUVIOzs7O0VBbkJnQ0MsOEI7O0FBdUJyQ0YsZ0JBQWdCRyxHQUFoQixHQUF1QixDQUFDLFNBQUQsRUFBWSxXQUFaLENBQUQsQ0FBMkJDLElBQTNCLENBQWdDLEdBQWhDLENBQXRCIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9nZW5lcmFsL3NrZWxldG9uLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9
