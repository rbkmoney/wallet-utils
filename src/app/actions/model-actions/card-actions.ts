import { AbstractAction, TypeKeys } from 'app/actions';
import { CardFormValues } from 'app/state/forms/card-form';
import { TokenizedCard, LogicError } from 'app/backend';

export interface SaveCardRequestedPayload {
    values: CardFormValues;
}

type SaveCardCompletedPayload = TokenizedCard;

export interface SaveCardRequested extends AbstractAction<SaveCardRequestedPayload> {
    type: TypeKeys.SAVE_CARD_REQUEST;
    payload: SaveCardRequestedPayload;
}

export interface SaveCardCompleted extends AbstractAction<SaveCardCompletedPayload> {
    type: TypeKeys.SAVE_CARD_COMPLETED;
    payload: SaveCardCompletedPayload;
}

export interface SaveCardFailed extends AbstractAction<LogicError> {
    type: TypeKeys.SAVE_CARD_FAILED;
    payload: LogicError;
}

export const saveCard = (payload: SaveCardRequestedPayload): SaveCardRequested => ({
    type: TypeKeys.SAVE_CARD_REQUEST,
    payload
});

export interface BindCardRequested extends AbstractAction {
    type: TypeKeys.CARD_BINDING_REQUEST;
}

export interface BindCardCompleted extends AbstractAction {
    type: TypeKeys.CARD_BINDING_COMPLETED;
}

export interface BindCardFailed extends AbstractAction<LogicError> {
    type: TypeKeys.CARD_BINDING_FAILED;
    payload: LogicError;
}
