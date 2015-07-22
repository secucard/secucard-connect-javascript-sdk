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
