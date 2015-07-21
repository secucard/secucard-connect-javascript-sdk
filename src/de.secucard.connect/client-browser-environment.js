import {Stomp} from './net/stomp';
import {SocketAtBrowser} from './net/socket/socket-browser';
import {General} from './product/general/general';
import {Smart} from './product/smart/smart'
import {Loyalty} from './product/loyalty/loyalty';
import {Payment} from './product/payment/payment';
import {Services} from './product/services/services';

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
		
		Loyalty.CardService,
		Loyalty.CustomerService,
		Loyalty.MerchantCardService,
		
		Payment.ContainerService,
		Payment.ContractService,
		Payment.CustomerService,
		Payment.SecupayDebitService,
		Payment.SecupayPrepayService,
		
		Services.IdentContractService,
		Services.IdentRequestService,
		Services.IdentResultService,
		
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
	Services: {
		IdentContracts: Services.IdentContractService.Uid,
		IdentRequests: Services.IdentRequestService.Uid,
		IdentResults: Services.IdentResultService.Uid
	},
	Smart: {
		Transactions: Smart.TransactionService.Uid,
		Checkins: Smart.CheckinService.Uid,
		Idents: Smart.IdentService.Uid
	}
};