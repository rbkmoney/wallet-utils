import { Transport } from 'cross-origin-communicator';
import { PossibleEvents } from '../../../communication';
import { Config } from '../config';
import { getOrigin } from '../../../get-origin';
import { UserConfig } from './user-config';
import { resolveInitConfig } from './resolve-init-config';
import { isInFrame } from '../../../is-in-iframe';
import { deserialize } from 'app/utils/uri-serializer';

const isUriContext = !!location.search;

const resolveUserConfig = (transport: Transport): Promise<UserConfig> => {
    return new Promise((resolve) =>
        isUriContext
            ? resolve(deserialize(location.search))
            : transport.on(PossibleEvents.init, (config) => resolve(config)));
};

export const resolveConfig = (transport: Transport): Promise<Config> =>
    resolveUserConfig(transport).then((userConfig) => ({
        origin: getOrigin(),
        inFrame: isInFrame(),
        initConfig: resolveInitConfig(userConfig)
    }));
