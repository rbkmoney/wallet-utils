import { TypeKeys, ResultAction } from '../actions';
import { ResultState } from 'app/state';

type ResultReducerAction = ResultAction;

export function resultReducer(s: ResultState = null, action: ResultReducerAction): ResultState {
    switch (action.type) {
        case TypeKeys.SET_RESULT: {
            return action.payload;
        }
    }
    return s;
}
