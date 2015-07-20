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
		return this.updateObjectWithAction(accountId, 'location', null, location);
	}
	
	updateBeacons(beaconList) {
		return this.updateObjectWithAction("me", 'beaconEnvironment', null, beaconList);
	}
	
	updateGCM(accountId, gcm) {
		return this.updateObjectWithAction(accountId, 'gcm', null, gcm);
	}
	
}

AccountService.Uid = (['general','accounts']).join('.');
