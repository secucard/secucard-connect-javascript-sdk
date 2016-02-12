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
                services: [Auth.SessionService, Document.UploadService, General.SkeletonService, General.AccountService, General.AccountDeviceService, General.ContactService, General.DeliveryAddressService, General.FileAccessService, General.MerchantService, General.NewsService, General.NotificationService, General.PublicMerchantService, General.StoreGroupService, General.StoreService, General.TransactionService, Loyalty.ActionActionService, Loyalty.ActionProfileService, Loyalty.BeaconService, Loyalty.CardGroupService, Loyalty.CardService, Loyalty.ChargeService, Loyalty.CheckinService, Loyalty.CustomerService, Loyalty.MerchantCardService, Loyalty.ProgramService, Loyalty.ProgramSpecialService, Loyalty.SaleService, Loyalty.StoreGroupService, Payment.ContainerService, Payment.ContractService, Payment.CustomerService, Payment.SecupayDebitService, Payment.SecupayPrepayService, Payment.TransactionService, Services.IdentCaseService, Services.IdentContractService, Services.IdentRequestService, Services.IdentResultService, Smart.CheckinService, Smart.DeviceService, Smart.IdentService, Smart.RoutingService, Smart.TransactionService]
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
                    ActionActions: Loyalty.ActionActionService.Uid,
                    ActionProfiles: Loyalty.ActionProfileService.Uid,
                    Beacons: Loyalty.BeaconService.Uid,
                    CardGroups: Loyalty.CardGroupService.Uid,
                    Cards: Loyalty.CardService.Uid,
                    Charges: Loyalty.ChargeService.Uid,
                    Checkins: Loyalty.CheckinService.Uid,
                    Customers: Loyalty.CustomerService.Uid,
                    MerchantCards: Loyalty.MerchantCardService.Uid,
                    Programs: Loyalty.ProgramService.Uid,
                    ProrgamSpecials: Loyalty.ProgramSpecialService.Uid,
                    Sales: Loyalty.SaleService.Uid,
                    StoreGroups: Loyalty.StoreGroupService.Uid
                },
                Payment: {
                    Containers: Payment.ContainerService.Uid,
                    Contracts: Payment.ContractService.Uid,
                    Customers: Payment.CustomerService.Uid,
                    SecupayDebits: Payment.SecupayDebitService.Uid,
                    SecupayPrepays: Payment.SecupayPrepayService.Uid,
                    Transactions: Payment.TransactionService.Uid
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvY2xpZW50LWJyb3dzZXItZW52aXJvbm1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OytHQXNCYSx3QkFBd0IsRUFxRXhCLFVBQVU7Ozs4QkFoRmYsS0FBSzs7c0RBQ0wsZUFBZTs7NkNBQ2YsT0FBTzs7dUNBQ1AsS0FBSzs7NkNBQ0wsT0FBTzs7NkNBQ1AsT0FBTzs7Z0RBQ1AsUUFBUTs7Z0RBQ1IsUUFBUTs7b0NBQ1IsSUFBSTs7a0RBQ0osaUJBQWlCOzs7QUFFWixvQ0FBd0IsR0FBRztBQUNwQyxzQkFBTSxFQUFFO0FBQ0osNkJBQVMsRUFBRSxLQUFLO0FBQ2hCLGlDQUFhLEVBQUUsa0JBQWtCO2lCQUNwQztBQUNELHdCQUFRLEVBQUUsQ0FDTixJQUFJLENBQUMsY0FBYyxFQUVuQixRQUFRLENBQUMsYUFBYSxFQUV0QixPQUFPLENBQUMsZUFBZSxFQUN2QixPQUFPLENBQUMsY0FBYyxFQUN0QixPQUFPLENBQUMsb0JBQW9CLEVBQzVCLE9BQU8sQ0FBQyxjQUFjLEVBQ3RCLE9BQU8sQ0FBQyxzQkFBc0IsRUFDOUIsT0FBTyxDQUFDLGlCQUFpQixFQUN6QixPQUFPLENBQUMsZUFBZSxFQUN2QixPQUFPLENBQUMsV0FBVyxFQUNuQixPQUFPLENBQUMsbUJBQW1CLEVBQzNCLE9BQU8sQ0FBQyxxQkFBcUIsRUFDN0IsT0FBTyxDQUFDLGlCQUFpQixFQUN6QixPQUFPLENBQUMsWUFBWSxFQUNwQixPQUFPLENBQUMsa0JBQWtCLEVBRTFCLE9BQU8sQ0FBQyxtQkFBbUIsRUFDM0IsT0FBTyxDQUFDLG9CQUFvQixFQUM1QixPQUFPLENBQUMsYUFBYSxFQUNyQixPQUFPLENBQUMsZ0JBQWdCLEVBQ3hCLE9BQU8sQ0FBQyxXQUFXLEVBQ25CLE9BQU8sQ0FBQyxhQUFhLEVBQ3JCLE9BQU8sQ0FBQyxjQUFjLEVBQ3RCLE9BQU8sQ0FBQyxlQUFlLEVBQ3ZCLE9BQU8sQ0FBQyxtQkFBbUIsRUFDM0IsT0FBTyxDQUFDLGNB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