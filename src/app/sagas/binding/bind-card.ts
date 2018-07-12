import { CardBindingCompleted, CardBindingFailed, TypeKeys } from 'app/actions';
import { call, CallEffect, ForkEffect, put, PutEffect, select, SelectEffect, takeLatest } from 'redux-saga/effects';
import { State } from 'app/state';
import { bindCard, DestinationResourceEnum } from 'app/backend';

type BindPutEffect = CardBindingCompleted | CardBindingFailed;

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
                type: DestinationResourceEnum.BankCardDestinationResource,
                token: tokenizedCard.token
            },
            metadata: {
                display_name: 'Картофан СБЕР'
            }
        });
        yield put({
            type: TypeKeys.CARD_BINDING_COMPLETED
        } as CardBindingCompleted);
    } catch (e) {
        yield put({
            type: TypeKeys.CARD_BINDING_FAILED,
            payload: e
        } as CardBindingFailed);
    }
}

export function* watchBindCardRequest(): Iterator<ForkEffect> {
    yield takeLatest(TypeKeys.CARD_BINDING_REQUESTED, bind);
}
