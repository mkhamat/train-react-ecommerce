import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Rating from "./Rating";
import { Link } from "react-router-dom";
import { fetchProducts } from "../ducks/productList";
import { RootState } from "../store";
import { Card } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Meta from "antd/lib/card/Meta";
import { Product } from "../types";

export default function ProductList() {
  const dispatch = useDispatch();
  const {
    loading,
    products,
  }: { loading: boolean; products: Product[] } = useSelector(
    (state: RootState) => state.productList
  );
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "auto",
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      {loading ? (
        <LoadingOutlined
          style={{
            fontSize: "5rem",
            position: "absolute",
            top: "50%",
            left: "50%",
          }}
        />
      ) : (
        products &&
        products.map((product: Product) => {
          return <ProductCard {...product} key={product._id} />;
        })
      )}
    </div>
  );
}

function ProductCard(props: Product) {
  return (
    <Link to={`/products/${props._id}`}>
      <Card
        style={{ width: 300, margin: "1rem" }}
        cover={<img src={props.image} />}
        hoverable
      >
        <Meta title={props.name} description={props.description} />
        <Rating
          rating={props.rating}
          num={props.numberOfReviews}
          disabled={true}
        />
        <div>${props.price}</div>
      </Card>
    </Link>
  );
}
