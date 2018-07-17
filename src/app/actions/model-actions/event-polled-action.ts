import { AbstractAction, TypeKeys } from 'app/actions';
import { Event } from 'app/backend';

export interface EventPolled extends AbstractAction<Event[]> {
    type: TypeKeys.EVENTS_POLLED;
    payload: Event[];
}
