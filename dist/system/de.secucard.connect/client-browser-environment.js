System.register(['./net/stomp', './net/socket/socket-browser', './product/general/general', './product/smart/smart', './product/loyalty/loyalty', './product/payment/payment', './product/services/services', './product/document/document', './product/auth/auth', './auth/token-storage'], function (_export) {
	'use strict';

	var Stomp, SocketAtBrowser, General, Smart, Loyalty, Payment, Services, Document, Auth, TokenStorageInMem, ClientBrowserEnvironment, ServiceMap;
	return {
		setters: [function (_netStomp) {
			Stomp = _netStomp.Stomp;
		}, function (_netSocketSocketBrowser) {
			SocketAtBrowser = _netSocketSocketBrowser.SocketAtBrowser;
		}, function (_productGeneralGeneral) {
			General = _productGeneralGeneral.General;
		}, function (_productSmartSmart) {
			Smart = _productSmartSmart.Smart;
		}, function (_productLoyaltyLoyalty) {
			Loyalty = _productLoyaltyLoyalty.Loyalty;
		}, function (_productPaymentPayment) {
			Payment = _productPaymentPayment.Payment;
		}, function (_productServicesServices) {
			Services = _productServicesServices.Services;
		}, function (_productDocumentDocument) {
			Document = _productDocumentDocument.Document;
		}, function (_productAuthAuth) {
			Auth = _productAuthAuth.Auth;
		}, function (_authTokenStorage) {
			TokenStorageInMem = _authTokenStorage.TokenStorageInMem;
		}],
		execute: function () {
			ClientBrowserEnvironment = {
				config: {
					stompPort: 15671,
					stompEndpoint: '/stomp/websocket'
				},
				services: [Auth.SessionService, Document.UploadService, General.SkeletonService, General.AccountService, General.AccountDeviceService, General.ContactService, General.DeliveryAddressService, General.FileAccessService, General.MerchantService, General.NewsService, General.NotificationService, General.PublicMerchantService, General.StoreService, General.TransactionService, Loyalty.BeaconService, Loyalty.CardGroupService, Loyalty.CardService, Loyalty.ChargeService, Loyalty.CheckinService, Loyalty.CustomerService, Loyalty.MerchantCardService, Loyalty.ProgramService, Loyalty.ProgramSpecialService, Loyalty.SaleService, Payment.ContainerService, Payment.ContractService, Payment.CustomerService, Payment.SecupayDebitService, Payment.SecupayPrepayService, Services.IdentContractService, Services.IdentRequestService, Services.IdentResultService, Smart.TransactionService, Smart.IdentService, Smart.CheckinService]
			};

			_export('ClientBrowserEnvironment', ClientBrowserEnvironment);

			ClientBrowserEnvironment.StompChannel = {
				create: function create() {
					return new Stomp(SocketAtBrowser);
				}
			};

			ClientBrowserEnvironment.TokenStorage = {
				create: function create() {
					return new TokenStorageInMem();
				}
			};

			ServiceMap = {
				Auth: {
					Sessions: Auth.SessionService.Uid
				},
				Document: {
					Uploads: Document.UploadService.Uid
				},
				General: {
					Skeletons: General.SkeletonService.Uid,
					Accounts: General.AccountService.Uid,
					AccountDevices: General.AccountDeviceService.Uid,
					Contacts: General.ContactService.Uid,
					DeliveryAddresses: General.DeliveryAddressService.Uid,
					FileAccesses: General.FileAccessService.Uid,
					Merchants: General.MerchantService.Uid,
					News: General.NewsService.Uid,
					Notifications: General.NotificationService.Uid,
					PublicMerchants: General.PublicMerchantService.Uid,
					Stores: General.StoreService.Uid,
					Transactions: General.TransactionService.Uid
				},
				Loyalty: {
					Beacons: Loyalty.BeaconService.Uid,
					CardGroups: Loyalty.CardGroupService.Uid,
					Cards: Loyalty.CardService.Uid,
					Charges: Loyalty.ChargeService.Uid,
					Checkins: Loyalty.CheckinService.Uid,
					Customers: Loyalty.CustomerService.Uid,
					MerchantCards: Loyalty.MerchantCardService.Uid,
					Programs: Loyalty.ProgramService.Uid,
					ProrgamSpecials: Loyalty.ProgramSpecialService.Uid,
					Sales: Loyalty.SaleService.Uid
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

			_export('ServiceMap', ServiceMap);
		}
	};
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvY2xpZW50LWJyb3dzZXItZW52aXJvbm1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OzRHQXNCYSx3QkFBd0IsRUE2RHhCLFVBQVU7OztxQkF4RWYsS0FBSzs7NkNBQ0wsZUFBZTs7b0NBQ2YsT0FBTzs7OEJBQ1AsS0FBSzs7b0NBQ0wsT0FBTzs7b0NBQ1AsT0FBTzs7dUNBQ1AsUUFBUTs7dUNBQ1IsUUFBUTs7MkJBQ1IsSUFBSTs7eUNBQ0osaUJBQWlCOzs7QUFFWiwyQkFBd0IsR0FBRztBQUN2QyxVQUFNLEVBQUU7QUFDUCxjQUFTLEVBQUUsS0FBSztBQUNoQixrQkFBYSxFQUFFLGtCQUFrQjtLQUNqQztBQUNELFlBQVEsRUFBRSxDQUNULElBQUksQ0FBQyxjQUFjLEVBRW5CLFFBQVEsQ0FBQyxhQUFhLEVBRXRCLE9BQU8sQ0FBQyxlQUFlLEVBQ3ZCLE9BQU8sQ0FBQyxjQUFjLEVBQ3RCLE9BQU8sQ0FBQyxvQkFBb0IsRUFDNUIsT0FBTyxDQUFDLGNBQWMsRUFDdEIsT0FBTyxDQUFDLHNCQUFzQixFQUM5QixPQUFPLENBQUMsaUJBQWlCLEVBQ3pCLE9BQU8sQ0FBQyxlQUFlLEVBQ3ZCLE9BQU8sQ0FBQyxXQUFXLEVBQ25CLE9BQU8sQ0FBQyxtQkFBbUIsRUFDM0IsT0FBTyxDQUFDLHFCQUFxQixFQUM3QixPQUFPLENBQUMsWUFBWSxFQUNwQixPQUFPLENBQUMsa0JBQWtCLEVBRTFCLE9BQU8sQ0FBQyxhQUFhLEVBQ3JCLE9BQU8sQ0FBQyxnQkFBZ0IsRUFDeEIsT0FBTyxDQUFDLFdBQVcsRUFDbkIsT0FBTyxDQUFDLGFBQWEsRUFDckIsT0FBTyxDQUFDLGNBQWMsRUFDdEIsT0FBTyxDQUFDLGVBQWUsRUFDdkIsT0FBTyxDQUFDLG1CQUFtQixFQUMzQixPQUFPLENBQUMsY0FBYyxFQUN0QixPQUFPLENBQUMscUJBQXFCLEVBQzdCLE9BQU8sQ0FBQyxXQUFXLEVBRW5CLE9BQU8sQ0FBQyxnQkFBZ0IsRUFDeEIsT0FBTyxDQUFDLGVBQWUsRUFDdkIsT0FBTyxDQUFDLGVBQWUsRUFDdkIsT0FBTyxDQUFDLG1CQUFtQixFQUMzQixPQUFPLENBQUMsb0JBQW9CLEVBRTVCLFFBQVEsQ0FBQyxvQkFBb0IsRUFDN0IsUUFBUSxDQUFDLG1CQUFtQixFQUM1QixRQUFRLENBQUMsa0JBQWtCLEVBRTNCLEtBQUssQ0FBQyxrQkFBa0IsRUFDeEIsS0FBSyxDQUFDLFlBQVksRUFDbEIsS0FBSyxDQUFDLGNBQWMsQ0FDcEI7SUFDRDs7dUNBaERZLHdCQUF3Qjs7QUFpRHJDLDJCQUF3QixDQUFDLFlBQVksR0FBRztBQUN2QyxVQUFNLEVBQUUsa0JBQU07QUFDYixZQUFPLElBQUksS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0tBQ2xDO0lBQ0QsQ0FBQzs7QUFFRiwyQkFBd0IsQ0FBQyxZQUFZLEdBQUc7QUFDdkMsVUFBTSxFQUFFLGtCQUFNO0FBQ2IsWUFBTyxJQUFJLGlCQUFpQixFQUFFLENBQUM7S0FDL0I7SUFDRCxDQUFDOztBQUVXLGFBQVUsR0FBRztBQUN6QixRQUFJLEVBQUU7QUFDTCxhQUFRLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHO0tBQ2pDO0FBQ0QsWUFBUSxFQUFFO0FBQ1QsWUFBTyxFQUFFLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRztLQUNuQztBQUNELFdBQU8sRUFBRTtBQUNSLGNBQVMsRUFBRSxPQUFPLENBQUMsZUFBZSxDQUFDLEdBQUc7QUFDdEMsYUFBUSxFQUFFLE9BQU8sQ0FBQyxjQUFjLENBQUMsR0FBRztBQUNwQyxtQkFBYyxFQUFFLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHO0FBQ2hELGFBQVEsRUFBRSxPQUFPLENBQUMsY0FBYyxDQUFDLEdBQUc7QUFDcEMsc0JBQWlCLEVBQUUsT0FBTyxDQUFDLHNCQUFzQixDQUFDLEdBQUc7QUFDckQsaUJBQVksRUFBRSxPQUFPLENBQUMsaUJBQWlCLENBQUMsR0FBRztBQUMzQyxjQUFTLEVBQUUsT0FBTyxDQUFDLGVBQWUsQ0FBQyxHQUFHO0FBQ3RDLFNBQUksRUFBRSxPQUFPLENBQUMsV0FBVyxDQUFDLEdBQUc7QUFDN0Isa0JBQWEsRUFBRSxPQUFPLENBQUMsbUJBQW1CLENBQUMsR0FBRztBQUM5QyxvQkFBZSxFQUFFLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHO0FBQ2xELFdBQU0sRUFBRSxPQUFPLENBQUMsWUFBWSxDQUFDLEdBQUc7QUFDaEMsaUJBQVksRUFBRSxPQUFPLENBQUMsa0JBQWtCLENBQUMsR0FBRztLQUM1QztBQUNELFdBQU8sRUFBRTtBQUNSLFlBQU8sRUFBRSxPQUFPLENBQUMsYUFBYSxDQUFDLEdBQUc7QUFDbEMsZUFBVSxFQUFFLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHO0FBQ3hDLFVBQUssRUFBRSxPQUFPLENBQUMsV0FBVyxDQUFDLEdBQUc7QUFDOUIsWUFBTyxFQUFFLE9BQU8sQ0FBQyxhQUFhLENBQUMsR0FBRztBQUNsQyxhQUFRLEVBQUUsT0FBTyxDQUFDLGNBQWMsQ0FBQyxHQUFHO0FBQ3BDLGNBQVMsRUFBRSxPQUFPLENBQUMsZUFBZSxDQUFDLEdBQUc7QUFDdEMsa0JBQWEsRUFBRSxPQUFPLENBQUMsbUJBQW1CLENBQUMsR0FBRztBQUM5QyxhQUFRLEVBQUUsT0FBTyxDQUFDLGNBQWMsQ0FBQyxHQUFHO0FBQ3BDLG9CQUFlLEVBQUUsT0FBTyxDQUFDLHFCQUFxQixDQUFDLEdBQUc7QUFDbEQsVUFBSyxFQUFFLE9BQU8sQ0FBQyxXQUFXLENBQUMsR0FBRztLQUM5QjtBQUNELFlBQVEsRUFBRTtBQUNULG1CQUFjLEVBQUUsUUFBUSxDQUFDLG9CQUFvQixDQUFDLEdBQUc7QUFDakQsa0JBQWEsRUFBRSxRQUFRLENBQUMsbUJBQW1CLENBQUMsR0FBRztBQUMvQyxpQkFBWSxFQUFFLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHO0tBQzdDO0FBQ0QsU0FBSyxFQUFFO0FBQ04saUJBQVksRUFBRSxLQUFLLENBQUMsa0JBQWtCLENBQUMsR0FBRztBQUMxQyxhQUFRLEVBQUUsS0FBSyxDQUFDLGNBQWMsQ0FBQyxHQUFHO0FBQ2xDLFdBQU0sRUFBRSxLQUFLLENBQUMsWUFBWSxDQUFDLEdBQUc7S0FDOUI7SUFDRDs7eUJBM0NZLFVBQVUiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9jbGllbnQtYnJvd3Nlci1lbnZpcm9ubWVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=