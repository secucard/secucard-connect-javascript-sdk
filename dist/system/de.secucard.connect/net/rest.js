System.register(['superagent', './message', './channel', '../auth/exception', './exception', 'minilog'], function (_export) {
    'use strict';

    var Request, GET, POST, PUT, HEAD, DELETE, Message, Channel, AuthenticationFailedException, SecucardConnectException, minilog, Rest;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    return {
        setters: [function (_superagent) {
            Request = _superagent['default'];
        }, function (_message) {
            GET = _message.GET;
            POST = _message.POST;
            PUT = _message.PUT;
            HEAD = _message.HEAD;
            DELETE = _message.DELETE;
            Message = _message.Message;
        }, function (_channel) {
            Channel = _channel.Channel;
        }, function (_authException) {
            AuthenticationFailedException = _authException.AuthenticationFailedException;
        }, function (_exception) {
            SecucardConnectException = _exception.SecucardConnectException;
        }, function (_minilog) {
            minilog = _minilog['default'];
        }],
        execute: function () {
            Rest = (function () {
                function Rest() {
                    _classCallCheck(this, Rest);

                    this.methodFuns = {};

                    this.methodFuns[GET] = Request.get;
                    this.methodFuns[POST] = Request.post;

                    this.methodFuns[PUT] = Request.put;
                    this.methodFuns[HEAD] = Request.head;
                    this.methodFuns[DELETE] = Request.del;

                    this.methodFuns[Channel.METHOD.GET] = Request.get;

                    this.methodFuns[Channel.METHOD.CREATE] = Request.post;
                    this.methodFuns[Channel.METHOD.EXECUTE] = Request.post;

                    this.methodFuns[Channel.METHOD.UPDATE] = Request.put;
                    this.methodFuns[Channel.METHOD.DELETE] = Request.del;
                }

                Rest.prototype.configureWithContext = function configureWithContext(context) {

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
                };

                Rest.prototype.open = function open() {
                    return Promise.resolve(true);
                };

                Rest.prototype.createMessage = function createMessage() {
                    var message = new Message();
                    return message.setBaseUrl(this.restUrl());
                };

                Rest.prototype.r = function r(url, method) {
                    return this.methodFuns[method](url);
                };

                Rest.prototype.send = function send(message) {
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
                };

                Rest.prototype.createRequestFromMessage = function createRequestFromMessage(message) {

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
                };

                Rest.prototype.getAuthHeader = function getAuthHeader(token) {

                    return { 'Authorization': 'Bearer ' + token.access_token };
                };

                Rest.prototype.getSecurityHeader = function getSecurityHeader() {

                    return {
                        'X-Frame-Options': 'deny',
                        'X-Xss-Protection': '1; mode=block',
                        'X-Content-Type-Options': 'nosniff',
                        'Content-Security-Policy': 'script-src "self"'
                    }
                };

                Rest.prototype.getContentTypeHeader = function getContentTypeHeader() {

                    return {
                        'Content-Type': 'application/json'
                    }
                };

                Rest.prototype.sendWithToken = function sendWithToken(message) {
                    var _this2 = this;

                    return this.getToken(true).then(function (token) {

                        var headers = Object.assign({}, message.headers, _this2.getAuthHeader(token), _this2.getSecurityHeader());
                        message.setHeaders(headers);
                        return _this2.send(message);
                    });
                };

                Rest.prototype.request = function request(method, params) {

                    var requestSuccess = function requestSuccess(res) {
                        minilog('secucard.rest').debug('requestSuccess', res.req.path);
                        return res.body;
                    };

                    var requestError = function requestError(err) {
                        var error = err;
                        var request = JSON.stringify({ method: method, params: params });

                        if (err.response) {
                            error = SecucardConnectException.create(err.response.body);
                        }

                        error.request = request;

                        throw error;
                    };

                    var message = this.createMessageForRequest(method, params);

                    var pr = !this.isRequestWithToken || this.isRequestWithToken(params.options) ? this.sendWithToken(message) : this.send(message);

                    return pr.then(requestSuccess)['catch'](requestError);
                };

                Rest.prototype.generateUrl = function generateUrl(method, params) {

                    var message = this.createMessageForRequest(method, params);
                    var req = this.createRequestFromMessage(message);

                    var query = req._query ? req._query.join('&') : '';

                    var url = req.url;

                    if (query) {
                        url += (url.indexOf('?') >= 0 ? '&' : '?') + query;
                    }

                    return url;
                };

                Rest.prototype.createMessageForRequest = function createMessageForRequest(method, params) {

                    var message = this.createMessage();

                    let headers = this.getSecurityHeader();
                    if (params.multipart) {
                        message.setHeaders(headers);
                    } else {
                        headers = Object.assign({}, this.getContentTypeHeader(), this.getSecurityHeader());
                        if (params.headers) {
                            headers = Object.assign({}, headers, params.headers);
                        }
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

                    minilog('secucard.rest').debug('message', message);

                    return message;
                };

                Rest.prototype.buildEndpoint = function buildEndpoint(endpoint) {

                    if (!endpoint || endpoint.length < 2) {
                        throw new Error('Invalid endpoint specification.');
                    }

                    return endpoint.join('/');
                };

                return Rest;
            })();

            _export('Rest', Rest);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L3Jlc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O21JQW1CYSxJQUFJOzs7Ozs7OzsyQkFQVCxHQUFHOzRCQUFFLElBQUk7MkJBQUUsR0FBRzs0QkFBRSxJQUFJOzhCQUFFLE1BQU07K0JBQzVCLE9BQU87OytCQUNQLE9BQU87OzJEQUNQLDZCQUE2Qjs7a0RBQzdCLHdCQUF3Qjs7Ozs7QUFHbkIsZ0JBQUk7QUFFRix5QkFGRixJQUFJLEdBRUM7MENBRkwsSUFBSTs7QUFJVCx3QkFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7O0FBRXJCLHdCQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFDbkMsd0JBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQzs7QUFFckMsd0JBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztBQUNuQyx3QkFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO0FBQ3JDLHdCQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7O0FBRXRDLHdCQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQzs7QUFFbEQsd0JBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO0FBQ3RELHdCQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQzs7QUFFdkQsd0JBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0s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QUFDO3FCQUN4Qzs7QUFFRCx3QkFBSSxNQUFNLENBQUMsSUFBSSxFQUFFO0FBQ2IsK0JBQU8sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO3FCQUNoQzs7QUFFRCx3QkFBRyxNQUFNLENBQUMsU0FBUyxFQUFFO0FBQ2pCLCtCQUFPLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztxQkFDMUM7O0FBRUQsMkJBQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDOztBQUVuRCwyQkFBTyxPQUFPLENBQUM7aUJBRWxCOztBQS9QUSxvQkFBSSxXQWlRYixhQUFhLEdBQUEsdUJBQUMsUUFBUSxFQUFFOztBQUVwQix3QkFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtBQUNsQyw4QkFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO3FCQUN0RDs7QUFFRCwyQkFBTyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUU3Qjs7dUJBelFRLElBQUkiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9uZXQvcmVzdC5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=
