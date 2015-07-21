import {ProductService} from '../product-service'

export class CustomerService extends ProductService {
	
	constructor() {
		super()
	}
	
	getEndpoint() {
		return ['loyalty','customers'];
	}
	
	getEventTargets() {
		return [];
	}
	
}

CustomerService.Uid = (['loyalty','customers']).join('.');
