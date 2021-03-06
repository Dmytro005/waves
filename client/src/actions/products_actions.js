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
  previousState = []
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
    payload: { size, articles: [...previousState, ...articles] }
  };
}

export async function addProduct(data) {
  return await axios
    .post(`${PRODUCT_SERVER}/article`, data)
    .then(response => response.data)
    .catch(({ response: { data } }) => ({ data }));
}

export function addBrand(dataToSubmit, existingBrands) {
  const request = axios
    .post(`${PRODUCT_SERVER}/brand`, dataToSubmit)
    .then(response => {
      let brands = [...existingBrands, response.data.brand];
      return {
        success: response.data.success,
        brands
      };
    });
  return {
    type: types.ADD_BRAND,
    payload: request
  };
}

export function addWood(dataToSubmit, existingWoods) {
  const request = axios
    .post(`${PRODUCT_SERVER}/wood`, dataToSubmit)
    .then(response => {
      let woods = [...existingWoods, response.data.wood];
      return {
        success: response.data.success,
        woods
      };
    });
  return {
    type: types.ADD_WOOD,
    payload: request
  };
}

export async function getProductDetails(id) {
  const { data: payload } = await axios
    .get(`${PRODUCT_SERVER}/article_by_id?id=${id}&type=single`)
    .catch(({ response: { data } }) => ({ data }));

  return {
    type: types.GET_PRODUCT_DETAILS,
    payload: payload.articles[0]
  };
}

export async function clearProductDetails() {
  return {
    type: types.CLEAR_PRODUCT_DETAILS,
    payload: ''
  };
}
