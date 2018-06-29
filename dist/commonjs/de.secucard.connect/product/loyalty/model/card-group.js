"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CardGroup = exports.CardGroup = function CardGroup(display_name, display_name_raw, stock_warn_limit, merchant, picture) {
    _classCallCheck(this, CardGroup);

    this.display_name = display_name;
    this.display_name_raw = display_name_raw;
    this.stock_warn_limit = stock_warn_limit;
    this.merchant = merchant;
    this.picture = picture;
};