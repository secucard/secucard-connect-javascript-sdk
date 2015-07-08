export class Stomp {
	
	constructor (Impl) {
		
		this.Impl = Impl;
		this.host = 'dev10.secupay-ag.de';
		//this.host = 'connect.secucard.de';
		this.port = 61614;
		this.ssl = true;
		this.enabled = true;
		this.heartbeat = 600;
		this.timeout = 0;
		this.debug = false;
		this.login = '';
		this.passcode = '';
		this.connection = null;
		this.messages = {};
		
	}
	
	configureWithContext(context) {
		
		this.getToken = () => {
			
			return context.getAuth().getToken();
			
		}
		
	}
	
	open (callback) {
		
		var _this = this;
		
		console.log('stomp start connection');
		
		return this.getToken().then((token) => {
			
			console.log('Got token', token);
			
			let StompImpl = this.Impl;
			
			this.login = token.access_token;
			this.passcode = token.access_token;
			
			this.connection = new StompImpl(this);
			
			/*
			this.connection.should_run_message_callback = function (frame) {
	
				frame.body = JSON.parse(frame.body[0]);
	
				// execute correlation-id callback
				if (frame && frame.headers && frame.headers['correlation-id']) {
					var correlationId = frame.headers['correlation-id'];
					_this.messages[correlationId](null, frame.headers, frame.body);
				}
	
				//_this.emit("onMessage", frame.body);
			};
			*/
			
			this.connection.connect();
	
			this.connection.on('connected', function () {
				console.log('stomp connected');
				//_this.emit("onStompConnected", this);
				callback();
			});
	
			this.connection.on('error', function (body) {
				console.log('stomp error', body);
				//_this.Event().emit('error', body);
			});
			
		});
	}
	
	close () {
		if (this.connection && this.connection.disconnect) {
			this.connection.disconnect()
		}
		
		console.log('stomp disconnected');
		//this.emit("onStompDisconnect", null);
	}
	
	addMessage (correlationId, callback) {
		this.messages[correlationId] = callback;
	}
	
} 