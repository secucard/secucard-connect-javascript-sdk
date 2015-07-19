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
		Smart.TransactionService,
		Smart.IdentService,
		Smart.CheckinService
	]
};
ClientNodeEnvironment.StompChannel = {
	create: () => {
		return new Stomp(SocketAtNode);
	}
};

export const ServiceMap = {
	Smart: {
		Transactions: Smart.TransactionService.Uid,
		Checkins: Smart.CheckinService.Uid,
		Idents: Smart.IdentService.Uid
	},
	General: {
		Skeletons: General.SkeletonService.Uid
	}
};