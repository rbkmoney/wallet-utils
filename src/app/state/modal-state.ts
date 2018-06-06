import { Named } from './modal';

export enum ModalName {
    modalForms = 'modalForms'
}

export abstract class ModalState implements Named {
    name: ModalName | string;
    active: boolean;
}
