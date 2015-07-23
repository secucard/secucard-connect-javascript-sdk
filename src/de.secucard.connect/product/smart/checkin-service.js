import {ProductService} from '../product-service'

export class CheckinService extends ProductService {
	
	constructor() {
		super()
	}
	
	getEndpoint() {
		return ['smart','checkins'];
	};
	
	getEventTargets() {
		return ['smart.checkins'];
	}
	
	
}

CheckinService.Uid = (['smart','checkins']).join('.');