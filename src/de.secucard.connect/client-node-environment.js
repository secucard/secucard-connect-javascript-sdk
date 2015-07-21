import {Stomp} from './net/stomp';
import {SocketAtNode} from './net/socket/socket-node';
import {General} from './product/general/general';
import {Smart} from './product/smart/smart';
import {Loyalty} from './product/loyalty/loyalty';

export const ClientNodeEnvironment = {
	config: {
		stompPort: 61614
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
		
		Loyalty.CardService,
		Loyalty.CustomerService,
		Loyalty.MerchantCardService,
		
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
	},
	Loyalty: {
		Cards: Loyalty.CardService.Uid,
		Customers: Loyalty.CustomerService.Uid,
		MerchantCards: Loyalty.MerchantCardService.Uid
	},
	Smart: {
		Transactions: Smart.TransactionService.Uid,
		Checkins: Smart.CheckinService.Uid,
		Idents: Smart.IdentService.Uid
	}
};