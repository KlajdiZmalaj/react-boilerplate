import { createActions, createReducer } from 'reduxsauce';

const { Types, Creators } = createActions({
  getLogin: ['username', 'password'],
  setUserData: ['user'],
});

export const AuthTypes = Types;
export default Creators;

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem('user') || '{}'),
};
export const reducer = createReducer(INITIAL_STATE, {
  RESET_AUTH: (state, action) => ({
    ...INITIAL_STATE,
    user: null,
  }),
  SET_USER_DATA: (state, { user }) => ({
    ...state,
    user,
  }),
});
