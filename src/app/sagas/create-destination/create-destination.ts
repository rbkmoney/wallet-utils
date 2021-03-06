import { call, CallEffect, ForkEffect, put, PutEffect, select, SelectEffect, takeLatest } from 'redux-saga/effects';
import {
    CardBindingCompleted,
    CardBindingFailed,
    CardBindingRequested,
    Direction,
    GoToFormInfo,
    ResultAction,
    SetViewInfoProcess,
    TypeKeys
} from 'app/actions';
import { ResultFormInfo, ResultState, State } from 'app/state';
import { tokenizeCard } from './save-card';
import { bind } from './bind-card';

type FinishEffect = PutEffect<GoToFormInfo | SetViewInfoProcess | ResultAction>;

type BindPutEffect = CardBindingCompleted | CardBindingFailed;

type BindEffect = CallEffect |
    SelectEffect |
    PutEffect<BindPutEffect>;

function* start(action: CardBindingRequested): Iterable<BindEffect | FinishEffect> {
    try {
        yield put({
            type: TypeKeys.SET_VIEW_INFO_PROCESS,
            payload: true
        } as SetViewInfoProcess);
        const { wapiEndpoint, accessToken, identityID, name } = yield select((s: State) => ({
            wapiEndpoint: s.config.appConfig.wapiEndpoint,
            accessToken: s.config.initConfig.token,
            identityID: s.config.initConfig.params.identityID,
            name: s.config.initConfig.params.name
        }));
        const tokenizedCard = yield call(tokenizeCard, action.payload, wapiEndpoint, accessToken);
        const destination = yield call(bind, tokenizedCard, name, wapiEndpoint, accessToken, identityID);
        yield put({
            type: TypeKeys.CARD_BINDING_COMPLETED,
            payload: destination
        } as CardBindingCompleted);
        yield put({
            type: TypeKeys.SET_VIEW_INFO_PROCESS,
            payload: false
        } as SetViewInfoProcess);
        yield put({
            type: TypeKeys.GO_TO_FORM_INFO,
            payload: { formInfo: new ResultFormInfo(), direction: Direction.forward }
        } as GoToFormInfo);
        yield put({
            type: TypeKeys.SET_RESULT,
            payload: ResultState.onCreateDestination
        } as ResultAction);
    } catch (e) {
        yield put({
            type: TypeKeys.CARD_BINDING_FAILED,
            payload: e
        } as CardBindingFailed);
        yield put({
            type: TypeKeys.GO_TO_FORM_INFO,
            payload: { formInfo: new ResultFormInfo(), direction: Direction.forward }
        } as GoToFormInfo);
    }
}

export function* watchCreateDestination(): Iterator<ForkEffect> {
    yield takeLatest(TypeKeys.CARD_BINDING_REQUESTED, start);
}
