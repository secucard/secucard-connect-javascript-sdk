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

export class PaymentContainerService extends ProductService {

    constructor() {
        super()
    }

    getEndpoint() {
        return ['loyalty', 'paymentcontainers'];
    }

    getEventTargets() {
        return [];
    }

    /**
     * Validate the IBAN informationen
     * @param data Object with { "iban": "", "bic": "", "owner":"" }
     * @returns {Promise}
     */
    validateIban(data) {

        if (data.iban && data.owner) {
            return this.execute('me', 'validateIban', null, data);
        } else {
            throw new Error("Iban and owner are required");
        }
    }

}

PaymentContainerService.Uid = (['loyalty', 'paymentcontainers']).join('.');
