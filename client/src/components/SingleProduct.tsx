import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Rating from "./Rating";
import { Product } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { fetchProduct } from "../ducks/product";
import { LoadingOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Button, Col, Image, Input, InputNumber, message, Row } from "antd";
import { addProductToCart } from "../ducks/cart";

export default function SingleProduct() {
  const [qty, setQty] = useState(1);
  const { id }: { id: string } = useParams();
  const dispatch = useDispatch();
  const {
    loading,
    product,
  }: { loading: boolean; product: Product } = useSelector(
    (state: RootState) => state.product
  );
  const cartList: { cart: Product[] } = useSelector(
    (state: RootState) => state.cart
  );
  useEffect(() => {
    dispatch(fetchProduct(id));
  }, []);
  function handleAddToCart() {
    let exists = cartList.cart.find((x: any) => {
      return x.product._id === product._id;
    });
    if (exists) {
      message.warning(`${product.name} is already in your cart`);
    } else {
      dispatch(addProductToCart({ product: product, qty: qty }));
      message.success(`${product.name} is successefuly added to the cart`);
    }
  }
  return (
    <>
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
        product && (
          <Row justify="center" gutter={50}>
            <Col span={8}>
              <Image src={product.image} />
            </Col>
            <Col span={4}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <Rating
                rating={product.rating}
                num={product.numberOfReviews}
                disabled={false}
              />
            </Col>
            <Col span={4}>
              <div
                style={{
                  fontSize: "1rem",
                  fontWeight: "bold",
                  paddingBottom: "1rem",
                }}
              >
                ${product.price}
              </div>
              <div>
                {product.inStock
                  ? "In stock: " + product.inStock
                  : "Out of stock"}
              </div>
              Quantity
              <InputNumber
                value={qty}
                disabled={product.inStock ? false : true}
                onChange={(value: any) => setQty(value)}
                min={1}
                max={product.inStock}
                style={{ width: "40px", margin: "5px" }}
              />
              <Button onClick={handleAddToCart} icon={<ShoppingCartOutlined />}>
                Add to cart
              </Button>
            </Col>
          </Row>
        )
      )}
    </>
  );
}
