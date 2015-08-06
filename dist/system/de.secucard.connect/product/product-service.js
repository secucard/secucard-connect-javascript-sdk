System.register(['../net/channel', 'eventemitter3'], function (_export) {
	'use strict';

	var Channel, EE, ProductService;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	return {
		setters: [function (_netChannel) {
			Channel = _netChannel.Channel;
		}, function (_eventemitter3) {
			EE = _eventemitter3['default'];
		}],
		execute: function () {
			ProductService = (function () {
				function ProductService() {
					_classCallCheck(this, ProductService);

					Object.assign(this, EE.prototype);
				}

				ProductService.prototype.configureWithContext = function configureWithContext(context) {

					this.getChannel = context.getChannel.bind(context);
					this.getServiceDefaultOptions = context.getServiceDefaultOptions.bind(context);
				};

				ProductService.prototype.getEndpoint = function getEndpoint() {};

				ProductService.prototype.getEventTargets = function getEventTargets() {};

				ProductService.prototype.getUid = function getUid() {

					return this.getEndpoint().join('.').toLowerCase();
				};

				ProductService.prototype.retrieve = function retrieve(id, options) {

					var params = {
						endpoint: this.getEndpoint(),
						objectId: id,
						options: options
					};

					return this._request(Channel.METHOD.GET, params, options);
				};

				ProductService.prototype.retrieveWithAction = function retrieveWithAction(id, action, actionArg, options) {

					var params = {
						endpoint: this.getEndpoint(),
						objectId: id,
						action: action,
						actionArg: actionArg,
						options: options
					};

					return this._request(Channel.METHOD.GET, params, options);
				};

				ProductService.prototype.retrieveList = function retrieveList(queryParams, options) {

					var params = {
						endpoint: this.getEndpoint(),
						queryParams: queryParams,
						options: options
					};

					return this._request(Channel.METHOD.GET, params, options);
				};

				ProductService.prototype.create = function create(data, options) {

					var params = {
						endpoint: this.getEndpoint(),
						data: data,
						options: options
					};

					return this._request(Channel.METHOD.CREATE, params, options);
				};

				ProductService.prototype.update = function update(data, options) {

					var params = {
						endpoint: this.getEndpoint(),
						objectId: data.id,
						data: data,
						options: options
					};

					return this._request(Channel.METHOD.UPDATE, params, options);
				};

				ProductService.prototype.updateWithAction = function updateWithAction(id, action, actionArg, data, options) {

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

				ProductService.prototype.remove = function remove(id, options) {

					var params = {
						endpoint: this.getEndpoint(),
						objectId: id,
						options: options
					};

					return this._request(Channel.METHOD.DELETE, params, options);
				};

				ProductService.prototype.removeWithAction = function removeWithAction(id, action, actionArg, options) {

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

					return this.getChannel(options.channelConfig).request(method, params);
				};

				return ProductService;
			})();

			_export('ProductService', ProductService);
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wcm9kdWN0LXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2tCQWNhLGNBQWM7Ozs7Ozt5QkFIbkIsT0FBTzs7Ozs7QUFHRixpQkFBYztBQUdmLGFBSEMsY0FBYyxHQUdaOzJCQUhGLGNBQWM7O0FBS3pCLFdBQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUVsQzs7QUFQVyxrQkFBYyxXQVMxQixvQkFBb0IsR0FBQSw4QkFBQyxPQUFPLEVBQUU7O0FBRTdCLFNBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDbkQsU0FBSSxDQUFDLHdCQUF3QixHQUFHLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7S0FFL0U7O0FBZFcsa0JBQWMsV0FnQjFCLFdBQVcsR0FBQSx1QkFBRSxFQUlaOztBQXBCVyxrQkFBYyxXQXNCMUIsZUFBZSxHQUFBLDJCQUFHLEVBRWpCOztBQXhCVyxrQkFBYyxXQTBCMUIsTUFBTSxHQUFBLGtCQUFHOztBQUVSLFlBQU8sSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUVsRDs7QUE5Qlcsa0JBQWMsV0F5QzFCLFFBQVEsR0FBQSxrQkFBQyxFQUFFLEVBQUUsT0FBTyxFQUFFOztBQUVyQixTQUFJLE1BQU0sR0FBRztBQUNaLGNBQVEsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFO0FBQzVCLGNBQVEsRUFBRSxFQUFFO0FBQ1osYUFBTyxFQUFFLE9BQU87TUFDaEIsQ0FBQzs7QUFFRixZQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBRTFEOztB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TyxFQUFFOztBQUVoRCxTQUFJLE1BQU0sR0FBRztBQUNaLGNBQVEsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFO0FBQzVCLGNBQVEsRUFBRSxFQUFFO0FBQ1osWUFBTSxFQUFFLE1BQU07QUFDZCxlQUFTLEVBQUUsU0FBUztBQUNwQixhQUFPLEVBQUUsT0FBTztNQUNoQixDQUFDOztBQUVGLFlBQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FFN0Q7O0FBdE5XLGtCQUFjLFdBcU8xQixPQUFPLEdBQUEsaUJBQUMsRUFBRSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRTs7QUFFN0MsU0FBSSxNQUFNLEdBQUc7QUFDWixjQUFRLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRTtBQUM1QixjQUFRLEVBQUUsRUFBRTtBQUNaLFlBQU0sRUFBRSxNQUFNO0FBQ2QsZUFBUyxFQUFFLFNBQVM7QUFDcEIsVUFBSSxFQUFFLElBQUk7QUFDVixhQUFPLEVBQUUsT0FBTztNQUNoQixDQUFDOztBQUVGLFlBQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FFOUQ7O0FBbFBXLGtCQUFjLFdBZ1ExQixnQkFBZ0IsR0FBQSwwQkFBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUU7O0FBRTlDLFNBQUksTUFBTSxHQUFHO0FBQ1osV0FBSyxFQUFFLEtBQUs7QUFDWixZQUFNLEVBQUUsTUFBTTtBQUNkLFVBQUksRUFBRSxJQUFJO0FBQ1YsYUFBTyxFQUFFLE9BQU87TUFDaEIsQ0FBQzs7QUFFRixZQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBRTlEOztBQTNRVyxrQkFBYyxXQW9SMUIsUUFBUSxHQUFBLGtCQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFOztBQUVqQyxTQUFHLE9BQU8sSUFBSSxJQUFJLEVBQUM7QUFDbEIsYUFBTyxHQUFHLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO01BQzFDOztBQUVELFNBQUcsTUFBTSxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUU7QUFDMUIsWUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7TUFDekI7O0FBRUQsWUFBTyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0tBRXRFOztXQWhTVyxjQUFjOzs7NkJBQWQsY0FBYyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3QvcHJvZHVjdC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==