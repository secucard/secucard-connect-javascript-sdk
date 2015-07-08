import {Auth} from './auth/Auth'

export class SecucardConnect {
  constructor(options) {
    this.auth = new Auth(options.auth)
  }
}