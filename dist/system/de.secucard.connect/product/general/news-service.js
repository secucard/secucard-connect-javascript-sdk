'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.NewsService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _productService = require('../product-service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NewsService = exports.NewsService = function (_ProductService) {
    _inherits(NewsService, _ProductService);

    function NewsService() {
        _classCallCheck(this, NewsService);

        return _possibleConstructorReturn(this, (NewsService.__proto__ || Object.getPrototypeOf(NewsService)).call(this));
    }

    _createClass(NewsService, [{
        key: 'getEndpoint',
        value: function getEndpoint() {
            return ['general', 'news'];
        }
    }, {
        key: 'getEventTargets',
        value: function getEventTargets() {
            return [];
        }
    }, {
        key: 'markRead',
        value: function markRead(newsId) {
            return this.updateWithAction(newsId, 'markRead');
        }
    }]);

    return NewsService;
}(_productService.ProductService);

NewsService.Uid = ['general', 'news'].join('.');
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9nZW5lcmFsL25ld3Mtc2VydmljZS5qcyJdLCJuYW1lcyI6WyJOZXdzU2VydmljZSIsIm5ld3NJZCIsInVwZGF0ZVdpdGhBY3Rpb24iLCJQcm9kdWN0U2VydmljZSIsIlVpZCIsImpvaW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQVdBOzs7Ozs7OztJQUVhQSxXLFdBQUFBLFc7OztBQUVULDJCQUFjO0FBQUE7O0FBQUE7QUFFYjs7OztzQ0FFYTtBQUNWLG1CQUFPLENBQUMsU0FBRCxFQUFZLE1BQVosQ0FBUDtBQUNIOzs7MENBRWlCO0FBQ2QsbUJBQU8sRUFBUDtBQUNIOzs7aUNBRVFDLE0sRUFBUTtBQUNiLG1CQUFPLEtBQUtDLGdCQUFMLENBQXNCRCxNQUF0QixFQUE4QixVQUE5QixDQUFQO0FBQ0g7Ozs7RUFoQjRCRSw4Qjs7QUFvQmpDSCxZQUFZSSxHQUFaLEdBQW1CLENBQUMsU0FBRCxFQUFZLE1BQVosQ0FBRCxDQUFzQkMsSUFBdEIsQ0FBMkIsR0FBM0IsQ0FBbEIiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L2dlbmVyYWwvbmV3cy1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==
