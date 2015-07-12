import EE from 'eventemitter3';
import UUID from 'uuid';

let utils = {};
utils.really_defined = (var_to_test) => {
    return !(var_to_test == null || var_to_test == undefined);
};

export class Stomp {
	
	constructor() {
		
		Object.assign(this, EE.prototype);
		
		this._subscribed_to = {};
		this.session = null;
		this.connected = false;
		
	}
	
	isConnected(){
		return this.connected;
	}
	
	configure(config) {
		
		this.port = config['port'] || 61613;
		this.host = config['host'] || '127.0.0.1';
		this.debug = config['debug'];
		this.login = config['login'] || null;
		this.passcode = config['passcode'] || null;
		//this.log = new stomp_utils.StompLogging(this.debug);
		this.ssl = config['ssl'] ? true : false;
		this.ssl_validate = config['ssl_validate'] ? true : false;
		this.ssl_options = config['ssl_options'] || {};
		this.vhost = config['vhost'];
		this.heartbeatMs = config['heartbeatMs'];
		
		this['client-id'] = config['client-id'] || null;
		
	}
	
	connect(credentials) {
		this.login = credentials.login;
		this.passcode = credentials.passcode;
		this._connect(this);
	}
	
	is_a_message(this_frame) {
		return (this_frame.headers !== null && utils.really_defined(this_frame.headers['message-id']));
	}
	
	should_run_message_callback (this_frame) {
		
		/*
		var subscription = this._subscribed_to[this_frame.headers.destination];
		if (this_frame.headers.destination !== null && subscription !== null) {
			if (subscription.enabled && subscription.callback !== null && typeof(subscription.callback) == 'function') {
				subscription.callback(this_frame.body, this_frame.headers);
			}
		}
		*/
		
	}

	handle_new_frame (this_frame) {

		switch (this_frame.command) {
			case "MESSAGE":
				if (this.is_a_message(this_frame)) {
					this.should_run_message_callback(this_frame);
					this.emit('message', this_frame);
				}
				break;
			case "CONNECTED":
				console.log('Connected to STOMP');
				this.session = this_frame.headers['session'];
				this.connected = true;
				this.emit('connected');
				break;
			case "RECEIPT":
				this.emit('receipt', this_frame.headers['receipt-id']);
				break;
			case "ERROR":
				this.emit('error', this_frame);
				break;
			default:
				console.log("Could not parse command: " + this_frame.command);
		}
	}
	
	disconnect () {
		this._disconnect(this);
	}

	subscribe (headers, callback) {
		
		var destination = headers['destination'];
		headers['session'] = this.session;
		this.send_command(this, 'SUBSCRIBE', headers);
		this._subscribed_to[destination] = {enabled: true, callback: callback};
		console.log('subscribed to: ' + destination + ' with headers ', headers);
	}

	unsubscribe (headers) {
		var destination = headers['destination'];
		headers['session'] = this.session;
		this.send_command(this, 'UNSUBSCRIBE', headers);
		this._subscribed_to[destination].enabled = false;
		console.log('no longer subscribed to: ' + destination);
	}

	ack (message_id) {
		this.send_command(this, 'ACK', {'message-id': message_id});
		console.log('acknowledged message: ' + message_id);
	}

	begin () {
		var transaction_id = Math.floor(Math.random() * 99999999999).toString();
		this.send_command(this, 'BEGIN', {'transaction': transaction_id});
		console.log('begin transaction: ' + transaction_id);
		return transaction_id;
	}

	commit (transaction_id) {
		this.send_command(this, 'COMMIT', {'transaction': transaction_id});
		console.log('commit transaction: ' + transaction_id);
	}

	abort (transaction_id) {
		this.send_command(this, 'ABORT', {'transaction': transaction_id});
		console.log('abort transaction: ' + transaction_id);
	}

	send (destination, headers, body, withReceipt) {
		headers['session'] = this.session;
		headers['destination'] = destination;
		console.log('STOMP :: ', headers, body);
		return this.send_command(this, 'SEND', headers, body, withReceipt);
	}
	
	
	
	// stomp implementation
	
	parse_command(data) {
		
		
		
	}

	parse_headers(raw_headers) {
		
		
		
	}

	parse_frame(chunk) {
		
		
		
	}

	_connect(stomp) {

		

	}

	_setupListeners(stomp) {

		

	}

	stomp_connect(stomp, headers) {
		
		
		
	}

	_disconnect(stomp) {
		
	}

	send_command(stomp, command, headers, body, withReceipt) {

		
		
	}

	send_frame(stomp, _frame) {
		
		
		
	}
	
	createReceiptId() {
		
		return 'rcpt-' + UUID.v1();
		
	}

}
