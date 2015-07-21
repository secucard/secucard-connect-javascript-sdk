import {ProductService} from '../product-service'

export class UploadService extends ProductService {
	
	constructor() {
		super()
	}
	
	getEndpoint() {
		return ['document','uploads'];
	}
	
	getEventTargets() {
		return [];
	}
	
	upload(base64str) {
		return super.execute(null, null, null, base64str);
	}
	
}

UploadService.Uid = (['document','uploads']).join('.');