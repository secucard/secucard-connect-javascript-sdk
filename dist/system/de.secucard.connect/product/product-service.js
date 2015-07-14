System.register(['../net/channel'], function (_export) {
	'use strict';

	var Channel, ProductService;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	return {
		setters: [function (_netChannel) {
			Channel = _netChannel.Channel;
		}],
		execute: function () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wcm9kdWN0LXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2NBQ2EsY0FBYzs7Ozs7O3lCQURuQixPQUFPOzs7QUFDRixpQkFBYztBQUdmLGFBSEMsY0FBYyxHQUdaOzJCQUhGLGNBQWM7S0FLekI7O0FBTFcsa0JBQWMsV0FPMUIsb0JBQW9CLEdBQUEsOEJBQUMsT0FBTyxFQUFFOztBQUU3QixTQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ25ELFNBQUksQ0FBQyx3QkFBd0IsR0FBRyxPQUFPLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBRS9FOztBQVpXLGtCQUFjLFdBYzFCLFdBQVcsR0FBQSx1QkFBRSxFQUlaOztBQWxCVyxrQkFBYyxXQTZCMUIsU0FBUyxHQUFBLG1CQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUU7O0FBRXRCLFNBQUksTUFBTSxHQUFHO0FBQ1osY0FBUSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUU7QUFDNUIsY0FBUSxFQUFFLEVBQUU7QUFDWixhQUFPLEVBQUUsT0FBTztNQUNoQixDQUFDOztBQUVGLFlBQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FFMUQ7O0FBdkNXLGtCQUFjLFdBbUQxQixhQUFhLEdBQUEsdUJBQUMsV0FBVyxFQUFFLE9BQU8sRUFBRTs7QUFFbkMsU0FBSSxNQUFNLEdBQUc7QUFDWixjQUFRLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRTtBQUM1QixpQkFBVyxFQUFFLFdBQVc7QUFDeEIsYUFBTyxFQUFFLE9BQU87TUFDaEIsQ0FBQzs7QUFFRixZQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUs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TUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FFOUQ7O0FBeE5XLGtCQUFjLFdBc08xQixnQkFBZ0IsR0FBQSwwQkFBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7O0FBRTlDLFNBQUksTUFBTSxHQUFHO0FBQ1osV0FBSyxFQUFFLEtBQUs7QUFDWixZQUFNLEVBQUUsTUFBTTtBQUNkLFVBQUksRUFBRSxJQUFJO0FBQ1YsYUFBTyxFQUFFLE9BQU87TUFDaEIsQ0FBQzs7QUFFRixZQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBRTlEOztBQWpQVyxrQkFBYyxXQTBQMUIsUUFBUSxHQUFBLGtCQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFOztBQUVqQyxTQUFHLE9BQU8sSUFBSSxJQUFJLEVBQUM7QUFDbEIsYUFBTyxHQUFHLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO01BQzFDOztBQUVELFNBQUcsTUFBTSxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUU7QUFDMUIsWUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7TUFDekI7O0FBRUQsWUFBTyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7S0FFeEQ7O1dBdFFXLGNBQWM7Ozs2QkFBZCxjQUFjIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wcm9kdWN0LXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9