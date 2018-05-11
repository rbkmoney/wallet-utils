import * as React from 'react';
import * as cx from 'classnames';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { appear, leave, overlay, img, bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8 } from './overlay.scss';

const backgrounds: ReadonlyArray<string> = [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8];

const getRandom = (): number => Math.floor(Math.random() * 7);

export const Overlay: React.SFC = () => (
    <ReactCSSTransitionGroup
        transitionName={{enter: null, appear, leave}}
        transitionEnter={false}
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionLeaveTimeout={500}>
        <div key='overlay' className={cx(overlay, {
            [img]: true,
            [backgrounds[getRandom()]]: true
        })} />
    </ReactCSSTransitionGroup>
);
