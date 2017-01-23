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

                        var url = message.baseUrl ? message.baseUrl + message.url : message.url;
                        var request = _this.r(url, message.method);

                        if (_this.withCredentials()) {
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

                        request.end(function (err, res) {
                            if (err) {
                                reject(err, res);
                            } else {
                                resolve(res);
                            }
                        });
                    });
                };

                Rest.prototype.getAuthHeader = function getAuthHeader(token) {

                    return { 'Authorization': 'Bearer ' + token.access_token };
                };

                Rest.prototype.sendWithToken = function sendWithToken(message) {
                    var _this2 = this;

                    return this.getToken(true).then(function (token) {

                        var headers = Object.assign({}, message.headers, _this2.getAuthHeader(token));
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

                        if (error instanceof AuthenticationFailedException) {} else if (err.response) {
                            error = SecucardConnectException.create(err.response.body);
                        }

                        error.request = request;

                        throw error;
                    };

                    var message = this.createMessageForRequest(method, params);

                    var pr = !this.isRequestWithToken || this.isRequestWithToken(params.options) ? this.sendWithToken(message) : this.send(message);

                    return pr.then(requestSuccess)['catch'](requestError);
                };

                Rest.prototype.createMessageForRequest = function createMessageForRequest(method, params) {

                    var message = this.createMessage();

                    if (!params.multipart && params.headers) {
                        message.setHeaders(Object.assign({}, { 'Content-Type': 'application/json' }, params.headers));
                    } else if (!params.multipart) {
                        message.setHeaders({ 'Content-Type': 'application/json' });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L3Jlc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O21JQW9CYSxJQUFJOzs7Ozs7OzsyQkFSVCxHQUFHOzRCQUFFLElBQUk7MkJBQUUsR0FBRzs0QkFBRSxJQUFJOzhCQUFFLE1BQU07K0JBQzVCLE9BQU87OytCQUNQLE9BQU87OzJEQUNQLDZCQUE2Qjs7a0RBQzdCLHdCQUF3Qjs7Ozs7QUFJbkIsZ0JBQUk7QUFFRix5QkFGRixJQUFJLEdBRUM7MENBRkwsSUFBSTs7QUFJVCx3QkFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7O0FBRXJCLHdCQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFDbkMsd0JBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQzs7QUFFckMsd0JBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztBQUNuQyx3QkFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO0FBQ3JDLHdCQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7O0FBRXRDLHdCQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQzs7QUFFbEQsd0JBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO0FBQ3RELHdCQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQzs7QUFFdkQsd0JBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0s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