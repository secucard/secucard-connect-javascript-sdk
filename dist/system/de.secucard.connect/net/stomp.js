System.register(['uuid', 'qs', 'eventemitter3', './channel'], function (_export) {
	'use strict';

	var UUID, QS, EE, Channel, utils, Stomp;

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
				function Stomp(StompImpl) {
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

					this.connection = new StompImpl();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L3N0b21wLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs0QkFNSSxLQUFLLEVBa0JJLEtBQUs7Ozs7Ozs7Ozs7OztzQkFwQlYsT0FBTzs7O0FBRVgsUUFBSyxHQUFHLEVBQUU7O0FBQ2QsUUFBSyxDQUFDLGNBQWMsR0FBRyxVQUFDLFdBQVcsRUFBSztBQUNwQyxXQUFPLEVBQUUsV0FBVyxJQUFJLElBQUksSUFBSSxXQUFXLElBQUksU0FBUyxDQUFBLEFBQUMsQ0FBQztJQUM3RCxDQUFDOztBQUVGLFFBQUssQ0FBQyxhQUFhLEdBQUcsVUFBQyxXQUFXLEVBQUs7QUFDdEMsV0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7O0FBRUYsUUFBSyxDQUFDLFVBQVUsR0FBRyxVQUFDLEdBQUcsRUFBSztBQUMzQixRQUFJLElBQUksR0FBRyxDQUFDLENBQUM7QUFDYixRQUFHLEdBQUcsRUFBRTtBQUVQLFNBQUksR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQztLQUM3QztBQUNELFdBQU8sSUFBSSxDQUFDO0lBQ1osQ0FBQzs7QUFFVyxRQUFLO0FBRUwsYUFGQSxLQUFLLENBRUosU0FBUyxFQUFFOzJCQUZaLEtBQUs7O0FBSWhCLFdBQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7QUFFbEMsU0FBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7QUFDdkIsU0FBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUM7O0FBR25CLFNBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7QUFDaEMsU0FBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7O0FBR3pCLFNBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7O0FBRS9CLFNBQUksQ0FBQyxhQUFhLEdBQUcs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LEVBQUU7O0FBRTlELFVBQUksYUFBYSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUNwRCxVQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFckMsVUFBRyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksRUFBQztBQUN0QixXQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7T0FDaEQsTUFBTTtBQUNOLFdBQUksS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFDM0MsWUFBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7QUFDbEIsV0FBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7T0FDM0M7O0FBRUQsYUFBTyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO01BRXBDLE1BQU0sSUFBRyxLQUFLLEVBQUMsRUFJZjtLQUVEOztBQWpZVyxTQUFLLFdBbVlqQixtQkFBbUIsR0FBQSwrQkFBRztBQUNyQixZQUFPLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztLQUNqQjs7V0FyWVcsS0FBSzs7O29CQUFMLEtBQUsiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9uZXQvc3RvbXAuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9