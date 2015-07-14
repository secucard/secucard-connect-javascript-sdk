'use strict';

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

exports.__esModule = true;

var _netChannel = require('../net/channel');

var ProductService = (function () {
	function ProductService() {
		_classCallCheck(this, ProductService);
	}

	ProductService.prototype.configureWithContext = function configureWithContext(context) {

		this.getChannel = context.getChannel.bind(context);
		this.getServiceDefaultOptions = context.getServiceDefaultOptions.bind(context);
	};

	ProductService.prototype.getEndpoint = function getEndpoint() {};

	ProductService.prototype.getObject = function getObject(id, options) {

		var params = {
			endpoint: this.getEndpoint(),
			objectId: id,
			options: options
		};

		return this._request(_netChannel.Channel.METHOD.GET, params, options);
	};

	ProductService.prototype.getObjectList = function getObjectList(queryParams, options) {

		var params = {
			endpoint: this.getEndpoint(),
			queryParams: queryParams,
			options: options
		};

		return this._request(_netChannel.Channel.METHOD.GET, params, options);
	};

	ProductService.prototype.createObject = function createObject(data, options) {

		var params = {
			endpoint: this.getEndpoint(),
			data: data,
			options: options
		};

		return this._request(_netChannel.Channel.METHOD.CREATE, params, options);
	};

	ProductService.prototype.updateObject = function updateObject(data, options) {

		var params = {
			endpoint: this.getEndpoint(),
			objectId: data.id,
			data: data,
			options: options
		};

		return this._request(_netChannel.Channel.METHOD.UPDATE, params, options);
	};

	ProductService.prototype.updateObjectWithAction = function updateObjectWithAction(id, action, actionArg, data, options) {

		var params = {
			endpoint: this.getEndpoint(),
			objectId: id,
			data: data,
			action: action,
			actionArg: actionArg,
			options: options
		};

		return this._request(_netChannel.Channel.METHOD.UPDATE, params, options);
	};

	ProductService.prototype.deleteObject = function deleteObject(id, options) {

		var params = {
			endpoint: this.getEndpoint(),
			objectId: id,
			options: options
		};

		return this._request(_netChannel.Channel.METHOD.DELETE, params, options);
	};

	ProductService.prototype.deleteObjectWithAction = function deleteObjectWithAction(id, action, actionArg, options) {

		var params = {
			endpoint: this.getEndpoint(),
			objectId: id,
			action: action,
			actionArg: actionArg,
			options: options
		};

		return this._request(_netChannel.Channel.METHOD.DELETE, params, options);
	};

	ProductService.prototype.execute = function execute(id, action, actionArg, data, options) {

		var params = {
			endpoint: this.getEndpoint(),
			objectId: id,
			action: action,
			actionArg: actionArg,
			data: data,
			options: options
		};

		return this._request(_netChannel.Channel.METHOD.EXECUTE, params, options);
	};

	ProductService.prototype.executeAppAction = function executeAppAction(appId, action, data, options) {

		var params = {
			appId: appId,
			action: action,
			data: data,
			options: options
		};

		return this._request(_netChannel.Channel.METHOD.EXECUTE, params, options);
	};

	ProductService.prototype._request = function _request(method, params, options) {

		if (options == null) {
			options = this.getServiceDefaultOptions();
		}

		if (params.options == null) {
			params.options = options;
		}

		return this.getChannel(options).request(method, params);
	};

	return ProductService;
})();

exports.ProductService = ProductService;