import {ProductService} from '../product-service'

export class IdentRequestService extends ProductService {
	
	constructor() {
		super()
	}
	
	getEndpoint() {
		return ['services','identrequests'];
	}
	
	getEventTargets() {
		return [];
	}
	
}

IdentRequestService.Uid = (['services','identrequests']).join('.');
