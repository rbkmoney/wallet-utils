import { Transport } from '../communication';
import { InitializerData } from '../communication/model';

export abstract class Initializer {

    protected constructor(protected readonly token: string, protected readonly origin: string) {
    }

    abstract open(data: InitializerData): Promise<Transport>;

    abstract close(): void;
}
