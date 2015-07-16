import {Stomp} from './net/stomp';
import {SocketAtNode} from './net/socket/socket-node';
import {General} from './product/general/general';

export const ClientNodeEnvironment = {
	config: {
		stompPort: 61614
	},
	services: [
		General.SkeletonService
	]
};
ClientNodeEnvironment.StompChannel = {
	create: () => {
		return new Stomp(SocketAtNode);
	}
};