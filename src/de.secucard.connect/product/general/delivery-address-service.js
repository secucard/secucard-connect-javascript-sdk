import {ProductService} from '../product-service'

export class DeliveryAddressService extends ProductService {
	
	constructor() {
		super()
	}
	
	getEndpoint() {
		return ['general','deliveryaddresses'];
	}
	
	getEventTargets() {
		return [];
	}
	
}

DeliveryAddressService.Uid = (['general','deliveryaddresses']).join('.');
