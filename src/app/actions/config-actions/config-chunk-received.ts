import { AppConfig } from 'app/backend';
import { AbstractAction, TypeKeys } from 'app/actions';

export interface ConfigChunk {
    appConfig: AppConfig;
}

export interface ConfigChunkReceived extends AbstractAction<ConfigChunk> {
    type: TypeKeys.CONFIG_CHUNK_RECEIVED;
    payload: ConfigChunk;
}
