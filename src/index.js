import {ClientNodeEnvironment} from './de.secucard.connect/client-node-environment';
import {Client} from './de.secucard.connect/client';
import minilog from 'minilog';

export {ServiceMap as Services} from './de.secucard.connect/client-node-environment';
export {Channel} from './de.secucard.connect/net/channel';

export const SecucardConnect = {
  description: 'SecucardConnect for nodejs',
};

export const MiniLog = minilog;
minilog.suggest.deny(/secucard\..*/, 'warn');

SecucardConnect.create = (config) => {
  return Client.create(config, ClientNodeEnvironment);
};