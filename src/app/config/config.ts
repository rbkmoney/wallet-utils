import { AppConfig } from 'app/backend';
import { InitConfig } from './init-config';

export class Config {
    origin: string;
    inFrame: boolean;
    initConfig: InitConfig;
    appConfig?: AppConfig;
}
