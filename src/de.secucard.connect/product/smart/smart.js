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

import {CheckinService} from './checkin-service';
import {ConfigurationService} from './configuration-service';
import {DeviceService} from './device-service';
import {DeviceHistoriesService} from './device-histories';
import {IdentService} from './ident-service';
import {RoutingService} from './routing-service';
import {TransactionService} from './transaction-service';


export const Smart = {};
Smart.CheckinService = CheckinService;
Smart.ConfigurationService = ConfigurationService;
Smart.DeviceService = DeviceService;
Smart.DeviceHistoriesService = DeviceHistoriesService;
Smart.IdentService = IdentService;
Smart.RoutingService = RoutingService;
Smart.TransactionService = TransactionService;