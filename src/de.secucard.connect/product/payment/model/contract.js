export class Contract {
	
	constructor(created, updated, parent, allow_cloning) {
		this.created = created;
		this.updated = updated;
		this.parent = parent;
		this.allow_cloning = allow_cloning;
	}
	
}

export class ContractCloneParams {
	constructor(allow_transactions, url_push, payment_data, project) {
		this.allow_transactions = allow_transactions;
		this.url_push = url_push;
		this.payment_data = payment_data;
		this.project = project;
	}
}
