import * as React from 'react';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { appear, leave, loader } from './form-loader.scss';
import { Loader } from 'app/components/ui/loader';

export const FormLoader: React.SFC = () => (
    <ReactCSSTransitionGroup
        transitionName={{enter: null, appear, leave}}
        transitionEnter={false}
        transitionAppear={true}
        transitionAppearTimeout={500}
        transitionLeaveTimeout={200}>
        <div key='form-loader' className={loader} id='form-loader'>
            <Loader/>
        </div>
    </ReactCSSTransitionGroup>
);
