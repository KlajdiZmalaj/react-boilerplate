import { takeLatest, all } from 'redux-saga/effects';
import * as AuthGenerators from './AuthSagas';

// getAnalysedTicket

export default function* rootSaga() {
  yield all([
    // AUTH
    ...[takeLatest('GET_LOGIN', AuthGenerators.getLogin)],
  ]);
}
