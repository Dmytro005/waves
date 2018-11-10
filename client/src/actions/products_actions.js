import axios from 'utils/axios';
import { GET_PRODUCTS_BY_SELL, GET_PRODUCTS_BY_ARRIVAL } from './types';

import { PRODUCT_SERVER } from 'utils/misc';

export async function getProductsBySell() {
  //?sortBy=sold&order=desc&limit=100
  const { data: payload } = await axios
    .get(`${PRODUCT_SERVER}/articles?sortBy=sold&order=desc&limit=4`)
    .catch(({ response: { data } }) => ({ data }));

  return {
    type: GET_PRODUCTS_BY_SELL,
    payload
  };
}

export function getProductsByArrival() {
  const request = axios
    .get(`${PRODUCT_SERVER}/articles?sortBy=createdAt&order=desc&limit=4`)
    .then(response => response.data);

  return {
    type: GET_PRODUCTS_BY_ARRIVAL,
    payload: request
  };
}
