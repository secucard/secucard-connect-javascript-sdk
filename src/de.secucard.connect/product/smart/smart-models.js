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
import {BasketInfo} from './model/basket-info';
import {Basket} from './model/basket';
import {Ident} from './model/ident';
import {Product} from './model/product';
import {ProductGroup} from './model/product-group';
import {Transaction} from './model/transaction';

export const SmartModel = {};
SmartModel.BasketInfo = BasketInfo;
SmartModel.Basket = Basket;
SmartModel.Ident = Ident;
SmartModel.Product = Product;
SmartModel.ProductGroup = ProductGroup;
SmartModel.Transaction = Transaction;