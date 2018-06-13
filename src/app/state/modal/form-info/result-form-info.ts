import { FormInfo } from './form-info';
import { FormName } from '../..';

export class ResultFormInfo extends FormInfo {
    constructor(previous?: FormName) {
        super(previous);
        this.name = FormName.resultForm;
        this.active = true;
    }
}
