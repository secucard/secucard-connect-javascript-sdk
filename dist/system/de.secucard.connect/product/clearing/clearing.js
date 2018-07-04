System.register(['./sepa-inbatchs-service', './sepa-inrecords-service', './sepa-outbatchs-service', './sepa-outrecords-service'], function (_export) {
  'use strict';

  var SepaInbatchsService, SepaInrecordsService, SepaOutbatchsService, SepaOutrecordsService, Clearing;
  return {
    setters: [function (_sepaInbatchsService) {
      SepaInbatchsService = _sepaInbatchsService.SepaInbatchsService;
    }, function (_sepaInrecordsService) {
      SepaInrecordsService = _sepaInrecordsService.SepaInrecordsService;
    }, function (_sepaOutbatchsService) {
      SepaOutbatchsService = _sepaOutbatchsService.SepaOutbatchsService;
    }, function (_sepaOutrecordsService) {
      SepaOutrecordsService = _sepaOutrecordsService.SepaOutrecordsService;
    }],
    execute: function () {
      Clearing = {};

      _export('Clearing', Clearing);

      Clearing.SepaInbatchsService = SepaInbatchsService;
      Clearing.SepaInrecordsService = SepaInrecordsService;
      Clearing.SepaOutbatchsService = SepaOutbatchsService;
      Clearing.SepaOutrecordsService = SepaOutrecordsService;
    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9jbGVhcmluZy9jbGVhcmluZy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OEZBZ0JhLFFBQVE7OztpREFMYixtQkFBbUI7O21EQUNuQixvQkFBb0I7O21EQUNwQixvQkFBb0I7O3FEQUNwQixxQkFBcUI7OztBQUVoQixjQUFRLEdBQUcsRUFBRTs7OztBQUMxQixjQUFRLENBQUMsbUJBQW1CLEdBQUcsbUJBQW1CLENBQUM7QUFDbkQsY0FBUSxDQUFDLG9CQUFvQixHQUFHLG9CQUFvQixDQUFDO0FBQ3JELGNBQVEsQ0FBQyxvQkFBb0IsR0FBRyxvQkFBb0IsQ0FBQztBQUNyRCxjQUFRLENBQUMscUJBQXFCLEdBQUcscUJBQXFCLENBQUMiLCJmaWxlIjoiZGUuc2VjdWNhcmQuY29ubmVjdC9wcm9kdWN0L2NsZWFyaW5nL2NsZWFyaW5nLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==
