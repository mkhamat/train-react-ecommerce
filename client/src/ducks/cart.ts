import { CartItem, CartPayload } from "../types";

const CART_ADD_PRODUCT = "CART_ADD_PRODUCT";
const CART_REMOVE_PRODUCT = "CART_REMOVE_PRODUCT";

export function addProductToCart({ product, qty }: CartPayload) {
  return async (dispatch: ({}: CartItem) => void) => {
    dispatch({
      type: CART_ADD_PRODUCT,
      payload: {
        product,
        qty,
      },
    });
  };
}

export function removeProductFromCart(id: string) {
  return async (dispatch: any) => {
    dispatch({
      type: CART_REMOVE_PRODUCT,
      payload: id,
    });
  };
}

export default function cartReducer(state = { cart: [] }, action: any) {
  switch (action.type) {
    case CART_ADD_PRODUCT:
      let exists = state.cart.find((x: CartPayload) => {
        return x.product._id === action.payload?.product._id;
      });
      if (exists) {
        return {
          ...state,
          cart: state.cart.map((x: CartPayload) => {
            return x.product._id === action.payload.product._id
              ? action.payload
              : x;
          }),
        };
      } else {
        return { ...state, cart: [...state.cart, action.payload] };
      }
    case CART_REMOVE_PRODUCT:
      return {
        ...state,
        cart: state.cart.filter(
          (x: CartPayload) => x.product._id !== action.payload
        ),
      };
    default:
      return state;
  }
}
