import * as React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import get from 'lodash-es/get';
import { FormInfo, FormName, PassportFormValues, ResultFormInfo, State } from 'app/state';
import { goToFormInfo, setViewInfoError, setViewInfoHeight } from 'app/actions';
import { Header } from '../header';
import { BirthDate, BirthPlace, FamilyName, IssuedAt, Issuer, Name, PassportNumber, Patronymic } from './fields';
import { Button } from '../button';

type Props = InjectedFormProps & PassportFormProps;

interface PassportFormProps {
    formValues: PassportFormValues;
    setForm: (formInfo: FormInfo) => {};
    setViewInfoHeight: (height: number) => any;
    setViewInfoError: (hasError: boolean) => any;
}

class PassportFormDef extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
        this.props.setViewInfoHeight(560);
    }

    componentWillMount() {
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
                    <Name/>
                    <Patronymic/>
                    <BirthDate/>
                    <BirthPlace/>
                    <PassportNumber/>
                    <Issuer/>
                    <IssuedAt/>
                </div>
                <Button
                    type='submit'
                    style='primary'
                    id='pay-btn'>
                    Далее
                </Button>
            </form>
        );
    }

    private submit(values: PassportFormValues) {
        (document.activeElement as HTMLElement).blur();
        this.props.setForm(new ResultFormInfo());
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
    setViewInfoError: bindActionCreators(setViewInfoError, dispatch)
});

const ReduxForm = reduxForm({
    form: FormName.passportForm,
    destroyOnUnmount: false
})(PassportFormDef);

export const PassportForm = connect(mapStateToProps, mapDispatchToProps)(ReduxForm as any);
