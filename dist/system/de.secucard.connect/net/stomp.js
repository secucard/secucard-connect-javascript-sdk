System.register(['uuid', 'qs', 'eventemitter3', 'minilog', './channel', './stomp-impl/stomp', './exception', '../auth/exception'], function (_export) {
	'use strict';

	var UUID, QS, EE, minilog, Channel, StompImpl, SecucardConnectException, AuthenticationFailedException, utils, Stomp;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	return {
		setters: [function (_uuid) {
			UUID = _uuid['default'];
		}, function (_qs) {
			QS = _qs['default'];
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

			utils.queryToString = function (queryObject) {
				return QS.stringify(queryObject);
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

					this.getToken = function () {
						return context.getAuth().getToken();
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
						message.query = utils.queryToString(params.queryParams);
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
							_this3._stompClearListeners();
							resolve(true);
						};

						_this3._stompOnError = function (message) {
							minilog('secucard.stomp').error('stomp error', message);
							_this3._stompClearListeners();
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

					return this.getToken().then(function (token) {

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L3N0b21wLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozt5R0FxQkksS0FBSyxFQWtCSSxLQUFLOzs7Ozs7Ozs7Ozs7OztzQkF2QlYsT0FBTzs7K0JBQ1AsS0FBSzs7eUNBQ0wsd0JBQXdCOztrREFDeEIsNkJBQTZCOzs7QUFFakMsUUFBSyxHQUFHLEVBQUU7O0FBQ2QsUUFBSyxDQUFDLGNBQWMsR0FBRyxVQUFDLFdBQVcsRUFBSztBQUNwQyxXQUFPLEVBQUUsV0FBVyxJQUFJLElBQUksSUFBSSxXQUFXLElBQUksU0FBUyxDQUFBLEFBQUMsQ0FBQztJQUM3RCxDQUFDOztBQUVGLFFBQUssQ0FBQyxhQUFhLEdBQUcsVUFBQyxXQUFXLEVBQUs7QUFDdEMsV0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7O0FBRUYsUUFBSyxDQUFDLFVBQVUsR0FBRyxVQUFDLEdBQUcsRUFBSztBQUMzQixRQUFJLElBQUksR0FBRyxDQUFDLENBQUM7QUFDYixRQUFHLEdBQUcsRUFBRTtBQUVQLFNBQUksR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQztLQUM3QztBQUNELFdBQU8sSUFBSSxDQUFDO0lBQ1osQ0FBQzs7QUFFVyxRQUFLO0FBRUwsYUFGQSxLQUFLLENBRUosVUFBVSxFQUFFOzJCQUZiLEtBQUs7O0FBSWhCLFdBQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7QUFFbEMsU0FBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7QUFDdkIsU0FBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7O0FBR25CLFNBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7QUFDaEMsU0FBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7O0FBR3pCLFNBQUksQ0FBQyxrQkFB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QUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQztNQUVqRCxNQUFNOztBQUVOLGFBQU8sb0JBQW9CLEVBQUUsQ0FBQztNQUU5QjtLQUVEOztBQW5aVyxTQUFLLFdBcVpqQixtQkFBbUIsR0FBQSw2QkFBQyxLQUFLLEVBQUU7QUFHMUIsU0FBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQzs7QUFFL0IsWUFBTyxDQUFDLGdCQUFnQixDQUFDLENBQUMsS0FBSyxDQUFDLHFCQUFxQixFQUFFLEtBQUssQ0FBQyxDQUFDOztBQUU5RCxTQUFJLElBQUksWUFBQSxDQUFDOztBQUVULFNBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxPQUFPLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFOztBQUU5RCxVQUFJLGFBQWEsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDcEQsVUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOztBQUVqQyxVQUFHLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxFQUFDO0FBQ3RCLFdBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztPQUNoRCxNQUFNO0FBQ04sV0FBSSxLQUFLLEdBQUcsd0JBQXdCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2xELFdBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO09BQzNDOztBQUVELGFBQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztNQUVwQyxNQUFNLElBQUcsS0FBSyxFQUFDOztBQUVmLFVBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNqQyxVQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7TUFFL0Q7S0FFRDs7QUFuYlcsU0FBSyxXQXFiakIsbUJBQW1CLEdBQUEsK0JBQUc7QUFDckIsWUFBTyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7S0FDakI7O1dBdmJXLEtBQUs7OztvQkFBTCxLQUFLIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L3N0b21wLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==