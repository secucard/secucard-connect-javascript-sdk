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
export class Transaction {
	
	constructor(customer, contract, amount, currency, purpose, order_id, trans_id, status, transaction_status) {
		this.customer = customer;
		this.contract = contract;
		this.amount = amount;
		this.currency = currency;
		this.purpose = purpose;
		this.order_id = order_id;
		this.trans_id = trans_id;
		this.status = status;
		this.transaction_status = transaction_status;
	}
	
}
