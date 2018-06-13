import { AbstractAction, TypeKeys } from 'app/actions';
import { ModalState } from 'app/state';

export interface InitializeModalCompleted extends AbstractAction<ModalState> {
    type: TypeKeys.INITIALIZE_MODAL_COMPLETED;
    payload: ModalState;
}
