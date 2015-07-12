'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _eventemitter3 = require('eventemitter3');

var _eventemitter32 = _interopRequireDefault(_eventemitter3);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var utils = {};
utils.really_defined = function (var_to_test) {
	return !(var_to_test == null || var_to_test == undefined);
};

var Stomp = (function () {
	function Stomp() {
		_classCallCheck(this, Stomp);

		Object.assign(this, _eventemitter32['default'].prototype);

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

	Stomp.prototype.parse_command = function parse_command(data) {};

	Stomp.prototype.parse_headers = function parse_headers(raw_headers) {};

	Stomp.prototype.parse_frame = function parse_frame(chunk) {};

	Stomp.prototype._connect = function _connect(stomp) {};

	Stomp.prototype._setupListeners = function _setupListeners(stomp) {};

	Stomp.prototype.stomp_connect = function stomp_connect(stomp, headers) {};

	Stomp.prototype._disconnect = function _disconnect(stomp) {};

	Stomp.prototype.send_command = function send_command(stomp, command, headers, body, withReceipt) {};

	Stomp.prototype.send_frame = function send_frame(stomp, _frame) {};

	Stomp.prototype.createReceiptId = function createReceiptId() {

		return 'rcpt-' + _uuid2['default'].v1();
	};

	return Stomp;
})();

exports.Stomp = Stomp;