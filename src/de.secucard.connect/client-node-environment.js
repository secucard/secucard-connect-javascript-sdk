import {Stomp} from './net/stomp';
import {SocketAtNode} from './net/socket/socket-node';

export const ClientNodeEnvironment = {
	config: {
		stompPort: 61614
	}
};
ClientNodeEnvironment.StompChannel = {
	create: () => {
		return new Stomp(SocketAtNode);
	}
};