System.register(['eventemitter3', 'uuid'], function (_export) {
	'use strict';

	var EE, UUID, utils, Stomp;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	return {
		setters: [function (_eventemitter3) {
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

					return 'rcpt-' + UUID.v1();
				};

				return Stomp;
			})();

			_export('Stomp', Stomp);
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvbmV0L3N0b21wLWJyb3dzZXIvc3RvbXAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2VBR0ksS0FBSyxFQUtJLEtBQUs7Ozs7Ozs7Ozs7O0FBTGQsUUFBSyxHQUFHLEVBQUU7O0FBQ2QsUUFBSyxDQUFDLGNBQWMsR0FBRyxVQUFDLFdBQVcsRUFBSztBQUNwQyxXQUFPLEVBQUUsV0FBVyxJQUFJLElBQUksSUFBSSxXQUFXLElBQUksU0FBUyxDQUFBLEFBQUMsQ0FBQztJQUM3RCxDQUFDOztBQUVXLFFBQUs7QUFFTixhQUZDLEtBQUssR0FFSDsyQkFGRixLQUFLOztBQUloQixXQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7O0FBRWxDLFNBQUksQ0FBQyxjQUFjLEdBQUcsRUFBRSxDQUFDO0FBQ3pCLFNBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0FBQ3BCLFNBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0tBRXZCOztBQVZXLFNBQUssV0FZakIsV0FBVyxHQUFBLHVCQUFFO0FBQ1osWUFBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0tBQ3RCOztBQWRXLFNBQUssV0FnQmpCLFNBQVMsR0FBQSxtQkFBQyxNQUFNLEVBQUU7O0FBRWpCLFNBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBQztBQUNwQyxTQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxXQUFXLENBQUM7QUFDMUMsU0FBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDN0IsU0FBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxDQUFDO0FBQ3JDLFNBQUksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLElBQUksQ0FBQzs7QUFF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OztBQXpKVyxTQUFLLFdBMkpqQixRQUFRLEdBQUEsa0JBQUMsS0FBSyxFQUFFLEVBSWY7O0FBL0pXLFNBQUssV0FpS2pCLGVBQWUsR0FBQSx5QkFBQyxLQUFLLEVBQUUsRUFJdEI7O0FBcktXLFNBQUssV0F1S2pCLGFBQWEsR0FBQSx1QkFBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLEVBSTdCOztBQTNLVyxTQUFLLFdBNktqQixXQUFXLEdBQUEscUJBQUMsS0FBSyxFQUFFLEVBRWxCOztBQS9LVyxTQUFLLFdBaUxqQixZQUFZLEdBQUEsc0JBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUl4RDs7QUFyTFcsU0FBSyxXQXVMakIsVUFBVSxHQUFBLG9CQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsRUFJekI7O0FBM0xXLFNBQUssV0E2TGpCLGVBQWUsR0FBQSwyQkFBRzs7QUFFakIsWUFBTyxPQUFPLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO0tBRTNCOztXQWpNVyxLQUFLOzs7b0JBQUwsS0FBSyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L25ldC9zdG9tcC1icm93c2VyL3N0b21wLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==