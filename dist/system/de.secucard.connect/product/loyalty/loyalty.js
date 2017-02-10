System.register(['./action-campaign-service', './action-config-service', './action-profile-service', './action-service', './beacon-service', './card-group-service', './card-service', './charge-service', './checkin-service', './customer-service', './merchant-card-service', './program-service', './program-special-service', './sale-service', './store-group-service', './transaction-service'], function (_export) {
  'use strict';

  var ActionCampaignService, ActionConfigService, ActionProfileService, ActionService, BeaconService, CardGroupService, CardService, ChargeService, CheckinService, CustomerService, MerchantCardService, ProgramService, ProgramSpecialService, SaleService, StoreGroupService, TransactionService, Loyalty;
  return {
    setters: [function (_actionCampaignService) {
      ActionCampaignService = _actionCampaignService.ActionCampaignService;
    }, function (_actionConfigService) {
      ActionConfigService = _actionConfigService.ActionConfigService;
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
      Loyalty.ActionConfigService = ActionConfigService;
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
      Loyalty.SaleService = SaleService;
      Loyalty.StoreGroupService = StoreGroupService;
      Loyalty.TransactionService = TransactionService;
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L2xveWFsdHkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3FTQTRCYSxPQUFPOzs7cURBakJaLHFCQUFxQjs7aURBQ3JCLG1CQUFtQjs7bURBQ25CLG9CQUFvQjs7cUNBQ3BCLGFBQWE7O3FDQUNiLGFBQWE7OzJDQUNiLGdCQUFnQjs7aUNBQ2hCLFdBQVc7O3FDQUNYLGFBQWE7O3VDQUNiLGNBQWM7O3lDQUNkLGVBQWU7O2lEQUNmLG1CQUFtQjs7dUNBQ25CLGNBQWM7O3FEQUNkLHFCQUFxQjs7aUNBQ3JCLFdBQVc7OzZDQUNYLGlCQUFpQjs7K0NBQ2pCLGtCQUFrQjs7O0FBRWIsYUFBTyxHQUFHLEVBQUU7O3lCQUFaLE9BQU87O0FBQ3BCLGFBQU8sQ0FBQyxxQkFBcUIsR0FBRyxxQkFBcUIsQ0FBQztBQUN0RCxhQUFPLENBQUMsbUJBQW1CLEdBQUcsbUJBQW1CLENBQUM7QUFDbEQsYUFBTyxDQUFDLG9CQUFvQixHQUFHLG9CQUFvQixDQUFDO0FBQ3BELGFBQU8sQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO0FBQ3RDLGFBQU8sQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO0FBQ3RDLGFBQU8sQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztBQUM1QyxhQUFPLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztBQUNsQyxhQUFPLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztBQUN0QyxhQUFPLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztBQUN4QyxhQUFPLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztBQUMxQyxhQUFPLENBQUMsbUJBQW1CLEdBQUcsbUJBQW1CLENBQUM7QUFDbEQsYUFBTyxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7QUFDeEMsYUFBTyxDQUFDLHFCQUFxQixHQUFHLHFCQUFxQixDQUFDO0FBQ3RELGFBQU8sQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO0FBQ2xDLGFBQU8sQ0FBQyxpQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQztBQUM5QyxhQUFPLENBQUMsa0JBQWtCLEdBQUcsa0JBQWtCLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L2xveWFsdHkvbG95YWx0eS5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=