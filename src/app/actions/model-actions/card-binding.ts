import { AbstractAction, TypeKeys } from 'app/actions';
import { CardFormValues } from 'app/state/forms/card-form';
import { CardBinding, LogicError } from 'app/backend';

export interface BindingRequestedPayload {
    values: CardFormValues;
}

type BindingCompletedPayload = CardBinding;

export interface BindingRequested extends AbstractAction<BindingRequestedPayload> {
    type: TypeKeys.BINDING_REQUEST;
    payload: BindingRequestedPayload;
}

export interface BindingCompleted extends AbstractAction<BindingCompletedPayload> {
    type: TypeKeys.BINDING_COMPLETED;
    payload: BindingCompletedPayload;
}

export interface BindingFailed extends AbstractAction<LogicError> {
    type: TypeKeys.BINDING_FAILED;
    payload: LogicError;
}

export const bind = (payload: BindingRequestedPayload): BindingRequested => ({
    type: TypeKeys.BINDING_REQUEST,
    payload
});
