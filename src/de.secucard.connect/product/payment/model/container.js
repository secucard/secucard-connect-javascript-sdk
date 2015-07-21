export class Container {
	
	constructor(merchant, privateData, publicData, assign, type, created, updated, contract) {
		this.merchant = merchant;
		this['private'] = privateData;
		this['public'] = publicData;
		this.assign = assign;
		this.type = type;
		this.created = created;
		this.updated = updated;
		this.contract = contract;
	}
	
}
