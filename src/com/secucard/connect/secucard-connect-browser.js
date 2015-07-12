import {StompBrowser} from './net/channel/stomp-browser'

export class SecucardConnectBrowser {
  constructor(config) {
    this.stomp = new StompBrowser(config.stomp.wsUrl)
  }
}