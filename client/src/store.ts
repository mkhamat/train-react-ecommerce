import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import productListReducer from "./ducks/productList";
import productReducer from "./ducks/product";
import cartReducer from "./ducks/cart";
import userReducer from "./ducks/user";

const rootReducer = combineReducers({
  productList: productListReducer,
  product: productReducer,
  cart: cartReducer,
  users: userReducer,
});

let userInfoFromLS = localStorage.getItem("userInfo");
if (userInfoFromLS) {
  userInfoFromLS = JSON.parse(userInfoFromLS);
} else {
  userInfoFromLS = null;
}

const initialState: any = {
  users: { user: userInfoFromLS },
};

export default createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);

export type RootState = ReturnType<typeof rootReducer>;
