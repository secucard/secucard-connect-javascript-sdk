'use strict';

exports.__esModule = true;

var _netStomp = require('./net/stomp');

var _netSocketSocketBrowser = require('./net/socket/socket-browser');

var _productGeneralGeneral = require('./product/general/general');

var _productSmartSmart = require('./product/smart/smart');

var _productLoyaltyLoyalty = require('./product/loyalty/loyalty');

var _productPaymentPayment = require('./product/payment/payment');

var _productServicesServices = require('./product/services/services');

var _productDocumentDocument = require('./product/document/document');

var _productAuthAuth = require('./product/auth/auth');

var _authTokenStorage = require('./auth/token-storage');

var ClientBrowserEnvironment = {
	config: {
		stompPort: 15671,
		stompEndpoint: '/stomp/websocket'
	},
	services: [_productAuthAuth.Auth.SessionService, _productDocumentDocument.Document.UploadService, _productGeneralGeneral.General.SkeletonService, _productGeneralGeneral.General.AccountService, _productGeneralGeneral.General.AccountDeviceService, _productGeneralGeneral.General.ContactService, _productGeneralGeneral.General.DeliveryAddressService, _productGeneralGeneral.General.FileAccessService, _productGeneralGeneral.General.MerchantService, _productGeneralGeneral.General.NewsService, _productGeneralGeneral.General.NotificationService, _productGeneralGeneral.General.PublicMerchantService, _productGeneralGeneral.General.StoreService, _productGeneralGeneral.General.TransactionService, _productLoyaltyLoyalty.Loyalty.BeaconService, _productLoyaltyLoyalty.Loyalty.CardGroupService, _productLoyaltyLoyalty.Loyalty.CardService, _productLoyaltyLoyalty.Loyalty.ChargeService, _productLoyaltyLoyalty.Loyalty.CheckinService, _productLoyaltyLoyalty.Loyalty.CustomerService, _productLoyaltyLoyalty.Loyalty.MerchantCardService, _productLoyaltyLoyalty.Loyalty.ProgramService, _productLoyaltyLoyalty.Loyalty.ProgramSpecialService, _productLoyaltyLoyalty.Loyalty.SaleService, _productPaymentPayment.Payment.ContainerService, _productPaymentPayment.Payment.ContractService, _productPaymentPayment.Payment.CustomerService, _productPaymentPayment.Payment.SecupayDebitService, _productPaymentPayment.Payment.SecupayPrepayService, _productServicesServices.Services.IdentContractService, _productServicesServices.Services.IdentRequestService, _productServicesServices.Services.IdentResultService, _productSmartSmart.Smart.TransactionService, _productSmartSmart.Smart.IdentService, _productSmartSmart.Smart.CheckinService]
};
exports.ClientBrowserEnvironment = ClientBrowserEnvironment;
ClientBrowserEnvironment.StompChannel = {
	create: function create() {
		return new _netStomp.Stomp(_netSocketSocketBrowser.SocketAtBrowser);
	}
};

ClientBrowserEnvironment.TokenStorage = {
	create: function create() {
		return new _authTokenStorage.TokenStorageInMem();
	}
};

var ServiceMap = {
	Auth: {
		Sessions: _productAuthAuth.Auth.SessionService.Uid
	},
	Document: {
		Uploads: _productDocumentDocument.Document.UploadService.Uid
	},
	General: {
		Skeletons: _productGeneralGeneral.General.SkeletonService.Uid,
		Accounts: _productGeneralGeneral.General.AccountService.Uid,
		AccountDevices: _productGeneralGeneral.General.AccountDeviceService.Uid,
		Contacts: _productGeneralGeneral.General.ContactService.Uid,
		DeliveryAddresses: _productGeneralGeneral.General.DeliveryAddressService.Uid,
		FileAccesses: _productGeneralGeneral.General.FileAccessService.Uid,
		Merchants: _productGeneralGeneral.General.MerchantService.Uid,
		News: _productGeneralGeneral.General.NewsService.Uid,
		Notifications: _productGeneralGeneral.General.NotificationService.Uid,
		PublicMerchants: _productGeneralGeneral.General.PublicMerchantService.Uid,
		Stores: _productGeneralGeneral.General.StoreService.Uid,
		Transactions: _productGeneralGeneral.General.TransactionService.Uid
	},
	Loyalty: {
		Beacons: _productLoyaltyLoyalty.Loyalty.BeaconService.Uid,
		CardGroups: _productLoyaltyLoyalty.Loyalty.CardGroupService.Uid,
		Cards: _productLoyaltyLoyalty.Loyalty.CardService.Uid,
		Charges: _productLoyaltyLoyalty.Loyalty.ChargeService.Uid,
		Checkins: _productLoyaltyLoyalty.Loyalty.CheckinService.Uid,
		Customers: _productLoyaltyLoyalty.Loyalty.CustomerService.Uid,
		MerchantCards: _productLoyaltyLoyalty.Loyalty.MerchantCardService.Uid,
		Programs: _productLoyaltyLoyalty.Loyalty.ProgramService.Uid,
		ProrgamSpecials: _productLoyaltyLoyalty.Loyalty.ProgramSpecialService.Uid,
		Sales: _productLoyaltyLoyalty.Loyalty.SaleService.Uid
	},
	Services: {
		IdentContracts: _productServicesServices.Services.IdentContractService.Uid,
		IdentRequests: _productServicesServices.Services.IdentRequestService.Uid,
		IdentResults: _productServicesServices.Services.IdentResultService.Uid
	},
	Smart: {
		Transactions: _productSmartSmart.Smart.TransactionService.Uid,
		Checkins: _productSmartSmart.Smart.CheckinService.Uid,
		Idents: _productSmartSmart.Smart.IdentService.Uid
	}
};
exports.ServiceMap = ServiceMap;