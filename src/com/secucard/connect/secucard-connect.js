import {Auth} from './auth/Auth'
import {Stomp} from './net/channel/stomp'

export class SecucardConnect {
  constructor(options) {
    this.auth = new Auth(options.auth)
    this.stomp = new Stomp(options.stomp)
  }
}