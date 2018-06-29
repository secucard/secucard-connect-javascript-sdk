'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ServiceMap = exports.ClientNodeEnvironment = undefined;

var _stomp = require('./net/stomp');

var _socketNode = require('./net/socket/socket-node');

var _general = require('./product/general/general');

var _smart = require('./product/smart/smart');

var _loyalty = require('./product/loyalty/loyalty');

var _payment = require('./product/payment/payment');

var _prepaid = require('./product/prepaid/prepaid');

var _services = require('./product/services/services');

var _document = require('./product/document/document');

var _auth = require('./product/auth/auth');

var _tokenStorage = require('./auth/token-storage');

var ClientNodeEnvironment = exports.ClientNodeEnvironment = {
    config: {
        stompPort: 61614
    },
    services: [_auth.Auth.SessionService, _document.Document.UploadService, _general.General.SkeletonService, _general.General.AccountService, _general.General.AccountDeviceService, _general.General.ContactService, _general.General.DeliveryAddressService, _general.General.DeviceService, _general.General.FileAccessService, _general.General.MerchantService, _general.General.NewsService, _general.General.NotificationService, _general.General.PublicMerchantService, _general.General.StoreGroupService, _general.General.StoreService, _general.General.TransactionService, _loyalty.Loyalty.ActionService, _loyalty.Loyalty.ActionProfileService, _loyalty.Loyalty.ActionCampaignService, _loyalty.Loyalty.ActionMessageService, _loyalty.Loyalty.ActionConfigService, _loyalty.Loyalty.BeaconService, _loyalty.Loyalty.CardGroupService, _loyalty.Loyalty.CardService, _loyalty.Loyalty.ChargeService, _loyalty.Loyalty.CheckinService, _loyalty.Loyalty.CustomerService, _loyalty.Loyalty.MerchantCardService, _loyalty.Loyalty.PaymentContainerService, _loyalty.Loyalty.ProgramService, _loyalty.Loyalty.ProgramSpecialService, _loyalty.Loyalty.ReportService, _loyalty.Loyalty.SaleService, _loyalty.Loyalty.StoreGroupService, _loyalty.Loyalty.TransactionService, _payment.Payment.ContainerService, _payment.Payment.ContractService, _payment.Payment.CustomerService, _payment.Payment.SecupayDebitService, _payment.Payment.SecupayPrepayService, _payment.Payment.TransactionService, _prepaid.Prepaid.ContractService, _prepaid.Prepaid.ItemGroupService, _prepaid.Prepaid.ItemService, _prepaid.Prepaid.SaleService, _prepaid.Prepaid.StockService, _services.Services.IdentCaseService, _services.Services.IdentContractService, _services.Services.IdentRequestService, _services.Services.IdentResultService, _smart.Smart.CheckinService, _smart.Smart.ConfigurationService, _smart.Smart.DeviceService, _smart.Smart.DeviceHistoriesService, _smart.Smart.IdentService, _smart.Smart.RoutingService, _smart.Smart.TransactionService]
};
ClientNodeEnvironment.StompChannel = {
    create: function create() {
        return new _stomp.Stomp(_socketNode.SocketAtNode);
    }
};

ClientNodeEnvironment.TokenStorage = {
    create: function create() {
        return new _tokenStorage.TokenStorageInMem();
    }
};

var ServiceMap = exports.ServiceMap = {
    Auth: {
        Sessions: _auth.Auth.SessionService.Uid
    },
    Document: {
        Uploads: _document.Document.UploadService.Uid
    },
    General: {
        Skeletons: _general.General.SkeletonService.Uid,
        Accounts: _general.General.AccountService.Uid,
        AccountDevices: _general.General.AccountDeviceService.Uid,
        Contacts: _general.General.ContactService.Uid,
        DeliveryAddresses: _general.General.DeliveryAddressService.Uid,
        Devices: _general.General.DeviceService.Uid,
        FileAccesses: _general.General.FileAccessService.Uid,
        Merchants: _general.General.MerchantService.Uid,
        News: _general.General.NewsService.Uid,
        Notifications: _general.General.NotificationService.Uid,
        PublicMerchants: _general.General.PublicMerchantService.Uid,
        StoreGroups: _general.General.StoreGroupService.Uid,
        Stores: _general.General.StoreService.Uid,
        Transactions: _general.General.TransactionService.Uid
    },
    Loyalty: {
        ActionCampaigns: _loyalty.Loyalty.ActionCampaignService.Uid,
        ActionConfigs: _loyalty.Loyalty.ActionConfigService.Uid,
        ActionMessages: _loyalty.Loyalty.ActionMessageService.Uid,
        ActionProfiles: _loyalty.Loyalty.ActionProfileService.Uid,
        Actions: _loyalty.Loyalty.ActionService.Uid,
        Beacons: _loyalty.Loyalty.BeaconService.Uid,
        CardGroups: _loyalty.Loyalty.CardGroupService.Uid,
        Cards: _loyalty.Loyalty.CardService.Uid,
        Charges: _loyalty.Loyalty.ChargeService.Uid,
        Checkins: _loyalty.Loyalty.CheckinService.Uid,
        Customers: _loyalty.Loyalty.CustomerService.Uid,
        MerchantCards: _loyalty.Loyalty.MerchantCardService.Uid,
        PaymentContainers: _loyalty.Loyalty.PaymentContainerService.Uid,
        Programs: _loyalty.Loyalty.ProgramService.Uid,
        ProrgamSpecials: _loyalty.Loyalty.ProgramSpecialService.Uid,
        Reports: _loyalty.Loyalty.ReportService.Uid,
        Sales: _loyalty.Loyalty.SaleService.Uid,
        StoreGroups: _loyalty.Loyalty.StoreGroupService.Uid,
        Transactions: _loyalty.Loyalty.TransactionService.Uid
    },
    Payment: {
        Containers: _payment.Payment.ContainerService.Uid,
        Contracts: _payment.Payment.ContractService.Uid,
        Customers: _payment.Payment.CustomerService.Uid,
        SecupayDebits: _payment.Payment.SecupayDebitService.Uid,
        SecupayPrepays: _payment.Payment.SecupayPrepayService.Uid,
        Transactions: _payment.Payment.TransactionService.Uid
    },
    Prepaid: {
        Contracts: _prepaid.Prepaid.ContractService.Uid,
        ItemGroups: _prepaid.Prepaid.ItemGroupService.Uid,
        Items: _prepaid.Prepaid.ItemService.Uid,
        Sales: _prepaid.Prepaid.SaleService.Uid,
        Stocks: _prepaid.Prepaid.StockService.Uid
    },
    Services: {
        IdentCases: _services.Services.IdentCaseService.Uid,
        IdentContracts: _services.Services.IdentContractService.Uid,
        IdentRequests: _services.Services.IdentRequestService.Uid,
        IdentResults: _services.Services.IdentResultService.Uid
    },
    Smart: {
        Checkins: _smart.Smart.CheckinService.Uid,
        Configurations: _smart.Smart.ConfigurationService.Uid,
        Devices: _smart.Smart.DeviceService.Uid,
        DeviceHistories: _smart.Smart.DeviceHistoriesService.Uid,
        Idents: _smart.Smart.IdentService.Uid,
        Routings: _smart.Smart.RoutingService.Uid,
        Transactions: _smart.Smart.TransactionService.Uid
    }
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvY2xpZW50LW5vZGUtZW52aXJvbm1lbnQuanMiXSwibmFtZXMiOlsiQ2xpZW50Tm9kZUVudmlyb25tZW50IiwiY29uZmlnIiwic3RvbXBQb3J0Iiwic2VydmljZXMiLCJBdXRoIiwiU2Vzc2lvblNlcnZpY2UiLCJEb2N1bWVudCIsIlVwbG9hZFNlcnZpY2UiLCJHZW5lcmFsIiwiU2tlbGV0b25TZXJ2aWNlIiwiQWNjb3VudFNlcnZpY2UiLCJBY2NvdW50RGV2aWNlU2VydmljZSIsIkNvbnRhY3RTZXJ2aWNlIiwiRGVsaXZlcnlBZGRyZXNzU2VydmljZSIsIkRldmljZVNlcnZpY2UiLCJGaWxlQWNjZXNzU2VydmljZSIsIk1lcmNoYW50U2VydmljZSIsIk5ld3NTZXJ2aWNlIiwiTm90aWZpY2F0aW9uU2VydmljZSIsIlB1YmxpY01lcmNoYW50U2VydmljZSIsIlN0b3JlR3JvdXBTZXJ2aWNlIiwiU3RvcmVTZXJ2aWNlIiwiVHJhbnNhY3Rpb25TZXJ2aWNlIiwiTG95YWx0eSIsIkFjdGlvblNlcnZpY2UiLCJBY3Rpb25Qcm9maWxlU2VydmljZSIsIkFjdGlvbkNhbXBhaWduU2VydmljZSIsIkFjdGlvbk1lc3NhZ2VTZXJ2aWNlIiwiQWN0aW9uQ29uZmlnU2VydmljZSIsIkJlYWNvblNlcnZpY2UiLCJDYXJkR3JvdXBTZXJ2aWNlIiwiQ2FyZFNlcnZpY2UiLCJDaGFyZ2VTZXJ2aWNlIiwiQ2hlY2tpblNlcnZpY2UiLCJDdXN0b21lclNlcnZpY2UiLCJNZXJjaGFudENhcmRTZXJ2aWNlIiwiUGF5bWVudENvbnRhaW5lclNlcnZpY2UiLCJQcm9ncmFtU2VydmljZSIsIlByb2dyYW1TcGVjaWFsU2VydmljZSIsIlJlcG9ydFNlcnZpY2UiLCJTYWxlU2VydmljZSIsIlBheW1lbnQiLCJDb250YWluZXJTZXJ2aWNlIiwiQ29udHJhY3RTZXJ2aWNlIiwiU2VjdXBheURlYml0U2VydmljZSIsIlNlY3VwYXlQcmVwYXlTZXJ2aWNlIiwiUHJlcGFpZCIsIkl0ZW1Hcm91cFNlcnZpY2UiLCJJdGVtU2VydmljZSIsIlN0b2NrU2VydmljZSIsIlNlcnZpY2VzIiwiSWRlbnRDYXNlU2VydmljZSIsIklkZW50Q29udHJhY3RTZXJ2aWNlIiwiSWRlbnRSZXF1ZXN0U2VydmljZSIsIklkZW50UmVzdWx0U2VydmljZSIsIlNtYXJ0IiwiQ29uZmlndXJhdGlvblNlcnZpY2UiLCJEZXZpY2VIaXN0b3JpZXNTZXJ2aWNlIiwiSWRlbnRTZXJ2aWNlIiwiUm91dGluZ1NlcnZpY2UiLCJTdG9tcENoYW5uZWwiLCJjcmVhdGUiLCJTdG9tcCIsIlNvY2tldEF0Tm9kZSIsIlRva2VuU3RvcmFnZSIsIlRva2VuU3RvcmFnZUluTWVtIiwiU2VydmljZU1hcCIsIlNlc3Npb25zIiwiVWlkIiwiVXBsb2FkcyIsIlNrZWxldG9ucyIsIkFjY291bnRzIiwiQWNjb3VudERldmljZXMiLCJDb250YWN0cyIsIkRlbGl2ZXJ5QWRkcmVzc2VzIiwiRGV2aWNlcyIsIkZpbGVBY2Nlc3NlcyIsIk1lcmNoYW50cyIsIk5ld3MiLCJOb3RpZmljYXRpb25zIiwiUHVibGljTWVyY2hhbnRzIiwiU3RvcmVHcm91cHMiLCJTdG9yZXMiLCJUcmFuc2FjdGlvbnMiLCJBY3Rpb25DYW1wYWlnbnMiLCJBY3Rpb25Db25maWdzIiwiQWN0aW9uTWVzc2FnZXMiLCJBY3Rpb25Qcm9maWxlcyIsIkFjdGlvbnMiLCJCZWFjb25zIiwiQ2FyZEdyb3VwcyIsIkNhcmRzIiwiQ2hhcmdlcyIsIkNoZWNraW5zIiwiQ3VzdG9tZXJzIiwiTWVyY2hhbnRDYXJkcyIsIlBheW1lbnRDb250YWluZXJzIiwiUHJvZ3JhbXMiLCJQcm9yZ2FtU3BlY2lhbHMiLCJSZXBvcnRzIiwiU2FsZXMiLCJDb250YWluZXJzIiwiQ29udHJhY3RzIiwiU2VjdXBheURlYml0cyIsIlNlY3VwYXlQcmVwYXlzIiwiSXRlbUdyb3VwcyIsIkl0ZW1zIiwiU3RvY2tzIiwiSWRlbnRDYXNlcyIsIklkZW50Q29udHJhY3RzIiwiSWRlbnRSZXF1ZXN0cyIsIklkZW50UmVzdWx0cyIsIkNvbmZpZ3VyYXRpb25zIiwiRGV2aWNlSGlzdG9yaWVzIiwiSWRlbnRzIiwiUm91dGluZ3MiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFXQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFFTyxJQUFNQSx3REFBd0I7QUFDakNDLFlBQVE7QUFDSkMsbUJBQVc7QUFEUCxLQUR5QjtBQUlqQ0MsY0FBVSxDQUNOQyxXQUFLQyxjQURDLEVBR05DLG1CQUFTQyxhQUhILEVBS05DLGlCQUFRQyxlQUxGLEVBTU5ELGlCQUFRRSxjQU5GLEVBT05GLGlCQUFRRyxvQkFQRixFQVFOSCxpQkFBUUksY0FSRixFQVNOSixpQkFBUUssc0JBVEYsRUFVTkwsaUJBQVFNLGFBVkYsRUFXTk4saUJBQVFPLGlCQVhGLEVBWU5QLGlCQUFRUSxlQVpGLEVBYU5SLGlCQUFRUyxXQWJGLEVBY05ULGlCQUFRVSxtQkFkRixFQWVOVixpQkFBUVcscUJBZkYsRUFnQk5YLGlCQUFRWSxpQkFoQkYsRUFpQk5aLGlCQUFRYSxZQWpCRixFQWtCTmIsaUJBQVFjLGtCQWxCRixFQW9CTkMsaUJBQVFDLGFBcEJGLEVBcUJORCxpQkFBUUUsb0JBckJGLEVBc0JORixpQkFBUUcscUJBdEJGLEVBdUJOSCxpQkFBUUksb0JBdkJGLEVBd0JOSixpQkFBUUssbUJBeEJGLEVBeUJOTCxpQkFBUU0sYUF6QkYsRUEwQk5OLGlCQUFRTyxnQkExQkYsRUEyQk5QLGlCQUFRUSxXQTNCRixFQTRCTlIsaUJBQVFTLGFBNUJGLEVBNkJOVCxpQkFBUVUsY0E3QkYsRUE4Qk5WLGlCQUFRVyxlQTlCRixFQStCTlgsaUJBQVFZLG1CQS9CRixFQWdDTlosaUJBQVFhLHVCQWhDRixFQWlDTmIsaUJBQVFjLGNBakNGLEVBa0NOZCxpQkFBUWUscUJBbENGLEVBbUNOZixpQkFBUWdCLGFBbkNGLEVBb0NOaEIsaUJBQVFpQixXQXBDRixFQXFDTmpCLGlCQUFRSCxpQkFy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LENBQXFCbUI7QUFMekIsS0FwRGM7QUEyRHRCbEIsY0FBVTtBQUNOMEQsb0JBQVkxRCxtQkFBU0MsZ0JBQVQsQ0FBMEJpQixHQURoQztBQUVOeUMsd0JBQWdCM0QsbUJBQVNFLG9CQUFULENBQThCZ0IsR0FGeEM7QUFHTjBDLHVCQUFlNUQsbUJBQVNHLG1CQUFULENBQTZCZSxHQUh0QztBQUlOMkMsc0JBQWM3RCxtQkFBU0ksa0JBQVQsQ0FBNEJjO0FBSnBDLEtBM0RZO0FBaUV0QmIsV0FBTztBQUNIc0Msa0JBQVV0QyxhQUFNdEIsY0FBTixDQUFxQm1DLEdBRDVCO0FBRUg0Qyx3QkFBZ0J6RCxhQUFNQyxvQkFBTixDQUEyQlksR0FGeEM7QUFHSE8saUJBQVNwQixhQUFNekMsYUFBTixDQUFvQnNELEdBSDFCO0FBSUg2Qyx5QkFBaUIxRCxhQUFNRSxzQkFBTixDQUE2QlcsR0FKM0M7QUFLSDhDLGdCQUFRM0QsYUFBTUcsWUFBTixDQUFtQlUsR0FMeEI7QUFNSCtDLGtCQUFVNUQsYUFBTUksY0FBTixDQUFxQlMsR0FONUI7QUFPSGUsc0JBQWM1QixhQUFNakMsa0JBQU4sQ0FBeUI4QztBQVBwQztBQWpFZSxDQUFuQiIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L2NsaWVudC1ub2RlLWVudmlyb25tZW50LmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==
