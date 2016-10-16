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
import {ProductService} from '../product-service'

export class MerchantCardService extends ProductService {

    constructor() {
        super()
    }
    
    charge(merchantCardId, tid, cardnumber, action, amount, bonusAmount) {
        return this.execute(merchantCardId, 'charge', null, 
            {tid: tid, cardnumber: cardnumber, action: action, amount: amount, bonus_amount: bonusAmount});
    }
    
    lock(merchantCardId, reasonId, note) {
        return this.execute(merchantCardId, 'lock', null, {reason: reasonId, note: note});
    }
    
    unlock(merchantCardId, note) {
        return this.execute(merchantCardId, 'unlock', null, {note: note});
    }
    
    registerCustomer(merchantCardId, data) {
        return this.execute(merchantCardId, 'registerCustomer', null, data);
    }
    
    retrieveLock(merchantCardId) {
        return this.retrieveWithAction(merchantCardId, 'lock', null);
    }
    
    retrieveLockReasons(merchantCardId) {
        return this.retrieveWithAction(merchantCardId, 'lockreasons', null);
    }
    
    updateGroup(merchantCardId, groupId) {
        return this.updateWithAction(merchantCardId, 'cardgroup', groupId);
    }
    
    retrieveVirtualTerminalData(merchantId) {
        return this.retrieveWithAction('me', 'virtualTerminalData', merchantId);
    }

    getEndpoint() {
        return ['loyalty', 'merchantcards'];
    }

    getEventTargets() {
        return [];
    }

}

MerchantCardService.Uid = (['loyalty', 'merchantcards']).join('.');
