import * as React from 'react';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import * as cx from 'classnames';

import * as styles from './modal.scss';
import { Footer } from '../footer';
import { MobileHeader } from './mobile-header';
import { FormContainer } from './form-container';
import { Info } from './info';

export const Modal: React.SFC = () => (
    <ReactCSSTransitionGroup
        component='div'
        transitionName={{
            appear: styles.appearFormContainer,
            enter: styles.enterFormContainer,
            leave: styles.leaveFormContainer
        }}
        transitionEnterTimeout={1000}
        transitionLeaveTimeout={1000}
        transitionAppearTimeout={1000}
        transitionAppear={true}
        transitionEnter={true}
        transitionLeave={true}
    >
        <div className={cx(styles.form_container, {
            [styles.with_shadow]: false
        })} id='form-container'>
            <MobileHeader/>
            <Info/>
            <FormContainer/>
            <Footer/>{/*For mobile*/}
        </div>
    </ReactCSSTransitionGroup>
);
