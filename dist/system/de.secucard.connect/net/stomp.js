System.register(['uuid', 'qs', 'eventemitter3', './channel', './stomp-impl/stomp'], function (_export) {
	'use strict';

	var UUID, QS, EE, Channel, StompImpl, utils, Stomp;

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

					clearInterval(this.sessionTimer);
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
							_this2.connection.removeListener('connected', _this2._stompOnDisconnected);
							delete _this2._stompOnDisconnected;
							resolve();
						};

						_this2.connection.on('disconnected', _this2._stompOnDisconnected);
					});
				};

				Stomp.prototype.request = function request(method, params) {

					var destination = this.buildDestination(method, params);
					var message = this.createMessage(params);
					return this._sendMessage(destination, message);
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
							resolve();
						};

						_this3._stompOnError = function (body) {
							console.log('stomp error', body);
							_this3._stompClearListeners();
							reject(body);
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

						if (!_this4.connection.isConnected() || token && token.access_token != _this4.connectAccessToken) {

							if (_this4.connection.isConnected()) {
								console.log('Reconnect due token change.');
							}

							return _this4._disconnect().then(function () {

								return _this4._connect(accessToken).then(sendWithStomp);
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

					return this.request(Channel.METHOD.EXECUTE, {
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
							var error = new Error('Api request error');
							error.data = body;
							this.messages[correlationId].reject(error);
						}

						delete this.messages[correlationId];
					} else if (frame) {

						body = JSON.parse(frame.body[0]);
						this.emitServiceEvent(body.target, body.type, body.data);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L3N0b21wLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozt1Q0FPSSxLQUFLLEVBa0JJLEtBQUs7Ozs7Ozs7Ozs7OztzQkFyQlYsT0FBTzs7K0JBQ1AsS0FBSzs7O0FBRVQsUUFBSyxHQUFHLEVBQUU7O0FBQ2QsUUFBSyxDQUFDLGNBQWMsR0FBRyxVQUFDLFdBQVcsRUFBSztBQUNwQyxXQUFPLEVBQUUsV0FBVyxJQUFJLElBQUksSUFBSSxXQUFXLElBQUksU0FBUyxDQUFBLEFBQUMsQ0FBQztJQUM3RCxDQUFDOztBQUVGLFFBQUssQ0FBQyxhQUFhLEdBQUcsVUFBQyxXQUFXLEVBQUs7QUFDdEMsV0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7O0FBRUYsUUFBSyxDQUFDLFVBQVUsR0FBRyxVQUFDLEdBQUcsRUFBSztBQUMzQixRQUFJLElBQUksR0FBRyxDQUFDLENBQUM7QUFDYixRQUFHLEdBQUcsRUFBRTtBQUVQLFNBQUksR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQztLQUM3QztBQUNELFdBQU8sSUFBSSxDQUFDO0lBQ1osQ0FBQzs7QUFFVyxRQUFLO0FBRUwsYUFGQSxLQUFLLENBRUosVUFBVSxFQUFFOzJCQUZiLEtBQUs7O0FBSWhCLFdBQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7QUFFbEMsU0FBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7QUFDdkIsU0FBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7O0FBR25CLFNBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7QUFDaEMsU0FBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7O0FBR3pCLFNBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7O0FBRS9CLFNBQUksQ0FB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O01BRUQsQ0FBQyxDQUFDO0tBRUg7O0FBeldXLFNBQUssV0EyV2pCLG1CQUFtQixHQUFBLDZCQUFDLEtBQUssRUFBRTtBQUcxQixTQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDOztBQUUvQixZQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQzFDLFNBQUksSUFBSSxZQUFBLENBQUM7O0FBRVQsU0FBSSxLQUFLLElBQUksS0FBSyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEVBQUU7O0FBRTlELFVBQUksYUFBYSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUNwRCxVQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7O0FBRWpDLFVBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLEVBQUM7QUFDdEIsV0FBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO09BQ2hELE1BQU07QUFDTixXQUFJLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBQzNDLFlBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2xCLFdBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO09BQzNDOztBQUVELGFBQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztNQUVwQyxNQUFNLElBQUcsS0FBSyxFQUFDOztBQUVmLFVBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNqQyxVQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztNQUV6RDtLQUVEOztBQXpZVyxTQUFLLFdBMllqQixtQkFBbUIsR0FBQSwrQkFBRztBQUNyQixZQUFPLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztLQUNqQjs7V0E3WVcsS0FBSzs7O29CQUFMLEtBQUsiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9uZXQvc3RvbXAuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9