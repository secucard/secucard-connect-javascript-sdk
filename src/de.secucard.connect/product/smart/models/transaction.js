export class Transaction {
	
	constructor(basket, basketInfo, idents, merchantRef, transactionRef) {
		this.basket = basket;
		this.basketInfo = basketInfo;
		this.idents = idents;
		this.merchantRef = merchantRef;
		this.transactionRef = transactionRef;
	}
	
}
