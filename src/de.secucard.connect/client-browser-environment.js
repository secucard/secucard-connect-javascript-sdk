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
import {Stomp} from './net/stomp';
import {SocketAtBrowser} from './net/socket/socket-browser';
import {General} from './product/general/general';
import {Smart} from './product/smart/smart'
import {Loyalty} from './product/loyalty/loyalty';
import {Payment} from './product/payment/payment';
import {Services} from './product/services/services';
import {Document} from './product/document/document';
import {Auth} from './product/auth/auth';
import {TokenStorageInMem} from './auth/token-storage';

export const ClientBrowserEnvironment = {
    config: {
        stompPort: 15671,
        stompEndpoint: '/stomp/websocket'
    },
    services: [
        Auth.SessionService,

        Document.UploadService,

        General.SkeletonService,
        General.AccountService,
        General.AccountDeviceService,
        General.ContactService,
        General.DeliveryAddressService,
        General.FileAccessService,
        General.MerchantService,
        General.NewsService,
        General.NotificationService,
        General.PublicMerchantService,
        General.StoreGroupService,
        General.StoreService,
        General.TransactionService,
        
        Loyalty.ActionActionService,
        Loyalty.ActionProfileService,
        Loyalty.BeaconService,
        Loyalty.CardGroupService,
        Loyalty.CardService,
        Loyalty.ChargeService,
        Loyalty.CheckinService,
        Loyalty.CustomerService,
        Loyalty.MerchantCardService,
        Loyalty.ProgramService,
        Loyalty.ProgramSpecialService,
        Loyalty.SaleService,
        Loyalty.StoreGroupService,

        Payment.ContainerService,
        Payment.ContractService,
        Payment.CustomerService,
        Payment.SecupayDebitService,
        Payment.SecupayPrepayService,

        Services.IdentCaseService,
        Services.IdentContractService,
        Services.IdentRequestService,
        Services.IdentResultService,

        Smart.TransactionService,
        Smart.IdentService,
        Smart.CheckinService
    ]
};
ClientBrowserEnvironment.StompChannel = {
    create: () => {
        return new Stomp(SocketAtBrowser);
    }
};

ClientBrowserEnvironment.TokenStorage = {
    create: () => {
        return new TokenStorageInMem();
    }
};

export const ServiceMap = {
    Auth: {
        Sessions: Auth.SessionService.Uid
    },
    Document: {
        Uploads: Document.UploadService.Uid
    },
    General: {
        Skeletons: General.SkeletonService.Uid,
        Accounts: General.AccountService.Uid,
        AccountDevices: General.AccountDeviceService.Uid,
        Contacts: General.ContactService.Uid,
        DeliveryAddresses: General.DeliveryAddressService.Uid,
        FileAccesses: General.FileAccessService.Uid,
        Merchants: General.MerchantService.Uid,
        News: General.NewsService.Uid,
        Notifications: General.NotificationService.Uid,
        PublicMerchants: General.PublicMerchantService.Uid,
        StoreGroups: General.StoreGroupService.Uid,
        Stores: General.StoreService.Uid,
        Transactions: General.TransactionService.Uid
    },
    Loyalty: {
        ActionActions: Loyalty.ActionActionService.Uid,
        ActionProfiles: Loyalty.ActionProfileService.Uid,
        Beacons: Loyalty.BeaconService.Uid,
        CardGroups: Loyalty.CardGroupService.Uid,
        Cards: Loyalty.CardService.Uid,
        Charges: Loyalty.ChargeService.Uid,
        Checkins: Loyalty.CheckinService.Uid,
        Customers: Loyalty.CustomerService.Uid,
        MerchantCards: Loyalty.MerchantCardService.Uid,
        Programs: Loyalty.ProgramService.Uid,
        ProrgamSpecials: Loyalty.ProgramSpecialService.Uid,
        Sales: Loyalty.SaleService.Uid,
        StoreGroups: Loyalty.StoreGroupService.Uid
    },
    Services: {
        IdentCases: Services.IdentCaseService.Uid,
        IdentContracts: Services.IdentContractService.Uid,
        IdentRequests: Services.IdentRequestService.Uid,
        IdentResults: Services.IdentResultService.Uid
    },
    Smart: {
        Transactions: Smart.TransactionService.Uid,
        Checkins: Smart.CheckinService.Uid,
        Idents: Smart.IdentService.Uid
    }
};