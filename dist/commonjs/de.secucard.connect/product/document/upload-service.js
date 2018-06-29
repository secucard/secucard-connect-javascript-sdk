'use strict';

exports.__esModule = true;
exports.UploadService = undefined;

var _productService = require('../product-service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var UploadService = exports.UploadService = function (_ProductService) {
    _inherits(UploadService, _ProductService);

    function UploadService() {
        _classCallCheck(this, UploadService);

        return _possibleConstructorReturn(this, _ProductService.call(this));
    }

    UploadService.prototype.getEndpoint = function getEndpoint() {
        return ['document', 'uploads'];
    };

    UploadService.prototype.getEventTargets = function getEventTargets() {
        return [];
    };

    UploadService.prototype.upload = function upload(base64str) {
        return _ProductService.prototype.execute.call(this, null, null, null, { content: base64str }, {
            channelConfig: ['rest'],
            useAuth: false });
    };

    UploadService.prototype.uploadMultiForm = function uploadMultiForm(files) {
        return _ProductService.prototype.create.call(this, null, {
            channelConfig: ['rest'],
            useAuth: false }, { files: files });
    };

    return UploadService;
}(_productService.ProductService);

UploadService.Uid = ['document', 'uploads'].join('.');