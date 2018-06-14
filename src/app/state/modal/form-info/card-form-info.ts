import { FormInfo } from './form-info';
import { FormName } from '../..';

export class CardFormInfo extends FormInfo {
    constructor(previous?: FormName) {
        super(previous);
        this.name = FormName.cardForm;
        this.active = true;
    }
}
