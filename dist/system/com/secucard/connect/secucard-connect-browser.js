System.register(['./net/channel/stomp-browser'], function (_export) {
  'use strict';

  var StompBrowser, SecucardConnectBrowser;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_netChannelStompBrowser) {
      StompBrowser = _netChannelStompBrowser.StompBrowser;
    }],
    execute: function () {
      SecucardConnectBrowser = function SecucardConnectBrowser(config) {
        _classCallCheck(this, SecucardConnectBrowser);

        this.stomp = new StompBrowser(config.stomp.wsUrl);
      };

      _export('SecucardConnectBrowser', SecucardConnectBrowser);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbS9zZWN1Y2FyZC9jb25uZWN0L3NlY3VjYXJkLWNvbm5lY3QtYnJvd3Nlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7b0JBRWEsc0JBQXNCOzs7Ozs7NkNBRjNCLFlBQVk7OztBQUVQLDRCQUFzQixHQUN0QixTQURBLHNCQUFzQixDQUNyQixNQUFNLEVBQUU7OEJBRFQsc0JBQXNCOztBQUUvQixZQUFJLENBQUMsS0FBSyxHQUFHLElBQUksWUFBWSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7T0FDbEQ7O3dDQUhVLHNCQUFzQiIsImZpbGUiOiJjb20vc2VjdWNhcmQvY29ubmVjdC9zZWN1Y2FyZC1jb25uZWN0LWJyb3dzZXIuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9