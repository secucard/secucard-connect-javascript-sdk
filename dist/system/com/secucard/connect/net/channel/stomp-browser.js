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
        return REQUEST_DESTINATION + '/' + requestMethod;
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

        StompBrowser.prototype.requestHeader = function requestHeader(requestId, options) {
          header.call(this, requestId, options);
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

          var onerror = function onerror(frame) {
            self.notifyListener('error', frame);
          };
          client.connect(accessToken, accessToken, function (frame) {
            self.notifyListener('connected');
            client.subscribe(destination, function (message) {
              var type = message.correlationId ? 'message' : 'event';
              self.notifyListener(type, message);
            });
            client.send(destination(requestMethod), requestHeader(requestId, options), JSON.stringify(options.payload || {}));
          }, onerror);
        };

        return StompBrowser;
      })();

      _export('StompBrowser', StompBrowser);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbS9zZWN1Y2FyZC9jb25uZWN0L25ldC9jaGFubmVsL3N0b21wLWJyb3dzZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OzZCQUdJLFVBQVUsRUFFVixtQkFBbUIsRUFFbkIsTUFBTSxFQU1OLFdBQVcsRUFJWCxTQUFTLEVBSVQsTUFBTSxFQVlHLFlBQVk7Ozs7Ozs7Ozs7O0FBOUJyQixnQkFBVSxHQUFHLGtCQUFrQjtBQUUvQix5QkFBbUIsR0FBRyx1QkFBdUI7O0FBRTdDLFlBQU0sR0FBRyxTQUFULE1BQU0sQ0FBWSxLQUFLLEVBQUUsT0FBTyxFQUFFO0FBQ3BDLFlBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtBQUNsQixjQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQTtTQUMvQjtPQUNGOztBQUVHLGlCQUFXLEdBQUcsU0FBZCxXQUFXLENBQVksYUFBYSxFQUFFO0FBQ3hDLGVBQVUsbUJBQW1CLFNBQUksYUFBYSxDQUFFO09BQ2pEOztBQUVHLGVBQVMsR0FBRyxTQUFaLFNBQVMsR0FBYztBQUN6QixlQUFPLFVBQVUsQ0FBQTtPQUNsQjs7QUFFRyxZQUFNLEdBQUcsU0FBVCxNQUFNLENBQVksU0FBUyxFQUFFLE9BQU8sRUFBRTtBQUN4QyxZQUFJLE9BQU8sR0FBRztBQUNaLG1CQUFTLEVBQUUsSUFBSSxDQUFDLFdBQVc7QUFDM0Isb0JBQVUsRUFBRSxTQUFTLEVBQUU7QUFDdkIsMEJBQWdCLEVBQUUsU0FBUztTQUM1QixDQUFBO0FBQ0QsWUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFO0FBQ2pCLGlCQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQTtTQUNsQztBQUNELGVBQU8sT0FBTyxDQUFBO09BQ2Y7O0FBRVksa0JBQVk7QUFDWixpQkFEQSxZQUFZLENBQ1gsS0FBSyxFQUFFO2dDQURSLFlBQVk7O0FBRXJCLGNBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO0FBQ2xCLGNBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFBO0FBQ3JCLGlCQUFPLElBQUksQ0FBQTtTQUNaOztBQUxVLG9CQUFZLFdBTXZCLFFBQVEsR0FBQSxrQkFBQyxTQUFRLEVBQUU7QUFDakIsY0FBSSxDQUFDLFNBQVMsR0FBRyxTQUFRLENBQUE7QUFDekIsaUJBQU8sSUFBSSxDQUFBO1NBQ1o7O0FBVFUsb0JBQVksV0FVdkIsY0FBYyxHQUFBLHdCQUFDLEtBQUssRUFBRSxPQUFPLEVBQUU7QUFDN0IsZ0JBQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQTtTQUNsQzs7QUFaVSxvQkFBWSxXQWF2QixhQUFhLEdBQUEsdUJBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRTtBQUNoQyxnQkFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFBO1NBQ3RDOztBQWZVLG9CQUFZLFdBZ0J2QixPQUFPLEdBQUEsaUJBQUMsSUFBNEQsRUFBRTtpQ0FBOUQsSUFBNEQsQ0FBM0QsV0FBVztjQUFYLFdBQVcsb0NBQUMsRUFBRTttQ0FBZixJQUE0RCxDQUEzQyxhQUFhO2NBQWIsYUFBYSxzQ0FBQyxFQUFFOytCQUFqQyxJQUE0RCxDQUF6QixTQUFTO2NBQVQsU0FBUyxrQ0FBQyxFQUFFOzZCQUEvQyxJQUE0RCxDQUFYLE9BQU87Y0FBUCxPQUFPLGdDQUFDLEVBQUU7O0FBQ2pFLGNBQUksSUFBSSxHQUFHLElBQUksQ0FBQTtBQUNmLGNBQUksTUFBTSxHQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBOztBQUUvRCxjQUFJLE9BQU8sR0FBRyxTQUFWLE9BQU8sQ0FBSSxLQUFLLEVBQUs7QUFDdkIsZ0JBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFBO1dBQ3BDLENBQUE7QUFDRCxnQkFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsV0FBVyxFQUFFLFVBQUMsS0FBSyxFQUFLO0FBQ2xELGdCQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxDQUFBO0FBQ2hDLGtCQUFNLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxVQUFDLE9BQU8sRUFBSztBQUN4QyxrQkFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLGFBQWEsR0FBRyxTQUFTLEdBQUcsT0FBTyxDQUFBO0FBQ3RELGtCQUFJLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQTthQUNwQyxDQUFDLENBQUE7QUFDRixrQkFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEVBQUUsYUFBYSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQTtXQUNsSCxFQUFFLE9BQU8sQ0FBQyxDQUFBO1NBQ1o7O2VBL0JVLFlBQVk7Ozs4QkFBWixZQUFZIiwiZmlsZSI6ImNvbS9zZWN1Y2FyZC9jb25uZWN0L25ldC9jaGFubmVsL3N0b21wLWJyb3dzZXIuanMiLCJzb3VyY2VSb290IjoiLi4vc3JjLyJ9