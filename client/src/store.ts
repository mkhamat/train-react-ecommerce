import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import productListReducer from "./ducks/productList";
import productReducer from "./ducks/product";
import cartReducer from "./ducks/cart";

const rootReducer = combineReducers({
  productList: productListReducer,
  product: productReducer,
  cart: cartReducer,
});
const initialState = {};

export default createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export type RootState = ReturnType<typeof rootReducer>;
