import {Frame} from './frame'
import EE from 'eventemitter3';
import UUID from 'uuid';

let utils = {};
utils.really_defined = (var_to_test) => {
    return !(var_to_test == null || var_to_test == undefined);
};

export class Stomp {
	
	constructor(SocketImpl) {
		
		Object.assign(this, EE.prototype);
		
		this._subscribed_to = {};
		this.session = null;
		this.connected = false;
		this.SocketImpl = SocketImpl;
		
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
		this.endpoint = config['endpoint'] || '';
		
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
		
		/**
		 / Maybe we could subscribe to mulitple queues?
		 / if (destination instanceof Array) {
    /   for (var = i; i < 0; i++) {
    /     this._subscribed_to[destination[i]] = { enabled: true, callback: callback };
    /   }
    / }
		 / else {
    /     this._subscribed_to[destination] = { enabled: true, callback: callback };
    / }
		 /
		 */

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
		var command,
			this_string = data.toString('utf8', 0, data.length);
		command = this_string.split('\n');
		return command[0];
	}

	parse_headers(raw_headers) {
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
	}

	parse_frame(chunk) {
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
	}

	_connect(stomp) {
		
		let onInit = (socket, handleConnected) => {
			
			stomp.socket = socket;
			this._setupListeners(stomp, handleConnected);
			
		};
		
		let onError = (err) => {
			stomp.emit('connectionError', err);
		};
		
		stomp.SocketImpl.connect(stomp.host, stomp.port, stomp.endpoint, stomp.ssl, stomp.ssl_options, stomp.ssl_validate, onInit, onError);

	}

	_setupListeners(stomp, handleConnected) {

		let _connected = () => {
			console.log('Connected to socket');
			let headers = {};
			
			if (utils.really_defined(stomp.login) &&
				utils.really_defined(stomp.passcode)) {
				headers.login = stomp.login;
				headers.passcode = stomp.passcode;
			}
        
			if (utils.really_defined(stomp["client-id"])) {
				headers["client-id"] = stomp["client-id"];
			}
			if (utils.really_defined(stomp["vhost"])) {
				headers["host"] = stomp["vhost"];
			}
			
			this.stomp_connect(stomp, headers);
		};

		var socket = stomp.socket;

		socket.on('drain', (data) => {
			console.log('draining');
		});

		let buffer = '';

		socket.on('data', (chunk) => {
			
			//console.log('onData', chunk);
			
			buffer += chunk;
			var frames = buffer.split('\0\n');

			// Temporary fix : NULL,LF is not a guranteed standard, the LF is optional, so lets deal with it.  (Rauls)
			if (frames.length == 1) {
				frames = buffer.split('\0');
			}

			if (frames.length == 1) return;
			buffer = frames.pop();

			var parsed_frame = null;
			var _frame = null;
			while (_frame = frames.shift()) {
				parsed_frame = this.parse_frame(_frame);
				stomp.handle_new_frame(parsed_frame);
			}
		});

		socket.on('end', function () {
			console.log("end");
		});

		socket.on('close', function (error) {
			console.log('disconnected');
			if (error) {
				console.log('Disconnected with error: ' + error);
			}
			stomp.connected = false;
			stomp.emit("disconnected", error);
		});
		
		if (handleConnected) {
			_connected();
		} else {
			socket.on('connect', _connected);
		}

	}

	stomp_connect(stomp, headers) {
		
		var _frame = new Frame(),
			args = {},
			headers = headers || {};

		// Send heart-beat header...
		if(this.heartbeatMs > 0){
			headers['heart-beat'] = this.heartbeatMs + ',0';
		}
		
		args['command'] = 'CONNECT';
		args['headers'] = headers;

		var frame_to_send = _frame.build_frame(args);
		this.send_frame(stomp, frame_to_send);
	}

	_disconnect(stomp) {

		stomp.SocketImpl.disconnect(stomp.socket);
		
	}

	send_command(stomp, command, headers, body, withReceipt) {

		var withReceipt = withReceipt || false;
		
		if (!utils.really_defined(headers)) {
			headers = {};
		}
		
		if(withReceipt) {
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
		
	}

	send_frame(stomp, _frame) {
		
		var socket = stomp.socket;
		var frame_str = _frame.as_string();
		
		console.log('socket.write', frame_str);
		
		if (socket.write(frame_str) === false) {
			console.log('Write buffered');
		}
		
		return true;
	}
	
	createReceiptId() {
		
		return 'rcpt-' + UUID.v1();
		
	}

}
