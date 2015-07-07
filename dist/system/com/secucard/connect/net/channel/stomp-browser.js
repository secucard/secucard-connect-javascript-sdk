System.register(['stompjs', 'sockjs-client'], function (_export) {
  'use strict';

  var Stomp, SockJS, StompBrowser;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_stompjs) {
      Stomp = _stompjs['default'];
    }, function (_sockjsClient) {
      SockJS = _sockjsClient['default'];
    }],
    execute: function () {
      StompBrowser = function StompBrowser(wsUrl) {
        _classCallCheck(this, StompBrowser);

        return new Stomp.over(new SockJS(wsUrl));
      };

      _export('StompBrowser', StompBrowser);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbS9zZWN1Y2FyZC9jb25uZWN0L25ldC9jaGFubmVsL3N0b21wLWJyb3dzZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O3FCQUdhLFlBQVk7Ozs7Ozs7Ozs7O0FBQVosa0JBQVksR0FDWixTQURBLFlBQVksQ0FDWCxLQUFLLEVBQUU7OEJBRFIsWUFBWTs7QUFFckIsZUFBTyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtPQUN6Qzs7OEJBSFUsWUFBWSIsImZpbGUiOiJjb20vc2VjdWNhcmQvY29ubmVjdC9uZXQvY2hhbm5lbC9zdG9tcC1icm93c2VyLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==