import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { layout } from './layout.scss';

import { Overlay } from './overlay';
import { ModalContainer } from './modal-container';
import { initializeApp } from 'app/actions';
import { State } from 'app/state';
import { AppProps } from './app-props';

class AppDef extends React.Component<AppProps> {
    componentWillMount(): void {
        this.props.initApp();
    }

    render(): React.ReactNode {
        return (<div className={layout}>
            <Overlay/>
            <ModalContainer/>
        </div>);
    }
}

const mapDispatchToProps = (dispatch: Dispatch<State>) => ({
    initApp: bindActionCreators(initializeApp, dispatch)
});

export const App = connect(null, mapDispatchToProps)(AppDef);
