System.register(['./net/stomp', './net/socket/socket-node', './product/general/general', './product/smart/smart', './product/loyalty/loyalty', './product/payment/payment', './product/prepaid/prepaid', './product/services/services', './product/document/document', './product/auth/auth', './auth/token-storage', './product/clearing/clearing', './product/cardprocessing/cardprocessing'], function (_export) {
    'use strict';

    var Stomp, SocketAtNode, General, Smart, Loyalty, Payment, Prepaid, Services, Document, Auth, TokenStorageInMem, Clearing, Cardprocessing, ClientNodeEnvironment, ServiceMap;
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
        }, function (_productPrepaidPrepaid) {
            Prepaid = _productPrepaidPrepaid.Prepaid;
        }, function (_productServicesServices) {
            Services = _productServicesServices.Services;
        }, function (_productDocumentDocument) {
            Document = _productDocumentDocument.Document;
        }, function (_productAuthAuth) {
            Auth = _productAuthAuth.Auth;
        }, function (_authTokenStorage) {
            TokenStorageInMem = _authTokenStorage.TokenStorageInMem;
        }, function (_productClearingClearing) {
            Clearing = _productClearingClearing.Clearing;
        }, function (_productCardprocessingCardprocessing) {
            Cardprocessing = _productCardprocessingCardprocessing.Cardprocessing;
        }],
        execute: function () {
            ClientNodeEnvironment = {
                config: {
                    stompPort: 61614
                },
                services: [Auth.SessionService, Cardprocessing.InvoiceService, Cardprocessing.TransactionService, Clearing.SepaInbatchsService, Clearing.SepaInrecordsService, Clearing.SepaOutbatchsService, Clearing.SepaOutrecordsService, Document.UploadService, General.SkeletonService, General.AccountService, General.AccountDeviceService, General.AccountInvitationService, General.ContactService, General.ContractService, General.DeliveryAddressService, General.DeviceService, General.FileAccessService, General.MerchantService, General.NewsService, General.NotificationService, General.PublicMerchantService, General.StoreGroupService, General.StoreService, General.TransactionService, Loyalty.ActionService, Loyalty.ActionProfileService, Loyalty.ActionCampaignService, Loyalty.ActionMessageService, Loyalty.ActionConfigService, Loyalty.BeaconService, Loyalty.CardGroupService, Loyalty.CardService, Loyalty.ChargeService, Loyalty.CheckinService, Loyalty.CustomerService, Loyalty.MerchantCardService, Loyalty.PaymentContainerService, Loyalty.ProgramService, Loyalty.ProgramSpecialService, Loyalty.ReportService, Loyalty.SaleService, Loyalty.StoreGroupService, Loyalty.TransactionService, Payment.ContainerService, Payment.ContractService, Payment.CustomerService, Payment.InvoiceService, Payment.PayoutService, Payment.SecupayDebitService, Payment.SecupayPrepayService, Payment.TransactionService, Payment.TransactionHistoriesService, Prepaid.ContractService, Prepaid.ItemGroupService, Prepaid.ItemService, Prepaid.ReportService, Prepaid.SaleService, Prepaid.StockService, Services.IdentCaseService, Services.IdentContractService, Services.IdentRequestService, Services.IdentResultService, Smart.CheckinService, Smart.ConfigurationService, Smart.DeviceService, Smart.DeviceHistoriesService, Smart.IdentService, Smart.RoutingService, Smart.TransactionService]
            };

            _export('ClientNodeEnvironment', ClientNodeEnvironment);

            ClientNodeEnvironment.StompChannel = {
                create: function create() {
                    return new Stomp(SocketAtNode);
                }
            };

            ClientNodeEnvironment.TokenStorage = {
                create: function create() {
                    return new TokenStorageInMem();
                }
            };

            ServiceMap = {
                Auth: {
                    Sessions: Auth.SessionService.Uid
                },
                Cardprocessing: {
                    Invoices: Cardprocessing.InvoiceService.Uid,
                    Transactions: Cardprocessing.TransactionService.Uid
                },
                Clearing: {
                    SepaInbatchs: Clearing.SepaInbatchsService.Uid,
                    SepaInrecords: Clearing.SepaInrecordsService.Uid,
                    SepaOutbatchs: Clearing.SepaOutbatchsService.Uid,
                    SepaOutrecords: Clearing.SepaOutrecordsService.Uid
                },
                Document: {
                    Uploads: Document.UploadService.Uid
                },
                General: {
                    Skeletons: General.SkeletonService.Uid,
                    Accounts: General.AccountService.Uid,
                    AccountDevices: General.AccountDeviceService.Uid,
                    AccountInvitations: General.AccountInvitationService.Uid,
                    Contacts: General.ContactService.Uid,
                    Contracts: General.ContractService.Uid,
                    DeliveryAddresses: General.DeliveryAddressService.Uid,
                    Devices: General.DeviceService.Uid,
                    FileAccesses: General.FileAccessService.Uid,
                    Merchants: General.MerchantService.Uid,
                    News: General.NewsService.Uid,
                    Notifications: General.NotificationService.Uid,
                    PublicMerchants: General.PublicMerchantService.Uid,
                    StoreGroups: General.StoreGroupService.Uid,
                    Stores: General.StoreService.Uid,
                    Transactions: General.TransactionService.Uid
                },
                Loyalty: {
                    ActionCampaigns: Loyalty.ActionCampaignService.Uid,
                    ActionConfigs: Loyalty.ActionConfigService.Uid,
                    ActionMessages: Loyalty.ActionMessageService.Uid,
                    ActionProfiles: Loyalty.ActionProfileService.Uid,
                    Actions: Loyalty.ActionService.Uid,
                    Beacons: Loyalty.BeaconService.Uid,
                    CardGroups: Loyalty.CardGroupService.Uid,
                    Cards: Loyalty.CardService.Uid,
                    Charges: Loyalty.ChargeService.Uid,
                    Checkins: Loyalty.CheckinService.Uid,
                    Customers: Loyalty.CustomerService.Uid,
                    MerchantCards: Loyalty.MerchantCardService.Uid,
                    PaymentContainers: Loyalty.PaymentContainerService.Uid,
                    Programs: Loyalty.ProgramService.Uid,
                    ProrgamSpecials: Loyalty.ProgramSpecialService.Uid,
                    Reports: Loyalty.ReportService.Uid,
                    Sales: Loyalty.SaleService.Uid,
                    StoreGroups: Loyalty.StoreGroupService.Uid,
                    Transactions: Loyalty.TransactionService.Uid
                },
                Payment: {
                    Containers: Payment.ContainerService.Uid,
                    Contracts: Payment.ContractService.Uid,
                    Customers: Payment.CustomerService.Uid,
                    Invoices: Payment.InvoiceService.Uid,
                    Payouts: Payment.PayoutService.Uid,
                    SecupayDebits: Payment.SecupayDebitService.Uid,
                    SecupayPrepays: Payment.SecupayPrepayService.Uid,
                    Transactions: Payment.TransactionService.Uid,
                    TransactionHistories: Payment.TransactionHistoriesService.Uid
                },
                Prepaid: {
                    Contracts: Prepaid.ContractService.Uid,
                    ItemGroups: Prepaid.ItemGroupService.Uid,
                    Items: Prepaid.ItemService.Uid,
                    Reports: Prepaid.ReportService.Uid,
                    Sales: Prepaid.SaleService.Uid,
                    Stocks: Prepaid.StockService.Uid
                },
                Services: {
                    IdentCases: Services.IdentCaseService.Uid,
                    IdentContracts: Services.IdentContractService.Uid,
                    IdentRequests: Services.IdentRequestService.Uid,
                    IdentResults: Services.IdentResultService.Uid
                },
                Smart: {
                    Checkins: Smart.CheckinService.Uid,
                    Configurations: Smart.ConfigurationService.Uid,
                    Devices: Smart.DeviceService.Uid,
                    DeviceHistories: Smart.DeviceHistoriesService.Uid,
                    Idents: Smart.IdentService.Uid,
                    Routings: Smart.RoutingService.Uid,
                    Transactions: Smart.TransactionService.Uid
                }
            };

            _export('ServiceMap', ServiceMap);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvY2xpZW50LW5vZGUtZW52aXJvbm1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OytJQXlCYSxxQkFBcUIsRUFpR3JCLFVBQVU7Ozs4QkEvR2YsS0FBSzs7Z0RBQ0wsWUFBWTs7NkNBQ1osT0FBTzs7dUNBQ1AsS0FBSzs7NkNBQ0wsT0FBTzs7NkNBQ1AsT0FBTzs7NkNBQ1AsT0FBTzs7Z0RBQ1AsUUFBUTs7Z0RBQ1IsUUFBUTs7b0NBQ1IsSUFBSTs7a0RBQ0osaUJBQWlCOztnREFDakIsUUFBUTs7a0VBQ1IsY0FBYzs7O0FBRVQsaUNBQXFCLEdBQUc7QUFDakMsc0JBQU0sRUFBRTtBQUNKLDZCQUFTLEVBQUUsS0FBSztpQkFDbkI7QUFDRCx3QkFBUSxFQUFFLENBQ04sSUFBSSxDQUFDLGNBQWMsRUFFbkIsY0FBYyxDQUFDLGNBQWMsRUFDN0IsY0FBYyxDQUFDLGtCQUFrQixFQUVqQyxRQUFRLENBQUMsbUJBQW1CLEVBQzVCLFFBQVEsQ0FBQyxvQkFBb0IsRUFDN0IsUUFBUSxDQUFDLG9CQUFvQixFQUM3QixRQUFRLENBQUMscUJBQXFCLEVBRTlCLFFBQVEsQ0FBQyxhQUFhLEVBRXRCLE9BQU8sQ0FBQyxlQUFlLEVBQ3ZCLE9BQU8sQ0FBQyxjQUFjLEVBQ3RCLE9BQU8sQ0FBQyxvQkFBb0IsRUFDNUIsT0FBTyxDQUFDLHdCQUF3QixFQUNoQyxPQUFPLENBQUMsY0FBYyxFQUN0QixPQUFPLENBQUMsZUFBZSxFQUN2QixPQUFPLENBQUMsc0JBQXNCLEVBQzlCLE9BQU8sQ0FBQyxhQUFhLEVBQ3JCLE9BQU8sQ0FBQyxpQkFBaUIsRUFDekIsT0FBTyxDQUFDLGVBQWUsRUFDdkIsT0FBTyxDQUFDLFdBQVcsRUFDbkIsT0FBTyxDQUFDLG1CQUFtQixFQUMzQixPQUFPLENBQUMscUJBQXFCLEVBQzdCLE9BQU8sQ0FBQyxpQkFBaUIsRUFDekIsT0FBTyxDQUFDLFlBQVksRUFDcEIsT0FBTyxDQUFDLGtCQUFrQixFQUUx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QywyQkFBMkIsQ0FBQyxHQUFHO2lCQUNoRTtBQUNELHVCQUFPLEVBQUM7QUFDSiw2QkFBUyxFQUFFLE9BQU8sQ0FBQyxlQUFlLENBQUMsR0FBRztBQUN0Qyw4QkFBVSxFQUFFLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHO0FBQ3hDLHlCQUFLLEVBQUUsT0FBTyxDQUFDLFdBQVcsQ0FBQyxHQUFHO0FBQzlCLDJCQUFPLEVBQUUsT0FBTyxDQUFDLGFBQWEsQ0FBQyxHQUFHO0FBQ2xDLHlCQUFLLEVBQUUsT0FBTyxDQUFDLFdBQVcsQ0FBQyxHQUFHO0FBQzlCLDBCQUFNLEVBQUUsT0FBTyxDQUFDLFlBQVksQ0FBQyxHQUFHO2lCQUNuQztBQUNELHdCQUFRLEVBQUU7QUFDTiw4QkFBVSxFQUFFLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHO0FBQ3pDLGtDQUFjLEVBQUUsUUFBUSxDQUFDLG9CQUFvQixDQUFDLEdBQUc7QUFDakQsaUNBQWEsRUFBRSxRQUFRLENBQUMsbUJBQW1CLENBQUMsR0FBRztBQUMvQyxnQ0FBWSxFQUFFLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHO2lCQUNoRDtBQUNELHFCQUFLLEVBQUU7QUFDSCw0QkFBUSxFQUFFLEtBQUssQ0FBQyxjQUFjLENBQUMsR0FBRztBQUNsQyxrQ0FBYyxFQUFFLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHO0FBQzlDLDJCQUFPLEVBQUUsS0FBSyxDQUFDLGFBQWEsQ0FBQyxHQUFHO0FBQ2hDLG1DQUFlLEVBQUUsS0FBSyxDQUFDLHNCQUFzQixDQUFDLEdBQUc7QUFDakQsMEJBQU0sRUFBRSxLQUFLLENBQUMsWUFBWSxDQUFDLEdBQUc7QUFDOUIsNEJBQVEsRUFBRSxLQUFLLENBQUMsY0FBYyxDQUFDLEdBQUc7QUFDbEMsZ0NBQVksRUFBRSxLQUFLLENBQUMsa0JBQWtCLENBQUMsR0FBRztpQkFDN0M7YUFDSiIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L2NsaWVudC1ub2RlLWVudmlyb25tZW50LmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==
