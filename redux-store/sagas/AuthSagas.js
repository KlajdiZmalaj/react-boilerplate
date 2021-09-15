import { call, put, select } from 'redux-saga/effects';
import AuthActions from '../models/auth';
import { notifyError, notifySucces } from 'utils';
import * as AuthReq from 'services/auth';
import { t } from '@lingui/macro';

export function* getLogin({ username, password }) {
  // let response = yield call(AuthReq.getLogin, username, password);
  // const socket = yield select(state => state.socket.socketInstance);
  // if (response) {
  //   if (response.result) {
  //     response.wallet_balance = JSON.parse(response.wallet_balance);
  //     localStorage.setItem('user', JSON.stringify(response));
  //     yield put(AuthActions.setUserData(response));
  //     notifySucces(t`Successfully logged in!!`);
  //     let socketSubscribe = {
  //       action: 'subscribe',
  //       topic: `c_bal_${response.id}`,
  //     };
  //     socket?.emmit?.(JSON.stringify(socketSubscribe));
  //   } else {
  //     notifyError(loginErrorCodes[response.msg] || loginErrorCodes['default']);
  //   }
  // }
}
