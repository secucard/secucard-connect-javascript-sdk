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
import {ProductService} from '../product-service'

export class AccountService extends ProductService {
	
	constructor() {
		super()
	}
	
	getEndpoint() {
		return ['general','accounts'];
	}
	
	getEventTargets() {
		return ['general.accounts'];
	}
	
	create(data, options) {
		
		options = Object.assign({}, options, {
			channelConfig: ['rest'], // use only rest
			useAuth: false // don't need auth token
		});
		
		return super.create(data, options);
		
	}
	
	updateLocation(accountId, location) {
		return this.updateWithAction(accountId, 'location', null, location);
	}
	
	updateBeacons(beaconList) {
		return this.updateWithAction("me", 'beaconEnvironment', null, beaconList);
	}
	
	updateGCM(accountId, gcm) {
		return this.updateWithAction(accountId, 'gcm', null, gcm);
	}
	
}

AccountService.Uid = (['general','accounts']).join('.');
