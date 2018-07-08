import { BindCardCompleted, BindCardFailed, Direction, GoToFormInfo, SetInProgressState, TypeKeys } from 'app/actions';
import { call, CallEffect, ForkEffect, put, PutEffect, select, SelectEffect, takeLatest } from 'redux-saga/effects';
import { ResultFormInfo, State } from 'app/state';
import { bindCard, DestinationResource } from 'app/backend';

type BindPutEffect = BindCardCompleted | BindCardFailed | GoToFormInfo | SetInProgressState;

type BindEffect = SelectEffect |
    CallEffect |
    PutEffect<BindPutEffect>;

function* bind(): Iterator<BindEffect> {
    try {
        const { config, tokenizedCard, identityID } = yield select((s: State) => ({
            config: s.config,
            tokenizedCard: s.model.tokenizedCard,
            identityID: s.config.initConfig.params.identityID
        }));
        yield call(bindCard, config.appConfig.wapiEndpoint, config.initConfig.token, {
            name: 'Squarey plastic thingy',
            identity: identityID,
            currency: 'RUB',
            resource: {
                type: DestinationResource.BankCardDestinationResource,
                token: tokenizedCard.token
            },
            metadata: {
                display_name: 'Картофан СБЕР'
            }
        });
        yield put({
            type: TypeKeys.CARD_BINDING_COMPLETED
        } as BindCardCompleted);
        yield put({
            type: TypeKeys.SET_IN_PROGRESS,
            payload: false
        } as SetInProgressState);
        yield put({
            type: TypeKeys.GO_TO_FORM_INFO,
            payload: { formInfo: new ResultFormInfo(), direction: Direction.forward }
        } as GoToFormInfo);
    } catch (e) {
        yield put({
            type: TypeKeys.CARD_BINDING_FAILED,
            payload: e
        } as BindCardFailed);
    }
}

export function* watchBindCardRequest(): Iterator<ForkEffect> {
    yield takeLatest(TypeKeys.CARD_BINDING_REQUEST, bind);
}
