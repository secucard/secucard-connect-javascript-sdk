System.register(['uuid', 'qs', 'eventemitter3', './channel', './stomp-impl/stomp', './exception', '../auth/exception'], function (_export) {
	'use strict';

	var UUID, QS, EE, Channel, StompImpl, SecucardConnectException, AuthenticationFailedException, utils, Stomp;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	return {
		setters: [function (_uuid) {
			UUID = _uuid['default'];
		}, function (_qs) {
			QS = _qs['default'];
		}, function (_eventemitter3) {
			EE = _eventemitter3['default'];
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

					this.isDevice = function () {
						return context.getConfig().isDevice();
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

					console.log('stomp start connection');

					return this.getToken().then(function (token) {

						console.log('Got token', token);
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
								console.log('stomp disconnected');
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
							console.log('stomp connected');
							_this3._stompClearListeners();
							resolve(true);
						};

						_this3._stompOnError = function (message) {
							console.log('stomp error', message);
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

					console.log('_sendMessage', destinationObj, message);

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
								console.log('Reconnect due token change.');
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

					console.log('Stomp session refresh loop started');
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
							console.log('Session refresh sent');
							_this6.skipSessionRefresh = false;
							return res;
						})['catch'](function (err) {

							_this6.emit('sessionRefreshError');
							console.log('Session refresh failed');
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

					console.log('_handleStompMessage', frame);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L3N0b21wLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztnR0FvQkksS0FBSyxFQWtCSSxLQUFLOzs7Ozs7Ozs7Ozs7c0JBdkJWLE9BQU87OytCQUNQLEtBQUs7O3lDQUNMLHdCQUF3Qjs7a0RBQ3hCLDZCQUE2Qjs7O0FBRWpDLFFBQUssR0FBRyxFQUFFOztBQUNkLFFBQUssQ0FBQyxjQUFjLEdBQUcsVUFBQyxXQUFXLEVBQUs7QUFDcEMsV0FBTyxFQUFFLFdBQVcsSUFBSSxJQUFJLElBQUksV0FBVyxJQUFJLFNBQVMsQ0FBQSxBQUFDLENBQUM7SUFDN0QsQ0FBQzs7QUFFRixRQUFLLENBQUMsYUFBYSxHQUFHLFVBQUMsV0FBVyxFQUFLO0FBQ3RDLFdBQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNqQyxDQUFDOztBQUVGLFFBQUssQ0FBQyxVQUFVLEdBQUcsVUFBQyxHQUFHLEVBQUs7QUFDM0IsUUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDO0FBQ2IsUUFBRyxHQUFHLEVBQUU7QUFFUCxTQUFJLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUM7S0FDN0M7QUFDRCxXQUFPLElBQUksQ0FBQztJQUNaLENBQUM7O0FBRVcsUUFBSztBQUVMLGFBRkEsS0FBSyxDQUVKLFVBQVUsRUFBRTsyQkFGYixLQUFLOztBQUloQixXQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7O0FBRWxDLFNBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO0FBQ3ZCLFNBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDOztBQUduQixTQUFJLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDO0FBQ2hDLFNBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDOztBQUd6QixTQUFJLENBQUMsa0JBQWtC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WlcsU0FBSyxXQXdaakIsbUJBQW1CLEdBQUEsNkJBQUMsS0FBSyxFQUFFO0FBRzFCLFNBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7O0FBRS9CLFlBQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDMUMsU0FBSSxJQUFJLFlBQUEsQ0FBQzs7QUFFVCxTQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsT0FBTyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsRUFBRTs7QUFFOUQsVUFBSSxhQUFhLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQ3BELFVBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFakMsVUFBRyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksRUFBQztBQUN0QixXQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7T0FDaEQsTUFBTTtBQUNOLFdBQUksS0FBSyxHQUFHLHdCQUF3QixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNsRCxXQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztPQUMzQzs7QUFFRCxhQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7TUFFcEMsTUFBTSxJQUFHLEtBQUssRUFBQzs7QUFFZixVQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDakMsVUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO01BRS9EO0tBRUQ7O0FBcmJXLFNBQUssV0F1YmpCLG1CQUFtQixHQUFBLCtCQUFHO0FBQ3JCLFlBQU8sSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO0tBQ2pCOztXQXpiVyxLQUFLOzs7b0JBQUwsS0FBSyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L25ldC9zdG9tcC5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=