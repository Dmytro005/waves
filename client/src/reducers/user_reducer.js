import * as actions from 'actions/types';

const nameInitialState = {};

export default function(state = nameInitialState, action) {
  switch (action.type) {
    case actions.REGISTER_USER:
      return { ...state, ...action.payload };
    case actions.LOGIN_USER:
      return { ...state, ...action.payload };
    case actions.AUTH_USER:
      return { ...state, ...action.payload };
    case actions.ADD_TO_CART_USER:
      return { ...state, cart: action.payload };
    case actions.GET_CART_ITEMS:
      return { ...state, cartDetail: action.payload };
    case actions.REMOVE_CART_ITEM:
      return {
        ...state,
        cartDetail: action.payload.cartDetail,
        cart: action.payload.cart
      };
    case actions.ON_SUCCESS_BUY_USER:
      return {
        ...state,
        successBuy: action.payload.success,
        cart: action.payload.cart,
        cartDetail: action.payload.cartDetail
      };
    case actions.LOGOUT_USER:
      return {};
    default:
      return state;
  }
}
