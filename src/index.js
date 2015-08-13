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
import es6shim from 'es6-shim';
import {ClientNodeEnvironment} from './de.secucard.connect/client-node-environment';
import {Client} from './de.secucard.connect/client';
export {ServiceMap as Services} from './de.secucard.connect/client-node-environment';
export {Channel} from './de.secucard.connect/net/channel';

export const SecucardConnect = {
    description: 'SecucardConnect for nodejs'
};

import minilog from 'minilog';
export const MiniLog = minilog;
minilog.suggest.deny(/secucard\..*/, 'warn');

SecucardConnect.create = (config) => {

    return Client.create(config, ClientNodeEnvironment);

};