import { Rate } from "antd";
import React from "react";
import productListReducer from "../ducks/productList";

export default function Rating({
  rating,
  num,
  disabled,
}: {
  rating: number;
  num: number;
  disabled: boolean;
}) {
  return (
    <div>
      <Rate disabled={disabled} defaultValue={rating} allowHalf />
      {rating ? (
        <p>
          {rating} of 5 based on {num} reviews
        </p>
      ) : (
        <p>No reviews</p>
      )}
    </div>
  );
}
