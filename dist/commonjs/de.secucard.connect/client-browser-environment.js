"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ServiceMap = exports.ClientBrowserEnvironment = void 0;
var _stomp = require("./net/stomp");
var _socketBrowser = require("./net/socket/socket-browser");
var _general = require("./product/general/general");
var _smart = require("./product/smart/smart");
var _loyalty = require("./product/loyalty/loyalty");
var _payment = require("./product/payment/payment");
var _prepaid = require("./product/prepaid/prepaid");
var _services = require("./product/services/services");
var _document = require("./product/document/document");
var _auth = require("./product/auth/auth");
var _tokenStorage = require("./auth/token-storage");
var _clearing = require("./product/clearing/clearing");
var _cardprocessing = require("./product/cardprocessing/cardprocessing");
var _easycredit = require("./product/easycredit/easycredit");
var _public = require("./product/public/public");
var ClientBrowserEnvironment = {
  config: {
    stompPort: 15671,
    stompEndpoint: '/stomp/websocket'
  },
  services: [_auth.Auth.SessionService, _cardprocessing.Cardprocessing.InvoiceService, _cardprocessing.Cardprocessing.TransactionService, _clearing.Clearing.SepaInbatchsService, _clearing.Clearing.SepaInrecordsService, _clearing.Clearing.SepaOutbatchsService, _clearing.Clearing.SepaOutrecordsService, _document.Document.UploadService, _easycredit.Easycredit.TransactionService, _general.General.SkeletonService, _general.General.AccountService, _general.General.AccountDeviceService, _general.General.AccountInvitationService, _general.General.ContactService, _general.General.ContractService, _general.General.DeliveryAddressService, _general.General.DeviceService, _general.General.FileAccessService, _general.General.MerchantService, _general.General.NewsService, _general.General.NotificationService, _general.General.PublicMerchantService, _general.General.StoreGroupService, _general.General.StoreService, _general.General.TransactionService, _loyalty.Loyalty.AcceptancePointTemplatesService, _loyalty.Loyalty.ActionService, _loyalty.Loyalty.ActionProfileService, _loyalty.Loyalty.ActionMessageService, _loyalty.Loyalty.ActionCampaignService, _loyalty.Loyalty.ActionConfigService, _loyalty.Loyalty.ApprovalService, _loyalty.Loyalty.BeaconService, _loyalty.Loyalty.CardGroupService, _loyalty.Loyalty.CardService, _loyalty.Loyalty.ChargeService, _loyalty.Loyalty.CheckinService, _loyalty.Loyalty.CustomerService, _loyalty.Loyalty.MerchantCardService, _loyalty.Loyalty.PaymentContainerService, _loyalty.Loyalty.ProgramService, _loyalty.Loyalty.ProgramSpecialService, _loyalty.Loyalty.ReportService, _loyalty.Loyalty.SaleService, _loyalty.Loyalty.StoreGroupService, _loyalty.Loyalty.TransactionService, _payment.Payment.ContainerService, _payment.Payment.ContractService, _payment.Payment.CustomerService, _payment.Payment.EterminalTransactionService, _payment.Payment.InvoiceService, _payment.Payment.PayoutService, _payment.Payment.SecupayDebitService, _payment.Payment.SecupayPayoutService, _payment.Payment.SecupayPrepayService, _payment.Payment.TransactionService, _payment.Payment.TransactionHistoriesService, _prepaid.Prepaid.ContractService, _prepaid.Prepaid.ItemGroupService, _prepaid.Prepaid.ItemService, _prepaid.Prepaid.ReportService, _prepaid.Prepaid.SaleService, _prepaid.Prepaid.StockService, _public.Public.WebsiteService, _services.Services.IdentCaseService, _services.Services.IdentContractService, _services.Services.IdentRequestService, _services.Services.IdentResultService, _smart.Smart.CheckinService, _smart.Smart.ConfigurationService, _smart.Smart.DeviceService, _smart.Smart.DeviceHistoriesService, _smart.Smart.IdentService, _smart.Smart.RoutingService, _smart.Smart.TransactionService]
};
exports.ClientBrowserEnvironment = ClientBrowserEnvironment;
ClientBrowserEnvironment.StompChannel = {
  create: function create() {
    return new _stomp.Stomp(_socketBrowser.SocketAtBrowser);
  }
};
ClientBrowserEnvironment.TokenStorage = {
  create: function create() {
    return new _tokenStorage.TokenStorageInMem();
  }
};
var ServiceMap = {
  Auth: {
    Sessions: _auth.Auth.SessionService.Uid
  },
  Cardprocessing: {
    Invoices: _cardprocessing.Cardprocessing.InvoiceService.Uid,
    Transactions: _cardprocessing.Cardprocessing.TransactionService.Uid
  },
  Clearing: {
    SepaInbatchs: _clearing.Clearing.SepaInbatchsService.Uid,
    SepaInrecords: _clearing.Clearing.SepaInrecordsService.Uid,
    SepaOutbatchs: _clearing.Clearing.SepaOutbatchsService.Uid,
    SepaOutrecords: _clearing.Clearing.SepaOutrecordsService.Uid
  },
  Document: {
    Uploads: _document.Document.UploadService.Uid
  },
  Easycredit: {
    Transactions: _easycredit.Easycredit.TransactionService.Uid
  },
  General: {
    Skeletons: _general.General.SkeletonService.Uid,
    Accounts: _general.General.AccountService.Uid,
    AccountDevices: _general.General.AccountDeviceService.Uid,
    AccountInvitations: _general.General.AccountInvitationService.Uid,
    Contacts: _general.General.ContactService.Uid,
    Contracts: _general.General.ContractService.Uid,
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
    AcceptancePointTemplatesService: _loyalty.Loyalty.AcceptancePointTemplatesService.Uid,
    ActionCampaigns: _loyalty.Loyalty.ActionCampaignService.Uid,
    ActionConfigs: _loyalty.Loyalty.ActionConfigService.Uid,
    ActionMessages: _loyalty.Loyalty.ActionMessageService.Uid,
    ActionProfiles: _loyalty.Loyalty.ActionProfileService.Uid,
    Actions: _loyalty.Loyalty.ActionService.Uid,
    Approvals: _loyalty.Loyalty.ApprovalService.Uid,
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
    EterminalTransactions: _payment.Payment.EterminalTransactionService.Uid,
    Invoices: _payment.Payment.InvoiceService.Uid,
    Payouts: _payment.Payment.PayoutService.Uid,
    SecupayDebits: _payment.Payment.SecupayDebitService.Uid,
    SecupayPayouts: _payment.Payment.SecupayPayoutService.Uid,
    SecupayPrepays: _payment.Payment.SecupayPrepayService.Uid,
    Transactions: _payment.Payment.TransactionService.Uid,
    TransactionHistories: _payment.Payment.TransactionHistoriesService.Uid
  },
  Prepaid: {
    Contracts: _prepaid.Prepaid.ContractService.Uid,
    ItemGroups: _prepaid.Prepaid.ItemGroupService.Uid,
    Items: _prepaid.Prepaid.ItemService.Uid,
    Reports: _prepaid.Prepaid.ReportService.Uid,
    Sales: _prepaid.Prepaid.SaleService.Uid,
    Stocks: _prepaid.Prepaid.StockService.Uid
  },
  Public: {
    Website: _public.Public.WebsiteService.Uid
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
exports.ServiceMap = ServiceMap;