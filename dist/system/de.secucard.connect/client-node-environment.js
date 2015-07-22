System.register(['./net/stomp', './net/socket/socket-node', './product/general/general', './product/smart/smart', './product/loyalty/loyalty', './product/payment/payment', './product/services/services', './product/document/document'], function (_export) {
	'use strict';

	var Stomp, SocketAtNode, General, Smart, Loyalty, Payment, Services, Document, ClientNodeEnvironment, ServiceMap;
	return {
		setters: [function (_netStomp) {
			Stomp = _netStomp.Stomp;
		}, function (_netSocketSocketNode) {
			SocketAtNode = _netSocketSocketNode.SocketAtNode;
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
		}],
		execute: function () {
			ClientNodeEnvironment = {
				config: {
					stompPort: 61614
				},
				services: [Document.UploadService, General.SkeletonService, General.AccountService, General.AccountDeviceService, General.ContactService, General.DeliveryAddressService, General.FileAccessService, General.MerchantService, General.NewsService, General.NotificationService, General.PublicMerchantService, General.StoreService, General.TransactionService, Loyalty.BeaconService, Loyalty.CardGroupService, Loyalty.CardService, Loyalty.ChargeService, Loyalty.CheckinService, Loyalty.CustomerService, Loyalty.MerchantCardService, Loyalty.ProgramService, Loyalty.ProgramSpecialService, Loyalty.SaleService, Payment.ContainerService, Payment.ContractService, Payment.CustomerService, Payment.SecupayDebitService, Payment.SecupayPrepayService, Services.IdentContractService, Services.IdentRequestService, Services.IdentResultService, Smart.TransactionService, Smart.IdentService, Smart.CheckinService]
			};

			_export('ClientNodeEnvironment', ClientNodeEnvironment);

			ClientNodeEnvironment.StompChannel = {
				create: function create() {
					return new Stomp(SocketAtNode);
				}
			};

			ServiceMap = {
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
				Payment: {
					Containers: Payment.ContainerService.Uid,
					Contracts: Payment.ContractService.Uid,
					Customers: Payment.CustomerService.Uid,
					SecupayDebits: Payment.SecupayDebitService.Uid,
					SecupayPrepays: Payment.SecupayPrepayService.Uid
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvY2xpZW50LW5vZGUtZW52aXJvbm1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2dGQVNhLHFCQUFxQixFQW9EckIsVUFBVTs7O3FCQTdEZixLQUFLOzt1Q0FDTCxZQUFZOztvQ0FDWixPQUFPOzs4QkFDUCxLQUFLOztvQ0FDTCxPQUFPOztvQ0FDUCxPQUFPOzt1Q0FDUCxRQUFROzt1Q0FDUixRQUFROzs7QUFFSCx3QkFBcUIsR0FBRztBQUNwQyxVQUFNLEVBQUU7QUFDUCxjQUFTLEVBQUUsS0FBSztLQUNoQjtBQUNELFlBQVEsRUFBRSxDQUNULFFBQVEsQ0FBQyxhQUFhLEVBRXRCLE9BQU8sQ0FBQyxlQUFlLEVBQ3ZCLE9BQU8sQ0FBQyxjQUFjLEVBQ3RCLE9BQU8sQ0FBQyxvQkFBb0IsRUFDNUIsT0FBTyxDQUFDLGNBQWMsRUFDdEIsT0FBTyxDQUFDLHNCQUFzQixFQUM5QixPQUFPLENBQUMsaUJBQWlCLEVBQ3pCLE9BQU8sQ0FBQyxlQUFlLEVBQ3ZCLE9BQU8sQ0FBQyxXQUFXLEVBQ25CLE9BQU8sQ0FBQyxtQkFBbUIsRUFDM0IsT0FBTyxDQUFDLHFCQUFxQixFQUM3QixPQUFPLENBQUMsWUFBWSxFQUNwQixPQUFPLENBQUMsa0JBQWtCLEVBRTFCLE9BQU8sQ0FBQyxhQUFhLEVBQ3JCLE9BQU8sQ0FBQyxnQkFBZ0IsRUFDeEIsT0FBTyxDQUFDLFdBQVcsRUFDbkIsT0FBTyxDQUFDLGFBQWEsRUFDckIsT0FBTyxDQUFDLGNBQWMsRUFDdEIsT0FBTyxDQUFDLGVBQWUsRUFDdkIsT0FBTyxDQUFDLG1CQUFtQixFQUMzQixPQUFPLENBQUMsY0FBYyxFQUN0QixPQUFPLENBQUMscUJBQXFCLEVBQzdCLE9BQU8sQ0FBQyxXQUFXLEVBRW5CLE9BQU8sQ0FBQyxnQkFBZ0IsRUFDeEIsT0FBTyxDQUFDLGVBQWUsRUFDdkIsT0FBTyxDQUFDLGVBQWUsRUFDdkIsT0FBTyxDQUFDLG1CQUFtQixFQUMzQixPQUFPLENB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