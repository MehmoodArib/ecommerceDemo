import {
  SAMPLE,
  ADD_ITEM_TO_CART,
  REMOVE_ITEM,
  DECREMENT_QUANTITY,
  EMPTY_CART
} from "./constants";

export const addToCart = (product) => async (dispatch) => {
  dispatch({
    type: ADD_ITEM_TO_CART,
    payload: product,
  });
};

export const removeFromCart = (product) => async (dispatch) => {
  dispatch({
    type: REMOVE_ITEM,
    payload: product,
  });
};

export const decrementQuantity = (product) => async (dispatch) => {
  dispatch({
    type: DECREMENT_QUANTITY,
    payload: product,
  });
};

export const incrementQuantity = (product) => async (dispatch) => {
  dispatch({
    type: SAMPLE,
    payload: product,
  });
};

export const emptyCart = (product) => async (dispatch) => {
  dispatch({
    type: EMPTY_CART,
    payload: [],
  });
};
