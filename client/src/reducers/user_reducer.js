import { LOGIN_USER, REGISTER_USER, AUTH_USER } from 'actions/types';
import { LOGOUT_USER } from '../actions/types';

const nameInitialState = {};

export default function(state = nameInitialState, action) {
  switch (action.type) {
    case REGISTER_USER:
      return { ...state, ...action.payload };
    case LOGIN_USER:
      return { ...state, ...action.payload };
    case AUTH_USER:
      return { ...state, ...action.payload };
    case LOGOUT_USER:
      return {};
    default:
      return state;
  }
}
