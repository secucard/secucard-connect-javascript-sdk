System.register(['./clearing-sepa-inbatchs', './clearing-sepa-inrecords', './clearing-sepa-outbatchs', './clearing-sepa-outrecords'], function (_export) {
  'use strict';

  var ClearingSepainbatchsService, ClearingSepainrecordsService, ClearingSepaoutbatchsService, ClearingSepaoutrecordsService, Clearing;
  return {
    setters: [function (_clearingSepaInbatchs) {
      ClearingSepainbatchsService = _clearingSepaInbatchs.ClearingSepainbatchsService;
    }, function (_clearingSepaInrecords) {
      ClearingSepainrecordsService = _clearingSepaInrecords.ClearingSepainrecordsService;
    }, function (_clearingSepaOutbatchs) {
      ClearingSepaoutbatchsService = _clearingSepaOutbatchs.ClearingSepaoutbatchsService;
    }, function (_clearingSepaOutrecords) {
      ClearingSepaoutrecordsService = _clearingSepaOutrecords.ClearingSepaoutrecordsService;
    }],
    execute: function () {
      Clearing = {};

      _export('Clearing', Clearing);

      Clearing.ClearingSepainbatchsService = ClearingSepainbatchsService;
      Clearing.ClearingSepainrecordsService = ClearingSepainrecordsService;
      Clearing.ClearingSepaoutbatchsService = ClearingSepaoutbatchsService;
      Clearing.ClearingSepaoutrecordsService = ClearingSepaoutrecordsService;
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9jbGVhcmluZy9jbGVhcmluZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OEhBZ0JhLFFBQVE7OzswREFMYiwyQkFBMkI7OzREQUMzQiw0QkFBNEI7OzREQUM1Qiw0QkFBNEI7OzhEQUM1Qiw2QkFBNkI7OztBQUV4QixjQUFRLEdBQUcsRUFBRTs7OztBQUMxQixjQUFRLENBQUMsMkJBQTJCLEdBQUcsMkJBQTJCLENBQUM7QUFDbkUsY0FBUSxDQUFDLDRCQUE0QixHQUFHLDRCQUE0QixDQUFDO0FBQ3JFLGNBQVEsQ0FBQyw0QkFBNEIsR0FBRyw0QkFBNEIsQ0FBQztBQUNyRSxjQUFRLENBQUMsNkJBQTZCLEdBQUcsNkJBQTZCLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L2NsZWFyaW5nL2NsZWFyaW5nLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==
