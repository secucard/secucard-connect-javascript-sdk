System.register(['stomp-websocket', 'sockjs-client'], function (_export) {
  'use strict';

  var StompJS, SockJSClient, TEMP_QUEUE, REQUEST_DESTINATION, notify, stompDestination, tempQueue, requestHeader, StompBrowser;

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

      stompDestination = function stompDestination(requestMethod) {
        return REQUEST_DESTINATION + '/' + requestMethod;
      };

      tempQueue = function tempQueue() {
        return TEMP_QUEUE;
      };

      requestHeader = function requestHeader(accessToken, requestId, options) {
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

          this.wsUrl = wsUrl;
          this._listener = null;
          return this;
        }

        StompBrowser.prototype.listener = function listener(_listener) {
          this._listener = _listener;
          return this;
        };

        StompBrowser.prototype.notifyListener = function notifyListener(event, details) {
          notify.call(this, event, details);
        };

        StompBrowser.prototype.request = function request(_ref) {
          var _ref$accessToken = _ref.accessToken;
          var accessToken = _ref$accessToken === undefined ? '' : _ref$accessToken;
          var _ref$requestMethod = _ref.requestMethod;
          var requestMethod = _ref$requestMethod === undefined ? '' : _ref$requestMethod;
          var _ref$requestId = _ref.requestId;
          var requestId = _ref$requestId === undefined ? '' : _ref$requestId;
          var _ref$options = _ref.options;
          var options = _ref$options === undefined ? {} : _ref$options;

          var self = this;
          var client = StompJS.over(new SockJSClient.SockJS(self.wsUrl));
          var destination = stompDestination(requestMethod);
          var connect = function connect() {
            var onerror = function onerror(frame) {
              self.notifyListener('error', frame);
            };
            client.connect(accessToken, accessToken, function (frame) {
              self.notifyListener('connected');
              client.subscribe(destination, function (message) {
                var type = message.correlationId ? 'message' : 'event';
                self.notifyListener(type, message);
                if (type == 'message') {
                  client.disconnect();
                }
              });
              var header = requestHeader(accessToken, requestId, options);
              var payload = JSON.stringify(options.payload || {});
              client.send(destination, header, payload);
            }, onerror, '/');
          };
          connect();
        };

        return StompBrowser;
      })();

      _export('StompBrowser', StompBrowser);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbS9zZWN1Y2FyZC9jb25uZWN0L25ldC9jaGFubmVsL3N0b21wLWJyb3dzZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OzZCQUdJLFVBQVUsRUFFVixtQkFBbUIsRUFFbkIsTUFBTSxFQU1OLGdCQUFnQixFQUloQixTQUFTLEVBSVQsYUFBYSxFQVlKLFlBQVk7Ozs7Ozs7Ozs7O0FBOUJyQixnQkFBVSxHQUFHLGtCQUFrQjtBQUUvQix5QkFBbUIsR0FBRyx1QkFBdUI7O0FBRTdDLFlBQU0sR0FBRyxTQUFULE1BQU0sQ0FBWSxLQUFLLEVBQUUsT0FBTyxFQUFFO0FBQ3BDLFlBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtBQUNsQixjQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQTtTQUMvQjtPQUNGOztBQUVHLHNCQUFnQixHQUFHLFNBQW5CLGdCQUFnQixDQUFZLGFBQWEsRUFBRTtBQUM3QyxlQUFVLG1CQUFtQixTQUFJLGFBQWEsQ0FBRTtPQUNqRDs7QUFFRyxlQUFTLEdBQUcsU0FBWixTQUFTLEdBQWM7QUFDekIsZUFBTyxVQUFVLENBQUE7T0FDbEI7O0FBRUcsbUJBQWEsR0FBRyxTQUFoQixhQUFhLENBQVksV0FBVyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUU7QUFDNUQsWUFBSSxPQUFPLEdBQUc7QUFDWixtQkFBUyxFQUFFLElBQUksQ0FBQyxXQUFXO0FBQzNCLG9CQUFVLEVBQUUsU0FBUyxFQUFFO0FBQ3ZCLDBCQUFnQixFQUFFLFNBQVM7U0FDNUIsQ0FBQTtBQUNELFlBQUksT0FBTyxDQUFDLEtBQUssRUFBRTtBQUNqQixpQkFBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUE7U0FDbEM7QUFDRCxlQUFPLE9BQU8sQ0FBQTtPQUNmOztBQUVZLGtCQUFZO0FBQ1osaUJBREEsWUFBWSxDQUNYLEtBQUssRUFBRTtnQ0FEUixZQUFZOztBQUVyQixjQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtBQUNsQixjQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQTtBQUNyQixpQkFBTyxJQUFJLENBQUE7U0FDWjs7QUFMVSxvQkFBWSxXQU12QixRQUFRLEdBQUEsa0JBQUMsU0FBUSxFQUFFO0FBQ2pCLGNBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUSxDQUFBO0FBQ3pCLGlCQUFPLElBQUksQ0FBQTtTQUNaOztBQVRVLG9CQUFZLFdBVXZCLGNBQWMsR0FBQSx3QkFBQyxLQUFLLEVBQUUsT0FBTyxFQUFFO0FBQzdCLGdCQUFNLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUE7U0FDbEM7O0FBWlUsb0JBQVksV0FhdkIsT0FBTyxHQUFBLGlCQUFDLElBQTRELEVBQUU7aUNBQTlELElBQTRELENBQTNELFdBQVc7Y0FBWCxXQUFXLG9DQUFDLEVBQUU7bUNBQWYsSUFBNEQsQ0FBM0MsYUFBYTtjQUFiLGFBQWEsc0NBQUMsRUFBRTsrQkFBakMsSUFBNEQsQ0FBekIsU0FBUztjQUFULFNBQVMsa0NBQUMsRUFBRTs2QkFBL0MsSUFBNEQsQ0FBWCxPQUFPO2NBQVAsT0FBTyxnQ0FBQyxFQUFFOztBQUNqRSxjQUFJLElBQUksR0FBRyxJQUFJLENBQUE7QUFDZixjQUFJLE1BQU0sR0FBSSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtBQUMvRCxjQUFJLFdBQVcsR0FBRyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsQ0FBQTtBQUNqRCxjQUFJLE9BQU8sR0FBRyxTQUFWLE9BQU8sR0FBYztBQUN2QixnQkFBSSxPQUFPLEdBQUcsU0FBVixPQUFPLENBQUksS0FBSyxFQUFLO0FBQ3ZCLGtCQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQTthQUNwQyxDQUFBO0FBQ0Qsa0JBQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLFdBQVcsRUFBRSxVQUFDLEtBQUssRUFBSztBQUNsRCxrQkFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQTtBQUNoQyxvQkFBTSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsVUFBQyxPQUFPLEVBQUs7QUFDeEMsb0JBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxhQUFhLEdBQUcsU0FBUyxHQUFHLE9BQU8sQ0FBQTtBQUN0RCxvQkFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUE7QUFDbEMsb0JBQUksSUFBSSxJQUFJLFNBQVMsRUFBRTtBQUN0Qix3QkFBTSxDQUFDLFVBQVUsRUFBRSxDQUFBO2lCQUNuQjtlQUNILENBQUMsQ0FBQTtBQUNGLGtCQUFJLE1BQU0sR0FBRyxhQUFhLENBQUMsV0FBVyxFQUFFLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQTtBQUMzRCxrQkFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFBO0FBQ25ELG9CQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUE7YUFDMUMsRUFBRSxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUE7V0FDakIsQ0FBQTtBQUNELGlCQUFPLEVBQUUsQ0FBQTtTQUNWOztlQXBDVSxZQUFZOzs7OEJBQVosWUFBWSIsImZpbGUiOiJjb20vc2VjdWNhcmQvY29ubmVjdC9uZXQvY2hhbm5lbC9zdG9tcC1icm93c2VyLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==