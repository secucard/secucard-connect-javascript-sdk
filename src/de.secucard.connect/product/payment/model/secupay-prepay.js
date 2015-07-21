import {Transaction} from './transaction';
export class SecupayPrepay extends Transaction {
	
	constructor(transfer_purpose, transfer_account, customer, contract, amount, currency, purpose, order_id, trans_id, status, transaction_status) {
		
		super(customer, contract, amount, currency, purpose, order_id, trans_id, status, transaction_status);
		this.transfer_purpose = transfer_purpose;
		this.transfer_account = transfer_account;
		
	}
	
}
