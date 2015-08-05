System.register(['./frame', 'eventemitter3', 'uuid', 'minilog'], function (_export) {
	'use strict';

	var Frame, EE, UUID, minilog, utils, Stomp;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	return {
		setters: [function (_frame2) {
			Frame = _frame2.Frame;
		}, function (_eventemitter3) {
			EE = _eventemitter3['default'];
		}, function (_uuid) {
			UUID = _uuid['default'];
		}, function (_minilog) {
			minilog = _minilog['default'];
		}],
		execute: function () {
			utils = {};

			utils.really_defined = function (var_to_test) {
				return !(var_to_test == null || var_to_test == undefined);
			};

			Stomp = (function () {
				function Stomp(SocketImpl) {
					_classCallCheck(this, Stomp);

					Object.assign(this, EE.prototype);

					this._subscribed_to = {};
					this.session = null;
					this.connected = false;
					this.SocketImpl = SocketImpl;
				}

				Stomp.prototype.isConnected = function isConnected(ignoreSession) {
					return this.connected && (ignoreSession || this.session);
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
							minilog('secucard.STOMP').debug('Connected');
							this.session = this_frame.headers['session'];
							this.emit('connected');
							break;
						case 'RECEIPT':
							this.emit('receipt', this_frame.headers['receipt-id']);
							break;
						case 'ERROR':
							this.emit('error', this_frame);
							break;
						default:
							minilog('secucard.STOMP').error('Could not parse command', this_frame.command);
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
				};

				Stomp.prototype.unsubscribe = function unsubscribe(headers) {
					var destination = headers['destination'];
					headers['session'] = this.session;
					this.send_command(this, 'UNSUBSCRIBE', headers);
					this._subscribed_to[destination].enabled = false;
				};

				Stomp.prototype.ack = function ack(message_id) {
					this.send_command(this, 'ACK', { 'message-id': message_id });
				};

				Stomp.prototype.begin = function begin() {
					var transaction_id = Math.floor(Math.random() * 99999999999).toString();
					this.send_command(this, 'BEGIN', { 'transaction': transaction_id });

					return transaction_id;
				};

				Stomp.prototype.commit = function commit(transaction_id) {
					this.send_command(this, 'COMMIT', { 'transaction': transaction_id });
				};

				Stomp.prototype.abort = function abort(transaction_id) {
					this.send_command(this, 'ABORT', { 'transaction': transaction_id });
				};

				Stomp.prototype.send = function send(destination, headers, body, withReceipt) {
					headers['session'] = this.session;
					headers['destination'] = destination;
					minilog('secucard.STOMP').debug(headers, body);
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

						minilog('secucard.STOMP').debug('Connected to socket');
						_this2.connected = true;

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
						minilog('secucard.STOMP').debug('draining');
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

					socket.on('end', function () {});

					socket.on('close', function (error) {
						minilog('secucard.STOMP').debug('Disconnected with error:', error);
						stomp.session = null;
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

					minilog('secucard.STOMP').debug('socket write:', frame_str);

					if (socket.write(frame_str) === false) {
						minilog('secucard.STOMP').debug('Write buffered');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L3N0b21wLWltcGwvc3RvbXAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OytCQWdCSSxLQUFLLEVBS0ksS0FBSzs7Ozs7O21CQVZWLEtBQUs7Ozs7Ozs7OztBQUtULFFBQUssR0FBRyxFQUFFOztBQUNkLFFBQUssQ0FBQyxjQUFjLEdBQUcsVUFBQyxXQUFXLEVBQUs7QUFDcEMsV0FBTyxFQUFFLFdBQVcsSUFBSSxJQUFJLElBQUksV0FBVyxJQUFJLFNBQVMsQ0FBQSxBQUFDLENBQUM7SUFDN0QsQ0FBQzs7QUFFVyxRQUFLO0FBRU4sYUFGQyxLQUFLLENBRUwsVUFBVSxFQUFFOzJCQUZaLEtBQUs7O0FBSWhCLFdBQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQzs7QUFFbEMsU0FBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7QUFDekIsU0FBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7QUFDcEIsU0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7QUFDdkIsU0FBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7S0FFN0I7O0FBWFcsU0FBSyxXQWFqQixXQUFXLEdBQUEscUJBQUMsYUFBYSxFQUFDO0FBQ3pCLFlBQU8sSUFBSSxDQUFDLFNBQVMsS0FBSyxhQUFhLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQSxBQUFDLENBQUM7S0FDekQ7O0FBZlcsU0FBSyxXQWlCakIsU0FBUyxHQUFBLG1CQUFDLE1BQU0sRUFBRTs7QUFFakIsU0FBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDO0FBQ3BDLFNBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLFdBQVcsQ0FBQztBQUMxQyxTQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM3QixTQUFJLENBQUMs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QUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRTs7QUFFeEQsU0FBSSxXQUFXLEdBQUcsV0FBVyxJQUFJLEtBQUssQ0FBQzs7QUFFdkMsU0FBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEVBQUU7QUFDbkMsYUFBTyxHQUFHLEVBQUUsQ0FBQztNQUNiOztBQUVELFNBQUcsV0FBVyxFQUFFO0FBQ2YsYUFBTyxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztNQUM1Qzs7QUFFRCxTQUFJLElBQUksR0FBRztBQUNWLGVBQVMsRUFBRSxPQUFPO0FBQ2xCLGVBQVMsRUFBRSxPQUFPO0FBQ2xCLFlBQU0sRUFBRSxJQUFJO01BQ1osQ0FBQzs7QUFFRixTQUFJLE1BQU0sR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO0FBQ3pCLFNBQUksVUFBVSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDMUMsU0FBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDbkMsWUFBTyxVQUFVLENBQUM7S0FFbEI7O0FBL1ZXLFNBQUssV0FpV2pCLFVBQVUsR0FBQSxvQkFBQyxLQUFLLEVBQUUsTUFBTSxFQUFFOztBQUV6QixTQUFJLE1BQU0sR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO0FBQzFCLFNBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQzs7QUFFbkMsWUFBTyxDQUFDLGdCQUFnQixDQUFDLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFBRSxTQUFTLENBQUMsQ0FBQzs7QUFFNUQsU0FBSSxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEtBQUssRUFBRTtBQUN0QyxhQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztNQUNsRDs7QUFFRCxZQUFPLElBQUksQ0FBQztLQUNaOztBQTdXVyxTQUFLLFdBK1dqQixlQUFlLEdBQUEsMkJBQUc7O0FBRWpCLFlBQU8sT0FBTyxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQztLQUUzQjs7V0FuWFcsS0FBSzs7O29CQUFMLEtBQUsiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9uZXQvc3RvbXAtaW1wbC9zdG9tcC5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=