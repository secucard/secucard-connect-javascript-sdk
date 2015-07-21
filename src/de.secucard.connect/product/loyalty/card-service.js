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
	
	deleteUserFromCard(cardNumber) {
		return this.deleteObjectWithAction(cardNumber, 'assignUser', 'me');
	}
	
}

CardService.Uid = (['loyalty','cards']).join('.');
