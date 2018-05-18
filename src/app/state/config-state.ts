import { InitConfig } from 'app/config';
import { AppConfig } from 'app/backend';

export class ConfigState {
    origin: string;
    inFrame: boolean;
    initConfig: InitConfig;
    appConfig?: AppConfig;
}
