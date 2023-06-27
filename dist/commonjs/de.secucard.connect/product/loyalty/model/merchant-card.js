"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MerchantCard = void 0;
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
var MerchantCard = _createClass(function MerchantCard(merchant, created_for_merchant, card, created_for_store, is_base_card, cardgroup, customer, balance, points, last_usage, last_charge, stock_status, lock_status) {
  _classCallCheck(this, MerchantCard);
  this.merchant = merchant;
  this.created_for_merchant = created_for_merchant;
  this.card = card;
  this.created_for_store = created_for_store;
  this.is_base_card = is_base_card;
  this.cardgroup = cardgroup;
  this.customer = customer;
  this.balance = balance;
  this.points = points;
  this.last_usage = last_usage;
  this.last_charge = last_charge;
  this.stock_status = stock_status;
  this.lock_status = lock_status;
});
exports.MerchantCard = MerchantCard;