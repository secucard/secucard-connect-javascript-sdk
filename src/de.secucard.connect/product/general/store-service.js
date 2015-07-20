import {ProductService} from '../product-service'

export class StoreService extends ProductService {
	
	constructor() {
		super()
	}
	
	getEndpoint() {
		return ['general','stores'];
	}
	
	getEventTargets() {
		return [];
	}
	
	checkIn(storeId, checkInState) {
		return this.updateObjectWithAction(storeId, 'checkin', checkInState);
	}
	
	setDefault(storeId) {
		return this.updateObjectWithAction(storeId, 'setDefault');
	}
	
}

StoreService.Uid = (['general','stores']).join('.');