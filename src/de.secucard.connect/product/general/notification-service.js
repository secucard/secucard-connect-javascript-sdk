import {ProductService} from '../product-service'

export class NotificationService extends ProductService {
	
	constructor() {
		super()
	}
	
	getEndpoint() {
		return ['general','notifications'];
	}
	
	getEventTargets() {
		return [];
	}
	
}

NotificationService.Uid = (['general','notifications']).join('.');