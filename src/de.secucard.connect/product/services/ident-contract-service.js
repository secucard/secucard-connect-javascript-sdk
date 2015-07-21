import {ProductService} from '../product-service'

export class IdentContractService extends ProductService {
	
	constructor() {
		super()
	}
	
	getEndpoint() {
		return ['services','identcontracts'];
	}
	
	getEventTargets() {
		return [];
	}
	
}

IdentContractService.Uid = (['services','identcontracts']).join('.');
