import {ProductService} from '../product-service'

export class TransactionHistoriesService extends ProductService {
	constructor() {
		super()
	}

	getEndpoint() {
		return ['payment', 'transactionhistories'];
	}

	getEventTargets() {
		return [];
	}
}

TransactionHistoriesService.Uid = (['payment', 'transactionhistories']).join('.');