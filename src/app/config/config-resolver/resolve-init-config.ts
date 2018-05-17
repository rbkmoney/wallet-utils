import { InitConfig } from '../init-config';
import { UserConfig } from './user-config';

export const resolveInitConfig = (userConfig: UserConfig): InitConfig => {
    return {
        ...new InitConfig(),
        ...userConfig
    };
};
