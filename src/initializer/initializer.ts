import { Transport } from '../communication';

export enum ActionType {
    userIdentity = 'userIdentity'
}

export abstract class Initializer {

    protected constructor(protected readonly token: string, protected readonly origin: string) {}

    abstract open(type: ActionType): Promise<Transport>;

    abstract close(): void;
}
