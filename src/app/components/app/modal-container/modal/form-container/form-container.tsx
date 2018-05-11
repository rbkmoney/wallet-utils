import * as React from 'react';
import * as cx from 'classnames';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { container, form, animationFormContainer, _error } from './form-container.scss';
import { PassportForm } from './passport-form';

export const FormContainer: React.SFC = () => (
    <div className={container}>
        <div className={cx(form, {[_error]: false})}
             style={{height: 629}}> {/* TODO: высота должна задаваться в зависимости от стейта */}
            <ReactCSSTransitionGroup
                component='div'
                className={animationFormContainer}
                transitionName={'slideDirection'}
                transitionEnterTimeout={550}
                transitionLeaveTimeout={550}>
                <PassportForm/>
            </ReactCSSTransitionGroup>
        </div>
    </div>
);
