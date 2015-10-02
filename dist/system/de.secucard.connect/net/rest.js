System.register(['superagent', './message', './channel', '../auth/exception', './exception', 'minilog', 'qs'], function (_export) {
    'use strict';

    var Request, GET, POST, PUT, HEAD, DELETE, Message, Channel, AuthenticationFailedException, SecucardConnectException, minilog, QS, Rest;

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
        }, function (_qs) {
            QS = _qs['default'];
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

                        if (message.headers) {
                            request.set(message.headers);
                        }

                        if (message.query) {
                            console.log(QS.stringify(message.query), message.query);

                            request.query(message.query);
                        }

                        if (message.body) {
                            request.send(message.body);
                        }

                        if (message.accept) {
                            request.accept(message.accept);
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
                    message.setHeaders({ 'Content-Type': 'application/json' });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L3Jlc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3VJQW9CYSxJQUFJOzs7Ozs7OzsyQkFSVCxHQUFHOzRCQUFFLElBQUk7MkJBQUUsR0FBRzs0QkFBRSxJQUFJOzhCQUFFLE1BQU07K0JBQzVCLE9BQU87OytCQUNQLE9BQU87OzJEQUNQLDZCQUE2Qjs7a0RBQzdCLHdCQUF3Qjs7Ozs7OztBQUluQixnQkFBSTtBQUVGLHlCQUZGLElBQUksR0FFQzswQ0FGTCxJQUFJOztBQUlULHdCQUFJLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQzs7QUFFckIsd0JBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztBQUNuQyx3QkFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDOztBQUVyQyx3QkFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO0FBQ25DLHdCQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7QUFDckMsd0JBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQzs7QUFFdEMsd0JBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDOztBQUVsRCx3QkFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUM7QUFDdEQsd0JBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDOztBQUV2RCx3QkFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFB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