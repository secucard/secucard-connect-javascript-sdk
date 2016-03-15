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
export class MerchantCard {

    constructor(merchant, created_for_merchant, card, created_for_store,
                is_base_card, cardgroup, customer, balance, points,
                last_usage, last_charge, stock_status, lock_status) {
        this.merchant = merchant;
        this.created_for_merchant = created_for_merchant;
        this.card = card;
        this.created_for_store = created_for_store;
        this.is_base_card = is_base_card;
        this.cardgroup = cardgroup;
        this.customer = customer;
        this.balance = balance;
        this.points = points;
        this.last_usage = last_usage;
        this.last_charge = last_charge;
        this.stock_status = stock_status;
        this.lock_status = lock_status;
    }

}
