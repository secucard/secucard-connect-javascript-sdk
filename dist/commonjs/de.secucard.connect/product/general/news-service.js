'use strict';

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _productService = require('../product-service');

var NewsService = (function (_ProductService) {
	function NewsService() {
		_classCallCheck(this, NewsService);

		_ProductService.call(this);
	}

	_inherits(NewsService, _ProductService);

	NewsService.prototype.getEndpoint = function getEndpoint() {
		return ['general', 'news'];
	};

	NewsService.prototype.getEventTargets = function getEventTargets() {
		return [];
	};

	NewsService.prototype.markRead = function markRead(newsId) {
		return this.updateWithAction(newsId, 'markRead');
	};

	return NewsService;
})(_productService.ProductService);

exports.NewsService = NewsService;

NewsService.Uid = ['general', 'news'].join('.');