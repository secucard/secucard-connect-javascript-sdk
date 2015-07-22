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
		return this.updateWithAction(storeId, 'checkin', checkInState);
	}
	
	setDefault(storeId) {
		return this.updateWithAction(storeId, 'setDefault');
	}
	
}

StoreService.Uid = (['general','stores']).join('.');