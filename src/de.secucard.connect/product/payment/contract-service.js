import {ProductService} from '../product-service'

export class ContractService extends ProductService {
	
	constructor() {
		super()
	}
	
	getEndpoint() {
		return ['payment','contracts'];
	}
	
	getEventTargets() {
		return [];
	}
	
	clone(contractId, cloneParams) {
		return this.execute(contractId, 'clone');
	}
	
	cloneMine(cloneParams) {
		return this.clone('me', cloneParams);
	}
	
}

ContractService.Uid = (['payment','contracts']).join('.');
