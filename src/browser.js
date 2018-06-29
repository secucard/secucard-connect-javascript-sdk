import {ClientBrowserEnvironment} from './de.secucard.connect/client-browser-environment';
import {Client} from './de.secucard.connect/client';
import minilog from 'minilog';

export {ServiceMap as Services} from './de.secucard.connect/client-browser-environment';
export {Channel} from './de.secucard.connect/net/channel';

export const MiniLog = minilog;
minilog.suggest.deny(/secucard\..*/, 'warn');

export const SecucardConnect = {
  description: 'SecucardConnect for browser',
};

SecucardConnect.create = (config) => {
  return Client.create(config, ClientBrowserEnvironment);
};
