import { combineReducers } from "redux";

import categoryReducer from "./category";
import bookReducer from "./book";
import userReducer from "./user";
import cartReducer from "./cart";
import orderReducer from "./orders";

const rootReducer = combineReducers({
  categoryReducer,
  bookReducer,
  userReducer,
  cartReducer,
  orderReducer,
});

export default rootReducer;
