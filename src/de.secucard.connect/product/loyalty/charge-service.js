import {ProductService} from '../product-service'

export class ChargeService extends ProductService {
	
	constructor() {
		super()
	}
	
	getEndpoint() {
		return ['loyalty','charges'];
	}
	
	getEventTargets() {
		return [];
	}
	
}

ChargeService.Uid = (['loyalty','charges']).join('.');
