import * as React from 'react';
import { connect } from 'react-redux';
import * as cx from 'classnames';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { appear, leave, overlay, img, bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8 } from './overlay.scss';
import { State } from 'app/state';

const backgrounds: ReadonlyArray<string> = [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8];

const getRandom = (): number => Math.floor(Math.random() * 7);

interface OverlayDefProps {
    inFrame: boolean;
}

const OverlayDef: React.SFC<OverlayDefProps> = (props) => (
    <ReactCSSTransitionGroup
        transitionName={{enter: null, appear, leave}}
        transitionEnter={false}
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionLeaveTimeout={500}>
        <div key='overlay' className={cx(overlay, {
            [img]: !props.inFrame,
            [backgrounds[getRandom()]]: !props.inFrame
        })} />
    </ReactCSSTransitionGroup>
);

const mapStateToProps = (state: State) => ({
    inFrame: state.config.inFrame
});

export const Overlay = connect(mapStateToProps)(OverlayDef);
