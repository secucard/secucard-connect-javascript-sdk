System.register(['./net/stomp', './net/socket/socket-browser', './product/general/general', './product/smart/smart', './product/loyalty/loyalty', './product/payment/payment', './product/services/services', './product/document/document', './product/auth/auth'], function (_export) {
	'use strict';

	var Stomp, SocketAtBrowser, General, Smart, Loyalty, Payment, Services, Document, Auth, ClientBrowserEnvironment, ServiceMap;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvY2xpZW50LWJyb3dzZXItZW52aXJvbm1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3lGQXFCYSx3QkFBd0IsRUF1RHhCLFVBQVU7OztxQkFqRWYsS0FBSzs7NkNBQ0wsZUFBZTs7b0NBQ2YsT0FBTzs7OEJBQ1AsS0FBSzs7b0NBQ0wsT0FBTzs7b0NBQ1AsT0FBTzs7dUNBQ1AsUUFBUTs7dUNBQ1IsUUFBUTs7MkJBQ1IsSUFBSTs7O0FBRUMsMkJBQXdCLEdBQUc7QUFDdkMsVUFBTSxFQUFFO0FBQ1AsY0FBUyxFQUFFLEtBQUs7QUFDaEIsa0JBQWEsRUFBRSxrQkFBa0I7S0FDakM7QUFDRCxZQUFRLEVBQUUsQ0FDVCxJQUFJLENBQUMsY0FBYyxFQUVuQixRQUFRLENBQUMsYUFBYSxFQUV0QixPQUFPLENBQUMsZUFBZSxFQUN2QixPQUFPLENBQUMsY0FBYyxFQUN0QixPQUFPLENBQUMsb0JBQW9CLEVBQzVCLE9BQU8sQ0FBQyxjQUFjLEVBQ3RCLE9BQU8sQ0FBQyxzQkFBc0IsRUFDOUIsT0FBTyxDQUFDLGlCQUFpQixFQUN6QixPQUFPLENBQUMsZUFBZSxFQUN2QixPQUFPLENBQUMsV0FBVyxFQUNuQixPQUFPLENBQUMsbUJBQW1CLEVBQzNCLE9BQU8sQ0FBQyxxQkFBcUIsRUFDN0IsT0FBTyxDQUFDLFlBQVksRUFDcEIsT0FBTyxDQUFDLGtCQUFrQixFQUUxQixPQUFPLENBQUMsYUFBYSxFQUNyQixPQUFPLENBQUMsZ0JBQWdCLEVBQ3hCLE9BQU8sQ0FBQyxXQUFXLEVBQ25CLE9BQU8sQ0FBQyxhQUFhLEVBQ3JCLE9BQU8sQ0FBQyxjQUFjLEVBQ3RCLE9BQU8sQ0FBQyxlQUFlLEVBQ3ZCLE9BQU8sQ0FBQyxtQkFBbUIsRUFDM0IsT0FBTyxDQUFDLGNBQWMsRUFDdEIsT0FBTyxDQUFDLHFCQUFxQixFQUM3QixPQUFPLENBQUMsV0FBVyxFQUVuQixPQUFPLENBQUMsZ0JBQWdCLEVBQ3hCLE9BQU8sQ0FBQyxl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