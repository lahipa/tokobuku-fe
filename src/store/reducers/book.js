import * as actionTypes from "../actions/books/actionTypes";

const initialState = {
  books: [],
  book: {},
};

const books = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_BOOK:
      return {
        ...state,
        books: action.payload,
      };
    case actionTypes.GET_BOOK_BY_ID:
      return {
        ...state,
        book: action.payload,
      };
    case actionTypes.UPDATE_BOOK:
      return {
        ...state,
      };
    case actionTypes.DELETE_BOOK:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default books;
