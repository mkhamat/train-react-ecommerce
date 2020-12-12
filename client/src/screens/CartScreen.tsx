import { DeleteTwoTone } from "@ant-design/icons";
import { Avatar, Button, Col, Empty, InputNumber, Row } from "antd";
import { List } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addProductToCart, removeProductFromCart } from "../ducks/cart";
import { RootState } from "../store";
import { CartPayload } from "../types";

export default function CartPage() {
  const cartList: { cart: CartPayload[] } = useSelector(
    (state: RootState) => state.cart
  );
  const dispatch = useDispatch();

  const RemoveItem = (_id: string) => (
    <Button
      onClick={() => dispatch(removeProductFromCart(_id))}
      icon={<DeleteTwoTone />}
    />
  );
  const Qty = (item: CartPayload) => {
    let target = cartList.cart.find((x: CartPayload) => {
      return item.product._id === x.product._id;
    });
    return (
      <InputNumber
        value={target?.qty}
        onChange={(value: any) =>
          dispatch(addProductToCart({ product: item.product, qty: value }))
        }
        min={1}
        max={target?.product.inStock}
        style={{ width: "40px", margin: "5px" }}
      />
    );
  };
  return (
    <div>
      {cartList.cart.length ? (
        <Row justify={"center"} gutter={50}>
          <Col span={10}>
            <List
              itemLayout="horizontal"
              dataSource={cartList.cart}
              header={"Cart"}
              footer={
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span>Total:</span>
                  <span>
                    {cartList.cart
                      .map((item) => item.qty)
                      .reduce((total, value) => total + value)}{" "}
                    items worth $
                    {cartList.cart
                      .map((item) => item.product.price * item.qty)
                      .reduce((total, value) => total + value)}
                  </span>
                </div>
              }
              renderItem={(item) => (
                <List.Item actions={[RemoveItem(item.product._id), Qty(item)]}>
                  <List.Item.Meta
                    avatar={<Avatar src={item.product.image} />}
                    title={
                      <Link to={`/products/${item.product._id}`}>
                        {item.product.name}
                      </Link>
                    }
                    description={"$" + item.product.price}
                  />
                </List.Item>
              )}
            />
          </Col>
          <Col span={2}>
            <Button type={"primary"}>Checkout</Button>
          </Col>
        </Row>
      ) : (
        <Empty
          description={"Return to the home page to buy something useless"}
          image={
            <img
              src={
                "https://ariya.events/wp-content/uploads/2020/07/ariya-empty-cart.png"
              }
              alt={"Empty cart"}
            />
          }
        >
          <Link to="/">
            <Button>Home Page</Button>
          </Link>
        </Empty>
      )}
    </div>
  );
}
