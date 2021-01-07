System.register(['superagent', './message', './channel', '../auth/exception', './exception', 'minilog'], function (_export) {
    'use strict';

    var Request, GET, POST, PUT, PATCH, HEAD, DELETE, Message, Channel, AuthenticationFailedException, SecucardConnectException, minilog, Rest;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    return {
        setters: [function (_superagent) {
            Request = _superagent['default'];
        }, function (_message) {
            GET = _message.GET;
            POST = _message.POST;
            PUT = _message.PUT;
            PATCH = _message.PATCH;
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
                    this.methodFuns[PATCH] = Request.patch;
                    this.methodFuns[HEAD] = Request.head;
                    this.methodFuns[DELETE] = Request.del;

                    this.methodFuns[Channel.METHOD.GET] = Request.get;

                    this.methodFuns[Channel.METHOD.CREATE] = Request.post;
                    this.methodFuns[Channel.METHOD.EXECUTE] = Request.post;

                    this.methodFuns[Channel.METHOD.UPDATE] = Request.put;
                    this.methodFuns[Channel.METHOD.PATCH] = Request.patch;
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

                    this.getLanguage = function () {
                        return context.getConfig().getLanguage();
                    };
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

                Rest.prototype.getLanguageHeader = function getLanguageHeader() {
                    return { 'Accept-Language': this.getLanguage() };
                };

                Rest.prototype.sendWithToken = function sendWithToken(message) {
                    var _this2 = this;

                    return this.getToken(true).then(function (token) {
                        var headers = Object.assign({}, message.headers, _this2.getAuthHeader(token), _this2.getLanguageHeader());
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L3Jlc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OzBJQW1CYSxJQUFJOzs7Ozs7OzsyQkFQVCxHQUFHOzRCQUFFLElBQUk7MkJBQUUsR0FBRzs2QkFBRSxLQUFLOzRCQUFFLElBQUk7OEJBQUUsTUFBTTsrQkFDbkMsT0FBTzs7K0JBQ1AsT0FBTzs7MkRBQ1AsNkJBQTZCOztrREFDN0Isd0JBQXdCOzs7OztBQUduQixnQkFBSTtBQUVGLHlCQUZGLElBQUksR0FFQzswQ0FGTCxJQUFJOztBQUdULHdCQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQzs7QUFFckIsd0JBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztBQUNuQyx3QkFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDOztBQUVyQyx3QkFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO0FBQ25DLHdCQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUM7QUFDdkMsd0JBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztBQUNyQyx3QkFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDOztBQUV0Qyx3QkFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7O0FBRWxELHdCQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztBQUN0RCx3QkFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE9BQU8s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
