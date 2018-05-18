import { AppConfig } from 'app/backend';
import { AbstractAction, TypeKeys } from 'app/actions';

export interface Config {
    appConfig: AppConfig;
}

export interface AppConfigReceived extends AbstractAction<Config> {
    type: TypeKeys.APP_CONFIG_RECEIVED;
    payload: Config;
}
