"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var News = exports.News = function News(headline, text_teaser, text_full, author, document_id, created, picture, _account_read, related) {
    _classCallCheck(this, News);

    this.headline = headline;
    this.text_teaser = text_teaser;
    this.text_full = text_full;
    this.author = author;
    this.document_id = document_id;
    this.created = created;
    this.picture = picture;
    this._account_read = _account_read;
    this.related = related;
};