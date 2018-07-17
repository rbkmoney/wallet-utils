import { call, CallEffect, ForkEffect, put, PutEffect, select, SelectEffect, takeLatest } from 'redux-saga/effects';
import {
    DocumentsBindingCompleted,
    DocumentsBindingFailed,
    DocumentsBindingRequested,
    GoToFormInfo,
    SetViewInfoProcess,
    TypeKeys
} from 'app/actions';
import { State } from 'app/state';
import { saveInsurance } from './save-insurance-number';
import { savePassport } from './save-passport';
import { bind } from './bind-documents';
import { pollIdentityChallengeEvents } from '../poll-events';
import { provideFromIdentityChallengeEvent } from '../provide-modal';

type FinishEffect = PutEffect<GoToFormInfo | SetViewInfoProcess>;

type BindEffect = CallEffect |
    SelectEffect |
    PutEffect<DocumentsBindingFailed | DocumentsBindingCompleted>;

function* start(action: DocumentsBindingRequested): Iterable<BindEffect | FinishEffect> {
    try {
        yield put({
            type: TypeKeys.SET_VIEW_INFO_PROCESS,
            payload: true
        } as SetViewInfoProcess);
        const { wapiEndpoint, accessToken, identityID } = yield select((s: State) => ({
            wapiEndpoint: s.config.appConfig.wapiEndpoint,
            accessToken: s.config.initConfig.token,
            identityID: s.model.identity.id
        }));
        const { insuranceFormValues, passportFormValues } = action.payload;
        const tokenizedInsurance = yield call(saveInsurance, insuranceFormValues, wapiEndpoint, accessToken);
        const tokenizedPassport = yield call(savePassport, passportFormValues, wapiEndpoint, accessToken);
        const identityChallenge = yield call(bind, [tokenizedInsurance, tokenizedPassport], wapiEndpoint, accessToken, identityID);
        const event = yield call(pollIdentityChallengeEvents, wapiEndpoint, accessToken, identityID, identityChallenge.id);
        yield call(provideFromIdentityChallengeEvent, event);
        yield put({
            type: TypeKeys.DOCUMENTS_BINDING_COMPLETED
        } as DocumentsBindingCompleted);
    } catch (e) {
        yield put({
            type: TypeKeys.DOCUMENTS_BINDING_FAILED,
            payload: e
        } as DocumentsBindingFailed);
    }
}

export function* watchStartIdentityChallenge(): Iterator<ForkEffect> {
    yield takeLatest(TypeKeys.DOCUMENTS_BINDING_REQUESTED, start);
}
