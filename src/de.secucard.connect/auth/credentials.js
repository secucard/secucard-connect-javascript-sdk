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

export class Credentials {
	
	constructor() {
		
		this.token = null;
		
		/*
		---- basic ------
		 */
		this.client_id = null;
		this.client_secret = null;
		
		// ---------------
		this.uuid = null;
		// ---------------
		this.code = null;
		// ---------------
		this.username = null;
		this.password = null;
		this.device = null;
		this.deviveinfo = {name: null};
		
	}
	
}

Credentials.create = (credentials) => {
	
	let cr = new Credentials();
	if(credentials.token) {
		credentials.token = Token.create(credentials.token);
		credentials.token.setExpireTime();
	}
	return Object.assign(cr, credentials);
	
};
