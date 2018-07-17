import { call, CallEffect, put, PutEffect, race, RaceEffect, select, SelectEffect } from 'redux-saga/effects';
import last from 'lodash-es/last';
import uniqWith from 'lodash-es/uniqWith';
import { delay } from 'redux-saga';
import { State } from 'app/state';
import { EventPolled, TypeKeys } from 'app/actions';
import { getIdentityEventsByID, Event, IdentityChallengeStatus } from 'app/backend';

const isStop = (event: Event): boolean => {
    if (!event || !event.changes) {
        return false;
    }
    const change = last(event.changes);
    if (!change) {
        return false;
    }
    switch (change.status) {
        case IdentityChallengeStatus.Cancelled:
        case IdentityChallengeStatus.Completed:
        case IdentityChallengeStatus.Failed:
            return true;
        default:
            return false;
    }
};

interface PollResult {
    events: Event[];
    last: Event;
}

function* getLastEventID(): Iterator<SelectEffect | number> {
    return yield select((s: State) => {
        const events = s.model.identityChallengeEvents;
        return events && events.length > 0 ? last(events).eventID : 0;
    });
}

function* poll(endpoint: string, token: string, identityID: string, challengeID: string): Iterator<CallEffect | PollResult> {
    let lastEventID = yield call(getLastEventID);
    let events: Event[] = [];
    let lastEvent = null;
    while (!isStop(lastEvent)) {
        yield call(delay, 1000);
        const chunk = yield call(getIdentityEventsByID, endpoint, token, identityID, challengeID, 5);
        events = events.concat(chunk);
        lastEvent = last(events);
        lastEventID = lastEvent ? lastEvent.eventID : lastEventID;
    }
    return {
        events: uniqWith(events, (f, s) => f.eventID === s.eventID),
        last: lastEvent
    };
}

function* pollWithDelay(endpoint: string, token: string, identityID: string, challengeID: string): Iterator<RaceEffect | PollResult> {
    const [result, timeout] = yield race<any>([
        call(poll, endpoint, token, identityID, challengeID),
        call(delay, 60000)
    ]);
    if (timeout) {
        throw { code: 'error.events.timeout' };
    }
    return result;
}

type Effects = CallEffect | PutEffect<EventPolled> | Event;

export function* pollIdentityChallengeEvents(endpoint: string, token: string, identityID: string, challengeID: string): Iterator<Effects> {
    const result = yield call(pollWithDelay, endpoint, token, identityID, challengeID);
    yield put({
        type: TypeKeys.EVENTS_POLLED,
        payload: result.events
    } as EventPolled);
    return result.last;
}
