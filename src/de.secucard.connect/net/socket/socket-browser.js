import EE from 'eventemitter3';
export class SocketAtBrowser {
	
	constructor(url) {
		
		Object.assign(this, EE.prototype);
		
		let ws = new WebSocket(url);
		ws.binaryType = "arraybuffer";
		
		ws.onopen = () => {
			
			console.log('ws.onopen');
			this.emit('connect');
			
		};
		
		ws.onmessage = (event) => {
			
			console.log('ws.onmessage', event);
			this.emit('data', event.data);
			
		};
		
		ws.onclose = (event) => {
			
			// https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent
			
			if(event.code == 1000){
				// normal
				this.emit('close');
			} else {
				this.emit('close', event.reason);
			}
			
		};
		
		this.ws = ws;
	}
	
	close() {
		
		this.ws.close();
		
	}
	
	write(chunk) {
		
		this.ws.send(chunk);
		return true;
		
	}
	
}

SocketAtBrowser.connect = (host, port, endpoint, sslEnabled, ssl_options, ssl_validate, onInit, onError) => {
	
	let url = host + ':' + port + endpoint;
	if (sslEnabled) {
		url  = 'wss://' + url;
	} else {
		url  = 'ws://' + url;
	}
	
	// TODO handle errors
	
	let socket = new SocketAtBrowser(url);
	onInit(socket, false);
	
};

SocketAtBrowser.disconnect = (socket) => {
	
	console.log('SocketNode', 'disconnect called');
	socket.close();
	
};
