import cloneDeep from 'lodash-es/cloneDeep';
import { FormInfo, ModalForms, ModalName, ModalState, SlideDirection } from 'app/state';
import {
    Direction,
    GoToFormInfo,
    InitializeModalCompleted,
    SetViewInfoProcess,
    SetModalState,
    SetViewInfoHeight,
    TypeKeys
} from 'app/actions';
import { Named } from 'app/state/modal';
import { findNamed } from 'app/utils/find-named';

const updateViewInfo = (s: ModalState[], field: string, value: any): ModalState[] => {
    const modal = findNamed(s, ModalName.modalForms) as ModalForms;
    return addOrUpdate(s, {
        ...modal,
        viewInfo: {
            ...modal.viewInfo,
            [field]: value
        }
    } as ModalForms);
};

const toSlideDirection = (direction: Direction): SlideDirection => {
    switch (direction) {
        case Direction.forward:
            return SlideDirection.right;
        case Direction.back:
            return SlideDirection.left;
    }
};

const updateFound = (s: ModalState[], found: ModalForms, formInfo: FormInfo, direction: Direction): ModalState[] => {
    return addOrUpdate(s, {
        ...found,
        active: true,
        viewInfo: {
            ...found.viewInfo,
            inProcess: false,
            slideDirection: toSlideDirection(direction)
        },
        formsInfo: addOrUpdate(found.formsInfo, {
            ...formInfo,
            active: true
        } as FormInfo)
    } as ModalForms);
};

const goToFormInfo = (s: ModalState[], formInfo: FormInfo, direction: Direction): ModalState[] => {
    const modalForms = findNamed(s, ModalName.modalForms) as ModalForms;
    const initial = [new ModalForms([formInfo], true)];
    return modalForms ? updateFound(s, modalForms, formInfo, direction) : initial;
};

const deactivate = (items: Named[]): Named[] => items.map((item) => {
    item.active = false;
    return item;
});

const add = (items: Named[], item: Named): Named[] => {
    let result = items ? cloneDeep(items) : [];
    result = (result.length > 0 && item.active) ? deactivate(result) : result;
    result.push(item);
    return result;
};

const update = (items: Named[], item: Named, position: number): Named[] => {
    let result = cloneDeep(items);
    result = item.active ? deactivate(result) : result;
    result[position] = item;
    return result;
};

const addOrUpdate = (items: Named[], item: Named): Named[] => {
    const index = items ? items.findIndex((current) => current.name === item.name) : -1;
    return index === -1 ? add(items, item) : update(items, item, index);
};

const setInProgress = (s: ModalState[], isInProgress: boolean): ModalState[] => {
    const modal = findNamed(s, ModalName.modalForms) as ModalForms;
    return addOrUpdate(s, {
        ...modal,
        viewInfo: {
            ...modal.viewInfo,
            inProcess: isInProgress
        }
    } as ModalForms);
};

type ModalReducerAction =
    InitializeModalCompleted
    | SetModalState
    | GoToFormInfo
    | SetViewInfoHeight
    | SetViewInfoProcess;

export function modalReducer(s: ModalState[] = null, action: ModalReducerAction): ModalState[] {
    switch (action.type) {
        case TypeKeys.SET_MODAL_STATE:
        case TypeKeys.INITIALIZE_MODAL_COMPLETED:
            return addOrUpdate(s, action.payload);
        case TypeKeys.GO_TO_FORM_INFO:
            const { formInfo, direction } = action.payload;
            return goToFormInfo(s, formInfo, direction);
        case TypeKeys.SET_VIEW_INFO_HEIGHT:
            return updateViewInfo(s, 'height', action.payload);
        case TypeKeys.SET_VIEW_INFO_PROCESS:
            return setInProgress(s, action.payload);
    }
    return s;
}
