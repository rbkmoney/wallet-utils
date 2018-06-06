import { AbstractAction, TypeKeys } from 'app/actions';
import { ModalState } from 'app/state';

export interface SetModalState extends AbstractAction<ModalState> {
    type: TypeKeys.SET_MODAL_STATE;
    payload: ModalState;
}
