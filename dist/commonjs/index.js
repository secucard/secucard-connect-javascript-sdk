'use strict';

exports.__esModule = true;

var _comSecucardConnectSecucardConnect = require('./com/secucard/connect/secucard-connect');

exports.SecucardConnect = _comSecucardConnectSecucardConnect.SecucardConnect;
var t  = _comSecucardConnectSecucardConnect.SecucardConnect;
t = new t({
  auth: {
  client_id: 'f0478f73afe218e8b5f751a07c978ecf',
  client_secret: '30644327cfbde722ad2ad12bb9c0a2f86a2bee0a2d8de8d862210112af3d01bb'
 }
})
var s = function(response) {
  console.log('success', response)
}
var e = function(response) {
  console.log('error', response)
}
t.auth.getClientCredentials().then(s, e)