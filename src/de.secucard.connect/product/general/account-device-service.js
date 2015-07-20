import {ProductService} from '../product-service'

export class AccountDeviceService extends ProductService {
	
	constructor() {
		super()
	}
	
	getEndpoint() {
		return ['general','accountdevices'];
	}
	
	getEventTargets() {
		return ['general.accountdevices'];
	}
	
}

AccountDeviceService.Uid = (['general','accountdevices']).join('.');
