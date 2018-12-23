import {
  GET_PRODUCTS_BY_SELL,
  GET_PRODUCTS_BY_ARRIVAL,
  GET_BRANDS,
  ADD_BRAND,
  GET_WOODS,
  ADD_WOOD,
  GET_PRODUCTS_TO_SHOP,
  GET_PRODUCT_DETAILS,
  CLEAR_PRODUCT_DETAILS
} from 'actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case GET_PRODUCTS_BY_SELL:
      return { ...state, bySell: action.payload };

    case GET_PRODUCTS_BY_ARRIVAL:
      return { ...state, byArrival: action.payload };

    case GET_BRANDS:
      return { ...state, brands: action.payload.brands };

    case ADD_BRAND:
      return {
        ...state,
        addBrand: action.payload.success,
        brands: action.payload.brands
      };

    case GET_WOODS:
      return { ...state, woods: action.payload.woods };

    case ADD_WOOD:
      return {
        ...state,
        addWood: action.payload.success,
        woods: action.payload.woods
      };

    case GET_PRODUCTS_TO_SHOP:
      const { size, articles } = action.payload;
      return { ...state, toShop: articles, toShopSize: size };

    case GET_PRODUCT_DETAILS:
      return { ...state, prodDetails: action.payload };

    case CLEAR_PRODUCT_DETAILS:
      return { ...state, prodDetails: action.payload };

    default:
      return state;
  }
}
