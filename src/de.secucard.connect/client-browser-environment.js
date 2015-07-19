import {Stomp} from './net/stomp';
import {SocketAtBrowser} from './net/socket/socket-browser';
import {General} from './product/general/general';
import {Smart} from './product/smart/smart'

export const ClientBrowserEnvironment = {
	config: {
		stompPort: 15671,
		stompEndpoint: '/stomp/websocket'
	},
	services: [
		General.SkeletonService,
		General.AccountService,
		Smart.TransactionService,
		Smart.IdentService,
		Smart.CheckinService
	]
};
ClientBrowserEnvironment.StompChannel = {
	create: () => {
		return new Stomp(SocketAtBrowser);
	}
};

export const ServiceMap = {
	Smart: {
		Transactions: Smart.TransactionService.Uid,
		Checkins: Smart.CheckinService.Uid,
		Idents: Smart.IdentService.Uid
	},
	General: {
		Skeletons: General.SkeletonService.Uid,
		Accounts: General.AccountService.Uid
	}
};