System.register(['net', 'tls', './frame', 'eventemitter3', 'uuid'], function (_export) {
	'use strict';

	var net, tls, Frame, EE, UUID, utils, Stomp;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	return {
		setters: [function (_net) {
			net = _net['default'];
		}, function (_tls) {
			tls = _tls['default'];
		}, function (_frame2) {
			Frame = _frame2.Frame;
		}, function (_eventemitter3) {
			EE = _eventemitter3['default'];
		}, function (_uuid) {
			UUID = _uuid['default'];
		}],
		execute: function () {
			utils = {};

			utils.really_defined = function (var_to_test) {
				return !(var_to_test == null || var_to_test == undefined);
			};

			Stomp = (function () {
				function Stomp() {
					_classCallCheck(this, Stomp);

					Object.assign(this, EE.prototype);

					this._subscribed_to = {};
					this.session = null;
					this.connected = false;
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

					if (stomp.ssl) {
						console.log('Connecting to ' + stomp.host + ':' + stomp.port + ' using SSL');
						stomp.socket = tls.connect(stomp.port, stomp.host, stomp.ssl_options, function () {
							console.log('SSL connection complete');
							if (!stomp.socket.authorized) {
								console.log('SSL is not authorized: ' + stomp.socket.authorizationError);
								if (stomp.ssl_validate) {
									_this._disconnect(stomp);
									return;
								}
							}
							_this._setupListeners(stomp);
						}).on('error', function (err, obj) {
							console.log(err);
							console.log(obj);
						});
					} else {
						console.log('Connecting to ' + stomp.host + ':' + stomp.port);
						stomp.socket = new net.Socket();
						stomp.socket.connect(stomp.port, stomp.host);
						this._setupListeners(stomp);
					}
				};

				Stomp.prototype._setupListeners = function _setupListeners(stomp) {
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
						this.connected = false;
						stomp.emit('disconnected', error);
					});

					if (stomp.ssl) {
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

					var socket = stomp.socket;
					socket.end();

					if (socket.readyState == 'readOnly') {
						socket.destroy();
					}

					console.log('disconnect called');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L3N0b21wLW5vZGUvc3RvbXAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2dDQU1JLEtBQUssRUFLSSxLQUFLOzs7Ozs7Ozs7O21CQVRWLEtBQUs7Ozs7Ozs7QUFJVCxRQUFLLEdBQUcsRUFBRTs7QUFDZCxRQUFLLENBQUMsY0FBYyxHQUFHLFVBQUMsV0FBVyxFQUFLO0FBQ3BDLFdBQU8sRUFBRSxXQUFXLElBQUksSUFBSSxJQUFJLFdBQVcsSUFBSSxTQUFTLENBQUEsQUFBQyxDQUFDO0lBQzdELENBQUM7O0FBRVcsUUFBSztBQUVOLGFBRkMsS0FBSyxHQUVIOzJCQUZGLEtBQUs7O0FBSWhCLFdBQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7QUFFbEMsU0FBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7QUFDekIsU0FBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7QUFDcEIsU0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7S0FFdkI7O0FBVlcsU0FBSyxXQVlqQixXQUFXLEdBQUEsdUJBQUU7QUFDWixZQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7S0FDdEI7O0FBZFcsU0FBSyxXQWdCakIsU0FBUyxHQUFBLG1CQUFDLE1BQU0sRUFBRTs7QUFFakIsU0FBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDO0FBQ3BDLFNBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLFdBQVcsQ0FBQztBQUMxQyxTQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM3QixTQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxJQUFJLENBQUM7QUFDckMsU0FBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUks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