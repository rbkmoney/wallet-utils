import { ModelState } from 'app/state';
import { TypeKeys } from 'app/actions';
import { InitializeModelCompleted } from 'app/actions/model-actions/initialize-action';

type ModelReducerAction =
    InitializeModelCompleted;

export function modelReducer(s: ModelState = null, action: ModelReducerAction): ModelState {
    switch (action.type) {
        case TypeKeys.INITIALIZE_MODEL_COMPLETED:
            return {
                ...s,
                ...action.payload
            };
    }
    return s;
}
