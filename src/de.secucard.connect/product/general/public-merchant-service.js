import {ProductService} from '../product-service'

export class PublicMerchantService extends ProductService {
	
	constructor() {
		super()
	}
	
	getEndpoint() {
		return ['general','publicmerchants'];
	}
	
	getEventTargets() {
		return [];
	}
	
}

PublicMerchantService.Uid = (['general','publicmerchants']).join('.');