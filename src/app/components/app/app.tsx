import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { layout } from './app.scss';

import { Overlay } from './overlay';
import { ModalContainer } from './modal-container';
import { initializeApp } from 'app/actions';
import { State } from 'app/state';
import { AppProps } from './app-props';
import { AppLoader } from './app-loader';

class AppDef extends React.Component<AppProps> {

    componentWillMount() {
        this.props.initApp();
    }

    render() {
        const {initialized, error} = this.props.initializeApp;
        return (
            <div className={layout}>
                <Overlay/>
                {error ? <div>{error.description}</div> : false}
                {!initialized && !error ? <AppLoader/> : false}
                {initialized ? <ModalContainer/> : false}
            </div>
        );
    }
}

const mapStateToProps = (state: State) => ({
    initializeApp: state.initializeApp
});

const mapDispatchToProps = (dispatch: Dispatch<State>) => ({
    initApp: bindActionCreators(initializeApp, dispatch),
});

export const App = connect(mapStateToProps, mapDispatchToProps)(AppDef);
