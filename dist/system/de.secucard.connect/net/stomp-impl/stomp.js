System.register(['babel-runtime/helpers/class-call-check', 'babel-runtime/core-js/object/assign', './frame', 'eventemitter3', 'uuid'], function (_export) {
	var _classCallCheck, _Object$assign, Frame, EE, UUID, utils, Stomp;

	return {
		setters: [function (_babelRuntimeHelpersClassCallCheck) {
			_classCallCheck = _babelRuntimeHelpersClassCallCheck['default'];
		}, function (_babelRuntimeCoreJsObjectAssign) {
			_Object$assign = _babelRuntimeCoreJsObjectAssign['default'];
		}, function (_frame2) {
			Frame = _frame2.Frame;
		}, function (_eventemitter3) {
			EE = _eventemitter3['default'];
		}, function (_uuid) {
			UUID = _uuid['default'];
		}],
		execute: function () {
			'use strict';

			utils = {};

			utils.really_defined = function (var_to_test) {
				return !(var_to_test == null || var_to_test == undefined);
			};

			Stomp = (function () {
				function Stomp(SocketImpl) {
					_classCallCheck(this, Stomp);

					_Object$assign(this, EE.prototype);

					this._subscribed_to = {};
					this.session = null;
					this.connected = false;
					this.SocketImpl = SocketImpl;
				}

				Stomp.prototype.isConnected = function isConnected() {
					return this.connected;
				};

				Stomp.prototype.configure = function configure(config) {

					this.port = config['port'] || 61613;
					this.host = config['host'] || '127.0.0.1';
					this.debug = config['debug'];
					this.login = config['login'] || null;
					this.passcode = config['passcode'] || null;

					this.ssl = config['ssl'] ? true : false;
					this.ssl_validate = config['ssl_validate'] ? true : false;
					this.ssl_options = config['ssl_options'] || {};
					this.vhost = config['vhost'];
					this.heartbeatMs = config['heartbeatMs'];
					this.endpoint = config['endpoint'] || '';

					this['client-id'] = config['client-id'] || null;
				};

				Stomp.prototype.connect = function connect(credentials) {
					this.login = credentials.login;
					this.passcode = credentials.passcode;
					this._connect(this);
				};

				Stomp.prototype.is_a_message = function is_a_message(this_frame) {
					return this_frame.headers !== null && utils.really_defined(this_frame.headers['message-id']);
				};

				Stomp.prototype.should_run_message_callback = function should_run_message_callback(this_frame) {};

				Stomp.prototype.handle_new_frame = function handle_new_frame(this_frame) {

					switch (this_frame.command) {
						case 'MESSAGE':
							if (this.is_a_message(this_frame)) {
								this.should_run_message_callback(this_frame);
								this.emit('message', this_frame);
							}
							break;
						case 'CONNECTED':
							console.log('Connected to STOMP');
							this.session = this_frame.headers['session'];
							this.connected = true;
							this.emit('connected');
							break;
						case 'RECEIPT':
							this.emit('receipt', this_frame.headers['receipt-id']);
							break;
						case 'ERROR':
							this.emit('error', this_frame);
							break;
						default:
							console.log('Could not parse command: ' + this_frame.command);
					}
				};

				Stomp.prototype.disconnect = function disconnect() {
					this._disconnect(this);
				};

				Stomp.prototype.subscribe = function subscribe(headers, callback) {

					var destination = headers['destination'];
					headers['session'] = this.session;
					this.send_command(this, 'SUBSCRIBE', headers);

					this._subscribed_to[destination] = { enabled: true, callback: callback };
					console.log('subscribed to: ' + destination + ' with headers ', headers);
				};

				Stomp.prototype.unsubscribe = function unsubscribe(headers) {
					var destination = headers['destination'];
					headers['session'] = this.session;
					this.send_command(this, 'UNSUBSCRIBE', headers);
					this._subscribed_to[destination].enabled = false;
					console.log('no longer subscribed to: ' + destination);
				};

				Stomp.prototype.ack = function ack(message_id) {
					this.send_command(this, 'ACK', { 'message-id': message_id });
					console.log('acknowledged message: ' + message_id);
				};

				Stomp.prototype.begin = function begin() {
					var transaction_id = Math.floor(Math.random() * 99999999999).toString();
					this.send_command(this, 'BEGIN', { 'transaction': transaction_id });
					console.log('begin transaction: ' + transaction_id);
					return transaction_id;
				};

				Stomp.prototype.commit = function commit(transaction_id) {
					this.send_command(this, 'COMMIT', { 'transaction': transaction_id });
					console.log('commit transaction: ' + transaction_id);
				};

				Stomp.prototype.abort = function abort(transaction_id) {
					this.send_command(this, 'ABORT', { 'transaction': transaction_id });
					console.log('abort transaction: ' + transaction_id);
				};

				Stomp.prototype.send = function send(destination, headers, body, withReceipt) {
					headers['session'] = this.session;
					headers['destination'] = destination;
					console.log('STOMP :: ', headers, body);
					return this.send_command(this, 'SEND', headers, body, withReceipt);
				};

				Stomp.prototype.parse_command = function parse_command(data) {
					var command,
					    this_string = data.toString('utf8', 0, data.length);
					command = this_string.split('\n');
					return command[0];
				};

				Stomp.prototype.parse_headers = function parse_headers(raw_headers) {
					var headers = {},
					    headers_split = raw_headers.split('\n');

					for (var i = 0; i < headers_split.length; i++) {
						var header = headers_split[i].split(':');
						if (header.length > 1) {
							var header_key = header.shift().trim();
							var header_val = header.join(':').trim();
							headers[header_key] = header_val;
							continue;
						}
						headers[header[0].trim()] = header[1].trim();
					}
					return headers;
				};

				Stomp.prototype.parse_frame = function parse_frame(chunk) {
					var args = {},
					    data = null,
					    command = null,
					    headers = null,
					    body = null,
					    headers_str = null;

					if (!utils.really_defined(chunk)) {
						return null;
					}

					command = this.parse_command(chunk);
					data = chunk.slice(command.length + 1, chunk.length);
					data = data.toString('utf8', 0, data.length);

					var the_rest = data.split('\n\n');
					headers = this.parse_headers(the_rest[0]);
					body = the_rest.slice(1, the_rest.length);

					if ('content-length' in headers) {
						headers['bytes_message'] = true;
					}

					args = {
						command: command,
						headers: headers,
						body: body
					};

					var this_frame = new Frame();
					var return_frame = this_frame.build_frame(args);

					return return_frame;
				};

				Stomp.prototype._connect = function _connect(stomp) {
					var _this = this;

					var onInit = function onInit(socket, handleConnected) {

						stomp.socket = socket;
						_this._setupListeners(stomp, handleConnected);
					};

					var onError = function onError(err) {
						stomp.emit('connectionError', err);
					};

					stomp.SocketImpl.connect(stomp.host, stomp.port, stomp.endpoint, stomp.ssl, stomp.ssl_options, stomp.ssl_validate, onInit, onError);
				};

				Stomp.prototype._setupListeners = function _setupListeners(stomp, handleConnected) {
					var _this2 = this;

					var _connected = function _connected() {
						console.log('Connected to socket');
						var headers = {};

						if (utils.really_defined(stomp.login) && utils.really_defined(stomp.passcode)) {
							headers.login = stomp.login;
							headers.passcode = stomp.passcode;
						}

						if (utils.really_defined(stomp['client-id'])) {
							headers['client-id'] = stomp['client-id'];
						}
						if (utils.really_defined(stomp['vhost'])) {
							headers['host'] = stomp['vhost'];
						}

						_this2.stomp_connect(stomp, headers);
					};

					var socket = stomp.socket;

					socket.on('drain', function (data) {
						console.log('draining');
					});

					var buffer = '';

					socket.on('data', function (chunk) {

						console.log('onData', chunk);

						buffer += chunk;
						var frames = buffer.split('\u0000\n');

						if (frames.length == 1) {
							frames = buffer.split('\u0000');
						}

						if (frames.length == 1) return;
						buffer = frames.pop();

						var parsed_frame = null;
						var _frame = null;
						while (_frame = frames.shift()) {
							parsed_frame = _this2.parse_frame(_frame);
							stomp.handle_new_frame(parsed_frame);
						}
					});

					socket.on('end', function () {
						console.log('end');
					});

					socket.on('close', function (error) {
						console.log('disconnected');
						if (error) {
							console.log('Disconnected with error: ' + error);
						}
						stomp.connected = false;
						stomp.emit('disconnected', error);
					});

					if (handleConnected) {
						_connected();
					} else {
						socket.on('connect', _connected);
					}
				};

				Stomp.prototype.stomp_connect = function stomp_connect(stomp, headers) {

					var _frame = new Frame(),
					    args = {},
					    headers = headers || {};

					if (this.heartbeatMs > 0) {
						headers['heart-beat'] = this.heartbeatMs + ',0';
					}

					args['command'] = 'CONNECT';
					args['headers'] = headers;

					var frame_to_send = _frame.build_frame(args);
					this.send_frame(stomp, frame_to_send);
				};

				Stomp.prototype._disconnect = function _disconnect(stomp) {

					stomp.SocketImpl.disconnect(stomp.socket);
				};

				Stomp.prototype.send_command = function send_command(stomp, command, headers, body, withReceipt) {

					var withReceipt = withReceipt || false;

					if (!utils.really_defined(headers)) {
						headers = {};
					}

					if (withReceipt) {
						headers['receipt'] = this.createReceiptId();
					}

					var args = {
						'command': command,
						'headers': headers,
						'body': body
					};

					var _frame = new Frame();
					var this_frame = _frame.build_frame(args);
					this.send_frame(stomp, this_frame);
					return this_frame;
				};

				Stomp.prototype.send_frame = function send_frame(stomp, _frame) {

					var socket = stomp.socket;
					var frame_str = _frame.as_string();

					console.log('socket.write', frame_str);

					if (socket.write(frame_str) === false) {
						console.log('Write buffered');
					}

					return true;
				};

				Stomp.prototype.createReceiptId = function createReceiptId() {

					return 'rcpt-' + UUID.v1();
				};

				return Stomp;
			})();

			_export('Stomp', Stomp);
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L3N0b21wLWltcGwvc3RvbXAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijt1REFJSSxLQUFLLEVBS0ksS0FBSzs7Ozs7Ozs7bUJBVFYsS0FBSzs7Ozs7Ozs7O0FBSVQsUUFBSyxHQUFHLEVBQUU7O0FBQ2QsUUFBSyxDQUFDLGNBQWMsR0FBRyxVQUFDLFdBQVcsRUFBSztBQUNwQyxXQUFPLEVBQUUsV0FBVyxJQUFJLElBQUksSUFBSSxXQUFXLElBQUksU0FBUyxDQUFBLEFBQUMsQ0FBQztJQUM3RCxDQUFDOztBQUVXLFFBQUs7QUFFTixhQUZDLEtBQUssQ0FFTCxVQUFVLEVBQUU7MkJBRlosS0FBSzs7QUFJaEIsb0JBQWMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7QUFFbEMsU0FBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7QUFDekIsU0FBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7QUFDcEIsU0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7QUFDdkIsU0FBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7S0FFN0I7O0FBWFcsU0FBSyxXQWFqQixXQUFXLEdBQUEsdUJBQUU7QUFDWixZQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7S0FDdEI7O0FBZlcsU0FBSyxXQWlCakIsU0FBUyxHQUFBLG1CQUFDLE1BQU0sRUFBRTs7QUFFakIsU0FBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDO0FBQ3BDLFNBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLFdBQVcsQ0FBQztBQUMxQyxTQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM3QixTQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLENBQUM7QUFDckMsU0FBSSxDQUFDLFFBQVEs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QUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO0FBQzFCLFNBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQzs7QUFFbkMsWUFBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsU0FBUyxDQUFDLENBQUM7O0FBRXZDLFNBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxLQUFLLEVBQUU7QUFDdEMsYUFBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO01BQzlCOztBQUVELFlBQU8sSUFBSSxDQUFDO0tBQ1o7O0FBN1dXLFNBQUssV0ErV2pCLGVBQWUsR0FBQSwyQkFBRzs7QUFFakIsWUFBTyxPQUFPLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO0tBRTNCOztXQW5YVyxLQUFLOzs7b0JBQUwsS0FBSyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L25ldC9zdG9tcC1pbXBsL3N0b21wLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==