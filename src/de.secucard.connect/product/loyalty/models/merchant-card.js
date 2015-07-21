export class MerchantCard {
	
	constructor(merchant, created_for_merchant, card, created_for_store, 
				is_base_card, cardgroup, customer, balance, points, 
				last_usage, last_charge, stock_status, lock_status) {
		this.merchant = merchant;
		this.created_for_merchant = created_for_merchant;
		this.card = card;
		this.created_for_store = created_for_store;
		this.is_base_card = is_base_card;
		this.cardgroup = cardgroup;
		this.customer = customer;
		this.balance = balance;
		this.points = points;
		this.last_usage = last_usage;
		this.last_charge = last_charge;
		this.stock_status = stock_status;
		this.lock_status = lock_status;
	}
	
}
