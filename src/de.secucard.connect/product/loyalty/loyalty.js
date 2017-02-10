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
import {ActionCampaignService} from './action-campaign-service';
import {ActionConfigService} from './action-config-service';
import {ActionProfileService} from './action-profile-service';
import {ActionService} from './action-service';
import {BeaconService} from './beacon-service';
import {CardGroupService} from './card-group-service';
import {CardService} from './card-service';
import {ChargeService} from './charge-service';
import {CheckinService} from './checkin-service';
import {CustomerService} from './customer-service';
import {MerchantCardService} from './merchant-card-service';
import {ProgramService} from './program-service';
import {ProgramSpecialService} from './program-special-service';
import {SaleService} from './sale-service';
import {StoreGroupService} from './store-group-service';
import {TransactionService} from './transaction-service';

export const Loyalty = {};
Loyalty.ActionCampaignService = ActionCampaignService;
Loyalty.ActionConfigService = ActionConfigService;
Loyalty.ActionProfileService = ActionProfileService;
Loyalty.ActionService = ActionService;
Loyalty.BeaconService = BeaconService;
Loyalty.CardGroupService = CardGroupService;
Loyalty.CardService = CardService;
Loyalty.ChargeService = ChargeService;
Loyalty.CheckinService = CheckinService;
Loyalty.CustomerService = CustomerService;
Loyalty.MerchantCardService = MerchantCardService;
Loyalty.ProgramService = ProgramService;
Loyalty.ProgramSpecialService = ProgramSpecialService;
Loyalty.SaleService = SaleService;
Loyalty.StoreGroupService = StoreGroupService;
Loyalty.TransactionService = TransactionService;