System.register(['./action-campaign-service', './action-email-config-service', './action-profile-service', './action-service', './action-sms-config-service', './beacon-service', './card-group-service', './card-service', './charge-service', './checkin-service', './customer-service', './merchant-card-service', './program-service', './program-special-service', './sale-service', './store-group-service', './transaction-service'], function (_export) {
  'use strict';

  var ActionCampaignService, ActionEmailConfigService, ActionProfileService, ActionService, ActionSmsConfigService, BeaconService, CardGroupService, CardService, ChargeService, CheckinService, CustomerService, MerchantCardService, ProgramService, ProgramSpecialService, SaleService, StoreGroupService, TransactionService, Loyalty;
  return {
    setters: [function (_actionCampaignService) {
      ActionCampaignService = _actionCampaignService.ActionCampaignService;
    }, function (_actionEmailConfigService) {
      ActionEmailConfigService = _actionEmailConfigService.ActionEmailConfigService;
    }, function (_actionProfileService) {
      ActionProfileService = _actionProfileService.ActionProfileService;
    }, function (_actionService) {
      ActionService = _actionService.ActionService;
    }, function (_actionSmsConfigService) {
      ActionSmsConfigService = _actionSmsConfigService.ActionSmsConfigService;
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
    }, function (_saleService) {
      SaleService = _saleService.SaleService;
    }, function (_storeGroupService) {
      StoreGroupService = _storeGroupService.StoreGroupService;
    }, function (_transactionService) {
      TransactionService = _transactionService.TransactionService;
    }],
    execute: function () {
      Loyalty = {};

      _export('Loyalty', Loyalty);

      Loyalty.ActionCampaignService = ActionCampaignService;
      Loyalty.ActionEmailConfigService = ActionEmailConfigService;
      Loyalty.ActionProfileService = ActionProfileService;
      Loyalty.ActionService = ActionService;
      Loyalty.ActionSmsConfigService = ActionSmsConfigService;
      Loyalty.BeaconService = BeaconService;
      Loyalty.CardGroupService = CardGroupService;
      Loyalty.CardService = CardService;
      Loyalty.ChargeService = ChargeService;
      Loyalty.CheckinService = CheckinService;
      Loyalty.CustomerService = CustomerService;
      Loyalty.MerchantCardService = MerchantCardService;
      Loyalty.ProgramService = ProgramService;
      Loyalty.ProgramSpecialService = ProgramSpecialService;
      Loyalty.SaleService = SaleService;
      Loyalty.StoreGroupService = StoreGroupService;
      Loyalty.TransactionService = TransactionService;
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L2xveWFsdHkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2tVQTZCYSxPQUFPOzs7cURBbEJaLHFCQUFxQjs7MkRBQ3JCLHdCQUF3Qjs7bURBQ3hCLG9CQUFvQjs7cUNBQ3BCLGFBQWE7O3VEQUNiLHNCQUFzQjs7cUNBQ3RCLGFBQWE7OzJDQUNiLGdCQUFnQjs7aUNBQ2hCLFdBQVc7O3FDQUNYLGFBQWE7O3VDQUNiLGNBQWM7O3lDQUNkLGVBQWU7O2lEQUNmLG1CQUFtQjs7dUNBQ25CLGNBQWM7O3FEQUNkLHFCQUFxQjs7aUNBQ3JCLFdBQVc7OzZDQUNYLGlCQUFpQjs7K0NBQ2pCLGtCQUFrQjs7O0FBRWIsYUFBTyxHQUFHLEVBQUU7O3lCQUFaLE9BQU87O0FBQ3BCLGFBQU8sQ0FBQyxxQkFBcUIsR0FBRyxxQkFBcUIsQ0FBQztBQUN0RCxhQUFPLENBQUMsd0JBQXdCLEdBQUcsd0JBQXdCLENBQUM7QUFDNUQsYUFBTyxDQUFDLG9CQUFvQixHQUFHLG9CQUFvQixDQUFDO0FBQ3BELGFBQU8sQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO0FBQ3RDLGFBQU8sQ0FBQyxzQkFBc0IsR0FBRyxzQkFBc0IsQ0FBQztBQUN4RCxhQUFPLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztBQUN0QyxhQUFPLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7QUFDNUMsYUFBTyxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7QUFDbEMsYUFBTyxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7QUFDdEMsYUFBTyxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7QUFDeEMsYUFBTyxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7QUFDMUMsYUFBTyxDQUFDLG1CQUFtQixHQUFHLG1CQUFtQixDQUFDO0FBQ2xELGFBQU8sQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO0FBQ3hDLGFBQU8sQ0FBQyxxQkFBcUIsR0FBRyxxQkFBcUIsQ0FBQztBQUN0RCxhQUFPLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztBQUNsQyxhQUFPLENBQUMsaUJBQWlCLEdBQUcsaUJBQWlCLENBQUM7QUFDOUMsYUFBTyxDQUFDLGtCQUFrQixHQUFHLGtCQUFrQixDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L2xveWFsdHkuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9