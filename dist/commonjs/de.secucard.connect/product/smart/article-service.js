'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var ArticleService = (function (_ProductService) {
  _inherits(ArticleService, _ProductService);

  function ArticleService() {
    _classCallCheck(this, ArticleService);

    _ProductService.call(this);
  }

  ArticleService.prototype.getEndpoint = function getEndpoint() {
    return ['smart', 'articles'];
  };

  ArticleService.prototype.getEventTargets = function getEventTargets() {
    return [];
  };

  return ArticleService;
})(_productService.ProductService);

exports.ArticleService = ArticleService;

ArticleService.Uid = ['smart', 'articles'].join('.');