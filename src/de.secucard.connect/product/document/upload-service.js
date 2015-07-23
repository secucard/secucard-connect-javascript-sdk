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
		return super.execute(null, null, null, {content: base64str}, {
			channelConfig: ['rest'], // use only rest
			useAuth: false // don't need auth token
		});
	}
	
}

UploadService.Uid = (['document','uploads']).join('.');