import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reducer as formReducer } from 'redux-form';
import createSagaMiddleware from 'redux-saga';
import { State } from './state';
import rootSaga from 'app/sagas/root-saga';
import { configReducer, initializeAppReducer, modelReducer } from 'app/reducers';

export function configureStore(initState: any): Store<State> {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(combineReducers({
        initializeApp: initializeAppReducer,
        config: configReducer,
        model: modelReducer,
        form: formReducer
    }), initState, composeWithDevTools(applyMiddleware(sagaMiddleware)));
    sagaMiddleware.run(rootSaga);
    return store;
}
