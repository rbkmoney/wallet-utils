import { AbstractAction, TypeKeys } from 'app/actions';

export interface SetViewInfoHeight extends AbstractAction<number> {
    type: TypeKeys.SET_VIEW_INFO_HEIGHT;
    payload: number;
}

export const setViewInfoHeight = (height: number): SetViewInfoHeight => ({
    type: TypeKeys.SET_VIEW_INFO_HEIGHT,
    payload: height
});
