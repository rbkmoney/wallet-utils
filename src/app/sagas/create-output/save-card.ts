import { CardSavingCompleted, CardSavingFailed, TypeKeys } from 'app/actions';
import { call, CallEffect, put, PutEffect, SelectEffect } from 'redux-saga/effects';
import { CardFormValues } from 'app/state';
import { saveCard } from 'app/backend';
import { replaceSpaces } from './replace-spaces';

const formatCardData = (values: any): CardFormValues => {
    const result: any = {};
    for (const key in values) {
        if (values.hasOwnProperty(key)) {
            result[key] = replaceSpaces(values[key].trim());
        }
    }
    return result;
};

type SavePutEffect = CardSavingCompleted | CardSavingFailed;

type SaveEffect = SelectEffect |
    CallEffect |
    PutEffect<SavePutEffect>;

export function* tokenizeCard(values: CardFormValues, wapiEndpoint: string, accessToken: string): Iterable<SaveEffect> {
    try {
        const tokenizedCard = yield call(saveCard, wapiEndpoint, accessToken, formatCardData(values));
        yield put({
            type: TypeKeys.CARD_SAVING_COMPLETED,
            payload: tokenizedCard
        } as CardSavingCompleted);
        return tokenizedCard;
    } catch (e) {
        yield put({
            type: TypeKeys.CARD_SAVING_FAILED,
            payload: e
        } as CardSavingFailed);
    }
}
