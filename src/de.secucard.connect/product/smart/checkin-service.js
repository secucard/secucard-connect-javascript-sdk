import {ProductService} from '../product-service'

export class CheckinService extends ProductService {
	
	constructor() {
		super()
	}
	
	getEndpoint() {
		return ['smart','checkin'];
	};
	
	getEventTargets() {
		return ['smart.checkin'];
	}
	
	
}

CheckinService.Uid = (['smart','checkin']).join('.');