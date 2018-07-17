import { ModalState, ResultFormInfo } from 'app/state';
import { toInitialModal } from './to-initial-modal';

export const toModalResult = (): ModalState => toInitialModal([new ResultFormInfo()]);
