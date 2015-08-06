System.register(['./beacon-service', './card-group-service', './card-service', './charge-service', './checkin-service', './customer-service', './merchant-card-service', './program-service', './program-special-service', './sale-service'], function (_export) {
  'use strict';

  var BeaconService, CardGroupService, CardService, ChargeService, CheckinService, CustomerService, MerchantCardService, ProgramService, ProgramSpecialService, SaleService, Loyalty;
  return {
    setters: [function (_beaconService) {
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
    }],
    execute: function () {
      Loyalty = {};

      _export('Loyalty', Loyalty);

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
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L2xveWFsdHkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OzZLQXNCYSxPQUFPOzs7cUNBWFosYUFBYTs7MkNBQ2IsZ0JBQWdCOztpQ0FDaEIsV0FBVzs7cUNBQ1gsYUFBYTs7dUNBQ2IsY0FBYzs7eUNBQ2QsZUFBZTs7aURBQ2YsbUJBQW1COzt1Q0FDbkIsY0FBYzs7cURBQ2QscUJBQXFCOztpQ0FDckIsV0FBVzs7O0FBRU4sYUFBTyxHQUFHLEVBQUU7O3lCQUFaLE9BQU87O0FBQ3BCLGFBQU8sQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO0FBQ3RDLGFBQU8sQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztBQUM1QyxhQUFPLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztBQUNsQyxhQUFPLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztBQUN0QyxhQUFPLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztBQUN4QyxhQUFPLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztBQUMxQyxhQUFPLENBQUMsbUJBQW1CLEdBQUcsbUJBQW1CLENBQUM7QUFDbEQsYUFBTyxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7QUFDeEMsYUFBTyxDQUFDLHFCQUFxQixHQUFHLHFCQUFxQixDQUFDO0FBQ3RELGFBQU8sQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9sb3lhbHR5L2xveWFsdHkuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9