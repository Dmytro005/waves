import axios from 'utils/axios';

import { USER_SERVER } from 'utils/misc';

import { LOGIN_USER, REGISTER_USER } from './types';

export async function loginUser(dataToSubmit) {
  const { data: payload } = await axios
    .post(`${USER_SERVER}/login`, dataToSubmit)
    .catch(({ response: { data } }) => ({ data }));
  return {
    type: LOGIN_USER,
    payload
  };
}

export async function registerUser(dataToSubmit) {
  const { data: payload } = await axios
    .post(`${USER_SERVER}/register`, dataToSubmit)
    .catch(({ response: { data } }) => ({ data }));
  return {
    type: REGISTER_USER,
    payload
  };
}
