import axios from "axios";
import { Action } from "./types";
const PRODUCT_LIST_REQUEST = "PRODUCT_LIST_REQUEST";
const PRODUCT_LIST_SUCCESS = "PRODUCT_LIST_SUCCESS";
const PRODUCT_LIST_FAIL = "PRODUCT_LIST_FAIL";

export function fetchProducts() {
  return async (dispatch: ({}: Action) => void) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST });
      let { data } = await axios.get("/products");
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (err) {
      dispatch({ type: PRODUCT_LIST_FAIL, payload: err });
    }
  };
}

export default function productListReducer(
  state = { products: [] },
  action: Action
) {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, product: action.payload };
    default:
      return state;
  }
}
