import * as React from 'react';
import { connect } from 'react-redux';
import * as cx from 'classnames';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { State } from 'app/state';
import { ActionType } from '../../../../../../communication/model';
import { container, form, animationFormContainer, _error } from './form-container.scss';
import { PassportForm } from './passport-form';
import { CardForm } from './card-form';

interface FormContainerProps {
    actionType: ActionType;
}

export const FormContainerDef: React.SFC<FormContainerProps> = (props) => (
    <div className={container}>
        <div className={cx(form, {[_error]: false})}
             style={{height: 629}}> {/* TODO: высота должна задаваться в зависимости от стейта */}
            <ReactCSSTransitionGroup
                component='div'
                className={animationFormContainer}
                transitionName={'slideDirection'}
                transitionEnterTimeout={550}
                transitionLeaveTimeout={550}>
                {props.actionType === ActionType.userIdentity ? <PassportForm/> : null}
                {props.actionType === ActionType.createOutput ? <CardForm/> : null}
            </ReactCSSTransitionGroup>
        </div>
    </div>
);

const mapStateToProps = (state: State) => ({
    actionType: state.config.initConfig.type
});

export const FormContainer = connect(mapStateToProps)(FormContainerDef);
