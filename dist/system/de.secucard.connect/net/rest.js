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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L3Jlc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O21JQW9CYSxJQUFJOzs7Ozs7OzsyQkFSVCxHQUFHOzRCQUFFLElBQUk7MkJBQUUsR0FBRzs0QkFBRSxJQUFJOzhCQUFFLE1BQU07K0JBQzVCLE9BQU87OytCQUNQLE9BQU87OzJEQUNQLDZCQUE2Qjs7a0RBQzdCLHdCQUF3Qjs7Ozs7QUFJbkIsZ0JBQUk7QUFFRix5QkFGRixJQUFJLEdBRUM7MENBRkwsSUFBSTs7QUFJVCx3QkFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7O0FBRXJCLHdCQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFDbkMsd0JBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQzs7QUFFckMsd0JBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztBQUNuQyx3QkFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO0FBQ3JDLHdCQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7O0FBRXRDLHdCQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQzs7QUFFbEQsd0JBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO0FBQ3RELHdCQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQzs7QUFFdkQsd0JBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0s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LENBQUMsU0FBUyxDQUFDLENBQUM7cUJBQ3ZDOztBQUVELDJCQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQzs7QUFFakQsd0JBQUksTUFBTSxDQUFDLFdBQVcsRUFBRTtBQUNwQiwrQkFBTyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7cUJBQ3hDOztBQUVELHdCQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQUU7QUFDYiwrQkFBTyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQ2hDOztBQUVELHdCQUFHLE1BQU0sQ0FBQyxTQUFTLEVBQUU7QUFDakIsK0JBQU8sQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO3FCQUMxQzs7QUFFRCwyQkFBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7O0FBRW5ELDJCQUFPLE9BQU8sQ0FBQztpQkFFbEI7O0FBaE9RLG9CQUFJLFdBa09iLGFBQWEsR0FBQSx1QkFBQyxRQUFRLEVBQUU7O0FBRXBCLHdCQUFJLENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO0FBQ2xDLDhCQUFNLElBQUksS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7cUJBQ3REOztBQUVELDJCQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7aUJBRTdCOzt1QkExT1EsSUFBSSIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L25ldC9yZXN0LmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==