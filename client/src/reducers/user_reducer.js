import { LOGIN_USER } from 'actions/types';

const nameInitialState = {};

export default function(state = nameInitialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
