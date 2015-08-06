/*
 Copyright 2015 hp.weber GmbH & Co secucard KG (www.secucard.com)
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */
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
