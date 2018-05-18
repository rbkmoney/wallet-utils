import { InitConfig } from 'app/config';
import { UserConfig } from './user-config';

export const resolveInitConfig = (userConfig: UserConfig): InitConfig => {
    return {
        ...new InitConfig(),
        ...userConfig
    };
};
