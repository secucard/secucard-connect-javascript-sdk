'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.IdentRequestService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _productService = require('../product-service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IdentRequestService = exports.IdentRequestService = function (_ProductService) {
    _inherits(IdentRequestService, _ProductService);

    function IdentRequestService() {
        _classCallCheck(this, IdentRequestService);

        return _possibleConstructorReturn(this, (IdentRequestService.__proto__ || Object.getPrototypeOf(IdentRequestService)).call(this));
    }

    _createClass(IdentRequestService, [{
        key: 'getEndpoint',
        value: function getEndpoint() {
            return ['services', 'identrequests'];
        }
    }, {
        key: 'getEventTargets',
        value: function getEventTargets() {
            return [];
        }
    }]);

    return IdentRequestService;
}(_productService.ProductService);

IdentRequestService.Uid = ['services', 'identrequests'].join('.');
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zZXJ2aWNlcy9pZGVudC1yZXF1ZXN0LXNlcnZpY2UuanMiXSwibmFtZXMiOlsiSWRlbnRSZXF1ZXN0U2VydmljZSIsIlByb2R1Y3RTZXJ2aWNlIiwiVWlkIiwiam9pbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBV0E7Ozs7Ozs7O0lBRWFBLG1CLFdBQUFBLG1COzs7QUFFVCxtQ0FBYztBQUFBOztBQUFBO0FBRWI7Ozs7c0NBRWE7QUFDVixtQkFBTyxDQUFDLFVBQUQsRUFBYSxlQUFiLENBQVA7QUFDSDs7OzBDQUVpQjtBQUNkLG1CQUFPLEVBQVA7QUFDSDs7OztFQVpvQ0MsOEI7O0FBZ0J6Q0Qsb0JBQW9CRSxHQUFwQixHQUEyQixDQUFDLFVBQUQsRUFBYSxlQUFiLENBQUQsQ0FBZ0NDLElBQWhDLENBQXFDLEdBQXJDLENBQTFCIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9zZXJ2aWNlcy9pZGVudC1yZXF1ZXN0LXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9
