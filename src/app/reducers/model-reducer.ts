import { ModelState, ModelStatus } from 'app/state';
import { TypeKeys } from 'app/actions';
import { InitializeModelCompleted } from 'app/actions/model-actions/initialize-action';

type ModelReducerAction =
    InitializeModelCompleted;

const initialState = {
    status: ModelStatus.none
};

export function modelReducer(s: ModelState = initialState, action: ModelReducerAction): ModelState {
    switch (action.type) {
        case TypeKeys.INITIALIZE_MODEL_COMPLETED:
            return {
                ...s,
                ...action.payload,
                status: ModelStatus.initialized
            };
    }
    return s;
}
