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

                ProductService.prototype.retrieve = function retrieve(id, queryParams, options) {

                    var params = {
                        endpoint: this.getEndpoint(),
                        objectId: id,
                        queryParams: queryParams,
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

                ProductService.prototype.create = function create(data, options, multipart) {

                    var params = {
                        endpoint: this.getEndpoint(),
                        data: data,
                        options: options,
                        multipart: multipart
                    };

                    return this._request(Channel.METHOD.CREATE, params, options);
                };

                ProductService.prototype.update = function update(data, options, multipart) {

                    var params = {
                        endpoint: this.getEndpoint(),
                        objectId: data.id,
                        data: data,
                        options: options,
                        multipart: multipart
                    };

                    return this._request(Channel.METHOD.UPDATE, params, options);
                };

                ProductService.prototype.updateWithAction = function updateWithAction(id, action, actionArg, data, options, multipart) {

                    var params = {
                        endpoint: this.getEndpoint(),
                        objectId: id,
                        data: data,
                        action: action,
                        actionArg: actionArg,
                        options: options,
                        multipart: multipart
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wcm9kdWN0LXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3FCQWNhLGNBQWM7Ozs7OztrQ0FIbkIsT0FBTzs7Ozs7QUFHRiwwQkFBYztBQUdaLHlCQUhGLGNBQWMsR0FHVDswQ0FITCxjQUFjOztBQUtuQiwwQkFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2lCQUVyQzs7QUFQUSw4QkFBYyxXQVN2QixvQkFBb0IsR0FBQSw4QkFBQyxPQUFPLEVBQUU7O0FBRTFCLHdCQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ25ELHdCQUFJLENBQUMsd0JBQXdCLEdBQUcsT0FBTyxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFFbEY7O0FBZFEsOEJBQWMsV0FnQnZCLFdBQVcsR0FBQSx1QkFBRyxFQUdiOztBQW5CUSw4QkFBYyxXQXFCdkIsZUFBZSxHQUFBLDJCQUFHLEVBRWpCOztBQXZCUSw4QkFBYyxXQXlCdkIsTUFBTSxHQUFBLGtCQUFHOztBQUVMLDJCQUFPLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7aUJBRXJEOztBQTdCUSw4QkFBYyxXQXdDdkIsUUFBUSxHQUFBLGtCQUFDLEVBQUUsRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFOztBQUUvQix3QkFBSSxNQUFNLEdBQUc7QUFDVCxnQ0FBUSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUU7QUFDNUIsZ0NBQVEsRUFBRSxFQUFFO0FBQ1osbUNBQVcsRUFBRSxXQUFXO0FBQ3hCLCtCQUFPLEVBQUUsT0FBTztxQkFDbkIsQ0FBQzs7QUFFRiwyQkFBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENB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TSxHQUFHO0FBQ1QsNkJBQUssRUFBRSxLQUFLO0FBQ1osOEJBQU0sRUFBRSxNQUFNO0FBQ2QsNEJBQUksRUFBRSxJQUFJO0FBQ1YsK0JBQU8sRUFBRSxPQUFPO3FCQUNuQixDQUFDOztBQUVGLDJCQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2lCQUVqRTs7QUEzUlEsOEJBQWMsV0FvU3ZCLFFBQVEsR0FBQSxrQkFBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRTs7QUFFOUIsd0JBQUksT0FBTyxJQUFJLElBQUksRUFBRTtBQUNqQiwrQkFBTyxHQUFHLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO3FCQUM3Qzs7QUFFRCx3QkFBSSxNQUFNLENBQUMsT0FBTyxJQUFJLElBQUksRUFBRTtBQUN4Qiw4QkFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7cUJBQzVCOztBQUVELDJCQUFPLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7aUJBRXpFOzt1QkFoVFEsY0FBYzs7O3NDQUFkLGNBQWMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L3Byb2R1Y3Qtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=