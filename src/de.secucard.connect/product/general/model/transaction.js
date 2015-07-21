export class Transaction {
	
	constructor(merchant, amount, last_change, type, details, currency) {
		this.merchant = merchant;
		this.amount = amount;
		this.last_change = last_change;
		this.type = type;
		this.details = details;
		this.currency = currency;
	}
	
}
