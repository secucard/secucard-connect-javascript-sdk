'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _message = require('./message');

var _channel = require('./channel');

var _authException = require('../auth/exception');

var _exception = require('./exception');

var _minilog = require('minilog');

var _minilog2 = _interopRequireDefault(_minilog);

var Rest = (function () {
    function Rest() {
        _classCallCheck(this, Rest);

        this.methodFuns = {};

        this.methodFuns[_message.GET] = _superagent2['default'].get;
        this.methodFuns[_message.POST] = _superagent2['default'].post;

        this.methodFuns[_message.PUT] = _superagent2['default'].put;
        this.methodFuns[_message.HEAD] = _superagent2['default'].head;
        this.methodFuns[_message.DELETE] = _superagent2['default']['delete'];

        this.methodFuns[_channel.Channel.METHOD.GET] = _superagent2['default'].get;

        this.methodFuns[_channel.Channel.METHOD.CREATE] = _superagent2['default'].post;
        this.methodFuns[_channel.Channel.METHOD.EXECUTE] = _superagent2['default'].post;

        this.methodFuns[_channel.Channel.METHOD.UPDATE] = _superagent2['default'].put;
        this.methodFuns[_channel.Channel.METHOD.DELETE] = _superagent2['default']['delete'];
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
        var message = new _message.Message();
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
            return res.body;
        };

        var requestError = function requestError(err) {
            var error = err;
            var request = JSON.stringify({ method: method, params: params });

            if (error instanceof _authException.AuthenticationFailedException) {} else {
                error = _exception.SecucardConnectException.create(err.response.body);
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

        _minilog2['default']('secucard.rest').debug('message', message);

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

exports.Rest = Rest;