import { ConfigState } from 'app/state';
import { AppConfigReceived, TypeKeys } from 'app/actions';

type ConfigReducerAction = AppConfigReceived;

export const configReducer = (s: ConfigState = null, action: ConfigReducerAction) => {
    switch (action.type) {
        case TypeKeys.APP_CONFIG_RECEIVED:
            return {
                ...s,
                ...action.payload
            };

    }
    return s;
};
