export class Product {
	
	
	constructor() {
		
	}
	
	configureWithContext(context) {
		
		this.getChannel = context.getChannel.bind(context);
		this.getAuth = context.getAuth.bind(context);
		
	}
	
}
