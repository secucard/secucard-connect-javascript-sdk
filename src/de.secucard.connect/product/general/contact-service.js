import {ProductService} from '../product-service'

export class ContactService extends ProductService {
	
	constructor() {
		super()
	}
	
	getEndpoint() {
		return ['general','contacts'];
	}
	
	getEventTargets() {
		return [];
	}
	
}

ContactService.Uid = (['general','contacts']).join('.');
