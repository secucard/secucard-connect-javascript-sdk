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
export class Sale {

    constructor(amount, last_change, status, description,
                description_raw, store, card, cardgroup, merchantcard,
                balance_amount, balance_points, currency, bonus) {
        this.amount = amount;
        this.last_change = last_change;
        this.status = status;
        this.description = description;
        this.description_raw = description_raw;
        this.store = store;
        this.card = card;
        this.cardgroup = cardgroup;
        this.merchantcard = merchantcard;
        this.balance_amount = balance_amount;
        this.balance_points = balance_points;
        this.currency = currency;
        this.bonus = bonus;
    }

}
