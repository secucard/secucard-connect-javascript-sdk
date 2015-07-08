import StompJS from 'stomp-websocket'
import SockJSClient from 'sockjs-client'

export class StompBrowser {
  constructor(wsUrl) {
    return new StompJS.over(new SockJSClient.SockJS(wsUrl))
  }

}