import * as mongoose from "mongoose";
import { reviewSchema } from "./Review";

export const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  inStock: {
    type: Number,
    required: true,
    default: 0,
  },
  rating: {
    type: Number,
    required: true,
    default: 0,
  },
  reviews: [reviewSchema],
  numberOfReviews: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
