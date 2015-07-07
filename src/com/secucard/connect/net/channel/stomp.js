import Secucard from 'node-secucard'
export class Stomp {
  constructor(config={}) {
    return new Secucard(config).Channel.Stomp
  }
}