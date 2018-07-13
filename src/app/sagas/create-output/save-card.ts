import { CardSavingCompleted, CardSavingFailed, TypeKeys } from 'app/actions';
import { call, CallEffect, put, PutEffect, select, SelectEffect } from 'redux-saga/effects';
import { CardFormValues, State } from 'app/state';
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

export function* tokenizeCard(): Iterable<SaveEffect> {
    try {
        const { config, values } = yield select((s: State) => ({
            config: s.config,
            identityID: s.config.initConfig.params.identityID,
            values: s.form.cardForm.values
        }));
        const tokenizedCard = yield call(saveCard, config.appConfig.wapiEndpoint, config.initConfig.token, formatCardData(values));
        yield put({
            type: TypeKeys.CARD_SAVING_COMPLETED,
            payload: tokenizedCard
        } as CardSavingCompleted);
    } catch (e) {
        yield put({
            type: TypeKeys.CARD_SAVING_FAILED,
            payload: e
        } as CardSavingFailed);
    }
}
