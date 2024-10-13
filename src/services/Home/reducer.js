// redux/reducers/productReducer.js
import {
  FETCH_PRODUCTS_REQUEST,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_FAILURE,
} from './constants';
import sampleTags from '../../SampleTags.json';

const initialState = {
  loading: false,
  allItems: [],
  allTags: sampleTags,
  error: '',
};

/**
 * ProductReducer
 *
 * Handles actions related to product fetching.
 *
 * @param {Object} state - Current state.
 * @param {Object} action - Dispatched action.
 * @returns {Object} - New state.
 */
const HomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        allItems: action.payload,
        error: '',
      };
    case FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        allItems: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default HomeReducer;
