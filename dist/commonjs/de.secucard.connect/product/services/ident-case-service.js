'use strict';

exports.__esModule = true;
exports.IdentCaseService = undefined;

var _productService = require('../product-service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var IdentCaseService = exports.IdentCaseService = function (_ProductService) {
    _inherits(IdentCaseService, _ProductService);

    function IdentCaseService() {
        _classCallCheck(this, IdentCaseService);

        return _possibleConstructorReturn(this, _ProductService.call(this));
    }

    IdentCaseService.prototype.getEndpoint = function getEndpoint() {
        return ['services', 'identcases'];
    };

    IdentCaseService.prototype.getEventTargets = function getEventTargets() {
        return ['services.identcases'];
    };

    IdentCaseService.prototype.start = function start(id) {
        return this.execute(id, "start");
    };

    IdentCaseService.prototype.task = function task(id, taskId, data) {
        return this.updateWithAction(id, "task", taskId, data);
    };

    IdentCaseService.prototype.close = function close(id) {
        return this.execute(id, "close");
    };

    return IdentCaseService;
}(_productService.ProductService);

IdentCaseService.Uid = ['services', 'identcases'].join('.');