import { Direction, DocumentsBindingFailed, GoToFormInfo, SetViewInfoProcess, TypeKeys } from 'app/actions';
import { call, CallEffect, ForkEffect, put, PutEffect, select, SelectEffect, takeLatest } from 'redux-saga/effects';
import { ResultFormInfo, State } from 'app/state';
import { saveInsurance } from './save-insurance-number';
import { savePassport } from './save-passport';
import { bind } from './bind-documents';

type FinishEffect = PutEffect<GoToFormInfo | SetViewInfoProcess>;

type BindEffect = CallEffect |
    SelectEffect |
    PutEffect<DocumentsBindingFailed>;

function* start(): Iterable<BindEffect | FinishEffect> {
    try {
        yield put({
            type: TypeKeys.SET_VIEW_INFO_PROCESS,
            payload: true
        } as SetViewInfoProcess);
        const { form } = yield select((s: State) => ({
            form: s.form
        }));
        if (form.insuranceForm) {
            yield call(saveInsurance);
        }
        if (form.passportForm) {
            yield call(savePassport);
        }
        yield call(bind);
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
            type: TypeKeys.DOCUMENTS_BINDING_FAILED,
            payload: e
        } as DocumentsBindingFailed);
    }
}

export function* watchStartIdentityChallenge(): Iterator<ForkEffect> {
    yield takeLatest(TypeKeys.DOCUMENTS_BINDING_REQUESTED, start);
}
