import * as React from 'react';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import * as styles from './modal-container.scss';
import { Modal } from './modal';
import { Footer } from './footer';
import { Close } from '../modal-container/modal/close';

export const ModalContainer: React.SFC = () => (
    <ReactCSSTransitionGroup
        component='div'
        transitionName={{
            appear: styles.appearContainer,
            enter: styles.enterContainer,
            leave: styles.leaveContainer
        }}
        transitionEnterTimeout={950}
        transitionLeaveTimeout={950}
        transitionAppearTimeout={950}
        transitionAppear={true}
        transitionEnter={true}
        transitionLeave={true}
    >
        <div className={styles.container}>
            <ReactCSSTransitionGroup
                component='div'
                transitionName='interactionAnimation'
                transitionEnterTimeout={1000}
                transitionLeaveTimeout={500}
            >
                <div>
                    <Close/>
                    <Modal/>
                    <Footer/>
                </div>
            </ReactCSSTransitionGroup>
        </div>
    </ReactCSSTransitionGroup>
);