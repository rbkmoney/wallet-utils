import * as React from 'react';
import { connect } from 'react-redux';
import * as cx from 'classnames';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { FormName, FormViewInfo, ModalForms, ModalName, State } from 'app/state';
import { _error, animationFormContainer, container, form } from './form-container.scss';
import { PassportForm } from './passport-form';
import { CardForm } from './card-form';
import { FormInfo } from 'app/state/modal';
import { ResultForm } from './result-form';
import { findNamed } from 'app/utils/find-named';

interface FormContainerProps {
    activeFormInfo: FormInfo;
    viewInfo: FormViewInfo;
}

export const FormContainerDef: React.SFC<FormContainerProps> = (props) => {
    const {activeFormInfo: {name}, viewInfo} = props;
    return (
        <div className={container}>
            <div className={cx(form, { [_error]: false })}
                style={{height: viewInfo.height}}>
                <ReactCSSTransitionGroup
                    component='div'
                    className={animationFormContainer}
                    transitionName={viewInfo.slideDirection}
                    transitionEnterTimeout={550}
                    transitionLeaveTimeout={550}>
                    {name === FormName.passportForm ? <PassportForm/> : null}
                    {name === FormName.resultForm ? <ResultForm/> : null}
                    {name === FormName.cardForm ? <CardForm/> : null}
                </ReactCSSTransitionGroup>
            </div>
        </div>
    );
};

const mapStateToProps = (state: State) => {
    const modalForms = (findNamed(state.modals, ModalName.modalForms) as ModalForms);
    return {
        activeFormInfo: modalForms.formsInfo.find((item) => item.active),
        viewInfo: modalForms.viewInfo
    };
};

export const FormContainer = connect(mapStateToProps)(FormContainerDef);
