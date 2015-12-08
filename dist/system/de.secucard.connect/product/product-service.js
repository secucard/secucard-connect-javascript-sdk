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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wcm9kdWN0LXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3FCQWNhLGNBQWM7Ozs7OztrQ0FIbkIsT0FBTzs7Ozs7QUFHRiwwQkFBYztBQUdaLHlCQUhGLGNBQWMsR0FHVDswQ0FITCxjQUFjOztBQUtuQiwwQkFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2lCQUVyQzs7QUFQUSw4QkFBYyxXQVN2QixvQkFBb0IsR0FBQSw4QkFBQyxPQUFPLEVBQUU7O0FBRTFCLHdCQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ25ELHdCQUFJLENBQUMsd0JBQXdCLEdBQUcsT0FBTyxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFFbEY7O0FBZFEsOEJBQWMsV0FnQnZCLFdBQVcsR0FBQSx1QkFBRyxFQUdiOztBQW5CUSw4QkFBYyxXQXFCdkIsZUFBZSxHQUFBLDJCQUFHLEVBRWpCOztBQXZCUSw4QkFBYyxXQXlCdkIsTUFBTSxHQUFBLGtCQUFHOztBQUVMLDJCQUFPLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7aUJBRXJEOztBQTdCUSw4QkFBYyxXQXdDdkIsUUFBUSxHQUFBLGtCQUFDLEVBQUUsRUFBRSxPQUFPLEVBQUU7O0FBRWxCLHdCQUFJLE1BQU0sR0FBRztBQUNULGdDQUFRLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRTtBQUM1QixnQ0FBUSxFQUFFLEVBQUU7QUFDWiwrQkFBTyxFQUFFLE9BQU87cUJBQ25CLENBQUM7O0FBRUYsMkJBQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFD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LDhCQUFNLEVBQUUsTUFBTTtBQUNkLDRCQUFJLEVBQUUsSUFBSTtBQUNWLCtCQUFPLEVBQUUsT0FBTztxQkFDbkIsQ0FBQzs7QUFFRiwyQkFBTyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztpQkFFakU7O0FBalJRLDhCQUFjLFdBMFJ2QixRQUFRLEdBQUEsa0JBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUU7O0FBRTlCLHdCQUFJLE9BQU8sSUFBSSxJQUFJLEVBQUU7QUFDakIsK0JBQU8sR0FBRyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztxQkFDN0M7O0FBRUQsd0JBQUksTUFBTSxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUU7QUFDeEIsOEJBQU0sQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO3FCQUM1Qjs7QUFFRCwyQkFBTyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2lCQUV6RTs7dUJBdFNRLGNBQWM7OztzQ0FBZCxjQUFjIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wcm9kdWN0LXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9