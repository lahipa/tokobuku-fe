import * as actionTypes from "../actions/cart/actionTypes";

const initialState = {
  carts: [],
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_LIST_CART:
      return {
        ...state,
        carts: action.payload,
      };
    case actionTypes.UPDATE_CART_LIST:
      return {
        ...state,
      };
    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
      };
    case actionTypes.ADD_TO_CART:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default cart;
