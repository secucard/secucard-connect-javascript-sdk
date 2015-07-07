import {ProductService} from '../product-service'

export class TransactionService extends ProductService {
	
	constructor() {
		super()
	}
	
	getEndpoint() {
		return ['Smart','Transactions'];
	};
	
	
	
}
