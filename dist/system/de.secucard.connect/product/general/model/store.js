"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Store = exports.Store = function Store(source, key, hash, name, name_raw, merchant, _news_status, _news, open_now, open_time, open_hours, geometry, _geometry, _checkin_status, address_formatted, address_components, category, category_main, phone_number_formatted, url_website, _balance, _points, _program, _isDefault, facebook_id, photo, photo_main, has_beacon) {
    _classCallCheck(this, Store);

    this.source = source;
    this.key = key;
    this.hash = hash;
    this.name = name;
    this.name_raw = name_raw;
    this.merchant = merchant;
    this._news_status = _news_status;
    this._news = _news;
    this.open_now = open_now;
    this.open_time = open_time;
    this.open_hours = open_hours;
    this.geometry = geometry;
    this._geometry = _geometry;
    this._checkin_status = _checkin_status;
    this.address_formatted = address_formatted;
    this.address_components = address_components;
    this.category = category;
    this.category_main = category_main;
    this.phone_number_formatted = phone_number_formatted;
    this.url_website = url_website;
    this._balance = _balance;
    this._points = _points;
    this._program = _program;
    this._isDefault = _isDefault;
    this.facebook_id = facebook_id;
    this.photo = photo;
    this.photo_main = photo_main;
    this.has_beacon = has_beacon;
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9nZW5lcmFsL21vZGVsL3N0b3JlLmpzIl0sIm5hbWVzIjpbIlN0b3JlIiwic291cmNlIiwia2V5IiwiaGFzaCIsIm5hbWUiLCJuYW1lX3JhdyIsIm1lcmNoYW50IiwiX25ld3Nfc3RhdHVzIiwiX25ld3MiLCJvcGVuX25vdyIsIm9wZW5fdGltZSIsIm9wZW5faG91cnMiLCJnZW9tZXRyeSIsIl9nZW9tZXRyeSIsIl9jaGVja2luX3N0YXR1cyIsImFkZHJlc3NfZm9ybWF0dGVkIiwiYWRkcmVzc19jb21wb25lbnRzIiwiY2F0ZWdvcnkiLCJjYXRlZ29yeV9tYWluIiwicGhvbmVfbnVtYmVyX2Zvcm1hdHRlZCIsInVybF93ZWJzaXRlIiwiX2JhbGFuY2UiLCJfcG9pbnRzIiwiX3Byb2dyYW0iLCJfaXNEZWZhdWx0IiwiZmFjZWJvb2tfaWQiLCJwaG90byIsInBob3RvX21haW4iLCJoYXNfYmVhY29uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztJQVdhQSxLLFdBQUFBLEssR0FFVCxlQUFZQyxNQUFaLEVBQW9CQyxHQUFwQixFQUF5QkMsSUFBekIsRUFDWUMsSUFEWixFQUNrQkMsUUFEbEIsRUFDNEJDLFFBRDVCLEVBRVlDLFlBRlosRUFFMEJDLEtBRjFCLEVBR1lDLFFBSFosRUFHc0JDLFNBSHRCLEVBR2lDQyxVQUhqQyxFQUlZQyxRQUpaLEVBSXNCQyxTQUp0QixFQUlpQ0MsZUFKakMsRUFLWUMsaUJBTFosRUFLK0JDLGtCQUwvQixFQU1ZQyxRQU5aLEVBTXNCQyxhQU50QixFQU1xQ0Msc0JBTnJDLEVBTTZEQyxXQU43RCxFQU9ZQyxRQVBaLEVBT3NCQyxPQVB0QixFQU8rQkMsUUFQL0IsRUFPeUNDLFVBUHpDLEVBT3FEQyxXQVByRCxFQVFZQyxLQVJaLEVBUW1CQyxVQVJuQixFQVNZQyxVQVRaLEVBU3dCO0FBQUE7O0FBRXBCLFNBQUszQixNQUFMLEdBQWNBLE1BQWQ7QUFDQSxTQUFLQyxHQUFMLEdBQVdBLEdBQVg7QUFDQSxTQUFLQyxJQUFMLEdBQVlBLElBQVo7QUFDQSxTQUFLQyxJQUFMLEdBQVlBLElBQVo7QUFDQSxTQUFLQyxRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0EsU0FBS0MsWUFBTCxHQUFvQkEsWUFBcEI7QUFDQSxTQUFLQyxLQUFMLEdBQWFBLEtBQWI7QUFDQSxTQUFLQyxRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLFNBQUtDLFNBQUwsR0FBaUJBLFNBQWpCO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQkEsVUFBbEI7QUFDQSxTQUFLQyxRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLFNBQUtDLFNBQUwsR0FBaUJBLFNBQWpCO0FBQ0EsU0FBS0MsZUFBTCxHQUF1QkEsZUFBdkI7QUFDQSxTQUFLQyxpQkFBTCxHQUF5QkEsaUJBQXpCO0FBQ0EsU0FBS0Msa0JBQUwsR0FBMEJBLGtCQUExQjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0EsU0FBS0MsYUFBTCxHQUFxQkEsYUFBckI7QUFDQSxTQUFLQyxzQkFBTCxHQUE4QkEsc0JBQTlCO0FBQ0EsU0FBS0MsV0FBTCxHQUFtQkEsV0FBbkI7QUFDQSxTQUFLQyxRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLFNBQUtDLE9BQUwsR0FBZUEsT0FBZjtBQUNBLFNBQUtDLFFBQUwsR0FBZ0JBLFFBQWhCO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQkEsVUFBbEI7QUFDQSxTQUFLQyxXQUFMLEdBQW1CQSxXQUFuQjtBQUNBLFNBQUtDLEtBQUwsR0FBYUEsS0FBYjtBQUNBLFNBQUtDLFVBQUwsR0FBa0JBLFVBQWxCO0FBQ0EsU0FBS0MsVUFBTCxHQUFrQkEsVUFBbEI7QUFFSCxDIiwiZmlsZSI6ImRlLnNlY3VjYXJkLmNvbm5lY3QvcHJvZHVjdC9nZW5lcmFsL21vZGVsL3N0b3JlLmpzIiwic291cmNlUm9vdCI6Ii4uL3NyYy8ifQ==
