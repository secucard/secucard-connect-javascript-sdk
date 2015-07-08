import StompJS from 'stomp-websocket'
import SockJSClient from 'sockjs-client'

var TEMP_QUEUE = '/temp-queue/main'

var REQUEST_DESTINATION = "/exchange/connect.api"

var notifyListener = function(event, details) {
  if (this._listener) {
    this._listener(event, details)
  }
}

var destination = (requestMethod) => {
  `${REQUEST_DESTINATION}/${requestMethod}` 
}

var tempQueue = function() {
  return TEMP_QUEUE
}

var header = function(requestId, options) {
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
    this.client =  StompJS.over(new SockJSClient.SockJS(wsUrl))
    this._listener = null
    return this
  }
  listener(listener) {
    this._listener
    return this
  }
  notifyListener(event, details) {
    notify.call(event, details)
  }
  requestHeader() {
    header.call(this)
  } 
  request({accessToken:"", requestMethod:"", requestId:"", options:{}}) {
    this.client.connect(token, token, (frame) => {
      notifyListener("connected")
      this.client.subscribe(destination, (message) => {
         var type = message.correlationId ? "message" : "event"
         notifyListener(type, message)
      })
      this.client(destination(requestMethod), requestHeader(requestId, options), payload)
    })
  }
}