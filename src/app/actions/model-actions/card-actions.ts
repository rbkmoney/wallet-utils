import { AbstractAction, TypeKeys } from 'app/actions';
import { CardFormValues } from 'app/state';
import { TokenizedCard, LogicError } from 'app/backend';

export interface CardSavingRequestedPayload {
    values: CardFormValues;
}

type CardSavingCompletedPayload = TokenizedCard;

export interface CardSavingRequested extends AbstractAction<CardSavingRequestedPayload> {
    type: TypeKeys.CARD_SAVING_REQUESTED;
    payload: CardSavingRequestedPayload;
}

export interface CardSavingCompleted extends AbstractAction<CardSavingCompletedPayload> {
    type: TypeKeys.CARD_SAVING_COMPLETED;
    payload: CardSavingCompletedPayload;
}

export interface CardSavingFailed extends AbstractAction<LogicError> {
    type: TypeKeys.CARD_SAVING_FAILED;
    payload: LogicError;
}

export interface CardBindingRequested extends AbstractAction {
    type: TypeKeys.CARD_BINDING_REQUESTED;
}

export interface CardBindingCompleted extends AbstractAction {
    type: TypeKeys.CARD_BINDING_COMPLETED;
}

export interface CardBindingFailed extends AbstractAction<LogicError> {
    type: TypeKeys.CARD_BINDING_FAILED;
    payload: LogicError;
}

export const bindCard = (): CardBindingRequested => ({
    type: TypeKeys.CARD_BINDING_REQUESTED
});
