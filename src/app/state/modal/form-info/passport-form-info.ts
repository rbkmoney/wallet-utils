import { FormInfo } from './form-info';
import { FormName } from '../..';

export class PassportFormInfo extends FormInfo {
    constructor(previous?: FormName) {
        super(previous);
        this.name = FormName.passportForm;
        this.active = true;
    }
}
