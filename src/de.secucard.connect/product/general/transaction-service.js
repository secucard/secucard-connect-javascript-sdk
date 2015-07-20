import {ProductService} from '../product-service'

export class TransactionService extends ProductService {
	
	constructor() {
		super()
	}
	
	getEndpoint() {
		return ['general','transactions'];
	}
	
	getEventTargets() {
		return ['general.transactions'];
	}
	
}

TransactionService.Uid = (['general','transactions']).join('.');
