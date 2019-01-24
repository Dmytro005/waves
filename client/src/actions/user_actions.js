import axios from 'utils/axios';

import { USER_SERVER, PRODUCT_SERVER } from 'utils/misc';
import { deleteCookie } from 'utils/cookies';

import * as actions from 'actions/types';

export async function loginUser(dataToSubmit) {
  const { data: payload } = await axios
    .post(`${USER_SERVER}/login`, dataToSubmit)
    .catch(({ response: { data } }) => ({ data }));
  return {
    type: actions.LOGIN_USER,
    payload
  };
}

export async function registerUser(dataToSubmit) {
  const { data: payload } = await axios
    .post(`${USER_SERVER}/register`, dataToSubmit)
    .catch(({ response: { data } }) => ({ data }));
  return {
    type: actions.REGISTER_USER,
    payload
  };
}

export async function authUser(dataToSubmit) {
  const { data: payload } = await axios
    .get(`${USER_SERVER}/auth`)
    .catch(({ response: { data } }) => ({ data }));
  return {
    type: actions.AUTH_USER,
    payload
  };
}

export async function logoutUser(dataToSubmit) {
  const { data: payload } = await axios
    .get(`${USER_SERVER}/logout`)
    .catch(({ response: { data } }) => ({ data }));

  deleteCookie('w_auth');

  return {
    type: actions.LOGOUT_USER,
    payload
  };
}

export async function addToCart(_id) {
  const { data: payload } = await axios
    .post(`${USER_SERVER}/addToCart?productId=${_id}`)
    .catch(({ response: { data } }) => ({ data }));

  return {
    type: actions.ADD_TO_CART_USER,
    payload
  };
}

export async function getCartItems(cartItems, userCart) {

  const { data: payload } = await axios
    .get(`${PRODUCT_SERVER}/article_by_id?id=${cartItems}&type=array`)
    .catch(({ response: { data } }) => ({ data }));

  let cartDetails = payload.articles.map(article => {
    let { quantity } = userCart.find(({ id }) => id === article._id);
    return { ...article, quantity };
  });

  return {
    type: actions.GET_CART_ITEMS,
    payload: cartDetails
  };
}
