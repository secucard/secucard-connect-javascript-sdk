'use strict';

exports.__esModule = true;
exports.ContractService = undefined;

var _productService = require('../product-service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContractService = exports.ContractService = function (_ProductService) {
    _inherits(ContractService, _ProductService);

    function ContractService() {
        _classCallCheck(this, ContractService);

        return _possibleConstructorReturn(this, _ProductService.call(this));
    }

    ContractService.prototype.getEndpoint = function getEndpoint() {
        return ['payment', 'contracts'];
    };

    ContractService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    ContractService.prototype.clone = function clone(contractId, cloneParams) {
        return this.execute(contractId, 'clone');
    };

    ContractService.prototype.cloneMine = function cloneMine(cloneParams) {
        return this.clone('me', cloneParams);
    };

    return ContractService;
}(_productService.ProductService);

ContractService.Uid = ['payment', 'contracts'].join('.');