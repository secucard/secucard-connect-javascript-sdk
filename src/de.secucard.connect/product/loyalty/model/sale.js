export class Sale {
	
	constructor(amount, last_change, status, description, 
				description_raw, store, card, cardgroup, merchantcard, 
				balance_amount, balance_points, currency, bonus) {
		this.amount = amount;
		this.last_change = last_change;
		this.status = status;
		this.description = description;
		this.description_raw = description_raw;
		this.store = store;
		this.card = card;
		this.cardgroup = cardgroup;
		this.merchantcard = merchantcard;
		this.balance_amount = balance_amount;
		this.balance_points = balance_points;
		this.currency = currency;
		this.bonus = bonus;
	}
	
}
