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
          'user-id': accessToken,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbS9zZWN1Y2FyZC9jb25uZWN0L25ldC9jaGFubmVsL3N0b21wLWJyb3dzZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OzZCQUdJLFVBQVUsRUFFVixtQkFBbUIsRUFFbkIsTUFBTSxFQU1OLGdCQUFnQixFQUloQixTQUFTLEVBSVQsYUFBYSxFQVlKLFlBQVk7Ozs7Ozs7Ozs7O0FBOUJyQixnQkFBVSxHQUFHLGtCQUFrQjtBQUUvQix5QkFBbUIsR0FBRyx1QkFBdUI7O0FBRTdDLFlBQU0sR0FBRyxTQUFULE1BQU0sQ0FBWSxLQUFLLEVBQUUsT0FBTyxFQUFFO0FBQ3BDLFlBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtBQUNsQixjQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQTtTQUMvQjtPQUNGOztBQUVHLHNCQUFnQixHQUFHLFNBQW5CLGdCQUFnQixDQUFZLGFBQWEsRUFBRTtBQUM3QyxlQUFVLG1CQUFtQixTQUFJLGFBQWEsQ0FBRTtPQUNqRDs7QUFFRyxlQUFTLEdBQUcsU0FBWixTQUFTLEdBQWM7QUFDekIsZUFBTyxVQUFVLENBQUE7T0FDbEI7O0FBRUcsbUJBQWEsR0FBRyxTQUFoQixhQUFhLENBQVksV0FBVyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUU7QUFDNUQsWUFBSSxPQUFPLEdBQUc7QUFDWixtQkFBUyxFQUFFLFdBQVc7QUFDdEIsb0JBQVUsRUFBRSxTQUFTLEVBQUU7QUFDdkIsMEJBQWdCLEVBQUUsU0FBUztTQUM1QixDQUFBO0FBQ0QsWUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFO0FBQ2pCLGlCQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQTtTQUNsQztBQUNELGVBQU8sT0FBTyxDQUFBO09BQ2Y7O0FBRVksa0JBQVk7QUFDWixpQkFEQSxZQUFZLENBQ1gsS0FBSyxFQUFFO2dDQURSLFlBQVk7O0FBRXJCLGNBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO0FBQ2xCLGNBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFBO0FBQ3JCLGlCQUFPLElBQUksQ0FBQTtTQUNaOztBQUxVLG9CQUFZLFdBTXZCLFFBQVEsR0FBQSxrQkFBQyxTQUFRLEVBQUU7QUFDakIsY0FBSSxDQUFDLFNBQVMsR0FBRyxTQUFRLENBQUE7QUFDekIsaUJBQU8sSUFBSSxDQUFBO1NBQ1o7O0FBVFUsb0JBQVksV0FVdkIsY0FBYyxHQUFBLHdCQUFDLEtBQUssRUFBRSxPQUFPLEVBQUU7QUFDN0IsZ0JBQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQTtTQUNsQzs7QUFaVSxvQkFBWSxXQWF2QixPQUFPLEdBQUEsaUJBQUMsSUFBNEQsRUFBRTtpQ0FBOUQsSUFBNEQsQ0FBM0QsV0FBVztjQUFYLFdBQVcsb0NBQUMsRUFBRTttQ0FBZixJQUE0RCxDQUEzQyxhQUFhO2NBQWIsYUFBYSxzQ0FBQyxFQUFFOytCQUFqQyxJQUE0RCxDQUF6QixTQUFTO2NBQVQsU0FBUyxrQ0FBQyxFQUFFOzZCQUEvQyxJQUE0RCxDQUFYLE9BQU87Y0FBUCxPQUFPLGdDQUFDLEVBQUU7O0FBQ2pFLGNBQUksSUFBSSxHQUFHLElBQUksQ0FBQTtBQUNmLGNBQUksTUFBTSxHQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO0FBQy9ELGNBQUksV0FBVyxHQUFHLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxDQUFBO0FBQ2pELGNBQUksT0FBTyxHQUFHLFNBQVYsT0FBTyxHQUFjO0FBQ3ZCLGdCQUFJLE9BQU8sR0FBRyxTQUFWLE9BQU8sQ0FBSSxLQUFLLEVBQUs7QUFDdkIsa0JBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFBO2FBQ3BDLENBQUE7QUFDRCxrQkFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsV0FBVyxFQUFFLFVBQUMsS0FBSyxFQUFLO0FBQ2xELGtCQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFBO0FBQ2hDLG9CQUFNLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxVQUFDLE9BQU8sRUFBSztBQUN4QyxvQkFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLGFBQWEsR0FBRyxTQUFTLEdBQUcsT0FBTyxDQUFBO0FBQ3RELG9CQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQTtBQUNsQyxvQkFBSSxJQUFJLElBQUksU0FBUyxFQUFFO0FBQ3RCLHdCQUFNLENBQUMsVUFBVSxFQUFFLENBQUE7aUJBQ25CO2VBQ0gsQ0FBQyxDQUFBO0FBQ0Ysa0JBQUksTUFBTSxHQUFHLGFBQWEsQ0FBQyxXQUFXLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFBO0FBQzNELGtCQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLENBQUE7QUFDbkQsb0JBQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQTthQUMxQyxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQTtXQUNqQixDQUFBO0FBQ0QsaUJBQU8sRUFBRSxDQUFBO1NBQ1Y7O2VBcENVLFlBQVk7Ozs4QkFBWixZQUFZIiwiZmlsZSI6ImNvbS9zZWN1Y2FyZC9jb25uZWN0L25ldC9jaGFubmVsL3N0b21wLWJyb3dzZXIuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9