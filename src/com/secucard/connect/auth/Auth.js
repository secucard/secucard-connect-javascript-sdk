import {Http} from '../net/Http'
import _ from 'lodash'

var host_auth = "https://connect.secucard.com"
var url = {
  oauth_token:host_auth + "/oauth/token"
 } 
 var grant_options = (extend) => {
  return _.merge({
    send: {
    username: "developer@secucard.de",
    password: "Test12345!",
    client_id:"f0478f73afe218e8b5f751a07c978ecf",
    client_secret:"30644327cfbde722ad2ad12bb9c0a2f86a2bee0a2d8de8d862210112af3d01bb"
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
      access: {
        appUser: () => {
          var options = grant_options({send:{grant_type:'appuser'}})
          return this.http.post(url.oauth_token, options)
        }
      }
    }
  }
  getToken() {
    return this.grant.access.appUser()
  }
}