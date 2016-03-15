System.register(['uuid', 'eventemitter3', 'minilog', './channel', './stomp-impl/stomp', './exception', '../auth/exception'], function (_export) {
    'use strict';

    var UUID, EE, minilog, Channel, StompImpl, SecucardConnectException, AuthenticationFailedException, utils, Stomp;

    function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

    return {
        setters: [function (_uuid) {
            UUID = _uuid['default'];
        }, function (_eventemitter3) {
            EE = _eventemitter3['default'];
        }, function (_minilog) {
            minilog = _minilog['default'];
        }, function (_channel) {
            Channel = _channel.Channel;
        }, function (_stompImplStomp) {
            StompImpl = _stompImplStomp.Stomp;
        }, function (_exception) {
            SecucardConnectException = _exception.SecucardConnectException;
        }, function (_authException) {
            AuthenticationFailedException = _authException.AuthenticationFailedException;
        }],
        execute: function () {
            utils = {};

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

            Stomp = (function () {
                function Stomp(SocketImpl) {
                    _classCallCheck(this, Stomp);

                    Object.assign(this, EE.prototype);

                    this.connection = null;
                    this.messages = {};

                    this.skipSessionRefresh = false;
                    this.sessionTimer = null;

                    this.connectAccessToken = null;

                    this.stompCommands = {};
                    this.stompCommands[Channel.METHOD.GET] = 'get';
                    this.stompCommands[Channel.METHOD.CREATE] = 'add';
                    this.stompCommands[Channel.METHOD.EXECUTE] = 'exec';
                    this.stompCommands[Channel.METHOD.UPDATE] = 'update';
                    this.stompCommands[Channel.METHOD.DELETE] = 'delete';

                    this.connection = new StompImpl(SocketImpl);
                    this.connection.on('message', this._handleStompMessage.bind(this));
                }

                Stomp.prototype.configureWithContext = function configureWithContext(context) {

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
                };

                Stomp.prototype.getStompConfig = function getStompConfig() {

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
                };

                Stomp.prototype.open = function open() {

                    return this._startSessionRefresh();
                };

                Stomp.prototype.connect = function connect() {
                    var _this = this;

                    minilog('secucard.stomp').debug('stomp start connection');

                    return this.getToken().then(function (token) {

                        minilog('secucard.stomp').debug('Got token', token);
                        return _this._connect(token.access_token);
                    });
                };

                Stomp.prototype.close = function close() {

                    if (this.sessionTimer) {
                        clearInterval(this.sessionTimer);
                    }

                    return this._disconnect();
                };

                Stomp.prototype._disconnect = function _disconnect() {
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
                                minilog('secucard.stomp').debug('stomp disconnected');
                                _this2.connection.removeListener('disconnected', _this2._stompOnDisconnected);
                                delete _this2._stompOnDisconnected;
                                resolve();
                            };

                            _this2.connection.on('disconnected', _this2._stompOnDisconnected);
                        } else {

                            resolve();
                        }
                    });
                };

                Stomp.prototype.request = function request(method, params) {

                    var destination = this.buildDestination(method, params);
                    var message = this.createMessage(params);
                    return this._sendMessage(destination, message)['catch'](function (err) {
                        err.request = JSON.stringify({ method: method, params: params });
                        throw err;
                    });
                };

                Stomp.prototype.buildDestination = function buildDestination(method, params) {

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
                };

                Stomp.prototype.createMessage = function createMessage(params) {

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
                };

                Stomp.prototype._connect = function _connect(accessToken) {
                    var _this3 = this;

                    if (!accessToken) {

                        return this.close().then(function () {
                            return Promise.reject(new AuthenticationFailedException('Access token is not valid'));
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
                            minilog('secucard.stomp').debug('stomp connected');
                            _this3._stompClearListeners ? _this3._stompClearListeners() : null;
                            resolve(true);
                        };

                        _this3._stompOnError = function (message) {
                            minilog('secucard.stomp').error('stomp error', message);
                            _this3._stompClearListeners ? _this3._stompClearListeners() : null;
                            _this3.close().then(function () {
                                if (message.headers && message.headers.message == 'Bad CONNECT') {
                                    reject(new AuthenticationFailedException(message.body[0]));
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
                };

                Stomp.prototype._sendMessage = function _sendMessage(destinationObj, message) {
                    var _this4 = this;

                    minilog('secucard.stomp').debug('message', destinationObj, message);

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
                                minilog('secucard.stomp').warn('Reconnect due token change.');
                            }

                            return _this4._disconnect().then(function () {
                                return _this4._runSessionRefresh().then(sendWithStomp);
                            });
                        }

                        return sendWithStomp();
                    });
                };

                Stomp.prototype._startSessionRefresh = function _startSessionRefresh() {
                    var _this5 = this;

                    minilog('secucard.stomp').debug('Stomp session refresh loop started');

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
                };

                Stomp.prototype._runSessionRefresh = function _runSessionRefresh(initial) {
                    var _this6 = this;

                    var createRefreshRequest = function createRefreshRequest() {

                        return _this6.request(Channel.METHOD.EXECUTE, {
                            endpoint: ['auth', 'sessions'],
                            objectId: 'me',
                            action: 'refresh'
                        }).then(function (res) {

                            _this6.emit('sessionRefresh');
                            minilog('secucard.stomp').debug('Session refresh sent');
                            _this6.skipSessionRefresh = false;
                            return res;
                        })['catch'](function (err) {

                            _this6.emit('sessionRefreshError');
                            minilog('secucard.stomp').error('Session refresh failed');
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
                };

                Stomp.prototype._handleStompMessage = function _handleStompMessage(frame) {
                    this.skipSessionRefresh = true;

                    minilog('secucard.stomp').debug('_handleStompMessage', frame);

                    var body = undefined;

                    if (frame && frame.headers && frame.headers['correlation-id']) {

                        var correlationId = frame.headers['correlation-id'];
                        body = JSON.parse(frame.body[0]);

                        if (body.status == 'ok') {
                            this.messages[correlationId].resolve(body.data);
                        } else {
                            var error = SecucardConnectException.create(body);
                            this.messages[correlationId].reject(error);
                        }

                        delete this.messages[correlationId];
                    } else if (frame) {

                        body = JSON.parse(frame.body[0]);
                        this.emitServiceEvent(null, body.target, body.type, body.data);
                    }
                };

                Stomp.prototype.createCorrelationId = function createCorrelationId() {
                    return UUID.v1();
                };

                return Stomp;
            })();

            _export('Stomp', Stomp);
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L3N0b21wLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozt3R0FvQkksS0FBSyxFQWNJLEtBQUs7Ozs7Ozs7Ozs7OzsrQkFuQlYsT0FBTzs7d0NBQ1AsS0FBSzs7a0RBQ0wsd0JBQXdCOzsyREFDeEIsNkJBQTZCOzs7QUFFakMsaUJBQUssR0FBRyxFQUFFOztBQUNkLGlCQUFLLENBQUMsY0FBYyxHQUFHLFVBQUMsV0FBVyxFQUFLO0FBQ3BDLHVCQUFPLEVBQUUsV0FBVyxJQUFJLElBQUksSUFBSSxXQUFXLElBQUksU0FBUyxDQUFBLEFBQUMsQ0FBQzthQUM3RCxDQUFDOztBQUVGLGlCQUFLLENBQUMsVUFBVSxHQUFHLFVBQUMsR0FBRyxFQUFLO0FBQ3hCLG9CQUFJLElBQUksR0FBRyxDQUFDLENBQUM7QUFDYixvQkFBSSxHQUFHLEVBQUU7QUFFTCx3QkFBSSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDO2lCQUNoRDtBQUNELHVCQUFPLElBQUksQ0FBQzthQUNmLENBQUM7O0FBRVcsaUJBQUs7QUFFSCx5QkFGRixLQUFLLENBRUYsVUFBVSxFQUFFOzBDQUZmLEtBQUs7O0FBSVYsMEJBQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7QUFFbEMsd0JBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO0FBQ3ZCLHdCQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQzs7QUFHbkIsd0JBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7QUFDaEMsd0JBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDOztBQUd6Qix3QkFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQzs7QUFFL0Isd0JBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO0FBQ3hCLHdCQUFJLENBQUMsYUFBYSxDQUFDLE9B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LENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7eUJBQzlDOztBQUVELCtCQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7cUJBRXZDLE1BQU0sSUFBSSxLQUFLLEVBQUU7O0FBRWQsNEJBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNqQyw0QkFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3FCQUVsRTtpQkFFSjs7QUFuYlEscUJBQUssV0FxYmQsbUJBQW1CLEdBQUEsK0JBQUc7QUFDbEIsMkJBQU8sSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO2lCQUNwQjs7dUJBdmJRLEtBQUsiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9uZXQvc3RvbXAuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9