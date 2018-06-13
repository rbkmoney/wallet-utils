import { Named } from '../named';
import { FormName } from '../..';

export abstract class FormInfo implements Named {
    name: FormName;
    active: boolean;
    previous?: FormName;

    protected constructor(previous?: FormName) {
        this.previous = previous;
    }
}
