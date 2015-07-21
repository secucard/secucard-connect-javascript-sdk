export class Transaction {
	
	constructor(customer, contract, amount, currency, purpose, order_id, trans_id, status, transaction_status) {
		this.customer = customer;
		this.contract = contract;
		this.amount = amount;
		this.currency = currency;
		this.purpose = purpose;
		this.order_id = order_id;
		this.trans_id = trans_id;
		this.status = status;
		this.transaction_status = transaction_status;
	}
	
}
