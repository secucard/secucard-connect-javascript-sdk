import {Stomp} from './net/stomp';
import {SocketAtBrowser} from './net/socket/socket-browser';

export const ClientBrowserEnvironment = {
	config: {
		stompPort: 15671,
		stompEndpoint: '/stomp/websocket'
	}
};
ClientBrowserEnvironment.StompChannel = {
	create: () => {
		return new Stomp(SocketAtBrowser);
	}
};