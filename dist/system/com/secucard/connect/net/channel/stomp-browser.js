System.register(['stomp-websocket', 'sockjs-client'], function (_export) {
  'use strict';

  var StompJS, SockJSClient, StompBrowser;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_stompWebsocket) {
      StompJS = _stompWebsocket['default'];
    }, function (_sockjsClient) {
      SockJSClient = _sockjsClient['default'];
    }],
    execute: function () {
      StompBrowser = function StompBrowser(wsUrl) {
        _classCallCheck(this, StompBrowser);

        return new StompJS.over(new SockJSClient.SockJS(wsUrl));
      };

      _export('StompBrowser', StompBrowser);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbS9zZWN1Y2FyZC9jb25uZWN0L25ldC9jaGFubmVsL3N0b21wLWJyb3dzZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OzZCQUdhLFlBQVk7Ozs7Ozs7Ozs7O0FBQVosa0JBQVksR0FDWixTQURBLFlBQVksQ0FDWCxLQUFLLEVBQUU7OEJBRFIsWUFBWTs7QUFFckIsZUFBTyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxZQUFZLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7T0FDeEQ7OzhCQUhVLFlBQVkiLCJmaWxlIjoiY29tL3NlY3VjYXJkL2Nvbm5lY3QvbmV0L2NoYW5uZWwvc3RvbXAtYnJvd3Nlci5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=