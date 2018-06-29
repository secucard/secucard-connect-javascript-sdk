'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.StoreService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _productService = require('../product-service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StoreService = exports.StoreService = function (_ProductService) {
    _inherits(StoreService, _ProductService);

    function StoreService() {
        _classCallCheck(this, StoreService);

        return _possibleConstructorReturn(this, (StoreService.__proto__ || Object.getPrototypeOf(StoreService)).call(this));
    }

    _createClass(StoreService, [{
        key: 'getEndpoint',
        value: function getEndpoint() {
            return ['general', 'stores'];
        }
    }, {
        key: 'getEventTargets',
        value: function getEventTargets() {
            return [];
        }
    }, {
        key: 'checkIn',
        value: function checkIn(storeId, checkInState) {
            return this.updateWithAction(storeId, 'checkin', checkInState);
        }
    }, {
        key: 'setDefault',
        value: function setDefault(storeId) {
            return this.updateWithAction(storeId, 'setDefault');
        }
    }]);

    return StoreService;
}(_productService.ProductService);

StoreService.Uid = ['general', 'stores'].join('.');
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9nZW5lcmFsL3N0b3JlLXNlcnZpY2UuanMiXSwibmFtZXMiOlsiU3RvcmVTZXJ2aWNlIiwic3RvcmVJZCIsImNoZWNrSW5TdGF0ZSIsInVwZGF0ZVdpdGhBY3Rpb24iLCJQcm9kdWN0U2VydmljZSIsIlVpZCIsImpvaW4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQVdBOzs7Ozs7OztJQUVhQSxZLFdBQUFBLFk7OztBQUVULDRCQUFjO0FBQUE7O0FBQUE7QUFFYjs7OztzQ0FFYTtBQUNWLG1CQUFPLENBQUMsU0FBRCxFQUFZLFFBQVosQ0FBUDtBQUNIOzs7MENBRWlCO0FBQ2QsbUJBQU8sRUFBUDtBQUNIOzs7Z0NBRU9DLE8sRUFBU0MsWSxFQUFjO0FBQzNCLG1CQUFPLEtBQUtDLGdCQUFMLENBQXNCRixPQUF0QixFQUErQixTQUEvQixFQUEwQ0MsWUFBMUMsQ0FBUDtBQUNIOzs7bUNBRVVELE8sRUFBUztBQUNoQixtQkFBTyxLQUFLRSxnQkFBTCxDQUFzQkYsT0FBdEIsRUFBK0IsWUFBL0IsQ0FBUDtBQUNIOzs7O0VBcEI2QkcsOEI7O0FBd0JsQ0osYUFBYUssR0FBYixHQUFvQixDQUFDLFNBQUQsRUFBWSxRQUFaLENBQUQsQ0FBd0JDLElBQXhCLENBQTZCLEdBQTdCLENBQW5CIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9nZW5lcmFsL3N0b3JlLXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9
