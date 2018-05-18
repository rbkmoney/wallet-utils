import { Identity } from 'app/backend/model/identity';

export enum ModelStatus {
    initialized = 'initialized',
    none = 'none'
}

export class ModelState {
    identity?: Identity;
    status: ModelStatus;
}
