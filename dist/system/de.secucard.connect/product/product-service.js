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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wcm9kdWN0LXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2tCQUdhLGNBQWM7Ozs7Ozt5QkFIbkIsT0FBTzs7Ozs7QUFHRixpQkFBYztBQUdmLGFBSEMsY0FBYyxHQUdaOzJCQUhGLGNBQWM7O0FBS3pCLFdBQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUVsQzs7QUFQVyxrQkFBYyxXQVMxQixvQkFBb0IsR0FBQSw4QkFBQyxPQUFPLEVBQUU7O0FBRTdCLFNBQUksQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDbkQsU0FBSSxDQUFDLHdCQUF3QixHQUFHLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7S0FFL0U7O0FBZFcsa0JBQWMsV0FnQjFCLFdBQVcsR0FBQSx1QkFBRSxFQUlaOztBQXBCVyxrQkFBYyxXQXNCMUIsZUFBZSxHQUFBLDJCQUFHLEVBRWpCOztBQXhCVyxrQkFBYyxXQTBCMUIsTUFBTSxHQUFBLGtCQUFHOztBQUVSLFlBQU8sSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUVsRDs7QUE5Qlcsa0JBQWMsV0F5QzFCLFFBQVEsR0FBQSxrQkFBQyxFQUFFLEVBQUUsT0FBTyxFQUFFOztBQUVyQixTQUFJLE1BQU0sR0FBRztBQUNaLGNBQVEsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFO0FBQzVCLGNBQVEsRUFBRSxFQUFFO0FBQ1osYUFBTyxFQUFFLE9BQU87TUFDaEIsQ0FBQzs7QUFFRixZQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBRTFEOztB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