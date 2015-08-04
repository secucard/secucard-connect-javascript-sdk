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
export class Token {
	
	constructor() {
		this.access_token = null;
		this.refresh_token = null;
		this.token_type = null;
		this.expires_in = null;
		this.scope = null;
	}
	
	getRefreshToken() {
		
		return this.refresh_token;
		
	}
	
	getAccessToken() {
		
		return this.access_token;
		
	}
	
	isExpired() {
		
		return !this.expireTime || (new Date()).getTime() > this.expireTime;
		
	}
	
	setExpireTime() {
		
		this.expireTime = parseInt(this.expires_in) * 1000 + (new Date()).getTime();
		
	}
	
	getExpireTime() {
		
		return this.expireTime;
		
	}
	
	update(data) {
		return Object.assign(this, data);
	}
	
}

Token.create = (data) => {
	
	let token = new Token();
	token = Object.assign(token, data);
	return token;
	
};
