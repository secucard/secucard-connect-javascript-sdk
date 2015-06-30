import {Http} from '../net/Http'
import _ from 'lodash'

var host_auth = "https://connect.secucard.com"
var url = {
  oauth_token:host_auth + "/oauth/token"
 } 
 var grant_options = (extend) => {
  return _.merge({
    send: {
    username: "testuser",
    password: "testpassword",
    client_id:"XXXXXX",
    client_secret:"XXXXXXXX"
  }, 
  set:[
  {label: "Content-Type", value:"application/x-www-form-urlencoded"}
  ]
  }, extend)
 } 
export class Auth {
  constructor() {
    this.http = new Http()
    this.grant = {
    access:{
      appUser: () => {
        var options = grant_options({send:{grant_type:'appuser'}})
        return this.http.post(url.oauth_token, options)
      }
    }
  }
}
}