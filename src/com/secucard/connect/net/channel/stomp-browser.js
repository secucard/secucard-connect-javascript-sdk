import StompJS from 'stomp-websocket'
import SockJSClient from 'sockjs-client'

var TEMP_QUEUE = '/temp-queue/main'

var REQUEST_DESTINATION = "/exchange/connect.api"

var notify = function(event, details) {
  if (this._listener) {
    this._listener(event, details)
  }
}

var stompDestination = function(requestMethod) {
  return `${REQUEST_DESTINATION}/${requestMethod}` 
}

var tempQueue = function() {
  return TEMP_QUEUE
}

var requestHeader = function(accessToken, requestId, options) {
  var _header = {
    'user-id': accessToken,
    'reply-to': tempQueue(),
    'correlation-id': requestId
  }
  if (options.appId) {
    _header["app-id"] = options.appId
  }
  return _header
}

export class StompBrowser {
  constructor(wsUrl) {
    this.wsUrl = wsUrl
    this._listener = null
    return this
  }
  listener(listener) {
    this._listener = listener
    return this
  }
  notifyListener(event, details) {
    notify.call(this, event, details)
  }
  request({accessToken="", requestMethod="", requestId="", options={}}) {
    var self = this
    var client =  StompJS.over(new SockJSClient.SockJS(self.wsUrl))
    var destination = stompDestination(requestMethod)
    var connect = function() {
      var onerror = (frame) => {
        self.notifyListener("error", frame)
      }
      client.debug = function(message) {
        self.notifyListener('debug', message);
      }
      client.onreceive = function (frame) {
        if (frame.command == "MESSAGE") {
          var headers = frame.headers
          var correlationId = headers['correlation-id']
          var message = frame.body
          var type = correlationId.length ? 'message' : 'event';
          self.notifyListener(type, message, correlationId);
        }
      }
      client.connect(accessToken, accessToken, (frame) => {
        self.notifyListener("connected")
        var header = requestHeader(accessToken, requestId, options)
        var payload = JSON.stringify(options.payload || {})
        client.send(destination, header, payload)
      }, onerror, '/')
    }
    connect()  
  }
}