import { AbstractAction, TypeKeys } from 'app/actions';

export interface SetViewInfoHeight extends AbstractAction<number> {
    type: TypeKeys.SET_VIEW_INFO_HEIGHT;
    payload: number;
}

export const setViewInfoHeight = (height: number): SetViewInfoHeight => ({
    type: TypeKeys.SET_VIEW_INFO_HEIGHT,
    payload: height
});

export interface SetViewInfoError extends AbstractAction<boolean> {
    type: TypeKeys.SET_VIEW_INFO_ERROR;
    payload: boolean;
}

export const setViewInfoError = (hasError: boolean): SetViewInfoError => ({
    type: TypeKeys.SET_VIEW_INFO_ERROR,
    payload: hasError
});

export interface SetViewInfoProcess extends AbstractAction<boolean> {
    type: TypeKeys.SET_VIEW_INFO_PROCESS;
    payload: boolean;
}
