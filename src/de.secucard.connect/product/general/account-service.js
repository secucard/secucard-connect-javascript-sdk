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
		return updateObjectWithAction(accountId, 'location', null, location);
	}
	
	updateBeacons(beaconList) {
		return updateObjectWithAction("me", 'beaconEnvironment', null, beaconList);
	}
	
	updateGCM(accountId, gcm) {
		return updateObjectWithAction(accountId, 'gcm', null, gcm);
	}
	
}

AccountService.Uid = (['general','accounts']).join('.');
