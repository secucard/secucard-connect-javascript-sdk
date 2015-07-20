import {ProductService} from '../product-service'

export class MerchantService extends ProductService {
	
	constructor() {
		super()
	}
	
	getEndpoint() {
		return ['general','merchants'];
	}
	
	getEventTargets() {
		return [];
	}
	
}

MerchantService.Uid = (['general','merchants']).join('.');