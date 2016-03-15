'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var UploadService = (function (_ProductService) {
    _inherits(UploadService, _ProductService);

    function UploadService() {
        _classCallCheck(this, UploadService);

        _ProductService.call(this);
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
})(_productService.ProductService);

exports.UploadService = UploadService;

UploadService.Uid = ['document', 'uploads'].join('.');