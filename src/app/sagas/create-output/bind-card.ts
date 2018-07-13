import { CardBindingCompleted, CardBindingFailed, TypeKeys } from 'app/actions';
import { call, CallEffect, put, PutEffect, select, SelectEffect } from 'redux-saga/effects';
import { State } from 'app/state';
import { bindCard, DestinationResourceEnum } from 'app/backend';

type BindPutEffect = CardBindingCompleted | CardBindingFailed;

type BindEffect = SelectEffect |
    CallEffect |
    PutEffect<BindPutEffect>;

export function* bind(): Iterable<BindEffect> {
    const { config, identityID, tokenizedCard } = yield select((s: State) => ({
        config: s.config,
        identityID: s.config.initConfig.params.identityID,
        tokenizedCard: s.model.tokenizedCard
    }));
    yield call(bindCard, config.appConfig.wapiEndpoint, config.initConfig.token, {
        name: config.initConfig.params.name,
        identity: identityID,
        currency: 'RUB', // TODO: Ожидаем ручку для получения валюты
        resource: {
            type: DestinationResourceEnum.BankCardDestinationResource,
            token: tokenizedCard.token
        },
        metadata: {}
    });
    yield put({
        type: TypeKeys.CARD_BINDING_COMPLETED
    } as CardBindingCompleted);
}
