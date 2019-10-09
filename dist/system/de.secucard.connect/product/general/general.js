System.register(['./skeleton-service', './account-service', './account-device-service', './account-invitation-service', './contact-service', './contract-service', './delivery-address-service', './device-service', './file-access-service', './merchant-service', './news-service', './notification-service', './public-merchant-service', './store-service', './transaction-service', './store-group-service'], function (_export) {
  'use strict';

  var SkeletonService, AccountService, AccountDeviceService, AccountInvitationService, ContactService, ContractService, DeliveryAddressService, DeviceService, FileAccessService, MerchantService, NewsService, NotificationService, PublicMerchantService, StoreService, TransactionService, StoreGroupService, General;
  return {
    setters: [function (_skeletonService) {
      SkeletonService = _skeletonService.SkeletonService;
    }, function (_accountService) {
      AccountService = _accountService.AccountService;
    }, function (_accountDeviceService) {
      AccountDeviceService = _accountDeviceService.AccountDeviceService;
    }, function (_accountInvitationService) {
      AccountInvitationService = _accountInvitationService.AccountInvitationService;
    }, function (_contactService) {
      ContactService = _contactService.ContactService;
    }, function (_contractService) {
      ContractService = _contractService.ContractService;
    }, function (_deliveryAddressService) {
      DeliveryAddressService = _deliveryAddressService.DeliveryAddressService;
    }, function (_deviceService) {
      DeviceService = _deviceService.DeviceService;
    }, function (_fileAccessService) {
      FileAccessService = _fileAccessService.FileAccessService;
    }, function (_merchantService) {
      MerchantService = _merchantService.MerchantService;
    }, function (_newsService) {
      NewsService = _newsService.NewsService;
    }, function (_notificationService) {
      NotificationService = _notificationService.NotificationService;
    }, function (_publicMerchantService) {
      PublicMerchantService = _publicMerchantService.PublicMerchantService;
    }, function (_storeService) {
      StoreService = _storeService.StoreService;
    }, function (_transactionService) {
      TransactionService = _transactionService.TransactionService;
    }, function (_storeGroupService) {
      StoreGroupService = _storeGroupService.StoreGroupService;
    }],
    execute: function () {
      General = {};

      _export('General', General);

      General.SkeletonService = SkeletonService;
      General.AccountService = AccountService;
      General.AccountDeviceService = AccountDeviceService;
      General.AccountInvitationService = AccountInvitationService;
      General.ContactService = ContactService;
      General.ContractService = ContractService;
      General.DeliveryAddressService = DeliveryAddressService;
      General.DeviceService = DeviceService;
      General.FileAccessService = FileAccessService;
      General.MerchantService = MerchantService;
      General.NewsService = NewsService;
      General.NotificationService = NotificationService;
      General.PublicMerchantService = PublicMerchantService;
      General.StoreGroupService = StoreGroupService;
      General.StoreService = StoreService;
      General.TransactionService = TransactionService;
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9nZW5lcmFsL2dlbmVyYWwuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2lUQTRCYSxPQUFPOzs7eUNBakJaLGVBQWU7O3VDQUNmLGNBQWM7O21EQUNkLG9CQUFvQjs7MkRBQ3BCLHdCQUF3Qjs7dUNBQ3hCLGNBQWM7O3lDQUNkLGVBQWU7O3VEQUNmLHNCQUFzQjs7cUNBQ3RCLGFBQWE7OzZDQUNiLGlCQUFpQjs7eUNBQ2pCLGVBQWU7O2lDQUNmLFdBQVc7O2lEQUNYLG1CQUFtQjs7cURBQ25CLHFCQUFxQjs7bUNBQ3JCLFlBQVk7OytDQUNaLGtCQUFrQjs7NkNBQ2xCLGlCQUFpQjs7O0FBRVosYUFBTyxHQUFHLEVBQUU7Ozs7QUFFekIsYUFBTyxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7QUFDMUMsYUFBTyxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7QUFDeEMsYUFBTyxDQUFDLG9CQUFvQixHQUFHLG9CQUFvQixDQUFDO0FBQ3BELGFBQU8sQ0FBQyx3QkFBd0IsR0FBRyx3QkFBd0IsQ0FBQztBQUM1RCxhQUFPLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztBQUN4QyxhQUFPLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztBQUMxQyxhQUFPLENBQUMsc0JBQXNCLEdBQUcsc0JBQXNCLENBQUM7QUFDeEQsYUFBTyxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7QUFDdEMsYUFBTyxDQUFDLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDO0FBQzlDLGFBQU8sQ0FBQyxlQUFlLEdBQUcsZUFBZSxDQUFDO0FBQzFDLGFBQU8sQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO0FBQ2xDLGFBQU8sQ0FBQyxtQkFBbUIsR0FBRyxtQkFBbUIsQ0FBQztBQUNsRCxhQUFPLENBQUMscUJBQXFCLEdBQUcscUJBQXFCLENBQUM7QUFDdEQsYUFBTyxDQUFDLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDO0FBQzlDLGFBQU8sQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFDO0FBQ3BDLGFBQU8sQ0FBQyxrQkFBa0IsR0FBRyxrQkFBa0IsQ0FBQyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3QvZ2VuZXJhbC9nZW5lcmFsLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==
