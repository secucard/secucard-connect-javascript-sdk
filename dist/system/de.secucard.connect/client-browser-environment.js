System.register(['./net/stomp', './net/socket/socket-browser', './product/general/general', './product/smart/smart', './product/loyalty/loyalty', './product/payment/payment', './product/prepaid/prepaid', './product/services/services', './product/document/document', './product/auth/auth', './auth/token-storage', './product/clearing/clearing', './product/cardprocessing/cardprocessing'], function (_export) {
    'use strict';

    var Stomp, SocketAtBrowser, General, Smart, Loyalty, Payment, Prepaid, Services, Document, Auth, TokenStorageInMem, Clearing, Cardprocessing, ClientBrowserEnvironment, ServiceMap;
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
            ClientBrowserEnvironment = {
                config: {
                    stompPort: 15671,
                    stompEndpoint: '/stomp/websocket'
                },
                services: [Auth.SessionService, Cardprocessing.InvoiceService, Cardprocessing.TransactionService, Clearing.SepaInbatchsService, Clearing.SepaInrecordsService, Clearing.SepaOutbatchsService, Clearing.SepaOutrecordsService, Document.UploadService, General.SkeletonService, General.AccountService, General.AccountDeviceService, General.AccountInvitationService, General.ContactService, General.ContractService, General.DeliveryAddressService, General.DeviceService, General.FileAccessService, General.MerchantService, General.NewsService, General.NotificationService, General.PublicMerchantService, General.StoreGroupService, General.StoreService, General.TransactionService, Loyalty.ActionService, Loyalty.ActionProfileService, Loyalty.ActionMessageService, Loyalty.ActionCampaignService, Loyalty.ActionConfigService, Loyalty.BeaconService, Loyalty.CardGroupService, Loyalty.CardService, Loyalty.ChargeService, Loyalty.CheckinService, Loyalty.CustomerService, Loyalty.MerchantCardService, Loyalty.PaymentContainerService, Loyalty.ProgramService, Loyalty.ProgramSpecialService, Loyalty.ReportService, Loyalty.SaleService, Loyalty.StoreGroupService, Loyalty.TransactionService, Payment.ContainerService, Payment.ContractService, Payment.CustomerService, Payment.EterminalTransactionService, Payment.InvoiceService, Payment.PayoutService, Payment.SecupayDebitService, Payment.SecupayPayoutService, Payment.SecupayPrepayService, Payment.TransactionService, Payment.TransactionHistoriesService, Prepaid.ContractService, Prepaid.ItemGroupService, Prepaid.ItemService, Prepaid.ReportService, Prepaid.SaleService, Prepaid.StockService, Services.IdentCaseService, Services.IdentContractService, Services.IdentRequestService, Services.IdentResultService, Smart.CheckinService, Smart.ConfigurationService, Smart.DeviceService, Smart.DeviceHistoriesService, Smart.IdentService, Smart.RoutingService, Smart.TransactionService]
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
                    EterminalTransactions: Payment.EterminalTransactionService.Uid,
                    Invoices: Payment.InvoiceService.Uid,
                    Payouts: Payment.PayoutService.Uid,
                    SecupayDebits: Payment.SecupayDebitService.Uid,
                    SecupayPayout: Payment.SecupayPayoutService.Uid,
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvY2xpZW50LWJyb3dzZXItZW52aXJvbm1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2tKQXlCYSx3QkFBd0IsRUFvR3hCLFVBQVU7Ozs4QkFsSGYsS0FBSzs7c0RBQ0wsZUFBZTs7NkNBQ2YsT0FBTzs7dUNBQ1AsS0FBSzs7NkNBQ0wsT0FBTzs7NkNBQ1AsT0FBTzs7NkNBQ1AsT0FBTzs7Z0RBQ1AsUUFBUTs7Z0RBQ1IsUUFBUTs7b0NBQ1IsSUFBSTs7a0RBQ0osaUJBQWlCOztnREFDakIsUUFBUTs7a0VBQ1IsY0FBYzs7O0FBRVQsb0NBQXdCLEdBQUc7QUFDcEMsc0JBQU0sRUFBRTtBQUNKLDZCQUFTLEVBQUUsS0FBSztBQUNoQixpQ0FBYSxFQUFFLGtCQUFrQjtpQkFDcEM7QUFDRCx3QkFBUSxFQUFFLENBQ04sSUFBSSxDQUFDLGNBQWMsRUFFbkIsY0FBYyxDQUFDLGNBQWMsRUFDN0IsY0FBYyxDQUFDLGtCQUFrQixFQUVqQyxRQUFRLENBQUMsbUJBQW1CLEVBQzVCLFFBQVEsQ0FBQyxvQkFBb0IsRUFDN0IsUUFBUSxDQUFDLG9CQUFvQixFQUM3QixRQUFRLENBQUMscUJBQXFCLEVBRTlCLFFBQVEsQ0FBQyxhQUFhLEVBRXRCLE9BQU8sQ0FBQyxlQUFlLEVBQ3ZCLE9BQU8sQ0FBQyxjQUFjLEVBQ3RCLE9BQU8sQ0FBQyxvQkFBb0IsRUFDNUIsT0FBTyxDQUFDLHdCQUF3QixFQUNoQyxPQUFPLENBQUMsY0FBYyxFQUN0QixPQUFPLENBQUMsZUFBZSxFQUN2QixPQUFPLENBQUMsc0JBQXNCLEVBQzlCLE9BQU8sQ0FBQyxhQUFhLEVBQ3JCLE9BQU8sQ0FBQyxpQkFBaUIsRUFDekIsT0FBTyxDQUFDLGVBQWUsRUFDdkIsT0FBTyxDQUFDLFdBQVcsRUFDbkIsT0FBTyxDQUFDLG1CQUFtQixFQUMzQixPQUFPLENBQUMscUJBQXFCLEVBQzdCLE9BQU8sQ0FBQyxpQkFBaUIsRUFDekIsT0FBTyxDQUFDLFlBQVks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QUFHO0FBQzlDLGlDQUFhLEVBQUUsT0FBTyxDQUFDLG9CQUFvQixDQUFDLEdBQUc7QUFDL0Msa0NBQWMsRUFBRSxPQUFPLENBQUMsb0JBQW9CLENBQUMsR0FBRztBQUNoRCxnQ0FBWSxFQUFFLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHO0FBQzVDLHdDQUFvQixFQUFFLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQyxHQUFHO2lCQUNoRTtBQUNELHVCQUFPLEVBQUM7QUFDSiw2QkFBUyxFQUFFLE9BQU8sQ0FBQyxlQUFlLENBQUMsR0FBRztBQUN0Qyw4QkFBVSxFQUFFLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHO0FBQ3hDLHlCQUFLLEVBQUUsT0FBTyxDQUFDLFdBQVcsQ0FBQyxHQUFHO0FBQzlCLDJCQUFPLEVBQUUsT0FBTyxDQUFDLGFBQWEsQ0FBQyxHQUFHO0FBQ2xDLHlCQUFLLEVBQUUsT0FBTyxDQUFDLFdBQVcsQ0FBQyxHQUFHO0FBQzlCLDBCQUFNLEVBQUUsT0FBTyxDQUFDLFlBQVksQ0FBQyxHQUFHO2lCQUNuQztBQUNELHdCQUFRLEVBQUU7QUFDTiw4QkFBVSxFQUFFLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHO0FBQ3pDLGtDQUFjLEVBQUUsUUFBUSxDQUFDLG9CQUFvQixDQUFDLEdBQUc7QUFDakQsaUNBQWEsRUFBRSxRQUFRLENBQUMsbUJBQW1CLENBQUMsR0FBRztBQUMvQyxnQ0FBWSxFQUFFLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHO2lCQUNoRDtBQUNELHFCQUFLLEVBQUU7QUFDSCw0QkFBUSxFQUFFLEtBQUssQ0FBQyxjQUFjLENBQUMsR0FBRztBQUNsQyxrQ0FBYyxFQUFFLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHO0FBQzlDLDJCQUFPLEVBQUUsS0FBSyxDQUFDLGFBQWEsQ0FBQyxHQUFHO0FBQ2hDLG1DQUFlLEVBQUUsS0FBSyxDQUFDLHNCQUFzQixDQUFDLEdBQUc7QUFDakQsMEJBQU0sRUFBRSxLQUFLLENBQUMsWUFBWSxDQUFDLEdBQUc7QUFDOUIsNEJBQVEsRUFBRSxLQUFLLENBQUMsY0FBYyxDQUFDLEdBQUc7QUFDbEMsZ0NBQVksRUFBRSxLQUFLLENBQUMsa0JBQWtCLENBQUMsR0FBRztpQkFDN0M7YUFDSiIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L2NsaWVudC1icm93c2VyLWVudmlyb25tZW50LmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==
