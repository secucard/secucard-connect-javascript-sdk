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
                services: [Auth.SessionService, Document.UploadService, General.SkeletonService, General.AccountService, General.AccountDeviceService, General.ContactService, General.DeliveryAddressService, General.FileAccessService, General.MerchantService, General.NewsService, General.NotificationService, General.PublicMerchantService, General.StoreGroupService, General.StoreService, General.TransactionService, Loyalty.ActionActionService, Loyalty.ActionProfileService, Loyalty.BeaconService, Loyalty.CardGroupService, Loyalty.CardService, Loyalty.ChargeService, Loyalty.CheckinService, Loyalty.CustomerService, Loyalty.MerchantCardService, Loyalty.ProgramService, Loyalty.ProgramSpecialService, Loyalty.SaleService, Loyalty.StoreGroupService, Loyalty.TransactionService, Payment.ContainerService, Payment.ContractService, Payment.CustomerService, Payment.SecupayDebitService, Payment.SecupayPrepayService, Payment.TransactionService, Prepaid.ContractService, Prepaid.ItemGroupService, Prepaid.ItemService, Prepaid.SaleService, Prepaid.StockService, Services.IdentCaseService, Services.IdentContractService, Services.IdentRequestService, Services.IdentResultService, Smart.CheckinService, Smart.DeviceService, Smart.IdentService, Smart.RoutingService, Smart.TransactionService]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvY2xpZW50LW5vZGUtZW52aXJvbm1lbnQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3FIQXVCYSxxQkFBcUIsRUEyRXJCLFVBQVU7Ozs4QkF2RmYsS0FBSzs7Z0RBQ0wsWUFBWTs7NkNBQ1osT0FBTzs7dUNBQ1AsS0FBSzs7NkNBQ0wsT0FBTzs7NkNBQ1AsT0FBTzs7NkNBQ1AsT0FBTzs7Z0RBQ1AsUUFBUTs7Z0RBQ1IsUUFBUTs7b0NBQ1IsSUFBSTs7a0RBQ0osaUJBQWlCOzs7QUFFWixpQ0FBcUIsR0FBRztBQUNqQyxzQkFBTSxFQUFFO0FBQ0osNkJBQVMsRUFBRSxLQUFLO2lCQUNuQjtBQUNELHdCQUFRLEVBQUUsQ0FDTixJQUFJLENBQUMsY0FBYyxFQUVuQixRQUFRLENBQUMsYUFBYSxFQUV0QixPQUFPLENBQUMsZUFBZSxFQUN2QixPQUFPLENBQUMsY0FBYyxFQUN0QixPQUFPLENBQUMsb0JBQW9CLEVBQzVCLE9BQU8sQ0FBQyxjQUFjLEVBQ3RCLE9BQU8sQ0FBQyxzQkFBc0IsRUFDOUIsT0FBTyxDQUFDLGlCQUFpQixFQUN6QixPQUFPLENBQUMsZUFBZSxFQUN2QixPQUFPLENBQUMsV0FBVyxFQUNuQixPQUFPLENBQUMsbUJBQW1CLEVBQzNCLE9BQU8sQ0FBQyxxQkFBcUIsRUFDN0IsT0FBTyxDQUFDLGlCQUFpQixFQUN6QixPQUFPLENBQUMsWUFBWSxFQUNwQixPQUFPLENBQUMsa0JBQWtCLEVBRTFCLE9BQU8sQ0FBQyxtQkFBbUIsRUFDM0IsT0FBTyxDQUFDLG9CQUFvQixFQUM1QixPQUFPLENBQUMsYUFBYSxFQUNyQixPQUFPLENBQUMsZ0JBQWdCLEVBQ3hCLE9BQU8sQ0FBQyxXQUFXLEVBQ25CLE9BQU8sQ0FBQyxhQUFhLEVBQ3JCLE9BQU8sQ0FBQyxjQUFjLEVBQ3RCLE9BQU8sQ0FBQyxlQUFlLEVBQ3ZCLE9BQU8sQ0FBQyxtQkFBbUIsRUFDM0IsT0FBTyxDQUFDLGNBQWMsRUFDdEIsT0FBTyxD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RSxPQUFPLENBQUMsZUFBZSxDQUFDLEdBQUc7QUFDdEMsaUNBQWEsRUFBRSxPQUFPLENBQUMsbUJBQW1CLENBQUMsR0FBRztBQUM5Qyw0QkFBUSxFQUFFLE9BQU8sQ0FBQyxjQUFjLENBQUMsR0FBRztBQUNwQyxtQ0FBZSxFQUFFLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHO0FBQ2xELHlCQUFLLEVBQUUsT0FBTyxDQUFDLFdBQVcsQ0FBQyxHQUFHO0FBQzlCLCtCQUFXLEVBQUUsT0FBTyxDQUFDLGlCQUFpQixDQUFDLEdBQUc7QUFDMUMsZ0NBQVksRUFBRSxPQUFPLENBQUMsa0JBQWtCLENBQUMsR0FBRztpQkFDL0M7QUFDRCx1QkFBTyxFQUFFO0FBQ0wsOEJBQVUsRUFBRSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsR0FBRztBQUN4Qyw2QkFBUyxFQUFFLE9BQU8sQ0FBQyxlQUFlLENBQUMsR0FBRztBQUN0Qyw2QkFBUyxFQUFFLE9BQU8sQ0FBQyxlQUFlLENBQUMsR0FBRztBQUN0QyxpQ0FBYSxFQUFFLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHO0FBQzlDLGtDQUFjLEVBQUUsT0FBTyxDQUFDLG9CQUFvQixDQUFDLEdBQUc7QUFDaEQsZ0NBQVksRUFBRSxPQUFPLENBQUMsa0JBQWtCLENBQUMsR0FBRztpQkFDL0M7QUFDRCx1QkFBTyxFQUFDO0FBQ0osNkJBQVMsRUFBRSxPQUFPLENBQUMsZUFBZSxDQUFDLEdBQUc7QUFDdEMsOEJBQVUsRUFBRSxPQUFPLENBQUMsZ0JBQWdCLENBQUMsR0FBRztBQUN4Qyx5QkFBSyxFQUFFLE9BQU8sQ0FBQyxXQUFXLENBQUMsR0FBRztBQUM5Qix5QkFBSyxFQUFFLE9BQU8sQ0FBQyxXQUFXLENBQUMsR0FBRztBQUM5QiwwQkFBTSxFQUFFLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRztpQkFDbkM7QUFDRCx3QkFBUSxFQUFFO0FBQ04sOEJBQVUsRUFBRSxRQUFRLENBQUMsZ0JBQWdCLENBQUMsR0FBRztBQUN6QyxrQ0FBYyxFQUFFLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHO0FBQ2pELGlDQUFhLEVBQUUsUUFBUSxDQUFDLG1CQUFtQixDQUFDLEdBQUc7QUFDL0MsZ0NBQVksRUFBRSxRQUFRLENBQUMsa0JBQWtCLENBQUMsR0FBRztpQkFDaEQ7QUFDRCxxQkFBSyxFQUFFO0FBQ0gsNEJBQVEsRUFBRSxLQUFLLENBQUMsY0FBYyxDQUFDLEdBQUc7QUFDbEMsMkJBQU8sRUFBRSxLQUFLLENBQUMsYUFBYSxDQUFDLEdBQUc7QUFDaEMsMEJBQU0sRUFBRSxLQUFLLENBQUMsWUFBWSxDQUFDLEdBQUc7QUFDOUIsNEJBQVEsRUFBRSxLQUFLLENBQUMsY0FBYyxDQUFDLEdBQUc7QUFDbEMsZ0NBQVksRUFBRSxLQUFLLENBQUMsa0JBQWtCLENBQUMsR0FBRztpQkFDN0M7YUFDSiIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L2NsaWVudC1ub2RlLWVudmlyb25tZW50LmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==