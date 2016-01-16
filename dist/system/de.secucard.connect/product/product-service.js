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

                ProductService.prototype._parseMeta = function _parseMeta(data) {

                    if (!data) {
                        return data;
                    }

                    data.describe = function (property) {

                        var _this = this;

                        var res = property.split('.').reduce(function (collector, item) {
                            return collector.properties[item];
                        }, _this);

                        if (res.type == 'object') {
                            res.describe = this.describe;
                        }

                        return res;
                    };

                    return data;
                };

                ProductService.prototype.getMeta = function getMeta(options) {
                    var _this2 = this;

                    return this._meta && !options ? Promise.resolve(this._meta) : this.retrieveMeta(options).then(function (res) {
                        _this2._meta = _this2._parseMeta(res.meta);
                        return _this2._meta;
                    });
                };

                ProductService.prototype.retrieveMeta = function retrieveMeta(options) {

                    var params = {
                        endpoint: this.getEndpoint(),
                        queryParams: { meta: 'only' },
                        options: options
                    };

                    return this._request(Channel.METHOD.GET, params, options);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wcm9kdWN0LXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3FCQWNhLGNBQWM7Ozs7OztrQ0FIbkIsT0FBTzs7Ozs7QUFHRiwwQkFBYztBQU9aLHlCQVBGLGNBQWMsR0FPVDswQ0FQTCxjQUFjOztBQVNuQiwwQkFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2lCQUVyQzs7QUFYUSw4QkFBYyxXQWF2QixvQkFBb0IsR0FBQSw4QkFBQyxPQUFPLEVBQUU7O0FBRTFCLHdCQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ25ELHdCQUFJLENBQUMsd0JBQXdCLEdBQUcsT0FBTyxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztpQkFFbEY7O0FBbEJRLDhCQUFjLFdBb0J2QixXQUFXLEdBQUEsdUJBQUcsRUFHYjs7QUF2QlEsOEJBQWMsV0F5QnZCLGVBQWUsR0FBQSwyQkFBRyxFQUVqQjs7QUEzQlEsOEJBQWMsV0E2QnZCLE1BQU0sR0FBQSxrQkFBRzs7QUFFTCwyQkFBTyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO2lCQUVyRDs7QUFqQ1EsOEJBQWMsV0FtQ3ZCLFVBQVUsR0FBQSxvQkFBQyxJQUFJLEVBQUU7O0FBRWIsd0JBQUcsQ0FBQyxJQUFJLEVBQUU7QUFDTiwrQkFBTyxJQUFJLENBQUM7cUJBQ2Y7O0FBRUQsd0JBQUksQ0FBQyxRQUFRLEdBQUcsVUFBVSxRQUFRLEVBQUU7O0FBRWhDLDRCQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7O0FBRWpCLDRCQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFDLFNB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O0FBRUYsMkJBQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7aUJBRWpFOztBQXZVUSw4QkFBYyxXQXFWdkIsZ0JBQWdCLEdBQUEsMEJBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFOztBQUUzQyx3QkFBSSxNQUFNLEdBQUc7QUFDVCw2QkFBSyxFQUFFLEtBQUs7QUFDWiw4QkFBTSxFQUFFLE1BQU07QUFDZCw0QkFBSSxFQUFFLElBQUk7QUFDViwrQkFBTyxFQUFFLE9BQU87cUJBQ25CLENBQUM7O0FBRUYsMkJBQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7aUJBRWpFOztBQWhXUSw4QkFBYyxXQXlXdkIsUUFBUSxHQUFBLGtCQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFOztBQUU5Qix3QkFBSSxPQUFPLElBQUksSUFBSSxFQUFFO0FBQ2pCLCtCQUFPLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7cUJBQzdDOztBQUVELHdCQUFJLE1BQU0sQ0FBQyxPQUFPLElBQUksSUFBSSxFQUFFO0FBQ3hCLDhCQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztxQkFDNUI7O0FBRUQsMkJBQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztpQkFFekU7O3VCQXJYUSxjQUFjOzs7c0NBQWQsY0FBYyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3QvcHJvZHVjdC1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==