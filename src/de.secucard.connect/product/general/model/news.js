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
export class News {
	
	constructor(headline, text_teaser, text_full, author, document_id, created, picture, _account_read, related) {
		this.headline = headline;
		this.text_teaser = text_teaser;
		this.text_full = text_full;
		this.author = author;
		this.document_id = document_id;
		this.created = created;
		this.picture = picture;
		this._account_read = _account_read;
		this.related = related;
	}
	
}
