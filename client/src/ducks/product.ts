import axios from "axios";
import { ProductList, Product } from "../types";
const PRODUCT_PAGE_REQUEST = "PRODUCT_PAGE_REQUEST";
const PRODUCT_PAGE_SUCCESS = "PRODUCT_PAGE_SUCCESS";
const PRODUCT_PAGE_FAIL = "PRODUCT_PAGE_FAIL";

export function fetchProduct(id: string) {
  return async (dispatch: ({}: ProductList) => void) => {
    try {
      dispatch({ type: PRODUCT_PAGE_REQUEST });
      let { data } = await axios.get(`/products/${id}`);
      dispatch({ type: PRODUCT_PAGE_SUCCESS, payload: data });
    } catch (err) {
      dispatch({ type: PRODUCT_PAGE_FAIL, payload: err });
    }
  };
}

export default function productReducer(
  state: { product: Product | null } = {
    product: null,
  },
  action: ProductList
) {
  switch (action.type) {
    case PRODUCT_PAGE_REQUEST:
      return { loading: true, ...state };
    case PRODUCT_PAGE_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_PAGE_FAIL:
      return { loading: false, product: action.payload };
    default:
      return state;
  }
}
