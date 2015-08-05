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
import {Token} from './token';
export class TokenStorageInMem {
	
	constructor(credentials) {
		
		// use credentials as additional data and primary source when storing token
		this.credentials = credentials;
		
		let token = null;
		
		if (credentials.token) {
			token = Token.create(credentials.token);
			token.setExpireTime();
			delete credentials.token;
		}
		
		this.storeToken(token);
		
	}
	
	removeToken() {
		
		this.token = null;
		
	}
	
	storeToken(token) {
		
		this.token = token? token : null;
		
	}
	
	getStoredToken() {
		
		return this.token;
		
	}
	
}
