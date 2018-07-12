import * as React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import get from 'lodash-es/get';
import { FormInfo, FormName, InsuranceFormValues, PassportFormValues, ResultFormInfo, State } from 'app/state';
import {
    goToFormInfo,
    saveInsurance,
    InsuranceSavingRequestedPayload,
    setViewInfoError,
    setViewInfoHeight
} from 'app/actions';
import { Header } from '../header';
import { InsuranceNumber } from './fields';
import { Button } from '../button';
import { DocumentTypeEnum } from 'app/backend';

type Props = InjectedFormProps & PassportFormProps;

interface PassportFormProps {
    formValues: PassportFormValues;
    setForm: (formInfo: FormInfo) => {};
    setViewInfoHeight: (height: number) => any;
    setViewInfoError: (hasError: boolean) => any;
    saveDocument: (payload: InsuranceSavingRequestedPayload) => any;
}

class InsuranceFormDef extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    componentWillMount() {
        this.props.setViewInfoHeight(210);
        this.props.setViewInfoError(false);
        const { formValues } = this.props;
        this.init(formValues);
    }

    componentWillReceiveProps(props: Props) {
        if (props.submitFailed) {
            props.setViewInfoError(true);
        }
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(this.submit)} id='insurance-sertificate-form'>
                <div>
                    <Header key='header' title='СНИЛС'/>
                    <InsuranceNumber/>
                </div>
                <Button
                    type='submit'
                    style='primary'
                    id='next-btn'>
                    Далее
                </Button>
            </form>
        );
    }

    private submit(values: InsuranceFormValues) {
        (document.activeElement as HTMLElement).blur();
        this.props.saveDocument({ values, type: DocumentTypeEnum.RUSRetireeInsuranceCertificateData });
    }

    private init(values: InsuranceFormValues) {
        this.props.initialize({
            ...values
        });
    }
}

const mapStateToProps = (state: State) => ({
    formValues: get(state.form, 'insuranceForm.values')
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setForm: bindActionCreators(goToFormInfo, dispatch),
    setViewInfoHeight: bindActionCreators(setViewInfoHeight, dispatch),
    setViewInfoError: bindActionCreators(setViewInfoError, dispatch),
    saveDocument: bindActionCreators(saveInsurance, dispatch)
});

const ReduxForm = reduxForm({
    form: FormName.insuranceForm,
    destroyOnUnmount: false
})(InsuranceFormDef);

export const InsuranceForm = connect(mapStateToProps, mapDispatchToProps)(ReduxForm as any);
