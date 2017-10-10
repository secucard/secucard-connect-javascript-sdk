System.register(['./action-campaign-service', './action-config-service', './action-message-service', './action-profile-service', './action-service', './beacon-service', './card-group-service', './card-service', './charge-service', './checkin-service', './customer-service', './merchant-card-service', './program-service', './program-special-service', './report-service', './sale-service', './store-group-service', './transaction-service', './payment-container-service'], function (_export) {
  'use strict';

  var ActionCampaignService, ActionConfigService, ActionMessageService, ActionProfileService, ActionService, BeaconService, CardGroupService, CardService, ChargeService, CheckinService, CustomerService, MerchantCardService, ProgramService, ProgramSpecialService, ReportService, SaleService, StoreGroupService, TransactionService, PaymentContainerService, Loyalty;
  return {
    setters: [function (_actionCampaignService) {
      ActionCampaignService = _actionCampaignService.ActionCampaignService;
    }, function (_actionConfigService) {
      ActionConfigService = _actionConfigService.ActionConfigService;
    }, function (_actionMessageService) {
      ActionMessageService = _actionMessageService.ActionMessageService;
    }, function (_actionProfileService) {
      ActionProfileService = _actionProfileService.ActionProfileService;
    }, function (_actionService) {
      ActionService = _actionService.ActionService;
    }, function (_beaconService) {
      BeaconService = _beaconService.BeaconService;
    }, function (_cardGroupService) {
      CardGroupService = _cardGroupService.CardGroupService;
    }, function (_cardService) {
      CardService = _cardService.CardService;
    }, function (_chargeService) {
      ChargeService = _chargeService.ChargeService;
    }, function (_checkinService) {
      CheckinService = _checkinService.CheckinService;
    }, function (_customerService) {
      CustomerService = _customerService.CustomerService;
    }, function (_merchantCardService) {
      MerchantCardService = _merchantCardService.MerchantCardService;
    }, function (_programService) {
      ProgramService = _programService.ProgramService;
    }, function (_programSpecialService) {
      ProgramSpecialService = _programSpecialService.ProgramSpecialService;
    }, function (_reportService) {
      ReportService = _reportService.ReportService;
    }, function (_saleService) {
      SaleService = _saleService.SaleService;
    }, function (_storeGroupService) {
      StoreGroupService = _storeGroupService.StoreGroupService;
    }, function (_transactionService) {
      TransactionService = _transactionService.TransactionService;
    }, function (_paymentContainerService) {
      PaymentContainerService = _paymentContainerService.PaymentContainerService;
    }],
    execute: function () {
      Loyalty = {};

      _export('Loyalty', Loyalty);

      Loyalty.ActionCampaignService = ActionCampaignService;
      Loyalty.ActionConfigService = ActionConfigService;
      Loyalty.ActionMessageService = ActionMessageService;
      Loyalty.ActionProfileService = ActionProfileService;
      Loyalty.ActionService = ActionService;
      Loyalty.BeaconService = BeaconService;
      Loyalty.CardGroupService = CardGroupService;
      Loyalty.CardService = CardService;
      Loyalty.ChargeService = ChargeService;
      Loyalty.CheckinService = CheckinService;
      Loyalty.CustomerService = CustomerService;
      Loyalty.MerchantCardService = MerchantCardService;
      Loyalty.ProgramService = ProgramService;
      Loyalty.ProgramSpecialService = ProgramSpecialService;
      Loyalty.ReportService = ReportService;
      Loyalty.SaleService = SaleService;
      Loyalty.StoreGroupService = StoreGroupService;
      Loyalty.TransactionService = TransactionService;
      Loyalty.PaymentContainerService = PaymentContainerService;
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L2xveWFsdHkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O21XQStCYSxPQUFPOzs7cURBcEJaLHFCQUFxQjs7aURBQ3JCLG1CQUFtQjs7bURBQ25CLG9CQUFvQjs7bURBQ3BCLG9CQUFvQjs7cUNBQ3BCLGFBQWE7O3FDQUNiLGFBQWE7OzJDQUNiLGdCQUFnQjs7aUNBQ2hCLFdBQVc7O3FDQUNYLGFBQWE7O3VDQUNiLGNBQWM7O3lDQUNkLGVBQWU7O2lEQUNmLG1CQUFtQjs7dUNBQ25CLGNBQWM7O3FEQUNkLHFCQUFxQjs7cUNBQ3JCLGFBQWE7O2lDQUNiLFdBQVc7OzZDQUNYLGlCQUFpQjs7K0NBQ2pCLGtCQUFrQjs7eURBQ2xCLHVCQUF1Qjs7O0FBRWxCLGFBQU8sR0FBRyxFQUFFOzs7O0FBQ3pCLGFBQU8sQ0FBQyxxQkFBcUIsR0FBRyxxQkFBcUIsQ0FBQztBQUN0RCxhQUFPLENBQUMsbUJBQW1CLEdBQUcsbUJBQW1CLENBQUM7QUFDbEQsYUFBTyxDQUFDLG9CQUFvQixHQUFHLG9CQUFvQixDQUFDO0FBQ3BELGFBQU8sQ0FBQyxvQkFBb0IsR0FBRyxvQkFBb0IsQ0FBQztBQUNwRCxhQUFPLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztBQUN0QyxhQUFPLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztBQUN0QyxhQUFPLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7QUFDNUMsYUFBTyxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7QUFDbEMsYUFBTyxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7QUFDdEMsYUFBTyxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7QUFDeEMsYUFBTyxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7QUFDMUMsYUFBTyxDQUFDLG1CQUFtQixHQUFHLG1CQUFtQixDQUFDO0FBQ2xELGFBQU8sQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO0FBQ3hDLGFBQU8sQ0FBQyxxQkFBcUIsR0FBRyxxQkFBcUIsQ0FBQztBQUN0RCxhQUFPLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztBQUN0QyxhQUFPLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztBQUNsQyxhQUFPLENBQUMsaUJBQWlCLEdBQUcsaUJBQWlCLENBQUM7QUFDOUMsYUFBTyxDQUFDLGtCQUFrQixHQUFHLGtCQUFrQixDQUFDO0FBQ2hELGFBQU8sQ0FBQyx1QkFBdUIsR0FBRyx1QkFBdUIsQ0FBQyIsImZpbGUiOiJkZS5zZWN1Y2FyZC5jb25uZWN0L3Byb2R1Y3QvbG95YWx0eS9sb3lhbHR5LmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==
