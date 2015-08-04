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
export class PublicMerchant {
	
	constructor(source, key, hash, 
				address_components, address_formatted, phone_number_formatted, geometry, 
				name, photo, photo_main, category, category_main, 
				url_googleplus, url_website, 
				utc_offset, open_now, open_time, open_hours, _geometry, 
				checkedIn) {
		this.source = source;
		this.key = key;
		this.hash = hash;
		this.address_components = address_components;
		this.address_formatted = address_formatted;
		this.phone_number_formatted = phone_number_formatted;
		this.geometry = geometry;
		this.name = name;
		this.photo = photo;
		this.photo_main = photo_main;
		this.category = category;
		this.category_main = category_main;
		this.url_googleplus = url_googleplus;
		this.url_website = url_website;
		this.utc_offset = utc_offset;
		this.open_now = open_now;
		this.open_time = open_time;
		this.open_hours = open_hours;
		this._geometry = _geometry;
		this.checkedIn = checkedIn;
	}
	
}
