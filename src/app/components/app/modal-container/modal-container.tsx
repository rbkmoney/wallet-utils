import * as React from 'react';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { appear, leave, enter, container } from './modal-container.scss';
import { Modal } from './modal';
import { Footer } from './footer';
import { Close } from '../modal-container/modal/close';
import { connect } from 'react-redux';
import { State } from 'app/state';

interface ModalContainerDefProps {
    inFrame: boolean;
}

export const ModalContainerDef: React.SFC<ModalContainerDefProps> = (props) => (
    <ReactCSSTransitionGroup
        component='div'
        transitionName={{enter, appear, leave}}
        transitionEnterTimeout={950}
        transitionLeaveTimeout={950}
        transitionAppearTimeout={950}
        transitionAppear={true}
        transitionEnter={true}
        transitionLeave={true}>
        <div className={container}>
            <ReactCSSTransitionGroup
                component='div'
                transitionName='interactionAnimation'
                transitionEnterTimeout={1000}
                transitionLeaveTimeout={500}>
                <div>
                    {props.inFrame ? <Close/> : null}
                    <Modal/>
                    <Footer/>
                </div>
            </ReactCSSTransitionGroup>
        </div>
    </ReactCSSTransitionGroup>
);

const mapStateToProps = (state: State) => ({
    inFrame: state.config.inFrame
});

export const ModalContainer = connect(mapStateToProps)(ModalContainerDef);
