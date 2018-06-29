'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Stomp = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _eventemitter = require('eventemitter3');

var _eventemitter2 = _interopRequireDefault(_eventemitter);

var _minilog = require('minilog');

var _minilog2 = _interopRequireDefault(_minilog);

var _channel = require('./channel');

var _stomp = require('./stomp-impl/stomp');

var _exception = require('./exception');

var _exception2 = require('../auth/exception');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var utils = {};
utils.really_defined = function (var_to_test) {
    return !(var_to_test == null || var_to_test == undefined);
};

utils.sizeOfUTF8 = function (str) {
    var size = 0;
    if (str) {
        size = encodeURI(str).match(/%..|./g).length;
    }
    return size;
};

var Stomp = exports.Stomp = function () {
    function Stomp(SocketImpl) {
        _classCallCheck(this, Stomp);

        Object.assign(this, _eventemitter2.default.prototype);

        this.connection = null;
        this.messages = {};

        this.skipSessionRefresh = false;
        this.sessionTimer = null;

        this.connectAccessToken = null;

        this.stompCommands = {};
        this.stompCommands[_channel.Channel.METHOD.GET] = 'get';
        this.stompCommands[_channel.Channel.METHOD.CREATE] = 'add';
        this.stompCommands[_channel.Channel.METHOD.EXECUTE] = 'exec';
        this.stompCommands[_channel.Channel.METHOD.UPDATE] = 'update';
        this.stompCommands[_channel.Channel.METHOD.DELETE] = 'delete';

        this.connection = new _stomp.Stomp(SocketImpl);
        this.connection.on('message', this._handleStompMessage.bind(this));
    }

    _createClass(Stomp, [{
        key: 'configureWithContext',
        value: function configureWithContext(context) {

            this.emitServiceEvent = context.emitServiceEvent.bind(context);

            this.getToken = function (extend) {
                return context.getAuth().getToken(extend);
            };

            this.getStompHost = function () {
                return context.getConfig().getStompHost();
            };

            this.getStompPort = function () {
                return context.getConfig().getStompPort();
            };

            this.getStompSslEnabled = function () {
                return context.getConfig().getStompSslEnabled();
            };

            this.getStompVHost = function () {
                return context.getConfig().getStompVHost();
            };

            this.getStompQueue = function () {
                return context.getConfig().getStompQueue();
            };

            this.getStompDestination = function () {
                return context.getConfig().getStompDestination();
            };

            this.getStompEndpoint = function () {
                return context.getConfig().getStompEndpoint();
            };

            this.getStompHeartbeatMs = function () {
                return context.getConfig().getStompHeartbeatMs();
            };
        }
    }, {
        key: 'getStompConfig',
        value: function getStompConfig() {

            return {

                host: this.getStompHost(),
                port: this.getStompPort(),
                ssl: this.getStompSslEnabled(),
                vhost: this.getStompVHost(),
                heartbeatMs: this.getStompHeartbeatMs(),
                endpoint: this.getStompEndpoint(),
                login: '',
                passcode: ''
            };
        }
    }, {
        key: 'open',
        value: function open() {

            return this._startSessionRefresh();
        }
    }, {
        key: 'connect',
        value: function connect() {
            var _this = this;

            (0, _minilog2.default)('secucard.stomp').debug('stomp start connection');

            return this.getToken().then(function (token) {

                (0, _minilog2.default)('secucard.stomp').debug('Got token', token);
                return _this._connect(token.access_token);
            });
        }
    }, {
        key: 'close',
        value: function close() {

            if (this.sessionTimer) {
                clearInterval(this.sessionTimer);
            }

            return this._disconnect();
        }
    }, {
        key: '_disconnect',
        value: function _disconnect() {
            var _this2 = this;

            return new Promise(function (resolve, reject) {

                var ignoreSession = true;
                if (!_this2.connection.isConnected(ignoreSession)) {
                    resolve();
                    return;
                }

                if (_this2.connection && _this2.connection.disconnect) {

                    _this2.connection.disconnect();

                    _this2._stompOnDisconnected = function () {
                        (0, _minilog2.default)('secucard.stomp').debug('stomp disconnected');
                        _this2.connection.removeListener('disconnected', _this2._stompOnDisconnected);
                        delete _this2._stompOnDisconnected;
                        resolve();
                    };

                    _this2.connection.on('disconnected', _this2._stompOnDisconnected);
                } else {

                    resolve();
                }
            });
        }
    }, {
        key: 'request',
        value: function request(method, params) {

            var destination = this.buildDestination(method, params);
            var message = this.createMessage(params);
            return this._sendMessage(destination, message).catch(function (err) {
                err.request = JSON.stringify({ method: method, params: params });
                throw err;
            });
        }
    }, {
        key: 'buildDestination',
        value: function buildDestination(method, params) {

            var destination = {};

            if (params.endpoint != null) {
                destination.endpoint = params.endpoint;
            } else if (params.appId != null) {
                destination.appId = params.appId;
            } else {
                throw new Error('Missing object spec or app id');
            }

            destination.command = this.stompCommands[method];

            if (!destination.command) {
                throw new Error('Invalid method arg');
            }

            destination.action = params.action;

            return destination;
        }
    }, {
        key: 'createMessage',
        value: function createMessage(params) {

            var message = {};

            if (utils.really_defined(params.objectId)) {
                message.pid = params.objectId;
            }

            if (utils.really_defined(params.actionArg)) {
                message.sid = params.actionArg;
            }

            if (utils.really_defined(params.queryParams)) {
                message.query = params.queryParams;
            }

            if (utils.really_defined(params.data)) {
                message.data = params.data;
            }

            return message;
        }
    }, {
        key: '_connect',
        value: function _connect(accessToken) {
            var _this3 = this;

            if (!accessToken) {

                return this.close().then(function () {
                    return Promise.reject(new _exception2.AuthenticationFailedException('Access token is not valid'));
                });
            }

            this.connectAccessToken = accessToken;

            var stompCredentials = {
                login: accessToken,
                passcode: accessToken
            };

            this.connection.configure(this.getStompConfig());
            this.connection.connect(stompCredentials);

            return new Promise(function (resolve, reject) {

                _this3._stompOnConnected = function () {
                    (0, _minilog2.default)('secucard.stomp').debug('stomp connected');
                    _this3._stompClearListeners ? _this3._stompClearListeners() : null;
                    resolve(true);
                };

                _this3._stompOnError = function (message) {
                    (0, _minilog2.default)('secucard.stomp').error('stomp error', message);
                    _this3._stompClearListeners ? _this3._stompClearListeners() : null;
                    _this3.close().then(function () {
                        if (message.headers && message.headers.message == 'Bad CONNECT') {
                            reject(new _exception2.AuthenticationFailedException(message.body[0]));
                        } else {
                            reject(message);
                        }
                    });
                };

                _this3._stompClearListeners = function () {
                    _this3.connection.removeListener('connected', _this3._stompOnConnected);
                    _this3.connection.removeListener('error', _this3._stompOnError);
                    delete _this3._stompOnConnected;
                    delete _this3._stompOnError;
                    delete _this3._stompClearListeners;
                };

                _this3.connection.on('connected', _this3._stompOnConnected);
                _this3.connection.on('error', _this3._stompOnError);
            });
        }
    }, {
        key: '_sendMessage',
        value: function _sendMessage(destinationObj, message) {
            var _this4 = this;

            (0, _minilog2.default)('secucard.stomp').debug('message', destinationObj, message);

            return this.getToken(true).then(function (token) {

                var accessToken = token.access_token;
                var correlationId = _this4.createCorrelationId();

                var headers = {};
                headers['reply-to'] = _this4.getStompQueue();
                headers['content-type'] = 'application/json';
                headers['user-id'] = accessToken;
                headers['correlation-id'] = correlationId;

                if (destinationObj.appId) {
                    headers['app-id'] = destinationObj.appId;
                }

                var body = JSON.stringify(message);
                headers['content-length'] = utils.sizeOfUTF8(body);

                var destination = _this4.getStompDestination();
                if (destinationObj.appId) {

                    destination += 'app:' + destinationObj.action;
                } else {

                    destination += 'api:' + destinationObj.command + ':';

                    var endpoint = [];
                    if (destinationObj.endpoint) {
                        endpoint = endpoint.concat(destinationObj.endpoint);
                    }
                    if (destinationObj.action) {
                        endpoint.push(destinationObj.action);
                    }

                    destination += endpoint.join('.');
                }

                var sendWithStomp = function sendWithStomp() {

                    return new Promise(function (resolve, reject) {

                        _this4.messages[correlationId] = { resolve: resolve, reject: reject };
                        _this4.connection.send(destination, headers, body);
                    });
                };

                if (!_this4.connection.isConnected() || accessToken != _this4.connectAccessToken) {

                    if (_this4.connection.isConnected()) {
                        (0, _minilog2.default)('secucard.stomp').warn('Reconnect due token change.');
                    }

                    return _this4._disconnect().then(function () {
                        return _this4._runSessionRefresh().then(sendWithStomp);
                    });
                }

                return sendWithStomp();
            });
        }
    }, {
        key: '_startSessionRefresh',
        value: function _startSessionRefresh() {
            var _this5 = this;

            (0, _minilog2.default)('secucard.stomp').debug('Stomp session refresh loop started');

            var initial = true;

            var sessionInterval = this.getStompHeartbeatMs() > 0 ? this.getStompHeartbeatMs() - 500 : 25 * 1000;

            this.sessionTimer = setInterval(function () {

                if (_this5.skipSessionRefresh) {
                    _this5.skipSessionRefresh = false;
                } else {
                    _this5._runSessionRefresh(false);
                }
            }, sessionInterval);

            return this._runSessionRefresh(initial);
        }
    }, {
        key: '_runSessionRefresh',
        value: function _runSessionRefresh(initial) {
            var _this6 = this;

            var createRefreshRequest = function createRefreshRequest() {

                return _this6.request(_channel.Channel.METHOD.EXECUTE, {
                    endpoint: ['auth', 'sessions'],
                    objectId: 'me',
                    action: 'refresh'
                }).then(function (res) {

                    _this6.emit('sessionRefresh');
                    (0, _minilog2.default)('secucard.stomp').debug('Session refresh sent');
                    _this6.skipSessionRefresh = false;
                    return res;
                }).catch(function (err) {

                    _this6.emit('sessionRefreshError');
                    (0, _minilog2.default)('secucard.stomp').error('Session refresh failed');
                    if (initial) {
                        throw err;
                    }
                });
            };

            if (!this.connection.isConnected()) {

                return this.connect().then(createRefreshRequest);
            } else {

                return createRefreshRequest();
            }
        }
    }, {
        key: '_handleStompMessage',
        value: function _handleStompMessage(frame) {
            this.skipSessionRefresh = true;

            (0, _minilog2.default)('secucard.stomp').debug('_handleStompMessage', frame);

            var body = void 0;

            if (frame && frame.headers && frame.headers['correlation-id']) {

                var correlationId = frame.headers['correlation-id'];
                body = JSON.parse(frame.body[0]);

                if (body.status == 'ok') {
                    this.messages[correlationId].resolve(body.data);
                } else {
                    var error = _exception.SecucardConnectException.create(body);
                    this.messages[correlationId].reject(error);
                }

                delete this.messages[correlationId];
            } else if (frame) {

                body = JSON.parse(frame.body[0]);
                this.emitServiceEvent(null, body.target, body.type, body.data);
            }
        }
    }, {
        key: 'createCorrelationId',
        value: function createCorrelationId() {
            return _uuid2.default.v1();
        }
    }]);

    return Stomp;
}();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L3N0b21wLmpzIl0sIm5hbWVzIjpbInV0aWxzIiwicmVhbGx5X2RlZmluZWQiLCJ2YXJfdG9fdGVzdCIsInVuZGVmaW5lZCIsInNpemVPZlVURjgiLCJzdHIiLCJzaXplIiwiZW5jb2RlVVJJIiwibWF0Y2giLCJsZW5ndGgiLCJTdG9tcCIsIlNvY2tldEltcGwiLCJPYmplY3QiLCJhc3NpZ24iLCJFRSIsInByb3RvdHlwZSIsImNvbm5lY3Rpb24iLCJtZXNzYWdlcyIsInNraXBTZXNzaW9uUmVmcmVzaCIsInNlc3Npb25UaW1lciIsImNvbm5lY3RBY2Nlc3NUb2tlbiIsInN0b21wQ29tbWFuZHMiLCJDaGFubmVsIiwiTUVUSE9EIiwiR0VUIiwiQ1JFQVRFIiwiRVhFQ1VURSIsIlVQREFURSIsIkRFTEVURSIsIlN0b21wSW1wbCIsIm9uIiwiX2hhbmRsZVN0b21wTWVzc2FnZSIsImJpbmQiLCJjb250ZXh0IiwiZW1pdFNlcnZpY2VFdmVudCIsImdldFRva2VuIiwiZXh0ZW5kIiwiZ2V0QXV0aCIsImdldFN0b21wSG9zdCIsImdldENvbmZpZyIsImdldFN0b21wUG9ydCIsImdldFN0b21wU3NsRW5hYmxlZCIsImdldFN0b21wVkhvc3QiLCJnZXRTdG9tcFF1ZXVlIiwiZ2V0U3RvbXBEZXN0aW5hdGlvbiIsImdldFN0b21wRW5kcG9pbnQiLCJnZXRTdG9tcEhlYXJ0YmVhdE1zIiwiaG9zdCIsInBvcnQiLCJzc2wiLCJ2aG9zdCIsImhlYXJ0YmVhdE1zIiwiZW5kcG9pbnQiLCJsb2dpbiIsInBhc3Njb2RlIiwiX3N0YXJ0U2Vzc2lvblJlZnJlc2giLCJkZWJ1ZyIsInRoZW4iLCJ0b2tlbiIsIl9jb25uZWN0IiwiYWNjZXNzX3Rva2VuIiwiY2xlYXJJbnRlcnZhbCIsIl9kaXNjb25uZWN0IiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJpZ25vcmVTZXNzaW9uIiwiaXNDb25uZWN0ZWQiLCJkaXNjb25uZWN0IiwiX3N0b21wT25EaXNjb25uZWN0ZWQiLCJyZW1vdmVMaXN0ZW5lciIsIm1ldGhvZCIsInBhcmFtcyIsImRlc3RpbmF0aW9uIiwiYnVpbGREZXN0aW5hdGlvbiIsIm1lc3NhZ2UiLCJjcmVhdGVNZXNzYWdlIiwiX3NlbmRNZXNzYWdlIiwiY2F0Y2giLCJlcnIiLCJyZXF1ZXN0IiwiSlNPTiIsInN0cmluZ2lmeSIsImFwcElkIiwiRXJyb3IiLCJjb21tYW5kIiwiYWN0aW9uIiwib2JqZWN0SWQiLCJwaWQiLCJhY3Rpb25BcmciLCJzaWQiLCJxdWVyeVBhcmFtcyIsInF1ZXJ5IiwiZGF0YSIsImFjY2Vzc1Rva2VuIiwiY2xvc2UiLCJBdXRoZW50aWNhdGlvbkZhaWxlZEV4Y2VwdGlvbiIsInN0b21wQ3JlZGVudGlhbHMiLCJjb25maWd1cmUiLCJnZXRTdG9tcENvbmZpZyIsImNvbm5lY3QiLCJfc3RvbXBPbkNvbm5lY3RlZCIsIl9zdG9tcENsZWFyTGlzdGVuZXJzIiwiX3N0b21wT25FcnJvciIsImVycm9yIiwiaGVhZGVycyIsImJvZHkiLCJkZXN0aW5hdGlvbk9iaiIsImNvcnJlbGF0aW9uSWQiLCJjcmVhdGVDb3JyZWxhdGlvbklkIiwiY29uY2F0IiwicHVzaCIsImpvaW4iLCJzZW5kV2l0aFN0b21wIiwic2VuZCIsIndhcm4iLCJfcnVuU2Vzc2lvblJlZnJlc2giLCJpbml0aWFsIiwic2Vzc2lvbkludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJjcmVhdGVSZWZyZXNoUmVxdWVzdCIsInJlcyIsImVtaXQiLCJmcmFtZSIsInBhcnNlIiwic3RhdHVzIiwiU2VjdWNhcmRDb25uZWN0RXhjZXB0aW9uIiwiY3JlYXRlIiwidGFyZ2V0IiwidHlwZSIsIlVVSUQiLCJ2MSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBV0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7OztBQUVBLElBQUlBLFFBQVEsRUFBWjtBQUNBQSxNQUFNQyxjQUFOLEdBQXVCLFVBQUNDLFdBQUQsRUFBaUI7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LDJCQUFLMkMsSUFBTCxDQUFVLHFCQUFWO0FBQ0EsMkNBQVEsZ0JBQVIsRUFBMEJsQixLQUExQixDQUFnQyx3QkFBaEM7QUFDQSx3QkFBSWEsT0FBSixFQUFhO0FBQ1QsOEJBQU10QyxHQUFOO0FBQ0g7QUFFSixpQkFuQk0sQ0FBUDtBQXFCSCxhQXZCRDs7QUF5QkEsZ0JBQUksQ0FBQyxLQUFLL0QsVUFBTCxDQUFnQm1ELFdBQWhCLEVBQUwsRUFBb0M7O0FBRWhDLHVCQUFPLEtBQUtpQyxPQUFMLEdBQWUzQyxJQUFmLENBQW9CK0Qsb0JBQXBCLENBQVA7QUFFSCxhQUpELE1BSU87O0FBRUgsdUJBQU9BLHNCQUFQO0FBRUg7QUFFSjs7OzRDQUVtQkcsSyxFQUFPO0FBR3ZCLGlCQUFLekcsa0JBQUwsR0FBMEIsSUFBMUI7O0FBRUEsbUNBQVEsZ0JBQVIsRUFBMEJzQyxLQUExQixDQUFnQyxxQkFBaEMsRUFBdURtRSxLQUF2RDs7QUFFQSxnQkFBSWpCLGFBQUo7O0FBRUEsZ0JBQUlpQixTQUFTQSxNQUFNbEIsT0FBZixJQUEwQmtCLE1BQU1sQixPQUFOLENBQWMsZ0JBQWQsQ0FBOUIsRUFBK0Q7O0FBRTNELG9CQUFJRyxnQkFBZ0JlLE1BQU1sQixPQUFOLENBQWMsZ0JBQWQsQ0FBcEI7QUFDQUMsdUJBQU96QixLQUFLMkMsS0FBTCxDQUFXRCxNQUFNakIsSUFBTixDQUFXLENBQVgsQ0FBWCxDQUFQOztBQUVBLG9CQUFJQSxLQUFLbUIsTUFBTCxJQUFlLElBQW5CLEVBQXlCO0FBQ3JCLHlCQUFLNUcsUUFBTCxDQUFjMkYsYUFBZCxFQUE2QjVDLE9BQTdCLENBQXFDMEMsS0FBS2IsSUFBMUM7QUFDSCxpQkFGRCxNQUVPO0FBQ0gsd0JBQUlXLFFBQVFzQixvQ0FBeUJDLE1BQXpCLENBQWdDckIsSUFBaEMsQ0FBWjtBQUNBLHlCQUFLekYsUUFBTCxDQUFjMkYsYUFBZCxFQUE2QjNDLE1BQTdCLENBQW9DdUMsS0FBcEM7QUFDSDs7QUFFRCx1QkFBTyxLQUFLdkYsUUFBTCxDQUFjMkYsYUFBZCxDQUFQO0FBRUgsYUFkRCxNQWNPLElBQUllLEtBQUosRUFBVzs7QUFFZGpCLHVCQUFPekIsS0FBSzJDLEtBQUwsQ0FBV0QsTUFBTWpCLElBQU4sQ0FBVyxDQUFYLENBQVgsQ0FBUDtBQUNBLHFCQUFLeEUsZ0JBQUwsQ0FBc0IsSUFBdEIsRUFBNEJ3RSxLQUFLc0IsTUFBakMsRUFBeUN0QixLQUFLdUIsSUFBOUMsRUFBb0R2QixLQUFLYixJQUF6RDtBQUVIO0FBRUo7Ozs4Q0FFcUI7QUFDbEIsbUJBQU9xQyxlQUFLQyxFQUFMLEVBQVA7QUFDSCIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L25ldC9zdG9tcC5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=
