import { AbstractAction, TypeKeys } from 'app/actions';
import { CardFormValues } from 'app/state';
import { LogicError, Output, TokenizedCard } from 'app/backend';

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

export interface CardBindingRequested extends AbstractAction<CardFormValues> {
    type: TypeKeys.CARD_BINDING_REQUESTED;
    payload: CardFormValues;
}

export interface CardBindingCompleted extends AbstractAction<Output> {
    type: TypeKeys.CARD_BINDING_COMPLETED;
    payload: Output;
}

export interface CardBindingFailed extends AbstractAction<LogicError> {
    type: TypeKeys.CARD_BINDING_FAILED;
    payload: LogicError;
}

export const bindCard = (payload: CardFormValues): CardBindingRequested => ({
    type: TypeKeys.CARD_BINDING_REQUESTED,
    payload
});
