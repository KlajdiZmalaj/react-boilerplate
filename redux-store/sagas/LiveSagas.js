import { put, call, select, delay } from 'redux-saga/effects';
import LiveActions from '../models/live';
import * as LiveReq from 'services/live';

//import { notifyError, notifySucces } from 'utils';

export function* getLiveData() {
  const isOverViewLoading = yield select(state => state.live.isOverViewLoading);
  const response = yield call(LiveReq.fetchLiveData);
  if (response) {
    yield put(LiveActions.setLiveData(response));
    // notifySucces('live Updated');
    if (isOverViewLoading) {
      //for content loader > api delay + 300ms extra time for visual (not to flick)
      yield put(LiveActions.setOverViewLoading(false));
    }
  }
}

export function* getEventView({ eventId }) {
  const isEventViewLoading = yield select(
    state => state.live.isEventViewLoading
  );
  const response = yield call(LiveReq.fetchEventView, eventId);
  if (response?.[eventId]?.idev) {
    yield put(LiveActions.setEventView(response));
    if (isEventViewLoading) {
      yield put(LiveActions.setEventViewLoading(false));
    }
  }
}

export function* getCalendarData() {
  const isCalendarLoading = yield select(state => state.live.isCalendarLoading);
  const response = yield call(LiveReq.fetchCalendarData);
  if (response) {
    yield put(LiveActions.setCalendarData(response));
    if (isCalendarLoading) {
      //for content loader > api delay + 300ms extra time for visual (not to flick)
      yield delay(300);
      yield put(LiveActions.setCalendarLoading(false));
    }
  }
}
