import {ProductService} from '../product-service'

export class SaleService extends ProductService {
	
	constructor() {
		super()
	}
	
	getEndpoint() {
		return ['loyalty','sales'];
	}
	
	getEventTargets() {
		return [];
	}
	
}

SaleService.Uid = (['loyalty','sales']).join('.');
