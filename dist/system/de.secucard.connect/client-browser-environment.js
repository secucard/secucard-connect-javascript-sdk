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
                services: [Auth.SessionService, Document.UploadService, General.SkeletonService, General.AccountService, General.AccountDeviceService, General.ContactService, General.DeliveryAddressService, General.FileAccessService, General.MerchantService, General.NewsService, General.NotificationService, General.PublicMerchantService, General.StoreService, General.TransactionService, Loyalty.ActionProfileService, Loyalty.BeaconService, Loyalty.CardGroupService, Loyalty.CardService, Loyalty.ChargeService, Loyalty.CheckinService, Loyalty.CustomerService, Loyalty.MerchantCardService, Loyalty.ProgramService, Loyalty.ProgramSpecialService, Loyalty.SaleService, Payment.ContainerService, Payment.ContractService, Payment.CustomerService, Payment.SecupayDebitService, Payment.SecupayPrepayService, Services.IdentContractService, Services.IdentRequestService, Services.IdentResultService, Smart.TransactionService, Smart.IdentService, Smart.CheckinService]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvY2xpZW50LWJyb3dzZXItZW52aXJvbm1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OytHQXNCYSx3QkFBd0IsRUE4RHhCLFVBQVU7Ozs4QkF6RWYsS0FBSzs7c0RBQ0wsZUFBZTs7NkNBQ2YsT0FBTzs7dUNBQ1AsS0FBSzs7NkNBQ0wsT0FBTzs7NkNBQ1AsT0FBTzs7Z0RBQ1AsUUFBUTs7Z0RBQ1IsUUFBUTs7b0NBQ1IsSUFBSTs7a0RBQ0osaUJBQWlCOzs7QUFFWixvQ0FBd0IsR0FBRztBQUNwQyxzQkFBTSxFQUFFO0FBQ0osNkJBQVMsRUFBRSxLQUFLO0FBQ2hCLGlDQUFhLEVBQUUsa0JBQWtCO2lCQUNwQztBQUNELHdCQUFRLEVBQUUsQ0FDTixJQUFJLENBQUMsY0FBYyxFQUVuQixRQUFRLENBQUMsYUFBYSxFQUV0QixPQUFPLENBQUMsZUFBZSxFQUN2QixPQUFPLENBQUMsY0FBYyxFQUN0QixPQUFPLENBQUMsb0JBQW9CLEVBQzVCLE9BQU8sQ0FBQyxjQUFjLEVBQ3RCLE9BQU8sQ0FBQyxzQkFBc0IsRUFDOUIsT0FBTyxDQUFDLGlCQUFpQixFQUN6QixPQUFPLENBQUMsZUFBZSxFQUN2QixPQUFPLENBQUMsV0FBVyxFQUNuQixPQUFPLENBQUMsbUJBQW1CLEVBQzNCLE9BQU8sQ0FBQyxxQkFBcUIsRUFDN0IsT0FBTyxDQUFDLFlBQVksRUFDcEIsT0FBTyxDQUFDLGtCQUFrQixFQUUxQixPQUFPLENBQUMsb0JBQW9CLEVBQzVCLE9BQU8sQ0FBQyxhQUFhLEVBQ3JCLE9BQU8sQ0FBQyxnQkFBZ0IsRUFDeEIsT0FBTyxDQUFDLFdBQVcsRUFDbkIsT0FBTyxDQUFDLGFBQWEsRUFDckIsT0FBTyxDQUFDLGNBQWMsRUFDdEIsT0FBTyxDQUFDLGVBQWUsRUFDdkIsT0FBTyxDQUFDLG1CQUFtQixFQUMzQixPQUFPLENBQUMsY0FBYyxFQUN0QixPQUFPLENBQUMscUJBQXFCLEVBQzdCLE9BQU8sQ0FBQyxXQUFXLEVBRW5CLE9BQU8sQ0FBQyxnQkFBZ0IsRUFDeEIsT0FBTyxDQUFDLGVBQWUsRUFDdkIsT0FBTyxDQUFDLGVBQWUsRUFDdkIsT0FBTyxDQUFDLG1CQUFtQixFQUMzQixPQUFPLENBQUMsb0JBQW9CLEVBRTVCLFFBQVEsQ0FBQyxvQkFBb0IsRUFDN0IsUUFBUSxDQUFDLG1CQUFtQixFQUM1QixRQUFRLENBQUMsa0JBQWtCLEVBRTNCLEtBQUssQ0FBQyxrQkFBa0IsRUFDeEIsS0FBSyxDQUFDLFlBQVksRUFDbEIsS0FBSyxDQUFDLGNBQWMsQ0FDdkI7YUFDSjs7Z0RBakRZLHdCQUF3Qjs7QUFrRHJDLG9DQUF3QixDQUFDLFlBQVksR0FBRztBQUNwQyxzQkFBTSxFQUFFLGtCQUFNO0FBQ1YsMkJBQU8sSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7aUJBQ3JDO2FBQ0osQ0FBQzs7QUFFRixvQ0FBd0IsQ0FBQyxZQUFZLEdBQUc7QUFDcEMsc0JBQU0sRUFBRSxrQkFBTTtBQUNWLDJCQUFPLElBQUksaUJBQWlCLEVBQUUsQ0FBQztpQkFDbEM7YUFDSixDQUFDOztBQUVXLHNCQUFVLEdBQUc7QUFDdEIsb0JBQUksRUFBRTtBQUNGLDRCQUFRLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHO2lCQUNwQztBQUNELHdCQUFRLEVBQUU7QUFDTiwyQkFBTyxFQUFFLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRztpQkFDdEM7QUFDRCx1QkFBTyxFQUFFO0FBQ0wsNkJBQVMsRUFBRSxPQUFPLENBQUMsZUFBZSxDQUFDLEdBQUc7QUFDdEMsNEJBQVEsRUFBRSxPQUFPLENBQUMsY0FBYyxDQUFDLEdBQUc7QUFDcEMsa0NBQWMsRUFBRSxPQUFPLENBQUMsb0JBQW9CLENBQUMsR0FBRztBQUNoRCw0QkFBUSxFQUFFLE9BQU8sQ0FBQyxjQUFjLENBQUMsR0FBRztBQUNwQyxxQ0FBaUIsRUFBRSxPQUFPLENBQUMsc0JBQXNCLENBQUMsR0FBRztBQUNyRCxnQ0FBWSxFQUFFLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHO0FBQzNDLDZCQUFTLEVBQUUsT0FBTyxDQUFDLGVBQWUsQ0FBQyxHQUFHO0FBQ3RDLHdCQUFJLEVBQUUsT0FBTyxDQUFDLFdBQVcsQ0FBQyxHQUFHO0FBQzdCLGlDQUFhLEVBQUUsT0FBTyxDQUFDLG1CQUFtQixDQUFDLEdBQUc7QUFDOUMsbUNBQWUsRUFBRSxPQUFPLENBQUMscUJBQXFCLENBQUMsR0FBRztBQUNsRCwwQkFBTSxFQUFFLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRztBQUNoQyxnQ0FBWSxFQUFFLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHO2lCQUMvQztBQUNELHVCQUFPLEVBQUU7QUFDTCxrQ0FBYyxFQUFFLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHO0FBQ2hELDJCQUFPLEVBQUUsT0FBTyxDQUFDLGFBQWEsQ0FBQyxHQUFHO0FBQ2xDLDhCQUFVLEVBQUUsT0FBTyxDQUFDLGdCQUFnQixDQUFDLEdBQUc7QUFDeEMseUJBQUssRUFBRSxPQUFPLENBQUMsV0FBVyxDQUFDLEdBQUc7QUFDOUIsMkJBQU8sRUFBRSxPQUFPLENBQUMsYUFBYSxDQUFDLEdBQUc7QUFDbEMsNEJBQVEsRUFBRSxPQUFPLENBQUMsY0FBYyxDQUFDLEdBQUc7QUFDcEMsNkJBQVMsRUFBRSxPQUFPLENBQUMsZUFBZSxDQUFDLEdBQUc7QUFDdEMsaUNBQWEsRUFBRSxPQUFPLENBQUMsbUJBQW1CLENBQUMsR0FBRztBQUM5Qyw0QkFBUSxFQUFFLE9BQU8sQ0FBQyxjQUFjLENBQUMsR0FBRztBQUNwQyxtQ0FBZSxFQUFFLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHO0FBQ2xELHlCQUFLLEVBQUUsT0FBTyxDQUFDLFdBQVcsQ0FBQyxHQUFHO2lCQUNqQztBQUNELHdCQUFRLEVBQUU7QUFDTixrQ0FBYyxFQUFFLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHO0FBQ2pELGlDQUFhLEVBQUUsUUFBUSxDQUFDLG1CQUFtQixDQUFDLEdBQUc7QUFDL0MsZ0NBQVksRUFBRSxRQUFRLENBQUMsa0JBQWtCLENBQUMsR0FBRztpQkFDaEQ7QUFDRCxxQkFBSyxFQUFFO0FBQ0gsZ0NBQVksRUFBRSxLQUFLLENBQUMsa0JBQWtCLENBQUMsR0FBRztBQUMxQyw0QkFBUSxFQUFFLEtBQUssQ0FBQyxjQUFjLENBQUMsR0FBRztBQUNsQywwQkFBTSxFQUFFLEtBQUssQ0FBQyxZQUFZLENBQUMsR0FBRztpQkFDakM7YUFDSjs7a0NBNUNZLFVBQVUiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9jbGllbnQtYnJvd3Nlci1lbnZpcm9ubWVudC5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=