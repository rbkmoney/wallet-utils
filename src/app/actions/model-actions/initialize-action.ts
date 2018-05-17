import { AbstractAction, TypeKeys } from 'app/actions';
import { ModelState } from 'app/state';

export interface InitializeModelCompleted extends AbstractAction<ModelState> {
    type: TypeKeys.INITIALIZE_MODEL_COMPLETED;
    payload: ModelState;
}
