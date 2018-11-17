import axios from 'utils/axios';
import * as types from './types';

import { PRODUCT_SERVER } from 'utils/misc';

export async function getProductsBySell() {
  //?sortBy=sold&order=desc&limit=100
  const { data: payload } = await axios
    .get(`${PRODUCT_SERVER}/articles?sortBy=sold&order=desc&limit=4`)
    .catch(({ response: { data } }) => ({ data }));

  return {
    type: types.GET_PRODUCTS_BY_SELL,
    payload
  };
}

export function getProductsByArrival() {
  const request = axios
    .get(`${PRODUCT_SERVER}/articles?sortBy=createdAt&order=desc&limit=4`)
    .then(response => response.data);

  return {
    type: types.GET_PRODUCTS_BY_ARRIVAL,
    payload: request
  };
}

export function getBrands() {
  const request = axios
    .get(`${PRODUCT_SERVER}/brands`)
    .then(response => response.data);

  return {
    type: types.GET_BRANDS,
    payload: request
  };
}

export function getWoods() {
  const request = axios
    .get(`${PRODUCT_SERVER}/woods`)
    .then(response => response.data);

  return {
    type: types.GET_WOODS,
    payload: request
  };
}

export async function getProductsToShop(
  skip,
  limit,
  filters = [],
  previoState = []
) {
  const data = {
    skip,
    limit,
    filters
  };

  const { size, articles } = await axios
    .post(`${PRODUCT_SERVER}/shop`, data)
    .then(response => response.data);

  return {
    type: types.GET_PRODUCTS_TO_SHOP,
    payload: { size, articles }
  };
}
