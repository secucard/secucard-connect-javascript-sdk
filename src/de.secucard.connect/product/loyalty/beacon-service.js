import {ProductService} from '../product-service'

export class BeaconService extends ProductService {
	
	constructor() {
		super()
	}
	
	getEndpoint() {
		return ['loyalty','beacons'];
	}
	
	getEventTargets() {
		return [];
	}
	
}

BeaconService.Uid = (['loyalty','beacons']).join('.');
