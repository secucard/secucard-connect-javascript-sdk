/*
 Copyright 2015 hp.weber GmbH & Co secucard KG (www.secucard.com)
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */
import EE from 'eventemitter3';
import minilog from 'minilog';
export class SocketAtBrowser {
	
	constructor(url) {
		
		Object.assign(this, EE.prototype);
		
		let ws = new WebSocket(url);
		ws.binaryType = "arraybuffer";
		
		ws.onopen = () => {
			
			minilog('secucard.socket.browser').debug('onopen');
			this.emit('connect');
			
		};
		
		ws.onmessage = (event) => {
			
			minilog('secucard.socket.browser').debug('onmessage', event);
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
	
	minilog('secucard.socket.browser').debug('disconnect called');
	socket.close();
	
};
