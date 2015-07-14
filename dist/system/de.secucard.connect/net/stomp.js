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
					this.connection.on('message', this._handleStompFrame.bind(this));
				}

				Stomp.prototype.configureWithContext = function configureWithContext(context) {

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

				Stomp.prototype._handleStompFrame = function _handleStompFrame(frame) {
					this.skipSessionRefresh = true;

					console.log('_handleStompFrame', frame);

					if (frame && frame.headers && frame.headers['correlation-id']) {

						var correlationId = frame.headers['correlation-id'];
						var body = JSON.parse(frame.body[0]);

						if (body.status == 'ok') {
							this.messages[correlationId].resolve(body.data);
						} else {
							var error = new Error('Api request error');
							error.data = body;
							this.messages[correlationId].reject(error);
						}

						delete this.messages[correlationId];
					} else if (frame) {}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L3N0b21wLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozt1Q0FPSSxLQUFLLEVBa0JJLEtBQUs7Ozs7Ozs7Ozs7OztzQkFyQlYsT0FBTzs7K0JBQ1AsS0FBSzs7O0FBRVQsUUFBSyxHQUFHLEVBQUU7O0FBQ2QsUUFBSyxDQUFDLGNBQWMsR0FBRyxVQUFDLFdBQVcsRUFBSztBQUNwQyxXQUFPLEVBQUUsV0FBVyxJQUFJLElBQUksSUFBSSxXQUFXLElBQUksU0FBUyxDQUFBLEFBQUMsQ0FBQztJQUM3RCxDQUFDOztBQUVGLFFBQUssQ0FBQyxhQUFhLEdBQUcsVUFBQyxXQUFXLEVBQUs7QUFDdEMsV0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7O0FBRUYsUUFBSyxDQUFDLFVBQVUsR0FBRyxVQUFDLEdBQUcsRUFBSztBQUMzQixRQUFJLElBQUksR0FBRyxDQUFDLENBQUM7QUFDYixRQUFHLEdBQUcsRUFBRTtBQUVQLFNBQUksR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQztLQUM3QztBQUNELFdBQU8sSUFBSSxDQUFDO0lBQ1osQ0FBQzs7QUFFVyxRQUFLO0FBRUwsYUFGQSxLQUFLLENBRUosVUFBVSxFQUFFOzJCQUZiLEtBQUs7O0FBSWhCLFdBQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7QUFFbEMsU0FBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7QUFDdkIsU0FBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7O0FBR25CLFNBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7QUFDaEMsU0FBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7O0FBR3pCLFNBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7O0FBRS9CLFNBQUksQ0FB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QUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7O0FBRS9CLFlBQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEVBQUUsS0FBSyxDQUFDLENBQUM7O0FBR3hDLFNBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxPQUFPLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFOztBQUU5RCxVQUFJLGFBQWEsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDcEQsVUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7O0FBRXJDLFVBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLEVBQUM7QUFDdEIsV0FBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO09BQ2hELE1BQU07QUFDTixXQUFJLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBQzNDLFlBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2xCLFdBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO09BQzNDOztBQUVELGFBQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztNQUVwQyxNQUFNLElBQUcsS0FBSyxFQUFDLEVBSWY7S0FFRDs7QUF0WVcsU0FBSyxXQXdZakIsbUJBQW1CLEdBQUEsK0JBQUc7QUFDckIsWUFBTyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUM7S0FDakI7O1dBMVlXLEtBQUs7OztvQkFBTCxLQUFLIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L3N0b21wLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==