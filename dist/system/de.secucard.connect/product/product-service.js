System.register(['babel-runtime/helpers/class-call-check', '../net/channel'], function (_export) {
	var _classCallCheck, Channel, ProductService;

	return {
		setters: [function (_babelRuntimeHelpersClassCallCheck) {
			_classCallCheck = _babelRuntimeHelpersClassCallCheck['default'];
		}, function (_netChannel) {
			Channel = _netChannel.Channel;
		}],
		execute: function () {
			'use strict';

			ProductService = (function () {
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

					return this._request(Channel.METHOD.GET, params, options);
				};

				ProductService.prototype.getObjectList = function getObjectList(queryParams, options) {

					var params = {
						endpoint: this.getEndpoint(),
						queryParams: queryParams,
						options: options
					};

					return this._request(Channel.METHOD.GET, params, options);
				};

				ProductService.prototype.createObject = function createObject(data, options) {

					var params = {
						endpoint: this.getEndpoint(),
						data: data,
						options: options
					};

					return this._request(Channel.METHOD.CREATE, params, options);
				};

				ProductService.prototype.updateObject = function updateObject(data, options) {

					var params = {
						endpoint: this.getEndpoint(),
						objectId: data.id,
						data: data,
						options: options
					};

					return this._request(Channel.METHOD.UPDATE, params, options);
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

					return this._request(Channel.METHOD.UPDATE, params, options);
				};

				ProductService.prototype.deleteObject = function deleteObject(id, options) {

					var params = {
						endpoint: this.getEndpoint(),
						objectId: id,
						options: options
					};

					return this._request(Channel.METHOD.DELETE, params, options);
				};

				ProductService.prototype.deleteObjectWithAction = function deleteObjectWithAction(id, action, actionArg, options) {

					var params = {
						endpoint: this.getEndpoint(),
						objectId: id,
						action: action,
						actionArg: actionArg,
						options: options
					};

					return this._request(Channel.METHOD.DELETE, params, options);
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

					return this._request(Channel.METHOD.EXECUTE, params, options);
				};

				ProductService.prototype.executeAppAction = function executeAppAction(appId, action, data, options) {

					var params = {
						appId: appId,
						action: action,
						data: data,
						options: options
					};

					return this._request(Channel.METHOD.EXECUTE, params, options);
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

			_export('ProductService', ProductService);
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wcm9kdWN0LXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjsrQkFDYSxjQUFjOzs7Ozs7eUJBRG5CLE9BQU87Ozs7O0FBQ0YsaUJBQWM7QUFHZixhQUhDLGNBQWMsR0FHWjsyQkFIRixjQUFjO0tBS3pCOztBQUxXLGtCQUFjLFdBTzFCLG9CQUFvQixHQUFBLDhCQUFDLE9BQU8sRUFBRTs7QUFFN0IsU0FBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNuRCxTQUFJLENBQUMsd0JBQXdCLEdBQUcsT0FBTyxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUUvRTs7QUFaVyxrQkFBYyxXQWMxQixXQUFXLEdBQUEsdUJBQUUsRUFJWjs7QUFsQlcsa0JBQWMsV0E2QjFCLFNBQVMsR0FBQSxtQkFBQyxFQUFFLEVBQUUsT0FBTyxFQUFFOztBQUV0QixTQUFJLE1BQU0sR0FBRztBQUNaLGNBQVEsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFO0FBQzVCLGNBQVEsRUFBRSxFQUFFO0FBQ1osYUFBTyxFQUFFLE9BQU87TUFDaEIsQ0FBQzs7QUFFRixZQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBRTFEOztBQXZDVyxrQkFBYyxXQW1EMUIsYUFBYSxHQUFBLHVCQUFDLFdBQVcsRUFBRSxPQUFPLEVBQUU7O0FBRW5DLFNBQUksTUFBTSxHQUFHO0FBQ1osY0FBUSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUU7QUFDNUIsaUJBQVcsRUFBRSxXQUFXO0FBQ3hCLGFBQU8sRUFBRSxPQUFPO01BQ2hCLENBQUM7O0FBRUYsWUFBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFF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LE1BQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBRTlEOztBQXhOVyxrQkFBYyxXQXNPMUIsZ0JBQWdCLEdBQUEsMEJBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFOztBQUU5QyxTQUFJLE1BQU0sR0FBRztBQUNaLFdBQUssRUFBRSxLQUFLO0FBQ1osWUFBTSxFQUFFLE1BQU07QUFDZCxVQUFJLEVBQUUsSUFBSTtBQUNWLGFBQU8sRUFBRSxPQUFPO01BQ2hCLENBQUM7O0FBRUYsWUFBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztLQUU5RDs7QUFqUFcsa0JBQWMsV0EwUDFCLFFBQVEsR0FBQSxrQkFBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRTs7QUFFakMsU0FBRyxPQUFPLElBQUksSUFBSSxFQUFDO0FBQ2xCLGFBQU8sR0FBRyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztNQUMxQzs7QUFFRCxTQUFHLE1BQU0sQ0FBQyxPQUFPLElBQUksSUFBSSxFQUFFO0FBQzFCLFlBQU0sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO01BQ3pCOztBQUVELFlBQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0tBRXhEOztXQXRRVyxjQUFjOzs7NkJBQWQsY0FBYyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3QvcHJvZHVjdC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==