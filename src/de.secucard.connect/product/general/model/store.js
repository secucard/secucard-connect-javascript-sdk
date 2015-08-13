/*
 Copyright 2015 hp.weber GmbH & Co secucard KG (www.secucard.com)
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */
export class Store {

    constructor(source, key, hash,
                name, name_raw, merchant,
                _news_status, _news,
                open_now, open_time, open_hours,
                geometry, _geometry, _checkin_status,
                address_formatted, address_components,
                category, category_main, phone_number_formatted, url_website,
                _balance, _points, _program, _isDefault, facebook_id,
                photo, photo_main,
                has_beacon) {

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

    }

}
