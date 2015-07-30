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

						if (!_this2.connection.isConnected()) {
							resolve();
							return;
						}

						if (_this2.connection && _this2.connection.disconnect) {
							_this2.connection.disconnect();
						}

						_this2._stompOnDisconnected = function () {
							console.log('stomp disconnected');
							_this2.connection.removeListener('disconnected', _this2._stompOnDisconnected);
							delete _this2._stompOnDisconnected;
							resolve();
						};

						_this2.connection.on('disconnected', _this2._stompOnDisconnected);
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
							if (message.headers && message.headers.message == 'Bad CONNECT') {
								reject(new AuthenticationFailedException(message.body[0]));
							} else {
								reject(message);
							}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L3N0b21wLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztnR0FTSSxLQUFLLEVBa0JJLEtBQUs7Ozs7Ozs7Ozs7OztzQkF2QlYsT0FBTzs7K0JBQ1AsS0FBSzs7eUNBQ0wsd0JBQXdCOztrREFDeEIsNkJBQTZCOzs7QUFFakMsUUFBSyxHQUFHLEVBQUU7O0FBQ2QsUUFBSyxDQUFDLGNBQWMsR0FBRyxVQUFDLFdBQVcsRUFBSztBQUNwQyxXQUFPLEVBQUUsV0FBVyxJQUFJLElBQUksSUFBSSxXQUFXLElBQUksU0FBUyxDQUFBLEFBQUMsQ0FBQztJQUM3RCxDQUFDOztBQUVGLFFBQUssQ0FBQyxhQUFhLEdBQUcsVUFBQyxXQUFXLEVBQUs7QUFDdEMsV0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7O0FBRUYsUUFBSyxDQUFDLFVBQVUsR0FBRyxVQUFDLEdBQUcsRUFBSztBQUMzQixRQUFJLElBQUksR0FBRyxDQUFDLENBQUM7QUFDYixRQUFHLEdBQUcsRUFBRTtBQUVQLFNBQUksR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQztLQUM3QztBQUNELFdBQU8sSUFBSSxDQUFDO0lBQ1osQ0FBQzs7QUFFVyxRQUFLO0FBRUwsYUFGQSxLQUFLLENBRUosVUFBVSxFQUFFOzJCQUZiLEtBQUs7O0FBSWhCLFdBQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7QUFFbEMsU0FBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7QUFDdkIsU0FBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7O0FBR25CLFNBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7QUFDaEMsU0FBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7O0FBR3pCLFNBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7O0FBRS9CLFNBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO0FBQ3hCLFNBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7QUFDL0MsU0FBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEtBQUssQ0FBQztBQUNsRCxTQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsTUFBTSxDQUFDO0FBQ3BELFNBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxRQUFRLENBQUM7QUFDckQsU0FBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQzs7QUFFckQsU0FBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUM1QyxTQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0tBQ25FOztBQXpCVyxTQUFLLFdBMkJqQixvQkFBb0IsR0FBQSw4QkFBQyxPQUFPLEVBQUU7O0FBRTdCLFNBQUksQ0FBQyxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDOztBQUUvRCxTQUFJLENBQUMsUUFBUSxHQUFHLFlBQU07QUFDckIsYUFBTyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7TUFDcEMsQ0FBQzs7QUFFRixTQUFJLENBQUMsWUFBWSxHQUFHLFlBQU07QUFDekIsYUFBTyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7TUFDMUMsQ0FBQzs7QUFFRixTQUFJLENBQUMsWUFBWSxHQUFHLFlBQU07QUFDekIsYUFBTyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7TUFDMUMsQ0FBQzs7QUFFRixTQUFJLENBQUMsa0JBQWtCLEdBQUcsWUFBTTtBQUMvQixhQUFPLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO01BQ2hELENBQUM7O0FBRUYsU0FBSSxDQUFDLGFBQWEsR0FBRyxZQUFNO0FBQzFCLGFBQU8sT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUFDO01BQzNDLENBQUM7O0FBRUYsU0FBSSxDQUFDLGFBQWEsR0FBRyxZQUFNO0FBQzFCLGFBQU8sT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDLGFBQWEsRUFBRSxDQUFDO01BQzNDLENBQUM7O0FBRUYsU0FBSSxDQUFDLG1CQUFtQixHQUFHLFlBQU07QUFDaEMsYUFBTyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztNQUNqRCxDQUFDOztBQUVGLFNBQUksQ0FBQyxnQkFBZ0IsR0FBRyxZQUFNO0FBQzdCLGFBQU8sT0FBTyxDQUFDLFNBQVMsRUFBRSxDQUFDLGdCQUFnQixFQUFFLENBQUM7TUFDOUMsQ0FBQzs7QUFFRixTQUFJLENBQUMsUUFBUSxHQUFHLFlBQU07QUFDckIsYUFBTyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUM7TUFDdEMsQ0FBQzs7QUFFRixTQUFJLENBQUMsbUJBQW1CLEdBQUcsWUFBTTtBQUNoQyxhQUFPLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO01BQ2pELENBQUE7S0FFRDs7QUF2RVcsU0FBSyxXQXlFakIsY0FBYyxHQUFBLDBCQUFHOztBQUVoQixZQUFPOztBQUVOLFVBQUksRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFO0FBQ3pCLFVBQUksRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFO0FBQ3pCLFNBQUcsRUFBRSxJQUFJLENBQUMsa0JBQWtCLEVBQUU7QUFDOUIsV0FBSyxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUU7QUFDM0IsaUJBQVcsRUFBRSxJQUFJLENBQUMsbUJBQW1CLEVBQUU7QUFDdkMsY0FBUSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtBQUNqQyxXQUFLLEVBQUUsRUFBRTtBQUNULGNBQVEsRUFBRSxFQUFFO01BQ1osQ0FBQTtLQUVEOztBQXZGVyxTQUFLLFdBeUZqQixJQUFJLEdBQUEsZ0JBQUc7O0FBRU4sWUFBTyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztLQUVuQzs7QUE3RlcsU0FBSyxXQStGakIsT0FBTyxHQUFDLG1CQUFHOzs7QUFFVixZQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLENBQUM7O0FBRXRDLFlBQU8sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFDLEtBQUssRUFBSzs7QUFFdEMsYUFBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDaEMsYUFBTyxNQUFLLFFBQVEsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7TUFHekMsQ0FBQyxDQUFDO0tBQ0g7O0FBMUdXLFNBQUssV0E0R2pCLEtBQUssR0FBQyxpQkFBRzs7QUFFUixTQUFHLElBQUksQ0FBQyxZQUFZLEVBQUM7QUFDcEIsbUJBQWEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7TUFDakM7O0FBRUQsWUFBTyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7S0FFMUI7O0FBcEhXLFNBQUssV0FzSGpCLFdBQVcsR0FBQSx1QkFBRzs7O0FBRWIsWUFBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUs7O0FBRXZDLFVBQUcsQ0FBQyxPQUFLLFVBQVUsQ0FBQyxXQUFXLEVBQUUsRUFBRTtBQUNsQyxjQUFPLEVBQUUsQ0FBQztBQUNWLGNBQU87T0FDUDs7QUFFRCxVQUFJLE9BQUssVUFBVSxJQUFJLE9BQUssVUFBVSxDQUFDLFVBQVUsRUFBRTtBQUNsRCxjQUFLLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztPQUM3Qjs7QUFFRCxhQUFLLG9CQUFvQixHQUFHLFlBQU07QUFDakMsY0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBQ2xDLGNBQUssVUFBVSxDQUFDLGNBQWMsQ0FBQyxjQUFjLEVBQUUsT0FBSyxvQkFBb0IsQ0FBQyxDQUFDO0FBQzFFLGNBQU8sT0FBSyxvQkFBb0IsQ0FBQztBQUNqQyxjQUFPLEVBQUUsQ0FBQztPQUNWLENBQUM7O0FBR0YsYUFBSyxVQUFVLENBQUMsRUFBRSxDQUFDLGNBQWMsRUFBRSxPQUFLLG9CQUFvQixDQUFDLENBQUM7TUFFOUQsQ0FBQyxDQUFDO0tBRUg7O0FBL0lXLFNBQUssV0FpSmpCLE9BQU8sR0FBQSxpQkFBQyxNQUFNLEVBQUUsTUFBTSxFQUFFOztBQUV2QixTQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ3hELFNBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDekMsWUFBTyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUMsU0FBTSxDQUFDLFVBQUMsR0FBRyxFQUFLO0FBQzdELFNBQUcsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUM7QUFDL0QsWUFBTSxHQUFHLENBQUM7TUFDVixDQUFDLENBQUM7S0FFSDs7QUExSlcsU0FBSyxXQTRKakIsZ0JBQWdCLEdBQUEsMEJBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRTs7QUFFaEMsU0FBSSxXQUFXLEdBQUcsRUFBRSxDQUFDOztBQUVyQixTQUFHLE1BQU0sQ0FBQyxRQUFRLElBQUksSUFBSSxFQUFFO0FBQzNCLGlCQUFXLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7TUFDdkMsTUFBTSxJQUFHLE1BQU0sQ0FBQyxLQUFLLElBQUksSUFBSSxFQUFDO0FBQzlCLGlCQUFXLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7TUFDakMsTUFBTTtBQUNOLFlBQU0sSUFBSSxLQUFLLENBQUMsK0JBQStCLENBQUMsQ0FBQztNQUNqRDs7QUFFRCxnQkFBVyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDOztBQUVqRCxTQUFHLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRTtBQUN4QixZQUFNLElBQUksS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7TUFDdEM7O0FBRUQsZ0JBQVcsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQzs7QUFFbkMsWUFBTyxXQUFXLENBQUM7S0FDbkI7O0FBakxXLFNBQUssV0FtTGpCLGFBQWEsR0FBQSx1QkFBQyxNQUFNLEVBQUU7O0FBRXJCLFNBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQzs7QUFFakIsU0FBRyxLQUFLLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBQztBQUN4QyxhQUFPLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7TUFDOUI7O0FBRUQsU0FBRyxLQUFLLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBQztBQUN6QyxhQUFPLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUM7TUFDL0I7O0FBRUQsU0FBRyxLQUFLLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBQztBQUMzQyxhQUFPLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO01BQ3hEOztBQUVELFNBQUcsS0FBSyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUM7QUFDcEMsYUFBTyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO01BQzNCOztBQUVELFlBQU8sT0FBTyxDQUFDO0tBRWY7O0FBek1XLFNBQUssV0EyTWpCLFFBQVEsR0FBQSxrQkFBQyxXQUFXLEVBQUU7OztBQUVyQixTQUFJLENBQUMsa0JBQWtCLEdBQUcsV0FBVyxDQUFDOztBQUV0QyxTQUFJLGdCQUFnQixHQUFHO0FBQ3RCLFdBQUssRUFBRSxXQUFXO0FBQ2xCLGNBQVEsRUFBRSxXQUFXO01BQ3JCLENBQUM7O0FBRUYsU0FBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7QUFDakQsU0FBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzs7QUFFMUMsWUFBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUs7O0FBRXZDLGFBQUssaUJBQWlCLEdBQUcsWUFBTTtBQUM5QixjQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFDL0IsY0FBSyxvQkFBb0IsRUFBRSxDQUFDO0FBQzVCLGNBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztPQUNkLENBQUM7O0FBRUYsYUFBSyxhQUFhLEdBQUcsVUFBQyxPQUFPLEVBQUs7QUFDakMsY0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDcEMsY0FBSyxvQkFBb0IsRUFBRSxDQUFDO0FBQzVCLFdBQUcsT0FBTyxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLE9BQU8sSUFBSSxhQUFhLEVBQUU7QUFDL0QsY0FBTSxDQUFDLElBQUksNkJBQTZCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0QsTUFBTTtBQUNOLGNBQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNoQjtPQUNELENBQUM7O0FBRUYsYUFBSyxvQkFBb0IsR0FBRyxZQUFNO0FBQ2pDLGNBQUssVUFBVSxDQUFDLGNBQWMsQ0FBQyxXQUFXLEVBQUUsT0FBSyxpQkFBaUIsQ0FBQyxDQUFDO0FBQ3BFLGNBQUssVUFBVSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsT0FBSyxhQUFhLENBQUMsQ0FBQztBQUM1RCxjQUFPLE9BQUssaUJBQWlCLENBQUM7QUFDOUIsY0FBTyxPQUFLLGFBQWEsQ0FBQztBQUMxQixjQUFPLE9BQUssb0JBQW9CLENBQUM7T0FDakMsQ0FBQzs7QUFFRixhQUFLLFVBQVUsQ0FBQyxFQUFFLENBQUMsV0FBVyxFQUFFLE9BQUssaUJBQWlCLENBQUMsQ0FBQztBQUN4RCxhQUFLLFVBQVUsQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLE9BQUssYUFBYSxDQUFDLENBQUM7TUFHaEQsQ0FBQyxDQUFDO0tBR0g7O0FBeFBXLFNBQUssV0EwUGpCLFlBQVksR0FBQSxzQkFBQyxjQUFjLEVBQUUsT0FBTyxFQUFFOzs7QUFFckMsWUFBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsY0FBYyxFQUFFLE9BQU8sQ0FBQyxDQUFDOztBQUVyRCxZQUFPLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBQyxLQUFLLEVBQUs7O0FBRXRDLFVBQUksV0FBVyxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUM7QUFDckMsVUFBSSxhQUFhLEdBQUcsT0FBSyxtQkFBbUIsRUFBRSxDQUFDOztBQUUvQyxVQUFJLE9BQU8sR0FBRyxFQUFFLENBQUM7QUFDakIsYUFBTyxDQUFDLFVBQVUsQ0FBQyxHQUFHLE9BQUssYUFBYSxFQUFFLENBQUM7QUFDM0MsYUFBTyxDQUFDLGNBQWMsQ0FBQyxHQUFHLGtCQUFrQixDQUFDO0FBQzdDLGFBQU8sQ0FBQyxTQUFTLENBQUMsR0FBRyxXQUFXLENBQUM7QUFDakMsYUFBTyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsYUFBYSxDQUFDOztBQUUxQyxVQUFHLGNBQWMsQ0FBQyxLQUFLLEVBQUU7QUFDeEIsY0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUM7T0FDekM7O0FBRUQsVUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNuQyxhQUFPLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDOztBQUVuRCxVQUFJLFdBQVcsR0FBRyxPQUFLLG1CQUFtQixFQUFFLENBQUM7QUFDN0MsVUFBRyxjQUFjLENBQUMsS0FBSyxFQUFFOztBQUV4QixrQkFBVyxJQUFJLE1BQU0sR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDO09BRTlDLE1BQU07O0FBRU4sa0JBQVcsSUFBSSxNQUFNLEdBQUcsY0FBYyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7O0FBRXJELFdBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNsQixXQUFHLGNBQWMsQ0FBQyxRQUFRLEVBQUM7QUFDMUIsZ0JBQVEsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNwRDtBQUNELFdBQUcsY0FBYyxDQUFDLE1BQU0sRUFBRTtBQUN6QixnQkFBUSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDckM7O0FBRUQsa0JBQVcsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO09BRWxDOztBQUdELFVBQUksYUFBYSxHQUFHLFNBQWhCLGFBQWEsR0FBUzs7QUFFekIsY0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUs7O0FBRXZDLGVBQUssUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFDLENBQUM7QUFDbEUsZUFBSyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFFakQsQ0FBQyxDQUFDO09BRUgsQ0FBQzs7QUFFRixVQUFHLENBQUMsT0FBSyxVQUFVLENBQUMsV0FBVyxFQUFFLElBQUssV0FBVyxJQUFJLE9BQUssa0JBQWtCLEFBQUMsRUFBRTs7QUFFOUUsV0FBSSxPQUFLLFVBQVUsQ0FBQyxXQUFXLEVBQUUsRUFBRTtBQUNsQyxlQUFPLENBQUMsR0FBRyxDQUFDLDZCQUE2QixDQUFDLENBQUM7UUFDM0M7O0FBRUQsY0FBTyxPQUFLLFdBQVcsRUFBRSxDQUFDLElBQUksQ0FBQyxZQUFNO0FBR3BDLGVBQU8sT0FBSyxrQkFBa0IsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUVyRCxDQUFDLENBQUM7T0FFSDs7QUFFRCxhQUFPLGFBQWEsRUFBRSxDQUFDO01BRXZCLENBQUMsQ0FBQztLQUdIOztBQXJVVyxTQUFLLFdBdVVqQixvQkFBb0IsR0FBQSxnQ0FBRzs7O0FBRXRCLFlBQU8sQ0FBQyxHQUFHLENBQUMsb0NBQW9DLENBQUMsQ0FBQztBQUNsRCxTQUFJLE9BQU8sR0FBRyxJQUFJLENBQUM7O0FBR25CLFNBQUksZUFBZSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLENBQUMsR0FBRSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxHQUFDLElBQUksQ0FBQzs7QUFFakcsU0FBSSxDQUFDLFlBQVksR0FBRyxXQUFXLENBQUMsWUFBTTs7QUFFckMsVUFBRyxPQUFLLGtCQUFrQixFQUFDO0FBQzFCLGNBQUssa0JBQWtCLEdBQUcsS0FBSyxDQUFDO09BQ2hDLE1BQU07QUFDTixjQUFLLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO09BQy9CO01BRUQsRUFBRSxlQUFlLENBQUMsQ0FBQzs7QUFFcEIsWUFBTyxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7S0FFeEM7O0FBM1ZXLFNBQUssV0E2VmpCLGtCQUFrQixHQUFBLDRCQUFDLE9BQU8sRUFBRTs7O0FBRTNCLFNBQUksb0JBQW9CLEdBQUcsU0FBdkIsb0JBQW9CLEdBQVM7O0FBRWhDLGFBQU8sT0FBSyxPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUU7QUFDM0MsZUFBUSxFQUFFLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQztBQUM5QixlQUFRLEVBQUUsSUFBSTtBQUNkLGFBQU0sRUFBRSxTQUFTO09BQ2pCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxHQUFHLEVBQUs7O0FBRWhCLGNBQUssSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDNUIsY0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBQ3BDLGNBQUssa0JBQWtCLEdBQUcsS0FBSyxDQUFDO0FBQ2hDLGNBQU8sR0FBRyxDQUFDO09BRVgsQ0FBQyxTQUFNLENBQUMsVUFBQyxHQUFHLEVBQUs7O0FBRWpCLGNBQUssSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFDakMsY0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0FBQ3RDLFdBQUksT0FBTyxFQUFFO0FBQ1osY0FBTSxHQUFHLENBQUM7UUFDVjtPQUVELENBQUMsQ0FBQztNQUVILENBQUM7O0FBRUYsU0FBRyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLEVBQUU7O0FBRWxDLGFBQU8sSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO01BRWpELE1BQU07O0FBRU4sYUFBTyxvQkFBb0IsRUFBRSxDQUFDO01BRTlCO0tBRUQ7O0FBbFlXLFNBQUssV0FvWWpCLG1CQUFtQixHQUFBLDZCQUFDLEtBQUssRUFBRTtBQUcxQixTQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDOztBQUUvQixZQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQzFDLFNBQUksSUFBSSxZQUFBLENBQUM7O0FBRVQsU0FBSSxLQUFLLElBQUksS0FBSyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEVBQUU7O0FBRTlELFVBQUksYUFBYSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUNwRCxVQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7O0FBRWpDLFVBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLEVBQUM7QUFDdEIsV0FBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO09BQ2hELE1BQU07QUFDTixXQUFJLEtBQUssR0FBRyx3QkFBd0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbEQsV0FBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7T0FDM0M7O0FBRUQsYUFBTyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO01BRXBDLE1BQU0sSUFBRyxLQUFLLEVBQUM7O0FBRWYsVUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2pDLFVBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztNQUUvRDtLQUVEOztBQWphVyxTQUFLLFdBbWFqQixtQkFBbUIsR0FBQSwrQkFBRztBQUNyQixZQUFPLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztLQUNqQjs7V0FyYVcsS0FBSzs7O29CQUFMLEtBQUsiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9uZXQvc3RvbXAuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9