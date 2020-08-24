import * as actionsTypes from "../actions/categories/actionTypes";

const initialState = {
  categories: [],
  category: {},
};

const categories = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.GET_LIST_KATEGORI:
      return {
        ...state,
        categories: action.payload,
      };
    case actionsTypes.UPDATE_KATEGORI:
      return {
        ...state,
      };
    case actionsTypes.DELETE_KATEGORI:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default categories;
