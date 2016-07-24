System.register(['./net/stomp', './net/socket/socket-node', './product/general/general', './product/smart/smart', './product/loyalty/loyalty', './product/payment/payment', './product/prepaid/prepaid', './product/services/services', './product/document/document', './product/auth/auth', './auth/token-storage'], function (_export) {
    'use strict';

    var Stomp, SocketAtNode, General, Smart, Loyalty, Payment, Prepaid, Services, Document, Auth, TokenStorageInMem, ClientNodeEnvironment, ServiceMap;
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
        }],
        execute: function () {
            ClientNodeEnvironment = {
                config: {
                    stompPort: 61614
                },
                services: [Auth.SessionService, Document.UploadService, General.SkeletonService, General.AccountService, General.AccountDeviceService, General.ContactService, General.DeliveryAddressService, General.FileAccessService, General.MerchantService, General.NewsService, General.NotificationService, General.PublicMerchantService, General.StoreGroupService, General.StoreService, General.TransactionService, Loyalty.ActionActionService, Loyalty.ActionProfileService, Loyalty.BeaconService, Loyalty.CardGroupService, Loyalty.CardService, Loyalty.ChargeService, Loyalty.CheckinService, Loyalty.CustomerService, Loyalty.MerchantCardService, Loyalty.ProgramService, Loyalty.ProgramSpecialService, Loyalty.SaleService, Loyalty.StoreGroupService, Payment.ContainerService, Payment.ContractService, Payment.CustomerService, Payment.SecupayDebitService, Payment.SecupayPrepayService, Payment.TransactionService, Prepaid.ContractService, Prepaid.ItemGroupService, Prepaid.ItemService, Prepaid.SaleService, Prepaid.StockService, Services.IdentCaseService, Services.IdentContractService, Services.IdentRequestService, Services.IdentResultService, Smart.CheckinService, Smart.DeviceService, Smart.IdentService, Smart.RoutingService, Smart.TransactionService]
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
                    ActionProfiles: Loyalty.ActionProfileService.Uid,
                    ActionActions: Loyalty.ActionActionService.Uid,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvY2xpZW50LW5vZGUtZW52aXJvbm1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3FIQXVCYSxxQkFBcUIsRUEwRXJCLFVBQVU7Ozs4QkF0RmYsS0FBSzs7Z0RBQ0wsWUFBWTs7NkNBQ1osT0FBTzs7dUNBQ1AsS0FBSzs7NkNBQ0wsT0FBTzs7NkNBQ1AsT0FBTzs7NkNBQ1AsT0FBTzs7Z0RBQ1AsUUFBUTs7Z0RBQ1IsUUFBUTs7b0NBQ1IsSUFBSTs7a0RBQ0osaUJBQWlCOzs7QUFFWixpQ0FBcUIsR0FBRztBQUNqQyxzQkFBTSxFQUFFO0FBQ0osNkJBQVMsRUFBRSxLQUFLO2lCQUNuQjtBQUNELHdCQUFRLEVBQUUsQ0FDTixJQUFJLENBQUMsY0FBYyxFQUVuQixRQUFRLENBQUMsYUFBYSxFQUV0QixPQUFPLENBQUMsZUFBZSxFQUN2QixPQUFPLENBQUMsY0FBYyxFQUN0QixPQUFPLENBQUMsb0JBQW9CLEVBQzVCLE9BQU8sQ0FBQyxjQUFjLEVBQ3RCLE9BQU8sQ0FBQyxzQkFBc0IsRUFDOUIsT0FBTyxDQUFDLGlCQUFpQixFQUN6QixPQUFPLENBQUMsZUFBZSxFQUN2QixPQUFPLENBQUMsV0FBVyxFQUNuQixPQUFPLENBQUMsbUJBQW1CLEVBQzNCLE9BQU8sQ0FBQyxxQkFBcUIsRUFDN0IsT0FBTyxDQUFDLGlCQUFpQixFQUN6QixPQUFPLENBQUMsWUFBWSxFQUNwQixPQUFPLENBQUMsa0JBQWtCLEVBRTFCLE9BQU8sQ0FBQyxtQkFBbUIsRUFDM0IsT0FBTyxDQUFDLG9CQUFvQixFQUM1QixPQUFPLENBQUMsYUFBYSxFQUNyQixPQUFPLENBQUMsZ0JBQWdCLEVBQ3hCLE9BQU8sQ0FBQyxXQUFXLEVBQ25CLE9BQU8sQ0FBQyxhQUFhLEVBQ3JCLE9BQU8sQ0FBQyxjQUFjLEVBQ3RCLE9BQU8sQ0FBQyxlQUFlLEVBQ3ZCLE9BQU8sQ0FBQyxtQkFBbUIsRUFDM0IsT0FBTyxDQUFDLGNBQWMsRUFDdEIsT0FBTyxD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QUFHO0FBQ3RDLGlDQUFhLEVBQUUsT0FBTyxDQUFDLG1CQUFtQixDQUFDLEdBQUc7QUFDOUMsNEJBQVEsRUFBRSxPQUFPLENBQUMsY0FBYyxDQUFDLEdBQUc7QUFDcEMsbUNBQWUsRUFBRSxPQUFPLENBQUMscUJBQXFCLENBQUMsR0FBRztBQUNsRCx5QkFBSyxFQUFFLE9BQU8sQ0FBQyxXQUFXLENBQUMsR0FBRztBQUM5QiwrQkFBVyxFQUFFLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHO2lCQUM3QztBQUNELHVCQUFPLEVBQUU7QUFDTCw4QkFBVSxFQUFFLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHO0FBQ3hDLDZCQUFTLEVBQUUsT0FBTyxDQUFDLGVBQWUsQ0FBQyxHQUFHO0FBQ3RDLDZCQUFTLEVBQUUsT0FBTyxDQUFDLGVBQWUsQ0FBQyxHQUFHO0FBQ3RDLGlDQUFhLEVBQUUsT0FBTyxDQUFDLG1CQUFtQixDQUFDLEdBQUc7QUFDOUMsa0NBQWMsRUFBRSxPQUFPLENBQUMsb0JBQW9CLENBQUMsR0FBRztBQUNoRCxnQ0FBWSxFQUFFLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHO2lCQUMvQztBQUNELHVCQUFPLEVBQUM7QUFDSiw2QkFBUyxFQUFFLE9BQU8sQ0FBQyxlQUFlLENBQUMsR0FBRztBQUN0Qyw4QkFBVSxFQUFFLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHO0FBQ3hDLHlCQUFLLEVBQUUsT0FBTyxDQUFDLFdBQVcsQ0FBQyxHQUFHO0FBQzlCLHlCQUFLLEVBQUUsT0FBTyxDQUFDLFdBQVcsQ0FBQyxHQUFHO0FBQzlCLDBCQUFNLEVBQUUsT0FBTyxDQUFDLFlBQVksQ0FBQyxHQUFHO2lCQUNuQztBQUNELHdCQUFRLEVBQUU7QUFDTiw4QkFBVSxFQUFFLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHO0FBQ3pDLGtDQUFjLEVBQUUsUUFBUSxDQUFDLG9CQUFvQixDQUFDLEdBQUc7QUFDakQsaUNBQWEsRUFBRSxRQUFRLENBQUMsbUJBQW1CLENBQUMsR0FBRztBQUMvQyxnQ0FBWSxFQUFFLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHO2lCQUNoRDtBQUNELHFCQUFLLEVBQUU7QUFDSCw0QkFBUSxFQUFFLEtBQUssQ0FBQyxjQUFjLENBQUMsR0FBRztBQUNsQywyQkFBTyxFQUFFLEtBQUssQ0FBQyxhQUFhLENBQUMsR0FBRztBQUNoQywwQkFBTSxFQUFFLEtBQUssQ0FBQyxZQUFZLENBQUMsR0FBRztBQUM5Qiw0QkFBUSxFQUFFLEtBQUssQ0FBQyxjQUFjLENBQUMsR0FBRztBQUNsQyxnQ0FBWSxFQUFFLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHO2lCQUM3QzthQUNKIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvY2xpZW50LW5vZGUtZW52aXJvbm1lbnQuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9