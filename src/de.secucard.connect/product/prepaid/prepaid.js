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
import {ContractService} from './contract-service';
import {ItemGroupService} from './item-group-service';
import {ItemService} from './item-service';
import {SaleService} from './sale-service';
import {StockService} from './stock-service';
import {ReportService} from './report-service';

export const Prepaid = {};
Prepaid.ContractService = ContractService;
Prepaid.ItemGroupService = ItemGroupService;
Prepaid.ItemService = ItemService;
Prepaid.ReportService = ReportService;
Prepaid.SaleService = SaleService;
Prepaid.StockService = StockService;
