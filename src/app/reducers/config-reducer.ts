import { ConfigState } from 'app/state';
import { ConfigChunkReceived, TypeKeys } from 'app/actions';

type ConfigReducerAction = ConfigChunkReceived;

export const configReducer = (s: ConfigState = null, action: ConfigReducerAction) => {
    switch (action.type) {
        case TypeKeys.CONFIG_CHUNK_RECEIVED:
            return {
                ...s,
                ...action.payload
            };

    }
    return s;
};
