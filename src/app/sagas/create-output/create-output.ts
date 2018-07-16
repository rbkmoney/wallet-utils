import {
    CardBindingCompleted,
    CardBindingFailed,
    CardBindingRequested,
    Direction,
    GoToFormInfo,
    SetViewInfoProcess,
    TypeKeys
} from 'app/actions';
import { call, CallEffect, ForkEffect, put, PutEffect, select, SelectEffect, takeLatest } from 'redux-saga/effects';
import { ResultFormInfo, State } from 'app/state';
import { tokenizeCard } from './save-card';
import { bind } from './bind-card';

type FinishEffect = PutEffect<GoToFormInfo | SetViewInfoProcess>;

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
        yield call(bind, tokenizedCard, name, wapiEndpoint, accessToken, identityID);
        yield put({
            type: TypeKeys.SET_VIEW_INFO_PROCESS,
            payload: false
        } as SetViewInfoProcess);
        yield put({
            type: TypeKeys.GO_TO_FORM_INFO,
            payload: { formInfo: new ResultFormInfo(), direction: Direction.forward }
        } as GoToFormInfo);
    } catch (e) {
        yield put({
            type: TypeKeys.CARD_BINDING_FAILED,
            payload: e
        } as CardBindingFailed);
    }
}

export function* watchCreateOutput(): Iterator<ForkEffect> {
    yield takeLatest(TypeKeys.CARD_BINDING_REQUESTED, start);
}
