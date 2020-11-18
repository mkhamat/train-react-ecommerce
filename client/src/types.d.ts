import { Action } from "redux";
import { Product } from "./components/ProductList";

export type Product = {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  inStock: number;
  rating: number;
  reviews: [];
  numberOfReviews: number;
};

export type CartPayload = {
  product: Product;
  qty: number;
};
export type CartItem = {
  type: string;
  payload?: CartPayload;
};

export type ProductList = {
  type: string;
  payload?: Product[];
};
