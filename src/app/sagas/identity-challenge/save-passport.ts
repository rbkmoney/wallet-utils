import { GoToFormInfo, PassportSavingCompleted, PassportSavingFailed, SetViewInfoProcess, TypeKeys } from 'app/actions';
import { call, CallEffect, put, PutEffect, select, SelectEffect } from 'redux-saga/effects';
import { State } from 'app/state';
import { DocumentTypeEnum, saveDocument } from 'app/backend';

type SavePutEffect = PassportSavingCompleted | PassportSavingFailed | GoToFormInfo | SetViewInfoProcess;

type SaveEffect = SelectEffect |
    CallEffect |
    PutEffect<SavePutEffect>;

const transformPassportValues = (values: any) => {
    const result: any = {};
    for (const key in values) {
        if (values.hasOwnProperty(key)) {
            if (key === 'number') {
                result.series = values[key].slice(0, 4);
                result.number = values[key].slice(4, 10);
            } else {
                result[key] = values[key];
            }
        }
    }
    return result;
};

export function* savePassport(): Iterator<SaveEffect> {
    try {
        const { config, values } = yield select((s: State) => ({
            config: s.config,
            values: s.form.passportForm.values
        }));
        const type = DocumentTypeEnum.RUSDomesticPassportData;
        const savedDocument = yield call(saveDocument, config.appConfig.wapiEndpoint, config.initConfig.token, {
            ...transformPassportValues(values),
            type
        });
        yield put({
            type: TypeKeys.PASSPORT_SAVING_COMPLETED,
            payload: savedDocument
        } as PassportSavingCompleted);
    } catch (e) {
        yield put({
            type: TypeKeys.PASSPORT_SAVING_FAILED,
            payload: e
        } as PassportSavingFailed);
    }
}
