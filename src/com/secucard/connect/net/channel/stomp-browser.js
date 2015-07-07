import Stomp from 'stompjs'
import SockJS from 'sockjs-client'

export class StompBrowser {
  constructor(wsUrl) {
    return new Stomp.over(new SockJS(wsUrl))
  }

}