System.register(['./net/stomp', './net/socket/socket-browser', './product/general/general', './product/smart/smart', './product/loyalty/loyalty', './product/payment/payment', './product/prepaid/prepaid', './product/services/services', './product/document/document', './product/auth/auth', './auth/token-storage'], function (_export) {
    'use strict';

    var Stomp, SocketAtBrowser, General, Smart, Loyalty, Payment, Prepaid, Services, Document, Auth, TokenStorageInMem, ClientBrowserEnvironment, ServiceMap;
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
        }],
        execute: function () {
            ClientBrowserEnvironment = {
                config: {
                    stompPort: 15671,
                    stompEndpoint: '/stomp/websocket'
                },
                services: [Auth.SessionService, Document.UploadService, General.SkeletonService, General.AccountService, General.AccountDeviceService, General.ContactService, General.DeliveryAddressService, General.FileAccessService, General.MerchantService, General.NewsService, General.NotificationService, General.PublicMerchantService, General.StoreGroupService, General.StoreService, General.TransactionService, Loyalty.ActionService, Loyalty.ActionProfileService, Loyalty.ActionMessageService, Loyalty.ActionCampaignService, Loyalty.ActionConfigService, Loyalty.BeaconService, Loyalty.CardGroupService, Loyalty.CardService, Loyalty.ChargeService, Loyalty.CheckinService, Loyalty.CustomerService, Loyalty.MerchantCardService, Loyalty.PaymentContainerService, Loyalty.ProgramService, Loyalty.ProgramSpecialService, Loyalty.ReportService, Loyalty.SaleService, Loyalty.StoreGroupService, Loyalty.TransactionService, Payment.ContainerService, Payment.ContractService, Payment.CustomerService, Payment.SecupayDebitService, Payment.SecupayPrepayService, Payment.TransactionService, Prepaid.ContractService, Prepaid.ItemGroupService, Prepaid.ItemService, Prepaid.SaleService, Prepaid.StockService, Services.IdentCaseService, Services.IdentContractService, Services.IdentRequestService, Services.IdentResultService, Smart.CheckinService, Smart.DeviceService, Smart.IdentService, Smart.RoutingService, Smart.TransactionService]
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
                    SecupayDebits: Payment.SecupayDebitService.Uid,
                    SecupayPrepays: Payment.SecupayPrepayService.Uid,
                    Transactions: Payment.TransactionService.Uid
                },
                Prepaid: {
                    Contracts: Prepaid.ContractService.Uid,
                    ItemGroups: Prepaid.ItemGroupService.Uid,
                    Items: Prepaid.ItemService.Uid,
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
                    Devices: Smart.DeviceService.Uid,
                    Idents: Smart.IdentService.Uid,
                    Routings: Smart.RoutingService.Uid,
                    Transactions: Smart.TransactionService.Uid
                }
            };

            _export('ServiceMap', ServiceMap);
        }
    };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvY2xpZW50LWJyb3dzZXItZW52aXJvbm1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3dIQXVCYSx3QkFBd0IsRUFpRnhCLFVBQVU7Ozs4QkE3RmYsS0FBSzs7c0RBQ0wsZUFBZTs7NkNBQ2YsT0FBTzs7dUNBQ1AsS0FBSzs7NkNBQ0wsT0FBTzs7NkNBQ1AsT0FBTzs7NkNBQ1AsT0FBTzs7Z0RBQ1AsUUFBUTs7Z0RBQ1IsUUFBUTs7b0NBQ1IsSUFBSTs7a0RBQ0osaUJBQWlCOzs7QUFFWixvQ0FBd0IsR0FBRztBQUNwQyxzQkFBTSxFQUFFO0FBQ0osNkJBQVMsRUFBRSxLQUFLO0FBQ2hCLGlDQUFhLEVBQUUsa0JBQWtCO2lCQUNwQztBQUNELHdCQUFRLEVBQUUsQ0FDTixJQUFJLENBQUMsY0FBYyxFQUVuQixRQUFRLENBQUMsYUFBYSxFQUV0QixPQUFPLENBQUMsZUFBZSxFQUN2QixPQUFPLENBQUMsY0FBYyxFQUN0QixPQUFPLENBQUMsb0JBQW9CLEVBQzVCLE9BQU8sQ0FBQyxjQUFjLEVBQ3RCLE9BQU8sQ0FBQyxzQkFBc0IsRUFDOUIsT0FBTyxDQUFDLGlCQUFpQixFQUN6QixPQUFPLENBQUMsZUFBZSxFQUN2QixPQUFPLENBQUMsV0FBVyxFQUNuQixPQUFPLENBQUMsbUJBQW1CLEVBQzNCLE9BQU8sQ0FBQyxxQkFBcUIsRUFDN0IsT0FBTyxDQUFDLGlCQUFpQixFQUN6QixPQUFPLENBQUMsWUFBWSxFQUNwQixPQUFPLENBQUMsa0JBQWtCLEVBRTFCLE9BQU8sQ0FBQyxhQUFhLEVBQ3JCLE9BQU8sQ0FBQyxvQkFBb0IsRUFDNUIsT0FBTyxDQUFDLG9CQUFvQixFQUM1QixPQUFPLENBQUMscUJBQXFCLEVBQzdCLE9BQU8sQ0FBQyxtQkFBbUIsRUFDM0IsT0FBTyxDQUFDLGFBQWEsRUFDckIsT0FBTyxDQUFDLGdCQUFnQixFQUN4QixPQUFPLENBQUMsV0FBVyxFQUNuQixPQUFPLENBQUMsYUFBYSxFQUNy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TyxDQUFDLGtCQUFrQixDQUFDLEdBQUc7aUJBQy9DO0FBQ0QsdUJBQU8sRUFBQztBQUNKLDZCQUFTLEVBQUUsT0FBTyxDQUFDLGVBQWUsQ0FBQyxHQUFHO0FBQ3RDLDhCQUFVLEVBQUUsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEdBQUc7QUFDeEMseUJBQUssRUFBRSxPQUFPLENBQUMsV0FBVyxDQUFDLEdBQUc7QUFDOUIseUJBQUssRUFBRSxPQUFPLENBQUMsV0FBVyxDQUFDLEdBQUc7QUFDOUIsMEJBQU0sRUFBRSxPQUFPLENBQUMsWUFBWSxDQUFDLEdBQUc7aUJBQ25DO0FBQ0Qsd0JBQVEsRUFBRTtBQUNOLDhCQUFVLEVBQUUsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEdBQUc7QUFDekMsa0NBQWMsRUFBRSxRQUFRLENBQUMsb0JBQW9CLENBQUMsR0FBRztBQUNqRCxpQ0FBYSxFQUFFLFFBQVEsQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHO0FBQy9DLGdDQUFZLEVBQUUsUUFBUSxDQUFDLGtCQUFrQixDQUFDLEdBQUc7aUJBQ2hEO0FBQ0QscUJBQUssRUFBRTtBQUNILDRCQUFRLEVBQUUsS0FBSyxDQUFDLGNBQWMsQ0FBQyxHQUFHO0FBQ2xDLDJCQUFPLEVBQUUsS0FBSyxDQUFDLGFBQWEsQ0FBQyxHQUFHO0FBQ2hDLDBCQUFNLEVBQUUsS0FBSyxDQUFDLFlBQVksQ0FBQyxHQUFHO0FBQzlCLDRCQUFRLEVBQUUsS0FBSyxDQUFDLGNBQWMsQ0FBQyxHQUFHO0FBQ2xDLGdDQUFZLEVBQUUsS0FBSyxDQUFDLGtCQUFrQixDQUFDLEdBQUc7aUJBQzdDO2FBQ0oiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9jbGllbnQtYnJvd3Nlci1lbnZpcm9ubWVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=
