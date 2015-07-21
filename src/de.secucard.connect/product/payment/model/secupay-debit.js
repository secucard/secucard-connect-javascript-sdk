import {Transaction} from './transaction';
export class SecupayDebit extends Transaction {
	
	constructor(container, customer, contract, amount, currency, purpose, order_id, trans_id, status, transaction_status) {
		
		super(customer, contract, amount, currency, purpose, order_id, trans_id, status, transaction_status);
		this.container = container;
		
	}
	
}
