// redux/actions/productActions.js
import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
} from './constants';
import productsData from '../../SampleProduct.json';
/**
 * Action creator for initiating the fetch products request.
 *
 * @returns {Object} - Action object with type FETCH_PRODUCTS_REQUEST.
 */
export const fetchProductsRequest = () => ({
  type: FETCH_PRODUCTS_REQUEST,
});

/**
 * Action creator for successfully fetched products.
 *
 * @param {Array} products - Array of product objects.
 * @returns {Object} - Action object with type FETCH_PRODUCTS_SUCCESS and payload.
 */
export const fetchProductsSuccess = products => ({
  type: FETCH_PRODUCTS_SUCCESS,
  payload: products,
});

/**
 * Action creator for failed product fetch.
 *
 * @param {String} error - Error message.
 * @returns {Object} - Action object with type FETCH_PRODUCTS_FAILURE and payload.
 */
export const fetchProductsFailure = error => ({
  type: FETCH_PRODUCTS_FAILURE,
  payload: error,
});

/**
 * Thunk action creator to mimic fetching products from a JSON source.
 *
 * @returns {Function} - Thunk function that dispatches actions based on fetch status.
 */
export const fetchProducts = () => {
  return async dispatch => {
    dispatch(fetchProductsRequest());
    try {
      // Mimic a network request delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // In a real-world scenario, you'd fetch data from an API:
      // const response = await fetch('https://api.example.com/products');
      // const data = await response.json();

      // Since we're mimicking, use the imported sample data
      const data = productsData.products;

      dispatch(fetchProductsSuccess(data));
    } catch (error) {
      dispatch(fetchProductsFailure('Failed to fetch products.'));
    }
  };
};
