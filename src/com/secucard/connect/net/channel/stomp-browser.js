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

var requestHeader(accessToken, requestId, options) {
  var _header = {
    'user-id': this.accessToken,
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
      client.connect(accessToken, accessToken, (frame) => {
        self.notifyListener("connected")
        client.subscribe(destination, (message) => {
           var type = message.correlationId ? "message" : "event"
           self.notifyListener(type, message)
           if (type == "message") {
            client.disconnect()
           }
        })
        var header = requestHeader(accessToken, requestId, options)
        var payload = JSON.stringify(options.payload || {})
        client.send(destination, header, payload)
      }, onerror, '/')
    }
    connect()  
  }
}