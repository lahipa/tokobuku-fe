import * as actionsTypes from "../actions/orders/actionTypes";

const initialState = {
  orders: [],
  order: {},
  notif: 0,
};

const orders = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.GET_LIST_ORDER:
      return {
        ...state,
        orders: action.payload,
      };
    case actionsTypes.GET_ORDER_BY_ID:
      return {
        ...state,
        order: action.payload,
      };
    case actionsTypes.GET_NOTIF:
      let sum = action.payload.length;
      return {
        ...state,
        notif: sum,
      };
    case actionsTypes.UPDATE_ORDER:
      return {
        ...state,
      };
    case actionsTypes.CREATE_ORDER:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default orders;
