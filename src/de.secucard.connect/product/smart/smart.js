import {TransactionService} from './transaction-service';
import {IdentService} from './ident-service';
import {CheckinService} from './checkin-service';

export const Smart = {};
Smart.TransactionService = TransactionService;
Smart.IdentService = IdentService;
Smart.CheckinService = CheckinService;

export class Basket {
	
	constructor(products, texts){
		this.products = products;
		this.texts = texts;
	}
	
}

export class BasketInfo {
	
	constructor(sum, currency) {
		this.sum = sum;
		this.currency = currency;
	}
	
}


export class Product {
	
	constructor(articleNumber, ean, desc, quantity, priceOne, tax, group) {
		this.articleNumber = articleNumber;
		this.ean = ean;
		this.desc = desc;
		this.quantity = quantity;
		this.priceOne = priceOne;
		this.tax = tax;
		this.group = group;
	}
	
}

export class ProductGroup {
	
	constructor(desc, level) {
		this.desc = desc;
		this.level = level;
	}
	
}

export class Transaction {
	
	constructor(basket, basketInfo, idents, merchantRef, transactionRef) {
		this.basket = basket;
		this.basketInfo = basketInfo;
		this.idents = idents;
		this.merchantRef = merchantRef;
		this.transactionRef = transactionRef;
	}
	
}

export class Ident {
	
	constructor(type, prefix, name, length, value, valid) {
		this.type = type;
		this.prefix = prefix;
		this.name = name;
		this.length = length;
		this.value = value;
		this.valid = valid;
	}
	
}
