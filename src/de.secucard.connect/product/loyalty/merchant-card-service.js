import {ProductService} from '../product-service'

export class MerchantCardService extends ProductService {
	
	constructor() {
		super()
	}
	
	getEndpoint() {
		return ['loyalty','merchantcards'];
	}
	
	getEventTargets() {
		return [];
	}
	
}

MerchantCardService.Uid = (['loyalty','merchantcards']).join('.');
