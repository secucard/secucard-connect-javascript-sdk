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
					var _this = this;

					return this.getToken().then(function (token) {

						if (token && token.refresh_token) {
							return _this._startSessionRefresh();
						} else if (token) {
							return _this._disconnect().then(function () {
								return _this._connect(token.access_token);
							});
						}
					});
				};

				Stomp.prototype.connect = function connect() {
					var _this2 = this;

					console.log('stomp start connection');

					return this.getToken().then(function (token) {

						console.log('Got token', token);
						return _this2._connect(token.access_token);
					});
				};

				Stomp.prototype.close = function close() {

					if (this.sessionTimer) {
						clearInterval(this.sessionTimer);
					}

					return this._disconnect();
				};

				Stomp.prototype._disconnect = function _disconnect() {
					var _this3 = this;

					return new Promise(function (resolve, reject) {

						if (!_this3.connection.isConnected()) {
							resolve();
							return;
						}

						if (_this3.connection && _this3.connection.disconnect) {
							_this3.connection.disconnect();
						}

						_this3._stompOnDisconnected = function () {
							console.log('stomp disconnected');
							_this3.connection.removeListener('connected', _this3._stompOnDisconnected);
							delete _this3._stompOnDisconnected;
							resolve();
						};

						_this3.connection.on('disconnected', _this3._stompOnDisconnected);
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
					var _this4 = this;

					this.connectAccessToken = accessToken;

					var stompCredentials = {
						login: accessToken,
						passcode: accessToken
					};

					this.connection.configure(this.getStompConfig());
					this.connection.connect(stompCredentials);

					return new Promise(function (resolve, reject) {

						_this4._stompOnConnected = function () {
							console.log('stomp connected');
							_this4._stompClearListeners();
							resolve(true);
						};

						_this4._stompOnError = function (message) {
							console.log('stomp error', message);
							_this4._stompClearListeners();
							if (message.headers && message.headers.message == 'Bad CONNECT') {
								reject(new AuthenticationFailedException(message.body[0]));
							} else {
								reject(message);
							}
						};

						_this4._stompClearListeners = function () {
							_this4.connection.removeListener('connected', _this4._stompOnConnected);
							_this4.connection.removeListener('error', _this4._stompOnError);
							delete _this4._stompOnConnected;
							delete _this4._stompOnError;
							delete _this4._stompClearListeners;
						};

						_this4.connection.on('connected', _this4._stompOnConnected);
						_this4.connection.on('error', _this4._stompOnError);
					});
				};

				Stomp.prototype._sendMessage = function _sendMessage(destinationObj, message) {
					var _this5 = this;

					console.log('_sendMessage', destinationObj, message);

					return this.getToken().then(function (token) {

						var accessToken = token.access_token;
						var correlationId = _this5.createCorrelationId();

						var headers = {};
						headers['reply-to'] = _this5.getStompQueue();
						headers['content-type'] = 'application/json';
						headers['user-id'] = accessToken;
						headers['correlation-id'] = correlationId;

						if (destinationObj.appId) {
							headers['app-id'] = destinationObj.appId;
						}

						var body = JSON.stringify(message);
						headers['content-length'] = utils.sizeOfUTF8(body);

						var destination = _this5.getStompDestination();
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

								_this5.messages[correlationId] = { resolve: resolve, reject: reject };
								_this5.connection.send(destination, headers, body);
							});
						};

						if (!_this5.connection.isConnected() || token && token.access_token != _this5.connectAccessToken) {

							if (_this5.connection.isConnected()) {
								console.log('Reconnect due token change.');
							}

							return _this5._disconnect().then(function () {

								return _this5._connect(accessToken).then(sendWithStomp);
							});
						}

						return sendWithStomp();
					});
				};

				Stomp.prototype._startSessionRefresh = function _startSessionRefresh() {
					var _this6 = this;

					console.log('Stomp session refresh loop started');
					var initial = true;

					var sessionInterval = this.getStompHeartbeatMs() > 0 ? this.getStompHeartbeatMs() - 500 : 25 * 1000;

					this.sessionTimer = setInterval(function () {

						if (_this6.skipSessionRefresh) {
							_this6.skipSessionRefresh = false;
						} else {
							_this6._runSessionRefresh(false);
						}
					}, sessionInterval);

					return this._runSessionRefresh(initial);
				};

				Stomp.prototype._runSessionRefresh = function _runSessionRefresh(initial) {
					var _this7 = this;

					return this.request(Channel.METHOD.EXECUTE, {
						endpoint: ['auth', 'sessions'],
						objectId: 'me',
						action: 'refresh'
					}).then(function (res) {

						_this7.emit('sessionRefresh');
						console.log('Session refresh sent');
						_this7.skipSessionRefresh = false;
						return res;
					})['catch'](function (err) {

						_this7.emit('sessionRefreshError');
						console.log('Session refresh failed');
						if (initial) {
							throw err;
						}
					});
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L3N0b21wLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztnR0FTSSxLQUFLLEVBa0JJLEtBQUs7Ozs7Ozs7Ozs7OztzQkF2QlYsT0FBTzs7K0JBQ1AsS0FBSzs7eUNBQ0wsd0JBQXdCOztrREFDeEIsNkJBQTZCOzs7QUFFakMsUUFBSyxHQUFHLEVBQUU7O0FBQ2QsUUFBSyxDQUFDLGNBQWMsR0FBRyxVQUFDLFdBQVcsRUFBSztBQUNwQyxXQUFPLEVBQUUsV0FBVyxJQUFJLElBQUksSUFBSSxXQUFXLElBQUksU0FBUyxDQUFBLEFBQUMsQ0FBQztJQUM3RCxDQUFDOztBQUVGLFFBQUssQ0FBQyxhQUFhLEdBQUcsVUFBQyxXQUFXLEVBQUs7QUFDdEMsV0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7O0FBRUYsUUFBSyxDQUFDLFVBQVUsR0FBRyxVQUFDLEdBQUcsRUFBSztBQUMzQixRQUFJLElBQUksR0FBRyxDQUFDLENBQUM7QUFDYixRQUFHLEdBQUcsRUFBRTtBQUVQLFNBQUksR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQztLQUM3QztBQUNELFdBQU8sSUFBSSxDQUFDO0lBQ1osQ0FBQzs7QUFFVyxRQUFLO0FBRUwsYUFGQSxLQUFLLENBRUosVUFBVSxFQUFFOzJCQUZiLEtBQUs7O0FBSWhCLFdBQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7QUFFbEMsU0FBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7QUFDdkIsU0FBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7O0FBR25CLFNBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7QUFDaEMsU0FBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7O0FBR3pCLFNBQUksQ0FBQyxrQkFBa0Is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LGdCQUFnQixDQUFDLEVBQUU7O0FBRTlELFVBQUksYUFBYSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUNwRCxVQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7O0FBRWpDLFVBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLEVBQUM7QUFDdEIsV0FBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO09BQ2hELE1BQU07QUFDTixXQUFJLEtBQUssR0FBRyx3QkFBd0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbEQsV0FBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7T0FDM0M7O0FBRUQsYUFBTyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO01BRXBDLE1BQU0sSUFBRyxLQUFLLEVBQUM7O0FBRWYsVUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2pDLFVBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztNQUUvRDtLQUVEOztBQTNaVyxTQUFLLFdBNlpqQixtQkFBbUIsR0FBQSwrQkFBRztBQUNyQixZQUFPLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztLQUNqQjs7V0EvWlcsS0FBSzs7O29CQUFMLEtBQUsiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9uZXQvc3RvbXAuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9