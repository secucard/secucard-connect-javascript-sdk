System.register(['babel-runtime/helpers/class-call-check', 'babel-runtime/core-js/object/assign', 'babel-runtime/core-js/promise', 'uuid', 'qs', 'eventemitter3', './channel', './stomp-impl/stomp'], function (_export) {
	var _classCallCheck, _Object$assign, _Promise, UUID, QS, EE, Channel, StompImpl, utils, Stomp;

	return {
		setters: [function (_babelRuntimeHelpersClassCallCheck) {
			_classCallCheck = _babelRuntimeHelpersClassCallCheck['default'];
		}, function (_babelRuntimeCoreJsObjectAssign) {
			_Object$assign = _babelRuntimeCoreJsObjectAssign['default'];
		}, function (_babelRuntimeCoreJsPromise) {
			_Promise = _babelRuntimeCoreJsPromise['default'];
		}, function (_uuid) {
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
			'use strict';

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

					_Object$assign(this, EE.prototype);

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

					return new _Promise(function (resolve, reject) {

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

					return new _Promise(function (resolve, reject) {

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

							return new _Promise(function (resolve, reject) {

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L3N0b21wLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7a0ZBT0ksS0FBSyxFQWtCSSxLQUFLOzs7Ozs7Ozs7Ozs7Ozs7O3NCQXJCVixPQUFPOzsrQkFDUCxLQUFLOzs7OztBQUVULFFBQUssR0FBRyxFQUFFOztBQUNkLFFBQUssQ0FBQyxjQUFjLEdBQUcsVUFBQyxXQUFXLEVBQUs7QUFDcEMsV0FBTyxFQUFFLFdBQVcsSUFBSSxJQUFJLElBQUksV0FBVyxJQUFJLFNBQVMsQ0FBQSxBQUFDLENBQUM7SUFDN0QsQ0FBQzs7QUFFRixRQUFLLENBQUMsYUFBYSxHQUFHLFVBQUMsV0FBVyxFQUFLO0FBQ3RDLFdBQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNqQyxDQUFDOztBQUVGLFFBQUssQ0FBQyxVQUFVLEdBQUcsVUFBQyxHQUFHLEVBQUs7QUFDM0IsUUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDO0FBQ2IsUUFBRyxHQUFHLEVBQUU7QUFFUCxTQUFJLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUM7S0FDN0M7QUFDRCxXQUFPLElBQUksQ0FBQztJQUNaLENBQUM7O0FBRVcsUUFBSztBQUVMLGFBRkEsS0FBSyxDQUVKLFVBQVUsRUFBRTsyQkFGYixLQUFLOztBQUloQixvQkFBYyxJQUFJLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDOztBQUVsQyxTQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztBQUN2QixTQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQzs7QUFHbkIsU0FBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztBQUNoQyxTQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQzs7QUFHekIsU0FBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQzs7QUFFL0IsU0FBSSxDQUFDLGFBQWEsR0FB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TyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsRUFBRSxLQUFLLENBQUMsQ0FBQzs7QUFHeEMsU0FBSSxLQUFLLElBQUksS0FBSyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEVBQUU7O0FBRTlELFVBQUksYUFBYSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUNwRCxVQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFckMsVUFBRyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksRUFBQztBQUN0QixXQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7T0FDaEQsTUFBTTtBQUNOLFdBQUksS0FBSyxHQUFHLElBQUksS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFDM0MsWUFBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7QUFDbEIsV0FBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7T0FDM0M7O0FBRUQsYUFBTyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO01BRXBDLE1BQU0sSUFBRyxLQUFLLEVBQUMsRUFJZjtLQUVEOztBQXRZVyxTQUFLLFdBd1lqQixtQkFBbUIsR0FBQSwrQkFBRztBQUNyQixZQUFPLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztLQUNqQjs7V0ExWVcsS0FBSzs7O29CQUFMLEtBQUsiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9uZXQvc3RvbXAuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9