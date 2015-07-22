import {ProductService} from '../product-service'

export class CardService extends ProductService {
	
	constructor() {
		super()
	}
	
	getEndpoint() {
		return ['loyalty','cards'];
	}
	
	getEventTargets() {
		return [];
	}
	
	assignUser(cardNumber, pin) {
		return this.execute(cardNumber, 'assignUser', 'me', pin);
	}
	
	removeUser(cardNumber) {
		return this.removeWithAction(cardNumber, 'assignUser', 'me');
	}
	
}

CardService.Uid = (['loyalty','cards']).join('.');
