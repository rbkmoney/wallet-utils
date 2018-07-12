import * as React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import get from 'lodash-es/get';
import { FormInfo, FormName, PassportFormValues, State } from 'app/state';
import {
    goToFormInfo,
    savePassport,
    PassportSavingRequestedPayload,
    setViewInfoError,
    setViewInfoHeight
} from 'app/actions';
import { Header } from '../header';
import {
    BirthDate,
    BirthPlace,
    FamilyName,
    IssuedAt,
    Issuer,
    FirstName,
    PassportNumber,
    Patronymic,
    IssuerCode
} from './fields';
import { Button } from '../button';
import { DocumentTypeEnum } from 'app/backend';

const transformPassportValues = (values: any) => {
    const result: any = {};
    for (const key in values) {
        if (values.hasOwnProperty(key)) {
            if (key === 'number') {
                result.series = values[key].slice(0, 4);
                result.number = values[key].slice(4, 10);
            } else {
                result[key] = values[key];
            }
        }
    }
    return result;
};

type Props = InjectedFormProps & PassportFormProps;

interface PassportFormProps {
    formValues: PassportFormValues;
    setForm: (formInfo: FormInfo) => {};
    setViewInfoHeight: (height: number) => any;
    setViewInfoError: (hasError: boolean) => any;
    saveDocument: (payload: PassportSavingRequestedPayload) => any;
}

class PassportFormDef extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    componentWillMount() {
        this.props.setViewInfoHeight(607);
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
            <form onSubmit={handleSubmit(this.submit)} id='passport-form'>
                <div>
                    <Header key='header' title='Паспорт'/>
                    <FamilyName/>
                    <FirstName/>
                    <Patronymic/>
                    <BirthDate/>
                    <BirthPlace/>
                    <PassportNumber/>
                    <Issuer/>
                    <IssuerCode/>
                    <IssuedAt/>
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

    private submit(values: PassportFormValues) {
        (document.activeElement as HTMLElement).blur();
        this.props.saveDocument({ values: transformPassportValues(values), type: DocumentTypeEnum.RUSDomesticPassportData });
    }

    private init(values: PassportFormValues) {
        this.props.initialize({
            ...values
        });
    }
}

const mapStateToProps = (state: State) => ({
    formValues: get(state.form, 'passportForm.values')
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setForm: bindActionCreators(goToFormInfo, dispatch),
    setViewInfoHeight: bindActionCreators(setViewInfoHeight, dispatch),
    setViewInfoError: bindActionCreators(setViewInfoError, dispatch),
    saveDocument: bindActionCreators(savePassport, dispatch)
});

const ReduxForm = reduxForm({
    form: FormName.passportForm,
    destroyOnUnmount: false
})(PassportFormDef);

export const PassportForm = connect(mapStateToProps, mapDispatchToProps)(ReduxForm as any);
