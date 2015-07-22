import {ProductService} from '../product-service'

export class CheckinService extends ProductService {
	
	constructor() {
		super()
	}
	
	getEndpoint() {
		return ['loyalty','checkins'];
	}
	
	getEventTargets() {
		return [];
	}
	
}

CheckinService.Uid = (['loyalty','checkins']).join('.');
