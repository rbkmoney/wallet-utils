import { call, CallEffect, SelectEffect } from 'redux-saga/effects';
import { bindCard, DestinationResourceEnum, TokenizedCard } from 'app/backend';

type BindEffect = SelectEffect |
    CallEffect;

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
}
