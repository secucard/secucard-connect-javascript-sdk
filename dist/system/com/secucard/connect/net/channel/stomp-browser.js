System.register(['stomp-websocket', 'sockjs-client'], function (_export) {
  'use strict';

  var StompJS, SockJSClient, TEMP_QUEUE, REQUEST_DESTINATION, notify, destination, tempQueue, header, StompBrowser;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

  return {
    setters: [function (_stompWebsocket) {
      StompJS = _stompWebsocket['default'];
    }, function (_sockjsClient) {
      SockJSClient = _sockjsClient['default'];
    }],
    execute: function () {
      TEMP_QUEUE = '/temp-queue/main';
      REQUEST_DESTINATION = '/exchange/connect.api';

      notify = function notify(event, details) {
        if (this._listener) {
          this._listener(event, details);
        }
      };

      destination = function destination(requestMethod) {
        REQUEST_DESTINATION + '/' + requestMethod;
      };

      tempQueue = function tempQueue() {
        return TEMP_QUEUE;
      };

      header = function header(requestId, options) {
        var _header = {
          'user-id': this.accessToken,
          'reply-to': tempQueue(),
          'correlation-id': requestId
        };
        if (options.appId) {
          _header['app-id'] = options.appId;
        }
        return _header;
      };

      StompBrowser = (function () {
        function StompBrowser(wsUrl) {
          _classCallCheck(this, StompBrowser);

          this.client = StompJS.over(new SockJSClient.SockJS(wsUrl));
          this._listener = null;
          return this;
        }

        StompBrowser.prototype.listener = function listener(_listener) {
          this._listener;
          return this;
        };

        StompBrowser.prototype.notifyListener = function notifyListener(event, details) {
          notify.call(event, details);
        };

        StompBrowser.prototype.requestHeader = function requestHeader() {
          header.call(this);
        };

        StompBrowser.prototype.request = function request(_ref) {
          var _this = this;

          var _ref$accessToken = _ref.accessToken;
          var accessToken = _ref$accessToken === undefined ? '' : _ref$accessToken;
          var _ref$requestMethod = _ref.requestMethod;
          var requestMethod = _ref$requestMethod === undefined ? '' : _ref$requestMethod;
          var _ref$requestId = _ref.requestId;
          var requestId = _ref$requestId === undefined ? '' : _ref$requestId;
          var _ref$options = _ref.options;
          var options = _ref$options === undefined ? {} : _ref$options;

          var self = this;
          var onerror = function onerror(frame) {
            self.notifyListener('error', frame);
          };
          self.client.connect(accessToken, accessToken, function (frame) {
            self.notifyListener('connected');
            self.client.subscribe(destination, function (message) {
              var type = message.correlationId ? 'message' : 'event';
              self.notifyListener(type, message);
            });
            _this.client.send(destination(requestMethod), requestHeader(requestId, options), JSON.stringify(payload));
          }, onerror);
        };

        return StompBrowser;
      })();

      _export('StompBrowser', StompBrowser);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbS9zZWN1Y2FyZC9jb25uZWN0L25ldC9jaGFubmVsL3N0b21wLWJyb3dzZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OzZCQUdJLFVBQVUsRUFFVixtQkFBbUIsRUFFbkIsTUFBTSxFQU1OLFdBQVcsRUFJWCxTQUFTLEVBSVQsTUFBTSxFQVlHLFlBQVk7Ozs7Ozs7Ozs7O0FBOUJyQixnQkFBVSxHQUFHLGtCQUFrQjtBQUUvQix5QkFBbUIsR0FBRyx1QkFBdUI7O0FBRTdDLFlBQU0sR0FBRyxTQUFULE1BQU0sQ0FBWSxLQUFLLEVBQUUsT0FBTyxFQUFFO0FBQ3BDLFlBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtBQUNsQixjQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQTtTQUMvQjtPQUNGOztBQUVHLGlCQUFXLEdBQUcsU0FBZCxXQUFXLENBQUksYUFBYSxFQUFLO0FBQ25DLEFBQUcsMkJBQW1CLFNBQUksYUFBYSxDQUFFO09BQzFDOztBQUVHLGVBQVMsR0FBRyxTQUFaLFNBQVMsR0FBYztBQUN6QixlQUFPLFVBQVUsQ0FBQTtPQUNsQjs7QUFFRyxZQUFNLEdBQUcsU0FBVCxNQUFNLENBQVksU0FBUyxFQUFFLE9BQU8sRUFBRTtBQUN4QyxZQUFJLE9BQU8sR0FBRztBQUNaLG1CQUFTLEVBQUUsSUFBSSxDQUFDLFdBQVc7QUFDM0Isb0JBQVUsRUFBRSxTQUFTLEVBQUU7QUFDdkIsMEJBQWdCLEVBQUUsU0FBUztTQUM1QixDQUFBO0FBQ0QsWUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFO0FBQ2pCLGlCQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQTtTQUNsQztBQUNELGVBQU8sT0FBTyxDQUFBO09BQ2Y7O0FBRVksa0JBQVk7QUFDWixpQkFEQSxZQUFZLENBQ1gsS0FBSyxFQUFFO2dDQURSLFlBQVk7O0FBRXJCLGNBQUksQ0FBQyxNQUFNLEdBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLFlBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtBQUMzRCxjQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQTtBQUNyQixpQkFBTyxJQUFJLENBQUE7U0FDWjs7QUFMVSxvQkFBWSxXQU12QixRQUFRLEdBQUEsa0JBQUMsU0FBUSxFQUFFO0FBQ2pCLGNBQUksQ0FBQyxTQUFTLENBQUE7QUFDZCxpQkFBTyxJQUFJLENBQUE7U0FDWjs7QUFUVSxvQkFBWSxXQVV2QixjQUFjLEdBQUEsd0JBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRTtBQUM3QixnQkFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUE7U0FDNUI7O0FBWlUsb0JBQVksV0FhdkIsYUFBYSxHQUFBLHlCQUFHO0FBQ2QsZ0JBQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7U0FDbEI7O0FBZlUsb0JBQVksV0FnQnZCLE9BQU8sR0FBQSxpQkFBQyxJQUE0RCxFQUFFOzs7aUNBQTlELElBQTRELENBQTNELFdBQVc7Y0FBWCxXQUFXLG9DQUFDLEVBQUU7bUNBQWYsSUFBNEQsQ0FBM0MsYUFBYTtjQUFiLGFBQWEsc0NBQUMsRUFBRTsrQkFBakMsSUFBNEQsQ0FBekIsU0FBUztjQUFULFNBQVMsa0NBQUMsRUFBRTs2QkFBL0MsSUFBNEQsQ0FBWCxPQUFPO2NBQVAsT0FBTyxnQ0FBQyxFQUFFOztBQUNqRSxjQUFJLElBQUksR0FBRyxJQUFJLENBQUE7QUFDZixjQUFJLE9BQU8sR0FBRyxTQUFWLE9BQU8sQ0FBWSxLQUFLLEVBQUU7QUFDNUIsZ0JBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFBO1dBQ3BDLENBQUE7QUFDRCxjQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsV0FBVyxFQUFFLFVBQUMsS0FBSyxFQUFLO0FBQ3ZELGdCQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFBO0FBQ2hDLGdCQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsVUFBQyxPQUFPLEVBQUs7QUFDN0Msa0JBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxhQUFhLEdBQUcsU0FBUyxHQUFHLE9BQU8sQ0FBQTtBQUN0RCxrQkFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUE7YUFDcEMsQ0FBQyxDQUFBO0FBQ0Ysa0JBQUssTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEVBQUUsYUFBYSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUE7V0FDekcsRUFBRSxPQUFPLENBQUMsQ0FBQTtTQUNaOztlQTdCVSxZQUFZOzs7OEJBQVosWUFBWSIsImZpbGUiOiJjb20vc2VjdWNhcmQvY29ubmVjdC9uZXQvY2hhbm5lbC9zdG9tcC1icm93c2VyLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==