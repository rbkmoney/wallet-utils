import { CardBindingCompleted, CardBindingFailed, TypeKeys } from 'app/actions';
import { call, CallEffect, put, PutEffect, SelectEffect } from 'redux-saga/effects';
import { bindCard, DestinationResourceEnum, TokenizedCard } from 'app/backend';

type BindPutEffect = CardBindingCompleted | CardBindingFailed;

type BindEffect = SelectEffect |
    CallEffect |
    PutEffect<BindPutEffect>;

export function* bind(tokenizedCard: TokenizedCard, name: string, wapiEndpoint: string, accessToken: string, identityID: string): Iterable<BindEffect> {
    yield call(bindCard, wapiEndpoint, accessToken, {
        name,
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
