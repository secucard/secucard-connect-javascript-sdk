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
