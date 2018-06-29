'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Rest = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _message = require('./message');

var _channel = require('./channel');

var _exception = require('../auth/exception');

var _exception2 = require('./exception');

var _minilog = require('minilog');

var _minilog2 = _interopRequireDefault(_minilog);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Rest = exports.Rest = function () {
    function Rest() {
        _classCallCheck(this, Rest);

        this.methodFuns = {};

        this.methodFuns[_message.GET] = _superagent2.default.get;
        this.methodFuns[_message.POST] = _superagent2.default.post;

        this.methodFuns[_message.PUT] = _superagent2.default.put;
        this.methodFuns[_message.HEAD] = _superagent2.default.head;
        this.methodFuns[_message.DELETE] = _superagent2.default.del;

        this.methodFuns[_channel.Channel.METHOD.GET] = _superagent2.default.get;

        this.methodFuns[_channel.Channel.METHOD.CREATE] = _superagent2.default.post;
        this.methodFuns[_channel.Channel.METHOD.EXECUTE] = _superagent2.default.post;

        this.methodFuns[_channel.Channel.METHOD.UPDATE] = _superagent2.default.put;
        this.methodFuns[_channel.Channel.METHOD.DELETE] = _superagent2.default.del;
    }

    _createClass(Rest, [{
        key: 'configureWithContext',
        value: function configureWithContext(context) {
            this.restUrl = function () {
                return context.getConfig().getRestUrl();
            };

            this.getToken = function (extend) {
                return context.getAuth().getToken(extend);
            };

            this.withCredentials = function () {
                return context.getConfig().getWithCredentials();
            };

            this.isRequestWithToken = context.isRequestWithToken.bind(context);

            this.getLanguage = function () {
                return context.getConfig().getLanguage();
            };
        }
    }, {
        key: 'open',
        value: function open() {
            return Promise.resolve(true);
        }
    }, {
        key: 'createMessage',
        value: function createMessage() {
            var message = new _message.Message();
            return message.setBaseUrl(this.restUrl());
        }
    }, {
        key: 'r',
        value: function r(url, method) {
            return this.methodFuns[method](url);
        }
    }, {
        key: 'send',
        value: function send(message) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                _this.createRequestFromMessage(message).end(function (err, res) {
                    if (err) {
                        reject(err, res);
                    } else {
                        resolve(res);
                    }
                });
            });
        }
    }, {
        key: 'createRequestFromMessage',
        value: function createRequestFromMessage(message) {
            var url = message.baseUrl ? message.baseUrl + message.url : message.url;
            var request = this.r(url, message.method);

            if (this.withCredentials()) {
                request.withCredentials();
            }

            if (message.headers) {
                request.set(message.headers);
            }

            if (message.query) {
                request.query(message.query);
            }

            if (message.body) {
                request.send(message.body);
            }

            if (message.accept) {
                request.accept(message.accept);
            }

            if (message.multipart && message.multipart.files) {
                message.multipart.files.forEach(function (item) {
                    request.attach(item.field, item.path, item.filename);
                });
            }

            if (message.multipart && message.multipart.fields) {
                message.multipart.fields.forEach(function (item) {
                    request.field(item.name, item.value);
                });
            }

            return request;
        }
    }, {
        key: 'getAuthHeader',
        value: function getAuthHeader(token) {
            return { 'Authorization': 'Bearer ' + token.access_token };
        }
    }, {
        key: 'getLanguageHeader',
        value: function getLanguageHeader() {
            return { 'Accept-Language': this.getLanguage() };
        }
    }, {
        key: 'sendWithToken',
        value: function sendWithToken(message) {
            var _this2 = this;

            return this.getToken(true).then(function (token) {
                var headers = Object.assign({}, message.headers, _this2.getAuthHeader(token), _this2.getLanguageHeader());
                message.setHeaders(headers);
                return _this2.send(message);
            });
        }
    }, {
        key: 'request',
        value: function request(method, params) {
            var requestSuccess = function requestSuccess(res) {
                (0, _minilog2.default)('secucard.rest').debug('requestSuccess', res.req.path);
                return res.body;
            };

            var requestError = function requestError(err) {
                var error = err;
                var request = JSON.stringify({ method: method, params: params });

                if (err.response) {
                    error = _exception2.SecucardConnectException.create(err.response.body);
                }

                error.request = request;

                throw error;
            };

            var message = this.createMessageForRequest(method, params);

            var pr = !this.isRequestWithToken || this.isRequestWithToken(params.options) ? this.sendWithToken(message) : this.send(message);

            return pr.then(requestSuccess).catch(requestError);
        }
    }, {
        key: 'generateUrl',
        value: function generateUrl(method, params) {

            var message = this.createMessageForRequest(method, params);
            var req = this.createRequestFromMessage(message);

            var query = req._query ? req._query.join('&') : '';

            var url = req.url;

            if (query) {
                url += (url.indexOf('?') >= 0 ? '&' : '?') + query;
            }

            return url;
        }
    }, {
        key: 'createMessageForRequest',
        value: function createMessageForRequest(method, params) {
            var message = this.createMessage();
            var headers = Object.assign({}, { 'Content-Type': 'application/json' }, this.getLanguageHeader());

            if (params.headers) {
                Object.assign(headers, params.headers);
            }

            if (!params.multipart) {
                message.setHeaders(headers);
            }

            message.setMethod(method);

            var endPointSpec = [];

            if (params.appId) {
                endPointSpec = ['General', 'Apps', params.appId, 'callBackend'];
            } else if (params.endpoint) {
                endPointSpec = params.endpoint;
            } else {
                throw new Error('Missing endpoint spec or app id.');
            }

            if (params.objectId != null) {
                endPointSpec.push(params.objectId);
            }

            if (params.action) {
                endPointSpec.push(params.action);
            }

            if (params.actionArg) {
                endPointSpec.push(params.actionArg);
            }

            message.setUrl(this.buildEndpoint(endPointSpec));

            if (params.queryParams) {
                message.setQuery(params.queryParams);
            }

            if (params.data) {
                message.setBody(params.data);
            }

            if (params.multipart) {
                message.setMultipart(params.multipart);
            }

            (0, _minilog2.default)('secucard.rest').debug('message', message);

            return message;
        }
    }, {
        key: 'buildEndpoint',
        value: function buildEndpoint(endpoint) {
            if (!endpoint || endpoint.length < 2) {
                throw new Error('Invalid endpoint specification.');
            }

            return endpoint.join('/');
        }
    }]);

    return Rest;
}();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L3Jlc3QuanMiXSwibmFtZXMiOlsiUmVzdCIsIm1ldGhvZEZ1bnMiLCJHRVQiLCJSZXF1ZXN0IiwiZ2V0IiwiUE9TVCIsInBvc3QiLCJQVVQiLCJwdXQiLCJIRUFEIiwiaGVhZCIsIkRFTEVURSIsImRlbCIsIkNoYW5uZWwiLCJNRVRIT0QiLCJDUkVBVEUiLCJFWEVDVVRFIiwiVVBEQVRFIiwiY29udGV4dCIsInJlc3RVcmwiLCJnZXRDb25maWciLCJnZXRSZXN0VXJsIiwiZ2V0VG9rZW4iLCJleHRlbmQiLCJnZXRBdXRoIiwid2l0aENyZWRlbnRpYWxzIiwiZ2V0V2l0aENyZWRlbnRpYWxzIiwiaXNSZXF1ZXN0V2l0aFRva2VuIiwiYmluZCIsImdldExhbmd1YWdlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJtZXNzYWdlIiwiTWVzc2FnZSIsInNldEJhc2VVcmwiLCJ1cmwiLCJtZXRob2QiLCJyZWplY3QiLCJjcmVhdGVSZXF1ZXN0RnJvbU1lc3NhZ2UiLCJlbmQiLCJlcnIiLCJyZXMiLCJiYXNlVXJsIiwicmVxdWVzdCIsInIiLCJoZWFkZXJzIiwic2V0IiwicXVlcnkiLCJib2R5Iiwic2VuZCIsImFjY2VwdCIsIm11bHRpcGFydCIsImZpbGVzIiwiZm9yRWFjaCIsIml0ZW0iLCJhdHRhY2giLCJmaWVsZCIsInBhdGgiLCJmaWxlbmFtZSIsImZpZWxkcyIsIm5hbWUiLCJ2YWx1ZSIsInRva2VuIiwiYWNjZXNzX3Rva2VuIiwidGhlbiIsIk9iamVjdCIsImFzc2lnbiIsImdldEF1dGhIZWFkZXIiLCJnZXRMYW5ndWFnZUhlYWRlciIsInNldEhlYWRlcnMiLCJwYXJhbXMiLCJyZXF1ZXN0U3VjY2VzcyIsImRlYnVnIiwicmVxIiwicmVxdWVzdEVycm9yIiwiZXJyb3IiLCJKU09OIiwic3RyaW5naWZ5IiwicmVzcG9uc2UiLCJTZWN1Y2FyZENvbm5lY3RFeGNlcHRpb24iLCJjcmVhdGUiLCJjcmVhdGVNZXNzYWdlRm9yUmVxdWVzdCIsInByIiwib3B0aW9ucyIsInNlbmRXaXRoVG9rZW4iLCJjYXRjaCIsIl9xdWVyeSIsImpvaW4iLCJpbmRleE9mIiwiY3JlYXRlTWVzc2FnZSIsInNldE1ldGhvZCIsImVuZFBvaW50U3BlYyIsImFwcElkIiwiZW5kcG9pbnQiLCJFcnJvciIsIm9iamVjdElkIiwicHVzaCIsImFjdGlvbiIsImFjdGlvbkFyZyIsInNldFVybCIsImJ1aWxkRW5kcG9pbnQiLCJxdWVyeVBhcmFtcyIsInNldFF1ZXJ5IiwiZGF0YSIsInNldEJvZHkiLCJzZXRNdWx0aXBhcnQiLCJsZW5ndGgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQVdBOzs7O0FBQ0E7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7O0lBRWFBLEksV0FBQUEsSTtBQUVULG9CQUFjO0FBQUE7O0FBQ1YsYUFBS0MsVUFBTCxHQUFrQixFQUFsQjs7QUFFQSxhQUFLQSxVQUFMLENBQWdCQyxZQUFoQixJQUF1QkMscUJBQVFDLEdBQS9CO0FBQ0EsYUFBS0gsVUFBTCxDQUFnQkksYUFBaEIsSUFBd0JGLHFCQUFRRyxJQUFoQzs7QUFFQSxhQUFLTCxVQUFMLENBQWdCTSxZQUFoQixJQUF1QkoscUJBQVFLLEdBQS9CO0FBQ0EsYUFBS1AsVUFBTCxDQUFnQlEsYUFBaEIsSUFBd0JOLHFCQUFRTyxJQUFoQztBQUNBLGFBQUtULFVBQUwsQ0FBZ0JVLGVBQWhCLElBQTBCUixxQkFBUVMsR0FBbEM7O0FBRUEsYUFBS1gsVUFBTCxDQUFnQlksaUJBQVFDLE1BQVIsQ0FBZVosR0FBL0IsSUFBc0NDLHFCQUFRQyxHQUE5Qzs7QUFFQSxhQUFLSCxVQUFMLENBQWdCWSxpQkFBUUMsTUFBUixDQUFlQyxNQUEvQixJQUF5Q1oscUJBQVFHLElBQWpEO0FBQ0EsYUFBS0wsVUFBTCxDQUFnQlksaUJBQVFDLE1BQVIsQ0FBZUUsT0FBL0IsSUFBMENiLHFCQUFRRyxJQUFsRDs7QUFFQSxhQUFLTCxVQUFMLENBQWdCWSxpQkFBUUMsTUFBUixDQUFlRyxNQUEvQixJ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QjtBQUNIOztBQUVEbEUsb0JBQVFtRSxNQUFSLENBQWUsS0FBS0MsYUFBTCxDQUFtQlQsWUFBbkIsQ0FBZjs7QUFFQSxnQkFBSXJCLE9BQU8rQixXQUFYLEVBQXdCO0FBQ3BCckUsd0JBQVFzRSxRQUFSLENBQWlCaEMsT0FBTytCLFdBQXhCO0FBQ0g7O0FBRUQsZ0JBQUkvQixPQUFPaUMsSUFBWCxFQUFpQjtBQUNidkUsd0JBQVF3RSxPQUFSLENBQWdCbEMsT0FBT2lDLElBQXZCO0FBQ0g7O0FBRUQsZ0JBQUdqQyxPQUFPbkIsU0FBVixFQUFxQjtBQUNqQm5CLHdCQUFReUUsWUFBUixDQUFxQm5DLE9BQU9uQixTQUE1QjtBQUNIOztBQUVELG1DQUFRLGVBQVIsRUFBeUJxQixLQUF6QixDQUErQixTQUEvQixFQUEwQ3hDLE9BQTFDOztBQUVBLG1CQUFPQSxPQUFQO0FBQ0g7OztzQ0FFYTZELFEsRUFBVTtBQUNwQixnQkFBSSxDQUFDQSxRQUFELElBQWFBLFNBQVNhLE1BQVQsR0FBa0IsQ0FBbkMsRUFBc0M7QUFDbEMsc0JBQU0sSUFBSVosS0FBSixDQUFVLGlDQUFWLENBQU47QUFDSDs7QUFFRCxtQkFBT0QsU0FBU04sSUFBVCxDQUFjLEdBQWQsQ0FBUDtBQUNIIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L3Jlc3QuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9
