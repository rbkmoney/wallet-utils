import { FormInfo } from './form-info';
import { FormName } from '../..';

export class InsuranceFormInfo extends FormInfo {
    constructor(previous?: FormName) {
        super(previous);
        this.name = FormName.insuranceForm;
        this.active = true;
    }
}
