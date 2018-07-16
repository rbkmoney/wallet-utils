import { FormInfo, ModalForms } from 'app/state';

export const toInitialModal = (formInfo: FormInfo[]): ModalForms => new ModalForms(formInfo, true);
