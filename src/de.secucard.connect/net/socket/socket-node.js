import net from 'net';
import tls from 'tls';

export const SocketAtNode = {};

SocketAtNode.connect = (host, port, endpoint, sslEnabled, ssl_options, ssl_validate, onInit, onError) => {
	
	let socket = null;
	
	if (sslEnabled) {
		console.log('SocketNode', 'ssl', 'Connecting to ' + host + ':' + port + ' using SSL');
		socket = tls.connect(port, host, ssl_options, () => {
			console.log('SocketNode', 'SSL connection complete');
			
			if (!socket.authorized) {
				console.log('SocketNode', 'SSL is not authorized: ' + socket.authorizationError);
				if (ssl_validate) {
					onError(socket.authorizationError);
					SocketNode.disconnect(socket);
					return;
				}
			}
			
			onInit(socket, true);
			
		}).on('error', function (err, obj) {
			console.log(err);
			console.log(obj);
			onError(err);
		});
	}
	
	else {
		console.log('SocketNode', 'Connecting to ' + host + ':' + port);
		
		socket = new net.Socket();
		socket.connect(port, host);
		onInit(socket, false);
		
	}
	
};

SocketAtNode.disconnect = (socket) => {
	
	socket.end();
	if (socket.readyState == 'readOnly') {
		socket.destroy();
	}
	
	console.log('SocketNode', 'disconnect called');
	
};