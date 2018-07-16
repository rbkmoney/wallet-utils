import * as React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import get from 'lodash-es/get';
import { Button } from '../button';
import { Header } from '../header';
import { CardNumber } from './fields';
import { bindCard, goToFormInfo, setViewInfoError, setViewInfoHeight } from 'app/actions';
import { CardFormValues, FormInfo, FormName, State } from 'app/state';

interface CardFormDefProps {
    formValues: CardFormValues;
    setForm: (formInfo: FormInfo) => any;
    setViewInfoHeight: (height: number) => any;
    setViewInfoError: (hasError: boolean) => any;
    bindCard: (payload: CardFormValues) => any;
}

type Props = InjectedFormProps & CardFormDefProps;

class CardFormDef extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.submit = this.submit.bind(this);
    }

    componentWillMount() {
        this.props.setViewInfoHeight(236);
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
            <form onSubmit={handleSubmit(this.submit)} id='card-form'>
                <div>
                    <Header title='Банковская карта'/>
                    <CardNumber/>
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

    private submit(values: CardFormValues) {
        (document.activeElement as HTMLElement).blur();
        this.props.bindCard(values);
    }

    private init(values: CardFormValues) {
        this.props.initialize({
            ...values
        });
    }
}

const mapStateToProps = (state: State) => ({
    insurancecFormValues: get(state.form, 'cardForm.values')
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setForm: bindActionCreators(goToFormInfo, dispatch),
    setViewInfoHeight: bindActionCreators(setViewInfoHeight, dispatch),
    setViewInfoError: bindActionCreators(setViewInfoError, dispatch),
    bindCard: bindActionCreators(bindCard, dispatch)
});

const ReduxForm = reduxForm({
    form: FormName.cardForm,
    destroyOnUnmount: false
})(CardFormDef);

export const CardForm = connect(mapStateToProps, mapDispatchToProps)(ReduxForm as any);
