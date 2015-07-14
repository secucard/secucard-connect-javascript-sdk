'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _frame2 = require('./frame');

var _eventemitter3 = require('eventemitter3');

var _eventemitter32 = _interopRequireDefault(_eventemitter3);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var utils = {};
utils.really_defined = function (var_to_test) {
	return !(var_to_test == null || var_to_test == undefined);
};

var Stomp = (function () {
	function Stomp(SocketImpl) {
		_classCallCheck(this, Stomp);

		Object.assign(this, _eventemitter32['default'].prototype);

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

		var this_frame = new _frame2.Frame();
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

		var _frame = new _frame2.Frame(),
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

		var _frame = new _frame2.Frame();
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

		return 'rcpt-' + _uuid2['default'].v1();
	};

	return Stomp;
})();

exports.Stomp = Stomp;