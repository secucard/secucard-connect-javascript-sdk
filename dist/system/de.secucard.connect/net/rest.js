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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L3Jlc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O21JQW1CYSxJQUFJOzs7Ozs7OzsyQkFQVCxHQUFHOzRCQUFFLElBQUk7MkJBQUUsR0FBRzs0QkFBRSxJQUFJOzhCQUFFLE1BQU07K0JBQzVCLE9BQU87OytCQUNQLE9BQU87OzJEQUNQLDZCQUE2Qjs7a0RBQzdCLHdCQUF3Qjs7Ozs7QUFHbkIsZ0JBQUk7QUFFRix5QkFGRixJQUFJLEdBRUM7MENBRkwsSUFBSTs7QUFHVCx3QkFBSSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7O0FBRXJCLHdCQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFDbkMsd0JBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQzs7QUFFckMsd0JBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztBQUNuQyx3QkFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO0FBQ3JDLHdCQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7O0FBRXRDLHdCQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQzs7QUFFbEQsd0JBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO0FBQ3RELHdCQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQzs7QUFFdkQsd0JBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0s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SSxNQUFNLENBQUMsU0FBUyxFQUFFO0FBQ2xCLG9DQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztxQkFDdkM7O0FBRUQsMkJBQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDOztBQUVqRCx3QkFBSSxNQUFNLENBQUMsV0FBVyxFQUFFO0FBQ3BCLCtCQUFPLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztxQkFDeEM7O0FBRUQsd0JBQUksTUFBTSxDQUFDLElBQUksRUFBRTtBQUNiLCtCQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztxQkFDaEM7O0FBRUQsd0JBQUcsTUFBTSxDQUFDLFNBQVMsRUFBRTtBQUNqQiwrQkFBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7cUJBQzFDOztBQUVELDJCQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQzs7QUFFbkQsMkJBQU8sT0FBTyxDQUFDO2lCQUNsQjs7QUFyUFEsb0JBQUksV0F1UGIsYUFBYSxHQUFBLHVCQUFDLFFBQVEsRUFBRTtBQUNwQix3QkFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtBQUNsQyw4QkFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO3FCQUN0RDs7QUFFRCwyQkFBTyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUM3Qjs7dUJBN1BRLElBQUkiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9uZXQvcmVzdC5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=
