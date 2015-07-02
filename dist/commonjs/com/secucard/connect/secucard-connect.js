"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _authAuth = require("./auth/Auth");

var SecucardConnect = function SecucardConnect() {
  _classCallCheck(this, SecucardConnect);

  this.foo = "server api!!!!!";

  this.auth = new _authAuth.Auth();
};

exports.SecucardConnect = SecucardConnect;