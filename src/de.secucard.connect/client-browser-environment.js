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
		General.AccountDeviceService,
		General.MerchantService,
		General.NewsService,
		General.NotificationService,
		General.PublicMerchantService,
		General.StoreService,
		General.TransactionService,
		
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
		Accounts: General.AccountService.Uid,
		AccountDevices: General.AccountDeviceService.Uid,
		Merchants: General.MerchantService.Uid,
		News: General.NewsService.Uid,
		Notifications: General.NotificationService.Uid,
		PublicMerchants: General.PublicMerchantService.Uid,
		Stores: General.StoreService.Uid,
		Transactions: General.TransactionService.Uid
	}
};