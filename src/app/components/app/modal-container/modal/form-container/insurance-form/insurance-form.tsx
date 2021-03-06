import * as React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import get from 'lodash-es/get';
import { FormInfo, FormName, InsuranceFormValues, PassportFormValues, State } from 'app/state';
import {
    bindDocuments,
    DocumentsBindingRequestedPayload,
    goToFormInfo,
    setViewInfoError,
    setViewInfoHeight
} from 'app/actions';
import { Header } from '../header';
import { InsuranceNumber } from './fields';
import { Button } from '../button';

type Props = InjectedFormProps & InsuranceFormProps;

interface InsuranceFormProps {
    insuranceFormValues: InsuranceFormValues;
    passportFormValues: PassportFormValues;
    setForm: (formInfo: FormInfo) => {};
    setViewInfoHeight: (height: number) => any;
    setViewInfoError: (hasError: boolean) => any;
    bindDocuments: (forms: DocumentsBindingRequestedPayload) => any;
}

class InsuranceFormDef extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    componentWillMount() {
        this.props.setViewInfoHeight(210);
        this.props.setViewInfoError(false);
        const { insuranceFormValues } = this.props;
        this.init(insuranceFormValues);
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

    private submit() {
        (document.activeElement as HTMLElement).blur();
        this.props.bindDocuments({
            passportFormValues: this.props.passportFormValues,
            insuranceFormValues: this.props.insuranceFormValues
        });
    }

    private init(values: InsuranceFormValues) {
        this.props.initialize({
            ...values
        });
    }
}

const mapStateToProps = (state: State) => ({
    insuranceFormValues: get(state.form, 'insuranceForm.values'),
    passportFormValues: get(state.form, 'passportForm.values')
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setForm: bindActionCreators(goToFormInfo, dispatch),
    setViewInfoHeight: bindActionCreators(setViewInfoHeight, dispatch),
    setViewInfoError: bindActionCreators(setViewInfoError, dispatch),
    bindDocuments: bindActionCreators(bindDocuments, dispatch)
});

const ReduxForm = reduxForm({
    form: FormName.insuranceForm,
    destroyOnUnmount: false
})(InsuranceFormDef);

export const InsuranceForm = connect(mapStateToProps, mapDispatchToProps)(ReduxForm as any);
