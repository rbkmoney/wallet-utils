import { ActionType } from 'app/config';

export const getFormHeight = (type: ActionType): number => {
    switch (type) {
        case ActionType.userIdentity:
            return 629;
        case ActionType.createOutput:
            return 219;
    }
};
