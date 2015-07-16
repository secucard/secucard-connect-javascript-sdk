import {Stomp} from './net/stomp';
import {SocketAtNode} from './net/socket/socket-node';
import {General} from './product/general/general';
import {Smart} from './product/smart/smart'
export const ClientNodeEnvironment = {
	config: {
		stompPort: 61614
	},
	services: [
		General.SkeletonService,
		Smart.TransactionService
	]
};
ClientNodeEnvironment.StompChannel = {
	create: () => {
		return new Stomp(SocketAtNode);
	}
};