import axios from 'utils/axios';

import { USER_SERVER } from 'utils/misc';

import { LOGIN_USER } from './types';

export async function loginUser(dataToSubmit) {
  const { data: payload } = await axios
    .post(`${USER_SERVER}/login`, dataToSubmit)
    .catch(({ response: { data } }) => ({ data }));
  return {
    type: LOGIN_USER,
    payload
  };
}
