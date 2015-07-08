System.register(['stomp-websocket', 'sockjs-client'], function (_export) {
  'use strict';

  var StompJS, SockJSClient, TEMP_QUEUE, REQUEST_DESTINATION, notifyListener, destination, tempQueue, header, StompBrowser;

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

      notifyListener = function notifyListener(event, details) {
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

          this.client.connect(token, token, function (frame) {
            notifyListener('connected');
            _this.client.subscribe(destination, function (message) {
              var type = message.correlationId ? 'message' : 'event';
              notifyListener(type, message);
            });
            _this.client(destination(requestMethod), requestHeader(requestId, options), payload);
          });
        };

        return StompBrowser;
      })();

      _export('StompBrowser', StompBrowser);
    }
  };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbS9zZWN1Y2FyZC9jb25uZWN0L25ldC9jaGFubmVsL3N0b21wLWJyb3dzZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OzZCQUdJLFVBQVUsRUFFVixtQkFBbUIsRUFFbkIsY0FBYyxFQU1kLFdBQVcsRUFJWCxTQUFTLEVBSVQsTUFBTSxFQVlHLFlBQVk7Ozs7Ozs7Ozs7O0FBOUJyQixnQkFBVSxHQUFHLGtCQUFrQjtBQUUvQix5QkFBbUIsR0FBRyx1QkFBdUI7O0FBRTdDLG9CQUFjLEdBQUcsU0FBakIsY0FBYyxDQUFZLEtBQUssRUFBRSxPQUFPLEVBQUU7QUFDNUMsWUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO0FBQ2xCLGNBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFBO1NBQy9CO09BQ0Y7O0FBRUcsaUJBQVcsR0FBRyxTQUFkLFdBQVcsQ0FBSSxhQUFhLEVBQUs7QUFDbkMsQUFBRywyQkFBbUIsU0FBSSxhQUFhLENBQUU7T0FDMUM7O0FBRUcsZUFBUyxHQUFHLFNBQVosU0FBUyxHQUFjO0FBQ3pCLGVBQU8sVUFBVSxDQUFBO09BQ2xCOztBQUVHLFlBQU0sR0FBRyxTQUFULE1BQU0sQ0FBWSxTQUFTLEVBQUUsT0FBTyxFQUFFO0FBQ3hDLFlBQUksT0FBTyxHQUFHO0FBQ1osbUJBQVMsRUFBRSxJQUFJLENBQUMsV0FBVztBQUMzQixvQkFBVSxFQUFFLFNBQVMsRUFBRTtBQUN2QiwwQkFBZ0IsRUFBRSxTQUFTO1NBQzVCLENBQUE7QUFDRCxZQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUU7QUFDakIsaUJBQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFBO1NBQ2xDO0FBQ0QsZUFBTyxPQUFPLENBQUE7T0FDZjs7QUFFWSxrQkFBWTtBQUNaLGlCQURBLFlBQVksQ0FDWCxLQUFLLEVBQUU7Z0NBRFIsWUFBWTs7QUFFckIsY0FBSSxDQUFDLE1BQU0sR0FBSSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksWUFBWSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO0FBQzNELGNBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFBO0FBQ3JCLGlCQUFPLElBQUksQ0FBQTtTQUNaOztBQUxVLG9CQUFZLFdBTXZCLFFBQVEsR0FBQSxrQkFBQyxTQUFRLEVBQUU7QUFDakIsY0FBSSxDQUFDLFNBQVMsQ0FBQTtBQUNkLGlCQUFPLElBQUksQ0FBQTtTQUNaOztBQVRVLG9CQUFZLFdBVXZCLGNBQWMsR0FBQSx3QkFBQyxLQUFLLEVBQUUsT0FBTyxFQUFFO0FBQzdCLGdCQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxPQUFPLENBQUMsQ0FBQTtTQUM1Qjs7QUFaVSxvQkFBWSxXQWF2QixhQUFhLEdBQUEseUJBQUc7QUFDZCxnQkFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtTQUNsQjs7QUFmVSxvQkFBWSxXQWdCdkIsT0FBTyxHQUFBLGlCQUFDLElBQTRELEVBQUU7OztpQ0FBOUQsSUFBNEQsQ0FBM0QsV0FBVztjQUFYLFdBQVcsb0NBQUMsRUFBRTttQ0FBZixJQUE0RCxDQUEzQyxhQUFhO2NBQWIsYUFBYSxzQ0FBQyxFQUFFOytCQUFqQyxJQUE0RCxDQUF6QixTQUFTO2NBQVQsU0FBUyxrQ0FBQyxFQUFFOzZCQUEvQyxJQUE0RCxDQUFYLE9BQU87Y0FBUCxPQUFPLGdDQUFDLEVBQUU7O0FBQ2pFLGNBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsVUFBQyxLQUFLLEVBQUs7QUFDM0MsMEJBQWMsQ0FBQyxXQUFXLENBQUMsQ0FBQTtBQUMzQixrQkFBSyxNQUFNLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRSxVQUFDLE9BQU8sRUFBSztBQUM3QyxrQkFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLGFBQWEsR0FBRyxTQUFTLEdBQUcsT0FBTyxDQUFBO0FBQ3RELDRCQUFjLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFBO2FBQy9CLENBQUMsQ0FBQTtBQUNGLGtCQUFLLE1BQU0sQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLEVBQUUsYUFBYSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQTtXQUNwRixDQUFDLENBQUE7U0FDSDs7ZUF6QlUsWUFBWTs7OzhCQUFaLFlBQVkiLCJmaWxlIjoiY29tL3NlY3VjYXJkL2Nvbm5lY3QvbmV0L2NoYW5uZWwvc3RvbXAtYnJvd3Nlci5qcyIsInNvdXJjZVJvb3QiOiIuLi9zcmMvIn0=