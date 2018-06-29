'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ProductService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _channel = require('../net/channel');

var _eventemitter = require('eventemitter3');

var _eventemitter2 = _interopRequireDefault(_eventemitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProductService = exports.ProductService = function () {
    function ProductService() {
        _classCallCheck(this, ProductService);

        Object.assign(this, _eventemitter2.default.prototype);
    }

    _createClass(ProductService, [{
        key: 'configureWithContext',
        value: function configureWithContext(context) {

            this.getChannel = context.getChannel.bind(context);
            this.getServiceDefaultOptions = context.getServiceDefaultOptions.bind(context);
        }
    }, {
        key: 'getEndpoint',
        value: function getEndpoint() {}
    }, {
        key: 'getEventTargets',
        value: function getEventTargets() {}
    }, {
        key: 'getUid',
        value: function getUid() {

            return this.getEndpoint().join('.').toLowerCase();
        }
    }, {
        key: '_parseMeta',
        value: function _parseMeta(data) {

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
        }
    }, {
        key: 'getMeta',
        value: function getMeta(options) {
            var _this2 = this;

            return this._meta && !options ? Promise.resolve(this._meta) : this.retrieveMeta(options).then(function (res) {
                _this2._meta = _this2._parseMeta(res.meta);
                return _this2._meta;
            });
        }
    }, {
        key: 'retrieveMeta',
        value: function retrieveMeta(options) {

            var params = {
                endpoint: this.getEndpoint(),
                queryParams: { meta: 'only' },
                options: options
            };

            return this._request(_channel.Channel.METHOD.GET, params, options);
        }
    }, {
        key: 'retrieve',
        value: function retrieve(id, queryParams, options) {

            var params = {
                endpoint: this.getEndpoint(),
                objectId: id,
                queryParams: queryParams,
                options: options
            };

            return this._request(_channel.Channel.METHOD.GET, params, options);
        }
    }, {
        key: 'generateRetrieveUrl',
        value: function generateRetrieveUrl(id, queryParams, options) {
            var params = {
                endpoint: this.getEndpoint(),
                objectId: id,
                queryParams: queryParams,
                options: options
            };

            return this._generateUrl(_channel.Channel.METHOD.GET, params, options);
        }
    }, {
        key: 'retrieveWithAction',
        value: function retrieveWithAction(id, action, actionArg, options) {

            var params = {
                endpoint: this.getEndpoint(),
                objectId: id,
                action: action,
                actionArg: actionArg,
                options: options
            };

            return this._request(_channel.Channel.METHOD.GET, params, options);
        }
    }, {
        key: 'generateRetrieveWithActionUrl',
        value: function generateRetrieveWithActionUrl(id, action, actionArg, options) {

            var params = {
                endpoint: this.getEndpoint(),
                objectId: id,
                action: action,
                actionArg: actionArg,
                options: options
            };

            return this._generateUrl(_channel.Channel.METHOD.GET, params, options);
        }
    }, {
        key: 'retrieveList',
        value: function retrieveList(queryParams, options) {

            var params = {
                endpoint: this.getEndpoint(),
                queryParams: queryParams,
                options: options
            };

            return this._request(_channel.Channel.METHOD.GET, params, options);
        }
    }, {
        key: 'generateRetrieveListUrl',
        value: function generateRetrieveListUrl(queryParams, options) {

            var params = {
                endpoint: this.getEndpoint(),
                queryParams: queryParams,
                options: options
            };

            return this._generateUrl(_channel.Channel.METHOD.GET, params, options);
        }
    }, {
        key: 'create',
        value: function create(data, options, multipart) {

            var params = {
                endpoint: this.getEndpoint(),
                data: data,
                options: options,
                multipart: multipart
            };

            return this._request(_channel.Channel.METHOD.CREATE, params, options);
        }
    }, {
        key: 'update',
        value: function update(data, options, multipart) {

            var params = {
                endpoint: this.getEndpoint(),
                objectId: data.id,
                data: data,
                options: options,
                multipart: multipart
            };

            return this._request(_channel.Channel.METHOD.UPDATE, params, options);
        }
    }, {
        key: 'updateWithAction',
        value: function updateWithAction(id, action, actionArg, data, options, multipart) {

            var params = {
                endpoint: this.getEndpoint(),
                objectId: id,
                data: data,
                action: action,
                actionArg: actionArg,
                options: options,
                multipart: multipart
            };

            return this._request(_channel.Channel.METHOD.UPDATE, params, options);
        }
    }, {
        key: 'remove',
        value: function remove(id, options) {

            var params = {
                endpoint: this.getEndpoint(),
                objectId: id,
                options: options
            };

            return this._request(_channel.Channel.METHOD.DELETE, params, options);
        }
    }, {
        key: 'removeWithAction',
        value: function removeWithAction(id, action, actionArg, options) {

            var params = {
                endpoint: this.getEndpoint(),
                objectId: id,
                action: action,
                actionArg: actionArg,
                options: options
            };

            return this._request(_channel.Channel.METHOD.DELETE, params, options);
        }
    }, {
        key: 'execute',
        value: function execute(id, action, actionArg, data, options) {

            var params = {
                endpoint: this.getEndpoint(),
                objectId: id,
                action: action,
                actionArg: actionArg,
                data: data,
                options: options
            };

            return this._request(_channel.Channel.METHOD.EXECUTE, params, options);
        }
    }, {
        key: 'executeAppAction',
        value: function executeAppAction(appId, action, data, options) {

            var params = {
                appId: appId,
                action: action,
                data: data,
                options: options
            };

            return this._request(_channel.Channel.METHOD.EXECUTE, params, options);
        }
    }, {
        key: '_request',
        value: function _request(method, params, options) {

            if (options == null) {
                options = this.getServiceDefaultOptions();
            }

            if (params.options == null) {
                params.options = options;
            }

            return this.getChannel(options.channelConfig).request(method, params);
        }
    }, {
        key: '_generateUrl',
        value: function _generateUrl(method, params, options) {

            if (options == null) {
                options = this.getServiceDefaultOptions();
            }

            if (params.options == null) {
                params.options = options;
            }

            return this.getChannel([_channel.Channel.REST]).generateUrl(method, params);
        }
    }]);

    return ProductService;
}();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wcm9kdWN0LXNlcnZpY2UuanMiXSwibmFtZXMiOlsiUHJvZHVjdFNlcnZpY2UiLCJPYmplY3QiLCJhc3NpZ24iLCJFRSIsInByb3RvdHlwZSIsImNvbnRleHQiLCJnZXRDaGFubmVsIiwiYmluZCIsImdldFNlcnZpY2VEZWZhdWx0T3B0aW9ucyIsImdldEVuZHBvaW50Iiwiam9pbiIsInRvTG93ZXJDYXNlIiwiZGF0YSIsImRlc2NyaWJlIiwicHJvcGVydHkiLCJfdGhpcyIsInJlcyIsInNwbGl0IiwicmVkdWNlIiwiY29sbGVjdG9yIiwiaXRlbSIsInByb3BlcnRpZXMiLCJ0eXBlIiwib3B0aW9ucyIsIl9tZXRhIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZXRyaWV2ZU1ldGEiLCJ0aGVuIiwiX3BhcnNlTWV0YSIsIm1ldGEiLCJwYXJhbXMiLCJlbmRwb2ludCIsInF1ZXJ5UGFyYW1zIiwiX3JlcXVlc3QiLCJDaGFubmVsIiwiTUVUSE9EIiwiR0VUIiwiaWQiLCJvYmplY3RJZCIsIl9nZW5lcmF0ZVVybCIsImFjdGlvbiIsImFjdGlvbkFyZyIsIm11bHRpcGFydCIsIkNSRUFURSIsIlVQREFURSIsIkRFTEVURSIsIkVYRUNVVEUiLCJhcHBJZCIsIm1ldGhvZCIsImNoYW5uZWxDb25maWciLCJyZXF1ZXN0IiwiUkVTVCIsImdlbmVyYXRlVXJsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFXQTs7QUFDQTs7Ozs7Ozs7SUFFYUEsYyxXQUFBQSxjO0FBT1QsOEJBQWM7QUFBQTs7QUFFVkMsZUFBT0MsTUFBUCxDQUFjLElBQWQsRUFBb0JDLHVCQUFHQyxTQUF2QjtBQUVIOzs7OzZDQUVvQkMsTyxFQUFTOztBQUUxQixpQkFBS0MsVUFBTCxHQUFrQkQsUUFBUUMsVUFBUixDQUFtQkMsSUFBbkIsQ0FBd0JGLE9BQXhCLENBQWxCO0FBQ0EsaUJBQUtHLHdCQUFMLEdBQWdDSCxRQUFRRyx3QkFBUixDQUFpQ0QsSUFB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QkFBTyxLQUFLVyxRQUFMLENBQWNDLGlCQUFRQyxNQUFSLENBQWVVLE1BQTdCLEVBQXFDZixNQUFyQyxFQUE2Q1IsT0FBN0MsQ0FBUDtBQUVIOzs7Z0NBZU9lLEUsRUFBSUcsTSxFQUFRQyxTLEVBQVc5QixJLEVBQU1XLE8sRUFBUzs7QUFFMUMsZ0JBQUlRLFNBQVM7QUFDVEMsMEJBQVUsS0FBS3ZCLFdBQUwsRUFERDtBQUVUOEIsMEJBQVVELEVBRkQ7QUFHVEcsd0JBQVFBLE1BSEM7QUFJVEMsMkJBQVdBLFNBSkY7QUFLVDlCLHNCQUFNQSxJQUxHO0FBTVRXLHlCQUFTQTtBQU5BLGFBQWI7O0FBU0EsbUJBQU8sS0FBS1csUUFBTCxDQUFjQyxpQkFBUUMsTUFBUixDQUFlVyxPQUE3QixFQUFzQ2hCLE1BQXRDLEVBQThDUixPQUE5QyxDQUFQO0FBRUg7Ozt5Q0FjZ0J5QixLLEVBQU9QLE0sRUFBUTdCLEksRUFBTVcsTyxFQUFTOztBQUUzQyxnQkFBSVEsU0FBUztBQUNUaUIsdUJBQU9BLEtBREU7QUFFVFAsd0JBQVFBLE1BRkM7QUFHVDdCLHNCQUFNQSxJQUhHO0FBSVRXLHlCQUFTQTtBQUpBLGFBQWI7O0FBT0EsbUJBQU8sS0FBS1csUUFBTCxDQUFjQyxpQkFBUUMsTUFBUixDQUFlVyxPQUE3QixFQUFzQ2hCLE1BQXRDLEVBQThDUixPQUE5QyxDQUFQO0FBRUg7OztpQ0FTUTBCLE0sRUFBUWxCLE0sRUFBUVIsTyxFQUFTOztBQUU5QixnQkFBSUEsV0FBVyxJQUFmLEVBQXFCO0FBQ2pCQSwwQkFBVSxLQUFLZix3QkFBTCxFQUFWO0FBQ0g7O0FBRUQsZ0JBQUl1QixPQUFPUixPQUFQLElBQWtCLElBQXRCLEVBQTRCO0FBQ3hCUSx1QkFBT1IsT0FBUCxHQUFpQkEsT0FBakI7QUFDSDs7QUFFRCxtQkFBTyxLQUFLakIsVUFBTCxDQUFnQmlCLFFBQVEyQixhQUF4QixFQUF1Q0MsT0FBdkMsQ0FBK0NGLE1BQS9DLEVBQXVEbEIsTUFBdkQsQ0FBUDtBQUVIOzs7cUNBRVlrQixNLEVBQVFsQixNLEVBQVFSLE8sRUFBUzs7QUFFbEMsZ0JBQUlBLFdBQVcsSUFBZixFQUFxQjtBQUNqQkEsMEJBQVUsS0FBS2Ysd0JBQUwsRUFBVjtBQUNIOztBQUVELGdCQUFJdUIsT0FBT1IsT0FBUCxJQUFrQixJQUF0QixFQUE0QjtBQUN4QlEsdUJBQU9SLE9BQVAsR0FBaUJBLE9BQWpCO0FBQ0g7O0FBRUQsbUJBQU8sS0FBS2pCLFVBQUwsQ0FBZ0IsQ0FBQzZCLGlCQUFRaUIsSUFBVCxDQUFoQixFQUFnQ0MsV0FBaEMsQ0FBNENKLE1BQTVDLEVBQW9EbEIsTUFBcEQsQ0FBUDtBQUVIIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9wcm9kdWN0LXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9
